import { Link } from "react-router-dom";
// ✅ CORREGIDO: Usamos la data de los blogs en español
import { blogsEs } from "./blogDataEs";
// ✅ CORREGIDO: Usamos componentes ES
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";
import { Helmet } from "react-helmet-async";
// ❌ ELIMINADO: import { useTranslation } from "react-i18next"; 

const BlogsSectionPageEs: React.FC = () => {
  // ❌ ELIMINADO: const { t, i18n } = useTranslation(['blog', 'common']);
  
  // Usamos español fijo para el formato de fecha
  const currentLang = 'es-ES';

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const maxSubtitleLength = 100;
  const baseUrl = import.meta.env.BASE_URL || "/";
  const defaultImage = "/assets/images/default-placeholder.webp"; 
  
  // === TEXTOS TRADUCIDOS FIJOS ===
  const SEO_TITLE = "Blog de Vida Exterior | Ideas de Diseño de Patios y Pérgolas | New Gen Patio";
  const SEO_DESCRIPTION = "Tu fuente de inspiración para la vida al aire libre. Descubre ideas de diseño, consejos de expertos y las últimas tendencias para patios, pérgolas y cocinas exteriores.";
  const HEADER_TITLE_SMALL = "BLOG DE NEW GEN PATIO";
  const HEADER_TITLE_LARGE = "Últimas Noticias e Ideas de Vida Exterior";
  const BLOG_ALT_PREFIX = "Publicación de blog: ";
  const CTA_QUESTION = "¿Listo para transformar tu espacio exterior?";
  const CTA_BUTTON_TEXT = "Solicita Tu Presupuesto Gratuito";
  
  // NOTA: Usamos blogsEs en lugar de blogs
  const blogsData = blogsEs; 

  return (
    <>
      <Helmet>
        {/* ✅ Traducción: Título de la página */}
        <title>{SEO_TITLE}</title>
        {/* ✅ Traducción: Descripción SEO */}
        <meta 
          name="description" 
          content={SEO_DESCRIPTION} 
        />
        {/* ✅ Ajuste de canonical a la ruta ES */}
        <link rel="canonical" href="https://www.newgenpatio.com/blog/es" />
      </Helmet>

      <section className="pt-16 pb-10 px-6 bg-gray-200 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <header className="text-center">
            {/* ✅ Traducción: Título Pequeño (h1) */}
            <h1 className="text-2xl font-semibold text-[#0d4754]">
              {HEADER_TITLE_SMALL}
            </h1>
            {/* ✅ Traducción: Título Grande (h2) */}
            <h2 className="text-4xl font-semibold text-black">
              {HEADER_TITLE_LARGE}
            </h2>
            <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-6 mx-auto rounded-full"></div>
          </header>

          {/* Grid con ajuste para blogs impares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogsData.map((blog) => {
              // ✅ CORREGIDO: Formato de fecha en español
              const formattedDate = new Date(blog.date).toLocaleDateString(currentLang, {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              const resolvedImageUrl = blog.imageUrl?.startsWith("http")
                ? blog.imageUrl
                : `${baseUrl}${blog.imageUrl}`;

              // ✅ CORREGIDO: La ruta del enlace debe ser '/blog/:slug/es'
              const linkTo = `/blog/${blog.slug}/es`;

              return (
                <article
                  key={blog.slug}
                  className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
                  aria-labelledby={`blog-title-${blog.slug}`}
                >
                  <Link to={linkTo} onClick={handleScrollToTop} className="block">
                    <figure className="w-full h-64">
                      <img
                        src={resolvedImageUrl}
                        alt={`${BLOG_ALT_PREFIX} ${blog.title}`} // ✅ Traducido
                        loading="lazy"
                        width={800} 
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
        <FreeQuoteButtonEs // ✅ Componente ES
          questionText={CTA_QUESTION} // ✅ Traducido
          buttonText={CTA_BUTTON_TEXT} // ✅ Traducido
          linkTo="/get-a-free-quote-houston/es" // Aseguramos la ruta ES
        />
      </section>
      <MarqueeBannerEs /> {/* ✅ Componente ES */}
    </>
  );
};

export default BlogsSectionPageEs;