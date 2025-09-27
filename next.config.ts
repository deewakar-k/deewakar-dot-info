import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.{glsl,vs,fs,vert,frag}": {
        loaders: ["raw-loader", "glslify-loader"],
        as: "*.js",
      },
    }
  },
  // Exclude playground directory from production builds
  ...(process.env.NODE_ENV === 'production' && {
    webpack: (config: any) => {
      config.plugins.push(
        new (require('webpack').IgnorePlugin)({
          resourceRegExp: /^\.\/playground$/,
          contextRegExp: /src\/app$/,
        })
      );
      return config;
    },
  }),
};

export default nextConfig;
