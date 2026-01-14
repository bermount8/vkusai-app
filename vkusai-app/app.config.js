module.exports = {
  name: "ВкусAI",
  slug: "vkusai-app",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.yourcompany.vkusai"
  },
  android: {
    package: "com.yourcompany.vkusai"
  },
  plugins: [
    "expo-router"
  ],
  scheme: "vkusai",
  extra: {
    router: {
      origin: false
    }
  }
};
