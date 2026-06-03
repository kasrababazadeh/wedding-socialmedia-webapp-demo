# Wedding Social Media Web App Demo

A full-stack web application that allows couples to register and receive donations from supporters for their wedding. This is a Persian (Farsi) RTL (Right-to-Left) web application built with modern technologies.

## 📋 Overview

This platform enables couples planning to get married to create profiles, share their stories, and receive financial support from friends, family, and well-wishers. The application includes features for couple registration, donation tracking, QR code generation, and comprehensive admin management.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.3.3
- **Library**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.1
- **HTTP Client**: Axios 1.9.0
- **Data Fetching**: SWR 2.3.3
- **Icons**: React Icons 5.5.0
- **Authentication**: JWT (jwt-decode 4.0.0)

### Backend
- **Framework**: Django 5.2.3
- **API**: Django REST Framework 3.16.0
- **Authentication**: djangorestframework-simplejwt 5.5.0
- **Database**: PostgreSQL (psycopg2-binary 2.9.10)
- **CORS**: django-cors-headers 4.7.0

## ✨ Features

### For Couples
- 📝 Register with phone number verification (OTP)
- 📸 Upload wedding album images and documents
- 👤 Create detailed couple profiles with partner information
- 🔗 Unique profile URLs with auto-generated slugs
- 📱 Automatic QR code generation for easy sharing
- 💰 Track all donations received

### For Donors
- 💝 Browse registered couples
- 🎁 View couple profiles and stories
- 💳 Multiple donation methods
- 📊 Track personal donation history

### For Admins
- 👥 Manage all couples and their registrations
- 💵 Monitor all donations
- 📈 Comprehensive dashboard and analytics
- 🔐 Full administrative control

### Technical Features
- 🔐 Phone number authentication with OTP verification
- 🎨 Fully RTL (Right-to-Left) design for Persian language
- 📱 Responsive design for all devices
- 🔄 Rate limiting for SMS verification (60 seconds per request)
- 🛡️ JWT token-based authentication
- 🎯 Automatic slug and QR code generation

## 📁 Project Structure

```text
wedding-socialmedia-webapp-demo/
├── backend/
│   ├── weddingApp/
│   │   ├── couple/              # Main app for couples and users
│   │   │   ├── models.py        # User, Couple, CoupleExtraInfo models
│   │   │   ├── views.py         # API endpoints
│   │   │   ├── serializers.py   # Data serialization
│   │   │   ├── urls.py          # URL routing
│   │   │   ├── signals.py       # Django signals
│   │   │   └── utils.py         # Utility functions
│   │   ├── media/               # Media handling
│   │   │   ├── documents/       # Uploaded documents
│   │   │   └── qr/              # Generated QR codes
│   │   └── manage.py            # Django management script
│   └── requirements.txt         # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── app/                 # Next.js app router pages
    │   │   ├── about/           # About us page
    │   │   ├── admin/           # Admin dashboard
    │   │   ├── couples/         # All couples listing
    │   │   ├── donate/[coupleId]/    # Donation page
    │   │   ├── donations/[coupleId]/ # Couple's donations view
    │   │   ├── my-donations/    # User's donation history
    │   │   ├── payments/        # Payment methods
    │   │   ├── profiles/        # User profiles
    │   │   ├── layout.tsx       # Root layout
    │   │   └── page.tsx         # Home page
    │   ├── components/          # Reusable components
    │   ├── contexts/            # React contexts
    │   ├── hooks/               # Custom hooks
    │   ├── lib/                 # Library utilities
    │   ├── styles/              # Global styles
    │   └── utils/               # Helper functions
    ├── public/                  # Static assets
    ├── package.json             # Node dependencies
    ├── tailwind.config.js       # Tailwind configuration
    └── next.config.ts           # Next.js configuration
```

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure database settings in `weddingApp/weddingApp/settings.py`

5. Run migrations:
```bash
python weddingApp/manage.py makemigrations
python weddingApp/manage.py migrate
```

6. Create a superuser (admin):
```bash
python weddingApp/manage.py createsuperuser
```

7. Start the development server:
```bash
python weddingApp/manage.py runserver
```
The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```
The frontend will be available at `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/send-code/` - Send OTP to phone number
- `POST /api/auth/verify/` - Verify OTP and get JWT tokens
- `POST /api/auth/logout/` - Logout and blacklist token
- `GET /api/auth/profile/` - Get user profile
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Couples
- `POST /api/couples/register/` - Register new couple (multipart/form-data)
- `GET /api/couples/<slug>/` - Get couple details by slug

## 📊 Database Models

### User
- Phone number (unique identifier)
- User types: donator, couple, admin, staff
- JWT authentication

### Couple
- Linked to User (OneToOne)
- Partner 1 & 2 details (forename, surname, national ID)
- Email and document uploads
- Auto-generated unique slug
- Auto-generated QR code

### CoupleExtraInfo
- Additional information for couples
- OneToOne relationship with Couple

## 🎨 Key Features Implementation

### QR Code Generation
Each couple profile automatically generates a unique QR code that links to their profile page, making it easy to share at wedding events.

### OTP Authentication
Secure phone number verification with:
- 6-digit OTP codes
- 2-minute expiration
- Rate limiting (1 request per 60 seconds per phone/IP)
- Attempt tracking to prevent brute force

### Slug Generation
Automatic URL-friendly slug creation from couple names with UUID suffix to ensure uniqueness.

## 🌐 Internationalization

This is a Persian (Farsi) language application with full RTL support. All UI text is in Persian, and the layout respects right-to-left reading direction.

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend
```bash
python manage.py runserver          # Start development server
python manage.py makemigrations     # Create migrations
python manage.py migrate            # Apply migrations
python manage.py createsuperuser    # Create admin user
python manage.py shell              # Django shell
```

## 🔒 Security Features

- JWT token authentication
- Rate limiting on SMS endpoints
- OTP expiration (2 minutes)
- CORS headers configuration
- Secure password handling
- Token blacklisting on logout

## 🚀 Deployment

### Frontend (Vercel)
The easiest way to deploy the Next.js frontend is using Vercel:
```bash
vercel
```

### Backend
Deploy the Django backend to services like:
- Heroku
- DigitalOcean
- AWS EC2
- Railway

## 📄 License

This project is a demo application.

## 👤 Author

**Kasra Babazadeh Mahalleh**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, please open an issue in the GitHub repository.
