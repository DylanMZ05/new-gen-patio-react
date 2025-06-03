import { Helmet } from "react-helmet";

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
        <title>New Gen Patio | Enhance Your Outdoor Living | Cover Patio Builders</title>
        <meta
          name="description"
          content="Transform your outdoor space with modern aluminum patios and custom pergolas in Houston. Discover premium designs, materials, and expert installation."
        />
      </Helmet>

      <main>
        <Main />
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
