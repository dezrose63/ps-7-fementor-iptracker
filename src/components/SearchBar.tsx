import { useState, type FormEvent, type ChangeEvent } from "react";

type Props = { onSearch: (query: string) => void; loading?: boolean };

export default function SearchBar({ onSearch, loading }: Props) {
  const [q, setQ] = useState<string>("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (q.trim()) onSearch(q.trim());
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-xl overflow-hidden rounded-xl shadow-lg"
    >
      <input
        value={q}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
        placeholder="Search for any IP address or domain"
        className="flex-1 bg-white p-4 text-lg outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="grid w-14 place-items-center bg-black hover:opacity-80 disabled:opacity-50"
        aria-label="Search"
      >
        <img src="/src/assets/icon-arrow.svg" alt="" />
      </button>
    </form>
  );
}
