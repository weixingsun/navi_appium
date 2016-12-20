if (process.env.DEV) {
  exports.iosTestApp = "~/xshare/ios/Share/build/release-iphonesimulator/TestApp.app";
  exports.android_navi_dev = "../navi/android/app/build/outputs/apk/app-debug.apk";
} else {
  exports.iosTestApp = "http://appium.github.io/appium/assets/TestApp7.1.app.zip";
 // exports.android_navi_rel = "http://nzmessengers.co.nz/share/navi_release.apk";
  exports.android_navi_rel = "http://nzmessengers.co.nz/share/navi_release.apk";
}
