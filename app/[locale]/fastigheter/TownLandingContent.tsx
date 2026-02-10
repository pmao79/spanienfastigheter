type Highlight = {
    title: string;
    description: string;
};

type TownLandingContentProps = {
    cityName: string;
    highlights: Highlight[];
    priceNote: string;
    areaHighlights: string[];
};

export default function TownLandingContent({
    cityName,
    highlights,
    priceNote,
    areaHighlights
}: TownLandingContentProps) {
    return (
        <div className="grid gap-12">
            <section>
                <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                    Varför köpa bostad i {cityName}?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                    {highlights.map((item) => (
                        <div key={item.title} className="bg-alabaster border border-greige p-4 rounded-sm">
                            <h3 className="text-sm uppercase tracking-widest text-sage font-bold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                    Prisbild i {cityName}
                </h2>
                <p className="text-gray-600 max-w-3xl">
                    {priceNote}
                </p>
            </section>

            <section>
                <h2 className="text-2xl md:text-3xl font-serif text-navy mb-6">
                    Populära områden och fokus just nu
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {areaHighlights.map((area) => (
                        <div key={area} className="bg-white border border-gray-100 p-6 rounded-sm shadow-soft">
                            <p className="text-sm text-gray-600">{area}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
