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
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="pt-[100px]">
      <article className="max-w-3xl mx-auto p-6">
        <img src={imageUrl} alt={title} loading="lazy" className="w-full h-64 object-cover rounded-t-lg mb-4" />
        <header>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <h2 className="text-xl text-gray-600">{subtitle}</h2>
        </header>

        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
        ))}

        {secondaryImage && (
          <img src={secondaryImage} alt="Additional view" loading="lazy" className="w-full h-auto object-cover rounded-lg mt-4" />
        )}

        {moreContent?.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
        ))}

        {finalImage && (
          <img src={finalImage} alt="Final perspective" loading="lazy" className="w-full h-auto object-cover rounded-lg mt-4" />
        )}

        {lastContent?.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
        ))}
        
        <p className="text-gray-500 text-sm mt-2">{formattedDate}</p>
      </article>
    </section>
  );
};

export default BlogPost;
