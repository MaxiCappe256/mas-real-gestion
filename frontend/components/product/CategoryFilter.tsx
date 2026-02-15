'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['Todas', 'Pastelería', 'Yerbas', 'Panificados'] as const;

export type Category = (typeof categories)[number];

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const isActive = selected === cat;
        return (
          <Button
            key={cat}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(cat)}
            className={cn(
              'rounded-full transition-all',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            {cat}
          </Button>
        );
      })}
    </div>
  );
}
