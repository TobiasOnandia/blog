export const Hero = () => {
  return (
    <section className="py-24">
      {/* Headline principal */}
      <h2 className="text-5xl font-bold leading-tight mb-6">
        Comparte tus mejores ideas
        <span className="block mt-2 text-3xl font-normal italic">
          Reflexiones para mentes curiosas
        </span>
      </h2>

      {/* Divider decorativo */}
      <div className="my-8 h-1 bg-gray-300 w-1/4" />

      {/* Cuerpo de texto */}
      <p className="text-lg text-gray-700 leading-relaxed text-justify ">
        En un mundo saturado de información, las verdaderas ideas persisten.
        Este espacio está dedicado a aquellos pensamientos que merecen
        trascender lo efímero.
        <span className="font-semibold">
          Escribe con propósito, comparte con convicción.
        </span>
      </p>
    </section>
  );
};
