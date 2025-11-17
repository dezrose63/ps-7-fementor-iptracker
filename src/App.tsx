import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import InfoCard from "./components/InfoCard";
import MapView from "./components/MapView";
import type { IpifyGeo } from "./types";

const KEY = import.meta.env.VITE_IPIFY_KEY as string;

const dummyData: IpifyGeo = {
  ip: "192.212.174.101",
  location: {
    city: "Brooklyn",
    region: "NY",
    postalCode: "10001",
    timezone: "UTC-05:00",
    lat: 40.7128, // Example coordinates for the map
    lng: -74.006,
  },
  isp: "SpaceX Starlink",
};

async function fetchGeo(query?: string): Promise<IpifyGeo> {
  // If no query, get the client IP first
  const ip =
    query ??
    (await (await fetch("https://api.ipify.org?format=json")).json()).ip;

  const url = new URL("https://geo.ipify.org/api/v2/country,city");
  url.searchParams.set("apiKey", KEY);
  // User can search an IP OR a domain
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) url.searchParams.set("ipAddress", ip);
  else url.searchParams.set("domain", ip);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Lookup failed");
  return res.json();
}

export default function App() {
  const [data, setData] = useState<IpifyGeo | null>(dummyData);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchGeo()
      .then(setData)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const onSearch = async (q: string) => {
    setErr(null);
    setLoading(true);
    try {
      const d = await fetchGeo(q);
      setData(d);
    } catch (e: unknown) {
      setErr(e.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Header with SearchBar inside */}
      <header
        className="relative h-64 z-10"
        style={{
          backgroundImage:
            "url('/pattern-bg-desktop.png'), linear-gradient(hsl(240, 100%, 5%), hsl(238, 22%, 44%))",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center pt-8 px-4">
          <h1 className="mb-6 text-center text-3xl font-medium text-white">
            IP Address Tracker
          </h1>

          {/* Search Bar */}
          <SearchBar onSearch={onSearch} loading={loading} />

          {err && (
            <p className="mt-4 text-center text-sm text-red-200">
              {err}. Try a valid IP (e.g., 8.8.8.8) or a domain (e.g.,
              example.com).
            </p>
          )}
        </div>
      </header>

      {/* Info Card - absolutely positioned to overlap header and map */}
      <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-5xl px-4">
        <InfoCard data={data} />
      </div>

      {/* Map View - directly below header with lower z-index */}
      <section className="relative h-[calc(100vh-16rem)] z-0">
        <MapView lat={data?.location?.lat} lng={data?.location?.lng} />
      </section>
    </div>
  );
}
