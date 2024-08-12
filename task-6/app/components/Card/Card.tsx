"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookie from "js-cookie";

interface JobType {
  id: string;
  title: string;
  desc: string;
  location: string;
  company: string;
  logo: string;
  isBookmarked: boolean;
}

const Card = ({
  title,
  desc,
  location,
  company,
  logo,
  id,
  isBookmarked: initialBookmarked,
}: JobType) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleBookmark = async () => {
    const accessToken = Cookie.get("jobPlaceToken");

    try {
      const response = await axios.post(
        `https://akil-backend.onrender.com/bookmarks/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setIsBookmarked(true);
    } catch (error) {
      console.error("Error bookmarking the post:", error);
    }
  };

  const unhandleBookmark = async () => {
    const accessToken = Cookie.get("jobPlaceToken");
    try {
      const response = await axios.delete(
        `https://akil-backend.onrender.com/bookmarks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setIsBookmarked(false);
    } catch (error) {
      console.error("Error unbookmarking the post:", error);
    }
  };

  return (
    <div className="flex items-start gap-4 mt-5 border p-5 rounded-[30px] justify-start w-3/5">
      <img className="h-12 w-12" src={logo || "/job1.png"} alt="" />

      <div>
        <div className="flex justify-between items-start">
          <Link href={`/jobs/${id}`}>
            <h1 className="font-bold text-[#25324B] my-2">{title}</h1>
            <p className="text-[#7C8493] my-2">
              {company}, <span>{location}</span>
            </p>
          </Link>

          {isBookmarked ? (
            <button
              type="button"
              className="cursor-pointer"
              onClick={unhandleBookmark}
              data-id="unbookmark"
            >
              <BookmarkIconSolid />
            </button>
          ) : (
            <button
              data-id="bookmark"
              data-testid="bookmark-button"
              type="button"
              className="cursor-pointer"
              onClick={handleBookmark}
            >
              <BookmarkIcon />
            </button>
          )}
        </div>
        <Link href={`/jobs/${id}`}>
          <p className="text-[#25324B]">{desc}</p>
          <div className="flex gap-2 mt-5 text-sm">
            <p className="bg-[#56CDAD] bg-opacity-10 text-[#56CDAD] py-1 px-2 rounded-full font-semibold">
              In Person
            </p>
            <p className="border border-[#FFB836] bg-opacity-15 text-[#FFB836] py-1 px-2 rounded-full">
              Education
            </p>
            <p className="border border-[#4640DE] bg-opacity-15 text-[#4640DE] py-1 px-5 rounded-full">
              IT
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

function BookmarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  );
}

function BookmarkIconSolid() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fill-rule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
        clip-rule="evenodd"
      />
    </svg>
  );
}

export default Card;
