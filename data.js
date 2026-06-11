// Portfolio data — projects, services, capabilities.
// All content is bilingual: each text field has {th, en}.
// Highlighted = ใช้งานหลัก / production จริง

const T = (th, en) => ({ th, en });

window.PORTFOLIO = {
  brand: {
    name: "Thanasin Yuntapun",
    nameShort: "Thanasin.",
    role: T("วิศวกร & นักพัฒนา AI", "Engineer & AI Developer"),
    location: T("กรุงเทพฯ ประเทศไทย", "Bangkok, Thailand"),
    education: T("วิศวกรรมเครื่องกล/Robotics — จุฬาฯ", "Mech. Eng. / Robotics — Chulalongkorn"),
    availability: T("เปิดรับงาน Freelance", "Open to freelance"),
    email: "thanasin.yuntapun@gmail.com",
    line: "@ryujin_op1",
    github: "thanasinyuntapun-maker",
  },

  hero: {
    eyebrow: T("Portfolio · 2026", "Portfolio · 2026"),
    headlinePre: T("พัฒนา", "Building"),
    headlineEm: T("AI,", "AI,"),
    headlinePost: T("Computer Vision, ระบบฝังตัว และ iOS App", "computer vision, embedded & iOS"),
    sub: T(
      "นักศึกษาวิศวกรรมเครื่องกล/Robotics จุฬาฯ รับงานเขียนโค้ดและพัฒนาระบบ ตั้งแต่ฮาร์ดแวร์ (ESP32, CAN Bus, 3D Print) ไปจนถึง AI (Chatbot, RAG, Computer Vision)",
      "Mechanical / Robotics engineering student at Chulalongkorn. From hardware (ESP32, CAN Bus, 3D Print) to AI (chatbots, RAG, computer vision)."
    ),
    meta: [
      { label: T("ที่ตั้ง", "Location"), value: T("กรุงเทพฯ 🇹🇭", "Bangkok 🇹🇭") },
      { label: T("การศึกษา", "Education"), value: T("จุฬาลงกรณ์มหาวิทยาลัย", "Chulalongkorn University") },
      { label: T("ความเชี่ยวชาญ", "Focus"), value: T("AI · Robotics · Mobile", "AI · Robotics · Mobile") },
      { label: T("ผลงาน", "Projects shipped"), value: T("17 โปรเจกต์", "17 projects") },
    ],
  },

  filters: [
    { id: "all",     label: T("ทั้งหมด", "All") },
    { id: "ai",      label: T("AI / Chatbot", "AI / Chatbot") },
    { id: "cv",      label: T("Computer Vision", "Computer Vision") },
    { id: "robotics",label: T("Robotics", "Robotics") },
    { id: "sim",     label: T("Simulation", "Simulation") },
    { id: "mobile",  label: T("Mobile", "Mobile") },
    { id: "mfg",     label: T("Manufacturing", "Manufacturing") },
  ],

  projects: [
    {
      id: "line-oa",
      idx: "01",
      cats: ["ai"],
      feature: true,
      cat: T("AI Chatbot · LINE OA", "AI Chatbot · LINE OA"),
      title: T("แชตบอต LINE OA", "LINE OA chatbot"),
      titleEm: T("ตอบลูกค้า 24 ชม.", "24/7 support"),
      year: "2025",
      client: T("ร้านอาหาร · เครือ 4 สาขา", "Restaurant chain · 4 branches"),
      desc: T(
        "ตอบคำถามลูกค้าบน LINE OA อัตโนมัติตลอด 24 ชม. ใช้ Claude ต่อกับ RAG จากเมนูร้าน จำบทสนทนาราย user และส่งต่อแอดมินอัตโนมัติเมื่อจับได้ว่าลูกค้าต้องการคุยกับคน",
        "Automatic 24/7 customer replies on LINE OA. Claude + RAG over the menu, per-user memory, and automatic handoff to staff when needed."
      ),
      tags: ["Claude API", "RAG / ChromaDB", "FastAPI", "LINE Messaging", "Redis"],
      role: T("Solo · 6 สัปดาห์", "Solo · 6 weeks"),
      outcome: T("ลด workload แอดมิน 62%", "−62% admin workload"),
      stack: { left: "User · LINE", right: "Admin Console" },
    },
    {
      id: "rag-docs",
      idx: "02",
      cats: ["ai"],
      cat: T("RAG · Document Q&A", "RAG · Document Q&A"),
      title: T("ถาม-ตอบจากคู่มือ PDF", "PDF manual Q&A"),
      titleEm: T("ไทย + อังกฤษ", "Thai + English"),
      year: "2025",
      client: T("ผู้ผลิตเครื่องจักร", "Industrial OEM"),
      desc: T(
        "ถาม-ตอบจากคู่มือ PDF (ไทย+อังกฤษ) แบ่ง chunk ตามโครงสร้างเอกสาร อ้างอิงกลับไปหน้าจริง และมี guardrail กัน hallucinate",
        "Q&A over technical PDF manuals (TH+EN). Structural chunking, citations back to source pages, and guardrails against hallucination."
      ),
      tags: ["ChromaDB", "Gemini", "FastAPI", "Streamlit", "OCR"],
      role: T("Solo · 4 สัปดาห์", "Solo · 4 weeks"),
      outcome: T("Top-1 retrieval 94%", "94% Top-1 retrieval"),
    },
    {
      id: "lpr",
      idx: "03",
      cats: ["cv"],
      cat: T("Computer Vision · LPR", "Computer Vision · LPR"),
      title: T("อ่านป้ายทะเบียนจาก CCTV", "License-plate reader"),
      titleEm: T("แบบ real-time", "real-time"),
      year: "2024",
      client: T("บริษัทขนส่ง", "Logistics operator"),
      desc: T(
        "อ่านป้ายทะเบียนรถไทยจากกล้อง CCTV แบบ real-time ใช้ YOLOX ตรวจจับร่วมกับ OCR ภาษาไทย และมี NECTEC LPR เป็น fallback",
        "Real-time Thai license-plate reading from a CCTV feed. YOLOX detection + Thai OCR, with NECTEC LPR API as fallback."
      ),
      tags: ["YOLOX", "ONNX Runtime", "OpenCV", "NECTEC LPR", "Python"],
      role: T("Solo · 5 สัปดาห์", "Solo · 5 weeks"),
      outcome: T("Recall 96.4% / 8 fps", "96.4% recall @ 8 fps"),
    },
    {
      id: "robot",
      idx: "04",
      cats: ["robotics"],
      cat: T("Robotics · Embedded", "Robotics · Embedded"),
      title: T("หุ่นยนต์ ESP32", "ESP32 robot"),
      titleEm: T("CAN Bus + PID", "CAN Bus + PID"),
      year: "2024",
      client: T("โปรเจกต์ของตัวเอง", "Personal R&D"),
      desc: T(
        "หุ่นยนต์ขับเคลื่อนสองล้อ ควบคุมด้วย ESP32 ต่อเซ็นเซอร์ผ่าน CAN Bus ใช้ PID คุมความเร็ว และส่ง telemetry ขึ้น Telegram",
        "Differential-drive robot on ESP32. CAN-bus sensor mesh, PID velocity loop, and live telemetry on Telegram."
      ),
      tags: ["ESP32", "Arduino C++", "CAN / MCP2515", "PID", "MQTT"],
      role: T("Solo · 8 สัปดาห์", "Solo · 8 weeks"),
      outcome: T("วิ่งทดสอบ 200+ รอบ", "200+ test laps"),
    },
    {
      id: "ios-mvp",
      idx: "05",
      cats: ["mobile"],
      cat: T("iOS · SwiftUI", "iOS · SwiftUI"),
      title: T("iOS App (SwiftUI)", "iOS app (SwiftUI)"),
      titleEm: T("ส่ง TestFlight ใน 3 สัปดาห์", "shipped in 3 weeks"),
      year: "2025",
      client: T("Startup ระยะ Seed", "Seed-stage startup"),
      desc: T(
        "แอป iOS ด้วย SwiftUI + SwiftData (iOS 17+) มี auth, sync, push, offline mode พร้อม dashboard สำหรับแอดมิน",
        "Native iOS app on SwiftUI + SwiftData (iOS 17+). Auth, sync, push, offline mode, and an admin dashboard."
      ),
      tags: ["SwiftUI", "SwiftData", "xcodegen", "WebRTC"],
      role: T("Solo · 3 สัปดาห์", "Solo · 3 weeks"),
      outcome: T("ส่ง TestFlight ตรงเวลา", "On-time TestFlight"),
    },
    {
      id: "emotion",
      idx: "06",
      cats: ["cv"],
      cat: T("Computer Vision · FER", "Computer Vision · FER"),
      title: T("วิเคราะห์ความสนใจในห้องเรียน", "Classroom engagement"),
      titleEm: T("ด้วย FER", "with FER"),
      year: "2024",
      client: T("โครงงานวิจัยมหา'ลัย", "University research"),
      desc: T(
        "วัดความสนใจของนักเรียนในชั้นเรียนแบบ real-time ด้วย FER + face mesh สรุปผลแบบไม่ระบุตัวตนบน dashboard ของอาจารย์",
        "Real-time classroom engagement via FER + face mesh, shown as anonymised aggregates on a teacher dashboard."
      ),
      tags: ["TensorFlow", "FER", "OpenCV", "Streamlit"],
      role: T("Pair · 6 สัปดาห์", "Pair · 6 weeks"),
      outcome: T("Pilot 4 ห้องเรียน", "Pilot in 4 classrooms"),
    },
    {
      id: "matlab-sim",
      idx: "07",
      cats: ["sim"],
      cat: T("Simulation · MATLAB", "Simulation · MATLAB"),
      title: T("จำลองแขนกล 6-DOF", "6-DOF arm simulation"),
      titleEm: T("ใน Simulink", "in Simulink"),
      year: "2024",
      client: T("ส่วนหนึ่งของวิทยานิพนธ์", "Thesis component"),
      desc: T(
        "คำนวณ inverse kinematics และ dynamics ของแขนกล 6-DOF จำลองใน Simulink เพื่อตรวจ controller ก่อนสร้างจริง",
        "6-DOF arm inverse kinematics + dynamics in Simulink, to verify the controller before building hardware."
      ),
      tags: ["MATLAB", "Simulink", "Robotics Toolbox"],
      role: T("Solo · 10 สัปดาห์", "Solo · 10 weeks"),
      outcome: T("Settling time −41%", "Settling time −41%"),
    },
    {
      id: "cad",
      idx: "08",
      cats: ["mfg"],
      cat: T("CAD · 3D Print", "CAD · 3D Print"),
      title: T("ออกแบบชิ้นงาน CAD", "CAD part design"),
      titleEm: T("ผลิตด้วย 3D Print", "3D-printed"),
      year: "2024",
      client: T("ลูกค้า 6 รายที่ผ่านมา", "6 past clients"),
      desc: T(
        "ออกแบบชิ้นงานกลใน Fusion 360 / SolidWorks ทำ engineering drawing และ BOQ แล้วผลิตจริงด้วย FDM",
        "Mechanical part design in Fusion 360 / SolidWorks. Engineering drawings, BOQ, and FDM-printed parts."
      ),
      tags: ["Fusion 360", "SolidWorks", "FDM", "DFM"],
      role: T("Solo · ต่อโปรเจกต์", "Solo · per project"),
      outcome: T("ส่งงานตรงเวลา 6/6", "On-time delivery 6/6"),
    },
  ],

  services: [
    {
      num: "01",
      tag: T("ยอดนิยม", "Most popular"),
      title: T("AI Chatbot — LINE OA / Facebook", "AI Chatbot — LINE OA / Facebook"),
      desc: T(
        "บอตตอบลูกค้าอัตโนมัติ 24 ชม. บน LINE OA / Facebook รองรับหลายโมเดล จำบทสนทนาราย user ส่งต่อแอดมินอัตโนมัติ และ OCR อ่านสลิป/ที่อยู่ในแชต",
        "24/7 customer bot for LINE OA / Messenger. Multi-LLM, per-user memory, automatic handoff, and inline slip / address OCR."
      ),
      bullets: ["LINE Messaging", "Facebook Graph", "Claude / Gemini", "Conversation memory"],
      price: T("เริ่มที่ 35,000 บาท", "From ฿35,000"),
      time: T("4–6 สัปดาห์", "4–6 weeks"),
    },
    {
      num: "02",
      tag: T("งาน AI", "AI"),
      title: T("RAG Document Q&A System", "RAG Document Q&A System"),
      desc: T(
        "ระบบถาม-ตอบจากเอกสารของคุณ (คู่มือ, knowledge base, สัญญา) ตอบพร้อม citation อ้างหน้าจริง มี evaluation และไม่ hallucinate",
        "Question-answer system grounded in your documents. Citations to source pages, evaluation included, no hallucinations."
      ),
      bullets: ["ChromaDB", "PDF + OCR", "Evaluation harness", "Streamlit admin"],
      price: T("เริ่มที่ 55,000 บาท", "From ฿55,000"),
      time: T("3–5 สัปดาห์", "3–5 weeks"),
    },
    {
      num: "03",
      tag: T("งานวิศวกรรม", "Engineering"),
      title: T("Computer Vision Pipeline", "Computer Vision Pipeline"),
      desc: T(
        "อ่านป้ายทะเบียน ตรวจจับวัตถุ OCR ภาษาไทย และวิเคราะห์ภาพจาก CCTV / webcam แบบ real-time deploy ขึ้น edge หรือ cloud",
        "License-plate recognition, object detection, Thai OCR, and CCTV / webcam analysis in real time. Deploys to edge or cloud."
      ),
      bullets: ["YOLOX / ONNX", "OpenCV", "NECTEC LPR", "Docker"],
      price: T("เริ่มที่ 60,000 บาท", "From ฿60,000"),
      time: T("4–8 สัปดาห์", "4–8 weeks"),
    },
    {
      num: "04",
      tag: T("งานวิศวกรรม", "Engineering"),
      title: T("Robotics & Embedded Firmware", "Robotics & Embedded Firmware"),
      desc: T(
        "เขียน firmware ESP32 / Arduino ระบบควบคุม PID, CAN Bus และต่อ IoT เข้ากับ Telegram / LINE",
        "ESP32 / Arduino firmware, PID control, CAN-bus integration, and IoT linked to Telegram / LINE."
      ),
      bullets: ["ESP32", "PID", "CAN / MCP2515", "MQTT"],
      price: T("เริ่มที่ 40,000 บาท", "From ฿40,000"),
      time: T("3–6 สัปดาห์", "3–6 weeks"),
    },
    {
      num: "05",
      tag: T("Mobile", "Mobile"),
      title: T("iOS App (SwiftUI)", "iOS App (SwiftUI)"),
      desc: T(
        "แอป iPhone ด้วย SwiftUI + SwiftData (iOS 17+) เหมาะกับ MVP, internal tool หรือต่อยอดระบบเดิม",
        "Native iPhone app on SwiftUI + SwiftData (iOS 17+). Good for MVPs, internal tools, or extending an existing system."
      ),
      bullets: ["SwiftUI", "SwiftData", "TestFlight", "Push"],
      price: T("เริ่มที่ 75,000 บาท", "From ฿75,000"),
      time: T("3–8 สัปดาห์", "3–8 weeks"),
    },
    {
      num: "06",
      tag: T("Manufacturing", "Manufacturing"),
      title: T("CAD Design & 3D Printing", "CAD Design & 3D Printing"),
      desc: T(
        "ออกแบบชิ้นงานกลใน Fusion 360 ทำ engineering drawing พร้อม BOQ และผลิต 3D Print ส่งของจริง",
        "Mechanical design in Fusion 360, engineering drawings with BOQ, FDM 3D-printed and delivered."
      ),
      bullets: ["Fusion 360", "DFM review", "FDM print", "BOQ"],
      price: T("เริ่มที่ 8,000 บาท", "From ฿8,000"),
      time: T("1–3 สัปดาห์", "1–3 weeks"),
    },
    {
      num: "07",
      tag: T("Automation", "Automation"),
      title: T("งานเอกสาร Excel · Automation", "Excel Documents · Automation"),
      desc: T(
        "ทำไฟล์ Excel / Google Sheets ให้คำนวณ สรุป และออกรายงานอัตโนมัติ ทั้งสูตร, VBA / Apps Script, dashboard และต่อ API หรือ LINE Notify",
        "Excel / Google Sheets that calculate, summarise, and export reports automatically. Formulas, VBA / Apps Script, dashboards, API or LINE Notify."
      ),
      bullets: ["VBA · Macro", "Apps Script", "Pivot · Dashboard", "API / LINE Notify"],
      price: T("เริ่มที่ 4,000 บาท", "From ฿4,000"),
      time: T("3–10 วัน", "3–10 days"),
    },
  ],

  capabilities: [
    {
      group: T("AI & LLM", "AI & LLM"),
      ico: "✦",
      items: [
        { name: "Anthropic Claude API", hi: true },
        { name: "Google Gemini", hi: true },
        { name: "RAG / ChromaDB", hi: true },
        { name: "Claude Vision OCR", hi: true },
        { name: "OpenAI GPT" },
        { name: "LangChain" },
        { name: "NECTEC LPR API" },
      ],
    },
    {
      group: T("Python Backend", "Python Backend"),
      ico: "§",
      items: [
        { name: "FastAPI", hi: true },
        { name: "httpx (async)", hi: true },
        { name: "pydantic-settings", hi: true },
        { name: "SQLAlchemy / Alembic" },
        { name: "gspread" },
        { name: "Redis · RQ" },
        { name: "paho-mqtt" },
      ],
    },
    {
      group: T("Computer Vision", "Computer Vision"),
      ico: "◉",
      items: [
        { name: "OpenCV", hi: true },
        { name: "YOLOX / ONNX", hi: true },
        { name: "TensorFlow / Keras" },
        { name: "FER (Emotion)" },
        { name: "Pillow" },
        { name: "Streamlit" },
      ],
    },
    {
      group: T("Embedded", "Embedded"),
      ico: "⚙",
      items: [
        { name: "ESP32 · Arduino C++", hi: true },
        { name: "PID Control", hi: true },
        { name: "CAN Bus (MCP2515)", hi: true },
        { name: "PWM · Servo" },
        { name: "Telegram CTBot" },
        { name: "Wi-Fi · MQTT" },
        { name: "L298N Motor" },
      ],
    },
    {
      group: T("Mobile & Platform", "Mobile & Platform"),
      ico: "▢",
      items: [
        { name: "SwiftUI", hi: true },
        { name: "SwiftData (iOS 17+)", hi: true },
        { name: "LINE Messaging API", hi: true },
        { name: "Facebook Graph API" },
        { name: "xcodegen" },
        { name: "WebRTC · Canvas" },
      ],
    },
    {
      group: T("Infra & Engineering", "Infra & Engineering"),
      ico: "△",
      items: [
        { name: "Docker Compose", hi: true },
        { name: "MATLAB · Simulink", hi: true },
        { name: "Fusion 360 · SolidWorks", hi: true },
        { name: "FDM 3D Printing" },
        { name: "PostgreSQL" },
        { name: "Railway · Render" },
        { name: "Caddy (HTTPS)" },
      ],
    },
  ],

  // Detail case study — the one project the user can click into
  caseStudy: {
    projectId: "line-oa",
    crumb: T("ผลงาน / 01", "Selected work / 01"),
    title: T("ผู้ช่วย", "An assistant"),
    titleEm: T("ที่ไม่หลับ", "that never sleeps"),
    sub: T(
      "แชตบอทสำหรับร้านอาหารเครือ 4 สาขา ตอบลูกค้า 24 ชม. บน LINE OA — Claude + RAG + human-handoff",
      "A LINE OA assistant for a 4-branch restaurant — Claude + RAG, with a human-handoff system the staff actually trust."
    ),
    meta: [
      { k: T("ลูกค้า", "Client"), v: T("ร้านอาหาร · 4 สาขา (NDA)", "Restaurant chain · 4 branches (NDA)") },
      { k: T("ระยะเวลา", "Duration"), v: T("6 สัปดาห์ · 2025", "6 weeks · 2025") },
      { k: T("บทบาท", "Role"), v: T("Solo Engineer", "Solo engineer") },
      { k: T("Stack", "Stack"), v: "Claude · ChromaDB · FastAPI · LINE" },
    ],

    sections: [
      {
        n: "01",
        h: T("ปัญหา", "The problem"),
        body: [
          T(
            "ก่อนเริ่ม โต๊ะแอดมินของร้านรับข้อความ LINE เฉลี่ย **480 ข้อความต่อวัน** — 64% เป็นคำถามซ้ำเดิม (เมนู, ราคา, สาขา, เปิดกี่โมง). พนักงานสองคนทำหน้าที่นี้แทบจะตลอดวัน และยังตอบไม่ทันในช่วง 11:30–13:30.",
            "Before the engagement, the admin desk handled **~480 LINE messages per day** — 64% were repeat questions (menu, price, hours, locations). Two staff did almost nothing else, and queues still spilled over during the lunch rush."
          ),
          T(
            "เป้าหมายคือ *ไม่ใช่* แทนที่พนักงาน — แต่ให้บอทรับ \"คำถามที่ตอบได้\" และ **ส่งต่อให้คนทันทีเมื่อจำเป็น** โดยเฉพาะการจองโต๊ะใหญ่และการ complain.",
            "The goal was *not* to replace staff — it was to let the bot handle the answerable questions and **hand off cleanly the moment a human was needed**, especially for large reservations and complaints."
          ),
        ],
      },
      {
        n: "02",
        h: T("สถาปัตยกรรม", "Architecture"),
        body: [
          T(
            "ผมแยกระบบเป็นสี่ส่วน: (1) **LINE webhook** บน FastAPI รับ message, (2) **retriever** ที่ไปดึง context จาก ChromaDB ของเมนู+FAQ, (3) **Claude reasoner** สร้างคำตอบโดยอ้าง context นั้น, (4) **handoff classifier** เล็กๆ ตรวจว่าเหตุนี้ต้องส่งให้คนหรือไม่.",
            "Four moving parts: (1) a **LINE webhook** on FastAPI, (2) a **retriever** pulling context from a ChromaDB of menu + FAQ, (3) **Claude** writing the response grounded in that context, and (4) a **handoff classifier** deciding whether to pass the thread to a human."
          ),
        ],
        archDiagram: true,
        callout: T(
          "“การ handoff คือฟีเจอร์ที่สำคัญที่สุด — ไม่ใช่คำตอบของบอท”",
          "“The handoff is the most important feature — not the bot's answers.”"
        ),
      },
      {
        n: "03",
        h: T("รายละเอียดเชิงเทคนิค", "Engineering details"),
        bullets: [
          { n: "01", t: T("Chunk เมนูตามโครงสร้าง", "Structural menu chunking"), d: T("ตัด chunk ตามหมวด/ราคา ไม่ใช่ตาม token — retrieval แม่นกว่า 28%", "Split by category/price rather than tokens — retrieval accuracy +28%.") },
          { n: "02", t: T("Memory ต่อ user", "Per-user memory"), d: T("เก็บ summary 6 turn ล่าสุดใน Redis, expire 24 ชม.", "Last 6 turns summarised in Redis, 24-hour TTL.") },
          { n: "03", t: T("Image OCR ในแชต", "Inline image OCR"), d: T("ใช้ Claude Vision อ่านสลิปโอน, ที่อยู่จัดส่ง", "Claude Vision reads payment slips and delivery addresses.") },
          { n: "04", t: T("Confidence-based handoff", "Confidence-based handoff"), d: T("ถ้า retrieval score ต่ำ + intent = booking → ส่งคนทันที", "Low retrieval score + booking intent → instant human handoff.") },
        ],
      },
      {
        n: "04",
        h: T("ผลลัพธ์", "Results"),
        stats: [
          { num: "−62%", lbl: T("Admin workload", "Admin workload") },
          { num: "94%", lbl: T("คำตอบที่ถูก (eval)", "Eval accuracy") },
          { num: "<8s", lbl: T("เวลาตอบเฉลี่ย", "Median response") },
          { num: "0", lbl: T("Bookings ตกหล่น", "Missed bookings") },
        ],
        body: [
          T(
            "หลัง deploy 4 สัปดาห์: ปริมาณข้อความที่แอดมินตอบเองลด **62%**, แต่จำนวน booking ขนาดกลาง–ใหญ่ที่ปิดจบได้เพิ่ม **18%** เพราะการ handoff เร็วขึ้นกว่าเดิมมาก",
            "Four weeks after launch: **62%** fewer admin-handled messages — but mid-to-large bookings closed **+18%** because the handoff fires faster than a human triage ever did."
          ),
          T(
            "ลูกค้าเก็บเงินค่าระบบคืนได้ใน 3 เดือน. ตอนนี้ระบบยังรันอยู่บน Railway, มี monitoring ผ่าน Grafana — ผมเข้าไปแก้เดือนละครั้งเฉลี่ย ๆ ก็พอ.",
            "The client recouped the build cost in three months. The system still runs on Railway with Grafana monitoring; my touch-time is now roughly one fix per month."
          ),
        ],
      },
    ],
  },
};
