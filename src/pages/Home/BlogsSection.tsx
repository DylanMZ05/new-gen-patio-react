import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  Suspense,
  lazy,
  useState,
} from "react";
import { blogs } from "../Blogs/blogData";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

// Lazy del slider (reduce JS inicial)
const Slider = lazy(() => import("../../components/Slider/SliderBlogs"));

/* ========================= Prefetch helpers ========================= */
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const type = String(conn?.effectiveType || "").toLowerCase();
    if (type.includes("2g") || type.includes("slow-2g")) return false;
  }
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return false;
  return true;
};

const runIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1500 });
  else setTimeout(cb, 300);
};

/**
 * Prefetch robusto del chunk de la página detalle (dinámica /blog/:slug)
 * - Usa import.meta.glob para no depender de la carpeta exacta.
 */
let blogPagePrefetched = false;
const blogPageModules = import.meta.glob([
  "../**/BlogPage*.tsx",
  "../**/BlogPage*.jsx",
  "../../**/BlogPage*.tsx",
  "../../**/BlogPage*.jsx",
]);
const prefetchBlogPageChunk = () => {
  if (blogPagePrefetched || !canPrefetch()) return;
  const paths = Object.keys(blogPageModules);
  if (!paths.length) return;
  blogPagePrefetched = true;
  (blogPageModules[paths[0]] as () => Promise<unknown>)().catch(() => {
    blogPagePrefetched = false; // permitir reintento si falla
  });
};

/**
 * Prefetch del chunk del Slider cuando se aproxima
 * (por si el dynamic import aún no está resuelto).
 */
let sliderPrefetched = false;
const prefetchSliderChunk = () => {
  if (sliderPrefetched || !canPrefetch()) return;
  sliderPrefetched = true;
  import("../../components/Slider/SliderBlogs").catch(() => {
    sliderPrefetched = false;
  });
};
/* =================================================================== */

const BlogCardSlider: React.FC = () => {
  // Ordenamos una sola vez (blogs es estático)
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

  // Warm-up de imágenes de las primeras N tarjetas para suavizar el primer scroll
  const warmUpImages = (urls: string[], max = 6) => {
    runIdle(() => {
      for (let i = 0; i < Math.min(max, urls.length); i++) {
        const img = new Image();
        (img as HTMLImageElement).decoding = "async";
        img.src = urls[i];
      }
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const near = entries.some((e) => e.isIntersecting || e.intersectionRatio > 0);
        if (near) {
          // Se acerca → prefetch en idle (slider + página detalle)
          runIdle(prefetchSliderChunk);
          runIdle(prefetchBlogPageChunk);

          // Warm-up de imágenes (primeras tarjetas)
          const firstImgs = latestBlogs.map((b) => `${baseUrl}${encodeURI(b.imageUrl)}`);
          warmUpImages(firstImgs, 6);

          // Y habilitamos el render del slider
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px", threshold: [0, 0.05] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [latestBlogs, baseUrl]);

  const blogSlides = useMemo(
    () =>
      latestBlogs.map((blog) => {
        const dateObj = new Date(blog.date);
        const formattedDate = isNaN(dateObj.getTime())
          ? blog.date
          : dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

        // respeta BASE_URL y evita problemas con espacios/& en nombres
        const imgSrc = `${baseUrl}${encodeURI(blog.imageUrl)}`;

        return (
          <div key={blog.id} className="h-full flex">
            <Link
              to={`/blog/${blog.slug}`}
              onClick={scrollToTop}
              onPointerEnter={() => runIdle(prefetchBlogPageChunk)}
              onFocus={() => runIdle(prefetchBlogPageChunk)}
              onTouchStart={() => runIdle(prefetchBlogPageChunk)}
              className="
                h-[420px] flex flex-col justify-between w-full bg-white
                border border-gray-300 rounded-lg shadow-md overflow-hidden
                hover:scale-[1.02] transition-transform
                motion-reduce:transform-none motion-reduce:transition-none
              "
              aria-label={`Read blog: ${blog.title}`}
              data-gtm="blog_card"
            >
              <figure className="w-full h-52">
                <img
                  src={imgSrc}
                  alt={`Cover image for blog post: ${blog.title}`}
                  loading="lazy"
                  decoding="async"
                  width={600}  // tamaño intrínseco aproximado
                  height={208} // h-52 ≈ 208px
                  sizes="(min-width:1280px) 360px, (min-width:768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                  draggable={false}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement & {
                      dataset: Record<string, string>;
                    };
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
      className="
        py-16 px-6 bg-gray-200 border-t border-black/10
        [content-visibility:auto] [contain-intrinsic-size:520px]
      "
      style={{ contain: "content" as any, minHeight: 360 }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h2 id="blogs-heading" className="text-2xl font-semibold text-[#0d4754]">
            NEW GEN PATIO BLOGS
          </h2>
          <p className="text-4xl font-semibold text-black">
            Latest Insights & Outdoor Living Ideas
          </p>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mx-auto rounded-full" aria-hidden="true" />
        </header>

        {/* Montaje diferido del slider */}
        {visible ? (
          <Suspense
            fallback={
              // Placeholder liviano con la altura del carrusel
              <div className="min-h-[420px]" aria-hidden="true" />
            }
          >
            <Slider items={blogSlides} slidesPerView={{ base: 1, md: 2, xl: 3 }} />
          </Suspense>
        ) : (
          <div className="min-h-[420px]" aria-hidden="true" />
        )}
      </div>
    </section>
  );
};

export default memo(BlogCardSlider);
