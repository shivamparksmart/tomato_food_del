/* eslint-disable react/prop-types */
import "./PromoCode.css";
import { promo_codes } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const PromoCode = () => {
  const { setPromoCode, setDiscountPrice, cartSubTotal, discountPrice } =
    useContext(StoreContext);

  const updateCartValue = (value, discount, code) => {
    if (discountPrice === 0) {
      console.log(value);
      const maxDiscount = Math.min(cartSubTotal * discount, value);
      setPromoCode(code);
      setDiscountPrice(maxDiscount);
      toast.success("Discount Applied !");
    } else {
      toast.error("Discount Already Applied !");
    }
  };

  return (
    <div>
      {promo_codes.map((data) => {
        return (
          <div
            key={data._id}
            className={cartSubTotal < data.minOrderValue ? "Inactive" : ""}
          >
            <div className="grid">
              <h3>
                {data.title}
                <span className="value">
                  (On minimum cart value of ₹{data.minOrderValue})
                </span>
              </h3>
              <button
                onClick={() =>
                  updateCartValue(data.maxValue, data.discount, data.code)
                }
                disabled={cartSubTotal <= data.minOrderValue}
                className={cartSubTotal <= data.minOrderValue ? "Inactive" : ""}
              >
                {data.code}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromoCode;
