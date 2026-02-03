
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export enum AppointmentStatus {
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed'
}

export enum AssignmentType {
  MANUAL = 'manual',
  SYSTEM_AUTO = 'system_auto'
}

export interface User {
  id: string;
  name: string;
  dob: string;
  gender: Gender;
  phone: string;
  email: string;
  creditBalance: number;
  profilePic?: string;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  rank: number;
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  contact: string;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  priceInfo: string;
}

export interface Appointment {
  id: string;
  userId: string;
  outletId: string;
  date: string;
  timeSlot: string;
  stylistId: string | null; // null if unassigned
  assignmentType: AssignmentType;
  serviceNames: string[];
  status: AppointmentStatus;
  createdAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booked' | 'cancelled' | 'rescheduled' | 'assigned' | 'reminder' | 'marketing';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export type AuthMode = 'phone' | 'email';
