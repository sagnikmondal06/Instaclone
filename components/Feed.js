import React from "react";
import Miniprofile from "./Miniprofile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl 
    lg:grid-cols-3 lg:max-w-6xl mx-auto p-6 
    ${!session && "!grid-cols-1 !max-w-3xl"}`}
    >
      <section className="col-span-2">
        {/* Stories */}
        <Stories />

        <Posts />
      </section>
      {session && (
        <section className="hidden lg:inline-grid md:col-span-1">
          <div className="fixed">
            <Miniprofile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
