import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserCompanies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("There was an error fetching the companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCreateCompany = () => {
    navigate("/create-company");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-8">Companies</h2>
      <div className="flex flex-col md:flex-row items-center justify-center mb-4">
        <button
          onClick={handleCreateCompany}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 mb-2 md:mb-0 md:mr-2"
        >
          Create Company
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Company Name</th>
              <th className="px-4 py-2 text-left">Company Address</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b">
                <td className="border px-4 py-2">{company.id}</td>
                <td className="border px-4 py-2">{company.name}</td>
                <td className="border px-4 py-2">{company.address}</td>
                <td className="border px-4 py-2">
                  {company.status !== "APPROVED" && (
                    <span className="text-green-400">To be Approved</span>
                  )}
                  {company.status === "APPROVED" && (
                    <span className="text-green-400">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserCompanies;
