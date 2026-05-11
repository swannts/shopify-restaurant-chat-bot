import Hero from "@/components/Hero";
import FeaturedDish from "@/components/FeaturedDish";
import FeaturedMenu from "@/components/FeaturedMenu";
import Services from "@/components/Services";
import ReservationCTA from "@/components/ReservationCTA";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <FeaturedDish />
      <FeaturedMenu />
      <Services />
      <ReservationCTA />
    </div>
  );
}
