// app/feedback/page.tsx

export default function FeedbackPage() {
    return (
      <div className="min-h-screen bg-white flex justify-center items-start p-0">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfW2aRj3lN8K-qVPEztbMZDy0XE91ISSsKzpNaDm0sEFMw_pg/viewform?embedded=true"
          width="100%"
          // Use responsive height: increase on small screens
          className="w-full max-w-screen-lg border-none h-[2216px] sm:h-[1800px] md:h-[1707px]"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          scrolling="no"
        >
          Loading…
        </iframe>
      </div>
    );
  }
  