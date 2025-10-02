# Quick Start Guide - Demo Mode

Get CareerBoost up and running in demo mode in under 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file:
```bash
cp .env.example .env
```

### 3. Enable Demo Mode
Edit `.env` and set:
```bash
USE_HARDCODED_VALUES=true
```

### 4. Add Clerk Credentials (Required for Auth)
In `.env`, add your Clerk keys:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```
> Get these from [clerk.com](https://clerk.com) - Free tier available!

### 5. Start the Application
```bash
npm run dev
```

### 6. Open Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

## ✨ What You'll See

- **Home Page**: Marketing page with login button
- **After Login**: Dashboard with 5 mock job postings
- **Search**: Find mock users (4 users available)
- **Activity**: View mock activity feed
- **Thread Details**: View posts with comments

## 🎯 Demo Flow

### Simple Demo (5 minutes)
1. Show home page
2. Click "Login" → Authenticate with Clerk
3. View dashboard with job postings
4. Click on a posting to see details
5. Navigate to Search
6. Show user profiles

### Full Demo (10 minutes)
1. **Introduction** (1 min)
   - Explain the purpose of CareerBoost
   - Mention demo mode is active

2. **Authentication** (2 min)
   - Show login page
   - Log in with real credentials
   - Show successful authentication

3. **Browse Content** (3 min)
   - View TNP dashboard with posts
   - Click on internship opportunity
   - Show comment thread
   - Navigate to different posts

4. **Search Users** (2 min)
   - Go to search page
   - Search for users by name
   - Show user profiles
   - Demonstrate search functionality

5. **Activity Feed** (1 min)
   - Show activity notifications
   - Explain real-time updates (in production)

6. **Wrap Up** (1 min)
   - Explain backend integration coming soon
   - Show how easy it is to switch to real API

## 📝 Mock Data Available

### Users
- **john_doe** - TNP Officer
- **jane_smith** - Student
- **bob_wilson** - Student
- **alice_brown** - TNP Officer

### Posts (5 available)
1. Internship Opportunity at TechCorp
2. Full-Stack Developer Position
3. Career Fair Announcement
4. Resume Building Workshop
5. Mock Interview Sessions

### Activity
- Sample reply notifications
- Comment interactions

## 🔧 Common Tasks

### Add More Mock Users
Edit `mock-data/routes.json`, section `usersList`:
```json
{
  "_id": "mock_user_id_5",
  "id": "user_5",
  "username": "new_user",
  "name": "New User",
  "image": "https://img.clerk.com/preview.png",
  "role": "Student"
}
```

### Add More Posts
Edit `mock-data/routes.json`, section `threads.posts`:
```json
{
  "_id": "mock_thread_6",
  "text": "Your post content here",
  "author": { /* author object */ },
  "createdAt": "2024-01-16T10:00:00.000Z",
  "parentId": null,
  "children": []
}
```

### Switch to Real Backend
In `.env`:
```bash
USE_HARDCODED_VALUES=false
MONGODB_URL=your_mongodb_connection_string
```
Restart: `npm run dev`

## ❓ Quick Troubleshooting

### Issue: Login doesn't work
**Solution**: Check Clerk credentials in `.env`
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Issue: No data showing after login
**Solution**: Verify demo mode is enabled
```bash
USE_HARDCODED_VALUES=true
```
Restart the dev server.

### Issue: Changes to mock data don't appear
**Solution**: Restart the dev server
```bash
# Press Ctrl+C to stop
npm run dev
```

### Issue: Build fails
**Solution**: This is expected if fonts.googleapis.com is blocked. For demos, use dev mode:
```bash
npm run dev
```

## 📚 More Information

- **Full User Guide**: See [DEMO_MODE.md](./DEMO_MODE.md)
- **Technical Details**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Mock Data Docs**: See [mock-data/README.md](./mock-data/README.md)

## 🎬 Recording Tips

If you're recording a demo video:

1. **Prepare**: Clear browser cache, have login credentials ready
2. **Script**: Follow the demo flow above
3. **Pace**: Speak slowly, explain what you're clicking
4. **Highlight**: Point out authentication works, data is realistic
5. **Mention**: "Backend APIs are in development, using mock data"
6. **End Strong**: Show how easy the toggle is: "Just one environment variable!"

## 🚦 Status Indicators

When running, check the console for:
```
Using hardcoded user data
Using hardcoded posts data
Using hardcoded activity data
```
These confirm demo mode is active.

## 💡 Pro Tips

1. **Customize** mock data before important demos
2. **Practice** the demo flow 2-3 times
3. **Prepare** answers about backend timeline
4. **Highlight** the seamless toggle feature
5. **Show** both the UI and the code (if technical audience)

---

**Ready to demo?** 🎉 Just run `npm run dev` and you're live!

Need help? Check the detailed guides or contact the development team.
