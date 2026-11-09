import React from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  activeImage: number;
  onSelectImage: (index: number) => void;
  darkMode: boolean;
}

export function ProductGallery({
  images,
  productName,
  activeImage,
  onSelectImage,
  darkMode,
}: ProductGalleryProps) {
  return (
    <div className="space-y-3">
      <div className={`aspect-[3/4] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {images.length > 0 ? (
          <img
            src={images[activeImage]}
            alt={productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/20">
            Sin imagen
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelectImage(i)}
              className={`w-16 h-20 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                activeImage === i
                  ? (darkMode ? 'border-white' : 'border-black')
                  : (darkMode ? 'border-white/10' : 'border-transparent')
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
