import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Save, Upload, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const COUNTRY_CODES = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+33", country: "FR" },
  { code: "+49", country: "DE" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  { code: "+7", country: "RU" },
  { code: "+55", country: "BR" },
];

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: user?.user_metadata?.full_name || "",
    gender: user?.user_metadata?.gender || "",
    age: user?.user_metadata?.age || "",
    phone: user?.user_metadata?.phone || "",
    country_code: user?.user_metadata?.country_code || "+1",
    email: user?.email || "",
    avatar_url: user?.user_metadata?.avatar_url || "",
  });

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.full_name,
          gender: profileData.gender,
          age: profileData.age,
          phone: profileData.phone,
          country_code: profileData.country_code,
          avatar_url: profileData.avatar_url,
        },
      });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, we'll just create a local URL
      // In a real app, you'd upload to Supabase Storage
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, avatar_url: imageUrl }));
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-black/60 border-purple-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center gap-2 justify-center">
              <User className="w-6 h-6 text-purple-400" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.avatar_url} />
                <AvatarFallback className="bg-purple-600 text-white text-xl">
                  {profileData.full_name
                    ? getInitials(profileData.full_name)
                    : "U"}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer border-purple-500 text-purple-300 hover:bg-purple-950"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Picture
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  value={profileData.full_name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      full_name: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-300">
                  Gender
                </Label>
                {isEditing ? (
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) =>
                      setProfileData((prev) => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    value={profileData.gender || "Not set"}
                    disabled
                    className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                  />
                )}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-300">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={profileData.age}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, age: e.target.value }))
                  }
                  disabled={!isEditing}
                  className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                />
              </div>

              {/* Phone Number with Country Code */}
              <div className="space-y-2">
                <Label className="text-gray-300">Phone Number</Label>
                <div className="flex gap-2">
                  {isEditing ? (
                    <Select
                      value={profileData.country_code}
                      onValueChange={(value) =>
                        setProfileData((prev) => ({
                          ...prev,
                          country_code: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-24 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((item) => (
                          <SelectItem key={item.code} value={item.code}>
                            {item.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={profileData.country_code}
                      disabled
                      className="w-24 bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                    />
                  )}
                  <Input
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    placeholder="Phone number"
                    className="flex-1 bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                />
                <p className="text-xs text-gray-400">
                  Email cannot be changed from this page
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-red-500 text-red-400 hover:bg-red-950"
              >
                Sign Out
              </Button>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
