# 🛍️ FakeStore E-Commerce Web Application

เว็บแอปพลิเคชันจำลองร้านค้าออนไลน์ (E-Commerce) ที่พัฒนาด้วย **Angular 13** และ **Tailwind CSS** โดยมุ่งเน้นไปที่การสร้างประสบการณ์ใช้งานของผู้ใช้ที่ลื่นไหล (User Experience) และการวางโครงสร้างโค้ดหน้าบ้านที่รองรับการขยายตัวในอนาคต

🌐 **Live Demo:** (https://fake-store-one-henna.vercel.app/)

---

## 🚀 Key Features

- **Dynamic Product Catalog:** ดึงข้อมูลสินค้าแบบเรียลไทม์จาก FakeStoreAPI
- **Reactive Shopping Cart:** ระบบตะกร้าสินค้าที่อัปเดตจำนวนสินค้า และคำนวณราคารวม (Total Price) ทันทีในรูปแบบ Reactive Programming
- **State-Persistent Login:** ระบบจำลองการเข้าสู่ระบบ (Mock Authentication System[User:"admin" password:"Admin123"]) ที่จดจำสถานะผู้ใช้ผ่าน `localStorage` ช่วยให้สามารถทดสอบจำลอง Flow การซื้อสินค้าได้จนจบกระบวนการ (Full Flow) โดยไม่ต้องพึ่งพาเซิร์ฟเวอร์หลังบ้าน
- **100% Fully Responsive Design:** เลย์เอาต์หน้าเว็บถูกปรับแต่งด้วย Tailwind CSS รองรับการใช้งานสมบูรณ์แบบทั้งบนหน้าจอคอมพิวเตอร์ แท็บเล็ต และสมาร์ตโฟน (Mobile-First Approach) โดยเฉพาะการยุบหน้ารถเข็นให้เป็นปุ่มสัมผัสในจอมือถือ

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** Angular 13 (Component-Based Architecture)
- **Styling & Responsive:** Tailwind CSS
- **State & Data Flow:** RxJS (Observables), HttpClient, LocalStorage
- **Deployment & CI/CD:** GitHub & Vercel (Auto-deployment on every git push)

---

## 💡 AI-Assisted Development & Problem Solving

โปรเจกต์นี้มีการนำ **AI-Assisted Development** เข้ามาช่วยในกระบวนการทำงานเพื่อเพิ่มประสิทธิภาพและความรวดเร็วในการพัฒนา (Productivity) โดยผมทำหน้าที่เป็นผู้ควบคุมสถาปัตยกรรม (Architect) และแก้ไขปัญหาเชิงระบบ:

1.  **Responsive Layout Control:** ใช้ AI ช่วยไกด์และแนะนำคลาส Utility Grid/Flex ของ Tailwind CSS เพื่อจัดการปัญหาเลย์เอาต์สินค้าเบียดกันบนจอมือถือ จากนั้นนำมาประยุกต์ร่วมกับโครงสร้าง Angular Component เพื่อซ่อนและแสดงผลแถบรถเข็น (Drawer UI) บนอุปกรณ์ขนาดเล็ก
2.  **Fallback Implementation:** วางแผนและสกัดข้อมูล Mock Data สำหรับระบบล็อกอินและการดึงข้อมูลสินค้า เพื่อเป็นแผนสำรอง (Fallback) กรณีที่เครือข่ายภายนอกหรือเซิร์ฟเวอร์หลังบ้านไม่สามารถเข้าถึงได้ ช่วยให้หน้าเว็บ Demo สามารถทำงานได้อย่างมีเสถียรภาพตลอด 24 ชั่วโมง
