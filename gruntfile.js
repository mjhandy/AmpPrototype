module.exports = function(grunt) {

  const sass = require('node-sass');

  // load grunts tasks automatically
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // build the css file
    sass:{
      options:{
        implementation: sass        
      },
      prd:{
        options:{
          outputStyle: 'compressed'
        },
        files: {
          './css/default.css' : './sass/default.scss'
        }
      },
      default:{
        options:{
          outputStyle: 'expanded'
        },
        files: {
          './css/default.css' : './sass/default.scss'
        }
      }
    },
    // replace CSS
    replace:{
      default:{
        options:{
          patterns: [
            {
              match: 'css',
              replacement: '<%= grunt.file.read("css/default.css") %>'
            },
            {
              match: 'mainNav',
              replacement: '<%= grunt.file.read("components/nav.html") %>'
            },
            {
              match : 'header',
              replacement: '<%= grunt.file.read("components/header.html") %>'
            },
            {
              match: 'footer',
              replacement: '<%= grunt.file.read("components/footer.html") %>'
            },
            {
              match: 'cookieNotification',
              replacement: '<%= grunt.file.read("components/cookieNotification.html") %>'
            }
          ]
        },
        files:[{
          expand: true,
          flatten: true,
          src:[
            'src/*.html'
          ],
          dest: 'dist/'
        }]
      }     
    },    
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true,
          minifCSS : true
        },
        files: {
          './dist/**/*.html' :  './min/**/*.html'
        }
      }
    }, 
    watch:{
      sass: {
        files: [
          './sass/**/*.scss'
        ],
        tasks: ['sass:default']
      },
      replace:{
        files: [
          './css/**/*.css',
          './components/**/*.html',
          './src/**/*.html'
        ],
        tasks: ['replace']
      }
    }
  });


  grunt.registerTask('default', [
    'sass:default',
    'replace:default',
    'watch'
  ]);
  grunt.registerTask('prod', [
    'sass:prd',
    'replace',
  ]);
};