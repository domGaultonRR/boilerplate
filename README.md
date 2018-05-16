# boilerplate

## Getting Started
* Install node.js
* Launch Terminal

## GIT
* `git clone https://github.com/domGaultonRR/boilerplate.git`
* `git add .` Adds everything
* `git commit -m '{message}'` Add commit message 
* `git push` Push to repo

## Terminal Commands
* `gulp` run app

## Linting 
* `.csscomb.json` Reorders sass styling (via `sass` gulp task)
* `.stylelintrc` Filters reordered sass to catch any errors (via `sass` gulp task)
* `.eslintrc` JavaScript linting


## App Setup
* DO NOT TOUCH DIST FOLDER!
* index.html is in the root but copies to dist on launch - edit in root - DO NOT TOUCH DIST!
* SASS in the scss folder - add more files and include them to main.scss
* Javascript files starting with _[name].js will concatinate then uglify to dist/js/script.js file
* Remember to link files for the relative dist/index.html file
