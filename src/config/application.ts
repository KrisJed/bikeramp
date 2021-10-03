export default function () {
  return {
    db: {
      connectionString: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_ENDPOINT}`,
    },
    units: {
      currency: 'PLN',
      distance: 'km',
    },
    urls: {
      routeApiUrl: process.env.ROUTE_API_URL,
    },
  };
}
