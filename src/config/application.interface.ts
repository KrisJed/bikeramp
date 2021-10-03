export interface DbConfig {
  connectionString: string;
}

export interface UnitsConfig {
  currency: string;
  distance: string;
}

export interface AppConfig {
  db: DbConfig;
  units: UnitsConfig;
}
