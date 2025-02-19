import { useRouter } from "next/navigation";

export default function JobCard({ job }: { job: any }) {
  const router = useRouter();

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition">
      {/* Featured Image */}
      <img
        src={job.featured_image}
        alt="Job Image"
        className="w-full h-40 object-cover rounded"
      />

      {/* Job Details */}
      <h3 className="mt-2 font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-500">
        <strong>Apply before:</strong> {job.deadline}
      </p>
      <button
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => router.push(`/job-description/${job.slug}`)}
      >
        Apply
      </button>
    </div>
  );
}
