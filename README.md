## 📱 Contact Manager

*A full-stack contact manager built with Java (Spring Boot), PostgreSQL, and React (Next.js). Secure, searchable, and modern. Access your contacts anywhere.*

---

### 🧩 Features

* **JWT-based authentication** for secure access
* **Search contacts** quickly by name or other fields
* **Batch edit** multiple contacts at once for faster updates
* **Fast CRUD**: Add, edit, and remove contacts
* **Optimized duplicate detection** using hashing
* **Modern UI** with React & Next.js for a smooth user experience
* **RESTful API** design & best practices

---

### 🛠️ Tech Stack

* **Backend:** Java, Spring Boot, Spring Security, Spring JPA, JWT
* **Frontend:** React (Next.js)
* **Database:** PostgreSQL
* **Skills demonstrated:** API design, modular monolith architecture, secure JWT auth, batch processing, smart search

---

### 🚀 Getting Started

You’ll need:

* Java 17+
* Node.js & npm
* PostgreSQL (local or remote)

#### 1. Clone the repository

```bash
git clone https://github.com/kagamiAL/contact-manager
cd contact-manager
```

#### 2. Backend setup

* Create a PostgreSQL database.
* Edit:
  `contact_manager_backend/src/main/resources/application.properties`

```bash
# Run backend (from backend directory)
./mvnw spring-boot:run
```

#### 3. Frontend setup

```bash
cd contact_manager_frontend
npm install
npm run dev
```

* App runs at [http://localhost:3000](http://localhost:3000)

---

### 📂 Project Structure

```text
/
├── contact_manager_backend/   # Spring Boot backend
├── contact_manager_frontend/  # Next.js React frontend
└── README.md
```

---

### 🧠 Why This Project?

* Demonstrates real-world API design and full-stack app architecture
* Implements secure JWT authentication and efficient batch actions
* Includes fast contact search and duplicate detection
* Built with modular best practices (Spring Boot + React)