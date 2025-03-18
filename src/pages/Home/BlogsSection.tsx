import { blogs } from "../Blogs/blogData";
import { Link } from "react-router-dom";
import { useVisibleBlogs } from "../../hooks/useVisibleBlogs";

const BlogSection: React.FC = () => {
  const visibleBlogs = useVisibleBlogs(); // Usamos el hook
  const latestBlogs = [...blogs]
    .sort((a, b) => b.id - a.id)
    .slice(0, visibleBlogs); // Mostramos solo la cantidad definida en el hook

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const maxSubtitleLength = 100;

  return (
    <section
      id="blogs"
      aria-labelledby="blogs-heading"
      className="py-16 px-6 bg-gray-200 border-t border-black/10"
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

        {/* Grid: 2 columnas y 2 filas en escritorio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {latestBlogs.map((blog, index) => {
            const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <article
                key={blog.id}
                className="bg-white border border-gray-600/60 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] cursor-pointer"
                style={{ gridRow: index >= 2 ? "span 1 / span 1" : "auto" }} // Forzar 2 filas en desktop
                aria-labelledby={`blog-title-${blog.id}`}
              >
                {/* Envolvemos todo el contenido del artículo dentro de un Link */}
                <Link
                  to={`/blog/${blog.id}`}
                  className="block"
                  onClick={handleScrollToTop}
                >
                  <figure className="w-full h-48">
                    <img
                      src={`${import.meta.env.BASE_URL}${blog.imageUrl}`}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "/assets/images/default-placeholder.webp")}
                    />
                    <figcaption className="sr-only">{blog.title}</figcaption>
                  </figure>
                  <div className="p-5">
                    <h3 id={`blog-title-${blog.id}`} className="text-xl font-semibold text-gray-800">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm">
                      {blog.subtitle.length > maxSubtitleLength 
                        ? `${blog.subtitle.substring(0, maxSubtitleLength)}...` 
                        : blog.subtitle}
                    </p>
                    {/* Contenedor flex para alinear botón y fecha */}
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
    </section>
  );
};

export default BlogSection;