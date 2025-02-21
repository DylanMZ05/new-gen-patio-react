import { blogs } from "../Blogs/blogData";
import { Link } from "react-router-dom";

const BlogSection: React.FC = () => {

  const latestBlogs = [...blogs]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <section className="py-16 px-6 bg-gray-100 border-t-1 border-black/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-semibold text-2xl text-center skyblue">
          Blogs
        </h2>
        <h3 className="text-4xl font-semibold text-center text-black">
          Latest from Our Blogs
        </h3>
        <div className="w-25 h-1 background-skyblue mt-4 mb-6 mx-auto rounded-4xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover"/>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{blog.subtitle}</p>
                <Link 
                  to={`blog/${blog.id}`} 
                  className="text-blue-500 font-semibold mt-3 inline-block hover:underline"
                  onClick={handleScrollToTop}
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
