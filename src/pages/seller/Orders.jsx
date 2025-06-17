import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/getallorder"
      );
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:items-center gap-5 p-5 max-w-4xl rounded-md border md:flex-row justify-between border-gray-300 text-gray-800"
            >
              <div className="flex gap-5 max-w-80">
                <div>
                  {order.orderItems.map((item, i) => (
                    <div key={item._id || i} className="flex flex-col">
                      <p className="font-medium">
                        {item.product_id?.name ?? "Unknown Product"}{" "}
                        <span className="text-green-500">
                          x {item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80">
                  {order.address_id?.address_line1}
                </p>
                <p>
                  {order.address_id?.city}, {order.address_id?.state}
                </p>
                <p>
                  {order.address_id?.postal_code}, {order.address_id?.country}
                </p>
                <p>{order.address_id?.phone}</p>
              </div>

              <p className="font-medium text-lg my-auto">
                {currency}
                {order.total_amount}
              </p>

              <div className="flex flex-col text-sm md:text-base text-black/60">
                <p>Method: {order.payment_method}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Status: {order.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
