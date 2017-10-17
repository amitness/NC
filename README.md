# NC
WebExtension that automatically localizes prices on webpages to Nepalese Currency.

![Imgur](http://i.imgur.com/G2HC8Zr.gif)


## How the extension works
- The extension fetches latest currency exchange rate in the morning and caches it
- Converts all prices on webpages in foreign currency to equivalent NC.

For example, when you visit amazon.com, you'll get all prices in $X replaced with Rs. XXX.

#### Before
![Imgur](http://i.imgur.com/I2E7vhi.png)
#### After using extension
![Imgur](http://i.imgur.com/RnaerKw.png)

## Installation

- Clone the repo.

  ```shell
  git clone https://github.com/amitness/NC
  ```

### Testing on Firefox.
Install web-ext tool using npm/yarn.
```shell
yarn global add web-ext
```
Navigate to the project and run
```shell
web-ext run
```
You can see extension in action.

### Installing on Firefox.
Build the extension and load it from `Addons -> Extensions -> Install Addon from file.`
```shell
web-ext build
```
  
  ### Installing on Chrome

- Load the extension into Google Chrome as an Unpacked Extension:

  
  - Navigate to (1a) chrome://extensions or (1b) select Menu > More Tools > Extensions.
  - Enable the (2) developer mode at top right.
  - Click (3) "Load Unpacked Extension".
  - Navigate to the cloned folder.  
  For additional help, refer the [official guide for Chrome](https://developer.chrome.com/extensions/getstarted#unpacked).
  
  
	![Installation screenshot](https://cloud.githubusercontent.com/assets/6765956/23824934/6104b958-064e-11e7-9834-9ec025b068c2.png)
  
### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
