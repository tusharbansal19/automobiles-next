export default function sitemap() {
  const baseUrl = "https://tusharautomobiles.me";
  const nowIso = new Date().toISOString();

  const entries = [
    { 
      path: "/", 
      changeFrequency: "weekly", 
      priority: 1.0,
      lastModified: nowIso
    },
    { 
      path: "/about", 
      changeFrequency: "monthly", 
      priority: 0.8,
      lastModified: nowIso
    },
    { 
      path: "/cars", 
      changeFrequency: "weekly", 
      priority: 0.9,
      lastModified: nowIso
    },
    { 
      path: "/contact", 
      changeFrequency: "monthly", 
      priority: 0.7,
      lastModified: nowIso
    },
    { 
      path: "/performance", 
      changeFrequency: "weekly", 
      priority: 0.6,
      lastModified: nowIso
    },
    { 
      path: "/profile", 
      changeFrequency: "monthly", 
      priority: 0.3,
      lastModified: nowIso
    },
    { 
      path: "/services", 
      changeFrequency: "daily", 
      priority: 0.9,
      lastModified: nowIso
    },
  ];

  // Add dynamic service pages if they exist
  const servicePages = [
    "engine-parts",
    "brake-parts", 
    "suspension-parts",
    "electrical-parts",
    "body-parts",
    "interior-parts",
    "exhaust-parts",
    "cooling-system",
    "transmission-parts",
    "steering-parts"
  ];

  servicePages.forEach(service => {
    entries.push({
      path: `/services/${service}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: nowIso
    });
  });

  return entries.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}


