# 🔐 First-Time Login Flow - OTP via Email

## ✅ How It Works

### **First Time on New Device:**
1. User enters email address
2. System detects it's a new device
3. **OTP is automatically sent to user's email** 📧
4. User checks email and enters OTP
5. User enters password
6. Login successful → Device is marked as trusted

### **Next Time on Same Device:**
1. User enters email address
2. System detects it's a trusted device
3. User enters password directly (no OTP needed)
4. Login successful

---

## 📧 Email OTP Setup Required

The system is **already configured** to send OTP via email, but you need to set up EmailJS first.

### Quick Setup (5 minutes):

1. **Create EmailJS Account:**
   - Go to: https://www.emailjs.com/
   - Sign up (free)

2. **Get Your Credentials:**
   - **Public Key:** Account → General → Public Key
   - **Service ID:** Email Services → Your Service → Service ID
   - **Template ID:** Email Templates → Your Template → Template ID

3. **Update Config File:**
   - Open: `src/config/emailjs.config.js`
   - Replace the three values:
   ```javascript
   export const emailjsConfig = {
     publicKey: 'YOUR_PUBLIC_KEY',      // ← Paste here
     serviceId: 'YOUR_SERVICE_ID',      // ← Paste here
     templateId: 'YOUR_TEMPLATE_ID',    // ← Paste here
     enabled: true
   };
   ```

4. **Test:**
   - Refresh browser
   - Try login on a new device
   - OTP will be sent to email! ✅

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────┐
│  User Enters Email                               │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
        ┌─────────────────────┐
        │  Is Device Trusted?  │
        └─────┬───────────┬───┘
              │           │
         NO   │           │  YES
              │           │
              ▼           ▼
    ┌─────────────┐  ┌──────────────┐
    │  NEW DEVICE │  │ TRUSTED DEVICE│
    └──────┬──────┘  └──────┬───────┘
           │                │
           │                │
           ▼                ▼
    ┌──────────────┐  ┌──────────────┐
    │ Send OTP via │  │ Enter Password│
    │    Email     │  │   Directly    │
    └──────┬───────┘  └──────┬───────┘
           │                 │
           ▼                 │
    ┌──────────────┐         │
    │ User Enters  │         │
    │     OTP      │         │
    └──────┬───────┘         │
           │                 │
           ▼                 │
    ┌──────────────┐         │
    │ Enter Password│         │
    └──────┬───────┘         │
           │                 │
           └────────┬────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Login Success │
            │ Device Trusted│
            └───────────────┘
```

---

## ✅ Current Status

**What's Working:**
- ✅ Device detection (new vs trusted)
- ✅ OTP generation
- ✅ Email sending code (EmailJS integrated)
- ✅ OTP verification
- ✅ Device trust system
- ✅ Password login after OTP

**What You Need to Do:**
- ⚙️ Configure EmailJS (5 minutes)
- ⚙️ Add credentials to `emailjs.config.js`

---

## 📝 Step-by-Step: Configure EmailJS

### Step 1: Create Email Service
1. Go to EmailJS → Email Services
2. Click "Add New Service"
3. Choose Gmail (or your email)
4. Connect account
5. Copy **Service ID**

### Step 2: Create Email Template
1. Go to Email Templates
2. Click "Create New Template"
3. Set:
   - **Subject:** `Your Login OTP Code - BI Dashboard Portal`
   - **Content:** 
     ```html
     <h2>Your Login OTP Code</h2>
     <p>Your OTP code is: <strong>{{otp}}</strong></p>
     <p>This code expires in 10 minutes.</p>
     ```
   - **To Email:** `{{to_email}}`
4. Save and copy **Template ID**

### Step 3: Get Public Key
1. Go to Account → General
2. Find "Public Key"
3. Copy it

### Step 4: Update Config
1. Open `src/config/emailjs.config.js`
2. Paste all three values
3. Save

### Step 5: Test
1. Refresh browser
2. Clear browser data (to simulate new device)
3. Enter email
4. Click "Send OTP"
5. **Check your email!** 📧

---

## 🎯 Expected Behavior

### First-Time Login (New Device):
1. Enter email → Click "Send OTP"
2. **OTP sent to email** (not shown on screen)
3. Check email inbox
4. Enter OTP from email
5. Enter password
6. Login successful

### Subsequent Logins (Trusted Device):
1. Enter email
2. System recognizes trusted device
3. Enter password directly
4. Login successful (no OTP needed)

---

## 🔍 Troubleshooting

### OTP Still Shows on Screen?
- ✅ Check EmailJS is configured
- ✅ Verify all three values in config file
- ✅ Check browser console for errors (F12)

### Email Not Received?
- ✅ Check spam/junk folder
- ✅ Verify email address is correct
- ✅ Check EmailJS dashboard for sent emails
- ✅ Verify email service is connected

### "EmailJS not configured" Message?
- Make sure you replaced ALL three values
- Don't leave `YOUR_PUBLIC_KEY_HERE` as-is

---

## ✅ Checklist

- [ ] EmailJS account created
- [ ] Email service connected
- [ ] Service ID copied
- [ ] Email template created
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] Config file updated with all three values
- [ ] Browser refreshed
- [ ] Tested - OTP received via email ✅

---

## 🎉 Once Configured

**First-time login on any new device:**
- ✅ OTP automatically sent to email
- ✅ User checks email for OTP
- ✅ No OTP shown on screen
- ✅ Secure and professional

**Next time on same device:**
- ✅ Direct password login
- ✅ No OTP needed
- ✅ Fast and convenient

---

## 📚 More Help

See `EMAILJS_SETUP_GUIDE.md` for detailed setup instructions with screenshots.



