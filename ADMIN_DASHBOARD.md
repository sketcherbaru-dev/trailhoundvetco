# Admin Dashboard - Trailhound Vet CMS

## 📊 Overview

A complete admin dashboard has been created to manage all content on the Trailhound Vet website. Admin can create, read, update, and delete content for Articles, Products, Courses, and Podcasts.

## 🚀 How to Access

1. **Navigate to**: `http://localhost:8080/admin` (or `/admin` on production)
2. **Login Credentials**:
   - Password: `admin123` (change this in production!)
3. Once logged in, you'll see the admin dashboard with 4 tabs

## 📋 Features

### 1. Articles Management (Field Notes)
- **Create**: Add new veterinary first aid articles
- **Fields**:
  - Title
  - Excerpt (short summary)
  - Content (full article)
  - Category (PHYSIOLOGY, INJURY, NUTRITION, TRAINING)
  - Author name
  - Thumbnail URL
  - Image URL
  - Date published
  - Read time (e.g., "5 min read")
  - Featured (checkbox)
- **Actions**: Edit, Delete

### 2. Products Management (Shop)
- **Create**: Add new products with external links
- **Fields**:
  - Product Name
  - Description
  - Price
  - Image URL
  - Category (books, gear, supplies, tools)
  - Badge (e.g., "PRE-ORDER", optional)
  - External Link (for products sold elsewhere)
  - Stripe Product ID (for payment integration, optional)
  - Featured (checkbox)
- **Actions**: Edit, Delete

### 3. Courses Management (Basecamp)
- **Create**: Add new training courses
- **Fields**:
  - Course Title
  - Description
  - Level (Beginner, Intermediate, Advanced)
  - Format (In-Person, Online, Hybrid)
  - Thumbnail URL
  - Category (pet-owner, working-dog, first-responder, veterinary)
  - Curriculum (course topics, optional)
  - Stripe Product ID (for payment, optional)
  - Featured (checkbox)
- **Actions**: Edit, Delete

### 4. Podcasts Management
- **Create**: Add new podcast episodes
- **Fields**:
  - Episode Title
  - Description
  - Episode Number
  - Published Date
  - Audio URL (link to MP3 file)
  - Cover Image URL (optional)
  - Transcript (optional)
- **Actions**: Edit, Delete

## 🔐 Security

### Current Implementation
- Simple password authentication (localStorage-based)
- Uses Supabase service role key for admin operations
- Session stored in browser localStorage

### ⚠️ Production Recommendations
1. **Change the default password** in `client/pages/AdminDashboard.tsx`
2. **Implement proper authentication**:
   - Use Supabase auth
   - Or JWT tokens
   - Or OAuth (Google, GitHub)
3. **Add role-based access control (RBAC)**
4. **Implement audit logging** for content changes
5. **Add permissions system** for multiple admins with different roles

## 🔧 API Endpoints

All admin operations go through these backend API routes:

### Articles
- `POST /api/admin/articles` - Create article
- `PUT /api/admin/articles/:id` - Update article
- `DELETE /api/admin/articles/:id` - Delete article

### Products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Courses
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

### Podcasts
- `POST /api/admin/podcasts` - Create podcast
- `PUT /api/admin/podcasts/:id` - Update podcast
- `DELETE /api/admin/podcasts/:id` - Delete podcast

## 📁 File Structure

### Frontend Components
- `client/pages/AdminDashboard.tsx` - Main dashboard page with login
- `client/components/admin/AdminArticles.tsx` - Articles management
- `client/components/admin/AdminProducts.tsx` - Products management
- `client/components/admin/AdminCourses.tsx` - Courses management
- `client/components/admin/AdminPodcasts.tsx` - Podcasts management

### Backend Routes
- `server/routes/admin-articles.ts` - Article CRUD operations
- `server/routes/admin-products.ts` - Product CRUD operations
- `server/routes/admin-courses.ts` - Course CRUD operations
- `server/routes/admin-podcasts.ts` - Podcast CRUD operations

## 🎨 UI Components Used

- **Tabs** - Navigate between different content types
- **Dialog** - Create/Edit forms in modal
- **Table** - Display list of content
- **Button** - Action triggers
- **Input** - Text fields
- **Textarea** - Long-form text
- **Select** - Dropdown options
- **Checkbox** - Toggle featured status

## ✨ Next Steps

### Phase 2: Advanced Features
1. **User Roles** - Admin, Editor, Viewer
2. **Stripe Integration** - Process payments for courses/products
3. **Image Upload** - Upload images directly instead of URLs
4. **Draft & Publish** - Save drafts before publishing
5. **Content History** - View change history
6. **Bulk Operations** - Import/export content

### Phase 3: Dashboard Enhancements
1. **Analytics** - View traffic, popular content
2. **User Management** - Add/remove admin users
3. **Settings** - Configure site settings
4. **Content Calendar** - Schedule publications

## 💡 Usage Tips

1. **Featured Content**: Mark items as featured to display on homepage
2. **Categories**: Use consistent category names for filtering
3. **URLs**: Always use full URLs for images (https://...)
4. **Dates**: Use YYYY-MM-DD format
5. **External Links**: Products can link to external stores (Ruffwear, etc.)

## 🐛 Troubleshooting

### Admin page won't load
- Check if dev server is running (`pnpm dev`)
- Clear browser cache
- Check console for errors

### Can't save data
- Verify Supabase credentials in `.env.local`
- Check Supabase database tables exist
- Check browser console for error messages

### Changes not appearing
- Refresh the page
- Check network tab in browser dev tools
- Verify data in Supabase dashboard

## 📞 Support

For issues or feature requests related to the admin dashboard, check:
1. Browser console (F12 → Console tab)
2. Network requests (F12 → Network tab)
3. Supabase dashboard for data verification
