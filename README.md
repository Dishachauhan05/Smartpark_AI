# SmartPark AI 🚗

SmartPark AI is a QR-based smart parking management system built using Next.js, Supabase, and AI-powered analytics. It digitizes traditional parking registers by allowing visitors to self-register through QR codes while enabling security personnel to manage vehicle entries, exits, and parking insights efficiently.

## Problem Statement

Traditional parking systems rely on physical registers maintained by security guards. These registers can be misplaced, damaged, or difficult to search through when vehicle information is needed quickly.

SmartPark AI solves this problem by providing a digital parking management solution with real-time vehicle tracking and intelligent analytics.

## Features

### Vehicle Registration

* Register visitor information
* Store vehicle details
* Support for two-wheelers and four-wheelers
* Automatic entry timestamp recording

### QR-Based Self Registration

* Visitors scan a QR code
* Registration form opens instantly
* Information is stored directly in the database
* Eliminates manual register maintenance

### Vehicle Search

* Search by vehicle number
* View vehicle details
* View visitor information
* Quick access for security personnel

### Vehicle Exit Management

* Mark vehicles as exited
* Store exit timestamps
* Track active and exited vehicles

### Dashboard Analytics

* Total vehicles count
* Active vehicles count
* Exited vehicles count
* Today's visitor count

### AI Parking Insights

* Analyze parking activity
* Generate parking summaries
* Detect traffic trends
* Provide operational insights

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Next.js API Routes

### Database

* Supabase

### AI

* Google Gemini API

### Additional Libraries

* qrcode.react



### Clone Repository

```bash
git clone <repository-url>
cd smartpark-ai
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Future Enhancements

* OCR-based number plate recognition
* Local LLM integration using Ollama
* Visitor notification system
* Parking slot allocation
* Admin authentication
* Email and SMS alerts
* Real-time parking occupancy monitoring

## Impact

SmartPark AI eliminates dependency on physical parking registers, improves record management, enables faster vehicle lookup, and provides AI-driven insights to enhance parking operations.

## Author

Developed by Disha Chauhan
