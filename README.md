# Android Safe Box
A personal project to compare the performances of two app development frameworks on Android. This app was built with NativeScript + SQLcipher and will be compared against this one https://github.com/pierremacedo/android-safe-box-v2 built with React Native + Realm.

This app as its name implies stores sensitive information such as bank accounts, credit cards, personal documents, etc., on Android devices. 

## Download

https://github.com/pierremacedo/android-safe-box-v1/releases/download/v1.0/android-safe-box.apk

## Security
The SQLCipher database encrypts data with 256-bit AES. A 512-bit encryption key is generated from a ten characters password provided by the user. This key is temporally stored on the device using this secure module created by myself https://github.com/pierremacedo/nativescript-temporary-key-storage.

## Performance Analysis

### Startup
I couldn't see any difference here. Both apps start up in an acceptable time.

### Creating the database
The first step is to type a ten characters password in order to create a new encrypted database, and after that, the app automatically navigates to the main screen. This process is slightly faster with NativeScript. 

### Navigation
This is a real problem here. Navigating between different screens is considerably slower with NativeScript, but not only that, in my opinion it almost makes the app unusable.

### Adding, editing and deleting data
SQLite isn't the fastest database to work with. It wasn't a surprise its performance was slower than Realm in my tests.

### Conclusion
React Native certainly allows us to create apps with a smoother navigation which is something really crucial where NativeScript fails. Also, at the moment I created this project, the only suitable database with encryption capability available for NativeScript was SQLcipher, and it's an important downside since Realm is a faster option.

NativeScript comes with Webpack that promises to speed up our apps, but this is a buggy tool. I couldn't make it work. The time you'll waste fixing Webpack errors, you could be already building a faster app with React Native.


## Screenshots
<p align="center">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/splashscreen.png" height="350" title="splash screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/registerscreen.png" height="350" title="register screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/loginscreen.png" height="350" title="login screen">  
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/mainscreen.png" height="350" title="main screen">  
</p>
