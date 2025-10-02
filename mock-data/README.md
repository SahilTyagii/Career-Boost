# Mock Data for Demo Mode

This directory contains hardcoded data used when `USE_HARDCODED_VALUES=true` is set in the environment variables.

## Purpose

The mock data system allows you to demo the application with a fully functional frontend and authentication system, even when the backend APIs are not ready or available.

## How It Works

1. **Environment Variable**: Set `USE_HARDCODED_VALUES=true` in your `.env` file
2. **Data Source**: All non-authentication data is served from `routes.json`
3. **Authentication**: Login, logout, and authentication continue to work normally through Clerk
4. **Seamless**: The frontend works exactly as it would with a live backend

## Structure of routes.json

```json
{
  "users": {
    "user_id": { ...user data... }
  },
  "threads": {
    "posts": [ ...array of posts... ],
    "threadDetails": {
      "thread_id": { ...thread details with comments... }
    }
  },
  "activity": {
    "user_id": [ ...activity items... ]
  },
  "usersList": [ ...array of all users... ],
  "communities": {
    "list": [ ...array of communities... ],
    "details": {
      "community_id": { ...community details... }
    }
  },
  "userPosts": {
    "user_id": { ...user's posts... }
  }
}
```

## Customizing Mock Data

To customize the demo data:

1. Edit `routes.json` with your desired data
2. Ensure data structure matches what the frontend expects
3. Keep user IDs consistent across different sections
4. Add realistic data to make demos more impressive

## Demo Script

1. Start the app with `USE_HARDCODED_VALUES=true`
2. Log in with valid Clerk credentials
3. Navigate through the app - all data comes from `routes.json`
4. Authentication endpoints work normally
5. Create/update operations are ignored (app is read-only in demo mode)

## Switching Back to Real API

Simply set `USE_HARDCODED_VALUES=false` or remove the variable from your `.env` file, and restart the application. The app will then fetch data from the actual database.

## Note

Write operations (create, update, delete) do not modify the mock data file. In demo mode, these operations are skipped or return success without actual changes. This keeps the demo data consistent across sessions.
