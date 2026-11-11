import { useEffect, useEffectEvent, useState } from "react";

export const APPLICATION_STATUSES = ["new", "contacted", "rejected", "selected"];
export const REVIEW_STATUSES = ["pending", "approved", "rejected"];
export const PAGE_SIZE = 20;

export const STATUS_STYLES = {
  new: "bg-blue-50 text-blue-700 ring-blue-200",
  contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  selected: "bg-green-50 text-green-700 ring-green-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-green-50 text-green-700 ring-green-200",
  draft: "bg-gray-100 text-gray-700 ring-gray-200",
  published: "bg-green-50 text-green-700 ring-green-200",
  admin: "bg-[#f6efe2] text-[#7a5a1f] ring-[#e6d6b8]",
  staff: "bg-gray-100 text-gray-700 ring-gray-200",
};

export function capitalize(text) {
  return text ? text[0].toUpperCase() + text.slice(1) : "";
}

export function formatDate(value, withTime = false) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

// Removes characters that have a meaning in PostgREST filter strings.
export function cleanSearchTerm(text) {
  return text.replace(/[%,()*\\:."']/g, " ").trim();
}

export async function getErrorMessage(error) {
  // Edge Function errors carry the response with our { error } message.
  if (error?.context && typeof error.context.json === "function") {
    try {
      const body = await error.context.json();
      if (body?.error) return body.error;
    } catch {
      // fall through
    }
  }
  return error?.message || "Something went wrong. Please try again.";
}

// Loads data whenever `key` changes. Keeps the previous data while
// reloading, and exposes setData for optimistic updates.
export function useAdminQuery(load, key) {
  const [reloadCount, setReloadCount] = useState(0);
  const [state, setState] = useState({ key: null, data: null, error: "" });
  const requestKey = `${key}#${reloadCount}`;
  const runLoad = useEffectEvent(() => load());

  useEffect(() => {
    let isActive = true;
    runLoad().then(
      (data) => {
        if (isActive) setState({ key: requestKey, data, error: "" });
      },
      async (error) => {
        const message = await getErrorMessage(error);
        if (isActive) setState((current) => ({ ...current, key: requestKey, error: message }));
      },
    );
    return () => {
      isActive = false;
    };
  }, [requestKey]);

  return {
    data: state.data,
    error: state.error,
    loading: state.key !== requestKey,
    reload: () => setReloadCount((count) => count + 1),
    setData: (update) =>
      setState((current) => ({
        ...current,
        data: typeof update === "function" ? update(current.data) : update,
      })),
  };
}
