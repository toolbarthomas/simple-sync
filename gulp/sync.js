module.exports = (GULP, GULP_PLUGINS) => {

    return function(callback) {

        // Abort if we have
        if((!process.env.SIMPLE_SYNC_HOSTNAME) || (!process.env.SIMPLE_SYNC_USERNAME) || (!process.env.SIMPLE_SYNC_DESTINATION)) {
            process.exit();
            return;
        }

        let sync = GULP.src([
            (process.env.SIMPLE_SYNC_SRC || process.cwd()) + '/**'
        ])
        .pipe(GULP_PLUGINS.changed('sync'))
        .pipe(GULP_PLUGINS.rsync({
            hostname: process.env.SIMPLE_SYNC_HOSTNAME,
            username: process.env.SIMPLE_SYNC_USERNAME,
            destination: process.env.SIMPLE_SYNC_DESTINATION,
            archive: false,
            silent: false
        }));

        return sync;
    };

};