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

const MainHome = () => {
  return (
    <>
      <Helmet>
        <title>New Gen Patio | Aluminum Pergolas & Patio Covers Houston</title>
        <meta
          name="description"
          content="Design-build experts in Houston crafting custom aluminum pergolas, covered patios, and outdoor kitchens. Modern, durable, and turnkey installation. Get a free quote."
        />
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
