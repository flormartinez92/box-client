import { LatLngTuple } from 'leaflet';

export interface feikdata {
  id: string;
  packageID: string;
  direction: string;
  location: string;
  status: string;
  nombre: string;
  latlon: LatLngTuple;
}
export interface PackageData {
  id: string;
  packageID: string;
  direction: string;
  location: string;
  status: string;
  nombre: string;
  latlon: LatLngTuple;
}

export interface FakeDataAll {
  pending: PackageData[];
  history: PackageData[];
}
