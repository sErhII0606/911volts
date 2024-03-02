import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllProductsThunk, searchByCategoryThunk } from "./allProductThunk";
const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};
const initialState = {
  isLoading: false,
  products: [],
  names: [],
  brands: [],
  categories: [],
  totalProducts: 0,
  // numOfPages: 1,
  // page: 1,
  stats: {},

  ...initialFiltersState,
};

export const getAllProducts = createAsyncThunk(
  "allProducts/getAllProducts",
  getAllProductsThunk
);
export const searchByCategory = createAsyncThunk(
  "allProducts/searchByCategory",
  searchByCategoryThunk
);

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.Items;
        state.categories = Array.from(
          new Set(payload.Items.map((product) => product.category))
        );
        state.names = Array.from(
          new Set(payload.Items.map((product) => product.name))
        );
        state.brands = Array.from(
          new Set(
            payload.Items.map((product) =>
              product.brand ? product.brand : "no brand"
            )
          )
        );

        //  state.numOfPages = payload.numOfPages;
        state.totalProducts = payload.Count;
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      .addCase(searchByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchByCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.Items;
        //  state.numOfPages = payload.numOfPages;
        state.totalProducts = payload.Count;
      })
      .addCase(searchByCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      });
  },
});

export const { showLoading, hideLoading, setPage, prevPage, nextPage } =
  allProductsSlice.actions;

export default allProductsSlice.reducer;
