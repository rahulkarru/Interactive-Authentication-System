
# **Interactive Draw-Based Authentication System**

## **🚀 Introduction**

Welcome to the **Interactive Draw-Based Authentication System**! This project reimagines the way we authenticate users by replacing traditional passwords with a more intuitive and interactive method—drawing predefined shapes. Imagine registering by drawing a shape, and logging in by simply recreating that shape again. No passwords, just your unique drawn shapes!

---

## **🛠️ Tech Stack**

- **Frontend:**
  - **React** (Vite for faster builds)
  - **React Router** for navigation
  - **Konva** for canvas drawing
  - **Axios** for API calls

- **Backend:**
  - **Node.js** with **Express**
  - **MongoDB** (with Mongoose for ODM)
  - **bcrypt** for secure hashing of shapes
  - **JSON Web Tokens (JWT)** for user authentication

- **Other Tools:**
  - **CORS** for handling cross-origin requests
  - **Body-Parser** for parsing incoming requests
  - **Vite** for fast frontend builds

---

## **🎯 Features**

### **🔐 Shape-Based Authentication**
- **Login:** Authenticate by redrawing a shape (no passwords!).
- **Registration:** User enters basic details (username, email) and draws a shape that’s stored securely.

### **🖼️ Interactive Drawing Canvas**
- User selects predefined shapes (rectangle or line).
- Adjust shape rotation with a slider and place points with accuracy.

### **🔄 Real-Time Feedback**
- Immediate visual feedback as shapes are drawn or rotated.
- Provides a fully interactive way to engage users in the authentication process.

### **📦 Secure Backend**
- Shape data is hashed and stored securely in **MongoDB**.
- **JWT tokens** are used to securely manage sessions.

---

## **📁 Project Structure**

Here’s an overview of the file structure:

```
├── public/
│   └── index.html            # HTML template for the app
├── src/
│   ├── components/           # React Components
│   │   ├── LandingPage.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── DrawCanvas.jsx
│   │   └── AuthSuccess.jsx
│   ├── App.jsx               # Main React app
│   ├── main.jsx              # Entry point for React
├── backend/                  # Node.js Backend
│   ├── server.js             # Main server file
│   ├── models/               # MongoDB Models
│   ├── routes/               # API routes for authentication
├── styles/                   # CSS files
│   ├── Login.css
│   ├── Register.css
│   ├── LandingPage.css
│   ├── App.css
└── package.json              # NPM dependencies
```

---

## **🔧 How It Works**

### **1. User Registration**

- **Step 1:** User enters their **username** and **email**.
- **Step 2:** The user is then directed to a drawing canvas where they draw a shape (rectangle or line).
- **Step 3:** The shape is stored securely in the backend, including its metadata (rotation, shape type, edge coordinates).

### **2. User Login**

- **Step 1:** User enters **username** and is redirected to the drawing canvas.
- **Step 2:** The user redraws the shape.
- **Step 3:** The backend compares the drawn shape’s metadata with the stored shape.
- **Step 4:** If it matches, the user is logged in successfully!

---

## **⚙️ Installation & Setup**

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/interactive-auth
cd interactive-auth
```

### 2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

- Make sure **MongoDB** is set up (use **MongoDB Atlas** for a cloud database or set up a local instance).

### 3. **Run the Backend**

```bash
node server.js
```

### 4. **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

### 5. **Run the Frontend**

```bash
npm run dev
```

---

## **📹 Demo Walkthrough**

1. **Landing Page:** First-time users see a welcoming screen with options to **Login** or **Register**.
2. **Registration Flow:** User fills out basic info and draws a shape to create their account.
3. **Login Flow:** User logs in by recreating their previously drawn shape.
4. **Shape Validation:** Backend compares the user’s drawn shape with the one stored during registration.

---

## **💡 Future Enhancements**

- **Voice Authentication:** Add voice-based authentication alongside drawing shapes.
- **AI-based Gesture Recognition:** Use machine learning models to verify the shape based on its pattern.
- **Real-time Shape Feedback:** Add more shape types and real-time validation feedback.
- **Password Recovery:** Allow users to reset their shape-based credentials securely.

---


## **👨‍💻 License**

This project is open-source and available under the **MIT License**. You’re free to use, modify, and distribute it as per the license terms.

---

