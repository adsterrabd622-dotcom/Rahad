import { Photo, Testimonial, BookingPackage } from './types';

export const PERSONAL_PHOTOS: Photo[] = [
  {
    id: 'personal-1',
    url: 'https://i.ibb.co/VcZn0TjS/x.jpg',
    title: 'Contemplating Organic Light',
    description: 'Rahad captured sitting in peaceful forest greens, framing natural contrasts, shadows, and fine-art geometry.',
    category: 'Portraits',
    featured: true,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 50mm f/1.2 GM',
      aperture: 'f/1.4',
      shutterSpeed: '1/250s',
      iso: '200',
      focalLength: '50mm',
      location: '',
      date: 'April 12, 2026'
    },
    palette: ['#14532d', '#052e16', '#a3e635', '#f3f4f6', '#4b5563']
  },
  {
    id: 'personal-2',
    url: 'https://i.ibb.co/5ghZZ7Rn/x.jpg',
    title: 'Whisper of Twilight',
    description: 'Moody overcast environment catching the fading blue light over a serene rural road.',
    category: 'Nature',
    featured: true,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/2.8',
      shutterSpeed: '1/80s',
      iso: '640',
      focalLength: '35mm',
      location: '',
      date: 'April 15, 2026'
    },
    palette: ['#1e1b4b', '#312e81', '#6b7280', '#e5e7eb', '#111827']
  },
  {
    id: 'personal-3',
    url: 'https://i.ibb.co/WNvyCvNM/x.jpg',
    title: 'Serenity in Green',
    description: 'A beautiful expanse of green crops under a dreamy pastel morning sky, showcasing country life.',
    category: 'Nature',
    featured: true,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/4.0',
      shutterSpeed: '1/500s',
      iso: '100',
      focalLength: '24mm',
      location: '',
      date: 'February 10, 2026'
    },
    palette: ['#15803d', '#4ade80', '#bae6fd', '#0284c7', '#f8fafc']
  }
];

export const PHOTO_DATA: Photo[] = [
  {
    id: 'photo-1',
    url: 'https://i.ibb.co/RpXxVFbq/x.jpg',
    title: 'Sunkissed Golden Portrait',
    description: 'A striking dynamic portrait captured during the warm embrace of the golden hour, focusing on rich tones and depth.',
    category: 'Portraits',
    featured: true,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 85mm f/1.4 GM',
      aperture: 'f/1.8',
      shutterSpeed: '1/400s',
      iso: '100',
      focalLength: '85mm',
      location: '',
      date: 'March 24, 2026'
    },
    palette: ['#d4af37', '#1c1c1f', '#8b5a2b', '#e5e7eb', '#3f3f46']
  },
  {
    id: 'photo-2',
    url: 'https://i.ibb.co/8DsJX0Jh/x.jpg',
    title: 'Rustic Village Whispers',
    description: 'A cozy look into rural lifestyles, highlighting rustic wooden structures, warm dirt paths, and nostalgia.',
    category: 'Urban',
    featured: true,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 35mm f/1.4 GM',
      aperture: 'f/2.0',
      shutterSpeed: '1/160s',
      iso: '320',
      focalLength: '35mm',
      location: '',
      date: 'January 28, 2026'
    },
    palette: ['#78350f', '#f59e0b', '#d97706', '#451a03', '#fef3c7']
  },
  {
    id: 'photo-3',
    url: 'https://i.ibb.co/709fVmF/x.jpg',
    title: 'Misty River Echoes',
    description: 'Early morning mist rising over a tranquil river, featuring a traditional wooden country boat.',
    category: 'Nature',
    featured: true,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 70-200mm f/2.8 GM OSS II',
      aperture: 'f/5.6',
      shutterSpeed: '1/200s',
      iso: '100',
      focalLength: '135mm',
      location: '',
      date: 'December 05, 2025'
    },
    palette: ['#374151', '#4b5563', '#9ca3af', '#f3f4f6', '#111827']
  },
  {
    id: 'photo-4',
    url: 'https://i.ibb.co/p6DwV8nL/x.jpg',
    title: 'Symmetry of Heritage',
    description: 'Geometric composition highlighting intricate traditional brick patterns and classical architectural symmetry.',
    category: 'Urban',
    featured: false,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 16-35mm f/4 G PZ',
      aperture: 'f/8.0',
      shutterSpeed: '1/125s',
      iso: '100',
      focalLength: '16mm',
      location: '',
      date: 'May 02, 2026'
    },
    palette: ['#991b1b', '#f87171', '#d97706', '#f3f4f6', '#1e293b']
  },
  {
    id: 'photo-5',
    url: 'https://i.ibb.co/qYSSzFTS/x.jpg',
    title: 'The Quiet Candid',
    description: 'An intimate street slice-of-life capturing raw expressions and honest human storytelling.',
    category: 'Portraits',
    featured: false,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 85mm f/1.4 GM',
      aperture: 'f/1.4',
      shutterSpeed: '1/320s',
      iso: '250',
      focalLength: '85mm',
      location: '',
      date: 'May 10, 2026'
    },
    palette: ['#27272a', '#71717a', '#a1a1aa', '#f4f4f5', '#09090b']
  },
  {
    id: 'photo-6',
    url: 'https://i.ibb.co/Kjzjp7zd/x.jpg',
    title: 'Misty Mountains & Meadows',
    description: 'Breathtaking layers of misty green hills and valleys, portraying the ultimate power of nature.',
    category: 'Nature',
    featured: false,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 70-200mm f/2.8 GM OSS II',
      aperture: 'f/4.5',
      shutterSpeed: '1/640s',
      iso: '100',
      focalLength: '200mm',
      location: '',
      date: 'November 18, 2025'
    },
    palette: ['#064e3b', '#065f46', '#0f766e', '#ccfbf1', '#f0fdfa']
  },
  {
    id: 'photo-7',
    url: 'https://i.ibb.co/k2FnwT4P/x.jpg',
    title: 'Crimson Sky Horizon',
    description: 'Dramatic clouds burning with orange and purple fire as the sun slips below the earth.',
    category: 'Creative',
    featured: false,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/2.8',
      shutterSpeed: '1/100s',
      iso: '400',
      focalLength: '28mm',
      location: '',
      date: 'June 01, 2026'
    },
    palette: ['#7c2d12', '#c2410c', '#f97316', '#4c1d95', '#fdf2f8']
  },
  {
    id: 'photo-8',
    url: 'https://i.ibb.co/Fb854JYG/x.jpg',
    title: 'Neon Urban Symphony',
    description: 'An elegant long exposure framing city streets, capturing light trails and fast-paced metropolitan lives.',
    category: 'Creative',
    featured: false,
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 16-35mm f/4 G PZ',
      aperture: 'f/11',
      shutterSpeed: '8.0s',
      iso: '100',
      focalLength: '20mm',
      location: '',
      date: 'January 15, 2026'
    },
    palette: ['#0369a1', '#be123c', '#e0f2fe', '#ffe4e6', '#0f172a']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sajid Al Hasan',
    role: 'Creative Director at Dhrubotara Media',
    comment: 'Rahad has an incredible eye for portrait detail. He captured my portfolio portraits with unbelievable depth and perfect framing. Highly recommended!',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Nusrat Jahan',
    role: 'Bridal Client',
    comment: 'Our wedding pictures are breathtaking! Rahad has this uncanny ability to make candid interactions look absolutely cinematic and magical. We love every single shot.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'M. Rahman',
    role: 'Editor, Visual Times',
    comment: 'Rahad\'s street and nature photography tells stories that don\'t even need words. The color grading is extremely consistent and professional.',
    rating: 5
  }
];

export const PACKAGES: BookingPackage[] = [
  {
    id: 'pkg-portrait',
    name: 'Premium Portrait Session',
    description: 'Ideal for creative modeling, corporate headshots, profile refreshes, and individual creative concepts.',
    price: '৳8,000',
    features: [
      '2 Hour outdoor/indoor session',
      '20 Professionally graded & retouched photos',
      'Unlimited high-res source files provided',
      '2 Outfit changes',
      'Online showcase gallery'
    ],
    iconName: 'User'
  },
  {
    id: 'pkg-event',
    name: 'Wedding & Event Cinematic',
    description: 'Full-scale event coverage focusing on details, candid emotions, and family cinematic frames.',
    price: '৳25,000',
    features: [
      'Up to 6 Hours continuous coverage',
      '80+ Fully color-corrected & retouched edits',
      'Complimentary mini cinematic couple shoot',
      'Pre-wedding concept consultation',
      'Express delivery within 7 days'
    ],
    iconName: 'Camera'
  },
  {
    id: 'pkg-urban',
    name: 'Creative Commercial Shoot',
    description: 'Tailored for high-end fashion brands, products, food styling, and commercial visual concepts.',
    price: '৳15,000',
    features: [
      '4 Hour dedicated creative session',
      '30 High-fashion magazine-ready edits',
      'Advanced commercial light setups',
      'Full brand usage licensing rights',
      'Custom color grading matching brand palettes'
    ],
    iconName: 'Sparkles'
  }
];
