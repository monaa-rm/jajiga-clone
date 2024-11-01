"use client"
import ResidanceInformation from "@/components/modules/residance-information"
import SingleRoomImages from "@/components/modules/single-room-images"
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SingleRoomPage = ({data , userData ,userOtherResidances , reqId}) => {
  const pathname = usePathname();
  useEffect(() => {
    var header = document.querySelector("#header1");
    if (header && pathname != "/" && !pathname.startsWith("/room") ) {
      header.style.zIndex = 20;
    }


  }, [pathname]);

  return (
    <div  className=" px-0 lg:px-6 py-3 xl:px-28 relative">
     <SingleRoomImages images={data.images}  userData={userData} residanceId={data?._id} />
       <ResidanceInformation userData={userData} reqId={reqId} data={data} userOtherResidances={userOtherResidances} />

    </div>
  )
}

export default SingleRoomPage
