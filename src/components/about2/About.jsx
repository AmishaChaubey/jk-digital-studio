import React, { useState, useEffect } from "react";
import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import AboutJourney from "./AboutJourney";
import AboutValues from "./AboutValues";

import AboutCTA from "./AboutCTA";

import Mission from "./AboutMission";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
 useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <AboutHero isVisible={isVisible} />
      
      <AboutJourney />
    
      <AboutStats isVisible={isVisible} />
    
<Mission/>
  <AboutValues />

      <AboutCTA />
    </div>
  );
}
