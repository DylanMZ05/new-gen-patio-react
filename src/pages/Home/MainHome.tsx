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
          content="Modern and durable aluminum patio covers and pergolas in Houston. Get expert installation and custom design for the ultimate outdoor living."
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
