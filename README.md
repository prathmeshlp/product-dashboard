# 🛍️ Product Management Dashboard

### Senior Frontend Developer Assessment -- Aptech Solutions

------------------------------------------------------------------------

# 1️⃣ Project Overview

This project is a **Product Management Dashboard**, developed as part of
the Senior Frontend Developer assessment.

It is a production-ready admin panel for managing an e-commerce product
catalog. The application demonstrates:

-   Secure JWT-based authentication with automatic token refresh
-   Server-side pagination, search, filtering, and sorting
-   Full Product CRUD functionality
-   Cloudinary image uploads with validation and progress tracking
-   Responsive design (table → card layout for smaller screens)
-   Global error handling with toast notifications
-   Error boundaries for crash protection
-   Optimistic updates using TanStack Query
-   Strict TypeScript with zero `any` usage

------------------------------------------------------------------------

# 2️⃣ Tech Stack

## Core

-   React 18
-   TypeScript (Strict Mode Enabled)
-   Vite

## State Management

-   TanStack Query (React Query)
-   React Context API
-   React Hook Form

## UI & Styling

-   Tailwind CSS
-   ShadCN UI
-   Radix UI
-   Lucide Icons
-   Recharts

## Validation

-   Zod

## Networking

-   Axios
-   JWT Authentication with Refresh Flow

## File Upload

-   Cloudinary (Unsigned Upload Preset)

------------------------------------------------------------------------

# 3️⃣ Setup Instructions

## Clone Repository

``` bash
git clone https://github.com/prathmeshlp/product-dashboard
cd product-dashboard
```

## Install Dependencies

``` bash
npm install
```

## Setup Cloudinary

1.  Create account at https://cloudinary.com\
2.  Go to Dashboard → Settings → Upload\
3.  Create an **Unsigned Upload Preset**\
4.  Copy Cloud Name & Upload Preset

## Environment Variables

Create `.env`:

# 📦 Environment Variables Example

VITE_API_BASE_URL=https://dummyjson.com
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```
```

## Run Project

``` bash
npm run dev
```

------------------------------------------------------------------------

# 4️⃣ Architecture Decisions

## Folder Structure

    src/
    ├── components/
    ├── hooks/
    ├── services/
    ├── lib/
    ├── types/
    ├── context/
    └── pages/

### Rationale

-   Separation of concerns
-   Service layer abstraction
-   Reusable components
-   Scalable architecture

------------------------------------------------------------------------

# 5️⃣ Token Refresh Implementation

When a request returns **401 Unauthorized**:

1.  Pause failed request
2.  Call `/auth/refresh`
3.  If success → Update tokens → Retry original request
4.  If failure → Clear tokens → Redirect to login

This process runs silently without user interruption.

------------------------------------------------------------------------

# 6️⃣ Trade-offs

With more time:

-   Add unit & E2E tests
-   Improve accessibility audits
-   Add CSV export
-   Optimize bundle size
-   Improve skeleton loaders

------------------------------------------------------------------------

# 7️⃣ Screenshots / GIF

Add screenshots before submission:

``` markdown
Screenshots are attached in the mail.Please find attached mail. 
```

------------------------------------------------------------------------

# 🚀 Deployment

Deploy on **Vercel** or **Netlify**.

### Live Demo

https://product-dashboard-three-swart.vercel.app
------------------------------------------------------------------------



------------------------------------------------------------------------

## Author

Prathmesh Deepakrao Mulhar
Frontend Developer 
