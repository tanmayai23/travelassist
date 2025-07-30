import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Bookmark, X, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiscoveryCardProps {
  id: string;
  title: string;
  category: "nature" | "history" | "food" | "art" | "quirky";
  distance: string;
  detourTime: string;
  aiSummary: string;
  imageUrl: string;
  onSave: (id: string) => void;
  onDismiss: (id: string) => void;
  onNavigate: (id: string) => void;
}

const categoryIcons = {
  nature: "🌲",
  history: "🏛️",
  food: "🍽️",
  art: "🎨",
  quirky: "✨"
};

const categoryLabels = {
  nature: "Nature",
  history: "History", 
  food: "Local Eats",
  art: "Art & Culture",
  quirky: "Quirky"
};

export function DiscoveryCard({
  id,
  title,
  category,
  distance,
  detourTime,
  aiSummary,
  imageUrl,
  onSave,
  onDismiss,
  onNavigate
}: DiscoveryCardProps) {
  const [isExiting, setIsExiting] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(id);
    toast({
      title: "Saved to Journey Log",
      description: `${title} has been saved for later exploration.`,
    });
  };

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(id), 300);
  };

  const handleNavigate = () => {
    onNavigate(id);
    toast({
      title: "Opening Navigation",
      description: `Getting directions to ${title}...`,
    });
  };

  return (
    <div 
      className={`discovery-card transition-all duration-300 ${
        isExiting ? 'transform translate-x-full opacity-0' : ''
      }`}
    >
      {/* Hero Image */}
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="hero-image"
        />
        
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <div className={`category-icon category-${category}`}>
            {categoryIcons[category]}
          </div>
          <span className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            {categoryLabels[category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-card-foreground leading-tight pr-2">
            {title}
          </h3>
        </div>

        {/* Distance & Time */}
        <div className="flex items-center space-x-4 mb-4 text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{distance} ahead</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{detourTime} detour</span>
          </div>
        </div>

        {/* AI Summary */}
        <p className="text-muted-foreground leading-relaxed mb-6">
          {aiSummary}
        </p>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button 
            onClick={handleNavigate}
            className="discovery-button flex-1"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleSave}
            className="hover:bg-secondary"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}