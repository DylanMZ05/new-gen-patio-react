import { Link } from 'react-router-dom';
import useScrollToTop from '../../hooks/scrollToTop';

const AboutUs: React.FC = () => {
  const handleScrollToTop = useScrollToTop();

  return (
    <section
      id="who-we-are"
      className="relative flex flex-col items-center justify-center py-[50px] px-[25px]
            bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('assets/images/Free3.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/90"></div>

      <div className="relative text-white max-w-[900px] px-4">
        <h2 className="font-semibold text-4xl text-center">
          About New Gen Patio: Custom Outdoor Living Experts
        </h2>
        <div className="w-25 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-4xl"></div>
        <p className="text-md">
          At New Gen Patio, we specialize in designing and building custom patio
          covers that enhance outdoor living spaces across Texas. Our mission is
          to transform backyards into stunning, functional environments with
          high-quality craftsmanship and innovative designs.
          <br />
          <br />
          Whether you envision a cozy retreat or a luxurious entertainment area,
          our expert team brings your outdoor dreams to life. With a focus on
          durability, style, and personalization, we ensure that every project
          exceeds expectations.
        </p>
        <Link
          to="aboutus"
          className="text-black bg-white text-xl font-semibold px-5 pt-1 pb-2 rounded-4xl mt-5 inline-block"
          onClick={handleScrollToTop}
        >
          Discover Our Story
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
