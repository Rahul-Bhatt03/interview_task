export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Medicine {
  _id: string;
  name: string;
  genericName: string;
  description: string;
  dosage: string;
  form: string;
  manufacturer: string;
  price: number;
  requiresPrescription: boolean;
  stock: number;
  category: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
}

export interface MedicineResponse {
  success: boolean;
  data: Medicine[];
}