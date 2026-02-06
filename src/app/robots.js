export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/profile/",
          "/api/",
          "/_next/",
          "/_vercel/",
        ],
      },
    ],
    sitemap: "https://tusharautomobiles.me/sitemap.xml",
    host: "tusharautomobiles.me",
  };
}
