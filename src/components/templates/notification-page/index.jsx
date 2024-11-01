"use client";

import Link from "next/link";
import { useEffect } from "react";

const NotificationPage = ({ notifs }) => {
  useEffect(() => {
    const updateVisibility = async () => {
      // فرض کنید اینجا کد ارسال درخواست برای به‌روزرسانی visibility است
      const notVisibleNotifs = notifs.filter((n) => !n.visibility);

      for (let notf of notVisibleNotifs) {
        await fetch(`/api/notif/${notf._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visibility: true }),
        });
      }
    };

    return () => {
      updateVisibility();
    };
  }, [notifs]);

  return (
    <div className="min-h-[50vh] w-full p-3">
      <div className="w-full flex flex-col gap-4">
        {notifs?.map((item) => (
          <div
            key={item._id}
            className={`p-3  border border-blue-200 text-gray-700 text-sm rounded-2xl ${
              item.visibility == false ? "bg-blue-100" : "bg-white"
            } `}
          >
            {item.resId ? (
              <Link href={`/room/${item.resId}`}>{item.text}</Link>
            ) : (
              <div>{item.text}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
