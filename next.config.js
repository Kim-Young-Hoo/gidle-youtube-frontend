const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/',
          destination: `https://gidleyoutubecollections.ml:8000/`,
        },
      ];
    },
  };
  
  module.exports = nextConfig;

  module.exports = {
    reactStrictMode: true,
    env: {
      API_KEY: process.env.API_KEY,
      // ADMIN_ID: process.env.ADMIN_ID,
      // ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    }
  }
  