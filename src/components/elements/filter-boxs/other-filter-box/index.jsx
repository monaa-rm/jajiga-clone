import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActiveFilterBox from "../active-filter-box";
import ExclusiveBox from "../exclusive-box";
import OptionItemsBox from "../option-box";
import RulesBox from "../rules-box";
import CostBox from "../cost-box";
import BedRoomBox from "../bed-room-box";
import PropertyBox from "../property-box";
import TypeBox from "../type-box";
import RegionBox from "../region-box";

const OtherFilterBox = ({
  deleteAllOtherFilters,
  setDeleteAllOtherFilters,
}) => {
  return (
    <div className="w-full otherfiltersbottom md:otherfiltersbottommd overflow-y-scroll flex flex-col gap-3 pt-5 pb-20 ">
      <CostBox
        otherfilter={true}
        deleteAllOtherFilters={deleteAllOtherFilters}
        setDeleteAllOtherFilters={setDeleteAllOtherFilters}
      />
      <BedRoomBox
        otherfilter={true}
        deleteAllOtherFilters={deleteAllOtherFilters}
        setDeleteAllOtherFilters={setDeleteAllOtherFilters}
      />
      <PropertyBox
        otherfilter={true}
        deleteAllOtherFilters={deleteAllOtherFilters}
        setDeleteAllOtherFilters={setDeleteAllOtherFilters}
      />
      <TypeBox
        otherfilter={true}
        deleteAllOtherFilters={deleteAllOtherFilters}
        setDeleteAllOtherFilters={setDeleteAllOtherFilters}
      />
      <RegionBox
        otherfilter={true}
        deleteAllOtherFilters={deleteAllOtherFilters}
        setDeleteAllOtherFilters={setDeleteAllOtherFilters}
      />
      <ExclusiveBox />
      <OptionItemsBox />
      <RulesBox />
    </div>
  );
};

export default OtherFilterBox;
