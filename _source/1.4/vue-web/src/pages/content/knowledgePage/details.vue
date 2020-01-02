<template>
  <div class="knowledge-content">
    <div class="title">{{ lang.home }}&nbsp;>&nbsp;{{ lang.knowledge }}</div>
    <el-container>
      <!-- <el-aside width="205px" class="el-aside-nav">

            <ul class="list-top">
              <li v-for="(item,index) in items" :key="index" class="list-put">
                <h2 @click="showToggle(item)">{{item.name}}</h2>
                    <ul v-show="item.isSubShow">
                          <li v-for="(subItem,index) in item.subItems" :key="index" :class="{active:index == num}" @click="tab(index)">
                              <h3>{{subItem.name}}</h3>
                          </li>
                    </ul>
              </li>
            </ul>

      </el-aside>-->
      <headerTopNav></headerTopNav>
      <el-main class="list-content">
        <!-- <keep-alive>   
                    <component :is="tabView"></component>  
        </keep-alive>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import headerTopNav from "../knowledgePage/index";
// import diamondCarat from '../knowledgePage/diamondCarat'
export default {
  components: {
    headerTopNav
    // diamondCarat,
  },
  data() {
    return {
      lang: this.$LANGUAGE.knowledgePage.details
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.knowledge-content {
  .title {
    text-align: left;
    font-size: 12px;
    color: #000000;
    margin: 26px 0px;
  }
  width: 1360px;
  margin: 0px auto 60px auto;
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
}

.el-aside-nav {
  background-color: #fafaf9;
}

.el-menu {
  border: 0;
}

.list-top {
  margin-top: 57px;
}

ul {
  width: 200px;
  height: auto;
  li {
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
}

h3 {
  height: 30px;
  line-height: 30px;
}

.active {
  color: #8b766c;
}
</style>