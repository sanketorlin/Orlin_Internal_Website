# How to Set User Access & Dashboard Permissions

## Quick Answer

**After adding a user in Firebase, you need to add them to `src/config/users.json` with a role.**

The **role** determines which dashboards/reports they can see.

---

## Step-by-Step Process

### Step 1: Add User in Firebase
1. Go to Firebase Console → Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Click "Add user"

### Step 2: Add User to users.json (THIS IS WHERE YOU SET ACCESS!)

1. Open: `src/config/users.json`

2. Add the user with a role:

```json
{
  "users": {
    "user-email@gmail.com": {
      "email": "user-email@gmail.com",
      "role": "sales",
      "name": "User Name"
    }
  }
}
```

3. **The `role` field determines which dashboards they see!**

---

## Role System & Dashboard Access

### Available Roles:

| Role | What They Can See | Permissions |
|------|------------------|-------------|
| **`team-head`** | **ALL dashboards** | Full access, can manage reports |
| `sales` | Only Sales reports | Limited access |
| `finance` | Only Finance reports | Limited access |
| `hr` | Only HR reports | Limited access |
| `marketing` | Only Marketing reports | Limited access |

### How It Works:

1. **Reports have `allowedRoles`** in `src/config/reports.json`
2. **Users have a `role`** in `src/config/users.json`
3. **System matches them** - user only sees reports where their role is in `allowedRoles`

---

## Example: Setting Up Different Users

### Example 1: Sales Manager (Sales Reports Only)

**In Firebase:** Add user `sales@company.com`

**In users.json:**
```json
{
  "users": {
    "sales@company.com": {
      "email": "sales@company.com",
      "role": "sales",
      "name": "Sales Manager"
    }
  }
}
```

**Result:** They will ONLY see reports with `"allowedRoles": ["sales"]` or `["team-head", "sales"]`

---

### Example 2: Finance Director (Finance Reports Only)

**In Firebase:** Add user `finance@company.com`

**In users.json:**
```json
{
  "users": {
    "finance@company.com": {
      "email": "finance@company.com",
      "role": "finance",
      "name": "Finance Director"
    }
  }
}
```

**Result:** They will ONLY see reports with `"allowedRoles": ["finance"]` or `["team-head", "finance"]`

---

### Example 3: Super Admin (All Reports)

**In Firebase:** Add user `admin@company.com`

**In users.json:**
```json
{
  "users": {
    "admin@company.com": {
      "email": "admin@company.com",
      "role": "team-head",
      "name": "Super Admin"
    }
  }
}
```

**Result:** They will see ALL reports regardless of `allowedRoles`

---

## How Reports Are Filtered

### Report Configuration (reports.json):

```json
{
  "reports": [
    {
      "id": "sales-report",
      "title": "Sales Report",
      "allowedRoles": ["team-head", "sales"],  // ← This controls access
      ...
    },
    {
      "id": "finance-report",
      "title": "Finance Report",
      "allowedRoles": ["team-head"],  // ← Only team-head can see
      ...
    }
  ]
}
```

### Access Logic:

- **User with role `sales`** → Sees "Sales Report" (role is in allowedRoles)
- **User with role `sales`** → Does NOT see "Finance Report" (role not in allowedRoles)
- **User with role `team-head`** → Sees BOTH (team-head sees everything)

---

## Quick Reference

### To Give Full Access:
```json
"role": "team-head"
```

### To Give Limited Access:
```json
"role": "sales"     // or "finance", "hr", "marketing"
```

### To Control Which Reports They See:
Edit `src/config/reports.json` and set `allowedRoles` for each report.

---

## Summary

1. ✅ Add user in **Firebase** (authentication)
2. ✅ Add user in **users.json** with a **role** (access control)
3. ✅ Set report `allowedRoles` in **reports.json** (dashboard visibility)
4. ✅ User sees dashboards based on their role matching report allowedRoles

**The role in users.json is the key to controlling access!**

