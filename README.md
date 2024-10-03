# Acrool Imgz Client

<img src="https://raw.githubusercontent.com/acrool/acrool-imgz-client/main/example/public/og.webp" alt="Acrool Imgz Client Logo"/>

<p align="center">
    This is a Client of the acrool-imgz api server, which can isolate its core from the impact of the environment version.
</p>

<div align="center">


[![NPM](https://img.shields.io/npm/v/@acrool/imgz-client.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/imgz-client)
[![npm](https://img.shields.io/bundlejs/size/@acrool/imgz-client?style=for-the-badge)](https://github.com/acrool/@acrool/imgz-client/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/imgz-client?style=for-the-badge)](https://github.com/acrool/imgz-client/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/imgz-client.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/imgz-client)
[![npm](https://img.shields.io/npm/dt/@acrool/imgz-client.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/imgz-client)


</div>


## Features

- Use axios as the driver for client requests
- Need to set up acrool imgz api server [acrool/acrool-imgz-api](https://github.com/acrool/acrool-imgz-api)

## Installation

```bash
yarn add @acrool/imgz-client
```

## Examples

use in your page/component:
```ts
import {ImgzClient} from '@acrool/imgz-client';

const imgzClient = new ImgzClient(imageSquashUrl);

await imgzClient
    .squashWebp(filePath)
    .toSave(uploadIOThumbPath, thumbOptions)
    .toSave(uploadIOPath, options)
    .completeAll();
```


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)

