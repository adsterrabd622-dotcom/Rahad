export interface ExifData {
  camera: string;
  lens: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  focalLength: string;
  location: string;
  date: string;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'Portraits' | 'Nature' | 'Urban' | 'Creative';
  featured: boolean;
  exif: ExifData;
  palette: string[]; // Hex colors
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export interface BookingPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  iconName: string;
}
