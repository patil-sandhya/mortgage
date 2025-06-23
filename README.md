
#  MortgagePro - Mortgage Data Entry and Verification System

The Mortgage Data Entry and Verification System is a web-based application designed to streamline the process of entering, reviewing, and managing mortgage records. It includes two main user roles: Admins and VAs (Virtual Assistants).

VAs can log in, view only the records assigned to them, lock and edit data, and mark records as Verified or Flagged.

Admins have access to all records, can create and assign batches, manage VA accounts, and review a complete audit trail of all user actions for compliance.

---

## 🚀 Live Demo

🌐 [View Live Website](https://forky-ten.vercel.app/menu)

---

## 🖼️ Pages Overview

### ✅ Signup/Login
- New VA users can register themselves.
- Role-based redirection after login.


### 📋 Record Page (For VAs)
- Paginated list of assigned records.
- Crate, lock and edit a record.
- Mark record as Verified or Flagged.


### 📑 Records Page (Admin)
- Search and filter all records.
- Assign records to batches.
- See user names for each action (entered by, reviewed by, locked by).


### 📦 Batch Page (Admin)
- Create new batches (unique name).
- Assign multiple records to a batch.
- View records grouped by batch.


### 📜 Audit Logs (Admin)
- Track every data entry, edit, and review with timestamp and VA identity.
- 
---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Nest.js, TypeORM
- **Database**: PostgreSql
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 📦 Features
### Authentication

- Signup for new VA accounts.

- Login with role-based dashboard access (Admin/VA).

### VA Dashboard

- View only assigned records.

- Create, edit, lock and review records (Verify/Flag).

- View batch name and user info.

### Admin Dashboard

- View and manage all records.

- Search records by name, address, or APN.

- Filter by status or unassigned.

- Create batches and assign records.

- View audit logs (entry/edit/review actions).

---


