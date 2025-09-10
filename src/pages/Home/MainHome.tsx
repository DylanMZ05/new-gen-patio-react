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
          content="Your Houston home's outdoor potential is realized with New Gen Patio's custom solutions. Luxury aluminum pergolas and covered patios are designed and built by our team. Get your free quote!"
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
