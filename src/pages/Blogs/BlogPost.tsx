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
  return (
    <section className="pt-[100px]">
      <article className="max-w-3xl mx-auto p-6">

        <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded-t-lg mb-4"/>

        <h1 className="text-3xl font-semibold">{title}</h1>
        <h2 className="text-xl text-gray-600">{subtitle}</h2>
        <p className="text-gray-500 text-sm mt-2">{date}</p>

        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
        ))}

        {secondaryImage && (
          <img src={secondaryImage} alt="Secondary image" className="w-full h-auto object-cover rounded-lg mt-4" />
        )}

        {moreContent && moreContent.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
        ))}

        {finalImage && (
          <img src={finalImage} alt="Final image" className="w-full h-auto object-cover rounded-lg mt-4" />
        )}

        {lastContent && lastContent.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mt-4 whitespace-pre-line">{paragraph}</p>
        ))}

      </article>
    </section>
  );
};

export default BlogPost;