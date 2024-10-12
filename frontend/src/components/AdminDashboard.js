import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
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

  const handleDelete = async (company_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/delete/${company_id}`);
        setCompanies(companies.filter((company) => company.id !== company_id));
      } catch (error) {
        console.error("There was an error deleting the company:", error);
      }
    }
  };

  const handleApprove = async (company_id) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this company?");
    if (confirmApprove) {
      try {
        await axios.put(`http://localhost:5000/api/approve/${company_id}`);
        setCompanies(
          companies.map((company) =>
            company.id === company_id
              ? { ...company, status: "APPROVED" }
              : company
          )
        );
      } catch (error) {
        console.error("There was an error approving the company:", error);
      }
    }
  };

  const handleEdit = (company_id) => {
    navigate(`/edit/${company_id}`);
  };

  const handleCreateCompany = () => {
    navigate("/create-admin-company");
  };

  const handleLogout = () => {
    // Perform any logout logic if necessary (like clearing tokens/session)
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-8">Companies</h2>
      
      <div className="flex flex-col items-center justify-center mb-4">
        <button
          onClick={handleCreateCompany}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 mb-2"
        >
          Create Company
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Created By</th>
              <th className="px-4 py-2">Company Address</th>

              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="border px-4 py-2">{company.id}</td>
                <td className="border px-4 py-2">{company.name}</td>

                <td className="border px-4 py-2">{company.created_by}</td>
                <td className="border px-4 py-2">{company.address}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(company.id)}
                    className="bg-yellow-500 text-white px-3 py-1 ml-2 rounded hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-700"
                  >
                    Delete
                  </button>
                  {company.status !== "APPROVED" && (
                    <button
                      onClick={() => handleApprove(company.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded ml-2 hover:bg-green-700"
                    >
                      Approve
                    </button>
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

export default AdminDashboard;
