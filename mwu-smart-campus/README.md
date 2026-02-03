# MWU Smart Campus Navigator (Web Version)

 This is a modern web application for Madda Walabu University navigation, converted from the React Native concepts. It acts as a mono-repo containing both the Backend (Laravel) and Frontend (Next.js) codebases.

 ## Project Structure
 - `/backend`: Laravel 10/11 API with OSRM Proxy, Campus Data, and Admin features.
 - `/frontend`: Next.js 14 (App Router), Tailwind CSS, Leaflet Maps.

 ---

 ## 🚀 Getting Started

 ### 1. Backend Setup (Laravel)

 **Requirements:** PHP 8.1+, Composer, MySQL/PostgreSQL.

 1.  Navigate to the backend folder:
     ```bash
     cd backend
     ```
 2.  Install dependencies:
     ```bash
     composer install
     ```
 3.  Setup Environment:
     ```bash
     cp .env.example .env
     php artisan key:generate
     ```
 4.  Configure Database in `.env`:
     ```ini
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=mwu_smart_campus
     DB_USERNAME=root
     DB_PASSWORD=
     
     # OSRM Configuration (Default is public server)
     OSRM_BASE_URL=http://router.project-osrm.org
     ```
 5.  Run Migrations & Seeders:
     ```bash
     php artisan migrate --seed
     ```
 6.  Serve the API:
     ```bash
     php artisan serve
     ```
     (Runs on `http://localhost:8000`)

 ### 2. Frontend Setup (Next.js)

 **Requirements:** Node.js 18+.

 1.  Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
 2.  Install dependencies:
     ```bash
     npm install
     ```
 3.  Setup Environment:
     ```bash
     cp .env.local.example .env.local
     ```
     Ensure `NEXT_PUBLIC_API_URL=http://localhost:8000/api` matches your Laravel URL.

 4.  Run Development Server:
     ```bash
     npm run dev
     ```
     (Runs on `http://localhost:3000`)
