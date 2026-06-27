# Shear Building Vibration Simulator

Multi-DOF shear building dynamics simulator — eigensolver, mode shapes, FRF, time integration และ vibration control ทั้งหมดเขียน pure JS

**Live demo:** [thanasinyuntapun-maker.github.io/Portfolio-/projects/shear-building/](https://thanasinyuntapun-maker.github.io/Portfolio-/projects/shear-building/)

---

## สิ่งที่จำลองได้

### Structural Analysis
- **Eigenvalue problem** — Jacobi symmetric eigensolver (generalized: `K φ = ω² M φ`) หา natural frequencies และ mode shapes
- **Modal participation** — participation factor `Γ` และ effective modal mass (`M_eff` % ของมวลรวม) รายโหมด บอกว่าโหมดไหนมีผลต่อ base excitation มากสุด (scaling-invariant: `Γ = φᵀMr / φᵀMφ`)
- **FRF (Frequency Response Function)** — modal superposition สำหรับ base excitation, แสดง displacement ชั้นบนสุด vs. frequency
- **Time-domain response** — Newmark-β integration (implicit, unconditionally stable) พร้อม LU decomposition with partial pivoting
- **Rayleigh damping** — คำนวณ α, β จาก `ζ` และ `ω₁, ω₂`

### Vibration Control
| อุปกรณ์ | วิธีติดตั้ง | ผลที่ได้ |
|---------|-----------|--------|
| **TMD** (Tuned Mass Damper) | เพิ่ม DOF พิเศษเข้า system matrix | ลด amplitude 60%+ ที่ resonance |
| **Viscous Dampers** | แก้ไข damping matrix C inter-story | กระจาย energy ทุกชั้น |
| **Base Isolation** | เปลี่ยน ground spring เป็น soft bearing + เพิ่ม damping ที่ฐาน | ยืด period (~2.5s) ออกจากย่านพลังงานแผ่นดินไหว |
| **Active Control (LQR)** | full-state feedback `u = −K[x; ẋ]` ผ่าน actuator | ลด drift ได้เหนือกว่า passive (>90% ที่ resonance) |

- TMD ใช้ Den Hartog optimal tuning: `f_opt = 1/(1+μ)`, `ζ_opt = √(3μ/8(1+μ)³)`
- Base isolation: bearing stiffness `k = M·(2π/T_iso)²`, isolator damping `c = 2·ζ_iso·M·(2π/T_iso)` — ตั้ง T_iso และ ζ_iso ได้
- **LQR**: แก้ Continuous-time Algebraic Riccati Equation (`AᵀP + PA − PBR⁻¹BᵀP + Q = 0`) ด้วย **matrix sign-function iteration** บน Hamiltonian → gain `K = R⁻¹BᵀP`. Q penalize inter-story drift (`DᵀD`), R = ค่า control effort ที่ตั้งได้ (10^x). มี actuator saturation (u_max) + รายงาน peak actuator force จริง

### Seismic Performance Check (ASCE 7)
- คำนวณ **inter-story drift ratio** รายชั้นจาก time history (drift / story height)
- เทียบกับ limit ASCE 7: Immediate Occupancy 1.0% · Life Safety 2.0% · Collapse Prevention 2.5% → ให้ performance rating + สี
- dashboard: max drift ratio + ชั้นที่ governing, peak base shear (MN), peak actuator force (MN)

---

## พารามิเตอร์ที่ตั้งได้

- จำนวนชั้น (2–30)
- มวลและความแข็งรายชั้น (uniform หรือ manual)
- อัตราส่วนความหน่วง ζ
- **แรงกระตุ้น (9 แบบ):** harmonic base, resonance (mode 1 / mode 2), impact/impulse, sine sweep, random (band-limited noise), synthetic earthquake (Kanai-Tajimi) และ **real recorded accelerograms**
- **Real records:** El Centro 1940 (NS, PGA 0.349g · EW, PGA 0.214g) — accelerogram จริงที่บันทึกได้ ฝังเป็น array ในไฟล์ (resample เข้า sim grid + scale ไป target PGA ที่ตั้งได้)
- TMD: mass ratio μ, ตำแหน่งชั้นที่ติดตั้ง
- Viscous damper: ค่าความหน่วง c, ร้อยละของชั้นที่ติดตั้ง
- Active control: ตำแหน่ง actuator, control effort (R), force limit (u_max)

> **Real vs synthetic:** El Centro 1940 เป็น record จริง (digitized accelerogram, dt=0.02s, public-domain ผ่าน vibrationdata.com) ส่วน Kanai-Tajimi ยังเป็น synthetic (filtered noise + Jennings envelope, seeded RNG) สำหรับ reproducible parametric study — ทั้งคู่ generate ground motion ครั้งเดียวใช้ทั้ง baseline และ controlled run เพื่อเทียบกันตรง ๆ

---

## Export

- **Export CSV** — ตารางโหมด (ω, f, T, Γ, M_eff%) + time history ของ top-floor displacement (uncontrolled และ controlled) ใช้ ground motion เดียวกันทั้งสอง run
- **Generate engineering report (PDF)** — เปิดหน้ารายงานวิศวกรรมแบบ print-ready (ใช้ Ctrl/Cmd-P → Save as PDF): model & excitation, modal table, **drift profile รายชั้น + performance rating ASCE 7**, base shear, peak actuator force, สรุป control system และ verdict ผ่าน/ไม่ผ่าน

---

## Algorithm สำคัญ

```
Jacobi sweep:
  φ = arctan(2·a_pq / (a_qq − a_pp)) / 2
  หมุน Givens rotation จนกว่า off-diagonal < tol

Newmark-β (β=0.25, γ=0.5 — constant average acceleration):
  K_eff · u_{n+1} = F_eff
  แก้ด้วย LU partial-pivot ทุก time step

Kanai-Tajimi synthetic quake:
  white noise → ground filter (ωg=15, ζg=0.6) → Jennings intensity envelope
  ground motion สร้างครั้งเดียว (seeded RNG) ใช้ทั้ง base และ controlled run

LQR active control (solve CARE via matrix sign function):
  H = [[A, −BR⁻¹Bᵀ], [−Q, −Aᵀ]]
  Z₀ = H ;  Z_{k+1} = ½(Z_k + Z_k⁻¹)  →  sign(H)
  P จาก stable invariant subspace (least squares) ;  K = R⁻¹BᵀP
  u = clamp(−K[x; ẋ], ±u_max)  ใส่ที่ actuator floor ทุก step
```

---

## Stack

- Vanilla JS ล้วน — ไม่มี dependency ภายนอก (ไม่ใช้ math.js, numeric.js ฯลฯ)
- Canvas API ทั้งหมด — animated building deformation, mode shapes, FRF plot, time-domain chart
- Export ผลลัพธ์เป็น CSV (modes + time history) ผ่าน Blob API

---

## วิธีใช้

เปิด URL ด้านบนหรือไฟล์ `index.html` ในเบราว์เซอร์ — ไม่ต้อง build หรือ server
