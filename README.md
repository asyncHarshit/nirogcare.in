# 🏥 Hospital Management System (HMS) - Full Structure & Routing Guide

A smart web-based HMS to solve India's long hospital queues with real-time queue updates, patient tracking, and automated notifications.

---

## 🔐 AUTHENTICATION (COMMON ROUTES)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user and return token |
| PATCH | `/api/auth/select-role` | Assign role to a user (after registration) |

---

## 👤 PATIENT MODULE

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/patient/dashboard` | Fetch overview and next appointment |
| POST | `/api/patient/book` | Book doctor appointment |
| POST | `/api/patient/book-lab` | Book lab test appointment |
| GET | `/api/patient/appointments` | View all appointments |
| GET | `/api/patient/reports` | View lab reports |
| GET | `/api/patient/history` | Medical and prescription history |
| POST | `/api/patient/family` | Add a family member |
| GET | `/api/patient/family` | Get family members |
| PUT | `/api/patient/profile` | Update patient profile |

---

## 👨‍⚕️ DOCTOR MODULE

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/doctor/dashboard` | View today's patients |
| GET | `/api/doctor/appointments` | See appointment queue |
| POST | `/api/doctor/prescription/:appointmentId` | Add prescription for patient |
| POST | `/api/doctor/request-lab` | Request lab test for a patient |
| GET | `/api/doctor/patient/:id` | Get patient full medical info |
| PUT | `/api/doctor/profile` | Update doctor profile and settings |

---

## 🏥 HOSPITAL ADMIN MODULE

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/hospital/dashboard` | Hospital overview and metrics |
| POST | `/api/hospital/doctors` | Add a doctor |
| GET | `/api/hospital/doctors` | List all doctors in hospital |
| POST | `/api/hospital/assistants` | Add an assistant |
| GET | `/api/hospital/appointments` | View all appointments booked in hospital |
| PUT | `/api/hospital/profile` | Update hospital profile |

---

## 🧪 LAB ADMIN MODULE

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/lab/dashboard` | Overview of today's test appointments |
| POST | `/api/lab/upload/:appointmentId` | Upload lab test result |
| GET | `/api/lab/reports` | View all reports submitted |
| PUT | `/api/lab/profile` | Update lab profile |

---

## 🧑‍💼 ASSISTANT MODULE

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/assistant/dashboard` | Queue and check-in dashboard |
| POST | `/api/assistant/check-in` | Mark patient as arrived |
| PATCH | `/api/assistant/next/:appointmentId` | Push "You're next" alert |
| POST | `/api/assistant/notify` | Send custom push notifications |

---

## 📊 ADMIN ANALYTICS (OPTIONAL)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/analytics` | View performance and load stats |
| GET | `/api/admin/feedback` | Read user feedback |
| PUT | `/api/admin/settings` | Update system-wide settings |

---

## 🔔 NOTIFICATIONS & EVENTS (via Firebase FCM)

| Event | Triggered By | Message Sent |
|-------|--------------|---------------|
| Doctor arrival | Assistant | "Dr. X has arrived, your estimated time is 15 mins." |
| You're next | Assistant | "You're next! Please walk to Room 2." |
| Appointment cancelled | Doctor/Admin | "Your appointment was cancelled. Please rebook." |
| Delay | Assistant | "Your appointment is delayed. New ETA: 11:45 AM." |
| Report uploaded | Lab | "Your test report is now available." |

---

## 📦 FOLDER STRUCTURE SUGGESTION

```
/hms-app
├── /client (Next.js or React)
│   ├── /pages
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── /patient/*
│   │   ├── /doctor/*
│   │   ├── /hospital/*
│   │   ├── /lab/*
│   │   └── /assistant/*
│   ├── /components
│   └── /services
├── /server (Node.js + Express)
│   ├── /controllers
│   ├── /routes
│   ├── /models
│   ├── /middlewares
│   └── app.js
└── /firebase
    └── fcm.js
```

---

## ✅ FEATURES INTEGRATED

- 🔐 Auth + role selection
- 📅 Smart appointment booking
- 🧑‍⚕️ Real-time queue sync
- 🔔 Firebase Push Notifications
- 📈 Analytics and monitoring
- 📋 Token-based check-in and tracking
- 🔄 Role-based dashboards and control
