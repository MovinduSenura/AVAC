import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./authContext";

function AuthProvider({ children }) {
  // undefined = still checking the saved session
  const [session, setSession] = useState(supabase ? undefined : null);
  const [profileState, setProfileState] = useState({ userId: null, profile: null });

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id ?? null;

  useEffect(() => {
    if (!userId) return;
    let isActive = true;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (isActive) setProfileState({ userId, profile: data ?? null });
      });
    return () => {
      isActive = false;
    };
  }, [userId]);

  const profileLoaded = !userId || profileState.userId === userId;
  const profile = userId && profileState.userId === userId ? profileState.profile : null;

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    isAdmin: profile?.role === "admin",
    loading: session === undefined || !profileLoaded,
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
