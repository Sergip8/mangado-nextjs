
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
        {
          protocol: 'http',
          hostname: 'mangado.sytes.net',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'mangadoimages1405715681.blob.core.windows.net',
          port: '',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
  },
  

  }