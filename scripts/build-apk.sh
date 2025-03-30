#!/bin/bash

echo "🚀 Starting APK build process..."

# Clear metro bundler cache
echo "📦 Cleaning expo cache..."
npx expo start --clear

# Build the Android bundle
echo "🔨 Building Android bundle..."
npx expo prebuild --platform android

# Create build using EAS
echo "🏗️ Creating build with EAS..."
eas build -p android --profile preview

# Build the APK locally
echo "🏗️ Building APK locally..."
cd android && ./gradlew assembleRelease

echo "✅ Build process completed!"
echo "Check the 'android/app/build/outputs/apk/release' directory for the APK file"



//PS C:\Users\david\AppData\Local\Android\Sdk\platform-tools> ./adb devices
//List of devices attached
//emulator-5554   device
