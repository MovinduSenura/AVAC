import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../authContext";
import { Alert, Card, EmptyState, LoadingState, PageHeader, StatusBadge } from "../ui";
import { formatDate, useAdminQuery } from "../utils";

async function countRows(table, filter) {
  let query = supabase.from(table).select("id", { count: "exact", head: true });
  if (filter) query = query.eq(filter[0], filter[1]);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function loadDashboard() {
  const [
    newApplications,
    totalApplications,
    pendingTestimonials,
    pendingComments,
    subscribers,
    publishedPosts,
    recent,
  ] = await Promise.all([
    countRows("applications", ["status", "new"]),
    countRows("applications"),
    countRows("testimonials", ["status", "pending"]),
    countRows("blog_comments", ["status", "pending"]),
    countRows("subscribers"),
    countRows("blog_posts", ["status", "published"]),
    supabase
      .from("applications")
      .select("id, full_name, email, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  if (recent.error) throw recent.error;

  return {
    stats: [
      { label: "New applications", value: newApplications, to: "/admin/applications", highlight: true },
      { label: "Total applications", value: totalApplications, to: "/admin/applications" },
      { label: "Testimonials to review", value: pendingTestimonials, to: "/admin/testimonials", highlight: true },
      { label: "Comments to review", value: pendingComments, to: "/admin/comments", highlight: true },
      { label: "Subscribers", value: subscribers, to: "/admin/subscribers" },
      { label: "Published posts", value: publishedPosts, to: "/admin/blog" },
    ],
    recent: recent.data,
  };
}

function DashboardPage() {
  const { profile } = useAuth();
  const { data, error, loading } = useAdminQuery(loadDashboard, "dashboard");

  return (
    <>
      <PageHeader
        title={`Welcome${profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}`}
        description="Here's what's happening on the website."
      />
      <Alert>{error}</Alert>

      {loading && !data ? (
        <LoadingState />
      ) : (
        data && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.stats.map((stat) => (
                <Link key={stat.label} to={stat.to}>
                  <Card className="p-5 transition hover:border-[#d9c8a8]">
                    <p className="text-sm text-[#727272]">{stat.label}</p>
                    <p
                      className={`mt-2 text-3xl font-bold ${
                        stat.highlight && stat.value > 0
                          ? "text-[color:var(--avac-gold)]"
                          : "text-[#1f1f1f]"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>

            <Card className="mt-6">
              <div className="flex items-center justify-between border-b border-[#ece6db] px-5 py-4">
                <h2 className="font-semibold">Latest applications</h2>
                <Link to="/admin/applications" className="text-sm font-medium text-[color:var(--avac-gold)]">
                  View all
                </Link>
              </div>
              {data.recent.length === 0 ? (
                <EmptyState title="No applications yet" />
              ) : (
                <ul>
                  {data.recent.map((application) => (
                    <li
                      key={application.id}
                      className="flex items-center justify-between gap-4 border-b border-[#f1ece3] px-5 py-3 last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{application.full_name}</p>
                        <p className="truncate text-xs text-[#8a8a8a]">{application.email}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden text-xs text-[#8a8a8a] sm:inline">
                          {formatDate(application.created_at, true)}
                        </span>
                        <StatusBadge status={application.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </>
        )
      )}
    </>
  );
}

export default DashboardPage;
