<h1 align="center">🏥 HealthCare Platform</h1>


## *Revolutionizing Healthcare in India*
  
### 🚀 Eliminating Long Queues with Smart Digital Solutions

<div align="center">

[![Team](https://img.shields.io/badge/👥_Team-27-4f46e5?style=for-the-badge&logo=github&logoColor=white)](https://github.com/team27)
[![Status](https://img.shields.io/badge/🔥_Status-In%20Development-f59e0b?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/team27/hms)
[![Version](https://img.shields.io/badge/📦_Version-1.0.0-10b981?style=for-the-badge&logo=tag&logoColor=white)](https://github.com/team27/hms)
[![License](https://img.shields.io/badge/📄_License-MIT-8b5cf6?style=for-the-badge&logo=balance-scale&logoColor=white)](#license)

</div>

---


<div align="center">

### 🌟 **Transforming Healthcare Experience**
*Building the future of medical management with cutting-edge technology*

</div>

<br>

<div align="center">

</div>

---


## 📋 **Table of Contents**

- [🎯 Problem Statement](#-problem-statement)
- [💡 Solution Overview](#-solution-overview)
- [🏗️ System Architecture](#️-system-architecture)
- [🔌 API Routes & Endpoints](#-api-routes--endpoints)
- [📱 Technology Stack](#-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🔔 Real-time Features & Notification](#-real-time-features)
- [📊 Impact & Analytics](#-impact--analytics)

---

## 🎯 **Problem Statement**


### **Current Healthcare Crisis in India**

India's healthcare system faces critical challenges that directly impact patient lives:

#### 📈 **Alarming Statistics**
- **1.6 million Indians** died in 2016 due to poor quality care and management *(The Lancet)*
- **75% of cancer deaths** at AIIMS Delhi are attributed to long waiting times
- **10,000+ OPD patients** daily at AIIMS with many turned away

#### 🚨 **Critical Issues**

| Issue | Impact | Consequence |
|-------|--------|-------------|
| **Excessive Queuing** | 3-8 hours wait time | Patient mortality, delayed treatment |
| **Disease Spread** | Crowded waiting areas | TB, COVID-19, Influenza transmission |
| **Staff Overload** | Unmanaged crowds | Reduced care quality |
| **Manual Processes** | Paper-based systems | Appointment conflicts, confusion |

#### 📰 **Real Cases**
- Mumbai Hospital Staff Dies After 3-Hour Wait
- Man Dies Waiting for Ultrasound at Noida Hospital
- COVID Patient Dies Outside Thane Hospital Waiting for ICU
- Patient Dies After 3-Hour Queue Wait in Kolkata

---

## 💡 **Solution Overview**

### 🩺 **For Doctors**
```
✅ Real-time appointment dashboard
✅ Smart patient flow management
✅ Automated arrival notifications
✅ Queue status updates
✅ One-click patient communication
```

### 🏥 **For Patients**
```
✅ Online appointment booking
✅ Real-time queue tracking (like Uber/Ola)
✅ SMS & push notifications
✅ Estimated wait times
✅ Just-in-time arrival alerts
✅ Reduced exposure to crowds
```

### 👨‍💼 **For Hospital Staff**
```
✅ Centralized patient management
✅ Digital workflow automation
✅ Real-time analytics
✅ Staff coordination tools
✅ Resource optimization
```

---

## 🏗️ **System Architecture**

```mermaid
graph TB
    %% Frontend Clients with Icons
    A["🏥 Patient Web Portal"] --> B["🌐 API Gateway"]
    C["👨‍⚕️ Doctor Dashboard"] --> B
    D["👨‍💼 Hospital Admin Panel"] --> B
    E["👩‍💻 Assistant Dashboard"] --> B
    
    %% Core Services
    B --> F["🔐 Authentication Service"]
    B --> G["📅 Appointment Service"]
    B --> H["⏱️ Real-time Queue Service"]
    B --> I["🔔 Notification Service"]
    B --> J["👥 User Management Service"]
    
    %% Database Layer
    F --> K["🗄️ MongoDB Atlas"]
    G --> K
    J --> K
    
    %% Firebase Real-time Layer
    H --> L["🔥 Firebase Realtime DB"]
    L --> M["📊 Live Queue Updates"]
    L --> N["📍 Patient Status Tracking"]
    
    %% Notification Channels
    I --> O["📱 Firebase FCM"]
    I --> P["📱 SMS Gateway"]
    I --> Q["📧 Email Service"]
    
    %% Analytics & Intelligence
    R["📈 Analytics Engine"] --> K
    R --> S["📊 Hospital Dashboard"]
    R --> T["📋 Performance Reports"]
    
    %% External Integrations
    U["💳 Payment Gateway"] --> B
    V["🏛️ Government Health API"] --> B
    
    %% Enhanced Styling with Icons and Colors
    classDef frontend fill:#4f46e5,stroke:#312e81,stroke-width:3px,color:#fff,stroke-dasharray: 0
    classDef service fill:#059669,stroke:#064e3b,stroke-width:3px,color:#fff,stroke-dasharray: 0
    classDef database fill:#dc2626,stroke:#7f1d1d,stroke-width:3px,color:#fff,stroke-dasharray: 0
    classDef firebase fill:#f59e0b,stroke:#92400e,stroke-width:3px,color:#fff,stroke-dasharray: 0
    classDef notification fill:#8b5cf6,stroke:#581c87,stroke-width:3px,color:#fff,stroke-dasharray: 0
    classDef analytics fill:#06b6d4,stroke:#0e7490,stroke-width:3px,color:#fff,stroke-dasharray: 0
    classDef gateway fill:#ec4899,stroke:#9d174d,stroke-width:3px,color:#fff,stroke-dasharray: 0
    classDef external fill:#64748b,stroke:#334155,stroke-width:3px,color:#fff,stroke-dasharray: 0
    
    %% Apply classes to nodes
    class A,C,D,E frontend
    class F,G,H,I,J service
    class K database
    class L,M,N firebase
    class O,P,Q notification
    class R,S,T analytics
    class B gateway
    class U,V external
```

---



## 🔔 **Real-time Features & Notification**

### **Firebase Cloud Messaging (FCM) Events**

| Event Type | Trigger | Recipients | Message Template |
|------------|---------|------------|------------------|
| **Doctor Arrival** | Assistant check-in | Waiting patients | "🩺 Dr. {name} has arrived. Your estimated wait: {time} mins" |
| **You're Next** | Queue management | Next patient | "🔔 You're next! Please proceed to Room {number}" |
| **Appointment Reminder** | 30 mins before | Patient | "⏰ Reminder: Appointment with Dr. {name} at {time}" |
| **Queue Update** | Real-time | All waiting | "📊 Queue Update: {position} people ahead of you" |
| **Delay Notification** | Doctor/Staff | Affected patients | "⏳ Delay Alert: Dr. {name} is running {mins} minutes late" |
| **Report Ready** | Lab upload | Patient | "📋 Your test results are ready for download" |
| **Prescription** | Doctor | Patient | "💊 New prescription available from Dr. {name}" |



## 📊 **Impact & Analytics**

### **Expected Outcomes**

| Metric | Current State | Target Improvement |
|--------|---------------|-------------------|
| **Average Wait Time** | 3-8 hours | 15-30 minutes |
| **Patient Satisfaction** | 40% | 85%+ |
| **Doctor Efficiency** | 60% | 90%+ |
| **Disease Transmission Risk** | High | 70% reduction |
| **Administrative Cost** | 100% | 40% reduction |
| **No-show Rate** | 30% | 10% |



<div align="center">

**🏥 Building a Healthier Tomorrow, One Queue at a Time 🏥**

*Made with ❤️ by HomoSapiens*

</div>
