import { Metadata } from 'next';
import SeoLandingPage from '../SeoLandingPage';
import TownLandingContent from '../TownLandingContent';
import { commonFaq, townLandingData } from '../townLandingData';

const data = townLandingData.rojales;

export const metadata: Metadata = {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
        canonical: `/fastigheter/${data.citySlug}`
    }
};

export default function RojalesLandingPage() {
    return (
        <SeoLandingPage
            title={data.title}
            subtitle={data.subtitle}
            intro={data.intro}
            cityLabel={data.cityName}
            breadcrumbItems={[
                { name: 'Hem', href: '/' },
                { name: 'Fastigheter', href: '/fastigheter' },
                { name: data.cityName, href: `/fastigheter/${data.citySlug}` }
            ]}
            faqTitle={`fastigheter i ${data.cityName}`}
            faqItems={commonFaq}
            defaultFilters={{
                towns: data.cityName
            }}
        >
            <TownLandingContent
                cityName={data.cityName}
                highlights={data.highlights}
                priceNote={data.priceNote}
                areaHighlights={data.areaHighlights}
            />
        </SeoLandingPage>
    );
}
