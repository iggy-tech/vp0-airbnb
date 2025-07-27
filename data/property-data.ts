// data/propertyData.ts
export interface PropertyData {
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
}

export const propertyData: PropertyData[] = [
  {
    id: 1,
    title: 'A here we are room minutes away from airport',
    subtitle: 'Room in Toronto, Canada',
    details: '1 bed · Shared bathroom',
    price: '$34 USD',
    priceSubtext: 'night',
    rating: '4.84',
    reviews: '230',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Myrna',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '3 years hosting'
    },
    amenities: [
      { title: 'Self check-in', subtitle: 'Check yourself in with the lockbox.' },
      { title: 'Park for free', subtitle: 'This is one of the few places in the area with free parking.' },
      { title: 'Room in a home', subtitle: 'Your own room in a home, plus access to shared spaces.' }
    ],
    features: [
      'Lock on bedroom door',
      'Wifi',
      'Dedicated workspace',
      'Free parking on premises',
      'Exterior security cameras on property'
    ],
    description: 'A friendly neighbourhood, close to wallmart, mc donalds , poppeyes, dollarama, newly opened costco with gas station, burger king, BMO bank. And also 10 to 15 minutes walk to bus stop that goes to the subway train station and downtown.',
    location: 'Toronto, Ontario, Canada',
    coordinates: {
      latitude: 43.6532,
      longitude: -79.3832,
    }
  },
  {
    id: 2,
    title: 'Place to stay in Strawberry Mansion',
    subtitle: 'Apartment in Philadelphia',
    details: '2 beds · 1 bathroom',
    price: '$122',
    priceSubtext: 'for 2 nights', 
    rating: '4.8',
    reviews: '156',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '2 years hosting'
    },
    amenities: [
      { title: 'Self check-in', subtitle: 'Check yourself in with the smart lock.' },
      { title: 'Great location', subtitle: 'Recent guests gave the location a 5-star rating.' },
      { title: 'Fast wifi', subtitle: 'At 147 Mbps, you can take video calls and stream videos.' }
    ],
    features: [
      'Kitchen',
      'Wifi',
      'Free parking on premises',
      'Washer',
      'Air conditioning',
      'Dedicated workspace',
      'TV',
      'Hair dryer'
    ],
    description: 'Beautiful apartment in the heart of Strawberry Mansion. This newly renovated space offers modern amenities while maintaining the historic charm of the neighborhood. Walking distance to public transportation and local attractions.',
    location: 'Philadelphia, PA, USA',
    coordinates: {
      latitude: 39.9912,
      longitude: -75.1320,
    }
  },
  {
    id: 3,
    title: 'Apartment in Center City',
    subtitle: 'Entire apartment',
    details: '1 bed · 1 bathroom',
    price: '$381',
    priceSubtext: 'for 2 nights',
    rating: '5.0', 
    reviews: '89',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Michael',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      badge: 'Host',
      experience: '1 year hosting'
    },
    amenities: [
      { title: 'Self check-in', subtitle: 'Check yourself in with the keypad.' },
      { title: 'Great location', subtitle: '100% of recent guests gave the location a 5-star rating.' },
      { title: 'Sparkling clean', subtitle: 'Recent guests said this place was sparkling clean.' }
    ],
    features: [
      'Kitchen',
      'Wifi',
      'Washer',
      'Dryer',
      'Air conditioning',
      'Heating',
      'Dedicated workspace',
      'TV with Netflix',
     
      'Dishwasher'
    ],
    description: 'Luxury apartment in the heart of Center City Philadelphia. This modern space features floor-to-ceiling windows, high-end finishes, and is walking distance to major attractions, restaurants, and shopping. Perfect for business travelers or couples exploring the city.',
    location: 'Philadelphia, PA, USA',
    coordinates: {
      latitude: 39.9526,
      longitude: -75.1652,
    }
  },
  {
    id: 4,
    title: 'Room in Fishtown',
    subtitle: 'Private room',
    details: '1 bed · Shared bathroom',
    price: '$112',
    priceSubtext: 'for 2 nights',
    rating: '4.99',
    reviews: '203',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Jessica',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '4 years hosting'
    },
    amenities: [
      { title: 'Great location', subtitle: '90% of recent guests gave the location a 5-star rating.' },
      { title: 'Fast wifi', subtitle: 'At 95 Mbps, you can take video calls and stream videos.' },
      { title: 'Room in a home', subtitle: 'Your own room in a home, plus access to shared spaces.' }
    ],
    features: [
      'Kitchen access',
      'Wifi',
      'Air conditioning',
      'Heating',
      'TV',
      'Hair dryer',
      'Iron',
      'Shared patio'
    ],
    description: 'Cozy private room in trendy Fishtown neighborhood. You will have access to shared common areas including kitchen and living room. The area is known for its vibrant arts scene, great restaurants, and nightlife. Easy access to public transportation.',
    location: 'Philadelphia, PA, USA',
    coordinates: {
      latitude: 39.9671,
      longitude: -75.1339,
    }
  },
  {
    id: 5,
    title: 'Modern Studio in SoHo',
    subtitle: 'Entire studio',
    details: '1 bed · 1 bathroom',
    price: '$195',
    priceSubtext: 'night',
    rating: '4.92',
    reviews: '178',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '5 years hosting'
    },
    amenities: [
      { title: 'Self check-in', subtitle: 'Check yourself in with the lockbox.' },
      { title: 'Great location', subtitle: '95% of recent guests gave the location a 5-star rating.' },
      { title: 'Experienced host', subtitle: 'Alex has received 5-star reviews from 95% of recent guests.' }
    ],
    features: [
      'Kitchen',
      'Wifi',
      'Air conditioning',
      'Heating',
      'Dedicated workspace',
      'TV',
      'Hair dryer',
    
    ],
    description: 'Sleek and modern studio apartment in the heart of SoHo. Features exposed brick walls, high ceilings, and contemporary furnishings. Walking distance to galleries, boutiques, restaurants, and subway stations. Perfect for exploring Manhattan.',
    location: 'New York, NY, USA',
    coordinates: {
      latitude: 40.7231,
      longitude: -74.0037,
    }
  },
  {
    id: 6,
    title: 'Cozy Loft in Brooklyn Heights',
    subtitle: 'Entire loft',
    details: '2 beds · 1 bathroom',
    price: '$165',
    priceSubtext: 'night',
    rating: '4.87',
    reviews: '142',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '3 years hosting'
    },
    amenities: [
      { title: 'Fast wifi', subtitle: 'At 125 Mbps, you can take video calls and stream videos.' },
      { title: 'Great location', subtitle: '85% of recent guests gave the location a 5-star rating.' },
      { title: 'Self check-in', subtitle: 'Check yourself in with the smart lock.' }
    ],
    features: [
      'Kitchen',
      'Wifi',
      'Washer',
      'Dryer',
      'Air conditioning',
      'Heating',
      'TV',
      'Hair dryer',
      'Iron',
      'Balcony'
    ],
    description: 'Charming loft in historic Brooklyn Heights with stunning views of the Manhattan skyline. Features original hardwood floors, exposed beams, and modern amenities. Close to Brooklyn Bridge Park and the Promenade. Easy access to Manhattan via subway.',
    location: 'Brooklyn, NY, USA',
    coordinates: {
      latitude: 40.6962,
      longitude: -73.9969,
    }
  },
  {
    id: 7,
    title: 'Beachfront Condo in Miami Beach',
    subtitle: 'Entire condo',
    details: '1 bed · 1 bathroom',
    price: '$285',
    priceSubtext: 'night',
    rating: '4.95',
    reviews: '267',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Carlos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '6 years hosting'
    },
    amenities: [
      { title: 'Beach access', subtitle: 'Direct access to world-famous South Beach.' },
      { title: 'Pool', subtitle: 'Shared outdoor pool with ocean views.' },
      { title: 'Great location', subtitle: '98% of recent guests gave the location a 5-star rating.' }
    ],
    features: [
      'Kitchen',
      'Wifi',
      'Air conditioning',
      'TV',
      'Hair dryer',
      'Beach towels',
      'Pool access',
      'Balcony with ocean view',
  
      'Parking included'
    ],
    description: 'Stunning oceanfront condo with panoramic views of the Atlantic Ocean. Located on world-famous South Beach, you are steps away from pristine sand and crystal-clear waters. The building features a pool, gym, and 24/7 concierge. Walking distance to restaurants, nightlife, and shopping.',
    location: 'Miami Beach, FL, USA',
    coordinates: {
      latitude: 25.7907,
      longitude: -80.1300,
    }
  },
  {
    id: 8,
    title: 'Rustic Cabin in the Mountains',
    subtitle: 'Entire cabin',
    details: '3 beds · 2 bathrooms',
    price: '$145',
    priceSubtext: 'night',
    rating: '4.89',
    reviews: '98',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Jennifer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      badge: 'Host',
      experience: '2 years hosting'
    },
    amenities: [
      { title: 'Hot tub', subtitle: 'Relax in the private hot tub under the stars.' },
      { title: 'Fire pit', subtitle: 'Gather around the outdoor fire pit for s\'mores.' },
      { title: 'Mountain views', subtitle: 'Breathtaking views of the surrounding mountains.' }
    ],
    features: [
      'Kitchen',
      'Wifi',
      'Heating',
      'Fireplace',
      'Hot tub',
      'Fire pit',
      'BBQ grill',
      'Hiking trails nearby',
      'Free parking',
      'Pet friendly'
    ],
    description: 'Escape to this charming mountain cabin surrounded by nature. Perfect for a peaceful retreat with family or friends. Features a cozy fireplace, private hot tub, and stunning mountain views. Hiking trails start right from the property. Ideal for stargazing and disconnecting from city life.',
    location: 'Asheville, NC, USA',
    coordinates: {
      latitude: 35.5951,
      longitude: -82.5515,
    }
  }
];