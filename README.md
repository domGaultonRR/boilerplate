# boilerplate

## Getting Started
1. Install node.js
2. Launch Terminal

## GIT
1. git clone https://github.com/domGaultonRR/boilerplate.git
2. git add .
3. git commit -m 'message'
4. git push

## Terminal Commands

### Explanation
1. Creates package.json file with details
2. Downloads required for gulp tasks
3. Run gulp task

### Execution
1. npm init
2. npm install gulp gulp-sass browser-sync gulp-uglify gulp-concat gulp-clean gulp-rename run-sequence pump --save-dev 
3. gulp 


## App Setup
1. DO NOT TOUCH DIST FOLDER!
2. index.html is in the root but copies to dist on launch - edit in root - DO NOT TOUCH DIST!
3. SASS in the scss folder - add more files and include them to main.scss
4. JS currently single file - Files concatinate into app/js/script.js folder then uglify to dist/js/script.js file
5. Remember to link files for the relative dist/index.html file

## Gulp Instructions
1. gulp clean - cleans/clears the dist folder

## Useful links 
1. https://gist.github.com/feliperoberto/9793674
2. http://ryanchristiani.com/getting-started-with-gulp-and-sass/