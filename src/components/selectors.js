// En un archivo selectors.js
import { createSelector } from 'reselect';

const selectProductList = (state) => state.productList;
const selectProductSort = (state) => state.sortOrder;

export const selectCombinedProducts = createSelector(
  [selectProductList, selectProductSort],
  (productList, sortOrder) => {
    console.log("Selector: productList", productList);
    console.log("Selector: sortOrder", sortOrder);

    return {
      loading: productList.loading || sortOrder.loading,
      error: productList.error || sortOrder.error,
      products: sortOrder.products || productList.products,
      page: productList.page || sortOrder.page,
      pages: productList.pages || sortOrder.pages,
      sortOptions: sortOrder.sortOptions,
      sortOrder: sortOrder.sortOrder,
    };
  }
);

const { loading, error, pages, page, products, sortOptions } = selectCombinedProducts;




