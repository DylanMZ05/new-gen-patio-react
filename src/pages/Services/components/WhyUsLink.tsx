import { Link } from 'react-router-dom';
import useScrollToTop from '../../../hooks/scrollToTop';

type WhyUsLinkProps = {
  backgroundImage: string;
}

const WhyUsLink = ({ backgroundImage }: WhyUsLinkProps) => {
  const scrollToTop = (useScrollToTop)

  return (
    <div className='relative w-full flex flex-col items-center justify-center bg-cover bg-center bg-fixed' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div id="our-promise" className="w-full bg-black/60 py-[50px] px-[25px]">

        <h3 className="font-semibold text-4xl text-white">Why Us?</h3>
        <div className="w-25 h-1 bg-orange-600 mt-4 mb-3 rounded-4xl"></div>
        <p className="max-w-[800px] text-md text-white/80 mb-4">At New Gen Patio, we bring your outdoor vision to life with expert craftsmanship and sustainable solutions. We provide complimentary estimates, 3D designs, and custom plans to ensure a seamless process from concept to completion. Our maintenance-free aluminum structures, backed by a 5-year warranty, offer unmatched durability and aesthetic appeal.</p>
        <Link to="/howwedoit" className="text-black bg-white text-xl font-semibold px-5 pt-1 pb-2 rounded-4xl mt-5 transition-all hover:bg-white/90 hover:scale-102" onClick={scrollToTop}>View More</Link>
      </div>
    </div>
  )
}

export default WhyUsLink