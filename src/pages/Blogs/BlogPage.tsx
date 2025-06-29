
import { useParams } from "react-router-dom";
import { blogs } from "./blogData";
import BlogPost from "./BlogPost";
import BlogSection from "../Home/BlogsSection";
import MarqueeBanner from "../../components/MarqueeBanner";
import FreeQuoteButton from "../../components/FreeQuoteButton";

const BlogPage: React.FC = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);




  if (!blog) {
    return <p className="text-center text-red-500 text-2xl">Blog not found</p>;
  }

  return (
    <>
      <BlogPost {...blog} />
      <FreeQuoteButton 
        questionText="Ready to transform your outdoor space?"
        buttonText="Request Your Free Estimate"
      />
      <div className="h-6"></div>
      <MarqueeBanner />
      <BlogSection />
    </>
  );
};

export default BlogPage;