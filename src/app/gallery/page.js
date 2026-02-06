import GalleryContent from "./GalleryContent";

export const metadata = {
    title: "Gallery & Portfolio | Tushar Automobiles",
    description: "View our workshop gallery, team photos, garage equipment, and satisfied customer stories. See the quality of our automotive work.",
    openGraph: {
        title: "Tushar Automobiles Gallery",
        description: "Explore our workshop facility, before & after transformations, and happy customers.",
    },
};

export default function GalleryPage() {
    return <GalleryContent />;
}
