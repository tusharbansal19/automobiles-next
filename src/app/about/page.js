import AboutContent from "./AboutContent";

export const metadata = {
    title: "About Us | Tushar Automobiles",
    description: "Learn about Tushar Automobiles' 30+ years of journey, our mission, values, and the expert team behind our premium car services.",
    openGraph: {
        title: "About Tushar Automobiles - Our Legacy",
        description: "Discover the story behind Tushar Automobiles. 30+ years of trust, quality, and expert car care in Siyana.",
        images: ['/Image/umesh.jpg'],
    },
};

export default function AboutPage() {
    return <AboutContent />;
}
