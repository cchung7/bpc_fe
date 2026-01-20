// for nextjs project

module.exports = {
  apps: [
    {
      name: "frisco_fighter_frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
