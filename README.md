# lepto-resize

```console
$ npm i -D lepto-resize
```

See [lepto documentation](https://github.com/dimitrinicolas/lepto) for usage.

Default options:
```js
"use": [
  {
    "name": "lepto-resize",

    "kernel": null, /* "nearest", "cubic", "lanczos2" or "lanczos3", see Sharp doc */

    "width": null,
    "height": null,

    "maxWidth": null,
    "maxHeight": null,
    "maxSize": null,

    "retina": [], /* List of retina sizes, eg: 2, 3... */
    "prefix": "@", /* Retina prefix of the number */
    "suffix": "x" /* Retina suffix of the number */
  }
]
```

The `maxSize` will keep image's aspect ratio and limit his width and height to its value.

To generate retina alternatives, simply add the `retina` option like this: `"retina": [2, 3]`, it will output 3 files, the original one, a two times bigger suffixed with a `@2x` suffix, and a three times bigger with a `@3x`.

## Usage advices

The simplest solution to employ retina resources is to use the `<pictures>` tag:

```html
<img srcset="assets/output/image.jpg,
             assets/output/image@2x.jpg 2x,
             assets/output/image@3x.jpg 3x"
     src="assets/output/image.jpg" alt="">
```

Easy, isn't it?

You can learn even more with the [images.guide](https://images.guide/) by Addy Osmani.

## License

This project is licensed under the [MIT license](LICENSE).
