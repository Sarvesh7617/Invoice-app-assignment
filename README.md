# 🧾 Invoice Management System

A full‑stack application to manage invoices and payments.  
Built with **React** (frontend) and **Node.js/Express + MongoDB** (backend).


<img width="1884" height="829" alt="Screenshot 2026-02-21 015153" src="https://github.com/user-attachments/assets/bfb25e29-5e2d-4f79-bbb6-c216cd16eac1" />



<img width="1918" height="952" alt="Screenshot 2026-02-21 015208" src="https://github.com/user-attachments/assets/bf56564d-141b-4cdd-a236-a573d4b6edd9" />


## ✨ Features - **Create new invoices with:** 
- Invoice number
- Customer name
- Issue date & due date
- Line items (description, quantity, unit price) 
- Support for multiple line items per invoice

- **Automatic calculation of:** 
- Line totals - Invoice total 
- Balance due 

- **Payments Management:** 
- Add payments against invoices 
- Partial payments update balance due 
- Full payment updates status to **PAID** 
- **Invoice Archiving:** 
- Archive invoices (disables payment addition) 

- **View Invoice Details including:** 
- Customer info 
- Status (**DRAFT / PAID / ARCHIVED**) 
- Line items 
- Payments history



## 🛠️ Tech Stack

### Frontend
- React  
- Axios (API calls)  
- TailwindCSS (styling)  

### Backend
- Node.js  
- Express  
- MongoDB (with Mongoose ODM)  
-dotenv
-cors


## 📂 Project Structure

### Frontend


frontend/
├── src/
│ ├── components/
│ │ ├── InvoiceHeader.jsx               # Displays the invoice header
│ │ ├── InvoiceTable.jsx                # Displays the table with invoice line items
│ │ ├── InvoiceTotal.jsx                # Displays the total amount of the invoice
│ │ └── PaymentsSection.jsx             # Manages payment handling
│ ├── config/
│ │ └── config.js                       # Configuration settings for the frontend
│ ├── helper/
│ │ └── axiosHelper.js                  # Axios instance for API requests
│ ├── pages/
│ │ ├── Home.jsx                        # Invoice creation form and detail view
│ │ └── PaymentsSection.jsx             # Payment handling UI
│ └── main.jsx                          # Main entry point for the React app
└── env.sample                          # Sample environment file for frontend

### Backend

backend/
├── src/
│ ├── controllers/
│ │ └── invoice.controller.js          # Logic for handling invoice-related requests
│ ├── db/
│ │ └── index.js                       # Database connection logic
│ ├── services/
│ │ └── invoice.service.js             # Business logic for invoices
│ ├── models/
│ │ ├── Invoice.model.js               # Invoice schema/model
│ │ ├── InvoiceLine.model.js           # Invoice line item schema/model
│ │ └── Payment.model.js               # Payment schema/model
│ ├── routes/
│ │ └── invoice.routes.js              # Routes for invoice-related API endpoints
│ ├── index.js                         # Entry point for the backend app
│ ├── app.js                           # Main app configuration file
│ └── constant.js                      # Defines constants DB name
└── env.sample                         # Sample environment file for backend


## ⚙️ Setup

### Clone the repository

```bash
git clone https://github.com/Sarvesh7617/Video_Tube_backend.git
```

##  Backend
1. Navigate to the backend folder:
```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 🔐4. Set Environment Variables

#### Create a .env file in the root of your project:

```bash
PORT=8000

MONGOOSE_URL="mongodb+srv://yourUsername:yourPassword@cluster0.875cujb.mongodb.net"

CORS_ORIGIN="http://localhost:your_frontend_Port"
```



##  Frontend
1. Navigate to the frontend folder:
```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 🔐4. Set Environment Variables

#### Create a .env file in the root of your project:

```bash
VITE_BACKEND_URL="http://your_backend_localhost"
BACKEND_URL="http://your_backend_localhost"
```


## 📌 API Endpoints

| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /invoices                    | Create new invoice   |
| GET    | /invoices/:id                | Get invoice details  |
| POST   | /invoices/:id/payments       | Add payment          |
| PATCH  | /invoices/:id/archive        | Archive invoice      |



## 🧪 Testing Scenarios

- **Create invoice with single line item**  
  - Example: Service ₹500  

- **Create invoice with multiple line items**  
  - Example: Service ₹500 + Product ₹300 → Total ₹800  

- **Add partial payment**  
  - Example: ₹300 → Balance ₹500  

- **Add full payment**  
  - Example: ₹500 → Balance ₹0, Status = **PAID**  

- **Invalid payment attempts**  
  - Payment = 0 or negative → **Error**  
  - Payment > balance due → **Error**  

- **Archive invoice**  
  - Payment button disabled  
