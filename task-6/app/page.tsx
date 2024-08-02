import React from "react";
import Card from "./components/Card/Card";
import styles from "./page.module.css";
import path from "path";
import { Job } from "@/types/job";
import fs from "fs";

const getJobs = async (): Promise<Job[] | undefined> => {
  const filePath = path.join(process.cwd(), "json", "jobs.json");
  const jsonData = await fs.promises.readFile(filePath, "utf-8");
  const jobs = JSON.parse(jsonData);
  const currJobs: Job[] = jobs.job_postings;
  return currJobs;
};

const page = async () => {
  const jobs = await getJobs();
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
            location={job.about.location}
            company={job.company}
            logo={job.image}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
