// Fix: Import React to use JSX types like React.ReactNode and JSX.Element.
import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
  category: string;
  details: {
    title?: string;
    brand?: string;
    content?: string;
    features?: string[];
    surfaces?: string[];
    description: string;
    howToUse: string;
    precautions: string;
    composition: string;
    barcode?: string;
  };
}

// Fix: Add SocialLink type definition.
export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

// Fix: Add Kit type definition.
export interface Kit {
  id: string;
  name: string;
  image: string;
  description: string;
  price?: string;
  isSpecial?: boolean;
  includes?: string[];
  components?: {
    title: string;
    desc: string;
  }[];
  instructions?: string[];
}

// Fix: Add FAQItem type definition.
export interface FAQItem {
  question: string;
  answer: string;
}

// Fix: Add Policy type definition.
export interface Policy {
  title: string;
  content: string;
}

// Added for new checkout functionality
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string; // For 'departamento'
  housingType: string;
  notes: string; // For 'torre o casa o conjunto mtorre o apartamento' details
}


// Added for filter functionality
export interface ActiveFilters {
  categories: string[];
  priceRange: { min: number; max: number; };
  sortOrder: string;
}