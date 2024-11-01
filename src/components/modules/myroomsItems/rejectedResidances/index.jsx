import RejectedResidanceItem from "@/components/elements/getResidances/rejected-residance-item";
import Image from "next/image";

const RejectedResidances = ({
  data,
  isSearching,
  setIsSearching,
  setActiveItem,
}) => {
  return isSearching && !data?.length ? (
    <div className="w-full h-[80%] flex justify-center items-center bg-white">
      <div className="relative w-32 h-32 ">
        <Image
          src="/images/loading.svg"
          alt="loading"
          fill
          className="object-cover"
        />
      </div>
    </div>
  ) : data?.length && !isSearching ? (
    <div className="w-full px-3 xl:px-28">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-start gap-3">
        {data?.map((item, i) => (
          <RejectedResidanceItem
            key={i}
            item={JSON.parse(JSON.stringify(item))}
            setActiveItem={setActiveItem}
            setIsSearching={setIsSearching}
          />
        ))}
      </div>
    </div>
  ) : !data?.length && !isSearching ? (
    <div className="px-6 xl:px-28 text-gray-700 pt-6">
      هیچ اقامتگاه تایید نشده ای وجود ندارد
    </div>
  ) : null;
};

export default RejectedResidances;
