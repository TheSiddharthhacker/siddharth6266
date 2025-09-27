// backend/routes/appointments.js
import express from "express";
import Appointment from "../models/Appointment.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Book an appointment
router.post("/book", async (req, res) => {
  try {
    const { patient, doctor, datetime, medicine, phone } = req.body;
    const appointment = new Appointment({ patient, doctor, datetime, medicine, phone });
    await appointment.save();

    res.json({ success: true, appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json({ success: true, appointments });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
