// for nextjs project

module.exports = {
  apps: [
    {
      name: "bpc_fe",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};