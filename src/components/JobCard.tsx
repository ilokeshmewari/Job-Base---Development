import { useRouter } from "next/navigation";

interface Job {
  featured_image: string;
  title: string;
  deadline: string;
  slug: string;
}

export default function JobCard({ job }: { job: Job }) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row border rounded-lg p-4 shadow-sm hover:shadow-lg transition h-full">
      {/* Featured Image */}
      <div className="sm:w-1/3 w-full">
        <img
          src={job.featured_image}
          alt="Job Image"
          className="w-full h-40 object-cover rounded sm:h-full"
        />
      </div>

      {/* Job Details */}
      <div className="sm:w-2/3 w-full sm:pl-4 flex flex-col justify-between">
        <div>
          <h3
            className="mt-5 sm:mt-0 font-semibold lg:text-2xl"
            dangerouslySetInnerHTML={{ __html: job.title }}
          ></h3>
          <p
            className="mt-2 text-sm lg:text-md text-gray-500"
            dangerouslySetInnerHTML={{ __html: job.deadline }}
          ></p>
        </div>
        <button
          className="mt-2 mb-3 px-4 py-2 bg-green-500 text-white rounded self-start transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600"
          onClick={() => router.push(`/job-description/${job.slug}`)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
