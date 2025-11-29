import { currentUser } from "@clerk/nextjs";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import AccessDeniedRedirect from "@/components/shared/AccessDeniedRedirect";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  
  // Show toast and redirect if user is not onboarded or not TNP role
  if (!userInfo?.onboarded) {
    return (
      <AccessDeniedRedirect
        message="Please complete your profile to continue."
        redirectTo="/onboarding"
      />
    );
  }
  
  if (userInfo?.role !== "TNP") {
    return (
      <AccessDeniedRedirect
        message="Access denied. Only TNP staff can access this area."
        redirectTo="/student"
      />
    );
  }

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;
