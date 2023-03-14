import React from "react";
import { PlusCircleIcon, LogoutIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { menuState, modalState } from "../atoms/modalAtom";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/react";

export default function Example() {
  const [open, setOpen] = useRecoilState(menuState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={() => setOpen(false)}
      >
        <div className="absolute inset-0 overflow-hidden z-50 mt-20">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-3 left-14 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-bold text-gray-900 text-center">
                      Clipshot
                    </Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div>
                      <div
                        className="flex space-x-4 items-center ml-2 border p-2 
                      hover:bg-blue-600 hover:text-white rounded-md cursor-pointer"
                        onClick={() => setModalOpen(true)}
                      >
                        <PlusCircleIcon
                          className="h-7 w-7 hover:scale-125 transition-all cursor-pointer
                        ease-out duration-150"
                        />
                        <p className="flex-1 font-medium">Add Image</p>
                      </div>
                      <div
                        className="mt-2 ml-2 p-2 border flex item-center space-x-4
                      text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                        onClick={signOut}
                      >
                        <LogoutIcon
                          className="h-7 w-7 hover:scale-125 transition-all cursor-pointer
                        ease-out duration-150"
                        />
                        <p className="flex-1 font-medium">Logout</p>
                      </div>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
