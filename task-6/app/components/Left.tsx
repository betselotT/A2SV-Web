import React from "react";
import path from "path";
import { Job } from "@/types/job";
import fs from "fs";

interface JobPost {
  params: { id: string };
}

const getJob = async (id: string): Promise<Job | undefined> => {
  const filePath = path.join(process.cwd(), "json", "jobs.json");
  const jsonData = await fs.promises.readFile(filePath, "utf-8");
  const jobs = JSON.parse(jsonData);
  const currJobs: Job[] = jobs.job_postings;
  return currJobs.find((job) => job.id === id);
};

const Left = async ({ params }: JobPost) => {
  const { id } = params;
  const job = await getJob(id);
  return (
    <div className="w-9/12">
      <h1 className="text-xl pb-3 font-black">Description</h1>
      <p>{job?.description}</p>
      <h1 className="text-xl pb-3 pt-10 font-black">Responsibilities</h1>
      {job?.responsibilities.map((jo) => (
        <div className="flex">
          <Check />
          <p className="pl-2 pb-2">{jo}</p>
        </div>
      ))}
      <h1 className="text-xl pb-3 pt-10 font-black">Ideal Candidate we want</h1>
      <div className="flex">
        <Hyphen />
        <p className="pl-2">
          {job?.ideal_candidate.age} {job?.ideal_candidate.gender} {job?.title}
        </p>
      </div>
      {job?.ideal_candidate.traits.map((jo) => (
        <div className="flex">
          <Hyphen />
          <p className="pl-2">{jo}</p>
        </div>
      ))}
      <h1 className="text-xl pb-3 pt-10 font-black">When & Where</h1>
      <div className="flex">
        <Location />
        <p className="pl-2">{job?.when_where}</p>
      </div>
    </div>
  );
};

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#56CDAD"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function Hyphen() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
}

function Location() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#26A4FF"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

export default Left;
