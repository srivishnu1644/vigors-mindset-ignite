import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, ChevronLeft, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: { label: string; path: string }[];
}

const MENU: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Goals",
    path: "/goals",
    subItems: [
      { label: "Set/View Goals", path: "/goals" },
      { label: "Goals Reports", path: "/goals-reports" },
    ],
  },
  {
    label: "Progress",
    path: "/progress",
  },
  {
    label: "Training",
    subItems: [
      { label: "Training Options", path: "/training-options" },
      { label: "Video Training", path: "/video-training" },
      { label: "Normal Training", path: "/start-workout" },
      { label: "Food Preparation", path: "/food-preparation" },
    ],
  },
  {
    label: "Health",
    subItems: [
      { label: "Health Insights", path: "/health" },
      { label: "BMI Reports", path: "/bmi-reports" },
      { label: "Body Analysis", path: "/body-analysis" },
    ],
  },
  {
    label: "Workout Reports",
    path: "/workout-reports",
  },
  {
    label: "Accessories",
    path: "/my-cart",
  },
  {
    label: "Profile",
    path: "/profile",
  },
];

export function DashboardMenu() {
  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState<MenuItem | null>(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleMainClick = (item: MenuItem) => {
    if (item.subItems) {
      setSelectedMenu(item);
    } else if (item.path) {
      setOpen(false);
      navigate(item.path);
    }
  };

  const handleSubItemClick = (path: string) => {
    setOpen(false);
    setSelectedMenu(null);
    navigate(path);
  };

  const handleBack = () => {
    setSelectedMenu(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false);
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

  return (
    <>
      <Button
        aria-label="Open menu"
        size="icon"
        variant="ghost"
        className="rounded-full text-white hover:bg-gray-800 md:ml-2"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[300px] p-0 bg-gray-900 border-gray-700"
        >
          <SheetHeader className="border-b px-6 py-4 bg-black/50">
            {!selectedMenu ? (
              <SheetTitle className="text-lg text-white flex items-center gap-2">
                <Menu className="w-5 h-5" /> Menu
              </SheetTitle>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <button
                  className="rounded hover:bg-gray-800 p-1"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-lg">{selectedMenu.label}</span>
              </div>
            )}
          </SheetHeader>
          <div className="p-6 space-y-2">
            {!selectedMenu ? (
              <>
                {MENU.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between px-3 py-3 rounded hover:bg-gray-800 text-white text-left"
                    onClick={() => handleMainClick(item)}
                  >
                    <span className="text-base">{item.label}</span>
                    {item.subItems ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : null}
                  </button>
                ))}
                <div className="border-t border-gray-700 pt-2 mt-4">
                  <button
                    className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-red-900/20 text-red-400 text-left"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-base">Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                {selectedMenu.subItems?.map((sub) => (
                  <button
                    key={sub.label}
                    className="w-full text-left px-3 py-3 rounded hover:bg-gray-800 text-white"
                    onClick={() => handleSubItemClick(sub.path)}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default DashboardMenu;
