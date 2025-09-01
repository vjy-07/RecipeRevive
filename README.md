# 🍽️ RecipeRevive

**RecipeRevive** is an all-in-one recipe discovery and kitchen management web app that allows users to search for delicious recipes, view nutritional information for custom ingredients, and set expiration reminders for their food items. Designed for simplicity, health-conscious living, and reducing food waste.

🔗 **Live Site**: [Click Here](https://reicperevive-frontend.onrender.com/)

---

## 🚀 Features

### 🔍 Recipe Search
- Search a wide variety of recipes using keywords.
- Click on any recipe card to view:
  - Ingredients

### 🧮 Nutritional Analysis
- Input **custom ingredients** with quantities.
- View real-time nutritional facts like:
  - Calories
  - Proteins
  - Carbohydrates
  - Fats

### ⏰ Expiration Reminder
- Add items from your kitchen.
- Set expiration dates with time-based reminders.
- Get notified when an item is near expiry.

### 🔐 Authentication
- Secure **Sign Up** and **Login** functionality.
- Anyone can access the home page.
- Only logged-in users can:
  - Search recipes
  - Analyze nutrition
  - Set reminders

---

## 🧱 Tech Stack

| Frontend     | Backend             | Database        | Hosting        |
|--------------|---------------------|------------------|----------------|
| React.js     | Node.js + Express.js| MongoDB Atlas    | Render         |

---

## 📁 Folder Structure
```
RecipeRevive/
├── backend/ # Backend code (Express.js + MongoDB)
│ ├── config/ # MongoDB connection setup
│ ├── controllers/ # Controllers for auth and features
│ ├── models/ # Mongoose models (User, Reminder, etc.)
│ ├── routes/ # API route files
│ ├── app.js # Main Express server
│ ├── package.json # Backend dependencies
│ └── .env # Backend environment variables
│
├── public/ # Public files (React)
│ └── index.html
│
├── src/ # Frontend React code
│ ├── components/ # Reusable UI components
│ ├── styles/ # SCSS styling
│ ├── App.js # Main app component
│ └── index.js # React DOM rendering
│
├── .gitignore
├── package.json # Frontend dependencies
├── README.md
└── .env # Frontend environment variables
```

---

## 🛠️ Getting Started (Local Setup)

### 🔧 Prerequisites

- Node.js installed
- MongoDB Atlas database setup
- Edamam API credentials

---

### 🖥️ Backend Setup

```bash
# Step 1: Navigate to backend folder
cd backend

# Step 2: Create .env file
touch .env

# next Add these to .env file
MONGO_URI=your_mongodb_atlas_uri
PORT=5001
JWT_SECRET=

# Step 3: Install backend dependencies
npm install

# Step 4: Start the backend server
npm start

```
### 🌐 Frontend Setup

```bash
# Step 1: Make sure you're in the root of the project
cd recipeapp  # or your project folder name

# Step 2: Create .env file
touch .env
# next Add these to .env file
REACT_APP_APP_ID=
REACT_APP_APP_KEY=
REACT_APP_NUTRITION_API_ID=
REACT_APP_NUTRITION_API_KEY=

# Step 3: Install frontend dependencies
npm install

# Step 4: Start the React app
npm start

```
