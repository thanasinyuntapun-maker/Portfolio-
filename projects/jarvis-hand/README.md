# J.A.R.V.I.S. Hand Tracking Interface

อินเทอร์เฟซสไตล์ Iron Man — MediaPipe Hands ติดตามนิ้วชี้แบบ real-time ควบคุม Vanta.js network background

**Live demo:** [thanasinyuntapun-maker.github.io/Portfolio-/projects/jarvis-hand/](https://thanasinyuntapun-maker.github.io/Portfolio-/projects/jarvis-hand/)

---

## วิธีทำงาน

1. MediaPipe Hands ตรวจจับ landmark 21 จุดบนมือ
2. ใช้ **landmark #8** (ปลายนิ้วชี้) แปลงพิกัด 0–1 → pixel coordinate (กลับด้าน X เพราะ mirror)
3. Dispatch `MouseEvent` ปลอมไปที่ `document.body` → Vanta.js รับค่าและขยับ network mesh ตามนิ้ว
4. CSS cursor (`#cursor`) ขยับแสดงตำแหน่งนิ้วบนหน้าจอ

---

## Stack

- MediaPipe Hands — model complexity 1, max 1 hand
- Vanta.js NET effect (Three.js r134) — network background
- Vanilla JS — ไม่มี framework

---

## วิธีใช้

เปิด URL ด้านบน → อนุญาตกล้อง → ยกนิ้วชี้ขึ้นแล้วขยับมือ
