// products context

import React, { children } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts, paginate } from "../utils/helpers";

export const ProductContext = React.createContext();

//Provider, Consumer, useContext()

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  // extra state values
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filters, setFilters] = React.useState({
    search: "",
    category: "all",
    shipping: false,
    price: "all",
  });

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      const featured = featuredProducts(flattenProducts(response.data));
      const products = flattenProducts(response.data);

      setSorted(paginate(products));

      setProducts(products);
      setFeatured(featured);
      setLoading(false);
    });

    return () => {};
  }, []);

  React.useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.Price - b.Price);
    const { search, category, shipping, price } = filters;
    // logic

    if (category !== "all") {
      newProducts = newProducts.filter((item) => item.category === category);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter(
        (item) => item.free_shipping === shipping
      );
    }

    if (search !== "") {
      newProducts = newProducts.filter((item) => {
        let title = item.Title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }

    if (price !== "all") {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.Price < 300;
        } else if (price === 300) {
          return item.Price > 300 && item.Price < 650;
        } else {
          return item.Price > 650;
        }
      });
    }
    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);

  const changePage = (index) => {
    setPage(index);
  };

  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    console.log("update filters");
    //console.log(e);
    //console.log(value);
    //console.log(type, filter, value);
    if (type === "checkbox") {
      filterValue = e.target.checked;
    } else if (type === "radio") {
      value === "all" ? (filterValue = value) : (filterValue = parseInt(value));
      console.log(value);
    } else {
      filterValue = value;
    }

    setFilters({ ...filters, [filter]: filterValue });

    console.log(filters);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
