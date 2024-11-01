"use client";
import { notShowList } from "@/store/slices/headerListSlice";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { PiUserCircleThin } from "react-icons/pi";
import Link from "next/link";
import HeaderListContent from "./header-list-content";
import HeaderListContentLoggedIn from "./header-list-content-logged-in";
import { useSession } from "next-auth/react";

const HeaderMenuList = () => {
  const dispatch = useDispatch();
  const showlist = useSelector((store) => store.headerListSlice.value);
  const dispath = useDispatch();
  const { data, status } = useSession();
  useEffect(() => {
    if (showlist) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showlist]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#headerlist")) {
        dispath(notShowList());
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showlist]);
  return (
    <div
      dir="rtl"
      className={`fixed  z-[1005] top-0
       ${
         showlist
           ? "w-full bg-opacity-60 right-0 bg-black  h-screen"
           : " w-full right-[-100%] bg-none h-screen"
       }
         transition-all  duration-500 ease-in-out`}
    >
      <div
        className={`sticky top-0  bottom-0 h-full w-full sm:w-[360px] flex transition-all duration-500 ${
          showlist ? "right-0" : "-right-[360px]"
        } `}
      >
        {status == "authenticated" ? (
          <HeaderListContentLoggedIn />
        ) : (
          <HeaderListContent />
        )}

        <div className="w-12 min-w-12 pt-5 pr-3">
          <IoCloseSharp
            className="w-8 h-8 text-white cursor-pointer  transition-all duration-1000 ease-in-out "
            onClick={() => dispatch(notShowList())}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMenuList;
