import { WiTime11 } from "react-icons/wi";

const ResidanceRules = ({ rulesData,checktime }) => {
  return (
    <div className="flex flex-col gap-3 font-[vazirregular]">
      <div className="flex justify-start items-center   gap-4 ">
        <div className="border flex flex-col gap-1 items-center justify-center border-slate-200 rounded-md px-5 py-3">
          <div className="flex gap-2  justify-center items-center">
            <WiTime11 className="w-4 h-4 text-gray-700" />
            <h1 className="text-gray-500  text-sm">ساعت ورود از </h1>
          </div>
          <h3 className="text-gray-800 font-bold">{checktime.arrivaltime}</h3>
        </div>
        <div className="border flex flex-col gap-1 items-center justify-center border-slate-200 rounded-md px-5 py-3">
          <div className="flex gap-2 justify-center items-center">
            <WiTime11 className="w-4 h-4 text-gray-700" />
            <h1 className="text-gray-500  text-sm">
              ساعت خروج تا
            </h1>
          </div>
          <h3 className="text-gray-800  font-bold">
            {checktime.depurturetime}
          </h3>
        </div>
      </div>
      <div>
        <ul className="list-disc flex flex-col gap-2 font-[vazirregular] list-outside px-5 text-gray-700">
          {rulesData.pet ? (
            <li >
              ورود حیوان خانگی (سگ، گربه، ...) به شرط رعایت کامل نظافت مجاز است.
              درفضای داخل ساختمان حیوان باید در باکس مخصوص نگهداری شود.
            </li>
          ) : (
            <li>همراه داشتن حیوان خانگی ممنوع میباشد</li>
          )}
          {rulesData.party ? (
            <li>برگزاری جشن کوچک با هماهنگی میزبان امکانپذیر است</li>
          ) : (
            <li>برگزاری جشن و پخش موزیک با صدای بلند ممنوع است</li>
          )}
          {rulesData.smoke ? (
            <li>
              استعمال دخانیات (سیگار، قلیان و ...) در داخل اقامتگاه در صورت
              رعایت نظافت مجاز است.
            </li>
          ) : (
            <li>
              استعمال دخانیات (سیگار، قلیان و ...) در داخل اقامتگاه ممنوع است.
            </li>
          )}
          {rulesData.extrarules.length && rulesData.extrarules ? rulesData.extrarules.map((item,i) => (
            <li key={i}>{item}</li>
          )) : null }
        </ul>
      </div>
    </div>
  );
};

export default ResidanceRules;
