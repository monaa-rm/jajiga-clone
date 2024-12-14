import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activeItem: 0,
  sideSetting: false,
  hiddenItems: [7, 8, 9, 10],
  filledItems: {
    address: false,
    map: false,
    images: false,
    about: false,
    area: false,
    capacity: false,
    bedroom: false,
    options: false,
    checktime: false,
    price: false,
    rules: false,
  },
  address: {
    province: "",
    city: "",
    exactAddress: "",
  },
  location: [],
  images: [],
  about: [],
  exclusive: null,
  type: {},
  region: {},
  capacity: 1,
  maxCapacity: 1,
  area: "",
  yard: "",
  room: 0,
  disabledPeople: false,
  bed: [{ mattress: 0, singlebed: 0, dubblebed: 0 }],
  options: [
    { name: "pool", hasIt: false, description: "" },
    {
      name: "parking",
      hasIt: false,
      description: "",
    },
    {
      name: "billiard",
      hasIt: false,
      description: "",
    },
    { name: "toilet", hasIt: false, description: "" },
    { name: "vacuumCleaner", hasIt: false, description: "" },
    { name: "shower", hasIt: false, description: "" },
    {
      name: "heatingSystem",
      hasIt: false,
      description: "",
    },
    {
      name: "coolingSystem",
      hasIt: false,
      description: "",
    },
    { name: "gasStove", hasIt: false, description: "" },
    { name: "kitchen", hasIt: false, description: "" },
    { name: "kebab", hasIt: false, description: "" },
    {
      name: "sofa",
      hasIt: false,
      description: "",
    },
    { name: "tv", hasIt: false, description: "" },
    {
      name: "lunchtable",
      hasIt: false,
      description: "",
    },
    {
      name: "cleanstuff",
      hasIt: false,
      description: "",
    },
    { name: "closetDrawer", hasIt: false, description: "" },
    {
      name: "electricity",
      hasIt: false,
      description: "",
    },
    { name: "onDay", hasIt: false, description: "" },
    { name: "elevator", hasIt: false, description: "" },
    { name: "microwave", hasIt: false, description: "" },
    { name: "wifi", hasIt: false, description: "" },
    { name: "phone", hasIt: false, description: "" },
    { name: "fridge", hasIt: false, description: "" },
    { name: "iron", hasIt: false, description: "" },
    { name: "water", hasIt: false, description: "" },
  ],
  checkTime: { arrivaltime: "12 ظهر", depurturetime: "11 صبح" },
  price: {
    holidays: 0,
    notHolidays: 0,
    extra: 0,
  },
  discount: 0,
  rules: {
    pet: false,
    smoke: false,
    party: false,
    extrarules: [],
  },
  provinceCities: [],
};
const newRoomSlice = createSlice({
  name: "newRoom",

  initialState: {
    activeItem: 0,
    sideSetting: false,
    hiddenItems: [7, 8, 9, 10],
    filledItems: {
      address: false,
      map: false,
      images: false,
      about: false,
      area: false,
      capacity: false,
      bedroom: false,
      options: false,
      checktime: false,
      price: false,
      rules: false,
    },
    address: {
      province: "",
      city: "",
      exactAddress: "",
    },
    location: [],
    images: [],
    about: [],
    exclusive: null,
    type: {},
    region: {},
    capacity: 1,
    maxCapacity: 1,
    area: "",
    yard: "",
    room: 0,
    disabledPeople: false,
    bed: [{ mattress: 0, singlebed: 0, dubblebed: 0 }],
    options: [
      { name: "pool", hasIt: false, description: "" },
      {
        name: "parking",
        hasIt: false,
        description: "",
      },
      {
        name: "billiard",
        hasIt: false,
        description: "",
      },
      { name: "toilet", hasIt: false, description: "" },
      { name: "vacuumCleaner", hasIt: false, description: "" },
      { name: "shower", hasIt: false, description: "" },
      {
        name: "heatingSystem",
        hasIt: false,
        description: "",
      },
      {
        name: "coolingSystem",
        hasIt: false,
        description: "",
      },
      { name: "gasStove", hasIt: false, description: "" },
      { name: "kitchen", hasIt: false, description: "" },
      { name: "kebab", hasIt: false, description: "" },
      {
        name: "sofa",
        hasIt: false,
        description: "",
      },
      { name: "tv", hasIt: false, description: "" },
      {
        name: "lunchtable",
        hasIt: false,
        description: "",
      },
      {
        name: "cleanstuff",
        hasIt: false,
        description: "",
      },
      { name: "closetDrawer", hasIt: false, description: "" },
      {
        name: "electricity",
        hasIt: false,
        description: "",
      },
      { name: "onDay", hasIt: false, description: "" },
      { name: "elevator", hasIt: false, description: "" },
      { name: "microwave", hasIt: false, description: "" },
      { name: "wifi", hasIt: false, description: "" },
      { name: "phone", hasIt: false, description: "" },
      { name: "fridge", hasIt: false, description: "" },
      { name: "iron", hasIt: false, description: "" },
      { name: "water", hasIt: false, description: "" },
    ],
    checkTime: { arrivaltime: "12 ظهر", depurturetime: "11 صبح" },
    price: {
      holidays: 0,
      notHolidays: 0,
      extra: 0,
    },
    discount: 0,
    rules: {
      pet: false,
      smoke: false,
      party: false,
      extrarules: [],
    },
    provinceCities: [],
  },
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeItem = action.payload;
    },
    setSideSetting: (state, action) => {
      state.sideSetting = action.payload;
    },
    setHiddenItems: (state, action) => {
      state.hiddenItems = action.payload;
    },
    setAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
      if (
        state.address.province != "" &&
        state.address.city != "" &&
        state.address.exactAddress != ""
      ) {
        state.filledItems.address = true;
      } else {
        state.filledItems.address = false;
      }
    },
    setLocation: (state, action) => {
      state.location = action.payload;
      if (state.location.length) {
        state.filledItems.map = true;
      } else {
        state.filledItems.map = false;
      }
    },
    setImages: (state, action) => {
      state.images = action.payload;
      if (state.images.length > 5) {
        state.filledItems.images = true;
      } else {
        state.filledItems.images = false;
      }
    },
    setAbout: (state, action) => {
      state.about = action.payload;
      if (state.about.length > 5) {
        state.filledItems.about = true;
      } else {
        state.filledItems.about = false;
      }
    },
    setResExclusive: (state, action) => {
      state.exclusive = action.payload;
      if (state.exclusive != null && state.type.name && state.region.name) {
        state.filledItems.area = true;
      } else {
        state.filledItems.area = false;
      }
    },
    setResType: (state, action) => {
      state.type = action.payload;
      if (state.exclusive != null && state.type.name && state.region.name) {
        state.filledItems.area = true;
      } else {
        state.filledItems.area = false;
      }
    },
    setRegion: (state, action) => {
      state.region = action.payload;
      if (state.exclusive != null && state.type.name && state.region.name) {
        state.filledItems.area = true;
      } else {
        state.filledItems.area = false;
      }
    },
    setCapacity: (state, action) => {
      state.capacity = action.payload;
    },
    setMaxCapacity: (state, action) => {
      state.maxCapacity = action.payload;
    },
    setResArea: (state, action) => {
      state.area = action.payload;
      if (state.yard && state.area && Number(state.area) < Number(state.yard)) {
        state.filledItems.capacity = true;
      } else {
        state.filledItems.capacity = false;
      }
    },
    setResYard: (state, action) => {
      state.yard = action.payload;

      if (state.yard && state.area && Number(state.area) < Number(state.yard)) {
        state.filledItems.capacity = true;
      } else {
        state.filledItems.capacity = false;
      }
    },
    setResRoom: (state, action) => {
      state.room = action.payload.num;
      if (action.payload.type == "add") {
        state.bed = [...state.bed, { mattress: 0, singlebed: 0, dubblebed: 0 }];
      } else {
        state.bed = state.bed.filter((item, i) => i !== action.payload.num + 1);
      }
    },
    addResBed: (state, action) => {
      const { roomnum, bed_type } = action.payload;

      if (state.bed[roomnum] && state.bed[roomnum][bed_type] !== undefined) {
        state.bed[roomnum][bed_type] += 1;
      } else {
        // مدیریت خطا برای مواردی که roomnum یا bedtype نادرست است
        console.error("Invalid room number or bed type");
      }
    },
    reduceResBed: (state, action) => {
      const { roomnum, bed_type } = action.payload;

      if (state.bed[roomnum] && state.bed[roomnum][bed_type] !== undefined) {
        state.bed[roomnum][bed_type] -= 1;
      } else {
        // مدیریت خطا برای مواردی که roomnum یا bedtype نادرست است
        console.error("Invalid room number or bed type");
      }
    },
    setResBedActive: (state, action) => {
      state.filledItems.bedroom = true;
    },
    setResOptions: (state, action) => {
      const { name, hasIt, description } = action.payload;
      const option = state.options.find((opt) => opt.name === name);
      if (option) {
        if (hasIt) {
          option.hasIt = hasIt;
          option.description = description;
          state.filledItems.options = true;
        } else {
          option.hasIt = hasIt;
        }
      } else {
        console.error("Option not found");
      }
    },
    setCheckTime: (state, action) => {
      const { check, time } = action.payload;
      if (check == "arrivaltime") {
        state.checkTime.arrivaltime = time;
      } else {
        state.checkTime.depurturetime = time;
      }
      state.filledItems.checktime = true;
    },
    setResCost: (state, action) => {
      const { days, cost } = action.payload;

      state.price[days] = cost;

      state.discount = action.payload.discount;
      if (
        state.price.holidays &&
        state.price.notHolidays &&
        state.price.extra
      ) {
        state.filledItems.price = true;
      } else {
        state.filledItems.price = false;
      }
    },
    setDiscountCost: (state, action) => {
      state.discount = action.payload;
    },
    setResRuleActive: (state, action) => {
      state.filledItems.rules = true;
    },
    setDisabledPeople: (state, action) => {
      state.disabledPeople = action.payload;
    },
    setProvinceCities: (state, action) => {
      state.provinceCities = action.payload;
    },
    setResRules: (state, action) => {
      const { rule, value } = action.payload;
      if (rule !== "extrarules") {
        state.rules[rule] = value;
      } else if (rule == "extrarules") {
        state.rules.extrarules = [value];
      }
    },
    resetState: (state) => {
      return { ...initialState };
    }, // اکشن برای بازنشانی
  },
});

export const {
  resetState,
  setActive,
  setHiddenItems,
  setSideSetting,
  setAddress,
  setLocation,
  setImages,
  setAbout,
  setResExclusive,
  setRegion,
  setResType,
  setCapacity,
  setMaxCapacity,
  setResYard,
  setResArea,
  setResRoom,
  addResBed,
  reduceResBed,
  setResBedActive,
  setResOptions,
  setCheckTime,
  setResCost,
  setDiscountCost,
  setResRules,
  setDisabledPeople,
  setResRuleActive,
  setProvinceCities,
} = newRoomSlice.actions;
export default newRoomSlice.reducer;
