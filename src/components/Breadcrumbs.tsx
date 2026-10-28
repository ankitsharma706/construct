import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../lib/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items,
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-espresso/60 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;

          return (
            <li key={item.url} className="flex items-center gap-2">
              {index === 0 ? (
                <Link
                  to={item.url}
                  className="flex items-center gap-1 text-espresso hover:text-gold transition-colors"
                >
                  <Home size={12} className="text-gold" />
                  <span>{item.name}</span>
                </Link>
              ) : isLast ? (
                <span
                  aria-current="page"
                  className="text-gold font-black truncate max-w-[200px] md:max-w-md"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="text-espresso/70 hover:text-gold transition-colors"
                >
                  {item.name}
                </Link>
              )}

              {!isLast && (
                <ChevronRight size={12} className="text-espresso/30 flex-shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

