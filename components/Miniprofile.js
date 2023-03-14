import React from "react";
import { useSession, signOut } from "next-auth/react";

function Miniprofile() {
  const { data: session } = useSession();
  return (
    <>
      <div
        className="flex space-x-4 justify-between items-center 
    mt-14 ml-10"
      >
        <div>
          <img
            src={session?.user?.image}
            alt=""
            className="rounded-full h-14 w-14 p-[2px] border"
          />
        </div>
        <div>
          <h2 className="font-medium">{session?.user?.username}</h2>
          <p className="text-gray-600">Welcome to Clipshot</p>
        </div>
        <button className="text-blue-400 hover:text-blue-600" onClick={signOut}>
          Signout
        </button>
      </div>
    </>
  );
}

export default Miniprofile;
