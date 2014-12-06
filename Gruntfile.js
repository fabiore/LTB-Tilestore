/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),
        copy: {
            mob: {
                files: [
                    {
                        cwd: 'app',  // set working folder / root to copy
                        src: '**/*',           // copy all files and subfolders
                        dest: 'cordova/www',    // destination folder
                        expand: true           // required when using cwd
                    }
                ]
            }
        },
        nggettext_extract: {
            pot: {
                files: {
                    'po/language.pot': [
                        'app/components/*/*.html',
                        'app/modules/*/*.html',
                    ]
                }
            }
        },
        nggettext_compile: {
            all: {
                options: {
                    format: "json"
                },
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: "po",
                        dest: "app/languages",
                        src: ["*.po"],
                        ext: ".json"
                    }
                ]
            }            
        }
    });
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('gettext');
    grunt.registerTask('copy-cordova', function(target) {
        grunt.task.run('copy');
    });
};
