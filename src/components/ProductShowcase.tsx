
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Minimal Chair",
    description: "Engineered for comfort with the simplest form possible.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Essential Lamp",
    description: "A perfect balance of light and shadow.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Pure Speaker",
    description: "Clear sound embraced by minimal design.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const ProductShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up', 'opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    productsRef.current.forEach((product) => {
      if (product) observer.observe(product);
    });

    return () => {
      productsRef.current.forEach((product) => {
        if (product) observer.unobserve(product);
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 px-6 relative bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="animate-fade-up opacity-0">Beautifully Functional</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto animate-fade-up opacity-0 [animation-delay:200ms]">
            Our products strike the perfect balance between form and function, 
            embodying the principle that good design is as little design as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productsRef.current[index] = el)}
              className={cn(
                "glass-card rounded-xl p-6 cursor-pointer transition-all duration-500 hover:shadow-elevation-3 opacity-0 group",
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={cn(
                "relative overflow-hidden rounded-lg mb-6",
                index === 0 ? "aspect-square md:aspect-auto md:h-[500px]" : "aspect-square"
              )}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-medium">{product.name}</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium">
                <span>Explore</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-1 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
