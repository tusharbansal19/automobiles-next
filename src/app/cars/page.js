import CarsContent from "./CarsContent";

export const metadata = {
    title: "Cars Inventory | Tushar Automobiles",
    description: "Explore our collection of certified pre-owned vehicles. Quality checked and verified cars at best prices.",
    openGraph: {
        title: "Cars Inventory - Verified Used Cars",
        description: "Browse our latest inventory of certified pre-owned cars. Reliable vehicles at affordable prices.",
    },
};

export default function CarsPage() {
    return <CarsContent />;
}
