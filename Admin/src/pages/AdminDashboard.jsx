import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import Footer from "../components/Layout/Footer";
const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer/>
    </div>
  );
};

export default AdminDashboard;
