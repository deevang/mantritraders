# Mantri Traders - Full Stack Setup Guide

This guide will help you set up and run both the frontend and backend of your Mantri Traders website.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Quick Start

### 1. Start MongoDB
```bash
# If you have MongoDB installed locally:
mongod

# Or use MongoDB Atlas (cloud) - update config.env with your connection string
```

### 2. Start Backend Server
```bash
cd mantritraders-backend
npm install
npm run dev
```
Backend will run on: http://localhost:5000

### 3. Start Frontend
```bash
cd mantritraders-react
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## Backend Setup

### Environment Configuration
Edit `mantritraders-backend/config.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mantritraders
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@mantritraders.com
ADMIN_PASSWORD=MantriTraders2024!
```

### Create Admin User
After starting the backend, create the admin user:
```bash
curl -X POST http://localhost:5000/api/auth/setup
```

## Frontend Setup

The frontend is already configured to connect to the backend at `http://localhost:5000`.

## Admin Access

- **URL**: http://localhost:5173/admin
- **Email**: admin@mantritraders.com
- **Password**:  MantriTraders2024!

## Features

### Backend API
- ✅ Authentication with JWT
- ✅ Product CRUD operations
- ✅ Image upload and storage
- ✅ Enquiry management
- ✅ Database persistence

### Frontend
- ✅ Modern React with Tailwind CSS
- ✅ Admin panel with authentication
- ✅ Product management
- ✅ Image upload with cropping
- ✅ Customer enquiry system
- ✅ Responsive design

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/setup` - Create admin user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/products/upload-image` - Upload image (admin)

### Enquiries
- `POST /api/enquiries` - Submit enquiry
- `GET /api/enquiries` - Get all enquiries (admin)
- `PATCH /api/enquiries/:id/status` - Update status (admin)

## Troubleshooting

### Backend Issues
1. **MongoDB not running**: Start MongoDB service
2. **Port 5000 in use**: Change PORT in config.env
3. **Connection refused**: Check if backend is running

### Frontend Issues
1. **Backend connection error**: Ensure backend is running on port 5000
2. **CORS errors**: Backend has CORS enabled for localhost
3. **Authentication fails**: Check if admin user exists

### Database Issues
1. **No products showing**: Check if products exist in database
2. **Admin login fails**: Run the setup endpoint to create admin user
3. **Data not persisting**: Check MongoDB connection

## Development

### Backend Development
```bash
cd mantritraders-backend
npm run dev  # Auto-restart on file changes
```

### Frontend Development
```bash
cd mantritraders-react
npm run dev  # Hot reload enabled
```

## Production Deployment

1. **Backend**: Deploy to Heroku, Railway, or VPS
2. **Frontend**: Deploy to Vercel, Netlify, or VPS
3. **Database**: Use MongoDB Atlas for cloud database
4. **Environment**: Set production environment variables

## File Structure

```
mantritraders/
├── mantritraders-backend/     # Node.js + Express API
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── uploads/              # Image storage
│   └── server.js             # Main server file
└── mantritraders-react/      # React frontend
    ├── src/
    │   ├── components/       # React components
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   └── App.jsx          # Main app component
    └── package.json
```

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all services are running
3. Check network connectivity
4. Review the API documentation 