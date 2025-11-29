"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (currentUserId !== authorId || pathname === "/") return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteThread(JSON.parse(threadId), pathname);
      if (!parentId || !isComment) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting thread:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Delete"
          )}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="text-xs px-2 py-1 bg-dark-4 text-light-1 rounded hover:bg-dark-3 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <Image
      src='/assets/delete.svg'
      alt='delete'
      width={18}
      height={18}
      className='cursor-pointer object-contain hover:opacity-70 transition-opacity'
      onClick={() => setShowConfirm(true)}
    />
  );
}

export default DeleteThread;
