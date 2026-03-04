
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
    if (metaDescription) {
      metaDescription.setAttribute('content', description || optimization.metaDescription || "Cuidado y estética automotriz de nivel profesional.");
    }

    // Google Analytics (Mock implementation for ID injection)
    if (optimization.googleAnalyticsId && optimization.googleAnalyticsId !== 'G-XXXXXXXXXX') {
      console.log(`Google Analytics initialized with ID: ${optimization.googleAnalyticsId}`);
    }
  }, [title, description, location, optimization]);

  return null;
};

export default SEOManager;
