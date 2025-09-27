import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // 🔹 Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments`
      );
      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  // 🔹 Book new appointment
  const addAppointment = async (form) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments/book`,
        form
      );
      if (res.data.success) {
        toast.success("✅ Appointment booked!");
        await fetchAppointments(); // refresh list immediately
      } else {
        toast.error("❌ Failed to book appointment!");
      }
    } catch (err) {
      console.error("❌ Booking error:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, fetchAppointments }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentsContext);
