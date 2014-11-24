module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    BASE_PATH: '',
    DEVELOPMENT_PATH: '',

    yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    extension: '.js',                               
                    paths: '<%= DEVELOPMENT_PATH %>' + 'src/',
                    outdir: '<%= BASE_PATH %>' + 'docs/'
                }
            },

            compileDebug: {
                name: '<%= pkg.debug.name %>',
                description: '<%= pkg.debug.description %>',
                version: '<%= pkg.debug.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    extension: '.js',                               
                    paths: '<%= DEVELOPMENT_PATH %>' + 'debug/src/',
                    outdir: '<%= BASE_PATH %>' + 'debug/docs/'
                }
            }
        },

    uglify: {
            build: {
                files: {
                'build/<%= pkg.filenameBase %>-<%= pkg.version %>.min.js': ['build/<%= pkg.filenameBase %>-<%= pkg.version %>.js']
            }
        }
    },
 
    concat: {
          build: {
            src:[ 'src/core.js','src/*', 'src/chipmunk-extended/*'],
            dest: 'build/<%= pkg.filenameBase %>-<%= pkg.version %>.js'
          },
          debug: {
            src:['debug/src/core.js','debug/src/*'],
            dest: 'build/<%= pkg.filenameBase %>-debug-<%= pkg.version %>.js'
          }
    }

 });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-concat');

  
  
  
  grunt.registerTask("default", ["concat:build","concat:debug","uglify:build"]);
  grunt.registerTask("docs", ["yuidoc:compile","yuidoc:compileDebug"]);
  grunt.registerTask("full", ["concat:build","concat:debug","uglify:build","yuidoc:compile","yuidoc:compileDebug"]);
  
  

};