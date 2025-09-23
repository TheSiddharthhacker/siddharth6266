import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from './App';        // 👈 App ko rename karke Login maana
import Signup from './Signup';
import reportWebVitals from './reportWebVitals';
import Dashboard from "./components/Dashboard";
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import VideoCall from './components/VideoCall';
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

import { AppointmentsProvider } from "./context/AppointmentsContext"; // ✅ import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppointmentsProvider>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* ✅ Auth Pages use Outlet */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />   {/* Login page */}
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* ✅ Main App Pages */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointment-form" element={<AppointmentForm />} />
            <Route path="/appointment-list" element={<AppointmentList />} />
            <Route path="/video-call" element={<VideoCall />} />
          </Route>
        </Routes>
      </AppointmentsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
