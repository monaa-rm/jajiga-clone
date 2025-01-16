"use client" 
import SearchResidanceBoxItem from "./search-residance-box-item";
import { useSelector } from "react-redux";

const SearchResidanceBox = ({ searchedData , liked_items }) => {
  const enabled = useSelector((store) => store.filterSlice.enabled);

  return (
    <div
      className={`w-full pt-4 py-8 bg-white rounded-tr-2xl rounded-tl-2xl md:pt-0 md:rounded-none md:bg-none grid grid-cols-1 
         ${
           enabled
             ? "md:grid-cols-1 lg:grid-cols-2"
             : "md:grid-cols-2 lg:grid-cols-3"
         } 
      `}
    >
      {searchedData?.map((residance, i) => (
        <SearchResidanceBoxItem key={i} residance={residance} liked_items={liked_items} />
      ))}
    </div>
  );
};

export default SearchResidanceBox;
