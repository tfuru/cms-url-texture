<template>
  <div class="top">
    <div class="container">
      <h1 class="title">cluster 向け File Upload すると Url Texture,Url Raw Image 用 URLを生成するツール</h1>      
    </div>
    <div class="container">
      <!-- ファイルアップロード フォーム -->
      <input class="input" type="text" placeholder="ユニークキー"  v-model="key">
      <div class="file">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" ref="file" @change="uploadFile" accept="image/*">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
        </label>
      </div>
    </div>
    <div class="container">
      <!-- アップロードした画像を表示 -->
      <input class="input" type="text" placeholder="Url Textureに設定するURL" :value="fileUrl">
      <figure class="image is-128x128">
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

</style>
