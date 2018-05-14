// Fetch the required environment variables
// Defined within the .env file within
// the current working directory

require('dotenv').config();

const GULP = require('gulp');
const GULP_PLUGINS = require('gulp-load-plugins')();
const CHALK = require('chalk');
const FS = require('fs-extra');

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

// Setup the sync task
GULP.task('default', (done) => {
    // Exit if one of the required environment variables aren't defined.
    if((!process.env.SIMPLE_SYNC_SRC) || (!process.env.SIMPLE_SYNC_DEST)) {
        console.log(CHALK.red('[ ERROR ] - no source or destination directory has been defined for our sync task.'));
        process.exit();
    }

    // Exit when the source directory doesn't exists.
    if (!FS.existsSync(process.env.SIMPLE_SYNC_SRC)) {
        console.log(CHALK.red('[ ERROR ] - our source location doesn\'t exists. Please check your current src location: ' + process.env.SIMPLE_SYNC_SRC));
        process.exit();
    }

    // Define the ignore list based from the environment file
    let ignore_files = process.env.SIMPLE_SYNC_IGNORE || [];
    if(ignore_files && ignore_files.length > 0) {
        ignore_files = ignore_files.split(',');
    }

    let sync = GULP.src('package.json').pipe(
        GULP_PLUGINS.directorySync(
            process.env.SIMPLE_SYNC_SRC,
            process.env.SIMPLE_SYNC_DEST,
            {
                nodelete: true,
                ignore: ignore_files
            }
        )
    );

    return sync;
});

GULP.task('watch', function() {

    return GULP_PLUGINS.watch([
        process.env.SIMPLE_SYNC_SRC + '/**',
    ], function() {
        return GULP.start('default');
    });

});