/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),
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
    grunt.registerTask('gettext');
};
