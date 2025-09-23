import express from "express";
import Appointment from "../models/Appointment.js";
// import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Book an appointment
router.post("/book", async (req, res) => {
  try {
    const { patient, doctor, datetime, medicine, phone } = req.body;
    const appointment = new Appointment({ patient, doctor, datetime, medicine, phone });
    await appointment.save();

    // Send WhatsApp reminder
    // await client.messages.create({
    //   body: `Hi ${patient}, your appointment with Dr.${doctor} is on ${datetime}.`,
    //   from: process.env.TWILIO_PHONE,
    //   to: `whatsapp:${phone}`
    // });

    res.json({ success: true, appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

export default router;
