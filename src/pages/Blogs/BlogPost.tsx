import BlockSection from "../../components/BlockSection";

const BlogPost: React.FC<{ 
  title: string; 
  subtitle: string; 
  content: string[]; 
  imageUrl: string; 
  secondaryImage?: string; 
  moreContent?: string[]; 
  finalImage?: string; 
  lastContent?: string[];
  date: string; 
}> = ({ title, subtitle, content, imageUrl, secondaryImage, moreContent, finalImage, lastContent, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Unknown Date";

  return (
    <>
      <BlockSection />
      <section>
        {/* Imagen principal */}
        <img 
          src={imageUrl} 
          alt={title} 
          loading="lazy" 
          className="w-full h-[45vh] object-cover mx-0 px-0"
        />

        <article className="max-w-3xl mx-auto p-6">
          <header>
            <h1 className="text-3xl font-semibold">{title}</h1>
            <h2 className="text-xl text-gray-600">{subtitle}</h2>
          </header>

          {/* Contenido principal */}
          {content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
          ))}

          {/* Imagen secundaria (Opcional) */}
          {secondaryImage && (
            <img src={secondaryImage} alt={`Additional view of ${title}`} loading="lazy" className="w-full h-auto object-cover rounded-lg mt-4" />
          )}

          {/* Más contenido (Opcional) */}
          {moreContent?.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
          ))}

          {/* Imagen final (Opcional) */}
          {finalImage && (
            <img src={finalImage} alt={`Final perspective of ${title}`} loading="lazy" className="w-full h-auto object-cover rounded-lg mt-4" />
          )}

          {/* Último contenido (Opcional) */}
          {lastContent?.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
          ))}
          
          <p className="text-gray-500 text-sm mt-2">{formattedDate}</p>
        </article>
      </section>
    </>
  );
};

export default BlogPost;