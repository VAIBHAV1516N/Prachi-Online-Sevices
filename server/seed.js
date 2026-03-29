/**
 * Seed Script — Run once to create the admin account and sample services
 * Usage: node seed.js
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/csc_db";

// ── Inline schemas (avoids importing from models/) ──────────────────────────
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const Admin = mongoose.model("Admin", adminSchema);

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Service = mongoose.model("Service", serviceSchema);

// ── Seed data ────────────────────────────────────────────────────────────────
const ADMIN = { username: "barelaakash254@gmail.com", password: "Prachi@1305" };

const SERVICES = [
  {
    name: "Aadhar Card",
    price: 50,
    description: "New enrollment, corrections & biometric updates.",
    category: "Government",
  },
  {
    name: "PAN Card",
    price: 110,
    description: "Apply for new PAN or make name/DOB corrections.",
    category: "Government",
  },
  {
    name: "Ration Card",
    price: 30,
    description: "New card, member addition & family modification.",
    category: "Government",
  },
  {
    name: "Bank Account Opening",
    price: 0,
    description: "Zero-balance Jan Dhan & savings account opening.",
    category: "Banking",
  },
  {
    name: "PM Kisan Registration",
    price: 0,
    description: "Registration for PM Kisan Samman Nidhi Yojana.",
    category: "Government",
  },
  {
    name: "PMJJBY Insurance",
    price: 20,
    description: "Pradhan Mantri Jeevan Jyoti Bima Yojana enrollment.",
    category: "Insurance",
  },
  {
    name: "Income Certificate",
    price: 60,
    description: "Application and processing of income certificates.",
    category: "Government",
  },
  {
    name: "Caste Certificate",
    price: 80,
    description: "SC/ST/OBC/NT caste certificate application.",
    category: "Government",
  },
  {
    name: "Domicile Certificate",
    price: 60,
    description: "Apply for domicile/residence certificate online.",
    category: "Government",
  },
  {
    name: "Scholarship Form",
    price: 40,
    description: "Maharashtra state scholarship form filling & submission.",
    category: "Education",
  },
  {
    name: "Electricity Bill Payment",
    price: 10,
    description: "Pay MSEDCL & other utility bills quickly.",
    category: "Utility",
  },
  {
    name: "Mobile/DTH Recharge",
    price: 5,
    description: "Recharge any mobile number or DTH service.",
    category: "Utility",
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  // Admin
  const exists = await Admin.findOne({ username: ADMIN.username });
  if (exists) {
    console.log("ℹ️  Admin already exists — skipping");
  } else {
    await new Admin(ADMIN).save();
    console.log(
      `✅ Admin created  →  username: ${ADMIN.username}  |  password: ${ADMIN.password}`,
    );
  }

  // Services
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany(SERVICES);
    console.log(`✅ ${SERVICES.length} sample services inserted`);
  } else {
    console.log(`ℹ️  ${count} services already exist — skipping`);
  }

  await mongoose.disconnect();
  console.log("🎉 Seed complete!");
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
