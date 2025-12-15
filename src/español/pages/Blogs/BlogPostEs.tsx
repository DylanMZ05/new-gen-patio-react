import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// ✅ CORREGIDO: Usamos componentes ES
import BlockSectionEs from "../../components/BlockSectionEs";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import useScrollToTop from "../../../hooks/scrollToTop";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";
import type { BlogEs } from "./blogDataEs";

// === TRADUCCIÓN HELPER: Formatear texto con estilos Markdown simple ===
const formatTextWithStyles = (text: string) => {
  // El texto ya viene en español del blogDataEs
  return text.split(/(\*\*\*\*.*?\*\*\*\*|\*\*\*.*?\*\*\*|\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("****") && part.endsWith("****")) {
      // Título grande (h1/h2)
      return (
        <strong key={index} className="text-black text-3xl mt-4 block">
          {part.slice(4, -4)}
        </strong>
      );
    } else if (part.startsWith("***") && part.endsWith("***")) {
      // Subtítulo (h3)
      return (
        <strong key={index} className="text-black text-xl mt-3">
          {part.slice(3, -3)}
        </strong>
      );
    } else if (part.startsWith("**") && part.endsWith("**")) {
      // Negrita
      return <strong key={index} className="text-black font-semibold">{part.slice(2, -2)}</strong>;
    } else {
      return part;
    }
  });
};

// ✅ CORREGIDO: Renombramos el componente
const BlogPostEs: React.FC<BlogEs & { slug: string }> = ({
  title,
  metaTitle,
  subtitle,
  content,
  imageUrl,
  date,
  author,
  slug
}) => {
  const scrollToTop = useScrollToTop();

  // ✅ CORREGIDO: Formato de fecha en español
  const formattedDate = date
    ? new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Fecha Desconocida"; // ✅ Traducido

  const baseUrl = import.meta.env.BASE_URL || "/";
  const defaultImage = "/assets/images/default-placeholder.webp";
  const AUTHOR_PREFIX = ", por "; // ✅ Traducido

  const resolvedImageUrl = imageUrl
    ? (imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`)
    : `${baseUrl}${defaultImage}`;

  // La URL de la página debe incluir '/es' ya que estamos en la versión ES
  const pageUrl = `https://www.newgenpatio.com/blog/${slug}/es`;

  // ===== Evitar H1 duplicado =====
  const firstH1Index = content.findIndex((b) => b.type === "h1");
  const headerTitle =
    firstH1Index !== -1 && typeof (content[firstH1Index] as any).text === "string"
      ? (content[firstH1Index] as any).text
      : title;

  const contentWithoutFirstH1 =
    firstH1Index === -1 ? content : content.filter((_, idx) => idx !== firstH1Index);

  return (
    <>
      <Helmet>
        <title>{metaTitle || headerTitle}</title>
        <meta name="description" content={subtitle} />
        <meta property="og:title" content={metaTitle || headerTitle} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:image" content={resolvedImageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      {/* Lo dejamos tal cual pediste */}
      <BlockSectionEs /> {/* ✅ Componente ES */}

      <section>
        <img
          src={resolvedImageUrl}
          alt={`Imagen de portada del blog: ${headerTitle}`}
          loading="lazy"
          width={1200}
          height={600}
          className="w-full h-[45vh] object-cover mx-0 px-0"
          onError={(e) => (e.currentTarget.src = `${baseUrl}${defaultImage}`)}
        />

        <MarqueeBannerEs /> {/* ✅ Componente ES */}

        <article className="max-w-3xl mx-auto p-6">
          <header>
            <h1 className="text-3xl font-semibold mb-4">{headerTitle}</h1>
            <h2 className="text-xl text-black/80 mb-2">{subtitle}</h2>
            <p className="text-sm text-black/70 mb-4">
              {formattedDate}
              {author ? `${AUTHOR_PREFIX}${author}` : ""} {/* ✅ Usa prefijo traducido */}
            </p>
            <div className="w-full h-[3px] bg-[#0d4754] mx-auto rounded-full"></div>
          </header>

          {contentWithoutFirstH1.map((item, index) => {
            if (item.type === "text") {
              return (
                <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">
                  {formatTextWithStyles(item.text)}
                </p>
              );
            } else if (item.type === "image") {
              return (
                <img
                  key={index}
                  src={`${baseUrl}${item.image}`}
                  alt={`Ilustración para: ${headerTitle}`}
                  loading="lazy"
                  width={800}
                  height={400}
                  className="w-full object-cover aspect-[2/1] rounded-lg mt-4"
                  onError={(e) => (e.currentTarget.src = `${baseUrl}${defaultImage}`)}
                />
              );
            } else if (item.type === "link") {
              const { to, label } = item.link;
              // Aseguramos que los enlaces internos vayan a la versión ES
              const linkToEs = to.endsWith('/es') ? to : `${to}/es`;
              return (
                <p key={index} className="mt-4">
                  <Link
                    to={linkToEs}
                    onClick={scrollToTop}
                    className={`text-[#0d4754] font-bold hover:text-[#0d4754] ${
                      label.startsWith("****") ? "text-3xl block text-black" :
                      label.startsWith("***") ? "text-xl block text-black" :
                      label.startsWith("**") ? "font-semibold text-black/90" :
                      ""
                    }`}
                  >
                    {label.replace(/\*/g, "")}
                  </Link>
                </p>
              );
            } else if (item.type === "inlineText") {
              return (
                <p key={index} className="text-gray-700 mt-4">
                  {item.inlineText.map((part, i) => {
                    if (part.text) {
                      return <span key={i}>{formatTextWithStyles(part.text)}</span>;
                    } else if (part.link) {
                      const { to, label } = part.link;
                      const linkToEs = to.endsWith('/es') ? to : `${to}/es`; // Aseguramos '/es'
                      return (
                        <Link
                          key={i}
                          to={linkToEs}
                          onClick={scrollToTop}
                          className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                        >
                          {label}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </p>
              );
            } else if (item.type === "h2") {
              return (
                <h2 key={index} className="text-2xl font-semibold mt-6 text-black">
                  {item.text}
                </h2>
              );
            } else if (item.type === "h3") {
              return (
                <h3 key={index} className="text-xl font-semibold mt-4 text-black">
                  {item.text}
                </h3>
              );
            } else if (item.type === "linkedHeading") {
              const HeadingTag = item.level;
              const linkToEs = item.to.endsWith('/es') ? item.to : `${item.to}/es`; // Aseguramos '/es'
              return (
                <HeadingTag key={index} className="mt-6 text-black font-semibold text-2xl">
                  <Link
                    to={linkToEs}
                    onClick={scrollToTop}
                    className="text-[#0d4754] hover:underline"
                  >
                    {item.label}
                  </Link>
                </HeadingTag>
              );
            } else if (item.type === "sideBySide") {
              const imageFirst = item.imagePosition !== "right";
              return (
                <div key={index} className="flex flex-col md:flex-row gap-6 items-start mt-6">
                  {imageFirst && (
                    <img
                      src={`${baseUrl}${item.image}`}
                      alt="Ilustración" 
                      loading="lazy"
                      className="w-full md:w-1/2 h-full object-cover rounded-lg max-h-[100%]"
                      onError={(e) => (e.currentTarget.src = `${baseUrl}${defaultImage}`)}
                      style={{ maxHeight: "100%" }}
                    />
                  )}
                  <div className="flex-1 text-gray-700">
                    {item.textBlocks.map((block, i) => {
                      if (block.type === "h2") {
                        return (
                          <h2 key={i} className="text-2xl font-semibold text-black mb-2">
                            {block.text}
                          </h2>
                        );
                      } else if (block.type === "h3") {
                        return (
                          <h3 key={i} className="text-xl font-semibold text-black mb-2">
                            {block.text}
                          </h3>
                        );
                      } else if (block.type === "text") {
                        return (
                          <p key={i} className="mb-2 whitespace-pre-line">
                            {formatTextWithStyles(block.text)}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                  {!imageFirst && (
                    <img
                      src={`${baseUrl}${item.image}`}
                      alt="Ilustración" 
                      loading="lazy"
                      className="w-full md:w-1/2 rounded-lg object-cover"
                      onError={(e) => (e.currentTarget.src = `${baseUrl}${defaultImage}`)}
                    />
                  )}
                </div>
              );
            } else if (item.type === "freeQuote") {
              // Aseguramos que el link del FreeQuoteButton vaya a la versión ES
              const linkToEs = item.linkTo && item.linkTo.endsWith('/es') ? item.linkTo : `${item.linkTo}/es`;
              return (
                <div key={index} className="mt-10 mb-10">
                  <FreeQuoteButtonEs
                    questionText={item.questionText}
                    buttonText={item.buttonText}
                    linkTo={linkToEs}
                  />
                </div>
              );
            }

            return null;
          })}
        </article>
      </section>
    </>
  );
};

export default BlogPostEs;