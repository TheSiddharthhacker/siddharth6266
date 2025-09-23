import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // 🔹 Fetch all appointments from backend
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments`
      );
      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      toast.error("❌ Failed to load appointments!");
    }
  };

  // 🔹 Run once on app load
  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔹 Book new appointment → refresh list
  const addAppointment = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments/book`,
        data
      );

      if (res.data.success) {
        toast.success("✅ Appointment booked successfully!");
        fetchAppointments(); // refresh list
      } else {
        toast.error("❌ Failed to book appointment!");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{ appointments, fetchAppointments, addAppointment }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

// 🔹 Hook for easy use
export const useAppointments = () => useContext(AppointmentsContext);
