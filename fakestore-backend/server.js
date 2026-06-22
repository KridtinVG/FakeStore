const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors()); // อนุญาตให้ Angular ยิงหาได้
app.use(bodyParser.json());

// ฐานข้อมูลจำลองแบบเก็บไว้ในแรม (ถ้าปิดเซิร์ฟเวอร์ ข้อมูลจะรีเซ็ต)
const usersDatabase = [];

// 1. API สำหรับสมัครสมาชิก (Register)
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  // เช็กว่ามีชื่อยูสเซอร์นี้หรือยัง
  const userExists = usersDatabase.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว" });
  }

  // เข้ารหัส Password ให้ปลอดภัยก่อนเซฟ (Hashing)
  const hashedPassword = await bcrypt.hash(password, 10);

  // บันทึกลงฐานข้อมูลจำลอง
  usersDatabase.push({ username, password: hashedPassword });
  console.log("ฐานข้อมูลปัจจุบัน:", usersDatabase);

  res.status(201).json({ message: "สมัครสมาชิกบนหลังบ้านสำเร็จแล้ว!" });
});

// 2. API สำหรับเข้าสู่ระบบ (Login)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // ค้นหายูสเซอร์ในระบบ
  const user = usersDatabase.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "ไม่พบชื่อผู้ใช้นี้ในระบบ" });
  }

  // แกะรหัสตรวจสอบว่า Password ตรงกันไหม
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
  }

  res
    .status(200)
    .json({ message: "เข้าสู่ระบบสำเร็จ!", username: user.username });
});

// เปิดเซิร์ฟเวอร์ที่พอร์ต 3000
app.listen(3000, () => {
  console.log("server online at http://localhost:3000");
});
