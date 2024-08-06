"use client";
import React, { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import styles from "./page.module.css";
import { Job } from "@/types/job";

const page = () => {
  const [jobs, setJobs] = useState<Job[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://akil-backend.onrender.com/opportunities/search"
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
        <div className={styles.divide}>
          <h1 className={styles.h1}>Opportunities</h1>
          <p className={styles.p1}>Showing 73 results</p>
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
          />
        ))}
      </div>
    </div>
  );
};

export default page;
