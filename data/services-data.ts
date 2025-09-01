// data/services-data.ts
export interface ServiceData {
  id: number;
  title: string;
  subtitle: string;
  details: string;
  price: string;
  priceSubtext: string;
  rating: string;
  reviews: string;
  images: string[];
  image: string;
  badge?: string | null;
  host: {
    name: string;
    avatar: string;
    badge: string;
    experience: string;
  };
  amenities?: Array<{
    title: string;
    subtitle: string;
  }>;
  features?: string[];
  description?: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: 'services';
  serviceType?: string;
  availability?: string;
  deliveryOptions?: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: 1,
    title: 'Professional Photography Session',
    subtitle: 'Available in Toronto',
    details: '2 hours · Portrait & lifestyle',
    price: '$200 USD',
    priceSubtext: 'per session',
    rating: '4.94',
    reviews: '187',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Sarah',
      avatar: 'https://plus.unsplash.com/premium_photo-1668485968590-aff3717c1dbe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge: 'Professional',
      experience: '5 years experience'
    },
    amenities: [
      { title: 'Professional equipment', subtitle: 'High-end cameras and lighting setup.' },
      { title: 'Multiple locations', subtitle: 'Studio or outdoor locations available.' },
      { title: 'Quick turnaround', subtitle: 'Edited photos delivered within 5 days.' }
    ],
    features: [
      '2-hour photo session',
      '50+ edited photos',
      'High-resolution files',
      'Online gallery access',
      'Print release included',
      'Location scouting'
    ],
    description: 'Capture your special moments with professional photography services. Whether it\'s portraits, family photos, or lifestyle shots, I provide high-quality images with quick turnaround and professional editing.',
    location: 'Toronto, ON, Canada',
    coordinates: {
      latitude: 43.6532,
      longitude: -79.3832,
    },
    category: 'services',
    serviceType: 'Photography',
    availability: 'Weekdays & Weekends',
    deliveryOptions: ['Digital delivery', 'USB drive', 'Print packages']
  },
  {
    id: 2,
    title: 'Personal Chef Experience',
    subtitle: 'Available in Toronto',
    details: '4 hours · Multi-course dinner',
    price: '$180 USD',
    priceSubtext: 'per meal (up to 4 people)',
    rating: '4.89',
    reviews: '156',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Marco',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      badge: 'Certified Chef',
      experience: '8 years experience'
    },
    amenities: [
      { title: 'Custom menu', subtitle: 'Personalized menu based on your preferences.' },
      { title: 'Fresh ingredients', subtitle: 'Local, seasonal ingredients sourced daily.' },
      { title: 'Full service', subtitle: 'Cooking, serving, and cleanup included.' }
    ],
    features: [
      'Custom menu planning',
      'Grocery shopping included',
      '4-course meal preparation',
      'Professional presentation',
      'Kitchen cleanup',
      'Wine pairing suggestions'
    ],
    description: 'Enjoy restaurant-quality dining in the comfort of your home. I create custom menus using fresh, local ingredients and handle everything from shopping to cleanup, giving you a memorable culinary experience.',
    location: 'Toronto, ON, Canada',
    coordinates: {
      latitude: 43.6532,
      longitude: -79.3832,
    },
    category: 'services',
    serviceType: 'Culinary',
    availability: 'By appointment',
    deliveryOptions: ['In-home service', 'Meal prep packages']
  },
  {
    id: 3,
    title: 'Hair Styling Service',
    subtitle: 'Available in London',
    details: '2 hours · Cut, color & style',
    price: '$120 USD',
    priceSubtext: 'per appointment',
    rating: '4.96',
    reviews: '234',
    images: [
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      badge: 'Master Stylist',
      experience: '10 years experience'
    },
    amenities: [
      { title: 'Mobile service', subtitle: 'I come to your location with all equipment.' },
      { title: 'Premium products', subtitle: 'High-quality, sustainable hair products.' },
      { title: 'Consultation included', subtitle: 'Detailed consultation to understand your needs.' }
    ],
    features: [
      'Hair consultation',
      'Cut and style',
      'Color services available',
      'Heat styling',
      'Product recommendations',
      'Touch-up guidance'
    ],
    description: 'Professional hair styling services brought to your doorstep. Specializing in cuts, colors, and special event styling using premium products and techniques. Perfect for busy professionals or special occasions.',
    location: 'London, ON, Canada',
    coordinates: {
      latitude: 42.9849,
      longitude: -81.2453,
    },
    category: 'services',
    serviceType: 'Beauty',
    availability: 'Tuesday - Sunday',
    deliveryOptions: ['Mobile service', 'Home studio visits']
  },
  {
    id: 4,
    title: 'Vintage Car Photo Tour',
    subtitle: 'Rome, Italy',
    details: '3 hours · Sightseeing & photography',
    price: '$65 USD',
    priceSubtext: 'per guest',
    rating: '4.94',
    reviews: '89',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Giuseppe',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      badge: 'Local Expert',
      experience: '6 years experience'
    },
    amenities: [
      { title: 'Classic Fiat 500', subtitle: 'Authentic vintage Italian car experience.' },
      { title: 'Professional driver', subtitle: 'Licensed driver with local knowledge.' },
      { title: 'Photo stops', subtitle: 'Multiple stops at scenic Roman locations.' }
    ],
    features: [
      'Vintage Fiat 500 ride',
      'Professional driver/guide',
      'Photo opportunities',
      'Historic city tour',
      'Local recommendations',
      'Small group experience'
    ],
    description: 'Explore Rome in style with a vintage Fiat 500 photo tour. Visit iconic landmarks, hidden gems, and perfect photo spots while enjoying the charm of classic Italian motoring. Great for couples, solo travelers, or small groups.',
    location: 'Rome, Italy',
    coordinates: {
      latitude: 41.9028,
      longitude: 12.4964,
    },
    category: 'services',
    serviceType: 'Transportation',
    availability: 'Daily tours available',
    deliveryOptions: ['Hotel pickup', 'Central meeting point']
  },
  {
    id: 5,
    title: 'Personal Fitness Trainer',
    subtitle: 'Available in New York',
    details: '1 hour · Personal training session',
    price: '$150 USD',
    priceSubtext: 'per session',
    rating: '4.91',
    reviews: '167',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      badge: 'Certified Trainer',
      experience: '7 years experience'
    },
    amenities: [
      { title: 'Personalized program', subtitle: 'Custom workout plans based on your goals.' },
      { title: 'Flexible location', subtitle: 'Home, park, or gym sessions available.' },
      { title: 'Nutrition guidance', subtitle: 'Basic nutrition advice included.' }
    ],
    features: [
      'Custom workout plan',
      'Form correction',
      'Progress tracking',
      'Nutrition tips',
      'Equipment provided',
      'Goal setting'
    ],
    description: 'Achieve your fitness goals with personalized training sessions. Whether you\'re a beginner or experienced athlete, I create custom workouts that fit your lifestyle, schedule, and fitness objectives.',
    location: 'New York, NY, USA',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    category: 'services',
    serviceType: 'Fitness',
    availability: '6 AM - 8 PM daily',
    deliveryOptions: ['Home visits', 'Park sessions', 'Gym meetups']
  },
]
