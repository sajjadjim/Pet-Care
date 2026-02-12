# 🐕❄️ Pet Care - Next.js Application

# Live site: Go to [Pet Care](https://pet-care-own.vercel.app)
A modern, responsive web application for pet care products built with Next.js and Firebase.

## 🌟 Features

- **7-Section Landing Page** with hero, features, products, testimonials, tips, about, and contact sections
- **Authentication** with Google Sign-In using Firebase
- **Product Management** with full CRUD operations
- **Protected Routes** for authenticated users only
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Real-time Database** with Firebase Firestore

## 🛠️ Technologies Used

- **Next.js 14** (App Router)
- **React** for UI components
- **Firebase** for authentication and database
- **Tailwind CSS** for styling
- **Vercel** for deployment

## 📋 Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Landing page with 7 sections | No |
| `/login` | Google authentication | No |
| `/products` | List all products with search/filter | No |
| `/products/[id]` | Product details page | No |
| `/add-product` | Add new product form | Yes ✅ |
| `/manage-products` | Manage all products | Yes ✅ |

## 🚀 Setup & Installation



### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/sajjadjim/Pet-Care
cd pet-care
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Google Authentication
   - Create Firestore database
   - Copy your Firebase config

4. **Create `.env.local` file**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. **Run development server**
```bash
npm run dev
```

6. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

## 🎨 UI Features

- **Sticky Navbar** with user dropdown
- **Responsive Design** for all screen sizes
- **Hover Effects** on cards and buttons
- **Loading States** for better UX
- **Toast Notifications** for user feedback
- **Gradient Backgrounds** for visual appeal
- **Emoji Icons** for product representation

## 👤 Created By

[Sajjad Hossain Jim](https://github.com/sajjadjim)
