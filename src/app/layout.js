import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import PageWrapper from "./component/Pagewrapper";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Tushar Automobiles - Best Price Auto Parts & Services",
    template: "%s | Tushar Automobiles"
  },
  description: "Tushar Automobiles offers best price automobile spare parts, car services, and automotive solutions. Family-run business with 30+ years of experience in quality auto parts and reliable service.",
  keywords: [
    "automobile parts",
    "car spare parts", 
    "auto services",
    "automotive repair",
    "car maintenance",
    "auto parts store",
    "vehicle services",
    "car accessories",
    "automotive solutions",
    "Tushar Automobiles"
  ],
  authors: [{ name: "Tushar Bansal" }],
  creator: "Tushar Automobiles",
  publisher: "Tushar Automobiles",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tusharautomobiles.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tushar Automobiles - Best Price Auto Parts & Services",
    description: "Family-run automobile business offering best price spare parts, car services, and automotive solutions with 30+ years of experience.",
    url: '/',
    siteName: 'Tushar Automobiles',
    images: [
      {
        url: '/Image/shopImg.jpg',
        width: 1200,
        height: 630,
        alt: 'Tushar Automobiles Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tushar Automobiles - Best Price Auto Parts & Services",
    description: "Family-run automobile business offering best price spare parts, car services, and automotive solutions.",
    images: ['/Image/shopImg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'automotive',
  classification: 'Business',
  appleWebApp: {
    title: "Tushar Automobiles",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "name": "Tushar Automobiles",
    "description": "Premium automobile spare parts, car services, and automotive solutions with 30+ years of experience.",
    "url": "https://tusharautomobiles.me",
    "logo": "https://tusharautomobiles.me/Image/shopImg.jpg",
    "image": "https://tusharautomobiles.me/Image/shopImg.jpg",
    "telephone": "+91-123-456-7890",
    "email": "info@tusharautomobiles.me",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "postalCode": "12345",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-16:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "UPI", "Net Banking"],
    "currenciesAccepted": "INR",
    "founder": {
      "@type": "Person",
      "name": "Umesh Kumar Bansal"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Tushar Bansal",
        "jobTitle": "Manager"
      },
      {
        "@type": "Person", 
        "name": "Dev Bansal",
        "jobTitle": "Service Head"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "28.6139",
        "longitude": "77.2090"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automotive Parts and Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Car Maintenance",
            "description": "Complete car maintenance and repair services"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Auto Spare Parts",
            "description": "Premium quality automobile spare parts"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header/>
          <PageWrapper>
            {children}
          </PageWrapper>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
