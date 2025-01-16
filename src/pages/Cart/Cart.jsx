import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import PromoCode from "../../components/PromoCodes/PromoCode";
import { Helmet } from "react-helmet";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    promoCode,
    discountPrice,
    setPromoCode,
    setDiscountPrice,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  console.log(food_list);
  console.log(cartItems);

  const removeItems = (id) => {
    removeFromCart(id);
    setPromoCode("");
    setDiscountPrice(0);
  };

  return (
    <>
      <Helmet>
        <title>Tomato. - Cart</title>
        <meta name="description" content="Order your food now" />
      </Helmet>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeItems(item._id)} className="cross">
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</p>
              </div>
              {discountPrice ? (
                <div className="cart-total-details">
                  <p> (Inclusive of Discount Value) </p>
                  <p> (- ₹{discountPrice})</p>
                </div>
              ) : (
                ""
              )}
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}
                </b>
              </div>
              <button onClick={() => navigate("/order")}>
                Proceed To Checkout
              </button>
            </div>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promo-input">
                <input type="text" placeholder="promo code" value={promoCode} />
              </div>
            </div>
            <PromoCode />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
