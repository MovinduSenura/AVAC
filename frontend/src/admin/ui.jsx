import { useEffect } from "react";
import { STATUS_STYLES, capitalize } from "./utils";

const buttonVariants = {
  primary:
    "bg-[color:var(--avac-gold)] text-white hover:brightness-110 border border-transparent",
  secondary: "bg-white text-[#1f1f1f] border border-[#e5ddd0] hover:bg-[#faf7f1]",
  danger: "bg-white text-red-700 border border-red-200 hover:bg-red-50",
  success: "bg-white text-green-700 border border-green-200 hover:bg-green-50",
  ghost: "bg-transparent text-[#5f5f5f] border border-transparent hover:bg-black/5",
};

const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

export function Button({ variant = "primary", size = "md", className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}

// Same look as Button, for links (mailto:, tel:, external pages).
export function ButtonLink({ variant = "secondary", size = "sm", className = "", ...props }) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}

const controlClassName =
  "w-full rounded-lg border border-[#e5ddd0] bg-white px-3 text-sm text-[#1f1f1f] outline-none transition placeholder:text-[#9a9a9a] focus:border-[color:var(--avac-gold)] focus:ring-2 focus:ring-[#a77c2c]/20 disabled:bg-[#f5f5f5]";

export function Input({ className = "", ...props }) {
  return <input className={`h-10 ${controlClassName} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }) {
  return <textarea className={`py-2 leading-relaxed ${controlClassName} ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={`h-10 cursor-pointer ${controlClassName} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Field({ label, hint, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-[#3d3d3d]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[#8a8a8a]">{hint}</span>}
    </label>
  );
}

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-xl border border-[#ece6db] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1f1f1f]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#727272]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        STATUS_STYLES[status] ?? STATUS_STYLES.draft
      }`}
    >
      {capitalize(status)}
    </span>
  );
}

export function Alert({ children, tone = "error" }) {
  if (!children) return null;
  const styles =
    tone === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-800";
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}

export function Spinner({ className = "h-5 w-5" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block animate-spin rounded-full border-2 border-[#a77c2c]/25 border-t-[color:var(--avac-gold)] ${className}`}
    />
  );
}

export function LoadingState({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-[#727272]">
      <Spinner />
      {text}
    </div>
  );
}

export function EmptyState({ title, text }) {
  return (
    <div className="px-6 py-14 text-center">
      <p className="font-medium text-[#1f1f1f]">{title}</p>
      {text && <p className="mt-1 text-sm text-[#727272]">{text}</p>}
    </div>
  );
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="mb-4 flex gap-1 overflow-x-auto rounded-lg bg-[#efe9de] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition ${
            value === tab.value
              ? "bg-white text-[#1f1f1f] shadow-sm"
              : "text-[#6b6b6b] hover:text-[#1f1f1f]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function Pagination({ page, pageSize, total, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (total <= pageSize) return null;
  return (
    <div className="flex items-center justify-between border-t border-[#ece6db] px-4 py-3 text-sm text-[#727272]">
      <span>
        Page {page} of {totalPages} ({total} total)
      </span>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative flex h-full w-full flex-col bg-white shadow-xl ${wide ? "max-w-2xl" : "max-w-lg"}`}
      >
        <div className="flex items-center justify-between border-b border-[#ece6db] px-6 py-4">
          <h2 className="text-lg font-semibold text-[#1f1f1f]">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function TableShell({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({ children, className = "" }) {
  return (
    <th className={`border-b border-[#ece6db] bg-[#faf8f4] px-4 py-3 text-xs font-semibold tracking-wide text-[#727272] uppercase ${className}`}>
      {children}
    </th>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`border-b border-[#f1ece3] px-4 py-3 align-middle ${className}`}>{children}</td>;
}
