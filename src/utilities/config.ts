const isProduction: boolean = false;

const config = {
  APP_BASE_URL: `${
    isProduction
      ? 'https://maple-visa-guide-server.onrender.com/mapleapi'
      : 'http://localhost:8080/mapleapi'
  }`,
};

export default config;
