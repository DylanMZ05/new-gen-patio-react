import { useParams, Link } from "react-router-dom";
import { blogs } from "./blogData";
import BlogPost from "./BlogPost";

const BlogPage: React.FC = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (!blog) {
    return <p className="text-center text-red-500 text-2xl">Blog not found</p>;
  }

  const latestBlogs = blogs.slice(-4).reverse(); // Últimos 4 blogs ordenados por fecha

  return (
    <>
      <BlogPost {...blog} />

      <section className="py-16 px-6 bg-gray-100 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
            Latest from Our Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={blog.imageUrl} alt={blog.title} loading="lazy" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{blog.subtitle}</p>
                  <Link 
                    to={`/blog/${blog.id}`} 
                    className="text-[#0d4754] font-semibold mt-3 inline-block hover:underline focus:ring-2 focus:ring-[#0d4754] focus:outline-none"
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
    </>
  );
};

export default BlogPage;
