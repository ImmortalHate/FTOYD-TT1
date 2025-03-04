import type { NextConfig } from "next";

const nextConfig = {
  webpack: (config: { module: { rules: { test: RegExp; use: (string | false)[]; }[]; }; }, { isServer }: any) => {
    // Обработка .css файлов (глобальные и модули)
    config.module.rules.push({
      test: /\.css$/,
      use: [
        !isServer && 'style-loader',
        'css-loader'
      ].filter(Boolean),
    });

    // Обработка .styl файлов
    config.module.rules.push({
      test: /\.styl$/,
      use: [
        !isServer && 'style-loader',
        'css-loader',
        'stylus-loader'
      ].filter(Boolean),
    });
    
    return config;
  },
};
export default nextConfig;
