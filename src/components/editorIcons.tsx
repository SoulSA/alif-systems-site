// Toolbar icons for the RichTextEditor. All stroke-based, use currentColor.
import React from 'react';
const s = { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const IconBold = () => (<svg {...s}><path d="M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z" /></svg>);
export const IconItalic = () => (<svg {...s}><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>);
export const IconUnderline = () => (<svg {...s}><path d="M6 3v7a6 6 0 0 0 12 0V3" /><line x1="4" y1="21" x2="20" y2="21" /></svg>);
export const IconH1 = () => (<svg {...s}><path d="M4 6v12M12 6v12M4 12h8" /><path d="M17 10l2-1.5V18" /></svg>);
export const IconH2 = () => (<svg {...s}><path d="M4 6v12M11 6v12M4 12h7" /><path d="M16 10a2 2 0 1 1 3 1.6L16 18h4" /></svg>);
export const IconQuote = () => (<svg {...s}><path d="M7 7h4v6a4 4 0 0 1-4 4M13 7h4v6a4 4 0 0 1-4 4" /></svg>);
export const IconList = () => (<svg {...s}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><circle cx="3.5" cy="6" r="1.2" fill="currentColor" stroke="none" /><circle cx="3.5" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="3.5" cy="18" r="1.2" fill="currentColor" stroke="none" /></svg>);
export const IconListOrdered = () => (<svg {...s}><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4M4 10h2" /><path d="M4 15h2v1l-2 1v1h2" /></svg>);
export const IconLink = () => (<svg {...s}><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></svg>);
export const IconImage = () => (<svg {...s}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>);
export const IconUpload = () => (<svg {...s}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>);
export const IconAlignLeft = () => (<svg {...s}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="14" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></svg>);
export const IconAlignCenter = () => (<svg {...s}><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>);
export const IconAlignRight = () => (<svg {...s}><line x1="3" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" /></svg>);
export const IconEraser = () => (<svg {...s}><path d="M7 21h10M5 13l6-6 7 7-5 5H8z" /></svg>);
