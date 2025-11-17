import type { IpifyGeo } from "../types";

type Props = { data?: IpifyGeo | null };

export default function InfoCard({ data }: Props) {
  return (
    <section className="mx-auto grid w-[min(90%,1000px)] grid-cols-1 gap-6 rounded-2xl bg-white p-6 text-center shadow-xl md:grid-cols-4 md:gap-8 md:text-left">
      <Field label="IP ADDRESS" value={data?.ip ?? "—"} showBorder />

      <Field
        label="LOCATION"
        value={
          data
            ? `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
            : "—"
        }
        showBorder
      />

      <Field
        label="TIMEZONE"
        value={data?.location.timezone ?? "—"}
        showBorder
      />

      <Field label="ISP" value={data?.isp ?? "—"} />
    </section>
  );
}

function Field({
  label,
  value,
  showBorder,
}: {
  label: string;
  value: string;
  showBorder?: boolean;
}) {
  return (
    <div
      className={`space-y-2 ${
        showBorder ? "md:border-r md:border-gray-300 md:pr-8" : ""
      }`}
    >
      <p className="text-xs tracking-[0.2em] text-gray-500">{label}</p>
      <p className="text-xl font-medium">{value}</p>
    </div>
  );
}
