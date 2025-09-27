// src/components/AppointmentList.jsx
import React from "react";

export default function AppointmentList({ appointments }) {
  console.log("📌 AppointmentList received (raw prop):", appointments);

  if (!appointments) {
    return <div>Loading appointments...</div>;
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
          const patient = a.patient || "Unknown";
          const doctor = a.doctor || "Not Assigned";

          // ✅ datetime ko readable format me dikha rahe
        const datetime = a.datetime && !isNaN(new Date(a.datetime))
  ? new Date(a.datetime).toLocaleString()
  : "No Date";


          const medicine = a.medicine || "No medicine prescribed";

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
