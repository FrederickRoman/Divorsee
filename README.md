# Divorsee

<div style="display:flex; flex-direction:column;"><img src="https://github.com/FrederickRoman/Divorsee/blob/main/src/assets/icons/icon-512x512.png" alt="Divorsee logo" height="320"/>
</div>

## Use AI to predict your chance of divorce without sharing any data. 

It uses a neural network to predict your chances of future divorce based on your responses on the questionnaire. It runs client-side only, and never send data back to a server.

The neural network was trained on the UCI divorce prediction dataset.

This repository contains all client-side code. The training is this other repository.

<div style="display:flex; justify-content:center; align-items:center;">
    <img src="https://github.com/FrederickRoman/Divorsee/blob/main/docs/mockups/Banner_iPhone%205_SE.png" height="300" alt="Banner mockup"/>
    <img src="https://github.com/FrederickRoman/Divorsee/blob/main/docs/mockups/Result_iPhone%205_SE.png" height="300" alt="Results mockup"/>
</div>

## Live website

See [Divorsee](https://divorsee.netlify.app).

## Main libraries and frameworks used for this project

+ Angular (12)
+ Angular Material
+ Tensorflow.js

## Project setup

```
npm install
```

### Compiles and hot-reloads

```
npm run start
```

### Prerenders for production

```
npm run prerender
```

### Serve locally prerenderd PWA with production enviroment (requires http-server package)
 
```
npm run serve-local-prerendered-pwa
```





