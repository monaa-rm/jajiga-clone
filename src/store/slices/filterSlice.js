import { createSlice } from "@reduxjs/toolkit";
import { countTrueValues } from "../../../utils/constants";

const filterSlice = createSlice({
  name: "calendar",

  initialState: {
    sortTitle : {
      link: "bests",
      title: "از برترین",
    },
    isSearching: false,
    showCalendar: false,
    showGuestNum: false,
    showCost: false,
    showBedroom: false,
    showProperty: false,
    showType: false,
    showRegion: false,
    ShowOtherFilters: false,
    bounds: null,
    sendBounds: false,
    PointHome: "",
    activeItems: 0,
    calendarFilter: { active: false, date: [] },
    guestFilter: { active: false, number: 1 },
    costFilter: { active: false, cost: [0, 25000000] },
    bedroomFilter: { active: false, room: 0, bed: 0 },
    propertiesFilter: {
      active: false,
      properties: {
        luxury: false,
        villa_sea: false,
        discount: false,
        scenic: false,
        disabled: false,
        plus: false,
        instant: false,
        pet: false,
      },
    },
    typeFilter: {
      active: false,
      type: {
        villa: false,
        apartment: false,
        suite: false,
        cottage: false,
        ruralhome: false,
      },
    },
    regionFilter: {
      active: false,
      region: {
        beach: false,
        jungle: false,
        cuntrySide: false,
        city: false,
        cityround: false,
        rural: false,
      },
    },
    rentTypeFilter: {
      active: false,
      type: { exclusive: false, notexclusive: false },
    },
    optionsFilter: {
      active: false,
      options: {
        pool: false,
        billiard: false,
        toilet: false,
        shower: false,
        parking: false,
        coolingSystem: false,
        heatingSystem: false,
        vacuumCleaner: false,
        gasStove: false,
        kitchen: false,
        kebab: false,
        sofa: false,
        tv: false,
        lunchtable: false,
        cleanstuff: false,
        closetDrawer: false,
        electricity: false,
        onDay: false,
        elevator: false,
        washingMachine: false,
        microwave: false,
        wifi: false,
        phone: false,
        fridge: false,
        iron: false,
        water: false,
      },
    },
    rulesFilter: {
      active: false,
      rules: {
        pet: false,
        smoke: false,
        party: false,
      },
    },
    enabled : false,
  },
  reducers: {
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setShowCalendar: (state, action) => {
      state.showCalendar = action.payload;
    },
    setShowGuestNum: (state, action) => {
      state.showGuestNum = action.payload;
    },
    setShowCost: (state, action) => {
      state.showCost = action.payload;
    },
    setShowBedroom: (state, action) => {
      state.showBedroom = action.payload;
    },
    setShowProperty: (state, action) => {
      state.showProperty = action.payload;
    },
    setShowType: (state, action) => {
      state.showType = action.payload;
    },
    setShowRegion: (state, action) => {
      state.showRegion = action.payload;
    },
    setShowOtherFilters: (state, action) => {
      state.ShowOtherFilters = action.payload;
    },
    setCalendarFilterValues: (state, action) => {
      state.calendarFilter.date = action.payload;
    },
    calendarActive: (state, action) => {
      state.calendarFilter.active = action.payload;
    },
    setGuestNum: (state, action) => {
      state.guestFilter.number = action.payload;
    },
    guestNumActive: (state, action) => {
      state.guestFilter.active = action.payload;
    },
    setCost: (state, action) => {
      state.costFilter.cost = action.payload;
    },
    costActive: (state, action) => {
      state.costFilter.active = action.payload;
    },
    setRoom: (state, action) => {
      state.bedroomFilter.room = action.payload;
    },
    setBed: (state, action) => {
      state.bedroomFilter.bed = action.payload;
    },

    bedroomActive: (state, action) => {
      state.bedroomFilter.active = action.payload;
    },
    setProperties: (state, action) => {
      state.propertiesFilter.properties = {
        ...state.propertiesFilter.properties,
        [action.payload]: !state.propertiesFilter.properties[action.payload],
      };
    },
    setAllProperties: (state) => {
      state.propertiesFilter.properties = {
        luxury: false,
        villa_sea: false,
        discount: false,
        scenic: false,
        disabled: false,
        plus: false,
        instant: false,
        pet: false,
      };
    },
    propertiesActive: (state, action) => {
      state.propertiesFilter.active = action.payload;
    },
    setTypes: (state, action) => {
      state.typeFilter.type = {
        ...state.typeFilter.type,
        [action.payload]: !state.typeFilter.type[action.payload],
      };
    },
    setAllTypes: (state) => {
      state.typeFilter.type = {
        villa: false,
        apartment: false,
        suite: false,
        cottage: false,
        ruralhome: false,
      };
    },
    typeActive: (state, action) => {
      state.typeFilter.active = action.payload;
    },
    setRegions: (state, action) => {
      state.regionFilter.region = {
        ...state.regionFilter.region,
        [action.payload]: !state.regionFilter.region[action.payload],
      };
    },
    setAllRegions: (state) => {
      state.regionFilter.region = {
        beach: false,
        jungle: false,
        cuntrySide: false,
        city: false,
        cityround: false,
        rural: false,
      };
    },
    regionActive: (state, action) => {
      state.regionFilter.active = action.payload;
    },
    setExclusive: (state, action) => {
      state.rentTypeFilter.type = {
        ...state.rentTypeFilter.type,
        [action.payload]: !state.rentTypeFilter.type[action.payload],
      };
    },
    deleteExclusive: (state, action) => {
      state.rentTypeFilter.type = { exclusive: false, notexclusive: false };
    },
    exclusiveActive: (state, action) => {
      state.rentTypeFilter.active = action.payload;
    },
    setOptions: (state, action) => {
      state.optionsFilter.options = {
        ...state.optionsFilter.options,
        [action.payload]: !state.optionsFilter.options[action.payload],
      };
    },
    deleteOptions: (state, action) => {
      state.optionsFilter.options = {
        pool: false,
        billiard: false,
        toilet: false,
        shower: false,
        parking: false,
        coolingSystem: false,
        heatingSystem: false,
        vacuumCleaner: false,
        gasStove: false,
        kitchen: false,
        kebab: false,
        sofa: false,
        tv: false,
        lunchtable: false,
        cleanstuff: false,
        closetDrawer: false,
        electricity: false,
        onDay: false,
        elevator: false,
        washingMachine: false,
        microwave: false,
        wifi: false,
        phone: false,
        fridge: false,
        iron: false,
        water: false,
      };
    },
    optionsActive: (state, action) => {
      state.optionsFilter.active = action.payload;
    },
    setRules: (state, action) => {
      state.rulesFilter.rules = {
        ...state.rulesFilter.rules,
        [action.payload]: !state.rulesFilter.rules[action.payload],
      };
    },
    deleteRules: (state, action) => {
      state.rulesFilter.rules = {
        pet: false,
        smoke: false,
        party: false,
      };
    },
    rulesActive: (state, action) => {
      state.rulesFilter.active = action.payload;
    },
    setActiveNumbers: (state, action) => {
      let plusValue = 0;
      if (action.payload == "sm") {
        const costtrueItems =
          state.costFilter.cost[0] > 0 || state.costFilter.cost[1] < 25000000
            ? 1
            : 0;
        const bedtrueItems = state.bedroomFilter.bed > 0 ? 1 : 0;
        const roomtrueItems = state.bedroomFilter.room > 0 ? 1 : 0;
        const propertiestrueItems = countTrueValues(
          state.propertiesFilter.properties
        );
        const typetrueItems = countTrueValues(state.typeFilter.type);
        const regiontrueItems = countTrueValues(state.regionFilter.region);
        const rentTypetrueItems = countTrueValues(state.rentTypeFilter.type);
        const optionstrueItems = countTrueValues(state.optionsFilter.options);
        const rulestrueItems = countTrueValues(state.rulesFilter.rules);
        plusValue =
          costtrueItems +
          bedtrueItems +
          roomtrueItems +
          propertiestrueItems +
          typetrueItems +
          regiontrueItems +
          rentTypetrueItems +
          optionstrueItems +
          rulestrueItems;
      }
      state.activeItems = plusValue;
    },
    setPointHome: (state, action) => {
      state.PointHome = action.payload;
    },
    setBounds: (state, action) => {
      state.bounds = action.payload;
    },
    setSendBounds: (state, action) => {
      state.sendBounds = action.payload;
    },
    setSortTitle: (state, action) => {
      state.sortTitle = action.payload;
    },
    setEnabled: (state, action) => {
      state.enabled = action.payload;
    },
  },
});

export const {
  setSortTitle,
  setIsSearching,
  setShowCalendar,
  setShowGuestNum,
  setShowCost,
  setShowBedroom,
  setShowProperty,
  setShowType,
  setShowRegion,
  setShowOtherFilters,
  setCalendarFilterValues,
  calendarActive,
  setGuestNum,
  guestNumActive,
  setCost,
  costActive,
  setBed,
  setRoom,
  bedroomActive,
  setProperties,
  propertiesActive,
  setAllProperties,
  typeActive,
  setAllTypes,
  setTypes,
  setAllRegions,
  setRegions,
  regionActive,
  setExclusive,
  exclusiveActive,
  deleteExclusive,
  setOptions,
  optionsActive,
  deleteOptions,
  setRules,
  deleteRules,
  rulesActive,
  setActiveNumbers,
  setPointHome,
  setBounds,
  setSendBounds,
  setEnabled
} = filterSlice.actions;
export default filterSlice.reducer;
