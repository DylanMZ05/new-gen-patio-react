// src/pages/Blogs/BlogCardSlider.tsx
import { blogs } from "../Blogs/blogData";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider/SliderBlogs";

const BlogCardSlider: React.FC = () => {
  const latestBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const baseUrl = import.meta.env.BASE_URL || "/";

  const blogSlides = latestBlogs.map((blog) => {
    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div key={blog.id} className="h-full flex">
        <Link
          to={`/blog/${blog.slug}`}
          className="h-[420px] flex flex-col justify-between w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <figure className="w-full h-52">
            <img
              src={`${baseUrl}${blog.imageUrl}`}
              alt={blog.title}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.currentTarget.src = "/assets/images/default-placeholder.webp")
              }
            />
          </figure>

          <div className="flex flex-col justify-between flex-grow p-5">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                {blog.subtitle}
              </p>
            </div>
            <div className="text-right mt-4">
              <span className="text-gray-500 text-sm">{formattedDate}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <section
      id="blogs"
      aria-labelledby="blogs-heading"
      className="py-16 px-6 bg-gray-200 border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <p id="blogs-heading" className="text-2xl font-semibold text-[#0d4754]">
            Our Blogs
          </p>
          <p className="text-4xl font-semibold text-black">
            Latest Insights & Outdoor Living Ideas
          </p>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mx-auto rounded-full"></div>
        </header>

        <Slider items={blogSlides} slidesPerView={{ base: 1, md: 2, xl: 3 }} />
      </div>
    </section>
  );
};

export default BlogCardSlider;
