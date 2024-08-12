"use client";
import React, { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import styles from "./page.module.css";
import { Job } from "@/types/job";
import Cookie from "js-cookie";
import Link from "next/link";

const page = () => {
  const [jobs, setJobs] = useState<Job[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookie.get("jobPlaceToken");

    const fetchData = async () => {
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
        setJobs(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.top}>
        <div className="flex gap-9">
          <div className={styles.divide}>
            <Link href="/" className={styles.h1}>
              Opportunities
            </Link>
            <Link href="/bookmarks" className={styles.p1}>
              Showing {jobs?.length} results
            </Link>
          </div>
          <h1 className="font-black text-3xl">Bookmarks</h1>
        </div>
        <div className={styles.arrow}>
          <p>
            Sort by: <button className={styles.btn}>Most relevant</button>
          </p>
          <img src="/images/Arrow - Down 2.png" alt="" />
        </div>
      </div>
      <div>
        {jobs?.map((job) => (
          <Card
            id={job.id}
            key={job.id}
            title={job.title}
            desc={job.description}
            location={job.location}
            company={job.orgName}
            logo={job.logoUrl}
            isBookmarked={job.isBookmarked}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
