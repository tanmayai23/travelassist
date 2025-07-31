import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";

interface RouteInputProps {
  onRouteSet: (from: string, to: string) => void;
  currentRoute?: { from: string; to: string };
}

export function RouteInput({ onRouteSet, currentRoute }: RouteInputProps) {
  const [from, setFrom] = useState(currentRoute?.from || "");
  const [to, setTo] = useState(currentRoute?.to || "");

  const handleSetRoute = () => {
    if (from.trim() && to.trim()) {
      onRouteSet(from.trim(), to.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="w-5 h-5" />
          <span>Your Journey</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="from"
              placeholder="Starting location"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="to"
              placeholder="Destination"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Button 
          onClick={handleSetRoute}
          className="w-full"
          disabled={!from.trim() || !to.trim()}
        >
          Set Route
        </Button>

        {currentRoute && (
          <div className="mt-4 p-3 bg-discovery/10 rounded-lg">
            <div className="text-sm font-medium text-discovery">Current Route</div>
            <div className="text-sm text-muted-foreground">
              {currentRoute.from} → {currentRoute.to}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}