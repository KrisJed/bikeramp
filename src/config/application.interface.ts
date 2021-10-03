export interface DbConfig {
  connectionString: string;
}

export interface UnitsConfig {
  currency: string;
  distance: string;
}

export interface UrlsConfig {
  routeApiUrl: string;
}

export interface AppConfig {
  db: DbConfig;
  units: UnitsConfig;
  urls: UrlsConfig;
}
