# Classroom Attention Monitor — MediaPipe EAR + Head Pose + Gaze

ระบบวัดความสนใจนักเรียนแบบ real-time ผ่านกล้อง ทำงานทั้งหมดใน browser ไม่มี server

**Live demo:** [thanasinyuntapun-maker.github.io/Portfolio-/projects/classroom-attention/](https://thanasinyuntapun-maker.github.io/Portfolio-/projects/classroom-attention/)

---

## วิธีทำงาน

ฟิวส์ 3 สัญญาณจาก MediaPipe Face Landmarker (478-point model) ด้วยน้ำหนักคงที่:

```
Score = EAR × 0.4 + HeadPose × 0.35 + Gaze × 0.25
```

| สัญญาณ | วิธีคำนวณ | น้ำหนัก |
|--------|-----------|---------|
| **EAR** (Eye Aspect Ratio) | `(‖p2−p6‖ + ‖p3−p5‖) / (2 × ‖p1−p4‖)` | 40% |
| **Head Pose** | Yaw/Pitch/Roll จาก 4×4 transformation matrix | 35% |
| **Gaze** | Offset ของ iris landmark เทียบกับมุมตา | 25% |

เกณฑ์ EAR: `> 0.25` โฟกัส · `0.18–0.25` ง่วง · `< 0.18` หลับ/ก้มหน้า

---

## ฟีเจอร์หลัก

- **Face Recognition** — ใช้ pairwise distance ของ 17 landmark points (SIG_POINTS) normalized ด้วย inter-ocular distance จำหน้าแต่ละนักเรียนโดยไม่ใช้ ML model แยก
- **Personal Calibration** — เก็บ EAR baseline ของแต่ละคน ลด false positive จากตาเล็ก/แว่น
- **Roster Management** — ลงทะเบียนนักเรียนรายห้อง ถ่ายรูปผ่านกล้อง
- **Live Dashboard** — แสดง signal bar แบบ real-time พร้อม status badge บนวิดีโอ
- **History & Export** — บันทึก session history ส่งออกเป็น `.csv` ได้

---

## Stack

- MediaPipe Tasks Vision `@0.10.14` (Face Landmarker, WebGL delegate)
- Vanilla JS — ไม่มี framework หรือ library เพิ่มเติม
- LocalStorage สำหรับข้อมูลนักเรียนและประวัติ

---

## วิธีใช้

เปิด URL ด้านบนหรือไฟล์ `index.html` ในเบราว์เซอร์ที่รองรับ WebGL (Chrome/Edge แนะนำ) — ไม่ต้อง build หรือติดตั้ง

> ต้องอนุญาตกล้องเมื่อเบราว์เซอร์ถาม ข้อมูลทั้งหมดอยู่ใน device ไม่ส่งออกไปภายนอก
