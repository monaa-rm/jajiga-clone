import {
  setRules,
  rulesActive,
  setActiveNumbers,
} from "@/store/slices/filterSlice";
import { BsCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const rulesTitle = [
  {
    name: "pet",
    title: "همراه داشتن حیوان خانگی مجاز باشد",
  },
  {
    name: "smoke",
    title: "استعمال دخانیات در داخل اقامتگاه مجاز باشد",
  },
  {
    name: "party",
    title: "برگزاری جشن کوچک با هماهنگی میزبان امکان پذیز باشد",
  },

];
const RulesBox = () => {
  const dispatch = useDispatch();

  const rulesItems = useSelector((store) => store.filterSlice.rulesFilter.rules);

  return (
    <div className="w-full pt-5">
      <div className="flex justify-start items-end gap-4">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">مقررات اقامتگاه</h3>
      </div>
      <div className="flex flex-col gap-3  p-4">
        <div className="grid grid-cols-1 gap-4 text-gray-600 font-[vazirRegular] ">
          {rulesTitle.map((item, i) => (
            <div
              onClick={() => {
                dispatch(setRules(item.name));
                dispatch(rulesActive(true));
                dispatch(setActiveNumbers("sm"))
              }}
              key={i}
              className={`p-3 flex justify-between items-center shadow-md shadow-gray-200 border
              ${
                rulesItems[item.name] == true
                  ? "border-yellow-600 bg-yellow-50"
                  : " border-gray-100"
              }
             rounded-lg  `}
            >
              <div className="flex justify-start items-center gap-1 ">
                <span>{item.title}</span>
              </div>
              {rulesItems[item.name] == true ? (
                <div className="w-6 h-6 rounded-md border border-black bg-black">
                  <BsCheck className="text-white w-6 h-6" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-md border hover:border-gray-300 border-gray-200 bg-white"></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RulesBox;
