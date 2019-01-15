# Introduction

lazyload

# Install

npm

```bash
npm install "@react-comp/lazyload"
```

yarn

```bash
yarn add "@react-comp/lazyload"
```

# Demo

[demo](https://react-comp.github.io/lazyload/)

# Usage

```js
import Lazyload from "@react-comp/lazyload";
import "@react-comp/lazyload/dist/lazyload.css";

// ...
```

# prop

```js
<Lazyload
  src: string,                    // image source
  defaultSrc: string,             // image default source
  alt?: string,                   // alt
  className?: string[] | string,  // className
  style?: object,                 // style
/>
```

# todo

- [] Support left and right sliding

- [] Support specified trigger distance