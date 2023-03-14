import React, { useState, useEffect } from "react";
import {
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import Moment from "react-moment";

function Post({ id, username, usrImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState([]);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(
        collection(db, "posts", id, "likes"),
        orderBy("timestamp", "desc"),
        (snapshot) => {
          setLikes(snapshot.docs);
        }
      ),
    [db, id]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  return (
    <div className="bg-white border rounded-sm my-7 sm:w-11/12 mx-auto">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          src={usrImg}
          alt=""
          className="h-12 w-12 rounded-full
         border p-1 object-cover mr-3 cursor-pointer"
        />
        <p className="font-medium flex-1 cursor-pointer">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      {/* img */}
      <img
        src={img}
        className="w-full object-contain"
        onDoubleClick={session && likePost}
        alt=""
      />

      {/* button */}
      {session && (
        <div className="flex items-center justify-between p-4">
          <div className="flex space-x-3">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <PaperAirplaneIcon className="btn rotate-45" />
            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* captions */}
      <p className="p-4 truncate">
        {likes.length > 0 && (
          <div className="font-bold font-xs">
            <p>{likes.length} likes</p>
          </div>
        )}
        <span className="font-medium">{username} </span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div
          className="ml-10 h-20 space-x-2
        overflow-y-scroll scrollbar-thumb-black scrollbar-thin"
        >
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* inputbox */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="btn" />
          <input
            type="text"
            placeholder="Add a Comment..."
            className="flex-1 border-none
          focus:ring-0 outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-normal text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
