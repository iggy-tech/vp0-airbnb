// data/categoryData.ts
export interface CategoryItem {
  id: number;
  title: string;
  image: any;
  active?: boolean;
  badge?: string;
}

export const categoryData: CategoryItem[] = [
  { 
    id: 1, 
    title: 'Homes', 
    image: require('@/assets/images/home.png'),
    active: true 
  },
  { 
    id: 2, 
    title: 'Experiences', 
    image: require('@/assets/images/experiences.png'),
    badge: 'NEW' 
  },
  { 
    id: 3, 
    title: 'Services', 
    image: require('@/assets/images/services.png'),
    badge: 'NEW' 
  },
];