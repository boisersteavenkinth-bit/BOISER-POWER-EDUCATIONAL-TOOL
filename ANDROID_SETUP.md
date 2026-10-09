# Android Development Environment Setup

Complete setup guide for building BOISER as a native Android app.

## System Requirements

- **OS:** macOS 10.15+, Windows 10+, or Linux (Ubuntu 18.04+)
- **RAM:** 8GB minimum (16GB recommended)
- **Disk Space:** 10GB+ for Android SDK and emulator

## Installation Steps

### 1. Install Java Development Kit (JDK)

**macOS:**
```bash
# Using Homebrew
brew install openjdk@17

# Set JAVA_HOME
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

**Windows:**
- Download from: https://www.oracle.com/java/technologies/downloads/#java17
- Install to default location
- Add JAVA_HOME environment variable:
  - `C:\Program Files\Java\jdk-17.x.x`

**Linux (Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install openjdk-17-jdk
```

### 2. Install Android Studio

Download from: https://developer.android.com/studio

**macOS Installation:**
```bash
# Or download DMG and drag to Applications
brew install android-studio
```

**First Launch:**
- Complete the setup wizard
- Install Android SDK (API 34 recommended)
- Install Android Emulator
- Accept licenses: `sdkmanager --licenses`

### 3. Configure Android SDK

**From Android Studio:**
- Preferences/Settings → SDK Manager
- Ensure installed:
  - Android SDK Platform 34
  - Google Play Services
  - Android SDK Build-Tools 34.x
  - Android Emulator
  - Android SDK Command-line Tools

**Via Command Line:**
```bash
sdkmanager "platforms;android-34"
sdkmanager "build-tools;34.0.0"
sdkmanager "emulator"
sdkmanager "system-images;android-34;google_apis;arm64-v8a"
```

### 4. Set Environment Variables

**macOS/Linux (~/.zshrc or ~/.bashrc):**
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# OR
# export ANDROID_HOME=$HOME/Android/Sdk  # Linux
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Windows (System Environment Variables):**
- Right-click Computer → Properties
- Advanced System Settings → Environment Variables
- Add:
  - `JAVA_HOME`: `C:\Program Files\Java\jdk-17.x.x`
  - `ANDROID_HOME`: `C:\Users\YOUR_USER\AppData\Local\Android\Sdk`
  - Add to PATH: `%ANDROID_HOME%\emulator`, `%ANDROID_HOME%\platform-tools`

### 5. Verify Installation

```bash
# Check Java
java -version
# Output: openjdk version "17.x.x"

# Check Android SDK
adb version
# Output: Android Debug Bridge version 1.0.x

# Check Gradle
gradle --version
# Output: Gradle x.x

# Check Android tools
sdkmanager --list
```

### 6. Create Android Virtual Device (Emulator)

**From Android Studio:**
1. Tools → Device Manager
2. Create Virtual Device
3. Select: Pixel 6 Pro, API 34, Google Play
4. Allocate: 4GB RAM, 2GB storage

**Or via Command Line:**
```bash
sdkmanager "system-images;android-34;google_apis;arm64-v8a"

avdmanager create avd -n "Pixel6-API34" \
  -k "system-images;android-34;google_apis;arm64-v8a" \
  -d "pixel_6_pro"
```

### 7. Start Emulator for Testing

```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel6-API34

# Or use Android Studio: Device Manager → Play button
```

## Troubleshooting Setup Issues

### "ANDROID_HOME not found"
```bash
# Find your SDK location
find ~ -name "sdk" -type d 2>/dev/null | grep -i android

# Then set it:
export ANDROID_HOME=/path/to/sdk
```

### "Gradle sync failed"
- In Android Studio: File → Invalidate Caches → Restart
- Or manually: `./gradlew clean`

### "adb command not found"
```bash
# Add to PATH
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### "No emulator device found"
Create a new AVD as shown above, or connect a physical device with USB Debugging enabled.

### "Insufficient disk space"
Android SDK requires ~10GB. Ensure you have space:
```bash
df -h  # macOS/Linux
# Or check disk space in Windows File Explorer
```

## Physical Device Setup (Alternative to Emulator)

**Enable Developer Mode:**
1. Settings → About Phone
2. Tap "Build Number" 7 times
3. Go back to Settings → System → Developer Options
4. Enable "USB Debugging"

**Connect via USB:**
```bash
adb devices
# Should list your device

# Grant permissions when prompted on phone
```

## Next Steps

Once setup is complete:
```bash
cd boiser-power-educational-tool
npm install
npm run build:apk
```

See `BUILD_APK_GUIDE.md` for full build instructions.

## Additional Resources

- [Android Studio Installation](https://developer.android.com/studio/install)
- [Capacitor Android Setup](https://capacitorjs.com/docs/android)
- [Java Development Kit](https://www.oracle.com/java/technologies/javase-downloads.html)
- [ADB (Android Debug Bridge)](https://developer.android.com/studio/command-line/adb)
