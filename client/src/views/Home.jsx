import Banner1 from "../components/landingPageComps/Banner";
import FooterPage from "../components/landingPageComps/Footer";
import Hero from "../components/landingPageComps/Hero";
import Services from "../components/landingPageComps/Services";
import Testimonials from "../components/landingPageComps/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Banner1 />
      <Testimonials />
      <FooterPage />
    </>
  );
};

export default Home;
