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

const Right = async ({ params }: JobPost) => {
  const { id } = params;
  const job = await getJob(id);
  return (
    <div className="pl-16 text-left">
      <h1 className="text-xl pb-3 font-black">About</h1>
      <div className="pb-3 flex items-start">
        <Plus className="mr-3" />
        <div>
          <p className="text-gray-500">Posted On</p>
          <p className="font-bold">{job?.about.posted_on}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Fire className="mr-3" />
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-bold">{job?.about.deadline}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Location className="mr-3" />
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-bold">{job?.about.location}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Calendar className="mr-3" />
        <div>
          <p className="text-gray-500">Start Date</p>
          <p className="font-bold">{job?.about.start_date}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Calendar className="mr-3" />
        <div>
          <p className="text-gray-500">End Date</p>
          <p className="font-bold">{job?.about.end_date}</p>
        </div>
      </div>
      <h1 className="text-xl pt-8 font-black">Categories</h1>
      <div className="pt-5">
        <button className="bg-orange-100 hover:bg-blue-700 text-orange-300 font-bold py-2 px-4 rounded-full mr-3">
          {job?.about.categories[0]}
        </button>
        <button className="bg-green-100 hover:bg-blue-700 text-green-400 font-bold py-2 px-4 rounded-full">
          {job?.about.categories[1]}
        </button>
      </div>
      <h1 className="text-xl pt-8 font-black">Required Skills</h1>
      {job?.about.required_skills.map((jo, index) => (
        <button
          key={index}
          className="bg-blue-100 hover:bg-blue-700 text-blue-700 py-2 px-4 rounded-full mt-4 mr-1"
        >
          {jo}
        </button>
      ))}
    </div>
  );
};

function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#26A4FF"
      className={`size-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function Fire({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#26A4FF"
      className={`size-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
      />
    </svg>
  );
}

function Location({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#26A4FF"
      className={`size-6 ${className}`}
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

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#26A4FF"
      className={`size-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
      />
    </svg>
  );
}

export default Right;
