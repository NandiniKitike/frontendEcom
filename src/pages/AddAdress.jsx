import React, { useState } from "react";
import { assets } from "../assets/assets";

import { useNavigate } from "react-router-dom";
const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className="w-full px-2 py-2.5 border border-gray-500 rounded outline-none text-gray-500 focus:border-green transition"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  );
};

const AddAdress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/Address/createAdr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔒 VERY IMPORTANT
        body: JSON.stringify({
          address_line1: address.street,
          address_line2: `${address.firstName} ${address.lastName}`,
          city: address.city,
          state: address.state,
          postal_code: address.zipcode,
          country: address.country,
          is_default: true,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Address created successfully");
        navigate("/cart");
        console.log(data);
      } else {
        alert(`❌ Failed: ${data.message}`);
        console.error(data);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping{" "}
        <span className="font-semibold text-green-500">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                name="firstName"
                placeholder="First Name"
                address={address}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                address={address}
                handleChange={handleChange}
              />
            </div>
            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              address={address}
              handleChange={handleChange}
            />
            <InputField
              type="text"
              name="street"
              placeholder="Street Address"
              address={address}
              handleChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                name="city"
                placeholder="City"
                address={address}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                name="state"
                placeholder="State"
                address={address}
                handleChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                address={address}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                name="country"
                placeholder="Country"
                address={address}
                handleChange={handleChange}
              />
            </div>
            <InputField
              type="text"
              name="phone"
              placeholder="Phone"
              address={address}
              handleChange={handleChange}
            />
            <button
              type="submit"
              className="w-full mt-6 bg-green-500 text-white py-3 hover:bg-green-600 transition cursor-pointer"
            >
              Save Address
            </button>
          </form>
        </div>
        <img
          className="mb-16 md:mr-16 md-mt-0"
          src={assets.address_image}
          alt="address"
        />
      </div>
    </div>
  );
};

export default AddAdress;
