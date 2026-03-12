import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.extensions.push('.rts');
    
    config.module.rules.push({
      test: /\.rts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsSuffixTo: [/\.rts$/],
          },
        },
      ],
    });
    
    return config;
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx', 'rts'],
  turbopack: {
    // Empty config strictly to disable turbopack errors when using webpack
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
