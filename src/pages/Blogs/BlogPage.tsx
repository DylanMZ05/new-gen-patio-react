
import { useParams } from "react-router-dom";
import { blogs } from "./blogData";
import BlogPost from "./BlogPost";
import BlogSection from "../Home/BlogsSection";
import MarqueeBanner from "../../components/MarqueeBanner";

const BlogPage: React.FC = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));




  if (!blog) {
    return <p className="text-center text-red-500 text-2xl">Blog not found</p>;
  }

  return (
    <>
      <BlogPost {...blog} />
      <MarqueeBanner />
      <BlogSection />
    </>
  );
};

export default BlogPage;