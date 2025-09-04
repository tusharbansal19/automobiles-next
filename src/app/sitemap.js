export default function sitemap() {
  const baseUrl = "https://tusharautomobiles.me";
  const nowIso = new Date().toISOString();

  const entries = [
    { 
      path: "/cars", 
      changeFrequency: "weekly", 
      priority: 1.0,
      lastModified: nowIso
    },
    { 
      path: "/services", 
      changeFrequency: "weekly", 
      priority: 1.0,
      lastModified: nowIso
    },
    { 
      path: "/contact", 
      changeFrequency: "monthly", 
      priority: 0.8,
      lastModified: nowIso
    },
    { 
      path: "/about", 
      changeFrequency: "monthly", 
      priority: 0.8,
      lastModified: nowIso
    },
  ];

  return entries.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}


