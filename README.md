# Smart Healthcare Emergency & Management System

A Full Stack Node.js/Express and Vanilla JS web application designed to handle emergency medical logistics.

## Core Features
1. **Emergency Blood Donor System**: Register as a donor, search donors by city and blood group.
2. **Hospital Bed Availability System**: Role-based access for admins to update real-time ICU, Oxygen, General, and Ventilator beds.
3. **Medical Record Storage System**: Securely upload and manage PDF/Image prescriptions and reports.
4. **Emergency Request Pipeline**: One-click matchmaking platform to find the nearest beds or donors instantly.
5. **Admin Panel**: Manage system records and monitor users.

## Tech Stack
- **Frontend**: Vanilla HTML5, Modern CSS Variables, Custom UI/UX, JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **File Uploads**: Multer (Local Disk Storage)

## Setup & Installation

### 1. Prerequisites
- **Node.js**: Installed on your system.
- **MongoDB**: Installed and running locally on standard port `27017`.

### 2. Configure Environment variables
Inside the `backend/` directory, the `.env` file should look like this:
```env
MONGO_URI=mongodb://localhost:27017/healthcare_emergency_db
PORT=5000
JWT_SECRET=supersecretkey_healthcare
```

### 3. Backend Setup
1. Open terminal and navigate to the `backend/` directory.
2. Run `npm install` to install all dependencies.
3. Run `node server.js` to start the backend server. The server needs to be kept running. It will log "MongoDB successfully connected" upon success.

### 4. Run Frontend
The frontend does not require compilation. You can simply double-click on `frontend/index.html` to open it in any modern web browser, or serve it via VS Code Live Server extension. Ensure your backend is running simultaneously on `http://localhost:5000` for API calls to work.
