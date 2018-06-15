# lepto-resize

```console
$ npm i -D lepto-resize
```

See [lepto documentation](https://github.com/dimitrinicolas/lepto) for usage.

This plugin has no options, just add it to your plugins list.

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

## License

This project is licensed under the [MIT license](LICENSE).
