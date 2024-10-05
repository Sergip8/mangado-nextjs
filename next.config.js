
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
          hostname: 'mangado.blob.core.windows.net/mangado-images',
          port: '',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
  },
  

  }