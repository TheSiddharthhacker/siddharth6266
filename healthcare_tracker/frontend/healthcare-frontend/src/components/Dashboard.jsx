import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import VideoCall from "./VideoCall";
import { toast } from "react-toastify";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  // ✅ Fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments`
      );
      console.log("📌 All Appointments (raw):", res.data);

      if (res.data.success && Array.isArray(res.data.appointments)) {
        setAppointments(res.data.appointments);
        console.log("📌 SET Appointments:", res.data.appointments);
      } else {
        toast.error("❌ Failed to load appointments!");
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      toast.error("❌ Failed to load appointments!");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleNewAppointment = () => {
    fetchAppointments();
  };

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-r from-green-100 to-green-50 shadow-lg rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-3 font-poppins">
          🌿 Welcome to Your Healthcare Dashboard
        </h2>
        <p className="text-gray-600 font-inter text-lg">
          Manage your health with ease — book appointments, consult doctors on
          video calls, and keep track of your schedule all in one place.
        </p>
      </div>

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
          {/* ✅ Data pass karte time log */}
          {console.log("📌 Passing to AppointmentList:", appointments)}
          <AppointmentList appointments={appointments || []} />

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
