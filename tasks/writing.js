/*
 * grunt-writing
 * https://github.com/colingourlay/grunt-writing
 *
 * Copyright (c) 2013 Colin Gourlay
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
// var path = require('path');

var _ = require('lodash');
var jade = require('jade');
var jsYAML = require('js-yaml');
var marked = require('marked');
var pygmentize = require('pygmentize-bundled');

marked.setOptions({
  gfm: true,
  anchors: true,
  highlight: function (code, lang, callback) {
    pygmentize({
      format: 'html',
      lang: lang
    }, code, function (err, result) {
      callback(err, result.toString());
    });
  }
});

function writing(grunt) {
  grunt.registerMultiTask('writing', 'Combines markdown and templates to create static pages.', function () {
    var task = this;
    var done = task.async();
    var options = task.options();

    var templates = {
      post: jade.compile(fs.readFileSync(task.data.templates.post, 'utf8'), {pretty: true, filename: task.data.templates.post}),
      index: jade.compile(fs.readFileSync(task.data.templates.index, 'utf8'), {pretty: true, filename: task.data.templates.index})
    };

    var posts = [];
    var numRemainingPosts = grunt.file.expand({filter: 'isFile'}, [task.data.src + '/**']).length;

    grunt.file.recurse(task.data.src, function (filepath) {
      var post = {};
      var text = fs.readFileSync(filepath, 'utf8');

      try {
        if (text.indexOf('----') === 0) {
          post = jsYAML.load(text.split('----')[1]);
          post.markdown = _.rest(text.split('----'), 2).join('');
        } else {
          grunt.fail.fatal('incorrect metadata format: ' + filepath);
        }
      } catch (e) {
        grunt.fail.fatal('exception while parsing: ' + filepath);
      }

      if (!post.markdown.length) {
        grunt.fail.fatal('no content: ' + filepath);
      }

      post.url = '/' + filepath.split('/').reverse()[0].replace('.markdown', '/');
      post.filepath = task.data.dest + post.url + 'index.html';

      marked(post.markdown, function (err, content) {
        if (err) {
          grunt.fail.fatal('failed to parse markdown: ', filepath);
        }

        post.content = content;
        post.teaser = content.split('</p>')[0] + '</p>';
        posts.push(post);

        if (!--numRemainingPosts) {
          posts = _.sortBy(posts, 'date');

          _.each(posts, function (post) {
            grunt.file.write(post.filepath, templates.post({post: post}));
          });

          grunt.file.write(task.data.dest + '/index.html', templates.index({posts: posts}));

          done();
        }
      });
    });
  });
}

module.exports = writing;
