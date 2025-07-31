import { useState, useEffect } from "react";
import { DiscoveryCard } from "./DiscoveryCard";

interface DiscoveryPlace {
  id: string;
  title: string;
  category: "nature" | "history" | "food" | "art" | "quirky";
  distance: string;
  detourTime: string;
  aiSummary: string;
  imageUrl: string;
  moods: string[];
}

// Mock data for demonstration
const mockDiscoveries: DiscoveryPlace[] = [
  {
    id: "1",
    title: "The Whispering Falls",
    category: "nature",
    distance: "12km",
    detourTime: "4 min",
    aiSummary: "Locals say this hidden waterfall is the most serene spot in the county. A short trail leads you to a view that most tourists speed right past.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    moods: ["nature", "peaceful", "rainy", "sunshine"]
  },
  {
    id: "2", 
    title: "Grandma's Secret Pie Shop",
    category: "food",
    distance: "8km",
    detourTime: "2 min",
    aiSummary: "Hidden in a converted garage, this family recipe has been drawing pie pilgrims for three generations. The apple cinnamon is legendary among truckers.",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    moods: ["hungry", "cafe", "rainy", "evening"]
  },
  {
    id: "3",
    title: "The Upside-Down House",
    category: "quirky", 
    distance: "15km",
    detourTime: "6 min",
    aiSummary: "Built by an eccentric artist in 1987, this gravity-defying house sits completely inverted. Visitors say walking through it is like entering another dimension.",
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    moods: ["adventure", "rainy", "evening", "sunshine"]
  },
  {
    id: "4",
    title: "Civil War Ghost Bridge",
    category: "history",
    distance: "20km", 
    detourTime: "8 min",
    aiSummary: "This 1864 stone bridge witnessed a pivotal battle. Local historians offer impromptu tours, and the sunset views are breathtaking.",
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
    moods: ["sunset", "evening", "peaceful", "nature"]
  },
  {
    id: "5",
    title: "Moonlight Diner",
    category: "food",
    distance: "5km",
    detourTime: "2 min",
    aiSummary: "This 24-hour chrome diner serves the best late-night comfort food. The neon signs reflect beautifully in rainy weather, creating a nostalgic atmosphere.",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    moods: ["rainy", "evening", "hungry", "cafe"]
  },
  {
    id: "6",
    title: "Sunrise Peak Lookout",
    category: "nature",
    distance: "18km",
    detourTime: "7 min",
    aiSummary: "A short hike rewards you with panoramic views perfect for catching the sunrise. The golden hour light transforms the entire valley below.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    moods: ["sunshine", "sunset", "nature", "adventure"]
  }
];

interface HorizonFeedProps {
  onSavePlace: (place: DiscoveryPlace) => void;
  selectedMood?: string | null;
}

export function HorizonFeed({ onSavePlace, selectedMood }: HorizonFeedProps) {
  const [visibleCards, setVisibleCards] = useState<DiscoveryPlace[]>([]);
  const [savedPlaces, setSavedPlaces] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Filter discoveries based on selected mood
    const filteredDiscoveries = selectedMood 
      ? mockDiscoveries.filter(place => place.moods.includes(selectedMood))
      : mockDiscoveries;

    // Simulate new discoveries appearing as user travels
    if (filteredDiscoveries.length > 0) {
      setVisibleCards([filteredDiscoveries[0]]);
      
      const intervals = filteredDiscoveries.slice(1).map((discovery, index) => 
        setTimeout(() => setVisibleCards(prev => [...prev, discovery]), (index + 1) * 3000)
      );

      return () => intervals.forEach(clearTimeout);
    } else {
      setVisibleCards([]);
    }
  }, [selectedMood]);

  const handleSave = (id: string) => {
    const place = visibleCards.find(p => p.id === id);
    if (place) {
      onSavePlace(place);
      setSavedPlaces(prev => new Set([...prev, id]));
    }
  };

  const handleDismiss = (id: string) => {
    setVisibleCards(prev => prev.filter(card => card.id !== id));
  };

  const handleNavigate = (id: string) => {
    // In a real app, this would open navigation
    console.log(`Navigating to place ${id}`);
  };

  if (visibleCards.length === 0) {
    const emptyMessage = selectedMood 
      ? `No ${selectedMood} spots found along your route right now. Try a different mood or keep driving to discover more!`
      : "We're scanning the road ahead for hidden gems and local treasures just for you.";
    
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-discovery/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛣️</span>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            {selectedMood ? `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Mode` : "Keep driving to discover"}
          </h3>
          <p className="text-muted-foreground max-w-sm">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-card-foreground">
          Discoveries Ahead
        </h2>
        <div className="text-sm text-muted-foreground">
          {visibleCards.length} spot{visibleCards.length !== 1 ? 's' : ''} found
        </div>
      </div>
      
      {visibleCards.map((card) => (
        <DiscoveryCard
          key={card.id}
          {...card}
          onSave={handleSave}
          onDismiss={handleDismiss}
          onNavigate={handleNavigate}
        />
      ))}
    </div>
  );
}