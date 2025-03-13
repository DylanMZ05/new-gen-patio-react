import { Link } from "react-router-dom";
import { blogs } from "../Blogs/blogData";

const BlogsSectionPage: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const maxSubtitleLength = 100;

  return (
    <section className="py-16 px-6 bg-gray-200 border-t border-black/10">
      <div className="max-w-6xl mx-auto">
        <header className="text-center">
          <h2 className="text-2xl font-semibold text-[#0d4754]">Our Blog</h2>
          <h3 className="text-4xl font-semibold text-black">Latest Insights & Outdoor Living Ideas</h3>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-6 mx-auto rounded-full"></div>
        </header>

        {/* Grid con ajuste para blogs impares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.map((blog) => {
            const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <article
                key={blog.id}
                className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <img src={blog.imageUrl} alt={blog.title} loading="lazy" className="w-full h-64 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {blog.subtitle.length > maxSubtitleLength 
                      ? `${blog.subtitle.substring(0, maxSubtitleLength)}...` 
                      : blog.subtitle}
                  </p>

                  {/* Flex para mantener alineado el botón y la fecha */}
                  <div className="flex justify-between items-center mt-3">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-blue-600 font-semibold hover:underline focus:ring-2 focus:ring-[#0d4754] focus:outline-none"
                      onClick={handleScrollToTop}
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read More →
                    </Link>
                    <span className="text-gray-500 text-sm text-right">{formattedDate}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogsSectionPage;