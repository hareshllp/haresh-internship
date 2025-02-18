
import { createSlice } from "@reduxjs/toolkit";
import { RECORDS_PER_PAGES } from '../../constants';
import { calculatePagesCount } from '../../helpers';

export interface productTypes {
  id: string,
  productCategory: string,
  productName: string,
  description: string,
  manufacturer: string,
  price: string,
}


type initialStateType = {
  data: productTypes[],
  totalRecords: number,
  loading: boolean,
  error: string,
  pagination: {
    totalPages: number,
    isPaginationReady: boolean,
    currentPage:number
  },
  addProduct: {
    popupOpened: boolean,
    isEditMode: boolean,
    productId: string
  },
  dataToggler: boolean
}

let initialState: initialStateType = {
  data: [],
  totalRecords: 0,
  loading: false,
  error: "",
  pagination: {
    totalPages: 1,
    isPaginationReady: true,
    currentPage:1
  },
  addProduct: {
    popupOpened: false,
    isEditMode: false,
    productId: ''
  },
  dataToggler: false
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductClicked: state => {
      state.addProduct = { ...state.addProduct, popupOpened: true, isEditMode: false }
    },
    addProductClosed: state => {
      state.addProduct.popupOpened = false;
    },
    storeProduct: (state, action) => {
      // console.log(action.payload);
      state.data.push(action.payload);

      //update pagination
      state.totalRecords = state.data.length;
      state.pagination.totalPages = calculatePagesCount(RECORDS_PER_PAGES, state.totalRecords);

    },
    editProductClicked: (state, action) => {
      state.addProduct = {
        ...state.addProduct,
        popupOpened: true,
        isEditMode: true,
        productId: action.payload.id
      };
    },
    editProduct: (state, action) => {
      let productId = action.payload.id;
      let newData = action.payload;
      let updatedProducts = state.data.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            productCategory: newData.productCategory,
            productName: newData.productName,
            description: newData.description,
            manufacturer: newData.manufacturer,
            price: newData.price,
          }
        }
        return product;
      });
      state.data = updatedProducts;
      state.addProduct.isEditMode = false;
      state.dataToggler = !state.dataToggler;
    },
    deleteProduct: (state, action) => {
      let productId = action.payload.id;
      let matchedIndex = state.data.findIndex((data, index) => data.id === productId);
      state.data.splice(matchedIndex, 1);
      state.totalRecords = state.data.length;
      state.pagination.totalPages = calculatePagesCount(RECORDS_PER_PAGES, state.totalRecords);
    },
    setCurrentPage:(state,action) => {
      state.pagination.currentPage = action.payload.page;  
    }

  }
});

export const {
  addProductClicked,
  addProductClosed,
  storeProduct,
  editProductClicked,
  editProduct,
  deleteProduct,
  setCurrentPage
} = productsSlice.actions;

export default productsSlice.reducer







