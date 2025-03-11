import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "./blogData";
import BlogPost from "./BlogPost";

const BlogPage: React.FC = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  const [visibleBlogs, setVisibleBlogs] = useState(window.innerWidth < 768 ? 2 : 4);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateVisibleBlogs = (event: MediaQueryListEvent) => {
      setVisibleBlogs(event.matches ? 2 : 4);
    };

    mediaQuery.addEventListener("change", updateVisibleBlogs);
    return () => mediaQuery.removeEventListener("change", updateVisibleBlogs);
  }, []);

  const latestBlogs = blogs.slice(-visibleBlogs).reverse();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (!blog) {
    return <p className="text-center text-red-500 text-2xl">Blog not found</p>;
  }

  return (
    <>
      <BlogPost {...blog} />

      <section className="py-16 px-6 bg-gray-100 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
            Latest from Our Blogs
          </h2>

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
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  style={{ gridRow: index >= 2 ? "span 1 / span 1" : "auto" }} // Forzar 2 filas en desktop
                >
                  <img src={blog.imageUrl} alt={blog.title} loading="lazy" className="w-full h-64 object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{blog.subtitle}</p>

                    {/* Contenedor flex para alinear botón y fecha */}
                    <div className="flex justify-between items-center mt-3">
                      <Link 
                        to={`/blog/${blog.id}`} 
                        className="text-[#0d4754] font-semibold hover:underline focus:ring-2 focus:ring-[#0d4754] focus:outline-none"
                        onClick={handleScrollToTop}
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
    </>
  );
};

export default BlogPage;