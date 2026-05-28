/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BusinessVertical = 'clinic' | 'salon' | 'consultant' | 'fitness';

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number; // in USD
  description: string;
  category: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  avatarUrl?: string;
  bio: string;
  availability: string; // e.g., "Mon - Fri"
}

export interface OnboardingStep {
  title: string;
  description: string;
  illustration: string; // Tailwind bg or gradient details
}

export interface BusinessConfig {
  id: BusinessVertical;
  name: string;
  tagline: string;
  primaryColor: string; // e.g., 'emerald' or 'amber'
  gradientFrom: string; // Tailwind gradient starting class
  gradientTo: string; // Tailwind gradient ending class
  textColor: string;
  iconName: string;
  services: Service[];
  specialists: Specialist[];
  onboarding: OnboardingStep[];
  location: string;
  phone: string;
}

export interface Appointment {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: Service;
  specialist: Specialist;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  notes?: string;
  createdAt: string;
}

export type AppScreen = 'onboarding' | 'login' | 'services' | 'specialists' | 'datetime' | 'checkout' | 'confirmation';
