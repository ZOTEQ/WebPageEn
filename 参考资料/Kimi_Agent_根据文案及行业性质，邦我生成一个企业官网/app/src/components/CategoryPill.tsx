import type { ProductCategory } from '@/data/products';
import { categoryColors } from '@/data/products';

interface CategoryPillProps {
  category: ProductCategory;
  className?: string;
}

export default function CategoryPill({ category, className = '' }: CategoryPillProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category]} ${className}`}>
      {category}
    </span>
  );
}
