
#  MortgagePro - Mortgage Data Entry and Verification System

The Mortgage Data Entry and Verification System is a web-based application designed to streamline the process of entering, reviewing, and managing mortgage records. It includes two main user roles: Admins and VAs (Virtual Assistants).

VAs can log in, view only the records assigned to them, lock and edit data, and mark records as Verified or Flagged.

Admins have access to all records, can create and assign batches, manage VA accounts, and review a complete audit trail of all user actions for compliance.

---

## 🚀 Live Demo

🌐 [View Live Website](https://mortgagepro-nine.vercel.app/)

---

## 🖼️ Pages Overview

### ✅ Signup/Login
- New VA users can register themselves.
- Role-based redirection after login.

![Screenshot 2025-06-23 101649](https://github.com/user-attachments/assets/f2664727-d2b1-4cd8-811a-e7fc081d895e)


### 📋 Record Page (For VAs)
- Paginated list of assigned records.
- Crate, lock and edit a record.
- Mark record as Verified or Flagged.

![Screenshot 2025-06-23 101800](https://github.com/user-attachments/assets/b45d4989-385f-49bc-8f40-03e604ebf7fa)


### 📑 Records Page (Admin)
- Search and filter all records.
- Assign records to batches.
- See user names for each action (entered by, reviewed by, locked by).

![Screenshot 2025-06-23 101913](https://github.com/user-attachments/assets/dc645d6e-4672-454a-be3f-0a808200ec17)


### 📦 Batch Page (Admin)
- Create new batches (unique name).
- Assign multiple records to a batch.
- View records grouped by batch.
![Screenshot 2025-06-23 102045](https://github.com/user-attachments/assets/0b76246b-52d1-4844-8272-3900c02ea030)



### 📜 Audit Logs (Admin)
- Track every data entry, edit, and review with timestamp and VA identity.
- ![Screenshot 2025-06-23 102138](https://github.com/user-attachments/assets/2bf3e578-9927-4f69-920c-955806b332d5)

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


