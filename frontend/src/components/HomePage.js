import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaKey } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Welcome to Our Application!</h1>
      <p className="text-lg mb-8 text-center text-gray-700">
        Please log in or create a new account to get started.
      </p>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2"
        >
          <FaUserAlt />
          <span>Login</span>
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 flex items-center justify-center space-x-2"
        >
          <FaKey />
          <span>Create User</span>
        </button>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>✔️ User-friendly interface for easy navigation</li>
          <li>✔️ Secure authentication for your safety</li>
          <li>✔️ Quick and easy account creation</li>
          <li>✔️ Responsive design for all devices</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
