import React from "react";

interface SectionProps {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
}

interface Props {
  sections: SectionProps[];
}

const SectionBlock: React.FC<Props> = ({ sections }) => {
  if (sections.length === 0) {
    return (
      <div
        className="w-full h-[55vh] flex items-center justify-center bg-gray-200 text-gray-700"
        role="alert"
      >
        <p className="text-lg font-semibold">No sections available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {sections.map((section) => (
        <section
          key={section.id}
          className="relative flex flex-col items-center justify-center text-center w-full h-[55vh] bg-cover bg-center"
          aria-labelledby={`section-title-${section.id}`}
          role="region"
          style={{
            backgroundImage: `url(${section.backgroundImage})`,
            backgroundAttachment: "fixed",
          }}
        >
          {/* Capa de opacidad */}
          <div className="absolute inset-0 bg-black/80"></div>

          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center text-white px-6 max-w-3xl">
            <h1 id={`section-title-${section.id}`} className="text-4xl font-semibold">
              {section.title}
            </h1>
            <div className="w-28 h-[3px] bg-orange-600 mt-3 mb-2 rounded-full"></div>
            <p className="text-xl mb-5 text-white/80">{section.description}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default SectionBlock;