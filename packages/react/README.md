# lenis/react

## Introduction
lenis/react provides a `<ReactLenis>` component that creates a [Lenis](https://github.com/darkroomengineering/lenis) instance and provides it to its children via context. This allows you to use Lenis in your React app without worrying about passing the instance down through props. It also provides a `useLenis` hook that allows you to access the Lenis instance from any component in your app.


## Installation

```bash
npm i lenis
```

## Usage

### Basic

```jsx
import { ReactLenis, useLenis } from 'lenis/react'

function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      { /* content */ }
    </ReactLenis>
  )
}
```

## Props
- `options`: [Lenis options](https://github.com/darkroomengineering/lenis#instance-settings).
- `root`: Lenis will be instanciate using `<html>` scroll. Default: `false`.

## Hooks
Once the Lenis context is set (components mounted inside `<ReactLenis>`) you can use these handy hooks:

`useLenis` is a hook that returns the Lenis instance

The hook takes three argument:
- `callback`: The function to be called whenever a scroll event is emitted
- `deps`: Trigger callback on change
- `priority`: Manage callback execution order

## Examples

### Custom requestAnimationFrame loop:

```jsx
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time)
    }
  
    const rafId = requestAnimationFrame(update)
  
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef}>
      { /* content */ }
    </ReactLenis>
  )
}
```


### GSAP integration

```jsx
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])
  
  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef}>
      { /* content */ }
    </ReactLenis>
  )
}
```

### Framer Motion integration:
```jsx
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';
import { useEffect, useRef } from 'react';

function App() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])


  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef}>
      { /* content */ }
    </ReactLenis>
  )
}
```

## lenis/react in use

- [@darkroom.engineering/satus](https://github.com/darkroomengineering/satus) Our starter kit.

<br/>

## License

MIT © [darkroom.engineering](https://github.com/darkroomengineering)
