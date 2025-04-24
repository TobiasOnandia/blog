export const Hero = () => {
  return (
    <section className="py-24">
      {/* Headline principal */}
      <h2 className="text-5xl first-letter:text-sky-600 border-b-5 pb-8 w-fit border-gray-300 font-bold leading-tight mb-6">
        Comparte tus mejores ideas
        <span className="block mt-2 text-3xl font-normal italic">
          Reflexiones para mentes curiosas
        </span>
      </h2>

      {/* Cuerpo de texto */}
      <p className="text-lg text-balance first-letter:text-sky-600 text-gray-700 leading-relaxed">
        En un mundo saturado de información, las verdaderas ideas persisten.
        Este espacio está dedicado a aquellos pensamientos que merecen
        trascender lo efímero.
        <span className="font-semibold text-sky-600">
          Escribe con propósito, comparte con convicción.
        </span>
      </p>
    </section>
  );
};
