export interface Package {
  address?: string;
  addressNumber?: number;
  postalCode?: number;
  status?: 'in course' | 'pending' | 'delivered';
  deliveryCode?: string;
  city?: string;
  deadline?: Date;
  deliveriedDate?: Date;
  createdAt?: Date;
  assignedDate?: Date;
  coordinates?: number[];
  receptorName?: string;
  weight?: number;
  _id?: string;
  toggleStatus?: boolean;
}
