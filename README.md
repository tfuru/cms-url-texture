# cms-url-texture

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Cloud Storage

## ウェブで Cloud Storage を使用してファイルをダウンロードする

https://firebase.google.com/docs/storage/web/download-files?hl=ja#cors_configuration

```
gsutil cors set storage-cors.json gs://<your-cloud-storage-bucket>
```
