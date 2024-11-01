import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",

  initialState: { values: [] },
  reducers: {
    setCalendarValues: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { setCalendarValues } = calendarSlice.actions;
export default calendarSlice.reducer;
