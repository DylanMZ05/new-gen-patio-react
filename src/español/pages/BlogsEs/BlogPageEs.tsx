import { useParams } from "react-router-dom";
// ✅ CORREGIDO: Usamos la data de los blogs en español
import { blogsEs } from "./blogDataEs"; 
// ✅ CORREGIDO: Usamos el componente de vista de publicación en español (asumiendo que existe)
import BlogPostEs from "./BlogPostEs";
// ✅ CORREGIDO: Usamos componentes de sección en español
import BlogSectionEs from "../HomeEs/BlogsSectionEs"; 
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";

const BlogPageEs: React.FC = () => {
  // Se espera que el slug sea la versión traducida (ej: "como-aumentar-valor-con-patio-cubierto-aluminio")
  const { slug } = useParams();
  
  // ✅ Usamos la data traducida
  const blog = blogsEs.find((b) => b.slug === slug);

  // === TEXTOS TRADUCIDOS ===
  const NOT_FOUND_MESSAGE = "Publicación de blog no encontrada";
  const QUOTE_QUESTION = "¿Listo para transformar tu espacio exterior?";
  const QUOTE_BUTTON_TEXT = "Solicita Tu Presupuesto Gratuito";


  if (!blog) {
    // ✅ Traducido
    return <p className="text-center text-red-500 text-2xl">{NOT_FOUND_MESSAGE}</p>;
  }

  return (
    <>
      {/* ✅ Usamos el componente en español */}
      <BlogPostEs {...blog} /> 
      <FreeQuoteButtonEs 
        questionText={QUOTE_QUESTION} // ✅ Traducido
        buttonText={QUOTE_BUTTON_TEXT} // ✅ Traducido
      />
      <div className="h-6"></div>
      {/* ✅ Usamos componentes en español */}
      <MarqueeBannerEs />
      <BlogSectionEs />
    </>
  );
};

export default BlogPageEs;