import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
const API_BASE_URL = axios.defaults.baseURL;
const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("bearerToken");

      const { data } = await axios.get(`${API_BASE_URL}/api/orders/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setMyOrders(Array.isArray(data.order) ? data.order : [data.order]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (user && (user._id || user.id)) {
      fetchMyOrders(user._id || user.id);
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase text-black">My Orders</p>
        <div className="w-16 h-0.5 bg-gray-500 rounded-full"></div>
      </div>

      {myOrders.length === 0 ? (
        <p className="text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div>
          {myOrders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
            >
              <p className="flex justify-between md:items-center text-black md:font-medium mx-md:flex-col">
                <span>OrderId: {order._id}</span>
                <span>Payment: {order.payment_method}</span>
                <span>
                  Total Amount: {currency}
                  {order.total_amount}
                </span>
              </p>

              <p className="text-sm text-gray-600 mb-4">
                {/* Address: {order.address_id?.address_line1},{" "} */}
                {order.address_id?.city}, {order.address_id?.state}
              </p>

              {order.orderItems.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className={`relative bg-white text-gray-500 ${
                    order.orderItems.length !== idx + 1 ? "border-b" : ""
                  } border-black-500 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-black-200 rounded-lg">
                      <img
                        src={
                          item.product_id?.images?.length > 0
                            ? item.product_id.images[0]
                            : "https://via.placeholder.com/64"
                        }
                        alt="product"
                        className="w-16 h-16"
                      />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-medium text-black">
                        {item.product_id?.name ?? "Unknown Product"}
                      </h2>
                      <p>
                        Category ID: {item.product_id?.category_id ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-500 text-lg font-medium">
                    <p>Quantity: {item.quantity ?? 1}</p>
                    <p>Status: {order.status ?? "Pending"}</p>
                    <p>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-black-300 text-lg font-medium">
                    Amount: {currency}
                    {(item.price ?? 0) * (item.quantity ?? 1)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
