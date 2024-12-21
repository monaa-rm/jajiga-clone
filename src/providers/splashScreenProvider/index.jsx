"use client"
import SplashScreenBox from "@/components/splashScreenBox";
import { useState } from "react";

const SplashScreenProvider = ({children}) => {


   const [isLoading,setisLoading]=useState(true);
   setTimeout(()=>{setisLoading(false)},2000);


   return (
      <div>
         {
            isLoading
            ?<SplashScreenBox/>
            :children
         }
      </div>
   );
}

export default SplashScreenProvider;