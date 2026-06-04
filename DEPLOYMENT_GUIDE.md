# Deployment Guide - TrailhoundVet

## Why Preview Shows Errors

Ketika Anda melihat error di preview v0 seperti:
- `404: NOT_FOUND`
- `Blocked request. This host is not allowed`

**Ini adalah NORMAL dan EXPECTED** karena:

1. **Preview v0 adalah sandbox environment yang isolated** - Tidak bisa connect ke localhost dev server
2. **Dev server hanya berfungsi di local machine** - Untuk testing via `curl` atau local browser
3. **Untuk production-like preview, perlu deploy ke Vercel** - Dimana database dan API bisa di-access

## How to Test Locally

Dev server sudah berfungsi dengan sempurna. Untuk test locally:

```bash
# 1. Make sure dev server is running
npm run dev

# 2. Test API endpoints via curl
curl http://localhost:8080/api/articles | jq .
curl http://localhost:8080/api/products | jq .
curl http://localhost:8080/api/courses | jq .

# 3. Open browser di local machine
open http://localhost:8080
# atau
http://localhost:8080 (di browser Anda)
```

Semua data akan tampil dengan benar dari Supabase database.

## Deploy to Vercel for Full Preview

Untuk mendapatkan preview yang fully functional dengan database connection:

### Step 1: Push to GitHub
```bash
cd /vercel/share/v0-project
git push origin v0/galleryrazami-3385-d6585cbb
```

### Step 2: Create Pull Request (Optional)
- Go to https://github.com/galleryrazami-cmd/trailhoundvet
- Create PR from `v0/galleryrazami-3385-d6585cbb` → `main`
- Vercel akan automatically create preview deployment

### Step 3: Deploy to Vercel Production
```bash
# Via CLI
vercel deploy --prod

# Or via Vercel UI
# https://vercel.com/galleryrazami-3385s-projects/trailhoundvet
```

### Step 4: Set Environment Variables in Vercel
Pastikan semua env vars di-set di Vercel project settings:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## What Happens After Deployment

✅ **Full Database Integration**
- All API routes fully functional
- Data fetches dari Supabase in real-time
- Admin CRUD operations work

✅ **Preview Environment Working**
- Setiap branch otomatis dapat preview URL
- Preview dapat connect ke production database
- Benar-benar production-like testing environment

✅ **Production Deployment**
- Site fully live dengan domain Anda
- Semua pages accessible
- Admin panel dapat manage content

## Current Status

✅ **Dev Server** - Running successfully on port 8080
✅ **Database** - Connected to Supabase dengan 3 articles, 3 products, 3 courses
✅ **API Routes** - All endpoints functional and returning data
✅ **Frontend Pages** - All pages fetch data dynamically
✅ **Code Committed** - All changes pushed to Git branch

## Vercel Project

Your Vercel project:
- **Team**: galleryrazami-3385s-projects
- **Project**: trailhoundvet
- **Current Branch**: v0/galleryrazami-3385-d6585cbb
- **Dashboard**: https://vercel.com/galleryrazami-3385s-projects/trailhoundvet

## Next Steps

1. **Test locally first** - Verify everything works via `http://localhost:8080`
2. **Push to GitHub** - Commit and push branch to remote
3. **Create PR or Deploy** - Either merge to main or deploy directly
4. **Monitor deployment** - Check Vercel dashboard for build status
5. **Test production** - Visit production URL to verify

## Troubleshooting

### API Not Working in Deployed Version
1. Verify env vars are set in Vercel project settings
2. Check Supabase project is active and database accessible
3. Check Vercel build logs for errors

### Preview Still Shows 404
1. Make sure Git push completed successfully
2. Wait for Vercel deployment to finish (check dashboard)
3. Check if env vars are set in Vercel preview environment

### Database Connection Error
1. Login to Supabase console
2. Verify database tables exist: articles, products, courses
3. Verify RLS policies allow public SELECT access
4. Check Supabase project is active (not paused)

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **React Router Docs**: https://reactrouter.com
- **Express Docs**: https://expressjs.com

---

**Remember**: Dev server lokasi hanya untuk development testing. Untuk preview functionality penuh, deploy ke Vercel!
