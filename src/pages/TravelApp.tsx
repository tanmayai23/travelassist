import { useState, useEffect } from "react";
import { HorizonFeed } from "@/components/HorizonFeed";
import { JourneyLog } from "@/components/JourneyLog";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Moon, Sun, Settings, User } from "lucide-react";

interface SavedPlace {
  id: string;
  title: string;
  category: "nature" | "history" | "food" | "art" | "quirky";
  distance: string;
  detourTime: string;
  aiSummary: string;
  imageUrl: string;
  savedAt: Date;
}

export default function TravelApp() {
  const [activeTab, setActiveTab] = useState("discover");
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode for night driving

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSavePlace = (place: any) => {
    const savedPlace: SavedPlace = {
      ...place,
      savedAt: new Date()
    };
    setSavedPlaces(prev => [savedPlace, ...prev]);
  };

  const handleRemovePlace = (id: string) => {
    setSavedPlaces(prev => prev.filter(place => place.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "discover":
        return <HorizonFeed onSavePlace={handleSavePlace} />;
      case "saved":
        return <JourneyLog savedPlaces={savedPlaces} onRemovePlace={handleRemovePlace} />;
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />;
      default:
        return <HorizonFeed onSavePlace={handleSavePlace} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border glass-surface sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-discovery rounded-lg flex items-center justify-center">
              <span className="text-discovery-foreground font-bold text-sm">AT</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-card-foreground">Travel Assist</h1>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Highway 101 North</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-discovery/10 text-discovery border-discovery/20">
              En Route
            </Badge>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-8 h-8 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

// Profile Tab Component
function ProfileTab() {
  return (
    <div className="flex-1 p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-discovery/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-discovery" />
            </div>
            <div>
              <CardTitle>Adventure Awaits</CardTitle>
              <p className="text-muted-foreground">Road trip enthusiast</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-card-foreground">0</div>
              <div className="text-xs text-muted-foreground">Places Visited</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-card-foreground">0</div>
              <div className="text-xs text-muted-foreground">Miles Explored</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-card-foreground">0</div>
              <div className="text-xs text-muted-foreground">Hidden Gems</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Travel Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Hidden History</Badge>
            <Badge variant="secondary">Local Eats</Badge>
            <Badge variant="secondary">Scenic Views</Badge>
            <Badge variant="secondary">Weird & Wonderful</Badge>
          </div>
          <Button variant="outline" className="w-full">
            Update Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ isDarkMode, onToggleDarkMode }: { 
  isDarkMode: boolean; 
  onToggleDarkMode: (dark: boolean) => void; 
}) {
  return (
    <div className="flex-1 p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Night Mode</div>
              <div className="text-sm text-muted-foreground">
                Optimized for night driving
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleDarkMode(!isDarkMode)}
            >
              {isDarkMode ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discovery Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-Discover</div>
              <div className="text-sm text-muted-foreground">
                Automatically find places along your route
              </div>
            </div>
            <Badge variant="outline" className="text-discovery">Enabled</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Discovery Range</div>
              <div className="text-sm text-muted-foreground">
                How far ahead to scan for places
              </div>
            </div>
            <Badge variant="outline">25km</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Travel Assist</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your AI-powered co-pilot for discovering the hidden stories and secret spots 
            of the world, transforming every journey into an adventure.
          </p>
          <div className="mt-4 text-xs text-muted-foreground">
            Version 1.0.0 • Made for curious travelers
          </div>
        </CardContent>
      </Card>
    </div>
  );
}