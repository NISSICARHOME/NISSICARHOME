
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEOManager: React.FC<SEOProps> = ({ title, description }) => {
  const location = useLocation();
  const { optimization } = siteContent;

  useEffect(() => {
    const baseTitle = optimization.metaTitle || "Nissi Car Home";
    const finalTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = finalTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const finalDescription = description || optimization.metaDescription || "Cuidado y estética automotriz de nivel profesional.";
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', finalDescription);

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag && optimization.googleAnalyticsId && optimization.googleAnalyticsId !== 'G-XXXXXXXXXX') {
      (window as any).gtag('config', optimization.googleAnalyticsId, {
        page_path: location.pathname + location.hash,
      });
    }
  }, [title, description, location, optimization]);

  return null;
};

export default SEOManager;
