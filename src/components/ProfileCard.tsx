
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";

type ProfileCardProps = {
  user: any;
  onLogout: () => void;
};

export function ProfileCard({ user, onLogout }: ProfileCardProps) {
  return (
    <Card className="bg-black/90 border-purple-500/20 max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5 text-purple-400" />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Name */}
        <div className="mb-1">
          <span className="text-gray-400">Name:</span>{" "}
          <span className="text-white font-medium">
            {user?.user_metadata?.full_name || "Not set"}
          </span>
        </div>
        {/* Age */}
        <div className="mb-1">
          <span className="text-gray-400">Age:</span>{" "}
          <span className="text-white font-medium">
            {user?.user_metadata?.age || "Not set"}
          </span>
        </div>
        {/* Gender */}
        <div className="mb-1">
          <span className="text-gray-400">Gender:</span>{" "}
          <span className="text-white font-medium">
            {user?.user_metadata?.gender || "Not set"}
          </span>
        </div>
        {/* Phone */}
        <div className="mb-1">
          <span className="text-gray-400">Phone:</span>{" "}
          <span className="text-white font-medium">
            {user?.user_metadata?.phone || "Not set"}
          </span>
        </div>
        {/* Email */}
        <div className="mb-4">
          <span className="text-gray-400">Email:</span>{" "}
          <span className="text-white font-medium">
            {user?.email || "Not set"}
          </span>
        </div>
        {/* Logout button */}
        <Button
          variant="outline"
          className="w-full border-gray-700 text-red-400 hover:text-white hover:bg-red-500/10"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
