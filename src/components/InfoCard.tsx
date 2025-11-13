import type { IpifyGeo } from "./types";

type Props = { data?: IpifyGeo | null };

export default function InfoCard({ data }: Props) {
  return (
    <section className="mx-auto grid w-[min(90%,1000px)] grid-cols-1 gap-6 rounded-2xl bg-white p-6 text-center shadow-xl md:grid-cols-4 md:text-left">

      <Field label="IP ADDRESS" value={data?.ip ?? "—"} />

      <Field label="LOCATION" value={data? `${data.location.city}, ${data.location.region} ${data.location.postalCode}` : "—" } />
      
      <Field label="TIMEZONE" value={data?.location.timezone ?? "—"} />

      <Field label="ISP" value={data?.isp ?? "—"} />
      
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs tracking-[0.2em] text-gray-500">{label}</p>
      <p className="text-xl font-medium">{value}</p>
    </div>
  );
}
