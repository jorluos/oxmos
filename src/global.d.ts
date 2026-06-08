/// <reference types="vite/client" />

declare module '*.css';
declare module 'react-dom/client';
declare module 'react/jsx-runtime';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

