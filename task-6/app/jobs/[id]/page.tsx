"use client";
import { Job } from "@/types/job";
import Left from "@/app/components/Left";
import Right from "@/app/components/Right";
import { useEffect, useState } from "react";

interface JobPost {
  params: { id: string };
}

const JobPost = ({ params }: JobPost) => {
  const { id } = params;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `https://akil-backend.onrender.com/opportunities/${id}`
        );
        const result = await res.json();
        setJob(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const datePostedConverted = job?.datePosted ? new Date(job.datePosted) : null;
  const startDateConverted = job?.startDate ? new Date(job.startDate) : null;
  const endDateConverted = job?.endDate ? new Date(job.endDate) : null;
  const deadlineConverted = job?.deadline ? new Date(job.deadline) : null;

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <div className="flex">
      <Left
        title={job?.title || ""}
        desc={job?.description || ""}
        responsibilities={job?.responsibilities || ""}
        ideal_candidate={job?.idealCandidate || ""}
        when_where={job?.whenAndWhere || ""}
      />
      <Right
        posted_on={
          datePostedConverted
            ? datePostedConverted.toLocaleDateString("en-US", options)
            : ""
        }
        deadline={
          deadlineConverted
            ? deadlineConverted.toLocaleDateString("en-US", options)
            : ""
        }
        location={job?.location ? job.location[0] : ""}
        start_date={
          startDateConverted
            ? startDateConverted.toLocaleDateString("en-US", options)
            : ""
        }
        end_date={
          endDateConverted
            ? endDateConverted.toLocaleDateString("en-US", options)
            : ""
        }
        categories={job?.categories || []}
        required_skills={job?.requiredSkills || []}
      />
    </div>
  );
};

export default JobPost;
