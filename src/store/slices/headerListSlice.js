import { createSlice } from "@reduxjs/toolkit";

const HeaderListSlice = createSlice({
  name: "header",

  initialState: {
    value: false,
    showSearchBox: false,
    showSearchProvinceList: false,
    showSearchCityList: false,
    selectedCities: [],
    showSignIn: false,
    mobileNumber: "",
    showMobileNumber: true,
    mobileNumberRegistered: 0,
    logged: false,
    userImage: "",
    userfullname: "",
    password: "",
  },
  reducers: {
    showList: (state, action) => {
      state.value = true;
    },
    notShowList: (state, action) => {
      state.value = false;
    },
    setShowSearchBox: (state, action) => {
      state.showSearchBox = action.payload;
    },
    setShowSearchProvinceList: (state, action) => {
      state.showSearchProvinceList = action.payload;
    },
    setShowSearchCityList: (state, action) => {
      state.showSearchCityList = action.payload;
    },
    setSelectedCities: (state, action) => {
      const findCity = state.selectedCities.find(
        (item) => item.id === action.payload.id
      );
      if (!findCity) {
        state.selectedCities = [...state.selectedCities, action.payload];
      } else {
        state.selectedCities = state.selectedCities.filter(
          (item) => item.id != action.payload.id
        );
      }
    },
    removeSelectedCities: (state, action) => {
      state.selectedCities = state.selectedCities.filter(
        (item) => item.id != action.payload
      );
    },
    setSelectedAlLCities: (state, action) => {
      state.selectedCities = action.payload;
    },
    setShowSignIn: (state, action) => {
      state.showSignIn = action.payload;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setShowMobileNumber: (state, action) => {
      state.showMobileNumber = action.payload;
    },
    setmobileNumberRegistered: (state, action) => {
      state.mobileNumberRegistered = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.logged = action.payload;
    },
    setUserfullname: (state, action) => {
      state.userfullname = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
  },
});

export const {
  showList,
  notShowList,
  setShowSearchBox,
  setShowSearchProvinceList,
  setShowSearchCityList,
  setSelectedCities,
  removeSelectedCities,
  setSelectedAlLCities,
  setShowSignIn,
  setMobileNumber,
  setShowMobileNumber,
  setmobileNumberRegistered,
  setPassword,
  setUserfullname,
  setLoggedIn,
  setUserImage
} = HeaderListSlice.actions;
export default HeaderListSlice.reducer;
