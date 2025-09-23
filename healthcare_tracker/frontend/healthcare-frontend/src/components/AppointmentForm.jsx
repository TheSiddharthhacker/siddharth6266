import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AppointmentForm({ onBooked = () => {} }) {
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    datetime: "",
    medicine: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments/book`,
        form
      );

      console.log("📌 Appointment API Response:", res.data);

      if (res.data.success) {
        const newAppointment = res.data.appointment || res.data.data || res.data;

        // ✅ Pehle parent state update karo
        onBooked(newAppointment);

        // ✅ Server se latest appointments list bhi fetch karo
        try {
          const listRes = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/appointments`
          );
          if (listRes.data.success) {
            onBooked(listRes.data.appointments); // full list bhejo
          }
        } catch (fetchErr) {
          console.error("❌ Failed to refresh appointments:", fetchErr);
        }

        toast.success("✅ Appointment booked successfully!");
        setForm({
          patient: "",
          doctor: "",
          datetime: "",
          medicine: "",
          phone: "",
        });
      } else {
        toast.error("❌ Failed to book appointment!");
      }
    } catch (err) {
      console.error("Failed to book appointment:", err);
      toast.error("❌ Something went wrong. Try again!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg space-y-6 font-inter border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-green-700 font-poppins mb-4">
        Book New Appointment
      </h2>

      {/* Patient */}
      <div>
        <label className="block text-sm font-poppins text-gray-700 mb-1">
          Patient Name
        </label>
        <input
          type="text"
          name="patient"
          placeholder="Enter patient name"
          value={form.patient}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 font-inter 
                     focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
        />
      </div>

      {/* Doctor */}
      <div>
        <label className="block text-sm font-poppins text-gray-700 mb-1">
          Doctor
        </label>
        <input
          type="text"
          name="doctor"
          placeholder="Enter doctor's name"
          value={form.doctor}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 font-inter 
                     focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
        />
      </div>

      {/* Date & Time */}
      <div>
        <label className="block text-sm font-poppins text-gray-700 mb-1">
          Date & Time
        </label>
        <input
          type="datetime-local"
          name="datetime"
          value={form.datetime}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 font-inter 
                     focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
        />
      </div>

      {/* Medicine */}
      <div>
        <label className="block text-sm font-poppins text-gray-700 mb-1">
          Medicine
        </label>
        <input
          type="text"
          name="medicine"
          placeholder="Enter prescribed medicine"
          value={form.medicine}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 font-inter 
                     focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-poppins text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 font-inter 
                     focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg font-poppins 
                   hover:bg-green-700 shadow-md transition transform hover:scale-[1.01]"
      >
        Book Appointment
      </button>
    </form>
  );
}
