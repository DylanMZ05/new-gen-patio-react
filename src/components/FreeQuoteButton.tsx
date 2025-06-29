import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/scrollToTop';

interface FreeQuoteButtonProps {
  questionText?: string;
  buttonText?: string;
  linkTo?: string;
}

const FreeQuoteButton: React.FC<FreeQuoteButtonProps> = ({
  questionText = "Do you want to get a Free Quote?",
  buttonText = "Get a Free Quote",
  linkTo = "/get-a-free-quote-houston",
}) => {
  const handleScrollToTop = useScrollToTop;

  return (
    <nav className="text-center mt-10">
      <p className="text-2xl font-semibold">{questionText}</p>
      <div className="flex justify-center">
        <Link
          to={linkTo}
          className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-4 py-1 rounded-full mt-4 mb-2 inline-block 
          transition-all hover:bg-orange-600 hover:scale-102"
          onClick={handleScrollToTop}
        >
          {buttonText}
        </Link>
      </div>
    </nav>
  );
};

export default FreeQuoteButton;
