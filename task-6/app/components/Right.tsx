import React from "react";

interface JobPost {
  posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  end_date: string;
  categories: string[];
  required_skills: string[];
}

const Right = ({
  posted_on,
  deadline,
  location,
  start_date,
  end_date,
  categories,
  required_skills,
}: JobPost) => {
  return (
    <div className="pl-16 text-left">
      <h1 className="text-xl pb-3 font-black">About</h1>
      <div className="pb-3 flex items-start">
        <Plus className="mr-3" />
        <div>
          <p className="text-gray-500">Posted On</p>
          <p className="font-bold">{posted_on}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Fire className="mr-3" />
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-bold">{deadline}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Location className="mr-3" />
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-bold">{location}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Calendar className="mr-3" />
        <div>
          <p className="text-gray-500">Start Date</p>
          <p className="font-bold">{start_date}</p>
        </div>
      </div>
      <div className="pb-3 flex items-start">
        <Calendar className="mr-3" />
        <div>
          <p className="text-gray-500">End Date</p>
          <p className="font-bold">{end_date}</p>
        </div>
      </div>
      <h1 className="text-xl pt-8 font-black">Categories</h1>
      <div className="grid grid-cols- text-sm mt-3 gap-2 w-[70%]">
        {categories.map((catagory, i) => (
          <p
            className={`bg-[#FFB836] bg-opacity-15 text-[#FFB836] py-1 px-2 rounded-full text-center`}
          >
            {catagory}
          </p>
        ))}
      </div>
      <h1 className="text-xl pt-8 font-black">Required Skills</h1>
      <div className="flex flex-wrap gap-2 mt-3">
        {required_skills.map((required_skill) => (
          <p className="text-[#4640DE] bg-[#4640DE] bg-opacity-5 rounded p-2">
            {required_skill}
          </p>
        ))}
      </div>
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
