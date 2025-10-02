# Demo Mode Architecture

This document explains how the `USE_HARDCODED_VALUES` feature is implemented in the CareerBoost application.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Pages / Components                       │   │
│  │  (app/tnp/page.tsx, app/student/page.tsx, etc.)     │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     │                                         │
│                     │ Calls server actions                    │
│                     ▼                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Server Actions Layer                        │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  lib/actions/user.actions.ts                   │  │   │
│  │  │  lib/actions/thread.actions.ts                 │  │   │
│  │  │  lib/actions/community.actions.ts              │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                     │                                  │   │
│  │    ┌────────────────┴────────────────┐                │   │
│  │    │ Check USE_HARDCODED_VALUES?     │                │   │
│  │    └────────────────┬────────────────┘                │   │
│  │                     │                                  │   │
│  │           ┌─────────┴─────────┐                        │   │
│  │           │                   │                        │   │
│  │      true │                   │ false                  │   │
│  │           ▼                   ▼                        │   │
│  │  ┌────────────────┐   ┌──────────────────┐            │   │
│  │  │ Mock Data      │   │  Database        │            │   │
│  │  │ Service        │   │  (MongoDB)       │            │   │
│  │  └────────────────┘   └──────────────────┘            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Authentication (Clerk)                    │
│               ✓ Always uses real API                         │
│        (Not affected by USE_HARDCODED_VALUES)                │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### When `USE_HARDCODED_VALUES=true`

```
User Request
    │
    ▼
┌────────────────┐
│  Next.js Page  │
└───────┬────────┘
        │
        ▼
┌──────────────────────┐
│  Server Action       │ ← Checks environment variable
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ shouldUseHardcoded   │ → Returns true
│ Values()?            │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Mock Data Service    │
│ (mock-data-service)  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Load routes.json     │ ← Read from file system
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Return mock data     │ → Back to page
└────────────────────────┘
```

### When `USE_HARDCODED_VALUES=false` (or not set)

```
User Request
    │
    ▼
┌────────────────┐
│  Next.js Page  │
└───────┬────────┘
        │
        ▼
┌──────────────────────┐
│  Server Action       │ ← Checks environment variable
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ shouldUseHardcoded   │ → Returns false
│ Values()?            │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Connect to Database  │
│ (connectToDB)        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Query MongoDB        │ ← Fetch real data
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Return real data     │ → Back to page
└────────────────────────┘
```

## File Structure

```
Career-Boost/
│
├── .env.example                      # Environment variable template
├── DEMO_MODE.md                      # User guide for demo mode
├── ARCHITECTURE.md                   # This file
├── README.md                         # Updated with demo mode info
│
├── mock-data/                        # Mock data directory
│   ├── README.md                     # Mock data documentation
│   └── routes.json                   # Centralized mock data store
│
├── lib/
│   ├── mock-data-service.ts          # Service layer for mock data
│   │
│   └── actions/                      # Server actions (modified)
│       ├── user.actions.ts           # ✓ Checks USE_HARDCODED_VALUES
│       ├── thread.actions.ts         # ✓ Checks USE_HARDCODED_VALUES
│       └── community.actions.ts      # ✓ Checks USE_HARDCODED_VALUES
│
└── app/                              # Next.js pages (unchanged)
    ├── tnp/                          # Uses server actions
    ├── student/                      # Uses server actions
    └── ...
```

## Modified Functions

### User Actions (`lib/actions/user.actions.ts`)
- ✓ `fetchUser()` - Get user profile
- ✓ `fetchUsers()` - Search and list users
- ✓ `fetchUserPosts()` - Get user's posts
- ✓ `getActivity()` - Get user activity
- ✗ `updateUser()` - Not modified (write operation)

### Thread Actions (`lib/actions/thread.actions.ts`)
- ✓ `fetchPosts()` - List all posts with pagination
- ✓ `fetchThreadById()` - Get single thread details
- ✗ `createThread()` - Not modified (write operation)
- ✗ `deleteThread()` - Not modified (write operation)
- ✗ `addCommentToThread()` - Not modified (write operation)

### Community Actions (`lib/actions/community.actions.ts`)
- ✓ `fetchCommunities()` - List communities
- ✓ `fetchCommunityDetails()` - Get community details
- ✓ `fetchCommunityPosts()` - Get community posts
- ✗ `createCommunity()` - Not modified (write operation)
- ✗ `updateCommunityInfo()` - Not modified (write operation)
- ✗ `deleteCommunity()` - Not modified (write operation)

> **Note**: Write operations (create, update, delete) are not modified because they would require complex state management in mock mode. In demo mode, these operations simply don't execute against the mock data, keeping it consistent.

## Mock Data Service API

### Core Functions

```typescript
// Check if demo mode is enabled
shouldUseHardcodedValues(): boolean

// User-related data
getMockUser(userId: string): UserObject
getMockUsers(userId, searchString, pageNumber, pageSize): { users, isNext }
getMockUserPosts(userId: string): { threads: [] }
getMockActivity(userId: string): ActivityArray

// Thread-related data
getMockPosts(pageNumber, pageSize): { posts, isNext }
getMockThreadById(threadId: string): ThreadObject

// Community-related data
getMockCommunities(searchString, pageNumber, pageSize): { communities, isNext }
getMockCommunityDetails(id: string): CommunityObject
getMockCommunityPosts(id: string): { threads: [] }
```

## Environment Variable

```bash
# Enable demo mode
USE_HARDCODED_VALUES=true

# Disable demo mode (default)
USE_HARDCODED_VALUES=false

# Not set = false (normal operation)
```

## Decision Logic

Every read operation follows this pattern:

```typescript
export async function someAction(params) {
  // 1. Check environment variable
  if (shouldUseHardcodedValues()) {
    console.log("Using hardcoded data");
    return getMockData(params);
  }

  // 2. Normal database operation
  try {
    connectToDB();
    const data = await DatabaseModel.find(...);
    return data;
  } catch (error) {
    throw error;
  }
}
```

## Authentication Flow

Authentication is **NOT** affected by `USE_HARDCODED_VALUES`:

```
Login Request
    │
    ▼
┌──────────────────────┐
│  Clerk Auth          │ ← Always uses real API
│  (External Service)  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  JWT Token           │ ← Real authentication token
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Session Created     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  App Data Requests   │ ← May use mock data if enabled
└────────────────────────┘
```

## Benefits

1. **Separation of Concerns**: Mock data logic is isolated in one service
2. **Easy Toggle**: Single environment variable controls behavior
3. **Minimal Changes**: Only read operations are modified
4. **Maintainable**: Clean code paths, easy to understand
5. **Removable**: Simple to remove when no longer needed
6. **Realistic**: Demos look and feel like production

## Limitations

1. **Read-Only**: Write operations don't modify mock data
2. **Static Data**: Mock data doesn't change between requests
3. **Manual Updates**: Mock data must be manually updated
4. **No Validation**: Mock data structure must be maintained manually

## Future Enhancements

Potential improvements (not currently implemented):

- Dynamic mock data generation
- Mock data versioning
- API response recording for mock data
- Mock write operations with in-memory state
- Multiple mock data profiles (different scenarios)

---

This architecture ensures the demo mode is powerful yet simple, allowing stakeholders to see a fully functional frontend while the backend is being developed.
