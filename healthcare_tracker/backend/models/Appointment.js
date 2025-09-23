import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: String,
  doctor: String,
  datetime: String,
  medicine: String,
  phone: String
});

export default mongoose.model("Appointment", appointmentSchema);
