# Aristhos Woodcraft

A full stack product catalog and lead-management system with JWT-authenticated admin controls, built for a B2C furniture business — demonstrating REST API design, protected routes, and MongoDB-backed CRUD across a deployed React/Node stack.

Public visitors browse a product catalog and submit inquiries via WhatsApp or a custom project form. A single admin account manages the product catalog and customer inquiries through a protected dashboard.

**Live demo:** _[add Vercel URL here once deployed]_

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router DOM v6
- CSS Modules (component-scoped styling)
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication (httpOnly cookies)
- bcrypt password hashing

**Deployment**
- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## Features

**Public**
- Browse products by category (Living Room, Bedroom, Dining Room, Bespoke/Custom)
- Product detail modal with WhatsApp inquiry (auto-logged to the database with a tracking reference)
- Custom project inquiry form (email-based, no phone number required)
- Responsive across desktop, tablet, and mobile

**Admin (protected)**
- JWT-based login with httpOnly cookies
- Product CRUD (create, edit, delete) via a protected inventory dashboard
- Customer inquiry dashboard — view all inquiries, update status (Pending WhatsApp / Contacted / Resolved)
- Route-level auth guard — unauthenticated visits to any `/admin/*` route redirect to login

---

## Project Structure

```
aristhos-web/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Layout/       # Navbar, Footer
│       │   └── UI/           # Button, ItemCard
│       ├── pages/
│       │   ├── Home/         # Landing page + section components
│       │   ├── Shop/         # Catalog, sidebar filter, product modal
│       │   ├── Heritage/
│       │   ├── About/        # Custom project inquiry form
│       │   └── Admin/        # Login, layout, inventory, inquiries
│       ├── styles/           # global.css
│       └── utils/            # axiosInstance.js
│
└── backend/
    ├── controllers/          # auth, product, inquiry logic
    ├── middleware/           # auth guard, error handler, upload
    ├── models/                # User, Product, Inquiry (Mongoose schemas)
    ├── routes/
    ├── seeder.js              # sample data seeding script
    └── server.js
```

---

## Running Locally

**Backend**
```bash
cd backend
npm install
# create a .env file (see below)
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

### Backend `.env`

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_signing_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

```
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## API Overview

| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Public |
| GET | `/api/auth/me` | Protected — session check |
| GET | `/api/products` | Public |
| POST / PUT / DELETE | `/api/products` | Protected (admin) |
| POST | `/api/inquiries` | Public |
| GET | `/api/inquiries` | Protected (admin) |
| PUT | `/api/inquiries/:id` | Protected (admin) |

Protected routes require a valid `admin_token` httpOnly cookie, issued at login and verified via middleware on every request.

---

## Notes

This is a self-taught, solo-built portfolio project. Product catalog, business narrative, and testimonials are demo content, not a real business.

Built by Vansh Verma — [GitHub](https://github.com/VanshVerma1117) · [LinkedIn](https://www.linkedin.com/in/vansh-verma-7aa1aa20b/)