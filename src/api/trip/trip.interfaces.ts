interface RoutingApiResponseRoutes {
  legs: unknown[];
  weight_name: string;
  geometry: string;
  weight: number;
  distance: number;
  duration: number;
}

interface RoutingApiResponseWaypoints {
  hint: string;
  distance: number;
  location: unknown[];
  name: string;
}

export interface RoutingApiResponseData {
  code: string;
  waypoints: RoutingApiResponseWaypoints[];
  routes: RoutingApiResponseRoutes[];
}
