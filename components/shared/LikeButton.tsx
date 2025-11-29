"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface LikeButtonProps {
  threadId: string;
  currentUserId: string;
}

function LikeButton({ threadId, currentUserId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load like state from localStorage on mount
  useEffect(() => {
    const storedLikes = localStorage.getItem(`thread-likes-${threadId}`);
    const userLikes = localStorage.getItem(`user-likes-${currentUserId}`);
    
    if (storedLikes) {
      setLikeCount(parseInt(storedLikes, 10));
    }
    
    if (userLikes) {
      const likedThreads = JSON.parse(userLikes) as string[];
      setIsLiked(likedThreads.includes(threadId));
    }
  }, [threadId, currentUserId]);

  const handleLike = () => {
    setIsAnimating(true);
    
    // Get current user's liked threads
    const userLikesKey = `user-likes-${currentUserId}`;
    const userLikes = localStorage.getItem(userLikesKey);
    let likedThreads: string[] = userLikes ? JSON.parse(userLikes) : [];
    
    // Get current thread's like count
    const threadLikesKey = `thread-likes-${threadId}`;
    let currentLikeCount = likeCount;

    if (isLiked) {
      // Unlike
      likedThreads = likedThreads.filter(id => id !== threadId);
      currentLikeCount = Math.max(0, currentLikeCount - 1);
      setIsLiked(false);
    } else {
      // Like
      likedThreads.push(threadId);
      currentLikeCount += 1;
      setIsLiked(true);
    }

    // Save to localStorage
    localStorage.setItem(userLikesKey, JSON.stringify(likedThreads));
    localStorage.setItem(threadLikesKey, currentLikeCount.toString());
    setLikeCount(currentLikeCount);

    // Reset animation
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 transition-transform ${
        isAnimating ? "scale-125" : "scale-100"
      }`}
    >
      <Image
        src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain transition-all"
      />
      {likeCount > 0 && (
        <span className="text-small-regular text-gray-1">{likeCount}</span>
      )}
    </button>
  );
}

export default LikeButton;
