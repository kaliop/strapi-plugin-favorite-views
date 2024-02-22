# Admin notification plugin

This package lets you create "favorite views" to simplify access to specific searches within a defined content type.
Make your searches easier by creating links to customized views in your Strapi interface.

## Port mapping

Development is on port 8000 & 1337 for usage

## Installation

In your Strapi app git clone this plugin on your folder `src/plugins`
And on the `config` folder, add this content:

```
module.exports = ({ env }) => ({
    "favorite-views": {
      enabled: true,
      resolve: "./src/plugins/favorite-views",
    },
});
```

## How to use

This plugin lets you create views to directly access your favorite filter selection in the content type of your choice.
Install the plugin and once you've selected your filters, click on "create new view" and you now have it on "My private view" widget.
You can also share your views with specific roles.
