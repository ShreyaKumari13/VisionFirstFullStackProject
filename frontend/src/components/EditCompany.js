import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCompany() {
  const { company_id } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/companies/${company_id}`);
        const company = response.data;
        setName(company.name);
        setAddress(company.address);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchCompany();
  }, [company_id]);

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/update/${company_id}`, { name, address });
      alert('Company updated successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin'); // Navigate back to the admin page
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Company</h2>
      <form onSubmit={handleUpdateCompany} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Company Name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Company Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Company Address"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
          <button
            type="button" // Change type to "button" to prevent form submission
            onClick={handleCancel}
            className="w-full md:w-auto bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCompany;
