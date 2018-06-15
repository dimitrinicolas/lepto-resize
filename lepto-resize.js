const resize = (opts={}) => {
  const kernelOption = {};
  const retinaPrefix = typeof opts.prefix !== 'undefined' ? opts.prefix : '@';
  const retinaSuffix = typeof opts.suffix !== 'undefined' ? opts.suffix : 'x';

  return function resize(input, fulfill, utils) {
    let finish = -input.outputs.length + 1;
    const next = () => {
      finish++;
      if (finish > 0) {
        fulfill(input);
      }
    };

    if (opts.kernel) {
      kernelOption.kernel = utils.sharp.kernel[opts.kernel];
    }

    if (Array.isArray(opts.retina)) {
      for (let i = 0, l = input.outputs.length; i < l; i++) {
        for (let multiple of opts.retina) {
          if (typeof multiple == 'number') {
            input.outputs.push(Object.assign({}, input.outputs[i], {
              filename: utils.base(input.outputs[i].filename) + retinaPrefix + multiple + retinaSuffix + '.' + utils.ext(input.outputs[i].filename),
              retina: multiple
            }));
          }
        }
      }
    }

    finish = -input.outputs.length + 1;
    for (let i in input.outputs) {
      const size = utils.size(input.outputs[i].buffer);
      let width = typeof opts.width === 'number' ? opts.width : null;
      let height = typeof opts.height === 'number' ? opts.height : null;
      if (width === null && height === null) {
        width = size.width;
        height = size.height;
      }
      if (opts.maxWidth || opts.maxHeight || opts.maxSize) {
        let maxWidth = typeof opts.maxWidth !== 'undefined' ? Math.max(0, parseInt(opts.maxWidth)) : null;
        let maxHeight = typeof opts.maxHeight !== 'undefined' ? Math.max(0, parseInt(opts.maxHeight)) : null;
        let maxSize = typeof opts.maxSize !== 'undefined' ? Math.max(0, parseInt(opts.maxSize)) : null;
        if (maxSize !== null) {
          maxWidth = maxHeight = maxSize;
        }
        if (maxWidth !== null && size.width > maxWidth) {
          height = Math.round(height / width * maxWidth);
          width = maxWidth;
        }
        if (maxHeight !== null && height > maxHeight) {
          width = Math.round(width / height * maxHeight);
          height = maxHeight;
        }
      }
      if (typeof input.outputs[i].retina === 'number') {
        width = typeof width === 'number' ? width * input.outputs[i].retina : width;
        height = typeof height === 'number' ? height * input.outputs[i].retina : height;
      }
      utils.sharp(input.outputs[i].buffer)
        .resize(width, height, kernelOption)
        .toBuffer()
        .then(function(i) {
          return function(buffer) {
            input.outputs[i].buffer = buffer;
            next();
          };
        }(i))
        .catch(next);
    }
  };
};

module.exports = resize;
