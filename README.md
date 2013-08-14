# grunt-writing

> Generate a simple collection of HTML posts from markdown, and an index of teasers.

[![NPM](https://nodei.co/npm/grunt-writing.png)](https://nodei.co/npm/grunt-writing/)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-writing --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-writing');
```

## The "writing" task

### Overview
In your project's Gruntfile, add a section named `writing` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  writing: {
    '<target>': {
      meta: {
        title: <site_title>,
        description: <site_description_(optional)>,
        author: <site_author>,
        url: <site_url>,
        lang: <language_code_(optional)>
      },
      templates: '<directory_containing_jade_templates>',
      posts: '<directory_containing_markdown_posts>',
      dest: '<output_directory>'
    }
  }
});
```

#### Example Config

```js
grunt.initConfig({
  writing: {
    build: {
      meta: {
        title: 'The Blog',
        description: 'IT\'s a blog,
        author: 'The Blogger',
        url: 'http://the-blog.com'
        lang: 'en'
      },
      templates: 'src/templates',
      src: 'src/posts',
      dest: 'build'
    }
  }
});
```

### Templates

All templates are expected to be written in jade. The templates folder _must_ contain a minimum of 3 files: `post.jade`, `index.jade` & `archive.jade`. You're free to use whatever layouts / mixins you want, but you can't change the names of these files.

The `post` object is available to the `post.jade` template. The `posts` array is available to the `index.jade` and `archive.jade` templates. The `meta` object is available to all 3 templates (as well as your layouts).

#### RSS Feed

The `rssURL` property is added to the `meta` object for use in templating.
