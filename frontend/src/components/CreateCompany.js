import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdByRole, setCreatedByRole] = useState("IT_USER_NORMAL");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompany = {
      name,
      address,
      created_by: createdBy,
      created_by_role: createdByRole,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/company",
        newCompany
      );
      console.log("Company created:", response.data);
      navigate("/user");
      setName("");
      setAddress("");
      setCreatedBy("");
      setCreatedByRole("IT_USER_NORMAL");
    } catch (error) {
      console.error(
        "Error creating company:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleCancel = () => {
    navigate("/user");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Create Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Created By:</label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Created By Role:</label>
            <input
              type="text"
              value={createdByRole}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
