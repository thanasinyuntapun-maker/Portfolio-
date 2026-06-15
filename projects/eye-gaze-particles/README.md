# Eye Gaze Particle System

ควบคุม particle 1,500 จุดด้วยสายตา — ใช้ MediaPipe FaceMesh ติดตาม iris แบบ real-time ทำงานใน browser ทั้งหมด

**Live demo:** [thanasinyuntapun-maker.github.io/Portfolio-/projects/eye-gaze-particles/](https://thanasinyuntapun-maker.github.io/Portfolio-/projects/eye-gaze-particles/)

---

## วิธีทำงาน

| สัญญาณ | Landmark | ผล |
|--------|----------|----|
| **Gaze direction** | Iris center (468, 473) vs. eye corners (33, 133) | particle ลอยตามสายตา |
| **Blink detection** | Eye top/bottom gap (159/145, 386/374) < 0.012 | Black hole effect — ดูดรวม + เปลี่ยนสีแดง |

Particle physics: แรงดึงดูดเบาๆ (`dx × 0.002`) + noise สุ่ม + friction `0.92` ทำให้การเคลื่อนที่นุ่มนวล

---

## Stack

- MediaPipe FaceMesh (`refineLandmarks: true` — เปิดเพื่อได้ iris landmarks 468–477)
- Three.js r128 — `PointsMaterial` + `AdditiveBlending`
- Vanilla JS — ไม่มี framework

---

## วิธีใช้

เปิด URL ด้านบนในเบราว์เซอร์ → อนุญาตกล้อง → มองซ้ายขวา/กระพริบตา
