// data/experiences-data.ts
export interface ExperienceData {
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
  category: 'experiences';
  duration?: string;
  groupSize?: string;
  languages?: string[];
}

export const experiencesData: ExperienceData[] = [
  {
    id: 1,
    title: 'Lunch with fashion icon Lenny Niemeyer in her home',
    subtitle: 'Rio de Janeiro, Brazil',
    details: '3 hours · Small group',
    price: '$25 USD',
    priceSubtext: 'per guest',
    rating: '4.95',
    reviews: '342',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    badge: 'Original',
    host: {
      name: 'Lenny',
      avatar: 'https://plus.unsplash.com/premium_photo-1689562473471-6e736b8afe15?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge: 'Featured Host',
      experience: '5 years hosting'
    },
    amenities: [
      { title: 'Intimate setting', subtitle: 'Small group experience in a private home.' },
      { title: 'Fashion insights', subtitle: 'Learn from a renowned Brazilian fashion designer.' },
      { title: 'Authentic meal', subtitle: 'Traditional Brazilian lunch prepared by the host.' }
    ],
    features: [
      'Food and drinks included',
      'Fashion design stories',
      'Photo opportunities',
      'Meet other fashion enthusiasts',
      'Exclusive home tour'
    ],
    description: 'Join fashion icon Lenny Niemeyer for an intimate lunch at her stunning Rio home. Hear fascinating stories from her decades in fashion design, enjoy authentic Brazilian cuisine, and gain insights into the creative process behind her iconic swimwear brand.',
    location: 'Rio de Janeiro, Brazil',
    coordinates: {
      latitude: -22.9068,
      longitude: -43.1729,
    },
    category: 'experiences',
    duration: '3 hours',
    groupSize: 'Up to 8 guests',
    languages: ['English', 'Portuguese']
  },
  {
    id: 2,
    title: 'Deepen your intimacy skills with Dr Emily Morse',
    subtitle: 'West Hollywood, United States',
    details: '2 hours · Workshop',
    price: '$150 USD',
    priceSubtext: 'per guest',
    rating: '4.98',
    reviews: '189',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    badge: 'Original',
    host: {
      name: 'Dr Emily',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      badge: 'Expert Host',
      experience: '3 years hosting'
    },
    amenities: [
      { title: 'Expert guidance', subtitle: 'Learn from a certified relationship expert.' },
      { title: 'Safe space', subtitle: 'Comfortable, judgment-free environment.' },
      { title: 'Take-home materials', subtitle: 'Resources to continue your journey.' }
    ],
    features: [
      'Interactive workshop',
      'Q&A session',
      'Private consultation available',
      'Refreshments included',
      'Written resources provided'
    ],
    description: 'Join renowned relationship expert Dr Emily Morse for an empowering workshop focused on building deeper connections and intimacy. Learn practical skills, engage in meaningful discussions, and leave with tools to enhance your relationships.',
    location: 'West Hollywood, CA, USA',
    coordinates: {
      latitude: 34.0900,
      longitude: -118.3617,
    },
    category: 'experiences',
    duration: '2 hours',
    groupSize: 'Up to 12 guests',
    languages: ['English']
  },
  {
    id: 3,
    title: 'Toronto Island Kayak Adventure',
    subtitle: 'Toronto, Ontario',
    details: '4 hours · Outdoor activity',
    price: '$85 USD',
    priceSubtext: 'per guest',
    rating: '4.87',
    reviews: '156',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    badge: 'Popular',
    host: {
      name: 'Jake',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      badge: 'Adventure Guide',
      experience: '4 years hosting'
    },
    amenities: [
      { title: 'All equipment included', subtitle: 'Kayaks, paddles, and safety gear provided.' },
      { title: 'Small group', subtitle: 'Maximum 6 people for personalized experience.' },
      { title: 'Photo opportunities', subtitle: 'Stunning views of Toronto skyline from water.' }
    ],
    features: [
      'Professional guide',
      'Safety briefing',
      'Equipment provided',
      'Waterproof phone case',
      'Light snacks included',
      'All skill levels welcome'
    ],
    description: 'Explore Toronto from a unique perspective on this guided kayak adventure around the Toronto Islands. Paddle through calm lagoons, enjoy spectacular city skyline views, and learn about local wildlife and history from your experienced guide.',
    location: 'Toronto, ON, Canada',
    coordinates: {
      latitude: 43.6426,
      longitude: -79.3871,
    },
    category: 'experiences',
    duration: '4 hours',
    groupSize: 'Up to 6 guests',
    languages: ['English', 'French']
  },
  {
    id: 4,
    title: 'CN Tower EdgeWalk Experience',
    subtitle: 'Toronto, Ontario',
    details: '1.5 hours · Extreme adventure',
    price: '$225 USD',
    priceSubtext: 'per guest',
    rating: '4.92',
    reviews: '278',
    images: [
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop',
    badge: 'Popular',
    host: {
      name: 'CN Tower',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      badge: 'Official Partner',
      experience: '10 years hosting'
    },
    amenities: [
      { title: 'Safety certified', subtitle: 'World\'s highest full circle hands-free walk.' },
      { title: 'Professional photos', subtitle: 'Commemorative photos included.' },
      { title: 'Weather guarantee', subtitle: 'Reschedule if weather conditions aren\'t suitable.' }
    ],
    features: [
      'Safety harness system',
      'Professional guide',
      'Certificate of completion',
      'Commemorative photos',
      'Safety briefing',
      'Weather monitoring'
    ],
    description: 'Take on the ultimate Toronto adventure with EdgeWalk at the CN Tower. Walk hands-free around the outside of the tower\'s main pod, 116 stories above the ground. This thrilling experience offers unparalleled 360-degree views of the city.',
    location: 'Toronto, ON, Canada',
    coordinates: {
      latitude: 43.6426,
      longitude: -79.3871,
    },
    category: 'experiences',
    duration: '1.5 hours',
    groupSize: 'Up to 6 guests',
    languages: ['English', 'French']
  },
  {
    id: 5,
    title: 'Private Wine Tasting in Napa Valley',
    subtitle: 'Napa Valley, United States',
    details: '3 hours · Wine experience',
    price: '$180 USD',
    priceSubtext: 'per guest',
    rating: '4.93',
    reviews: '124',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    badge: 'Original',
    host: {
      name: 'Marco',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      badge: 'Sommelier',
      experience: '8 years hosting'
    },
    amenities: [
      { title: 'Expert sommelier', subtitle: 'Learn from a certified wine expert.' },
      { title: 'Premium wines', subtitle: 'Taste exclusive small-batch wines.' },
      { title: 'Vineyard tour', subtitle: 'Behind-the-scenes look at winemaking process.' }
    ],
    features: [
      '6 wine tastings',
      'Artisan cheese pairings',
      'Vineyard walking tour',
      'Winemaking education',
      'Take-home wine guide',
      'Photo opportunities'
    ],
    description: 'Discover the art of winemaking with an intimate tasting experience at a boutique Napa Valley vineyard. Learn about terroir, taste premium wines paired with artisan cheeses, and enjoy a guided tour of the vineyards and production facilities.',
    location: 'Napa Valley, CA, USA',
    coordinates: {
      latitude: 38.2975,
      longitude: -122.2869,
    },
    category: 'experiences',
    duration: '3 hours',
    groupSize: 'Up to 8 guests',
    languages: ['English', 'Spanish']
  },
  {
    id: 6,
    title: 'Cooking Class with Local Chef',
    subtitle: 'Florence, Italy',
    details: '4 hours · Culinary experience',
    price: '$120 USD',
    priceSubtext: 'per guest',
    rating: '4.89',
    reviews: '203',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Giulia',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      badge: 'Professional Chef',
      experience: '6 years hosting'
    },
    amenities: [
      { title: 'Hands-on cooking', subtitle: 'Learn to make authentic Tuscan dishes.' },
      { title: 'Market tour', subtitle: 'Shop for fresh ingredients at local market.' },
      { title: 'Recipe collection', subtitle: 'Take home printed recipes to recreate dishes.' }
    ],
    features: [
      'Market shopping tour',
      'Traditional techniques',
      '3-course meal preparation',
      'Wine pairing education',
      'Recipe booklet',
      'All ingredients included'
    ],
    description: 'Immerse yourself in Tuscan cuisine with this hands-on cooking class led by a local chef. Start with a trip to the bustling San Lorenzo market, then learn to prepare a traditional 3-course meal using fresh, seasonal ingredients.',
    location: 'Florence, Italy',
    coordinates: {
      latitude: 43.7696,
      longitude: 11.2558,
    },
    category: 'experiences',
    duration: '4 hours',
    groupSize: 'Up to 10 guests',
    languages: ['English', 'Italian']
  }
];