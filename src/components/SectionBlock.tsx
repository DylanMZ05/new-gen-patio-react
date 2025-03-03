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
      <div className="w-full h-[33vh] flex items-center justify-center bg-gray-200 text-gray-700">
        <p className="text-lg font-semibold">No hay secciones disponibles</p>
      </div>
    );
  }

  return (
    <div>
      {sections.map((section) => (
        <div
          key={section.id}
          className="flex flex-col items-center justify-center text-center w-dvw h-[35vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${section.backgroundImage})` }}
        >
          <div className="bg-black/80 w-full h-full flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl font-bold">{section.title}</h2>
            <div className="w-[100px] h-[3px] bg-orange-600 mt-3 mb-2 rounded-full"></div>
            <p className="text-[24px] mb-5">{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionBlock;
