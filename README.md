# 🚀 Business Nexus

**Business Nexus** is a modern networking platform that connects **Entrepreneurs** and **Investors** to foster innovation, funding, and collaboration. Built with React and Tailwind CSS, it provides role-based dashboards, profile management, and a real-time-style chat system.

---

## 📌 Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Pages & Functionalities](#pages--functionalities)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Mock API Info](#mock-api-info)
- [Deployment](#deployment)
- [License](#license)

---

## 🔗 Live Demo

🌐 [View App Live](https://your-deployment-link.vercel.app)

---

## 🌟 Features

- 🔐 **Authentication** with role selection (Investor or Entrepreneur)
- 🧠 Role-based **dashboards** and access control
- 👤 Detailed **profiles** for both roles
- 🤝 Collaboration **request management**
- 💬 **Real-time-style chat** between users
- 💻 **Responsive design** for mobile and desktop
- 🎨 UI component design system (Button, Input, Card)
- 🔄 Integrated with **mock APIs** for data fetching

---

## 📄 Pages & Functionalities

### 1. `/login`
- Login form for both **Investors** and **Entrepreneurs**
- Includes email and password fields
- Role is auto-redirected after login
- Form validation and error handling

### 2. `/register`
- Registration form with:
  - Name, Email, Password
  - Role selection (Investor or Entrepreneur)
- After successful signup, redirects to dashboard based on role

---

### 3. `/dashboard/investor`
- Accessible only by **Investors**
- Lists all **Entrepreneurs** fetched via mock API
- Each entrepreneur card shows:
  - Name, startup name, pitch summary
  - “View Profile” and “Message” buttons

---

### 4. `/dashboard/entrepreneur`
- Accessible only by **Entrepreneurs**
- Displays a list of **collaboration requests** from investors
- Each request shows:
  - Investor name, request status (Pending/Accepted)
  - Profile preview and action buttons (optional)

---

### 5. `/profile/investor/:id`
- Displays full profile of an investor
- Includes:
  - Investor’s bio
  - Investment interests
  - Portfolio companies

---

### 6. `/profile/entrepreneur/:id`
- Displays full profile of an entrepreneur
- Includes:
  - Bio and startup description
  - Funding needs
  - Pitch deck placeholder (PDF or image)

---

### 7. `/chat/:userId`
- Real-time-style messaging UI
- 1-on-1 chat between investor and entrepreneur
- Features:
  - Chat window with messages (mocked or real-time)
  - Input field for typing messages
  - Different alignment for sent/received
  - User avatars and timestamps
  - Optional: Online/offline status

---

## 🛠 Tech Stack

| Area             | Technology                      |
|------------------|----------------------------------|
| Frontend         | React.js (Vite)                 |
| Styling          | Tailwind CSS                    |
| Routing          | React Router                    |
| State Mgmt       | Context API                     |
| API Integration  | JSON Server   |
| Version Control  | Git + GitHub                    |
| Deployment       | Vercel               |
| Design           | Custom UI references    |

---

## 📁 Folder Structure

src/
├── assets/ // Images, logos
├── components/ // Buttons, Cards, Form Inputs
├── context/ // Auth context
├── layouts/ // Dashboard layout (navbar + sidebar)
├── pages/ // All route pages
│ ├── Auth/ // Login, Register
│ ├── Dashboard/ // Investor & Entrepreneur dashboards
│ ├── Profiles/ // Profile pages
│ └── Chat/ // Chat UI
├── services/ // Axios calls to mock API
├── mock/ // JSON files for mock data
└── App.jsx // Main App component
