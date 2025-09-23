import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import VideoCall from "./VideoCall";
import { toast } from "react-toastify";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  // ✅ Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/appointments`
        );
        console.log("Fetched appointments:", res.data);

        if (res.data.success) {
          setAppointments(res.data.appointments || []);
        } else {
          toast.error("❌ Failed to load appointments!");
        }
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        toast.error("❌ Failed to load appointments!");
      }
    };

    fetchAppointments();
  }, []);

  // ✅ Add new appointment
// ✅ Add new appointment(s)
const handleNewAppointment = (data) => {
  console.log("New appointment booked:", data);

  // API से latest list fetch करो instead of सिर्फ़ local push
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments`
      );
      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (err) {
      console.error("Failed to refresh appointments:", err);
    }
  };

  fetchAppointments();
};


  return (
    <div className="space-y-10">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 shadow-lg rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-3 font-poppins">
          🌿 Welcome to Your Healthcare Dashboard
        </h2>
        <p className="text-gray-600 font-inter text-lg">
          Manage your health with ease — book appointments, consult doctors on video calls,
          and keep track of your schedule all in one place.
        </p>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appointment Form */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-6 text-green-700 font-poppins">
            📋 Book New Appointment
          </h2>
          <AppointmentForm onBooked={handleNewAppointment} />
        </section>

        {/* Appointment List */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-6 text-green-700 font-poppins">
            📅 Upcoming Appointments
          </h2>
          <AppointmentList appointments={appointments} />
        </section>
      </div>

      {/* Video Call */}
      <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-6 text-green-700 font-poppins">
          🎥 Video Consultation
        </h2>
        <VideoCall channel="testChannel" />
      </section>
    </div>
  );
}

export default Dashboard;
