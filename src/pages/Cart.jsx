import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentGetway from "../paymnetgetway/PaymentGetway";
import { useAppContext } from "../context/AppContext";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constant";

const Cart = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const { upadteToCartAPI, setCartItems, cartItems, handleDelete } =
    useAppContext();
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("bearerToken");
      const res = await axios.get(`${BASE_URL}/api/cart/getcart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success && res.data.cart.length > 0) {
        setCartItems(res.data.cart[0].items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("bearerToken");
      const res = await axios.get(`${BASE_URL}/api/Address/getAddress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data && Array.isArray(res.data)) {
        setAddresses(res.data);

        const defaultAddress = res.data.find((addr) => addr.is_default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        } else if (res.data.length > 0) {
          setSelectedAddress(res.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     const token = localStorage.getItem("bearerToken");
  //     const res = await axios.delete(
  //       `http://localhost:5000/api/cart/remove/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       console.log("Item deleted successfully.");
  //       await fetchCart();
  //     } else {
  //       console.warn("Failed to delete item.");
  //     }
  //   } catch (error) {
  //     console.error("Delete item failed:", error);
  //   }
  // };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddress(false);
  };

  const handleAddNewAddress = () => {
    setShowAddress(false);
    navigate("/add-address");
  };

  const calculateTotals = () => {
    if (!Array.isArray(cartItems)) {
      return { subtotal: 0, tax: 0, total: 0 };
    }

    const subtotal = cartItems.reduce((total, item) => {
      const price = item?.product_id?.price ?? 0;
      const quantity = item?.quantity ?? 1;
      return total + price * quantity;
    }, 0);

    const tax = subtotal * 0.02; // 2% tax
    const total = subtotal + tax;

    return { subtotal, tax, total };
  };
  const { subtotal, tax, total } = calculateTotals();

  const handlePlaceOrder = async () => {
    if (!selectedAddress || cartItems.length === 0) return;

    try {
      const token = localStorage.getItem("bearerToken");

      const orderPayload = {
        address_id: selectedAddress._id,
        payment_method: paymentMethod.toLowerCase(),
        items: cartItems.map((item) => ({
          product_id: item.product_id._id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(
        `${BASE_URL}/api/orders`,
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Order placed") {
        alert("Order placed successfully!");
        navigate("/my-orders");
        setCartItems({}); // or redirect to order details
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong while placing the order.");
      console.error(
        "Order placement failed:",
        error?.response?.data || error.message || error
      );
    }
  };
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-black">{cartItems.length} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>
        {Array.isArray(cartItems) &&
          cartItems?.map((item, index) => {
            const product = item.product_id;
            return (
              <div
                key={item._id || index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex  items-center justify-center border border-gray-300 rounded">
                    <img
                      className="max-w-full h-full object-cover"
                      src={product?.images?.[0]}
                      alt={product?.name || "Product Image"}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold text-black">
                      {product?.name}
                    </p>
                    <div className="font-normal text-gray-500/70">
                      <p>
                        Description: <span>{product?.description}</span>
                      </p>
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <select
                          className="outline-none"
                          value={item.quantity}
                          onChange={(e) => {
                            e.stopPropagation();
                            upadteToCartAPI(
                              product._id,
                              Number(e.target.value)
                            );
                          }}
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">₹{product?.price * item.quantity}</p>
                <button
                  onClick={() => handleDelete(product?._id)}
                  className="cursor-pointer px-4 py-2 rounded-full hover:bg-black mx-auto text-white bg-gray-600"
                  title="Delete"
                >
                  Remove
                </button>
              </div>
            );
          })}

        <Link
          to="/products"
          className="group mt-8 flex cursor-pointer items-center gap-2 text-black font-medium"
        >
          Continue Shopping
          <IoIosArrowRoundForward className="text-2xl text-black transition-transform duration-300 transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative mt-2">
            <div className="flex justify-between items-start">
              {loading ? (
                <p className="text-gray-500">Loading addresses...</p>
              ) : (
                <div className="flex-1 mr-2">
                  {selectedAddress ? (
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">
                        {selectedAddress.address_line1}
                      </p>
                      {selectedAddress.address_line2 && (
                        <p>{selectedAddress.address_line2}</p>
                      )}
                      <p>
                        {selectedAddress.city}, {selectedAddress.state}
                      </p>
                      <p>
                        {selectedAddress.postal_code}, {selectedAddress.country}
                      </p>
                      {selectedAddress.is_default && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                          Default
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">No address found</p>
                  )}
                </div>
              )}

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-black hover:underline cursor-pointer text-sm"
                disabled={loading}
              >
                {addresses.length > 0 ? "Change" : "Add"}
              </button>
            </div>

            {showAddress && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <div
                      key={address._id}
                      onClick={() => handleAddressSelect(address)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="text-sm">
                        <p className="font-medium flex items-center">
                          {address.address_line1}
                          {address.is_default && (
                            <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </p>
                        {address.address_line2 && (
                          <p className="text-gray-600">
                            {address.address_line2}
                          </p>
                        )}
                        <p className="text-gray-600">
                          {address.city}, {address.state} -{" "}
                          {address.postal_code}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    No addresses found
                  </div>
                )}

                <div className="p-3 border-t border-gray-200">
                  <button
                    onClick={handleAddNewAddress}
                    className="w-full hover:bg-black hover:text-white text-black py-2 text-sm rounded"
                  >
                    + Add New Address
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>
        <hr className="border-gray-300" />
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3 pt-2 border-t border-gray-300">
            <span>Total Amount:</span>
            <span>₹{total.toFixed(2)}</span>
          </p>
        </div>
        {paymentMethod === "COD" ? (
          <button
            className="w-full py-3 mt-6 rounded-md cursor-pointer bg-black text-white font-medium  disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!selectedAddress || cartItems.length === 0}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        ) : (
          <PaymentGetway onSuccess={handlePlaceOrder} />
        )}

        {!selectedAddress && cartItems.length > 0 && (
          <p className="text-red-500 text-xs mt-2 text-center">
            Please select a delivery address to place order
          </p>
        )}
      </div>
    </div>
  );
};
export default Cart;
