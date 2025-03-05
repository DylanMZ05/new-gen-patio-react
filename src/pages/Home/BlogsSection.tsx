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
    <section
      id="blogs"
      aria-labelledby="blogs-heading"
      className="py-16 px-6 bg-gray-100 border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center">
          <h2 id="blogs-heading" className="text-2xl font-semibold text-[#0d4754]">
            Our Blog
          </h2>
          <h3 className="text-4xl font-semibold text-black">
            Latest Insights & Outdoor Living Ideas
          </h3>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-6 mx-auto rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              aria-labelledby={`blog-title-${blog.id}`}
            >
              <figure className="w-full h-48">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <figcaption className="sr-only">{blog.title}</figcaption>
              </figure>
              <div className="p-5">
                <h3 id={`blog-title-${blog.id}`} className="text-xl font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{blog.subtitle}</p>
                <Link
                  to={`blog/${blog.id}`}
                  className="text-blue-500 font-semibold mt-3 inline-block hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onClick={handleScrollToTop}
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
