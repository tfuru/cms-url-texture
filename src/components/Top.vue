<template>
  <div class="top">
    <div class="container">
      <h1 class="title">cluster 向け<br />画像ファイルをアップロードするだけで<br />Url Texture,Url Raw Image 用 URLを生成するツール</h1>      
    </div>
    <div class="container">
      <div class="formcontainer">
        <label class="label">識別するためのユニークな文字列(英数字半角)</label>
        <div class="fileform">
          <input class="input key" type="text" placeholder="識別するためのユニークな文字列(英数字半角)"  v-model="key">
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" ref="file" @change="uploadFile" accept="image/*">
              <span class="file-cta">
                <span class="file-label">ファイル選択</span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="formcontainer">
        <label class="label">Url Texture,Url Raw Image に設定するURL</label>
        <input class="input fileUrl" type="text" placeholder="Url Textureに設定するURL" :value="fileUrl">
      </div>
      <figure class="image">
        <img v-if="fileUrl == ''" :src="require('../assets/dummy.png')" alt="128x128" >
        <img v-else :src="fileDataUrl" alt="128x128" >
      </figure>      
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useFirebaseStorage } from 'vuefire'

@Options({})
export default class Top extends Vue {
  key = 'dummy'
  fileUrl = ''
  fileDataUrl = ''

  // Firebase Storage
  private storage = useFirebaseStorage()

  // ファイルアップロード
  // https://stackoverflow.com/questions/69963419/firebase-storage-ref-is-not-a-function
  uploadFile() {
    const files = (this.$refs.file as HTMLInputElement).files
    if (!files) return
    const file = files[0]
    // const ext = file.name.split('.').pop()
    const fileRef = ref(this.storage, `${this.key}/src`)
    const uploadTask = uploadBytes(fileRef, file)
    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          // Cross-Origin-Resource-Policy
          this.fileUrl = url
          fetch(url)
            .then( response => response.blob() )
            .then( blob =>{
                var reader = new FileReader()
                reader.onload = () => { 
                  this.fileDataUrl = reader.result as string
                }
                reader.readAsDataURL(blob)
            });
          
        })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.container {
  margin: 10px auto;
  width: 800px;

  border-bottom: 1px solid #ccc;
}

.title {
  margin-bottom: 40px;
}

.fileform {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  margin-bottom: 20px;

  .key {
    width: 350px;
  }
}

.formcontainer {
  width: 500px;
  margin: 0 auto;
  .label {
    width: 350px;
    text-align: left;
  }
  .fileUrl {
    float: left;
    width: 500px;
    margin-bottom: 10px;
  }
}

.image {
  margin: 40px auto;
  width: 300px;
}

</style>
