import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { BASE_URL } from "../../constant";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, user } = useAppContext();
  const navigate = useNavigate();
  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("bearerToken");

      const { data } = await axios.get(`${BASE_URL}/api/orders/user`, {
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
      <div className="block lg:hidden absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)} // go back
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <IoIosArrowBack className="text-2xl text-black" />
        </button>
      </div>
      <div className="flex flex-col items-start mb-8">
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
              <div className="flex flex-col sm:flex-col md:flex-row justify-between md:items-center text-black font-medium gap-1 sm:gap-2 mb-2">
                <span>OrderId: {order._id}</span>
                <span>Payment: {order.payment_method}</span>
                <span>
                  Total Amount: {currency}
                  {order.total_amount}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {order.address_id?.city}, {order.address_id?.state}
              </p>

              {order.orderItems.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className={`relative bg-white text-gray-500 ${
                    order.orderItems.length !== idx + 1 ? "border-b" : ""
                  } border-black-500 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 gap-4`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-black-200 rounded-lg flex-shrink-0">
                      <img
                        src={
                          item.product_id?.images?.length > 0
                            ? item.product_id.images[0]
                            : "https://via.placeholder.com/64"
                        }
                        alt="product"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-black">
                        {item.product_id?.name ?? "Unknown Product"}
                      </h2>
                      <p className="text-xs text-gray-500">
                        Category ID: {item.product_id?.category_id ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-600 text-sm md:text-base font-medium">
                    <p>Quantity: {item.quantity ?? 1}</p>
                    <p>Status: {order.status ?? "Pending"}</p>
                    <p>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-black font-medium text-base">
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
