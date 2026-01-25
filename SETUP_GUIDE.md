# 🚀 Quick Start Guide - How to Run & Login

## Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (React, Firebase, etc.)

## Step 2: Configure Firebase (Required for OTP Login)

### Option A: Full Firebase Setup (Recommended for Production)

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Create a New Project** (or use existing)
   - Click "Add Project"
   - Enter project name
   - Follow the setup wizard
3. **Enable Phone Authentication**:
   - Go to **Authentication** → **Sign-in method**
   - Click on **Phone** provider
   - Enable it and save
4. **Get Your Firebase Config**:
   - Go to **Project Settings** (gear icon)
   - Scroll to "Your apps" section
   - Click on **Web** icon (`</>`)
   - Copy the `firebaseConfig` object
5. **Update `src/firebase/config.js`**:
   - Replace the placeholder values with your actual Firebase config

### Option B: Demo Mode (For Testing Without Firebase)

If you want to test the UI without setting up Firebase first, I can add a demo mode. Let me know!

## Step 3: Configure Users

Edit `src/config/users.json` and add your phone numbers:

```json
{
  "users": {
    "+1234567890": {
      "phone": "+1234567890",
      "role": "team-head",
      "name": "Your Name",
      "email": "your@email.com"
    },
    "+1987654321": {
      "phone": "+1987654321",
      "role": "sales",
      "name": "Sales Person",
      "email": "sales@email.com"
    }
  }
}
```

**Important**: 
- Use international format: `+` followed by country code and number
- Example: `+1234567890` (US), `+919876543210` (India)

## Step 4: Run the Application

```bash
npm run dev
```

The website will open automatically at: **http://localhost:3000**

If it doesn't open automatically, manually visit: `http://localhost:3000`

## Step 5: How to Login

### Login Process:

1. **Enter Phone Number**:
   - On the login page, enter your phone number
   - Must match a number in `users.json`
   - Format: `+1234567890` (with country code)

2. **Click "Send OTP"**:
   - Firebase will send an OTP to your phone
   - You'll receive a 6-digit code via SMS

3. **Enter OTP**:
   - Enter the 6-digit code you received
   - Click "Verify OTP"

4. **Access Dashboard**:
   - After successful login, you'll see the dashboard
   - Reports visible depend on your role:
     - **Team Head** → All reports
     - **Sales** → Only Sales reports

## Troubleshooting

### Firebase Not Working?
- Make sure Phone Authentication is enabled in Firebase Console
- Check that your Firebase config is correct
- Verify your phone number format (must include country code)

### OTP Not Received?
- Check your phone number is correct
- Verify Firebase Phone Auth is enabled
- Check browser console for errors (F12)

### Can't See Reports?
- Check your role in `users.json`
- Team Head sees all reports
- Sales only sees reports with "sales" in allowedRoles

## Testing with Sample Users

The default `users.json` includes:
- **+1234567890** → Team Head (sees all reports)
- **+1987654321** → Sales (sees only Sales reports)

**Note**: These are example numbers. Replace with real phone numbers for actual OTP testing.

## Next Steps

- Add more users in `users.json`
- Add more reports via the UI (Team Head only)
- Customize reports in `src/config/reports.json`
