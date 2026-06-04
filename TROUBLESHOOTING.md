# Troubleshooting Guide - TrailhoundVet

## Preview Blocking Issues

### Problem: "Blocked request. This host is not allowed"

Ketika preview di v0 menampilkan error:
```
Blocked request. This host ("sb-xxxxx.vercel.run") is not allowed.
To allow this host, add "sb-xxxxx.vercel.run" to `server.allowedHosts` in vite.config.js.
```

### Root Cause

Vite dev server memiliki security check yang memblokir request dari host yang tidak terdaftar. Error ini terjadi karena:

1. **Host Binding Issue** - Dev server hanya listen pada `localhost` atau IPv6 (`::`)
2. **Preview Domain Mismatch** - Preview v0 mengakses dari domain berbeda
3. **HMR (Hot Module Reload) Blocking** - Vite HMR mencoba connect ke host yang salah

### Solutions Applied

✅ **1. Changed Host Binding**
```typescript
// vite.config.ts
server: {
  host: "0.0.0.0",  // Listen pada semua interface, bukan hanya localhost
  allowedHosts: "all",  // Accept requests dari semua domain
  hmr: false,  // Disable HMR untuk menghindari blocking
}
```

✅ **2. Updated Server Configuration**
- Set `allowedHosts: "all"` untuk accept request dari any domain
- Disabled HMR dengan `hmr: false` untuk prevent connection issues
- Express server punya CORS enabled untuk cross-origin requests

### How to Fix (If Still Seeing Error)

**Option 1: Hard Refresh Preview**
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Option 2: Clear Browser Cache & Reopen**
1. Close preview panel di v0
2. Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
3. Buka preview lagi

**Option 3: Check Dev Server Status**
```bash
# Verify dev server is running
ps aux | grep vite

# Test API endpoint
curl http://localhost:8080/api/articles

# Check vite config
cat vite.config.ts
```

## 404: NOT_FOUND Error

### Problem
Preview menampilkan:
```
404: NOT_FOUND
Code: NOT_FOUND
ID: sin1:sin1::xxxxx
```

### Root Cause
Error ini biasanya dari Vercel CDN edge, bukan dari dev server. Kemungkinan:
1. Preview using cached/stale version
2. Dev server tidak running
3. Request routing issue

### Solutions

**Check 1: Verify Dev Server Running**
```bash
lsof -i :8080  # Check port 8080
curl -s http://localhost:8080/api/articles | jq '.data | length'
```

**Check 2: Hard Refresh & Clear Cache**
- Hard refresh preview (Cmd+Shift+R)
- Or close & reopen preview tab

**Check 3: Restart Dev Server**
```bash
pkill -9 vite
cd /vercel/share/v0-project
npm run dev
```

## API Not Returning Data

### Problem
API endpoint returns empty data atau error

### Check Steps

**1. Verify Supabase Connection**
```bash
# Check environment variables are loaded
env | grep SUPABASE

# Test Supabase client
curl -s http://localhost:8080/api/articles | jq .
```

**2. Check Database Tables**
- Login ke Supabase console
- Verify tables exist: `articles`, `products`, `courses`
- Verify data exists in tables
- Check Row Level Security (RLS) policies allow public SELECT

**3. Check Server Logs**
```bash
tail -f /tmp/dev.log
```

## CORS Issues

### Problem
"Access to XMLHttpRequest blocked by CORS policy"

### Solution
CORS is already enabled in `server/index.ts`:
```typescript
app.use(cors());
```

If still having issues:
1. Verify Express server has `cors()` middleware
2. Check browser console for exact error
3. Restart dev server

## How to Verify Everything is Working

```bash
# 1. Check dev server
curl -s http://localhost:8080/ | grep -o "<!DOCTYPE\|<html" 

# 2. Check articles API
curl -s http://localhost:8080/api/articles | jq '.data | length'

# 3. Check products API
curl -s http://localhost:8080/api/products | jq '.data | length'

# 4. Check courses API
curl -s http://localhost:8080/api/courses | jq '.data | length'
```

Expected output: `3` for articles, `3` for products, `3` for courses

## Preview Still Not Working?

Jika semua steps di atas sudah dilakukan dan preview masih tidak berfungsi:

1. **Force Restart Everything**
```bash
pkill -9 vite
cd /vercel/share/v0-project
npm install
npm run dev
```

2. **Check v0 Settings**
- Verify Supabase integration is connected
- Check environment variables in v0 settings
- Verify port 8080 is accessible

3. **Contact Support**
- Check dev server logs: `tail -100 /tmp/dev.log`
- Verify Supabase project is active and accessible
- Check network connectivity to Supabase

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Check linting/formatting
npm run lint
```

## Database Schema

Current database tables:
- **articles** - Field notes and blog posts
- **products** - Shop products (books, kits, gear)
- **courses** - Basecamp courses and training programs
- **podcasts** - Podcast episodes (optional)
- **marketing_content** - Reusable marketing content

To view/modify schema, login to Supabase console and navigate to "SQL Editor" or "Tables".
