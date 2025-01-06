/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const url = "http://localhost:4000";

  const url = "https://react-food-backend-nuhi.onrender.com";

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [search, setSearch] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
          if (discountPrice !== 0) {
            totalAmount -= discountPrice;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setCartSubTotal(totalAmount);
    return totalAmount;
  };

  const fetchFoodList = async () => {
    console.log(searchItem);
    console.log(search);
    if (searchItem) {
      const searchList = await axios.get(
        url + `/api/food/search?query=${searchItem}`
      );
      setFoodList(searchList.data.data);
    } else {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [searchItem, search, setCartSubTotal]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    discountPrice,
    setDiscountPrice,
    promoCode,
    setPromoCode,
    cartSubTotal,
    search,
    setSearch,
    searchItem,
    setSearchItem,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
