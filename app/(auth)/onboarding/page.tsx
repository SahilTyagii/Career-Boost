import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
    role: userInfo ? userInfo?.role : "",
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-6 sm:px-10 py-10 sm:py-20">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h1 className="head-text">Welcome to CareerBoost</h1>
        <p className="mt-3 text-base-regular text-light-2 max-w-md">
          Complete your profile to get started. This helps us personalize your experience and connect you with the right opportunities.
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
            1
          </div>
          <span className="ml-2 text-sm text-light-2">Profile Info</span>
        </div>
        <div className="w-12 h-0.5 bg-dark-4 mx-2" />
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-dark-4 flex items-center justify-center text-light-3 text-sm font-bold">
            2
          </div>
          <span className="ml-2 text-sm text-light-3">Get Started</span>
        </div>
      </div>
      
      <section className="bg-dark-2 p-6 sm:p-10 rounded-xl shadow-lg border border-dark-4">
        <AccountProfile user={userData} btnTitle="Complete Profile" />
      </section>
      
      <p className="mt-6 text-center text-subtle-medium text-light-3">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </main>
  );
}

export default Page;
