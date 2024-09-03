Go to [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) for official documentation. This repository only documents patches made for some specific features that I think would help while developing with it.

## Install
```
npm i git+https://github.com/spaarkstudio/stellar.git
```
This will replaces `lenis` dependency source, so you don't have to make any further changes to the codebase to use this fork.
```js
"dependencies": {
    "lenis": "github:spaarkstudio/stellar", // Replaces official version.
}
```

## Changes
- Introduce `changed` boolean variable to `onComplete`.
    - If the scrollTo `target` equals the current scroll offset, `changed` would be `false`, otherwise `changed` would be `true`.
    - Reason: `changed` allows developers to handle asynchronous tasks differently when `scrollTo` does nothing and executes `onComplete`.
```js
lenis.scrollTo(target, {
    duration: 2,
    onComplete(lenis, changed) {
        if (changed) {
            console.log("It did scroll, so I'm executed after 2 seconds.");
        } else {
            console.log("The target is the same as the scroll offset, so I'm executed immediately.");
        }
    }
});
```

- Introduce `ease` option to `ScrollToOptions` and `LenisOptions`.
    - Using `cubicBezier` function from [framer-motion](https://github.com/framer/motion), `ease` takes 4 elements in an array and use that to create bezier curve function.
    - `ease` will overrides `easing` if provided.
    - Just like `easing`, `ease` is useless if `lerp` defined, and `duration` is required to make both works.
    - Reason: `easing` function is nice to have, but usually, bezier curve is enough.
```js
lenis.scrollTo(target, {
    duration: 2,
    ease: [0, 1, 1, 0],
});
```
```js
// Enable bezier curve easing.
lenis.options.lerp = undefined;
lenis.options.duration = 1;
lenis.options.ease = [0, 1, 1, 0];

// Reset to default.
lenis.options.lerp = 0.1;
lenis.options.ease = undefined;
```
