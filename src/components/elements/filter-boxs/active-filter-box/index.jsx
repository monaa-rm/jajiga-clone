import { IoMdCloseCircle } from "react-icons/io"

const ActiveFilterBox = () => {
  return (
    <div className="flex flex-col gap-3" >
        <div className="flex justify-start items-end gap-4">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">فیلتر های فعال</h3>
      </div>
      <div className="flex justify-start items-center gap-2 px-4">
        <div className="flex flex-wrap justify-start items-center gap-2 px-2 py-1 rounded-full border border-gray-200
         bg-gray-100 hover:bg-gray-200   transition-all duration-300  cursor-pointer">
            <IoMdCloseCircle className="w-5 h-5 text-gray-300" />
            <span className="text-gray-700 text-sm">خاص</span>
        </div>
      </div>
    </div>
  )
}

export default ActiveFilterBox
