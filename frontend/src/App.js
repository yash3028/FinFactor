import { useState } from "react";
import Loader from "./loader";

export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchCity = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`http://localhost:5000/api/aqi?city=${city}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.message);
      setData(json.data);
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "bg-emerald-500";
    if (aqi <= 100) return "bg-yellow-400";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-500";
    if (aqi <= 300) return "bg-purple-600";
    return "bg-rose-900";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center py-12 px-4">
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm animate-fadeIn">
        Air Quality Monitor
      </h1>

      <p className="text-gray-600 mt-3 text-lg animate-fadeIn delay-200">
        Search any city worldwide
      </p>

      <div className="mt-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl shadow-2xl p-6 rounded-3xl flex gap-4 border border-white/40 animate-fadeIn">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city... (e.g., Mumbai)"
          className="flex-1 p-4 bg-white/80 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
        />
        <button
          onClick={searchCity}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg transition-all active:scale-95 text-lg"
        >
          Search
        </button>
      </div>

      {loading && <Loader />}

      {error && (
        <p className="mt-6 text-red-600 font-semibold text-lg animate-fadeIn">
          {error}
        </p>
      )}

      {data && (
        <div className="mt-14 w-full max-w-4xl bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 border border-white/40 animate-slideUp">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{data.city}</h2>

            <span
              className={`px-6 py-3 rounded-2xl text-white font-semibold text-lg shadow-md ${getAQIColor(
                data.aqi
              )} animate-bounce`}
            >
              AQI {data.aqi}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              ["PM2.5", data.pm25],
              ["PM10", data.pm10],
              ["O₃", data.o3],
              ["NO₂", data.no2],
              ["CO", data.co],
              ["SO₂", data.so2],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-gray-100/80 shadow-lg p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:scale-[1.04] transition-all duration-300"
              >
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-8">
            Last Updated: {new Date(data.time).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
