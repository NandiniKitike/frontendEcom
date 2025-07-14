import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { BASE_URL } from "../../../constant";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const adminData = localStorage.getItem("admin");
      if (!adminData) {
        toast.error("No authentication token found. Please login again.");
        return;
      }
      const admin = JSON.parse(adminData);

      const { data } = await axios.get(`${BASE_URL}/api/orders/getallorder`, {
        headers: { Authorization: `Bearer ${admin.token}` },
      });

      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      } else {
        setOrders([]);
        toast.error("No orders found!");
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // const handleStatusChange = async (orderId, newStatus) => {
  //   try {
  //     const { data } = await axios.put(
  //       `${BASE_URL}/api/orders/status/${orderId}`,
  //       {
  //         status: newStatus,
  //       }
  //     );
  //     if (data.success) {
  //       toast.success("Order status updated successfully!");
  //       fetchOrders();
  //     } else {
  //       toast.error("Failed to update status.");
  //     }
  //   } catch (error) {
  //     toast.error(error.message || "Error updating status");
  //   }
  // };
  const handleStatusChange = async (orderId, newStatus) => {
    if (!orderId || !newStatus) {
      toast.error("Invalid order or status");
      return;
    }

    try {
      const adminData = localStorage.getItem("admin");
      if (!adminData) {
        toast.error("No authentication token found. Please login again.");
        return;
      }
      const admin = JSON.parse(adminData);

      const { data } = await axios.put(
        `${BASE_URL}/api/orders/status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("Order status updated successfully!");
        fetchOrders();
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Status Change Error:", error);
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col items-center max-w-7xl w-full px-4 md:px-10 pt-6">
      <h2 className="text-xl font-bold mb-4 w-full">Orders List</h2>

      <div className="flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="md:table-auto table-fixed w-full overflow-hidden">
          <thead className="text-gray-900 text-1xl text-bold text-left border-b border-gray-200 ">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">SN</th>
              <th className="px-4 py-3 font-semibold truncate">Products</th>
              <th className="px-4 py-3 font-semibold truncate">Amount</th>
              <th className="px-4 py-3 font-semibold truncate hidden md:table-cell">
                Address
              </th>
              <th className="px-4 py-3 font-semibold truncate">Payment</th>
              <th className="px-4 py-3 font-semibold truncate">Date</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
              <th className="px-4 py-3 font-semibold truncate">Change</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 text-sm text-gray-800"
                >
                  <td className=" text-gray-600 px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 truncate">
                    {order.orderItems.map((item, i) => (
                      <div key={i} className="text-gray-600">
                        {item.product_id?.name || "Unknown"} x {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-3 text-gray-600 font-medium">
                    {currency}
                    {order.total_amount}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-600">
                    {order.address_id?.city}, {order.address_id?.state},{" "}
                    {order.address_id?.postal_code}
                    <br />
                    <span className="text-xs text-gray-500">
                      {order.address_id?.phone}
                    </span>
                  </td>

                  <td className="px-4 py-3">{order.payment_method}</td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 capitalize">{order.status}</td>

                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border bg-black text-white border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      {/* <option value="returned">Returned</option> */}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
