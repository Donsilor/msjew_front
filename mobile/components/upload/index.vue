<template>
  <div>
    <div class="fileCon">
      <div class="list">
        <div v-for="(item,index) in list" :key="index">
          <div class="close" @click="close(index)"></div>
          <img :src="item" />
        </div>
        <div class="add" v-show="maxStatus" @click="chooseType">
          <div class="add-image"> </div>
        </div>
      </div>
    </div>
    <input id="upload_file" type="file" class="file-input" accept="image/png,image/jpeg,image/jpg" :multiple="multiple" @change="inputChange" style="display: none" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      maxStatus: true
    };
  },
  props: {
    multiple: Boolean,
    max: Number,
    list: Array
  },
  components: {},
  mounted() {},
  methods: {
    chooseType() {
      document.getElementById("upload_file").click();
    },
    close(index) {
      this.list.splice(index, 1);
      this.maxStatus = this.list == this.max ? false : true;
    },
    async inputChange(e) {
      let files = e.target.files;
      let len = this.list.length + files.length;
      if (len > this.max) {
        document.getElementById("upload_file").value = "";
        this.$ui.toast(`最多允许上传${this.max}张`);
        return;
      }
       
      let uploadAll = [].slice.call(files ,0).map(this.upload);
      //使用object.values(files)，测试安卓存在兼容性问题，替换为[].slice.call(files ,0)
       
      this.$ui.loading.open({//上传中效果，可自行替换。
        text: "上传中...",
        spinnerType: "fading-circle"
      });
      let result = await Promise.all(uploadAll);
      document.getElementById("upload_file").value = "";
      this.$ui.loading.close();
    },
    upload(file, index) {
      return new Promise(async (resolve, reject) => {
          let form = new FormData();
        form.append("file", file);
        form.append("***");//根据上传入参添加参数
        let result = await this.post("/file/upload-file", form);
        if (result.cd != 0) {//失败处理
          this.$ui.toast(`第${index + 1}张(${file.name})上传出错(已忽略)`);
          resolve(result);
          return;
        }
        this.list.push(result.data.url);
        if (this.list.length == this.max) {
          this.maxStatus = false;
        }
        resolve(result);
        
      });
    }
  }
};
</script>
 
 
 <style lang="less" scoped>
.fileCon {
  width: 100%;
  min-height: 76px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .list {
    width: 100%;
    min-height: 76px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & > div {
      width: 50px;
      height: 50px;
      margin: 10px 10px 10px 0;
      position: relative;
      background: #ccc;
      & > img {
        width: 100%;
        height: 100%;
      }
      .close {
        width: 15px;
        height: 15px;
        background-image: url(/images/icon_close.png);
        background-size: 100%;
        position: absolute;
        top: -7px;
        right: -7px;
      }
    }
  }
}
.add-image {
  width: 50px;
  height: 50px;
  background-image: url(/images/addImg.png);
  background-size: 100%;
}
</style>