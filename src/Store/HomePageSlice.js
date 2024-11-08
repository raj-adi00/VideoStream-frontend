import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homePage: 1,
};

const HomePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        changePage: (state, action) => {
            const { increment, totalPage } = action.payload;
            const newPage = state.homePage + increment;

            // Check if the new page is within the valid range
            if (newPage >= 1 && newPage <= totalPage) {
                state.homePage = newPage;
            }
        },
    },
});

export const { changePage } = HomePageSlice.actions;
export default HomePageSlice.reducer;
