const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/',
          destination: `http://13.125.206.79:8000/`,
        },
      ];
    },
  };
  
  module.exports = nextConfig;
