<template>
  <el-aside width="205px" class="el-aside-nav">
    <ul class="list-top">
      <li
        v-for="(item,index) in lang.items"
        :key="index"
        class="list-put"
        @click="diamonds(item.path)"
      >
        <h2 @click="showToggle(index)">
          <i :class="item.icon"></i>
          {{item.name}}
          <i
            v-if="index==0"
            class="icon iconfont down"
            v-html="isSubShow?'&#xe663;':'&#xe652;'"
          ></i>
        </h2>
        <ul v-show="isSubShow">
          <li
            v-for="(subItem,index) in item.subItems"
            :key="index"
            :class="{active:index == num}"
            @click="tab(index)"
          >
            <h3 @click="Jump(subItem.path)">
              <span></span>
              {{subItem.name}}
            </h3>
          </li>
        </ul>
      </li>
    </ul>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.knowledgePage.index,
      num: 0,
      isSubShow: false,
      curPath: ""
    };
  },
  created() {
    this.curPath = this.$router.history.current.path;
    for (let i = 0, len = this.lang.items[0].subItems.length; i < len; i++) {
      if (this.lang.items[0].subItems[i].path == this.curPath) {
        this.isSubShow = true;
        this.num = i;
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    showToggle(index) {
      if (index == 0) {
        this.isSubShow = !this.isSubShow;
      }
    },
    tab(index) {
      this.num = index;
    },
    Jump(data) {
      this.$router.push({
        path: data
      });
    },
    diamonds(data) {
      this.$router.push({
        path: data
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-aside-nav {
  border: 1px solid rgba(215, 215, 215, 1);
  height: 534px;
  box-sizing: border-box;
}

.list-content {
  width: 1140px;
  margin: 0;
  padding: 0;
  margin-left: 17px;
}

.el-aside-nav {
  background-color: #fafaf9;
}

.el-menu {
  border: 0;
}

.list-top {
  margin-top: 38px;
}

ul {
  width: 200px;
  height: auto;
  li {
    cursor: pointer;
    color: #999;
    margin-top: 10px;
  }
}

h2 {
  color: #8b766c;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  padding-left: 21px;
  .iconfont-el {
    margin-right: 15px;
    font-size: 20px;
    line-height: 20px;
    position: relative;
    vertical-align: middle;
  }
  .down {
    color: #999;
    float: right;
    margin-right: 21px;
    font-size: 10px;
  }
}

h3 {
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding-left: 50px;
  font-weight: normal;
  margin-left: 5px;
  span {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    display: inline-block;
    background-color: #999;
    vertical-align: middle;
    margin: 0 6px;
  }
}

.active {
  color: #8b766c;
}
</style>