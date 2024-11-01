import { LuBedDouble, LuBedSingle } from "react-icons/lu";
import { TbBedFlat } from "react-icons/tb";

const BedInformation = ({ item, common, num }) => {
  return (
    <div className="w-36 min-w-36 flex flex-col font-[vazirregular] gap-2  p-3 shadow-md text-gray-700 shadow-slate-200 rounded-md">
      <div className="flex items-center justify-start ">
        {item.dubblebed != 0 ? <LuBedDouble className="w-7 h-7" /> : null}
        {item.singlebed != 0 ? <LuBedSingle className="w-7 h-7" /> : null}
        {item.mattress != 0 ? <TbBedFlat className="w-7 h-7 " /> : null}
      </div>
      {common ? (
        <h1 className="my-1 font-bold">فضای مشترک</h1>
      ) : (
        <h1 className="my-1 font-bold">اتاق {num}</h1>
      )}
      {item.dubblebed != 0 ? (
        <h3 className="text-sm text-gray-600">{item.dubblebed} تخت دونفره </h3>
      ) : null}
      {item.singlebed != 0 ? (
        <h3 className="text-sm text-gray-600">{item.singlebed} تخت تک نفره </h3>
      ) : null}
      {item.mattress != 0 ? (
        <h3 className="text-sm text-gray-600">{item.mattress} دست رخت خواب</h3>
      ) : null}
      {item.mattress == 0 && item.singlebed == 0 && item.dubblebed == 0 ? (
        <h3 className="text-sm text-gray-600">فاقد فضای خواب</h3>
      ) : null}
    </div>
  );
};

export default BedInformation;
