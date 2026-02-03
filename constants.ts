
import { Stylist, Outlet, Service } from './types';

export const SHOP_NAME = 'Oviss Salon';

export const SERVICES: Service[] = [
  { id: '1', name: 'Premium Haircut', priceInfo: 'From RM45' },
  { id: '2', name: 'Perm', priceInfo: 'From RM180' },
  { id: '3', name: 'Color', priceInfo: 'From RM120' },
  { id: '4', name: 'Scalp & Treatment', priceInfo: 'From RM150' },
  { id: '5', name: 'Rebonding', priceInfo: 'From RM200' },
  { id: '6', name: 'Wash & Styling', priceInfo: 'From RM35' },
];

export const STYLISTS: Stylist[] = [
  {
    id: 's1',
    name: 'Jonathan',
    title: 'Creative Director',
    bio: 'With over 15 years of experience, Jonathan specializes in avant-garde cuts and structural styling.',
    image: 'https://picsum.photos/seed/jonathan/400/400',
    rank: 1,
  },
  {
    id: 's2',
    name: 'Fiona',
    title: 'Executive Stylist',
    bio: 'Fiona is a master of hair coloring and balayage techniques, bringing vibrant life to every client.',
    image: 'https://picsum.photos/seed/fiona/400/400',
    rank: 2,
  },
  {
    id: 's3',
    name: 'TuTu',
    title: 'Senior Stylist',
    bio: 'TuTu focuses on scalp health and organic treatments, ensuring style meets hair wellness.',
    image: 'https://picsum.photos/seed/tutu/400/400',
    rank: 3,
  },
];

export const OUTLETS: Outlet[] = [
  {
    id: 'o1',
    name: 'Oviss Salon – Puchong',
    address: '123 Jalan Puchong, 45000 Selangor',
    contact: '012-3456789',
    image: 'https://picsum.photos/seed/puchong/800/450',
  },
  {
    id: 'o2',
    name: 'Oviss Salon – Melaka',
    address: '99 Jalan Hang Tuan, 75000 Melaka',
    contact: '019-6543210',
    image: 'https://picsum.photos/seed/melaka/800/450',
  },
];

export const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

export const PROMO_BANNER = 'https://picsum.photos/seed/promo/1200/600';
