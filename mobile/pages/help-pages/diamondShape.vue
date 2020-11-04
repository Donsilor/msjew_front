<template>
  <div class="diamondShape">
    <Header :title="lang.header" />
    <div class="List">
      <dl
        v-for="(item, index) in lang.list"
        :key="index"
        :class="activeIndex === index ? 'active' : ''"
        @click="selectShape(index)"
      >
        <dt>
          <img :src="'/diamond/shape/' + item.src + '.png'" alt="" />
        </dt>
        <dd>{{ item.tip }}</dd>
      </dl>
    </div>
    <div class="Show">
      <dl v-for="(item, index) in lang.show" :id="item.src" :key="index">
        <dt>
          <img :src="'/diamond/diamond/' + item.src + '.png'" alt="" />
        </dt>
        <dt>{{ item.tip }}</dt>
        <dd>
          <p>
            {{ item.con }}
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'DiamondShape',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].diamondShape,
      activeIndex: 0
    }
  },
  methods: {
    selectShape(index) {
      this.activeIndex = index
      document.getElementById(this.lang.list[index].href).scrollIntoView()
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
.List {
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  dl {
    width: 20%;
    margin: 10px 2.5%;
    padding: 10px 0;
    border: #fff 1px solid;
    &.active {
      border: #f29b87 1px solid;
      border-radius: 4px;
    }
    dt {
      img {
        width: 22px;
        height: 22px;
      }
    }
    dd {
      margin-top: 10px;
      color: #333;
      font-size: 12px;
    }
  }
}
.Show {
  dl {
    img {
      display: block;
      margin: 20px auto;
      width: 110px;
    }
  }
}
</style>
