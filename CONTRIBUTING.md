# Contributing

## Pull Requests

It will be nice if you want to contribute new codes or improve existing ones. If you would like to add functionality, please submit [an issue](https://github.com/MABelanger/jslib-html5-camera-photo/issues) before start coding.

Please do the following:
* Follow the existing styles (we have an `.editorconfig` file)

### Things to improve & work around
I tried to figure it out how to get the maximum of camera resolution. Not an easy solution, i found that the constraint `video.optional[]` was working but is obsolete :

```js
video.optional: [
  { minWidth: 640 },
  ...
]
```
So the lib use instead the new constraint `video.advanced[]`:
```js
video.advanced: [
  { 'width': {'min': 640} },
  ...
]
```
But with the new constraint `video.advanced[]`, i had problem with my `samsung galaxy S4 environment camera` but not with the `user` environment, so when we use the maximum resolution and the camera won't start it get error of `trackStartError` because the resolution is to hight? So instead of crashing and doing nothing, it fall back to default resolution by trying multiples `minimum width` until they is no more `video.advanced[...]` array. It's a hack, If you have better solution please [contribute](./CONTRIBUTING.md) :)

### Development

1. run `npm install`
2. run `npm start`
3. write your code in ES6
4. push your changes
5. create a PR with a link to the original issue

That's it! Thank you for your contribution!
