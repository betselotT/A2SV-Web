"use client";
import { Job } from "@/types/job";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Link from "next/link";
import Card from "../components/Card/Card";

const Bookmarks = () => {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookie.get("jobPlaceToken");

      if (!accessToken) {
        console.log("No access token");
        return;
      }

      try {
        const res = await fetch(
          "https://akil-backend.onrender.com/opportunities/search",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const result = await res.json();
        const bookmarkedData = result.data.filter(
          (job: Job) => job.isBookmarked
        );
        setJobs(bookmarkedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (jobs === null) {
    return <div>No Bookmarked Items.</div>;
  } else {
    return (
      <div>
        <div className="flex gap-9">
          <div>
            <Link href="/" className="font-black text-2xl">
              Opportunities
            </Link>
            <p className="font-light">Showing {jobs.length} results</p>
          </div>
          <Link href="/bookmakrs" className="font-black text-2xl">
            Bookmarks
          </Link>
          <div className="pl-28 flex items-center gap-2">
            <p className="text-[#7C8493] cursor-pointer">
              Sort by:{" "}
              <span className="text-[#25324B] font-semibold">
                Most relevant
              </span>
            </p>
            <img
              className="w-4 h-4 cursor-pointer"
              src="/images/Arrow - Down 2.png"
              alt=""
            />
          </div>
        </div>
        <div>
          {jobs.map((job) => (
            <Card
              id={job.id}
              key={job.id}
              title={job.title}
              desc={job.description}
              location={job.location[0]}
              company={job.orgName}
              logo={job.logoUrl}
              isBookmarked={job.isBookmarked}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Bookmarks;
