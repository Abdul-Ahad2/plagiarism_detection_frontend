export default function StudentDashboard({ params }) {
  const { id } = params; // Extracting the ID from the URL parameters

  return (
    <div className="flex items-center justify-center h-screen bg-[#E4E4E4]">
      <div className="h-[90vh] w-6/12 bg-[#E4E4E4] shadow-2xl text-center rounded-4xl px-10">
        <h1 className="text-6xl m-7 text-[#044343] tracking-[-5px] ">
          Student Dashboard.
        </h1>
        <p className="text-xl">Welcome, Student {id}!</p>
      </div>
    </div>
  );
}
