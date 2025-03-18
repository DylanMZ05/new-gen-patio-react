import BlockSection from "../../components/BlockSection";
import MarqueeBanner from "../../components/MarqueeBanner";

const formatTextWithStyles = (text: string) => {
  return text.split(/(\*\*\*\*.*?\*\*\*\*|\*\*\*.*?\*\*\*|\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("****") && part.endsWith("****")) {
      return (
        <strong key={index} className="text-black text-3xl mt-4">
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
      return <strong key={index} className="text-black/90">{part.slice(2, -2)}</strong>;
    } else {
      return part;
    }
  });
};

const BlogPost: React.FC<{ 
  title: string; 
  subtitle: string; 
  content: { text?: string; image?: string }[]; 
  imageUrl: string; 
  date: string; 
}> = ({ title, subtitle, content, imageUrl, date }) => {
  
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Unknown Date";

  // Asegurar que las imágenes tengan la URL correcta
  const baseUrl = import.meta.env.BASE_URL || "/";
  const defaultImage = "/assets/images/default-placeholder.webp"; // Imagen de respaldo si la imagen principal falla
  const resolvedImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : `${baseUrl}${defaultImage}`;

  console.log("BlogPost Image URL:", resolvedImageUrl);

  return (
    <>
      <BlockSection />
      <section>
        {/* Imagen principal */}
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
            <h2 className="text-xl text-black/80 mb-3">{subtitle}</h2>
            <div className="w-full h-[3px] bg-[#0d4754] mx-auto rounded-full"></div>
          </header>

          {/* Contenido y manejo de imágenes intercaladas */}
          {content.map((item, index) => {
            if (item.text) {
              return (
                <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">
                  {formatTextWithStyles(item.text)}
                </p>
              );
            } else if (item.image) {
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
            }
            return null;
          })}
          
          <p className="text-gray-600 text-md mt-5">{formattedDate}</p>
        </article>
      </section>
    </>
  );
};

export default BlogPost;