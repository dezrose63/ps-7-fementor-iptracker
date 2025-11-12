import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import InfoCard from "./components/InfoCard";
import MapView from "./components/MapView";
import type { IpifyGeo } from "./types";

const KEY = import.meta.env.VITE_IPIFY_KEY as string;

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
  const [data, setData] = useState<IpifyGeo | null>(null);
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
    } catch (e: string) {
      setErr(e.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <header
        className="relative grid place-items-start gap-6 pb-24 pt-10 text-white"
        style={{
          backgroundImage:
            "url('/pattern-bg-desktop.png'), linear-gradient(135deg,#5a67d8,#3182ce)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="mx-auto text-2xl font-medium">IP Address Tracker</h1>
        <SearchBar onSearch={onSearch} loading={loading} />
        <div className="absolute inset-x-0 -bottom-96px">
          <InfoCard data={data} />
        </div>
      </header>

      {/* Map */}
      <main className="mt-24">
        <MapView lat={data?.location.lat} lng={data?.location.lng} />
        {err && (
          <p className="mt-4 text-center text-sm text-red-600">
            {err}. Try a valid IP (e.g., 8.8.8.8) or a domain (e.g.,
            example.com).
          </p>
        )}
      </main>
    </div>
  );
}
