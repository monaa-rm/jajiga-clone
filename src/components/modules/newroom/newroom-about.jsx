import { setAbout, setDisabledPeople } from "@/store/slices/newRoomSlice";
import { useDispatch, useSelector } from "react-redux";

const NewroomAbout = () => {
  const aboutTxt = useSelector((store) => store.newRoomSlice.about);
  const disabledPeople = useSelector((store) => store.newRoomSlice.disabledPeople);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-gray-700">درباره اقامتگاه</h1>
      <textarea
        value={aboutTxt}
        onChange={(e) => dispatch(setAbout(e.target.value))}
        className=" w-full p-2  md:p-4 outline-none border border-gray-300 hover:border-gray-400 focus:border-gray-400 rounded-lg"
        rows={6}

      />
      <p className="text-sm text-gray-500 font-[vazirRegular] text-justify ">در اینجا نکاتی را که میهمان شما باید بداند بنویسید، از نقاط قوت و ضعف اقامتگاه، بعنوان مثال از تعداد زیاد پله ها که برای سالمندان مناسب نیست و ورودی تنگ پارکینگ، از چشم انداز زیبای منزل یا از جاذبه های گردشگری ‏اطراف همچون ساحل دریا/رودخانه/کوهستان/ اماکن تاریخی/بازار محلی بگویید و فاصله اقامتگاه از هر یک را بنویسید. وجود فروشگاههای مواد غذایی و نانوایی در مجاورت منزل خود را مشخص ‏کنید.‏‎ از حال و هوای محله و رفتار احتمالی همسایه ها بنویسید. هر آنچه میهمان شما لازم ااست بداند را اینجا بنویسید.‏‎</p>
      <div className="flex justify-between items-center gap-3">
          <h3 className="text-gray-800 ">مناسب برای افراد ناتوان و معلولین</h3>
          <div className="p-1.5 cursor-pointer flex justify-center gap-2 items-center bg-gray-100 rounded-full ">
            <button
              onClick={() =>
                dispatch(setDisabledPeople(true))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                disabledPeople == true
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              مناسب
            </button>
            <button
              onClick={() =>
                dispatch(setDisabledPeople(false))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                disabledPeople == false
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              نامناسب
            </button>
          </div>
        </div>

    </div>
  );
};

export default NewroomAbout;
