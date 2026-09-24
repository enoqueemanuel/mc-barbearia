import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["_arquivo/**"],
  },
];

export default eslintConfig;
