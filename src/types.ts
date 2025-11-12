export type IpifyGeo = {
  ip: string;
  isp: string;
  location: {
    city: string;
    region: string;
    postalCode: string;
    lat: number;
    lng: number;
    timezone: string; // "UTC-05:00"
  };
};