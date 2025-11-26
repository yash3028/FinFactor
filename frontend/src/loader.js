export default function Loader() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-indigo-600 font-semibold text-lg animate-pulse">
        Fetching AQI data...
      </p>
    </div>
  );
}
