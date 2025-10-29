// Fix: Import React to use JSX types like React.ReactNode and JSX.Element.
import React from 'react';

export interface Product {
  name: string;
  image: string;
  shortDesc: string;
  details: {