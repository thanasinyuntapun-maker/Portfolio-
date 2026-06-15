# Shear Building Vibration Simulator

Multi-DOF shear building dynamics simulator — eigensolver, mode shapes, FRF, time integration และ vibration control ทั้งหมดเขียน pure JS

**Live demo:** [thanasinyuntapun-maker.github.io/Portfolio-/projects/shear-building/](https://thanasinyuntapun-maker.github.io/Portfolio-/projects/shear-building/)

---

## สิ่งที่จำลองได้

### Structural Analysis
- **Eigenvalue problem** — Jacobi symmetric eigensolver (generalized: `K φ = ω² M φ`) หา natural frequencies และ mode shapes
- **FRF (Frequency Response Function)** — modal superposition สำหรับ base excitation, แสดง displacement ชั้นบนสุด vs. frequency
- **Time-domain response** — Newmark-β integration (implicit, unconditionally stable) พร้อม LU decomposition with partial pivoting
- **Rayleigh damping** — คำนวณ α, β จาก `ζ` และ `ω₁, ω₂`

### Vibration Control
| อุปกรณ์ | วิธีติดตั้ง | ผลที่ได้ |
|---------|-----------|--------|
| **TMD** (Tuned Mass Damper) | เพิ่ม DOF พิเศษเข้า system matrix | ลด amplitude 60%+ ที่ resonance |
| **Viscous Dampers** | แก้ไข damping matrix C inter-story | กระจาย energy ทุกชั้น |

TMD ใช้ Den Hartog optimal tuning: `f_opt = 1/(1+μ)`, `ζ_opt = √(3μ/8(1+μ)³)`

---

## พารามิเตอร์ที่ตั้งได้

- จำนวนชั้น (2–30)
- มวลและความแข็งรายชั้น (uniform หรือ manual)
- อัตราส่วนความหน่วง ζ
- แรงกระตุ้น: sine sweep, impulse, random, El Centro earthquake
- TMD: mass ratio μ, ตำแหน่งชั้นที่ติดตั้ง
- Viscous damper: ค่าความหน่วง c, ร้อยละของชั้นที่ติดตั้ง

---

## Algorithm สำคัญ

```
Jacobi sweep:
  φ = arctan(2·a_pq / (a_qq − a_pp)) / 2
  หมุน Givens rotation จนกว่า off-diagonal < tol

Newmark-β (β=0.25, γ=0.5 — constant average acceleration):
  K_eff · u_{n+1} = F_eff
  แก้ด้วย LU partial-pivot ทุก time step
```

---

## Stack

- Vanilla JS ล้วน — ไม่มี dependency ภายนอก (ไม่ใช้ math.js, numeric.js ฯลฯ)
- Canvas API สำหรับ animated building deformation และ mode shape
- SVG path สำหรับ FRF plot และ time-domain chart

---

## วิธีใช้

เปิด URL ด้านบนหรือไฟล์ `index.html` ในเบราว์เซอร์ — ไม่ต้อง build หรือ server
