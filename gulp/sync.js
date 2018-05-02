module.exports = (GULP, GULP_PLUGINS) => {

    return function(callback) {

        let sync = GULP.src([
            (process.env.SIMPLE_SYNC_SRC || process.cwd()) + '/**'
        ])
        .pipe(GULP_PLUGINS.changed('sync'))
        .pipe(GULP_PLUGINS.rsync({
            hostname: process.env.SIMPLE_SYNC_HOSTNAME || 'localhost',
            username: (process.env.SIMPLE_SYNC_USERNAME || 'root'),
            password: (process.env.SIMPLE_SYNC_PASSWORD || 'root'),
            destination: process.env.SIMPLE_SYNC_DESTINATION || '',
            archive: false,
            silent: false
        }));

        return sync;
    };

};