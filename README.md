# BI Dashboard Portal

A modern web application for managing and viewing BI dashboards with role-based access control and Firebase email/password authentication.

## Features

- 🔐 **Firebase Email/Password Authentication** - Secure email and password login
- 🔑 **Password Reset** - Reset password via email with OTP verification
- 👥 **Role-Based Access Control** - Different users see different reports
  - Team Head → sees ALL reports
  - Sales Department → sees ONLY Sales reports
- ⚙️ **Dynamic Report Management** - Add/remove reports without code changes
- 📊 **Dashboard Display** - View reports in iframe or external links
- 💾 **Configuration Export/Import** - Backup and restore report configurations

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Email/Password Authentication:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" provider
   - Enable "Email link (passwordless sign-in)" if desired (optional)
4. Get your Firebase configuration
5. Update `src/firebase/config.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Configure Users

Edit `src/config/users.json` to add your users:

```json
{
  "users": {
    "john@example.com": {
      "email": "john@example.com",
      "role": "team-head",
      "name": "John Doe"
    },
    "jane@example.com": {
      "email": "jane@example.com",
      "role": "sales",
      "name": "Jane Smith"
    }
  }
}
```

**Important Notes:**
- Users must be created in Firebase Authentication first (via Firebase Console or sign-up)
- Email addresses in `users.json` must match Firebase Authentication emails
- **Roles:**
  - `team-head` - Can see all reports and manage them
  - `sales` - Can only see reports with "sales" in allowedRoles

### 4. Configure Reports

Edit `src/config/reports.json` to add your BI dashboards:

```json
{
  "reports": [
    {
      "id": "sales-report",
      "title": "Sales Report",
      "description": "Comprehensive sales analytics",
      "url": "https://example.com/sales-dashboard",
      "iframe": true,
      "allowedRoles": ["team-head", "sales"],
      "icon": "📊",
      "category": "Sales"
    }
  ]
}
```

### 5. Run the Application

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Usage

### Login
1. Enter your email address (must match an email in `users.json` and Firebase)
2. Enter your password
3. You'll be redirected to the dashboard based on your role

### Password Reset
1. Click "Forgot Password?" on the login page
2. Enter your email address
3. Check your email for password reset instructions (OTP will be sent to email)
4. Follow the link in the email to reset your password

### Managing Reports (Team Head Only)
1. Click the Settings icon in the header
2. Click "Add New Report" to add a dashboard
3. Fill in the report details:
   - Title, Description, URL
   - Select allowed roles
   - Choose iframe or external link
4. Click "Add Report"
5. To remove a report, click the trash icon

### Export/Import Configuration
- **Export**: Click "Export Config" to download your reports configuration
- **Import**: Click "Import Config" and select a JSON file to restore reports

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Login.jsx          # OTP login component
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── ReportCard.jsx     # Individual report card
│   │   └── ReportManager.jsx  # Report management (Team Head)
│   ├── config/
│   │   ├── reports.json       # Report configurations
│   │   └── users.json         # User roles and info
│   ├── firebase/
│   │   └── config.js          # Firebase configuration
│   ├── utils/
│   │   ├── auth.js            # Authentication utilities
│   │   └── roles.js           # Role-based access utilities
│   ├── App.jsx                # Main app component
│   ├── App.css                # Styles
│   └── main.jsx               # Entry point
├── package.json
└── vite.config.js
```

## Important Notes

- **No Code Changes Required**: Reports are managed through the UI and stored in localStorage. For production, consider using a backend API or database.
- **Phone Number Format**: Use international format with country code (e.g., +1234567890)
- **Firebase Quota**: Free tier has limits on phone authentication. For production, consider upgrading.
- **Security**: In production, move user management to a secure backend instead of JSON files.

## Power BI Integration

The application is configured to work with Power BI reports. Your Power BI link has been added to the Sales Report.

**Important Notes for Power BI:**
- Power BI reports are embedded using iframes
- Ensure your Power BI report has "Public" sharing enabled for iframe embedding
- If the report doesn't load, check Power BI sharing settings:
  1. Go to your Power BI report
  2. Click "Share" → "Embed report"
  3. Ensure "Allow embedding" is enabled
  4. Copy the embed URL if needed

**Adding More Power BI Reports:**
1. Get your Power BI report URL (format: `https://app.powerbi.com/view?r=...`)
2. As Team Head, click Settings → Add New Report
3. Paste the Power BI URL
4. Set `iframe: true`
5. Select allowed roles
6. Save

## Customization

- **Styling**: Edit `src/App.css` for custom colors and layouts
- **Roles**: Add new roles in `ReportManager.jsx` and update `users.json`
- **Report Types**: Modify `ReportCard.jsx` to support different report display types

## License

MIT
