import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";
import SellerDashboard from "@/components/SellerDashboard";
import BuyerDashboard from "@/components/BuyerDashboard";

export default function Dashboard() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Setting up your profile...</h2>
          <p className="text-muted-foreground">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  switch (profile.role) {
    case "admin":
      return <AdminDashboard />;
    case "seller":
      return <SellerDashboard />;
    case "buyer":
      return <BuyerDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
}