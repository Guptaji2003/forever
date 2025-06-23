import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckout,
  finalizeCheckout,
  updateCheckout,
} from "../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { checkoutInfo } = useSelector((state) => state.checkout);
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalcode: "",
    state: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Create checkout
    await  dispatch(
        createCheckout({
          products:cart.products,
          shippingaddress: shipping,
          totalamount:cart.totalcartamount+10,
          paymentmethod: paymentMethod,
        })
      );

      // const data = checkoutInfo;

      // 2. If PhonePe, redirect to payment page
      // if (data.paymentInitiated && data.redirectUrl) {
      //   window.location.href = data.redirectUrl;
      //   return;
      // }

      // 3. If COD or UPI, simulate successful payment
      if (paymentMethod === "Cash on Delivery" || paymentMethod === "UPI") {
       await dispatch(
          updateCheckout({
            id: checkoutInfo._id,
            paymentStatus: "paid",
            paymentDetails: {
              method: paymentMethod,
              transactionId: `txn_${Date.now()}`,
            },
          })
        );

        // 4. Finalize order
       await dispatch(finalizeCheckout(checkoutInfo._id));
        alert("Order placed successfully!");
        navigate("/user/orders");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
          <input
            name="address"
            placeholder="Address"
            value={shipping.address}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
          <input
            name="postalcode"
            placeholder="Postal Code"
            type="number"
            value={shipping.postalcode}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
          <input
            name="state"
            placeholder="State"
            value={shipping.state}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
        </div>

        {/* Payment and Summary */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Payment & Summary</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Phonepe</option>
          </select>

          <div className="mb-4 space-y-2">
            {cart?.products?.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <p>
                  {item.name} × {item.quantity}
                </p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>₹{cart?.totalcartamount}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
