# ระบบเอกสารธุรกิจอัตโนมัติ (Google Sheets + Apps Script)

ออกใบเสนอราคา / ใบแจ้งหนี้ / ใบเสร็จรับเงิน เป็น PDF อัตโนมัติ ทำงานบน Google Sheets ล้วน ๆ ไม่ต้องมีเซิร์ฟเวอร์

**Live page:** [thanasinyuntapun-maker.github.io/Portfolio-/projects/biz-docs/](https://thanasinyuntapun-maker.github.io/Portfolio-/projects/biz-docs/)

**Download:** [`download/business-docs-automation.zip`](download/business-docs-automation.zip)

---

## สิ่งที่ทำได้

- เลขที่เอกสารอัตโนมัติ (ไม่ซ้ำ) สำหรับใบเสนอราคา / ใบแจ้งหนี้ / ใบเสร็จ
- เติมข้อมูลลงเทมเพลตแล้ว export เป็น PDF ลง Google Drive ให้อัตโนมัติ
- ออกใบแจ้งหนี้จากใบเสนอราคา หรือใบเสร็จจากใบแจ้งหนี้ได้โดยอ้างอิงเลขที่เอกสาร — สถานะอัปเดตเป็น "ชำระแล้ว" ให้เอง
- ฐานข้อมูลลูกค้าแบบ dropdown ในฟอร์มกรอกเอกสาร
- Dashboard สรุปยอดรายเดือน + ลูกค้าสูงสุด 5 อันดับ

## โครงสร้างไฟล์ในซิป

| ไฟล์ | หน้าที่ |
|------|--------|
| `ระบบเอกสารธุรกิจ_Sheets.xlsx` | ไฟล์หลัก 10 ชีท (Dashboard, Settings, Clients, เทมเพลต 3 แบบ, log 3 แบบ) |
| `Code.gs` | Google Apps Script ที่ผูกเมนู คำนวณเลขเอกสาร และ export PDF |
| `คู่มือติดตั้ง.md` | ขั้นตอนติดตั้งและใช้งานแบบละเอียด |

## Stack

- Google Sheets เป็นทั้ง UI และฐานข้อมูล
- Google Apps Script (JavaScript บน V8 runtime) — `SpreadsheetApp`, `DriveApp`, `DocumentApp` conversion เป็น PDF
- ไม่มี backend / ไม่มี dependency ภายนอก — รันในบัญชี Google ของผู้ใช้เองทั้งหมด

## วิธีใช้

ดาวน์โหลดซิปด้านบน แล้วทำตาม `คู่มือติดตั้ง.md` (สรุปย่อในหน้าเว็บด้วย) — ใช้เวลาติดตั้งประมาณ 5 นาที
