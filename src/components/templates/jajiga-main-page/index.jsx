import DiscountResidance from "../discount-residance";
import EconomicResidance from "../economic-residance";
import ExcellentResidance from "../excellent-residance";
import FastSearchs from "../fast-searchs";
import HostPage from "../host";
import InfoSlider from "../info-slider";
import InstantResidance from "../instant-residance";
import LuxResidance from "../lux-redidance";
import MapSection from "../map-section";
import NorthResidance from "../north-residance";
import PopularCities from "../popular-cities";
import RentDesc from "../rent-desc";
import SouthResidance from "../south-residance";
import TehranResidance from "../tehran-residance";

const JajigaMainPage = () => {

  return (
    <div className=" py-6 relative bg-white  rounded-tr-2xl rounded-tl-2xl -mt-3 z-10">
      <PopularCities />
      <FastSearchs />
      <MapSection />
      <InfoSlider />
      <ExcellentResidance />
      <InstantResidance />
      <DiscountResidance />
      <LuxResidance />
      <EconomicResidance />
      <HostPage />
      <NorthResidance />
      <TehranResidance />
      <SouthResidance />
      <RentDesc />
    </div>
  );
};

export default JajigaMainPage;
