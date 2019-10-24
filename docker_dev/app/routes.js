var routes = [
  { target: process.env.SIEP_LARAVEL_API || 'http://localhost', path: '/api', target_path: '/api' },
  { target: process.env.SIEP_LARAVEL_API || 'http://localhost', path: '/public/api', target_path: '/' },
  { target: process.env.SIEP_LARAVEL_API || 'http://localhost', path: '/telescope', target_path: '/' },
  { target: process.env.SIEP_AUTH_API || 'http://localhost', path: '/auth', target_path: '/' }
];

module.exports = routes;
