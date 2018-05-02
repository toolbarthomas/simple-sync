// Fetch the required environment variables
// Defined within the .env file within
// the current working directory

require('dotenv').config();

// We use chalk to style output messages
const CHALK = require('chalk');

// Abort synchronization when no environment file
// has been specified.
try {
    if(!process.env) {
        console.log(CHALK.red('No environment file has been specified. Simple Sync cannot set any required environment variables.'));
        process.exit();
    }
} catch (error) {
    console.log(CHALK.red(error));
}

// Load Gulp for our workflow
const GULP = require('gulp');

// Load all Gulp plugins defined within the package.json file
const GULP_PLUGINS = require('gulp-load-plugins')();

// Setup the sync task
GULP.task('sync', getTask('sync'));

// Helper function for loading Gulp tasks from seperate files
function getTask(file) {
    return require('./gulp/' + file)(GULP, GULP_PLUGINS);
}