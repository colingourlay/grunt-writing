# grunt-writing

> A static site generator

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
      templates: {
        post: '<post_jade_template>',
        index: '<index_jade_template>'
      },
      src: '<directory_containing_markdown_posts>',
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
      templates: {
        post: 'src/templates/post.jade',
        index: 'src/templates/index.jade'
      },
      src: 'src/posts',
      dest: 'build'
    }
  }
});
```
