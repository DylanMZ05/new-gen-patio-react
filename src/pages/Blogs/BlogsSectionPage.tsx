import { Link } from "react-router-dom";
import { blogs } from "../Blogs/blogData";
import MarqueeBanner from "../../components/MarqueeBanner";
import FreeQuoteButton from "../../components/FreeQuoteButton";
import { Helmet } from "react-helmet-async";

const BlogsSectionPage: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const maxSubtitleLength = 100;
  const baseUrl = import.meta.env.BASE_URL || "/";
  const defaultImage = "/assets/images/default-placeholder.webp"; // Imagen de respaldo

  return (
    <>
      <Helmet>
        <title>Outdoor Living Blog | New Gen Patio</title>
        <meta 
          name="description" 
          content="Discover outdoor living ideas, patio cover trends, and expert tips in our blog. Stay inspired with the latest updates from New Gen Patio." 
        />
        <link rel="canonical" href="https://www.newgenpatio.com/blogs" />
      </Helmet>

      <section className="pt-16 pb-10 px-6 bg-gray-200 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <header className="text-center">
            <h1 className="text-2xl font-semibold text-[#0d4754]">NEW GEN PATIO BLOGS</h1>
            <h2 className="text-4xl font-semibold text-black">
              Latest Insights & Outdoor Living Ideas
            </h2>
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

              const resolvedImageUrl = blog.imageUrl?.startsWith("http")
                ? blog.imageUrl
                : `${baseUrl}${blog.imageUrl}`;

              return (
                <article
                  key={blog.slug}
                  className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
                  aria-labelledby={`blog-title-${blog.slug}`}
                >
                  <Link to={`/blog/${blog.slug}`} onClick={handleScrollToTop} className="block">
                    <figure className="w-full h-64">
                      <img
                        src={resolvedImageUrl}
                        alt={`Blog post: ${blog.title}`}
                        loading="lazy"
                        width={800} // Ajustá según diseño real (thumbnail, posiblemente 800x400)
                        height={400}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = defaultImage)}
                      />
                      <figcaption className="sr-only">{blog.title}</figcaption>
                    </figure>
                    <div className="p-5">
                      <h3 id={`blog-title-${blog.slug}`} className="text-xl font-semibold text-gray-800">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm">
                        {blog.subtitle.length > maxSubtitleLength
                          ? `${blog.subtitle.substring(0, maxSubtitleLength)}...`
                          : blog.subtitle}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-gray-500 text-sm text-right">{formattedDate}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
        <FreeQuoteButton 
          questionText="Ready to transform your outdoor space?"
          buttonText="Request Your Free Estimate"
        />
      </section>
      <MarqueeBanner />
    </>
  );
};

export default BlogsSectionPage;