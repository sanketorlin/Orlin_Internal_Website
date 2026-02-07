# 🔐 Device-Based Authentication Guide

## Overview

The application now supports **device-based authentication**:
- **First time on new device:** Email OTP verification → Password → Login
- **Subsequent logins on trusted device:** Password → Login

---

## How It Works

### 1. New Device Detection

When a user enters their email:
- System checks if the device is trusted (stored in Firestore)
- If device is **not trusted** → Shows OTP flow
- If device is **trusted** → Shows password flow directly

### 2. Device Fingerprinting

Each device gets a unique ID based on:
- Browser user agent
- Screen resolution
- Language settings
- Timezone
- Hardware info

This ID is stored in `localStorage` and Firestore.

### 3. Authentication Flow

#### **New Device Flow:**
1. User enters email
2. System detects new device → Shows "Send OTP" button
3. User clicks "Send OTP"
4. OTP is generated and stored in Firestore (expires in 10 minutes)
5. OTP is displayed in UI (for development) or sent via email (production)
6. User enters 6-digit OTP
7. OTP verified → User enters password
8. Password verified → Login successful → Device marked as trusted

#### **Trusted Device Flow:**
1. User enters email
2. System detects trusted device → Shows password field directly
3. User enters password
4. Login successful

---

## Files Modified

### New Files:
- `src/utils/deviceAuth.js` - Device detection and OTP management
- `src/utils/otpEmailService.js` - OTP email sending service

### Modified Files:
- `src/components/Login.jsx` - Updated login flow with OTP support
- `src/firebase/config.js` - Added Firestore export

---

## Firestore Collections

### `trusted-devices`
Stores trusted device information:
```
{
  email_deviceId: {
    email: "user@example.com",
    deviceId: "device_abc123",
    trustedAt: "2024-01-01T00:00:00Z",
    userAgent: "Mozilla/5.0...",
    lastUsed: "2024-01-01T00:00:00Z"
  }
}
```

### `login-otps`
Stores OTP codes for verification:
```
{
  email: {
    email: "user@example.com",
    otp: "123456",
    createdAt: "2024-01-01T00:00:00Z",
    expiresAt: "2024-01-01T00:10:00Z",
    used: false
  }
}
```

---

## Development vs Production

### Development Mode:
- OTP is displayed in the UI for easy testing
- No actual email sending required
- OTP shown in success message

### Production Mode:
- OTP should be sent via email service
- Use Firebase Cloud Functions or custom email service
- Remove OTP display from UI

---

## Setting Up Email OTP (Production)

### Option 1: Firebase Cloud Functions

Create a Cloud Function to send OTP emails:

```javascript
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendLoginOTP = functions.https.onCall(async (data, context) => {
  const { email, otp } = data;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });
  
  const mailOptions = {
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Your Login OTP Code',
    html: `
      <h2>Your Login OTP</h2>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
  return { success: true };
});
```

### Option 2: Custom Email Service

Use services like:
- SendGrid
- Mailgun
- AWS SES
- Resend

---

## Testing

### Test New Device Flow:
1. Clear browser data or use incognito mode
2. Enter email → Should show "Send OTP" button
3. Click "Send OTP" → OTP appears in UI
4. Enter OTP → Verify
5. Enter password → Login

### Test Trusted Device Flow:
1. After first login, logout
2. Login again with same email
3. Should show password field directly (no OTP)

---

## Security Considerations

1. **OTP Expiration:** OTPs expire after 10 minutes
2. **One-time Use:** Each OTP can only be used once
3. **Device Trust:** Devices are trusted after successful OTP + password login
4. **Device ID:** Stored in localStorage (can be cleared by user)

---

## Troubleshooting

### OTP Not Received:
- Check browser console for OTP (development mode)
- Verify Firestore `login-otps` collection
- Check OTP expiration time

### Device Not Trusted:
- Check Firestore `trusted-devices` collection
- Verify device ID in localStorage
- Clear localStorage and try again

### OTP Verification Fails:
- Check if OTP is expired (10 minutes)
- Verify OTP hasn't been used already
- Check Firestore for correct OTP value

---

## Future Enhancements

- [ ] Email OTP sending via Cloud Functions
- [ ] SMS OTP option
- [ ] Device management UI (view/revoke trusted devices)
- [ ] Remember device option (extend trust period)
- [ ] Multi-factor authentication (MFA)

---

## Notes

- Device trust is stored per email address
- Clearing browser data will reset device trust
- OTPs are automatically cleaned up after expiration
- Device fingerprinting is not 100% unique (can be improved)



