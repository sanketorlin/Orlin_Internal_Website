# Add Your Email to users.json

## Quick Fix for Loading Issue

Your Gmail account logged in successfully, but you need to add it to `src/config/users.json`.

### Steps:

1. **Open the file:** `src/config/users.json`

2. **Add your Gmail account** (replace with your actual email):

```json
{
  "users": {
    "your-email@gmail.com": {
      "email": "your-email@gmail.com",
      "role": "team-head",
      "name": "Your Name"
    },
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

3. **Save the file**

4. **Refresh the website** (F5 or Ctrl+R)

5. **Login again** - it will work!

### Available Roles:

- `"team-head"` - Full access, can see all reports and manage them
- `"sales"` - Can see sales reports only
- `"finance"` - Can see finance reports only
- `"hr"` - Can see HR reports only
- `"marketing"` - Can see marketing reports only

### Example:

If your email is `sanke@gmail.com` and you want full access:

```json
{
  "users": {
    "sanke@gmail.com": {
      "email": "sanke@gmail.com",
      "role": "team-head",
      "name": "Sanke"
    }
  }
}
```

**Important:** The email in `users.json` must **exactly match** the email you used to create the Firebase user (case-sensitive).



