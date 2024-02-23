
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dashboard.olympusvisor.com',
          port: '',
          pathname: '/storage/comics/**',
        },
        {
          protocol: 'https',
          hostname: 'mangado.s3.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
  },
  

  }