# Hand Particle Control

ควบคุม particle 2,000 จุดด้วยมือ — แบมือ = ผลัก, กำมือ = ดูด ใช้ MediaPipe Hands + Three.js

**Live demo:** [thanasinyuntapun-maker.github.io/Portfolio-/projects/hand-particles/](https://thanasinyuntapun-maker.github.io/Portfolio-/projects/hand-particles/)

---

## โหมดการทำงาน

| ท่ามือ | Detection | ผล |
|--------|----------|----|
| **แบมือ** | dist(tip#12, wrist#0) ≥ 0.15 | particle กระจายออก + repulsion zone รัศมี 5 หน่วย |
| **กำมือ** | dist < 0.15 | particle พุ่งเข้าหาฝ่ามือ + vibration, สีเปลี่ยนแดง |
| **ไม่มีมือ** | — | particle ลอยช้า (sine wave) |

Physics: ใช้ Lerp (`0.1`) smooth ตำแหน่งมือ, particle กลับตำแหน่งเดิมด้วยแรง `0.01` เมื่อแบมือ

---

## Stack

- MediaPipe Hands — `minDetectionConfidence: 0.7`
- Three.js r128 — `BufferGeometry` + `PointsMaterial` + `AdditiveBlending`
- Vanilla JS — ไม่มี framework

---

## วิธีใช้

เปิด URL ด้านบน → อนุญาตกล้อง → ยกมือขึ้น แบมือ / กำมือ
