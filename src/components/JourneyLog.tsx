import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Bookmark, Eye } from "lucide-react";

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

interface JourneyLogProps {
  savedPlaces: SavedPlace[];
  onRemovePlace: (id: string) => void;
}

const categoryColors = {
  nature: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  history: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", 
  food: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  art: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  quirky: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
};

const categoryLabels = {
  nature: "Nature",
  history: "History", 
  food: "Local Eats",
  art: "Art & Culture",
  quirky: "Quirky"
};

export function JourneyLog({ savedPlaces, onRemovePlace }: JourneyLogProps) {
  const [activeTab, setActiveTab] = useState("saved");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (savedPlaces.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-discovery/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-discovery" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Your Journey Awaits
          </h3>
          <p className="text-muted-foreground mb-4">
            Save interesting places from your Horizon Feed to build your personal travel log.
          </p>
          <Badge variant="outline" className="text-xs">
            Start exploring to add your first discovery
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-card-foreground mb-2">
          Journey Log
        </h2>
        <p className="text-muted-foreground">
          Your collection of discovered treasures and saved spots.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="saved" className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4" />
            <span>Saved ({savedPlaces.length})</span>
          </TabsTrigger>
          <TabsTrigger value="visited" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Visited (0)</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          {savedPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden">
              <div className="flex">
                <img 
                  src={place.imageUrl} 
                  alt={place.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg leading-tight">
                          {place.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant="secondary" 
                            className={categoryColors[place.category]}
                          >
                            {categoryLabels[place.category]}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(place.savedAt)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemovePlace(place.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {place.aiSummary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {place.distance} away
                        </span>
                        <span>{place.detourTime} detour</span>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="visited" className="space-y-4">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Visited Places Yet
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Places you visit will appear here, creating a beautiful rearview mirror of your journey.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}