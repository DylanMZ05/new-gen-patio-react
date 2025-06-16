import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlockSection from "../../components/BlockSection";
import MarqueeBanner from "../../components/MarqueeBanner";
import useScrollToTop from "../../hooks/scrollToTop";
import type { Blog } from "./blogData";

const formatTextWithStyles = (text: string) => {
  return text.split(/(\*\*\*\*.*?\*\*\*\*|\*\*\*.*?\*\*\*|\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("****") && part.endsWith("****")) {
      return (
        <strong key={index} className="text-black text-3xl mt-4 block">
          {part.slice(4, -4)}
        </strong>
      );
    } else if (part.startsWith("***") && part.endsWith("***")) {
      return (
        <strong key={index} className="text-black text-xl mt-3">
          {part.slice(3, -3)}
        </strong>
      );
    } else if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="text-black font-semibold">{part.slice(2, -2)}</strong>;
    } else {
      return part;
    }
  });
};

const BlogPost: React.FC<Blog & { slug: string }> = ({
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

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  const baseUrl = import.meta.env.BASE_URL || "/";
  const defaultImage = "/assets/images/default-placeholder.webp";

  const resolvedImageUrl = imageUrl
    ? (imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`)
    : `${baseUrl}${defaultImage}`;

  const pageUrl = `https://www.newgenpatio.com/blog/${slug}`;

  return (
    <>
      <Helmet>
        <title>{metaTitle || title}</title>
        <meta name="description" content={subtitle} />
        <meta property="og:title" content={metaTitle || title} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:image" content={resolvedImageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      <BlockSection />

      <section>
        <img
          src={resolvedImageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-[45vh] object-cover mx-0 px-0"
          onError={(e) => (e.currentTarget.src = `${baseUrl}${defaultImage}`)}
        />

        <MarqueeBanner />

        <article className="max-w-3xl mx-auto p-6">
          <header>
            <h1 className="text-3xl font-semibold mb-4">{title}</h1>
            <h2 className="text-xl text-black/80 mb-2">{subtitle}</h2>
            <p className="text-sm text-black/70 mb-4">
              {formattedDate}
              {author ? `, by ${author}` : ""}
            </p>
            <div className="w-full h-[3px] bg-[#0d4754] mx-auto rounded-full"></div>
          </header>

          {content.map((item, index) => {
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
                  alt={`Blog image ${index + 1}`}
                  loading="lazy"
                  className="w-full object-cover aspect-[2/1] rounded-lg mt-4"
                  onError={(e) => (e.currentTarget.src = `${baseUrl}${defaultImage}`)}
                />
              );
            } else if (item.type === "link") {
              const { to, label } = item.link;
              return (
                <p key={index} className="mt-4">
                  <Link
                    to={to}
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
                      return (
                        <Link
                          key={i}
                          to={to}
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
              return (
                <HeadingTag key={index} className="mt-6 text-black font-semibold text-2xl">
                  <Link
                    to={item.to}
                    onClick={scrollToTop}
                    className="text-[#0d4754] hover:underline"
                  >
                    {item.label}
                  </Link>
                </HeadingTag>
              );
            }
            return null;
          })}
        </article>
      </section>
    </>
  );
};

export default BlogPost;
