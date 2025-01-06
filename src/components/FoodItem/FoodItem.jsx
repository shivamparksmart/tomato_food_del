/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ image, name, price, desc, id }) => {
  // const [itemCount, setItemCount] = useState(0);
  const {
    cartItems,
    addToCart,
    removeFromCart,
    url,
    setDiscountPrice,
    setPromoCode,
  } = useContext(StoreContext);

  const addinCart = (id) => {
    addToCart(id);
    setDiscountPrice(0);
    setPromoCode("");
  };

  const removeinCart = (id) => {
    removeFromCart(id);
    setDiscountPrice(0);
    setPromoCode("");
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addinCart(id)}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeinCart(id)}
              src={assets.remove_icon_red}
              alt=""
            ></img>
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addinCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p> <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">₹ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
