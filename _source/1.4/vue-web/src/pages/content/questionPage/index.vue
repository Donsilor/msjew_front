<template>
  <div class="question">
    <div
      class="title"
    >{{ lang.index }}&nbsp;>&nbsp;{{ lang.page }}&nbsp;>&nbsp;{{lang.list[parentNum].subItems[num].name}}</div>
    <el-aside width="205px" class="el-aside-nav">
      <ul class="list-top">
        <li v-for="(item,index) in lang.list" :key="index" class="list-put">
          <h2 @click="showToggle(item)">
            <i class="icon iconfont">&#xe66d;</i>
            {{item.name}}
            <i
              class="icon iconfont down"
              v-html="item.isSubShow?'&#xe663;':'&#xe652;'"
            ></i>
          </h2>
          <ul v-show="item.isSubShow">
            <li
              v-for="(subItem,sindex) in item.subItems"
              :key="sindex"
              :class="{active:index == parentNum && sindex==num}"
            >
              <h3 @click="Jump(subItem.path,index,sindex)">
                <span v-if="index>0"></span>
                <i v-if="index==0 && sindex==0" class="icon iconfont">&#xe641;</i>
                <i v-if="index==0 && sindex==1" class="icon iconfont">&#xe66a;</i>
                <i v-if="index==0 && sindex==2" class="icon iconfont">&#xe66e;</i>
                <em>{{subItem.name}}</em>
              </h3>
            </li>
          </ul>
        </li>
      </ul>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.questionPage.index,
      parentNum: 0,
      num: 0
    };
  },
  created() {
    this.curPath = this.$router.history.current.path;
    for (let j = 0; j < this.lang.list.length; j++) {
      for (let i = 0, len = this.lang.list[j].subItems.length; i < len; i++) {
        if (this.lang.list[j].subItems[i].path == this.curPath) {
          this.num = i;
          this.parentNum = j;
        }
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.curPath = "/" + val.name;
        for (let j = 0; j < this.lang.list.length; j++) {
          for (
            let i = 0, len = this.lang.list[j].subItems.length;
            i < len;
            i++
          ) {
            if (this.lang.list[j].subItems[i].path == this.curPath) {
              this.num = i;
              this.parentNum = j;
            }
          }
        }
      }
    }
  },
  methods: {
    showToggle(item) {
      item.isSubShow = !item.isSubShow;
    },
    tab(index) {
      this.num = index;
    },
    Jump(data, index, sindex) {
      this.num = sindex;
      this.parentNum = index;
      this.$router.push({
        path: data
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-aside-nav {
  background-color: #fafaf9;
}
.question {
  position: relative;
}
.title {
  position: absolute;
  top: -50px;
  width: 500px;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  text-align: left;
}

.el-menu {
  border: 0;
}

.list-top {
  margin-top: 25px;
}

ul {
  width: 200px;
  margin-bottom: 15px;
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
  i {
    &:first-child {
      margin-right: 18px;
      font-size: 18px;
      line-height: 18px;
      position: relative;
      top: -2px;
      vertical-align: middle;
    }
    &:last-child {
      color: #999;
      float: right;
      margin-right: 21px;
      font-size: 10px;
      margin-top: 2px;
    }
  }
}

h3 {
  line-height: 30px;
  text-align: left;
  font-weight: normal;
  margin-left: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  &:hover {
    color: #8b766c;
  }
  span {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: #999;
    margin-right: 6px;
    position: relative;
    top: -3px;
  }
  i {
    font-size: 18px;
    position: relative;
    top: 2px;
    left: -5px;
  }
}

.active {
  color: #8b766c;
}
</style>