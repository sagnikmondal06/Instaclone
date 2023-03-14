import { React, Fragment, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadfile = async () => {
    if (loading) return;

    setLoading(true);

    // Create a post and add to firestore
    // get the post id for the newly created post
    // upload the image to firebase storage with the post id
    // get download url from firebase storage and update the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center 
        sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden 
            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              {selectedFile ? (
                <img
                  src={selectedFile}
                  onClick={() => setSelectedFile(null)}
                  alt=""
                  className="w-80 h-80 cursor-pointer object-contain mt-3 mx-auto rounded-md"
                />
              ) : (
                <div
                  className="mx-auto flex items-center 
              justify-center h-12 w-12 rounded-full bg-red-100 mt-2"
                >
                  <CameraIcon
                    className="h-6 w-6 text-red-600 cursor-pointer"
                    aria-hidden="true"
                    onClick={() => filePickerRef.current.click()}
                  />
                </div>
              )}

              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Upload a Photo
                </Dialog.Title>

                <div>
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    className="border-none focus:ring-0
                  w-full text-center"
                    placeholder="Please enter a caption..."
                    ref={captionRef}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={!selectedFile}
                  className="w-full inline-flex justify-center rounded-md border 
                  border-transparent 
                  shadow-sm px-4 py-2 bg-red-600 text-base font-medium 
                  text-white hover:bg-red-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-red-500 sm:ml-3 
                  sm:flex-1 sm:text-sm
                  disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                  onClick={uploadfile}
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
