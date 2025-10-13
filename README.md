# Piv Blog – Next.js Blogging & Commenting Platform

This is a **Next.js** project built for creating, managing, and reading blog posts with commenting functionality. It includes **user authentication**, **admin controls**, **image uploads via Cloudinary**, **rich text editor**, and **commenting system**.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

> Add your live demo link here once deployed(vercel)[blog-comment-platform-9tq9.vercel.app
]

---

## Features

### User Features
- Browse all blog posts
- Read detailed post pages
- Comment on posts
- Search posts by title or content
- Light/Dark mode toggle
- Responsive design for desktop and mobile

### Admin Features
- Create, update, and delete posts
- Upload post images via Cloudinary
- Rich text content editor (React Quill)
- View all users (optional)
- Moderate comments

### Additional Features
- Real-time commenting system
- Optimized images and fonts
- Tailwind CSS for modern styling
- Clerk authentication for users

---

## Tech Stack

- **Frontend & Backend:** Next.js (App Router)
- **Authentication:** Clerk Auth
- **Database:** MongoDB
- **ORM:** Mongoose
- **Styling:** Tailwind CSS, Tailwind Animate
- **Rich Text Editor:** React Quill
- **Icons:** React Icons
- **Hosting/Deployment:** Vercel
- **Cloud Storage:** Cloudinary for images

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/piv-blog.git
cd piv-blog
Install dependencies:
npm install
# or
yarn
# or
pnpm install

  \Project Structure
piv-blog/
│
├─ app/                    # Next.js App Router pages and layouts
│   ├─ dashboard/          # Admin dashboard pages
│   ├─ post/               # Post detail pages
│   └─ globals.css         # Global styles
│
├─ components/             # Reusable UI components
│   ├─ Header.jsx
│   ├─ Footer.jsx
│   ├─ DashSidebar.jsx
│   ├─ PostCard.jsx
│   └─ ...
│
├─ lib/                    # Database models & utilities
│   ├─ models/post.model.js
│   ├─ models/comment.model.js
│   └─ mongodb/mongoose.js
│
├─ pages/api/              # API routes
│   ├─ post/
│   │   ├─ create.js
│   │   ├─ update.js
│   │   ├─ delete.js
│   │   └─ get.js
│   └─ upload.js           # Cloudinary file upload
│
├─ public/                 # Static assets
│
├─ package.json
└─ tailwind.config.js

Environment Variables
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key

Usage
Admin Actions

Sign in via Clerk

Navigate to /dashboard

Create a new post using Title, Category, Image Upload, and Content

Edit or delete existing posts

Moderate comments

User Actions

Sign up or sign in

Browse posts on the homepage

Read full posts

Add comments on any post

Deployment

The recommended deployment platform is Vercel:

Push your repository to GitHub.

Import the project on Vercel
