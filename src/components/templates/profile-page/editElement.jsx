"use client";
import { useState } from "react";
import { MdDoneOutline, MdOutlineEdit } from "react-icons/md";
import { check_phone } from "../../../../utils/constants";
import { useSession } from "next-auth/react";

const EditElement = ({ title, itemtype, content, userId }) => {
  const [item, setItem] = useState(
    itemtype == "phone" ? Number(content) : content
  );
  const [itemvalid, setItemValid] = useState(true);
  const [edit, setEdit] = useState(false);
  const { data: session, status, update } = useSession();
  const changeHandler = (e) => {
    if (itemtype == "phone") {
      if (e.target.value.length < 11) {
        setItem(e.target.value);
      }
      const numvalid = check_phone(e.target.value);
      if (numvalid) return setItemValid(true);
    } else {
      setItem(e.target.value);
    }
  };
  const changeUserDetails = async () => {
    if (itemtype == "phone") {
      const numvalid = check_phone(item);
      if (numvalid) {
        setItemValid(numvalid);
      } else {
        return setItemValid(numvalid);
      }
    }
    const res = await fetch(`/api/auth/user?itemtype=${itemtype}`, {
      method: "PATCH",
      body: JSON.stringify({ [itemtype]: item, userId }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status == 200 && status === "authenticated") {
      const data = await res.json();
      setEdit(false);
      await update({
        name: `${data.data.name} ${data.data.lastName}`,
        phone: data.data.phone,
      });
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-1 w-full border-b ${
        edit && !itemvalid ? " border-red-500 " : " border-gray-200"
      } `}
    >
      <div className="flex flex-col gap-2 justify-start w-full py-3">
        <h1 className="text-lg text-gray-800">{title}</h1>
        <input
          type={itemtype == "phone" ? "number" : "text"}
          value={item}
          readOnly={!edit}
          maxLength={itemtype == "phone" ? 10 : 30}
          minLength={itemtype == "phone" ? 10 : 3}
          onChange={(e) => changeHandler(e)}
          className={`${
            edit ? "text-gray-600" : "text-gray-400"
          }  font-[vazirRegular] outline-none w-full border-none ${
            edit && !itemvalid ? " text-red-500 " : " text-gray-600"
          }`}
        />
      </div>
      <button className="w-10 min-w-10 flex justify-center items-center">
        {edit ? (
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-green-400 hover:bg-green-500 transition-all duration-300">
            <MdDoneOutline
              onClick={() => changeUserDetails()}
              className="w-6 h-6 text-gray-700 hover:text-gray-800 transition-all duration-300"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 transition-all duration-300">
            <MdOutlineEdit
              onClick={() => setEdit(true)}
              className="w-6 h-6 text-gray-700 hover:text-gray-800 transition-all duration-300"
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default EditElement;
