import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // 使用 import.meta.dirname 替代 __dirname（Vite 8 原生配置加载器要求）
        "@": `${import.meta.dirname}/src`,
        "@components": `${import.meta.dirname}/src/components`,
        "@utils": `${import.meta.dirname}/src/utils`,
        "@api": `${import.meta.dirname}/src/api`,
        "@store": `${import.meta.dirname}/src/store`,
        "@styles": `${import.meta.dirname}/src/styles`,
        "@types": `${import.meta.dirname}/src/types`,
        "@layouts": `${import.meta.dirname}/src/layouts`,
        "@router": `${import.meta.dirname}/src/router`,
        "@pages": `${import.meta.dirname}/src/pages`,
      },
    },
    build: {
      // 只转译现代浏览器，减少 polyfill 和转译开销
      target: "es2020",
      // 使用 terser 压缩，可移除生产环境的 console/debugger
      minify: isProd ? "terser" : false,
      terserOptions: isProd
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
            format: {
              comments: false,
            },
          }
        : undefined,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Vite 8 (Rolldown 内核) 使用 advancedChunks 做手动分包
          advancedChunks: {
            groups: [
              {
                // React 全家桶：更新频率低，单独拆出利于长效缓存
                name: "react-vendor",
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
                priority: 3,
              },
              {
                // antd 及其生态（rc-* 组件），体积大头，单独拆出
                name: "antd-vendor",
                test: /[\\/]node_modules[\\/](antd|@ant-design|rc-[^\\/]+)[\\/]/,
                priority: 2,
              },
              {
                // 其余第三方依赖统一归入 vendor
                name: "vendor",
                test: /[\\/]node_modules[\\/]/,
                priority: 1,
              },
            ],
          },
        },
      },
    },
  };
});
