# Scrollster for instagram v1.2

Scrollster for instagram is the easiest way to get a customized, full-screen, display of any instagram feed.  As its name implies, Scrollster loads the images you want and scrolls through them.

## Installation

Navigate to the `assets/js` folder open the `scrollster.js` file and enter your [clientID](https://instagram.com/developer/clients/manage/) on line 1.

## Usage

Simply open index.html in your browser and Scrollster will display the most popular images on instagram.  Click on the hashtag to enter full-screen mode.

## Customization

There are two ways to customize the output of Scrollster, the first is with the URL query string and the second is by editing scrollster.js

### Query String

There are a number of options that you can use to customize the display of Scrollster using the query string.

* tag: You can use `tag=tagname` to show a specific tag from instagram.  If no tag is provided, images from the "popular page" are displayed. You don't need to add "#" at the beginning, just the name of the tag. [default: null]
* images: You can use `images=##` to set how many images to fetch (maximum 60). [default: 60]
* size: You can use `size=small` to select which size image to fetch from instagram.  Available sizes are: small, medium, and large. [default: large]
* speed: you can use `speed=##` to control the speed in seconds the page takes to scroll from top to bottom and vice versa. [default: 90]
* pause: You can use `pause=##` to control the time in seconds the scroll pauses at the top and bottom of the screen.  [default: 10]
* reload: You can use `reload=##` to control the time in minutes Scrollster waits to get new images from instagram. [default 60]
* sort: You can use `sort=none` to control the order in which the images are sorted on the page.  Available sort options are: none, most-recent, least-recent, most-liked, least-liked, most-commented, least-commented, and random. [default: none]
* author: You can use `author` to display the username of the person who posted the picture. [default: null]
* caption: You can use `caption` to display the caption that was originally posted with the image (including hashtags) [default: null]
* comments: You can use `comments` to display the comment count on the image. [default: null]
* likes: You can use `likes` to display the number of likes on an image. [default: null]
* link: You can use `link` so that clicking the image will take the user to the image post on instagram. [default: null]
* background: You can use `background=red` to change the default background color.  If you use hex or rgb be sure to encode the URL. [default: null]
* color: You can use `color=purple` to change the default font color.  If you use hex or rgb be sure to encode the URL (# is %23). [default: null]
* clientid: You can use `clientid=##` to provide or override a clientID inserted in scrollster.js. [default: null]

### scrollster.js

Most of the variables that control the output of Scrollster are in the `urlParams{}` object.  Simply change the default values that you want.  If you don't want users to be able to modify the output with the query string then at the top of scrollster.js set `enableQuery = false;` and only the settings from the js file will be used. 

## Examples

`?tag=spring&author&sort=random`: Display 60 large images all tagged "spring" with the username displayed, slowly scrolling up and down.

`?size=small&sort=most-liked&speed=0&refresh=5&likes&link`: Display a small grid that doesn't scroll of the most popular images on instagram that refreshes every 5 minutes, sorted by likes and you can click to see the original on instagram.

`?tag=tbt&author&likes&comments&caption`: See who's throwing back and what they have to say about it.

## License

Scrollster is built using a combination of open source and proprietary code.  The individual licenses for each open source component can be found in the LICENSE folder.

### Main

Scrollster for instagram is copyright 2015 Danny Wahl, all rights reserved except where specified in the LICENSE file.

### Vendor

* [Freewall](http://vnjs.net/www/project/freewall/) | &copy; Minh Nguyen | MIT License
* [HTML 5 Boilerplate](https://html5boilerplate.com/) | &copy; HTML 5 Boilerplate | MIT License
* [Instafeed.js](http://instafeedjs.com/) | &copy; Steven Schobert | MIT License
* [jQuery](https://jquery.org/) | &copy; jQuery Foundation and other contributors | MIT License
* [Modernizr](http://modernizr.com/) | &copy; Faruk Ateş | MIT License
* [Normalize.css](http://necolas.github.io/normalize.css/) | &copy; Nicolas Gallagher and Jonathan Neal | MIT License
* [Screenfull.js](http://sindresorhus.com/screenfull.js/) | &copy; Sindre Sorhus | MIT License

## Changelog
* 1.2
* * Minimized logo
* * Removed extra CSS selectors
* 1.1
* * Fix scroll/pause timing: Now runs as soon as the page is loaded
* * Fix reference to `scroll.js` to `scrollster.js`
* 1.0
* *  Initial release