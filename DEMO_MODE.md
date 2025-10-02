# Demo Mode - Using Hardcoded Values

This guide explains how to use the demo mode feature that allows you to run the application with hardcoded data when the backend is not available.

## Overview

The `USE_HARDCODED_VALUES` feature enables you to demonstrate a fully functional frontend and authentication system without requiring a live backend database. This is perfect for:

- **Demo presentations** to stakeholders
- **Development** when backend is unavailable
- **Testing** frontend functionality independently
- **Training** and onboarding new team members

## Quick Start

### 1. Enable Demo Mode

Add to your `.env` or `.env.local` file:

```bash
USE_HARDCODED_VALUES=true
```

### 2. Start the Application

```bash
npm run dev
```

### 3. Use the Application

- **Login** works normally through Clerk authentication
- All **data displayed** comes from `mock-data/routes.json`
- Navigate through all pages and features
- The UI behaves exactly as with a live backend

## What Works in Demo Mode

✅ **Authentication** - Login, logout, and session management (via Clerk)  
✅ **Viewing Data** - All lists, details, and content pages  
✅ **Navigation** - All routes and page transitions  
✅ **Search** - User and content search functionality  
✅ **Pagination** - Browse through pages of content  
✅ **UI Components** - All visual elements and interactions

## What Doesn't Work in Demo Mode

⚠️ **Creating Content** - New posts, comments, etc. (operations are skipped)  
⚠️ **Updating Data** - Profile edits, content modifications (operations are skipped)  
⚠️ **Deleting Content** - Remove posts or users (operations are skipped)  
⚠️ **File Uploads** - Image uploads may not persist

> **Note**: Write operations don't fail - they simply don't modify the mock data. This keeps the demo experience consistent.

## Demo Script for Presentations

Here's a suggested flow for demonstrating the application:

### Step 1: Introduction
"Today we're showcasing our Career Boost platform. The frontend and authentication are fully functional. We're using hardcoded data for non-auth features as the backend is still in development."

### Step 2: Authentication
1. Navigate to the login page
2. Log in with valid Clerk credentials
3. Show successful authentication and redirect

### Step 3: Browse Content
1. View the home page with job postings
2. Scroll through multiple posts
3. Click on a post to view details and comments

### Step 4: Search and Discovery
1. Use the search feature to find users
2. Show search results and user profiles
3. Demonstrate pagination if applicable

### Step 5: Navigation
1. Navigate between different sections (TNP, Student, Activity)
2. Show the responsive design
3. Demonstrate the overall user experience

### Step 6: Conclusion
"As you can see, the frontend is fully functional. Once the backend APIs are complete, we'll simply toggle `USE_HARDCODED_VALUES=false` to connect to real data."

## Customizing Demo Data

### Location
All demo data is stored in: `/mock-data/routes.json`

### Structure
```json
{
  "users": { /* User profiles */ },
  "threads": { /* Posts and content */ },
  "activity": { /* User activity */ },
  "usersList": [ /* All users */ ],
  "communities": { /* Community data */ },
  "userPosts": { /* User-specific posts */ }
}
```

### Editing Data
1. Open `mock-data/routes.json`
2. Edit the JSON data directly
3. Save the file
4. Restart the application
5. Changes appear immediately

### Tips for Better Demos
- Use realistic company names and job titles
- Add variety to posts (internships, jobs, events)
- Include diverse user profiles
- Keep data current (recent dates)
- Add engaging content descriptions

## Switching to Live Backend

### Method 1: Environment Variable
Change in `.env`:
```bash
USE_HARDCODED_VALUES=false
```

### Method 2: Remove Variable
Simply delete or comment out the line:
```bash
# USE_HARDCODED_VALUES=true
```

### Method 3: Production Default
In production, ensure the variable is not set or is set to `false`.

Then restart the application:
```bash
npm run dev
# or
npm run build && npm start
```

## Technical Details

### Implementation
- Mock data service: `lib/mock-data-service.ts`
- Data file: `mock-data/routes.json`
- Modified files:
  - `lib/actions/user.actions.ts`
  - `lib/actions/thread.actions.ts`
  - `lib/actions/community.actions.ts`

### How It Works
1. Each action function checks `USE_HARDCODED_VALUES`
2. If `true`, returns data from `routes.json`
3. If `false`, queries the database normally
4. Authentication always uses real Clerk APIs

### Performance
- Mock data is loaded once and cached in memory
- No database queries when in demo mode
- Faster response times for data operations
- Reduced external dependencies

## Troubleshooting

### Mock Data Not Loading
**Problem**: Data doesn't appear or shows errors  
**Solution**: 
- Check `mock-data/routes.json` exists
- Validate JSON syntax (use a JSON validator)
- Ensure file permissions are correct
- Check console logs for error messages

### Authentication Issues
**Problem**: Can't log in even in demo mode  
**Solution**: 
- Verify Clerk credentials in `.env`
- Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Ensure `CLERK_SECRET_KEY` is set
- Authentication uses real APIs, not mock data

### Data Doesn't Update
**Problem**: Made changes to `routes.json` but don't see them  
**Solution**: 
- Restart the dev server (`npm run dev`)
- Clear Next.js cache (`.next` folder)
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

### Wrong Data Displayed
**Problem**: Seeing incorrect or unexpected data  
**Solution**: 
- Verify user IDs match between sections in `routes.json`
- Check data structure matches expected format
- Compare with actual API response structures
- Ensure all required fields are present

## Maintenance

### When Backend Is Ready
1. Test all endpoints with `USE_HARDCODED_VALUES=false`
2. Compare responses with mock data structure
3. Update mock data to match real API responses (for future demos)
4. Keep mock data service for regression testing

### Keeping Mock Data Updated
- Periodically sync with API changes
- Update after major feature additions
- Maintain realistic, current data
- Document any custom data requirements

## Best Practices

1. **Always inform stakeholders** when using demo mode
2. **Keep mock data realistic** and professional
3. **Test both modes** regularly
4. **Document custom data** needs
5. **Update mock data** when API changes
6. **Use version control** for `routes.json`

## Support

For issues or questions:
1. Check this documentation
2. Review `mock-data/README.md`
3. Check console logs for errors
4. Verify environment variables
5. Contact the development team

---

**Remember**: Demo mode is a powerful tool for presentations and development, but always test with real APIs before production deployment!
