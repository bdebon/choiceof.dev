//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: ['picsum.photos'],
    // we don't use a vps, on hostinger we use a simple ftp hosting so we can't optimize the images
    unoptimized: true,
  },
  // this is to work with hostinger mutualised server
  trailingSlash: true,
}

module.exports = withNx(nextConfig)
