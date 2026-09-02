/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // The wellness shop is withdrawn pending product, pricing and compliance
      // answers. Temporary (307) rather than permanent so the URL can be
      // reinstated without browsers holding a cached 308 against it.
      { source: '/wellness-shop', destination: '/services', permanent: false },
    ]
  },
}

export default nextConfig
