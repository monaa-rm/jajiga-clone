import { NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
import { getDatesBetweenShamsi } from "../../../../utils/calendar-funcs";

export async function POST(req) {
  try {
    await connectDB();
    const filters = await req.json();
    const query = {};

    const { searchParams } = req.nextUrl;
    const getbounds = searchParams.get("getbounds") == "false" ? false : true;
    const sortTitle = searchParams.get("sort");
    if (getbounds) {
      if (filters.bounds) {
        const { sw_lat, sw_lng, ne_lat, ne_lng } = filters.bounds;
        query.location = {
          $geoWithin: {
            $box: [
              [parseFloat(sw_lat), parseFloat(sw_lng)],
              [parseFloat(ne_lat), parseFloat(ne_lng)],
            ],
          },
        };
      }
    } else {
      if (filters.selectedCities.length) {
        const searchedIds = filters.selectedCities.map((item) => item.id);
        query["address.city.id"] = { $in: searchedIds };
      }
    }

    
    // فیلتر تاریخ
    // Date filter
    if (filters.calendarFilter?.active) {
      const [startDate, endDate] = filters.calendarFilter.date;
      const selectedDates = getDatesBetweenShamsi(startDate, endDate);

      query.reservedDays = {
        $not: {
          $elemMatch: {
            acceptMode: "accepted",
            reservedDays: { $in: selectedDates },
          },
        },
      };
    }


    if (filters.guestFilter?.active) {
      query.capacity = { $gte: filters.guestFilter.number };
    }

    if (filters.costFilter?.active) {
      const minCost = filters.costFilter.cost[0];
      const maxCost = filters.costFilter.cost[1];
      query.$or = [
        { "price.holidays": { $gte: minCost, $lte: maxCost } },
        { "price.notholidays": { $gte: minCost, $lte: maxCost } },
      ];
    }

    if (filters.propertiesFilter?.active) {
      const properties = filters.propertiesFilter.properties;

      if (properties.luxury) {
        query["options"] = { $elemMatch: { name: "pool", hasIt: true } };
      }

      if (properties.villa_sea) {
        query["type_residance.name"] = "villa";
        query["region.name"] = "beach";
      }

      if (properties.discount) {
        query["discount"] = { $gte: 1 };
      }
      // scenic: true,
      // disabled: true,
      // plus: true,
      // instant: true,
      // pet: true
      if (properties.scenic) {
        query["region.name"] = { $in: ["beach", "cuntrySide", "jungle"] };
      }
      if (properties.disabled) {
        query["disabledPeople"] = true;
      }
      if (properties.plus) {
        query["rating"] = { $gte: 4 };
      }
      if (properties.pet) {
        query["rules.pet"] = true;
      }
      if (properties.instant) {
        query["instanceReserve"] = true;
      }
    }

    if (filters.typeFilter?.active) {
      const types = Object.keys(filters.typeFilter.type).filter(
        (key) => filters.typeFilter.type[key]
      );
      query["type_residance.name"] = { $in: types };
    }

    // if (filters.typeFilter?.active) {
    //   const types = Object.keys(filters.typeFilter.type).filter(
    //     (key) => filters.typeFilter.type[key]
    //   );
    //   query["type_residance.name"] = { $in: types };
    // }

    if (filters.regionFilter?.active) {
      const regions = Object.keys(filters.regionFilter.region).filter(
        (key) => filters.regionFilter.region[key]
      );
      query["region.name"] = { $in: regions };
    }

    if (filters.rentTypeFilter?.active) {
      const rentTypes = Object.keys(filters.rentTypeFilter.type).filter(
        (key) => filters.rentTypeFilter.type[key]
      );
      query.exclusive = rentTypes.includes("exclusive");
    }

    //options
    if (filters.optionsFilter?.active) {
      const options = filters.optionsFilter.options;
      const optionsQuery = Object.keys(options).map((option) => ({
        options: { $elemMatch: { name: option, hasIt: options[option] } },
      }));

      if (optionsQuery.length > 0) {
        query["$and"] = optionsQuery;
      }
    }

    if (filters.rulesFilter?.active) {
      const rules = Object.keys(filters.rulesFilter.rules).filter(
        (key) => filters.rulesFilter.rules[key]
      );
      if (rules.length) {
        query["rules.name"] = { $in: rules };
      }
    }

    if (filters.bedroomFilter?.active) {
      if (filters.bedroomFilter.room !== 0) {
        query.room = { $gte: filters.bedroomFilter.room };
      }
      // if (filters.bedroomFilter.bed !== 0) {
      //   query.bedroom = {
      //     $elemMatch: { singlebed: { $gte: filters.bedroomFilter.bed } },
      //   };
      // }
    }

    // const totalItems = await Room.countDocuments({
    //   query
    // });
    //sort 
    let sortQuery = {};
    switch (sortTitle) {
      case "bests":
        sortQuery = { likeNumber: -1 };
        break;
      case "maxrating":
        sortQuery = { rating: -1 };
        break;
      case "minprice":
        sortQuery = { "price.notholidays": 1, "price.holidays": 1 };
        break;
      case "maxprice":
        sortQuery = { "price.notholidays": -1, "price.holidays": -1 };
        break;
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      default:
        break;
    }

    let data = {};

    if (filters.bedroomFilter.bed == 0) {
      data = await Room.find(query).populate({
        path: "userId",
        select: "-password", // حذف فیلد password
      }).sort(sortQuery);;
    } else {
      // استفاده از aggregate برای محاسبه مجموع تخت‌ها
      const aggregateQuery = [
        { $match: query },
        {
          $addFields: {
            totalBeds: {
              $sum: {
                $map: {
                  input: "$bedroom",
                  as: "bed",
                  in: { $sum: ["$$bed.singlebed", "$$bed.dubblebed"] },
                },
              },
            },
          },
        },
        {
          $match: {
            totalBeds: { $gte: filters.bedroomFilter.bed },
          },
        },
        { $sort: sortQuery },
      ];
      const rooms = await Room.aggregate(aggregateQuery).exec();
      data = await Room.populate(rooms, {
        path: "userId",
        select: "-password", // حذف فیلد password
      });
    }

    // شمارش کل اقامتگاه‌ها
    const totalRooms = await Room.countDocuments(query);

    // محاسبه کمترین قیمت
    const minPrice = await Room.aggregate([
      { $match: query },
      {
        $project: {
          minPrice: { $min: ["$price.holidays", "$price.notholidays"] },
        },
      },
      { $sort: { minPrice: 1 } },
      { $limit: 1 },
      { $project: { minPrice: 1, _id: 0 } },
    ]);

    const minCost = minPrice.length > 0 ? minPrice[0].minPrice : 0;

    return NextResponse.json({ data, totalRooms, minPrice }, { status: 200 });
  } catch (error) {
    console.log("مشکلی در سرور پیش آمده است");
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
