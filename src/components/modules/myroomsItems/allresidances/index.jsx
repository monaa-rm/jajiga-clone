"use client";
import ResidanceAllItem from "@/components/elements/getResidances/residance-all-item";
import Image from "next/image";

const AllResidances = ({ data, isSearching }) => {
  if (isSearching && !data.length) {
    return (
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
    );
  }
  if (data?.length && !isSearching) {
    return (
      <div className="w-full px-3 xl:px-28">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((item, i) => (
            <ResidanceAllItem key={i} item={JSON.parse(JSON.stringify(item))} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="px-6 xl:px-28 text-gray-700 pt-6">
        هیچ اقامتگاهی وجود ندارد
      </div>
    );
  }
};

export default AllResidances;
