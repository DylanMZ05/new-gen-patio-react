import { Link } from 'react-router-dom';

const HowWeDoItHome: React.FC = () => {
    return (
        <section id="our-promise" className="flex flex-col items-center justfy-center py-[50px] px-[25px] border-t-1 border-t-black/20">
            <h2 className="font-semibold text-4xl text-center">Our Commitment to Quality & Sustainability</h2>
            <div className="w-25 h-1 background-skyblue mt-4 mb-3 rounded-4xl"></div>
            <p className="max-w-[800px] text-md">At New Gen Patio, we bring your outdoor vision to life with expert craftsmanship and sustainable solutions. We provide complimentary estimates, 3D designs, and custom plans to ensure a seamless process from concept to completion. Our maintenance-free aluminum structures, backed by a 5-year warranty, offer unmatched durability and aesthetic appeal. Committed to sustainability, we use 100% recyclable materials, minimizing environmental impact while enhancing your outdoor space. Our experienced team handles permits and maintains clear communication throughout the project, ensuring a stress-free experience. Your satisfaction is our priority, and we won't rest until your dream outdoor space is a reality.</p>
            <Link to='/howwedoit' className="text-white bg-black text-xl font-semibold px-5 pt-1 pb-2 rounded-4xl mt-5">
                Learn More
            </Link>
        </section>
    )
}

export default HowWeDoItHome;