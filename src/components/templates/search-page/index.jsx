"use client";
import dynamic from "next/dynamic";
const DynamicSearchMap = dynamic(
  () => import("@/components/modules/search-map"),
  {
    ssr: false,
  }
);
import SearchPageFilter from "@/components/modules/search-page-filter";
import SearchPageResidance from "@/components/modules/search-page-residance";
import { useEffect, useState, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoMapOutline } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setEnabled, setIsSearching } from "@/store/slices/filterSlice";

const SearchPage = ({ liked_items }) => {
  const [metaContent, setMetaContent] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const prevFilters = useRef({});
  const sortTitle = useSelector((store) => store.filterSlice.sortTitle);
  const showBox = useSelector((store) => store.headerListSlice.showSearchBox);
  const pathname = usePathname();
  const dispatch = useDispatch();
  //filters
  const calendarFilter = useSelector(
    (store) => store.filterSlice.calendarFilter
  );
  const guestFilter = useSelector((store) => store.filterSlice.guestFilter);
  const costFilter = useSelector((store) => store.filterSlice.costFilter);
  const bedroomFilter = useSelector((store) => store.filterSlice.bedroomFilter);
  const propertiesFilter = useSelector(
    (store) => store.filterSlice.propertiesFilter
  );
  const typeFilter = useSelector((store) => store.filterSlice.typeFilter);
  const regionFilter = useSelector((store) => store.filterSlice.regionFilter);
  const rentTypeFilter = useSelector(
    (store) => store.filterSlice.rentTypeFilter
  );
  const optionsFilter = useSelector((store) => store.filterSlice.optionsFilter);
  const rulesFilter = useSelector((store) => store.filterSlice.rulesFilter);
  const showCalendar = useSelector((store) => store.filterSlice.showCalendar);
  const showGuestNum = useSelector((store) => store.filterSlice.showGuestNum);
  const showCost = useSelector((store) => store.filterSlice.showCost);
  const showBedroom = useSelector((store) => store.filterSlice.showBedroom);
  const showProperty = useSelector((store) => store.filterSlice.showProperty);
  const showType = useSelector((store) => store.filterSlice.showType);
  const showRegion = useSelector((store) => store.filterSlice.showRegion);
  const bounds = useSelector((store) => store.filterSlice.bounds);
  const sendBounds = useSelector((store) => store.filterSlice.sendBounds);
  const ShowOtherFilters = useSelector(
    (store) => store.filterSlice.ShowOtherFilters
  );

  const enabled = useSelector((store) => store.filterSlice.enabled);
  const selectedCities = useSelector(
    (store) => store.headerListSlice.selectedCities
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setEnabled(true));
      } else {
        dispatch(setEnabled(false));
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showSearchProvinceList = useSelector(
    (store) => store.headerListSlice.showSearchProvinceList
  );

  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        calendarFilter,
        guestFilter,
        costFilter,
        bedroomFilter,
        propertiesFilter,
        typeFilter,
        regionFilter,
        rentTypeFilter,
        optionsFilter,
        rulesFilter,
        selectedCities,
        bounds,
      };

      try {
        const res = await fetch(
          `/api/s?getbounds=${sendBounds}&sort=${sortTitle.link}`,
          {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.json();
        setSearchedData(result?.data);
        setTotalRooms(result.totalRooms);
        setMinPrice(result?.minPrice[0]?.minPrice);
      } catch (error) {
        console.log("مشکلی پیش آمده");
      } finally {
        dispatch(setIsSearching(false));
      }
    };

    const currentFilters = {
      calendarFilter,
      guestFilter,
      costFilter,
      bedroomFilter,
      propertiesFilter,
      typeFilter,
      regionFilter,
      rentTypeFilter,
      optionsFilter,
      rulesFilter,
      selectedCities,
      sortTitle,
    };
    console.log("current filters", currentFilters);
    if (
      !showSearchProvinceList &&
      !showCalendar &&
      !showGuestNum &&
      !showBedroom &&
      !showCost &&
      !showProperty &&
      !showType &&
      !showRegion &&
      !ShowOtherFilters
    ) {
      // مقایسه فیلترهای فعلی با فیلترهای قبلی
      const filtersChanged = Object.keys(currentFilters).some(
        (key) =>
          JSON.stringify(currentFilters[key]) !==
          JSON.stringify(prevFilters.current[key])
      );

      if (filtersChanged || sendBounds) {
        dispatch(setIsSearching(true));
        fetchData();

        prevFilters.current = currentFilters; // به‌روزرسانی فیلترهای قبلی
      }
    }
  }, [
    sortTitle,
    calendarFilter,
    guestFilter,
    costFilter,
    bedroomFilter,
    propertiesFilter,
    typeFilter,
    regionFilter,
    rentTypeFilter,
    optionsFilter,
    rulesFilter,
    selectedCities,
    showCalendar,
    showGuestNum,
    showCost,
    showBedroom,
    showProperty,
    showType,
    showRegion,
    ShowOtherFilters,
    showSearchProvinceList,
    sendBounds,
  ]);

  return (
    <div className="w-full bg-gray-50">
      <SearchPageFilter />
      <div className="w-full  flex justify-start items-start rounded-2xl overflow-hidden relative">
        <div
          className={`  z-0 fixed mapheight  w-full md:w-5/12 ${
            enabled
              ? "top-[121px] left-0"
              : " top-full md:top-[121px] md:-left-[700px] "
          }  transition-all duration-500 ease-in-out `}
        >
          <DynamicSearchMap data={searchedData} />
          <div
            className={`${
              !enabled ? "hidden" : "flex "
            } fixed md:hidden w-full h-16 bg-white z-[450] bottom-0 rounded-tr-2xl rounded-tl-2xl `}
          ></div>
          <button
            onClick={() => dispatch(setEnabled(false))}
            type="button"
            className={`${
              !enabled ? "hidden" : "flex"
            } z-[451] fixed md:hidden bottom-[40px] left-1/2 -translate-x-1/2 px-6 py-2 rounded-full 
            flex justify-center items-center gap-2 text-white border-4 border-white
             bg-zinc-700 hover:border-t-2 hover:bg-zinc-600 transition-all duration-300 `}
          >
            <IoIosArrowUp className="w-5 h-5" />
            <span className="text-sm font-[vazirRegular] ">مشاهده نتایج</span>
          </button>
        </div>
        <div
          dir="ltr"
          className={`  fixed mapheight md:h-auto  md:static  ${
            enabled
              ? "top-full w-full  md:w-7/12 "
              : "top-[121px] w-full md:w-full "
          } 
         ${
           showBox ? "z-[600] " : " z-[1001]  "
         } md:z-[100] md:pt-[57px] transition-all duration-500 ease-in-out overflow-y-scroll 
          md:overflow-y-hidden `}
        >
          <div
            className={`fixed ${
              enabled ? "hidden" : "flex"
            } md:hidden w-full pt-5 h-12  justify-center items-center bg-white z-[450] bottom-0
              rounded-tr-2xl rounded-tl-2xl `}
          >
            <span
              onClick={() => dispatch(setEnabled(true))}
              className="text-sm text-gray-800"
            >
              نقشه
            </span>
          </div>
          <button
            onClick={() => dispatch(setEnabled(true))}
            type="button"
            className={`z-[451] ${
              enabled ? "hidden" : "flex"
            } fixed md:hidden bottom-[20px] left-1/2 -translate-x-1/2  rounded-full 
            flex justify-center items-center gap-2 text-white border-4 transition-all duration-300 `}
          >
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex justify-center items-center">
              <IoMapOutline className="w-6 h-6 text-gray-700" />
            </div>
          </button>
          <SearchPageResidance
            minPrice={minPrice}
            totalRooms={totalRooms}
            searchedData={searchedData}
            liked_items={liked_items}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
