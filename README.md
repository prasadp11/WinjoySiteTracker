# SiteTrack - Daily Site Trip & Travel Expense Mobile Application

A mobile-first application designed for engineers, field executives, and site representatives to record daily site visits, automatically compute road travel distances, calculate travel reimbursement expenses in Rupees per kilometer, maintain monthly logs, generate formatted Excel spreadsheets, and dispatch claims to selected email addresses.

---

## Key Features

1. **Daily Start & End Point Logging**:
   - Auto-complete location search powered by OpenStreetMap Nominatim.
   - 1-tap **GPS Current Location** detection.
   - Pre-fills your default home or base office address.
   - Quick chips for recently visited sites.

2. **Automatic Route & Distance Calculation**:
   - Driving distance calculation via OSRM (Open Source Routing Machine).
   - Smart fallback with road-factor curvature calculation.
   - **Round Trip (2-Way)** toggle: Automatically calculates return travel ($2 \times$ distance).
   - Manual distance override option for exact odometer matching.

3. **Travel Expense Engine (₹ / km)**:
   - Configurable default rate in Settings (e.g. ₹12/km for car, ₹5/km for bike).
   - Automatically calculates daily reimbursement:
     $$\text{Daily Expense} = (\text{Total Distance in km} \times \text{Rate per km}) + \text{Tolls/Parking}$$
   - Live visual cost calculator in the entry modal.

4. **Monthly Dashboard & Daily History**:
   - Monthly summary card: Total Site Trips, Total Kilometers, Average Distance, and Total Reimbursement Amount.
   - Itemized daily trip log cards with date stamps, day-of-week badges, route arrows, and edit/delete capabilities.
   - Month picker to switch between different months.

5. **Professional Excel (.xlsx) Generation**:
   - Generates an itemized Excel workbook formatted with:
     - Employee Name, Designation, Company, Vehicle Details.
     - Table columns: `S.No.`, `Date`, `Day`, `Start Location`, `Site/Destination`, `Trip Type`, `Distance (km)`, `Rate (₹/km)`, `Fuel Amount (₹)`, `Tolls (₹)`, `Total Expense (₹)`, `Purpose & Remarks`.
     - Automated formula summary row for totals.
     - Official declaration and signature blocks for submission and supervisor approval.

6. **Email & Mobile Dispatch**:
   - **Send to Selected Email**: Automatically dispatches the generated `.xlsx` file as an email attachment to any recipient email (e.g., `accounts@company.com`).
   - **Download Excel**: 1-click download directly to your mobile phone or computer.
   - **Mobile Share**: Native Web Share API integration to send claims directly through WhatsApp, Gmail, Outlook, or Drive.
   - Custom SMTP settings support (e.g. Gmail App Passwords, Office 365, or company mail servers).

---

## How to Run the Application

### 1. Start the API Server (Email & Archival Service)
Open a terminal in `site-trip-tracker`:
```bash
cmd.exe /c npm run server
```
*Server runs on port 5001.*

### 2. Start the Mobile Web Client
In another terminal:
```bash
cmd.exe /c npm run dev
```
*App will start at `http://localhost:5173`.*

### 3. Open on Your Mobile Phone
Because `host: true` is enabled in `vite.config.ts`, you can open the app on your smartphone browser by visiting your computer's local Wi-Fi IP address (e.g. `http://192.168.1.XX:5173`).
To install it as an app on your phone:
- **Android**: Tap the Chrome menu (⋮) $\rightarrow$ **"Add to Home screen"** / **"Install app"**.
- **iPhone / iOS**: Tap the Share icon $\rightarrow$ **"Add to Home Screen"**.

---

## Project Structure

```
site-trip-tracker/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
├── server/
│   └── index.js              # Express backend with Nodemailer & report archiving
├── exported_reports/         # Local copies of all generated Excel claims
├── src/
│   ├── main.tsx
│   ├── index.css             # Mobile viewport & responsive styling
│   ├── App.tsx               # Root app controller
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces (TripEntry, UserSettings, etc.)
│   ├── services/
│   │   ├── distanceService.ts# Geocoding & OSRM driving distance routing
│   │   ├── excelService.ts   # SheetJS (.xlsx) generation & styling
│   │   ├── emailService.ts   # Client-side email dispatch & mobile share
│   │   └── storageService.ts # LocalStorage persistence & sample data
│   └── components/
│       ├── MobileHeader.tsx  # Header with month selector & quick action
│       ├── BottomNav.tsx     # Navigation bar (Daily Log, Monthly, Export, Settings)
│       ├── TripFormModal.tsx # Daily site trip entry form with distance & rate calculator
│       ├── MonthlyDashboard.tsx# Monthly KPI overview & daily trip list
│       ├── ExportEmailModal.tsx# Excel download & email dispatch
│       └── SettingsView.tsx  # User profile, vehicle rates, default start, and SMTP
```
