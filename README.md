# VeeTry - Virtual Try-On Fashion Store 👗🕶️

An **AI-powered virtual try-on fashion store** that allows users to try clothes online using their **live camera**, get **personalized outfit recommendations**, and purchase directly from the platform.  
Designed to help **local small shop owners** bring their stores online with an **all-in-one free solution** combining virtual try-on, recommendations, and shopping.

🔗 **Live Demo**: [VeeTry](https://github.com/TejasChavan7/VeeTry)  
📂 **Backend Repo**: [GitHub Repository](https://github.com/TejasChavan7/VeeTry)  

---

## 🚀 Features  

- **Live Virtual Try-On** – Users can try clothes directly using their camera for a realistic experience.  
- **Personalized Recommendations** – AI suggests outfits based on user preferences.  
- **Outfit Generator** – Auto-generates outfits using selected items with a single click.  
- **One-Click Purchase** – Users can add the entire outfit/cart to checkout instantly.  
- **Shop Owner Portal** – Local shop owners can upload and manage products easily.  
- **Secure Authentication** – User accounts and order tracking with secure login/signup.  

---

## 🛠️ Tech Stack  

**Frontend**  
- HTML, CSS, JavaScript  
- Bootstrap / Tailwind  

**Backend**  
- Node.js (Express.js)  
- RESTful APIs  

**Database**  
- MongoDB  

**AI/ML**  
- Outfit generation & recommendation system  

**Other Integrations**  
- Cloudinary – for image storage  
- Mapbox – for location-based shop suggestions (future scope)  

---

## 📂 Project Structure  

VeeTry/
│── models/ # Database models
│── routes/ # Express routes (auth, products, orders, outfit)
│── public/ # Static files
│── views/ # Frontend views (EJS templates)
│── app.js # Main application file
│── package.json # Dependencies


---

## ⚡ Installation & Setup  

1. Clone the repo  
   ```bash
   git clone https://github.com/TejasChavan7/VeeTry.git
   cd VeeTry
   
Install dependencies
npm install

Setup environment variables (.env)
PORT=5000
MONGO_URI=your_mongo_connection_string
CLOUDINARY_URL=your_cloudinary_url
SESSION_SECRET=your_secret_key


Run the server
npm start


Future Scope

📌 Onboard local offline shop owners with location-based product suggestions.

📌 Add AR-based try-on for accessories (watches, glasses, jewelry).

📌 Implement payment gateway integration for smooth checkout.

📌 Mobile App version for wider accessibility.


Team





Tejas Rajendra Chavan – Full Stack Development, Dashboard Integration
GitHub: TejasChavan7



Digvijay Desai – Data Analysis, AI/ML Model Building
Email: digvijaydesai48@gmail.com
