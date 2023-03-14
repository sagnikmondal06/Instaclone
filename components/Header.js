import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState, menuState } from "../atoms/modalAtom";
import { useState } from "react";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useRecoilState(menuState);

  const setMenuStatus = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <div className="shadow-sm bg-white border-b top-0 z-40 sm:sticky">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* <h1>This is the Header</h1> */}

        {/* left */}
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
            onClick={() => router.push("/")}
          />
        </div>

        {/* middle - search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div
              className="absolute inset-y-0 pl-3 flex items-center 
        pointer-events-none"
            >
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 
          sm:text-sm border-gray-300 focus:ring-black
          focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* right */}
        <div className="flex items-center justify-items-end space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />
          {session ? (
            <>
              <MenuIcon
                className="h-12 md:hidden cursor-pointer"
                onClick={setMenuStatus}
              />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div
                  className="absolute -top-1 right-0 bg-red-400 w-5 h-5 rounded-full
            flex item-center justify-center animate-pulse text-white"
                >
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                src={session.user.image}
                className="h-10 w-10 rounded-full"
                onClick={signOut}
              />
            </>
          ) : (
            <button onClick={signIn} className="font-sm font-medium">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
