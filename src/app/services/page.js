import ServicesContent from "./ServicesContent";

export const metadata = {
    title: "Auto Services & Spare Parts | Tushar Automobiles",
    description: "Browse our comprehensive auto services catalog including engine repair, brake systems, oil changes, and genuine spare parts inventory.",
    openGraph: {
        title: "Car Services & Parts Catalog",
        description: "Premium auto parts and expert services in Siyana. Check our inventory and book appointments.",
    },
};

export default function ServicesPage() {
    return <ServicesContent />;
}
