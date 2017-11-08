
"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-browser-sync');



  grunt.initConfig({
    less: {
      style: {
        files: {
          "css/main.css": "less/style.less"
        }
      }
    },

    browserSync: {
      bsFiles: {
          src : 'casablanca/css/*.css'
      },
      options: {
          server: {
              baseDir: "./"
          }
      }
  },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less"]
      }
    }
  });

   

  
  grunt.registerTask("default", ["watch","browserSync"]) 

}
