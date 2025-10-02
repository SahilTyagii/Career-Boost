/**
 * Mock Data Service
 * 
 * This service provides hardcoded responses for API calls when USE_HARDCODED_VALUES is enabled.
 * It reads from a centralized JSON file containing mock data for all routes.
 * 
 * Purpose: Enable demo functionality without requiring a live backend.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

let mockData: any = null;

/**
 * Loads mock data from the JSON file
 */
function loadMockData() {
  if (!mockData) {
    try {
      const filePath = join(process.cwd(), 'mock-data', 'routes.json');
      const fileContent = readFileSync(filePath, 'utf-8');
      mockData = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error loading mock data:', error);
      mockData = {};
    }
  }
  return mockData;
}

/**
 * Check if hardcoded values should be used
 */
export function shouldUseHardcodedValues(): boolean {
  return process.env.USE_HARDCODED_VALUES === 'true';
}

/**
 * Get mock user data by user ID
 */
export function getMockUser(userId: string) {
  const data = loadMockData();
  return data.users[userId] || data.users['user_1']; // Default to user_1 if not found
}

/**
 * Get mock posts with pagination
 */
export function getMockPosts(pageNumber: number = 1, pageSize: number = 20) {
  const data = loadMockData();
  const allPosts = data.threads.posts || [];
  
  const skipAmount = (pageNumber - 1) * pageSize;
  const posts = allPosts.slice(skipAmount, skipAmount + pageSize);
  const isNext = allPosts.length > skipAmount + posts.length;
  
  return { posts, isNext };
}

/**
 * Get mock thread by ID
 */
export function getMockThreadById(threadId: string) {
  const data = loadMockData();
  return data.threads.threadDetails[threadId] || data.threads.posts[0];
}

/**
 * Get mock activity for a user
 */
export function getMockActivity(userId: string) {
  const data = loadMockData();
  return data.activity[userId] || [];
}

/**
 * Get mock users list with pagination and search
 */
export function getMockUsers(
  userId: string,
  searchString: string = '',
  pageNumber: number = 1,
  pageSize: number = 20
) {
  const data = loadMockData();
  let users = data.usersList || [];
  
  // Exclude the current user
  users = users.filter((user: any) => user.id !== userId);
  
  // Filter by search string if provided
  if (searchString.trim() !== '') {
    const regex = new RegExp(searchString, 'i');
    users = users.filter((user: any) => 
      regex.test(user.username) || regex.test(user.name)
    );
  }
  
  const skipAmount = (pageNumber - 1) * pageSize;
  const paginatedUsers = users.slice(skipAmount, skipAmount + pageSize);
  const isNext = users.length > skipAmount + paginatedUsers.length;
  
  return { users: paginatedUsers, isNext };
}

/**
 * Get mock user posts
 */
export function getMockUserPosts(userId: string) {
  const data = loadMockData();
  return data.userPosts[userId] || { threads: [] };
}

/**
 * Get mock communities with pagination and search
 */
export function getMockCommunities(
  searchString: string = '',
  pageNumber: number = 1,
  pageSize: number = 20
) {
  const data = loadMockData();
  let communities = data.communities.list || [];
  
  // Filter by search string if provided
  if (searchString.trim() !== '') {
    const regex = new RegExp(searchString, 'i');
    communities = communities.filter((community: any) => 
      regex.test(community.username) || regex.test(community.name)
    );
  }
  
  const skipAmount = (pageNumber - 1) * pageSize;
  const paginatedCommunities = communities.slice(skipAmount, skipAmount + pageSize);
  const isNext = communities.length > skipAmount + paginatedCommunities.length;
  
  return { communities: paginatedCommunities, isNext };
}

/**
 * Get mock community details
 */
export function getMockCommunityDetails(id: string) {
  const data = loadMockData();
  return data.communities.details[id] || null;
}

/**
 * Get mock community posts
 */
export function getMockCommunityPosts(id: string) {
  const data = loadMockData();
  return data.communities.details[id] || { threads: [] };
}
