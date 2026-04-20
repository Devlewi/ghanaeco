
import SearchContent from "@/app/ui/SearchContent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "GHANA-ECO | MOTEUR DE RECHERCHE",
  description: "Recherchez et explorez tous les derniers articles disponibles.",
};

export default function Page() {
  return <SearchContent />;
}
