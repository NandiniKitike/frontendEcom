import React, { useEffect } from "react";

const PaymentGetway = ({ onSuccess }) => {
  const options = {
    key: "rzp_test_HJG5Rtuy8Xh2NB",
    amount: "10000", //  = INR 1
    name: "Acme shop",
    description: "some description",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function () {
      onSuccess();
    },
    prefill: {
      name: "Gaurav",
      contact: "9999999999",
      email: "demo@demo.com",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "#F37254",
      hide_topbar: false,
    },
  };

  const openPayModal = (options) => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="rounded-lg p-4 items-center w-full flex  justify-center ">
        <button
          // className="bg-black font-semibold w-full px-6 py-2 rounded"
          className="w-full py-3 rounded-md cursor-pointer bg-black text-white font-medium  disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={() => openPayModal(options)}
        >
          Pay
        </button>
      </div>
    </>
  );
};
export default PaymentGetway;
