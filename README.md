# 📄 VibeTest: Technical Documentation  
**Automated QA for AI-Generated & No-Code Apps**  
*Version 1.0*

---

## 🧭 Table of Contents
1. [Overview](#1-overview)  
2. [Core Features](#2-core-features)  
3. [Technology Stack](#3-technology-stack)  
4. [Project Structure](#4-project-structure)  
5. [Setup & Installation](#5-setup--installation)  
6. [Authentication System](#6-authentication-system)  
7. [API Endpoints](#7-api-endpoints)  
8. [Scanner Engine (Python)](#8-scanner-engine-python)  
9. [Certification Badge System](#9-certification-badge-system)  
10. [Database Schema](#10-database-schema)  
11. [User Flow](#11-user-flow)  
12. [Dashboard Specification](#12-dashboard-specification)  
13. [Development Workflow](#13-development-workflow)  
14. [Future Roadmap](#14-future-roadmap)  
15. [Contributing & License](#15-contributing--license)

---

## 1. Overview

**VibeTest** is a quality assurance (QA) and testing platform designed for applications built using AI-powered tools such as V0.dev, Lovable, Cursor, and Rocket. These tools enable rapid app development but often lack built-in testing, leading to bugs, security flaws, and poor performance in production.

VibeTest bridges this gap by offering:
- Automated code scanning
- Bug, security, and performance analysis
- Test generation
- Certification for production-ready apps

The platform empowers developers and no-code builders to validate their apps before launch, ensuring reliability and professionalism.

---

## 2. Core Features

| Feature | Description |
|-------|-------------|
| **AI-Powered Code Scanner** | Analyzes uploaded code for bugs, anti-patterns, and AI-generated spaghetti code. |
| **Automated Test Generator** | Generates unit, integration, and end-to-end tests for Python, React, and APIs. |
| **Performance & Security Report** | Simulates load, checks for XSS, SQLi, and other vulnerabilities. Provides a grade (A–F). |
| **Vibe Certified Badge** | Apps that pass testing receive a shareable badge to display trust. |
| **Developer Dashboard** | Central hub to manage apps, view scan history, and download reports. |
| **GitHub Integration** | Import apps directly from GitHub via OAuth. |
| **User Authentication** | Secure login/signup with session management. |

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|------|-----------|--------|
| **Frontend** | React, Vite, Tailwind CSS | Responsive, aesthetic UI |
| **Routing** | React Router | Client-side navigation |
| **Backend** | PHP (Plain) | Lightweight API server |
| **Database** | MySQL | Store users, apps, results |
| **Scanner Engine** | Python 3 | Static code analysis |
| **Styling** | Tailwind CSS, Inter font | Modern design |
| **Dev Tools** | Vite, PHP Built-in Server | Fast local dev |

---

## 4. Project Structure

```
vibetest/
├── vibetest-frontend/
│   ├── src/pages/
│   └── index.html
├── vibetest-backend/
│   ├── auth/
│   ├── db.php
│   └── test-db.php
├── scanner/scan_app.py
├── docs/
└── README.md
```

---

## 5. Setup & Installation

### Prerequisites
- PHP 7.4+, MySQL, Node.js, Python 3

### Step 1: Setup MySQL
```sql
CREATE DATABASE vibetest;
```

### Step 2: Install PHP MySQL Extension
```bash
sudo apt install php php-mysql
```

### Step 3: Start Backend
```bash
cd vibetest-backend
php -S localhost:8000
```

### Step 4: Start Frontend
```bash
cd vibetest-frontend
npm run dev
```

👉 Visit: [http://localhost:5173](http://localhost:5173)

---

## 6. Authentication System

- Session-based with `session_start()`
- Passwords hashed with `password_hash()`
- CORS enabled for `http://localhost:5173`

### Endpoints
- `POST /auth/signup.php`
- `POST /auth/login.php`
- `GET /auth/logout.php`

---

## 7. API Endpoints

| Endpoint | Method | Description |
|--------|--------|-------------|
| `/test-db.php` | GET | Health check |
| `/auth/signup.php` | POST | Create user |
| `/upload.php` | POST | Upload app |
| `/badge.php?score=85` | GET | Generate badge |

---

## 8. Scanner Engine (Python)

File: `scanner/scan_app.py`

Analyzes:
- `eval()` usage
- Debug prints
- `innerHTML` (XSS)
- Large files

Returns JSON with:
- `bugs_found`
- `security_issues`
- `performance_score`

Called from PHP via:
```php
shell_exec("python3 ../scanner/scan_app.py '$dir'");
```

---

## 9. Certification Badge System

- URL: `http://localhost:8000/badge.php?score=85`
- Returns PNG image
- Color-coded:
  - 🟢 80–100
  - 🟡 50–79
  - 🔴 <50

Ideal for READMEs, investor decks, and websites.

---

## 10. Database Schema

### `users`
| id | name | email | password | plan | created_at |

### `apps`
| id | user_id | name | repo_url | scan_id | status | last_scan |

### `scan_results`
| id | app_id | bugs_found | performance_score | security_issues | report_json | generated_at |

---

## 11. User Flow

```
Landing → Upload → Login (if needed) → Scan → Results → Dashboard → Badge
```

### Key Paths
- **First-time user**: Signup after upload
- **Returning user**: Goes to dashboard
- **GitHub user**: OAuth login, no password

---

## 12. Dashboard Specification

### URL: `/dashboard`

### Layout
- **Sidebar**: Dashboard, My Apps, Results, Billing, Logout
- **Main**:
  - 3 Overview Cards: Scans Run, Bugs Found, Passed Apps
  - Table: App Name, Status, Last Scan, Certification
  - CTA: "New Scan"

### Data Calls
```js
GET /api/apps
GET /api/stats
```

### Sample Row
| AI Blog Generator | ✅ Passed | 2 hours ago | ✅ Certified |

---

## 13. Development Workflow

| Milestone | Goal |
|---------|------|
| M1 | Static Frontend |
| M2 | Backend + DB Alive |
| M3 | Auth System |
| M4 | Upload & Scan |
| M5 | Dashboard |
| M6 | Badge & Share |

---

## 14. Future Roadmap

- GitHub App Integration
- CI/CD Pipeline Scanning
- Team Collaboration (Business Plan)
- Email Reports (PDF)
- Public Leaderboard
- API for No-Code Tools

---

## 15. Contributing & License

### Contributing
1. Fork
2. Create branch
3. Submit PR

### License
MIT License – see `LICENSE`

---

## ✉️ Contact

**Developer**: [Your Name]  
**Email**: your.email@example.com  
**GitHub**: github.com/yourusername/vibetest

> 💡 **"Don’t ship broken AI apps. Test them first."**  
> — VibeTest Team
```

> 💡 **Tip**: Press `Ctrl+A` (or `Cmd+A`) then `Ctrl+C` to copy everything.

---

### 🔹 Step 2: Go to This Free Tool

👉 Open in a new tab:  
**[https://markdowntodocx.com](https://markdowntodocx.com)**

It’s 100% free, no login, no ads.

---

### 🔹 Step 3: Paste & Convert

1. On the website, click in the left text box
2. Paste (**Ctrl+V**) the entire markdown you copied
3. Click **"Convert to DOCX"**
4. Wait 2 seconds
5. Click **"Download"**

---

### ✅ Done!

You now have:
📁 `document.docx` on your computer  
📄 With all your VibeTest documentation  
🎯 Ready to share, print, or present

---

## 🎁 Want More?

Let me know and I’ll help you:

- 📦 Create a full ZIP of your project
- 🖼️ Generate a dashboard mockup (text-based)
- 📤 Deploy it online (free hosting)
- 🎤 Prepare a 2-minute pitch for investors

You've built something real.  
Now go show it to the world. 🚀

And next time, I promise — we’ll make the download even easier. 😉