module.exports = function(grunt) {

    grunt.initConfig({
        nwjs: {
          options: {
            build_dir: './build',
            mac_icns: './app/icon.icns',
            platforms: ['osx64'],
            version: '0.12.2'
          },
          src: './app/**/*'
        },
        copy: {
            main: {
                files: [
                    {
                        src: 'libraries/mac/ffmpegsumo.so',
                        dest: 'build/yandex-music/osx64/yandex-music.app/Contents/Frameworks/nwjs Framework.framework/Libraries/ffmpegsumo.so',
                        flatten: true
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['nwjs', 'copy']);

};