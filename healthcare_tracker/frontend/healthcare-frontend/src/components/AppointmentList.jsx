import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/appointments`
        );
        console.log("📌 All appointments:", res.data);

        if (res.data.success) {
          setAppointments(res.data.appointments || []);
        } else {
          toast.error("❌ Failed to load appointments!");
        }
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        toast.error("❌ Failed to load appointments!");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center text-gray-500 font-inter">
        Loading appointments...
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center text-gray-500 font-inter">
        No appointments booked yet.
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-green-700 mb-6 font-poppins">
        Upcoming Appointments
      </h2>

      <div className="space-y-4">
        {appointments.map((a, idx) => {
          const patient = a.patient || a.patientName || "Unknown";
          const doctor = a.doctor || a.doctorName || "Not Assigned";
          const datetime = a.datetime || a.date || a.time || "No Date";
          const medicine = a.medicine || a.prescription || "No medicine prescribed";

          return (
            <div
              key={a._id || `${patient}-${datetime}-${idx}`}
              className="p-5 rounded-xl border border-gray-200 bg-gray-50 shadow-sm 
                       hover:shadow-md hover:border-green-300 transition transform hover:scale-[1.01]"
            >
              <p className="text-lg font-bold text-gray-900 font-poppins">
                👤 {patient}
              </p>
              <p className="text-sm text-gray-700 font-inter mt-1">
                👨‍⚕️ <span className="font-semibold text-green-700">Dr. {doctor}</span>
              </p>
              <p className="text-sm text-gray-600 font-inter mt-1">📅 {datetime}</p>
              <p className="text-sm text-gray-600 font-inter mt-1">💊 {medicine}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
