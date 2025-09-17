import { Helmet } from "react-helmet-async";

import Main from "./Main";
import MarqueeBanner from "../../components/MarqueeBanner";
import Services from "./services/services";
import HowWeDoItHome from "./HowWeDoItHome";
import OurProcessHome from "./OurPromiseHome";
import AboutUsHome from "./AboutUsHome";
import Clients from "./Clients";
import FAQ from "./FAQ/FAQ";
import BlogsSection from "./BlogsSection";

// --- Keywords provistas (orden de mayor a menor relevancia) ---
const KEYWORDS_RAW = [
  "build pergola",
  "pergola builds",
  "build a carport",
  "patio builders",
  "pergola companies",
  "build patio cover",
  "patio contractor",
  "patio roof covers",
  "patio roofs and covers",
  "patio covers houston",
  "shade cover",
  "patio builder houston",
  "outdoor covering",
  "pergola companies",
  "outdoor build",
  "outdoor patio sunshade",
  "patio cover installation",
  "patio porch",
  "patio remodeling",
  "building a screened in porch",
  "patio cover builders",
  "patio living",
  "texas shade",
  "back patio cover",
  "backyard cover",
  "cover for back patio",
  "patio cover contractors",
  "custom patio",
  "custom patio covers",
  "lean to patio cover",
  "patio cover custom",
  "screened in porch contractors near me",
  "covered decks and patios",
  "covers for decks and patios",
  "outdoor patio roof",
  "outdoor roof for patio",
  "outdoor roof patio",
  "outdoor structures",
  "structure outdoor",
  "texas patio",
  "screened in porch builders near me",
  "outdoor patio builders",
  "patio company",
  "pergola contractor",
  "pergola builder houston",
  "patio roof contractors",
  "build your own pergola",
  "covered patio contractors",
  "backyard patio builders",
  "custom pergola builders near me",
  "patio cover company",
  "companies that build pergolas",
  "contractor to build covered patio",
  "custom build pergola",
  "custom patio builders near me",
  "deck and pergola builders near me",
  "patio builders in my area",
  "patio roof builders near me",
  "aluminum pergola companies near me",
  "companies that install pergolas",
  "covered patio companies near me",
  "metal pergola companies",
  "pergola installation companies",
  "outdoor pergola company",
  "pergola construction company near me",
  "aluminum patio roof contractors",
  "patio roof contractor"
];

// --- Si son demasiadas, corta las últimas (solo si hace falta) ---
const MAX_KW = 25; // ajustá este número si querés más/menos keywords
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW)); // preserva orden
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const MainHome = () => {
  return (
    <>
      <Helmet>
        <title>New Gen Patio | Aluminum Pergolas & Patio Covers Houston</title>
        <meta
          name="description"
          content="Your Houston home's outdoor potential is realized with New Gen Patio's custom solutions. Luxury aluminum pergolas and covered patios are designed and built by our team. Get your free quote!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link rel="canonical" href="https://www.newgenpatio.com/" />
      </Helmet>

      <main>
        <Main />
        <div className="h-3"></div>
        <MarqueeBanner />
        <Services />
        <hr className="text-black/20" />
        <HowWeDoItHome />
        <OurProcessHome />
        <AboutUsHome />
        <Clients />
        <FAQ />
        <BlogsSection />
        <MarqueeBanner />
      </main>
    </>
  );
};

export default MainHome;
