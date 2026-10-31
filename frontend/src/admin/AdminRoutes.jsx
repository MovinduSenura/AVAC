import { Navigate, Route, Routes } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import AuthProvider from "./AuthProvider";
import { useAuth } from "./authContext";
import AdminLayout from "./AdminLayout";
import { Button, LoadingState } from "./ui";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import BlogPostEditorPage from "./pages/BlogPostEditorPage";
import CommentsPage from "./pages/CommentsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import SubscribersPage from "./pages/SubscribersPage";
import StaffPage from "./pages/StaffPage";
import AccountPage from "./pages/AccountPage";

function FullScreenMessage({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-4 text-[#1f1f1f]">
      <div className="max-w-md rounded-xl border border-[#ece6db] bg-white p-8 text-center">
        {children}
      </div>
    </div>
  );
}

function RequireStaff({ children }) {
  const { loading, session, profile, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f0]">
        <LoadingState />
      </div>
    );
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!profile) {
    return (
      <FullScreenMessage>
        <p className="font-semibold">No admin access</p>
        <p className="mt-2 text-sm text-[#727272]">
          This account is not a staff member. Ask an admin to add you from the Staff page.
        </p>
        <Button className="mt-5" variant="secondary" onClick={signOut}>
          Sign out
        </Button>
      </FullScreenMessage>
    );
  }
  return children;
}

function RequireAdmin({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin" replace />;
}

function AdminRoutes() {
  if (!isSupabaseConfigured) {
    return (
      <FullScreenMessage>
        <p className="font-semibold">Supabase is not configured</p>
        <p className="mt-2 text-sm text-[#727272]">
          Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend/.env and restart the dev
          server.
        </p>
      </FullScreenMessage>
    );
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <RequireStaff>
              <AdminLayout />
            </RequireStaff>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="blog" element={<BlogPostsPage />} />
          <Route path="blog/new" element={<BlogPostEditorPage />} />
          <Route path="blog/:postId" element={<BlogPostEditorPage />} />
          <Route path="comments" element={<CommentsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="subscribers" element={<SubscribersPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route
            path="staff"
            element={
              <RequireAdmin>
                <StaffPage />
              </RequireAdmin>
            }
          />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AdminRoutes;
