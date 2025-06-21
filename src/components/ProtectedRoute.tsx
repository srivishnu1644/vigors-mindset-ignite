
import { useAuth } from "@/hooks/useAuth";
import { Auth } from "@/components/Auth";
import { Dashboard } from "@/components/Dashboard";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="text-white text-xl">Loading your transformation...</div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Auth />;
};
