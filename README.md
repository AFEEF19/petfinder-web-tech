# 🐾 PetFinder Mini

### Web Technology Project – Group 6

PetFinder Mini is a full-stack web application developed to help users report and search for lost and found pets through a centralized platform.

The application allows users to register, log in, submit lost/found pet reports with images, and search or filter existing pet reports.

---

## Team Members

- Afeef Mohammed S (B24CS2108)
- Ajmal Latheef    (B24CS2109)
- Kanika V         (B24CS2133)
- R S Arathi       (B24CS2151)

---

## Objectives

- Provide user registration and login.
- Allow users to report lost or found pets.
- Support pet image upload.
- Store pet report information in a MySQL database.
- Provide search and filtering functionality.
- Display available pet reports in an organized interface.

---

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- React Router
- Fetch API
- FormData
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API
- Express Session
- Bcrypt
- Multer
- CORS
- Dotenv

### Database

- MySQL

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MySQL Workbench

---

## System Architecture

```text
User
  ↓
React + Vite
  ↓
Fetch API / FormData
  ↓
Node.js + Express
  ↓
┌──────────────────────┐
│    MySQL Database    │
│                      │
│    Users             │
│    Pet Reports       │
│    Image Path        │
└──────────────────────┘

Image Upload
     ↓
   Multer
     ↓
backend/uploads/
```

---

## Main Features

### User Authentication

Users can:

- Create an account.
- Log in using their registered email and password.
- Maintain a session while using the application.
- Log out securely.

Passwords are hashed using Bcrypt before being stored in the database.

### Pet Reporting

Users can submit reports for:

- Lost pets
- Found pets

A report can contain:

- Pet name
- Pet type
- Breed
- Color
- Location
- Description
- Contact information
- Pet image

Pet name is optional because a found pet may not have a known name.

### Image Upload

Users can upload an actual pet image while submitting a report.

Multer is used in the Express backend to process the uploaded image.

The image is stored in the backend `uploads` directory, while its path is stored in MySQL.

### Search and Filtering

Users can search pet reports using:

- Pet name
- Location
- Breed
- Pet type

Reports can also be filtered based on:

- Lost
- Found

Search and filtering can be used together.

### Database Storage

MySQL is used to store:

- User information
- Pet report information
- Uploaded image paths

---

## Project Structure

```text
petfinder-web-tech/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Home.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── uploads/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── database.sql
├── README.md
└── .gitignore
```

---

## Application Flow

```text
Register
   ↓
Login
   ↓
Home Page
   ↓
Report Lost / Found Pet
   ↓
Pet Details + Image
   ↓
React Frontend
   ↓
Fetch API / FormData
   ↓
Express Backend
   ↓
Multer → Image Storage
   ↓
MySQL → Pet Report Storage
   ↓
Retrieve Reports
   ↓
Search / Filter
   ↓
Display Pet Reports
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Check whether the backend is running |
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Log in a user |
| GET | `/api/session` | Check the current session |
| POST | `/api/logout` | Log out the user |
| POST | `/api/pets` | Submit a pet report |
| GET | `/api/pets` | Retrieve pet reports |

---

## Database

The project uses a MySQL database named:

```text
petfinder
```

### Tables

#### `users`

Stores registered user information.

| Column | Description |
|--------|-------------|
| `id` | Unique user ID |
| `name` | User name |
| `email` | Registered email |
| `password` | Hashed password |
| `created_at` | Account creation time |

#### `pet_reports`

Stores lost and found pet reports.

| Column | Description |
|--------|-------------|
| `id` | Unique report ID |
| `pet_name` | Name of the pet |
| `pet_type` | Type of pet |
| `breed` | Breed of pet |
| `color` | Pet color |
| `location` | Last known/found location |
| `description` | Additional information |
| `report_type` | Lost or Found |
| `contact` | Contact information |
| `image` | Uploaded image path |
| `created_at` | Report creation time |

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AFEEF19/petfinder-web-tech.git
```

```bash
cd petfinder-web-tech
```

---

### 2. Setup the Backend

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=petfinder
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

---

### 3. Setup the Database

Open MySQL Workbench and execute:

```text
database.sql
```

This creates the `petfinder` database and the required tables.

---

### 4. Setup the Frontend

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## Security

- Passwords are hashed using Bcrypt.
- Database credentials are stored using environment variables.
- `.env` is excluded from GitHub using `.gitignore`.
- User authentication is maintained using Express sessions.

---

## Future Enhancements

Possible future improvements include:

- Admin dashboard
- Location / map-based search
- Notifications
- Pet status updates
- Improved user profiles
- Advanced image-based pet matching

---

## References

- React Documentation — https://react.dev/
- Vite Documentation — https://vite.dev/
- Node.js Documentation — https://nodejs.org/docs/latest/api/
- Multer Documentation — https://www.npmjs.com/package/multer
- United Nations Sustainable Development Goals — https://sdgs.un.org/goals

---

## Project Repository

**GitHub:**  
https://github.com/AFEEF19/petfinder-web-tech

---

## 🐾 PetFinder Mini

**A centralized web platform for reporting and finding lost and found pets.**
