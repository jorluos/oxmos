import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Gender } from '../../../types';

export interface GenderCollectionCardProps {
  key?: React.Key;
  gender: Extract<Gender, 'Hombre' | 'Mujer'>;
  title: string;
  subtitle: string;
  image: string;
  onSelect: (gender: Extract<Gender, 'Hombre' | 'Mujer'>) => void;
}

export function GenderCollectionCard({
  gender,
  title,
  subtitle,
  image,
  onSelect,
}: GenderCollectionCardProps) {
  return (
    <button
      onClick={() => onSelect(gender)}
      className="group relative min-h-[430px] overflow-hidden text-left"
    >
      <img
        src={image}
        alt={`Colección ${title}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-end p-6 sm:p-8">
        <span className="mb-3 text-xs uppercase tracking-[0.35em] text-white/60">Colección</span>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl sm:text-5xl font-light text-white">{title}</h2>
            <p className="mt-3 max-w-sm text-sm text-white/70">{subtitle}</p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/70 text-white transition-colors group-hover:bg-white group-hover:text-black">
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </button>
  );
}
