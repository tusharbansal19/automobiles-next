export default function robots() {
  const baseUrl = "https://tusharautomobiles.me";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/cars", 
          "/contact",
          "/services",
          "/performance",
          "/Image/",
          "/favicon.ico",
          "/manifest.json",
          "/sitemap.xml",
          "/robots.txt"
        ],
        disallow: [
          "/api/",
          "/private/",
          "/admin/",
          "/profile/",
          "/_next/",
          "/_vercel/",
          "/*.json$",
          "/search?*",
          "/cart?*",
          "/checkout?*",
          "/user/",
          "/dashboard/",
          "/temp/",
          "/test/",
          "/dev/",
          "/staging/"
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/profile/",
          "/_next/",
          "/_vercel/"
        ],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/profile/",
          "/_next/",
          "/_vercel/"
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/profile/"
        ],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/profile/"
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https?:\/\//, ""),
  };
}


