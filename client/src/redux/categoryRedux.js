import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "cat",
  initialState: {
    categories: [],
  },
  reducers: {
    fetchCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { fetchCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;