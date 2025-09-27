// src/pages/Blogs/BlogCardSlider.tsx
import React, { memo, useEffect, useMemo, useRef, Suspense, lazy, useState } from "react";
import { blogs } from "../Blogs/blogData";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

// Lazy del slider (reduce JS inicial)
const Slider = lazy(() => import("../../components/Slider/SliderBlogs"));

// Prefetch del chunk de la página de blog (dinámica /blog/:slug)
let blogPagePrefetched = false;
const prefetchBlogPageChunk = () => {
  if (blogPagePrefetched) return;
  blogPagePrefetched = true;
  // Caminos relativos: este archivo está en src/pages/Blogs/
  import("../Blogs/BlogPage").catch(() => { blogPagePrefetched = false; });
};

const BlogCardSlider: React.FC = () => {
  // Ordena una sola vez (blogs es un array estático importado)
  const latestBlogs = useMemo(
    () =>
      [...blogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const scrollToTop = useScrollToTop();
  const baseUrl = import.meta.env.BASE_URL || "/";

  // Montaje diferido: renderiza el Slider SOLO cuando está visible
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const idle = (cb: () => void) =>
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(cb, { timeout: 1200 })
        : setTimeout(cb, 300);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          // si aparece en viewport, prefetch también el chunk de detalle
          idle(() => prefetchBlogPageChunk());
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const blogSlides = useMemo(
    () =>
      latestBlogs.map((blog) => {
        const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const imgSrc = `${baseUrl}${blog.imageUrl}`; // respeta BASE_URL si deployas en subpath

        return (
          <div key={blog.id} className="h-full flex">
            <Link
              to={`/blog/${blog.slug}`}
              onClick={scrollToTop}
              onMouseEnter={prefetchBlogPageChunk}
              onFocus={prefetchBlogPageChunk}
              onTouchStart={prefetchBlogPageChunk}
              className="h-[420px] flex flex-col justify-between w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:scale-[1.02] transition-transform"
              aria-label={`Read blog: ${blog.title}`}
            >
              <figure className="w-full h-52">
                <img
                  src={imgSrc}
                  alt={`Cover image for blog post: ${blog.title}`}
                  loading="lazy"
                  decoding="async"
                  width={600}  // diseño estimado; mantener proporción del cover
                  height={208} // tailwind h-52 ≈ 208px
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement & { dataset: Record<string, string> };
                    if (img.dataset.fallbackApplied) return;
                    img.dataset.fallbackApplied = "1";
                    img.src = `${baseUrl}assets/images/default-placeholder.webp`;
                  }}
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
      }),
    [latestBlogs, baseUrl, scrollToTop]
  );

  return (
    <section
      ref={sectionRef}
      id="blogs"
      role="region"
      aria-labelledby="blogs-heading"
      className="py-16 px-6 bg-gray-200 border-t border-black/10"
      style={{ contain: "content" as any }} // aísla el layout interno (micro anti-CLS)
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h2 id="blogs-heading" className="text-2xl font-semibold text-[#0d4754]">
            NEW GEN PATIO BLOGS
          </h2>
          <p className="text-4xl font-semibold text-black">
            Latest Insights & Outdoor Living Ideas
          </p>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mx-auto rounded-full" />
        </header>

        {/* Montaje diferido del slider */}
        {visible ? (
          <Suspense fallback={<div className="min-h-[420px]" aria-hidden="true" />}>
            <Slider items={blogSlides} slidesPerView={{ base: 1, md: 2, xl: 3 }} />
          </Suspense>
        ) : (
          // Placeholder liviano hasta que el bloque entra en viewport
          <div className="min-h-[420px]" aria-hidden="true" />
        )}
      </div>
    </section>
  );
};

export default memo(BlogCardSlider);
