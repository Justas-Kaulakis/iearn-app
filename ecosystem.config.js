module.exports = {
  apps: [
    {
      name: "server",
      cwd: "./server",
      script: "yarn",
      args: "start",
      max_memory_restart: "256M",
    },
    {
      name: "web",
      cwd: "./web",
      script: "yarn",
      args: "start",
      max_memory_restart: "256M",
    },
  ],
};
