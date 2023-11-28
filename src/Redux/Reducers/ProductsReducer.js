import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCES,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SORT_BY_PRICE_FAIL,
  PRODUCT_SORT_BY_PRICE_REQUEST,
  PRODUCT_SORT_BY_PRICE_SUCCESS,
  PRODUCT_SORT_FAIL,
  PRODUCT_SORT_REQUEST,
  PRODUCT_SORT_SUCCESS,
  SET_SORT_ORDER,
} from "../Constants/ProductsConstants";

//lista de productso
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      console.log("Reducer: products", action.payload.products, "page", action.payload.page, "pages", action.payload.pages, "loading", action.payload.loading);

      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case PRODUCT_LIST_FAIL:
      console.error("Reducer error:", action.payload); // Agrega un log aquí

      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reductor para el ordenamiento general y por precio
export const productSortReducer = (
  state = { loading: true, products: [], sortOptions: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_SORT_REQUEST:
    case PRODUCT_SORT_BY_PRICE_REQUEST:
      return {
        loading: true,
        products: [],
        sortOptions: null,
      };
    case PRODUCT_SORT_SUCCESS:
    case PRODUCT_SORT_BY_PRICE_SUCCESS:
      console.log("sortOptions in reducer:", action.payload.sortOptions,"products", action.payload.products,"page",action.payload.page, "pages",action.payload.pages,"loading",action.payload.loading);
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        sortOptions: action.payload.sortOptions || null,
      };
    case PRODUCT_SORT_FAIL:
    case PRODUCT_SORT_BY_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
        sortOptions: null,
      };
    default:
      return state;
  }
};


//detalle de producto
export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//REVIEW
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCES:
      return { loading: false, success: true, reviewData: action.reviewData };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
