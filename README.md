© All rights reserved 
# Android Safe Box
It's a personal project to compare the performance of two mobile app development frameworks. This app was built with NativeScript + SQLcipher and will be compared against this one https://github.com/pierremacedo/android-safe-box-v2 built with React Native + Realm.

## Security
The SQLCipher database encrypts data with 256-bit AES. A 512-bit encryption key is generated from a ten characters password provided by the user. This key is temporally stored on the device using this secure module created by myself https://github.com/pierremacedo/nativescript-temporary-key-storage.

## Performance Analysis

### Startup
I couldn't see any difference here. Both apps start fast.

### Creating the database
The first step is to type a ten characters password to create a new encrypted database, and after that, the app automatically navigates to the main screen. This process is slightly faster with NativeScript. 

### Navigation
This is a real problem here. Navigating between different screens is considerably slower with NativeScript, but not only that, in my opinion, it almost makes the app unusable.

### Adding, editing, and deleting data
SQLite isn't the fastest database to work with. It wasn't a surprise its performance was slower than Realm in my tests.

### Conclusion
React Native allows us to create apps with smoother navigation which is something crucial where NativeScript fails. And when I built this app, the only database with encryption capability available for NativeScript that met my needs was SQLcipher. It's a downside since Realm is a faster option.

NativeScript comes with Webpack that promises to speed up our apps, but this is a buggy tool. I couldn't make it work. The time you'll waste fixing Webpack errors, you could be already building a faster app with React Native.


## Screenshots
<p align="center">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/splashscreen.png" height="350" title="splash screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/registerscreen.png" height="350" title="register screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/loginscreen.png" height="350" title="login screen">  
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v1/master/screenshots/mainscreen.png" height="350" title="main screen">  
</p>
