"use client";

interface Company {
  id: string;
  name: string;
}

interface CompanyFilterSelectProps {
  companies: Company[];
  value: string;
  baseUrl: string;
  className?: string;
}

export function CompanyFilterSelect({ companies, value, baseUrl, className }: CompanyFilterSelectProps) {
  return (
    <select
      className={className}
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        const url = new URL(baseUrl, window.location.origin);
        if (!val) url.searchParams.delete("company");
        else url.searchParams.set("company", val);
        url.searchParams.set("page", "1");
        window.location.href = url.pathname + (url.search ? url.search : "");
      }}
    >
      <option value="">Todas as empresas</option>
      {companies.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
