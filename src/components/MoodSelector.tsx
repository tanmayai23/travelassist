import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string | null) => void;
}

const moods = [
  { id: "rainy", label: "Rainy", emoji: "🌧️", description: "Cozy indoor spots" },
  { id: "cafe", label: "Café Vibes", emoji: "☕", description: "Coffee & conversation" },
  { id: "evening", label: "Evening", emoji: "🌆", description: "Night-time magic" },
  { id: "sunset", label: "Sunset", emoji: "🌅", description: "Golden hour views" },
  { id: "sunshine", label: "Sunshine", emoji: "☀️", description: "Bright outdoor fun" },
  { id: "hungry", label: "Hungry", emoji: "🍽️", description: "Local food spots" },
  { id: "nature", label: "Nature", emoji: "🌲", description: "Fresh air & trails" },
  { id: "adventure", label: "Adventure", emoji: "⛰️", description: "Thrilling experiences" },
  { id: "peaceful", label: "Peaceful", emoji: "🧘", description: "Quiet & serene" },
];

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span>What's Your Mood?</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedMood === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onMoodSelect(null)}
          >
            All Moods
          </Badge>
          {moods.map((mood) => (
            <Badge
              key={mood.id}
              variant={selectedMood === mood.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onMoodSelect(mood.id)}
            >
              <span className="mr-1">{mood.emoji}</span>
              {mood.label}
            </Badge>
          ))}
        </div>
        
        {selectedMood && (
          <div className="mt-4 p-3 bg-discovery/10 rounded-lg">
            <div className="text-sm font-medium text-discovery">
              {moods.find(m => m.id === selectedMood)?.label} Mode
            </div>
            <div className="text-sm text-muted-foreground">
              {moods.find(m => m.id === selectedMood)?.description}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}