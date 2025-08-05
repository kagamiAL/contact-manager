# Contact Manager

_A full-stack contact manager built with Java (Spring Boot), PostgreSQL, and React (Next.js). Secure, searchable, and modern. Access your contacts anywhere._

<p align="center">
  <img src="https://img.shields.io/badge/Java-23+-red?logo=java&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?logo=springboot&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/PostgreSQL-15+-316192?logo=postgresql&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Next.js-61DAFB?logo=react&logoColor=black&style=for-the-badge" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge" />
</p>

https://github.com/user-attachments/assets/c2f1b03e-2555-4cda-a132-30da3fe8840d

---

## Features

- **JWT-based authentication** for secure access
- **Search contacts** by name or fields
- **Batch edit** multiple contacts at once
- **Pagination** for smooth browsing through large contact lists
- **Fast CRUD:** Add, edit, and remove contacts
- **Optimized duplicate detection** using hashing
- **Modern UI** with React & Next.js
- **RESTful API** design & best practices

---

## Getting Started

**You’ll need:**
- Java 23+
- Node.js & npm
- PostgreSQL (local or remote)

### 1. Clone the repository
```bash
git clone https://github.com/kagamiAL/contact-manager
cd contact-manager
````

### 2. Environment Setup

#### 2.a. Backend (`contact_manager_backend/.env`)

You **must** create a `.env` file in the `contact_manager_backend` directory and fill out the following variables:

```
TOKEN_SECRET_KEY={YOUR_SECRET_KEY_HERE}
DB_URL={YOUR_DATABASE_URL_HERE}
DB_USERNAME={YOUR_DATABASE_USERNAME_HERE}
DB_PASSWORD={YOUR_DATABASE_PASSWORD_HERE}
FRONTEND_URL={YOUR_FRONTEND_URL_HERE} -- For CORS
```

#### 2.b. Frontend (`contact-manager-frontend/.env`)

You can **optionally** create a `.env` file in the `contact-manager-frontend` directory if you want to change the API URL (for example, if your backend is not running on localhost):

```
NEXT_PUBLIC_API_URL=https://localhost:8080
```

### 2. Backend setup

* Make sure you've filled out the environmental variables for the backend.
* This project is compatible with PostgreSQL

```bash
# Run backend (from backend directory)
cd contact_manager_backend
./mvnw spring-boot:run
```

### 3. Frontend setup

```bash
cd contact-manager-frontend
npm install
npm run dev
```

* By default, the app runs at [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
/
├── contact_manager_backend/   # Spring Boot backend
├── contact-manager-frontend/  # Next.js React frontend
└── README.md
```

---

## Why This Project?

* Real-world API design and full-stack architecture
* Secure JWT authentication and efficient batch actions
* Fast contact search, pagination, and duplicate detection
* Modular best practices (Spring Boot + React)
