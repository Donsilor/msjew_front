<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <div class="slide-tab noScrollBar">
        <div class="slider-window">
          <div
            v-for="(s, index) in sliders"
            :key="index"
            :class="['slider-one', { active: actIndex === index }]"
            @click="actIndex = index;show()"
          >
            {{ s.content }}
            <div v-show="actIndex === index" class="slider-bar"></div>
          </div>
        </div>
      </div>
      <data-list
        ref="data-list"
        :send-cod="cod"
        :seo="this.seoInfo"
        :active-index="actIndex"
        @clickData="clickData"
      ></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './list-body.vue'
export default {
  name: 'List',
  layout: `no-footer-bar`,
  components: {
    DataList
  },
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      cod: this.CONDITION_INFO.quality.necklace,
      sliders: [
        {
          content: this.LANGUAGE.listCommons.sliders[0],
          cod: this.CONDITION_INFO.quality.necklace
        },
        {
          content: this.LANGUAGE.listCommons.sliders[1],
          cod: this.CONDITION_INFO.quality.pendant
        },
        {
          content: this.LANGUAGE.listCommons.sliders[2],
          cod: this.CONDITION_INFO.quality.studEarring
        },
        {
          content: this.LANGUAGE.listCommons.sliders[3],
          cod: this.CONDITION_INFO.quality.earring
        },
        {
          content: this.LANGUAGE.listCommons.sliders[4],
          cod: this.CONDITION_INFO.quality.BraceletLine
        },
        {
          content: this.LANGUAGE.listCommons.sliders[5],
          cod: this.CONDITION_INFO.quality.bracelet
        },
        {
          content: this.LANGUAGE.listCommons.sliders[6],
          cod: this.CONDITION_INFO.quality.bracelet
        },
        {
          content: this.LANGUAGE.listCommons.sliders[7],
          cod: this.CONDITION_INFO.quality.bracelet
        },
        {
          content: this.LANGUAGE.listCommons.sliders[8],
          cod: this.CONDITION_INFO.quality.bracelet
        },

      ],
      actIndex: -1
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo('Jewellery')

    return $axios({
      method: 'get',
      url: '/wap/goods/style/web-site',
      params: {
        type: 2
      }
    })
      .then(data => {
        return {
          seoInfo,
          ad: data.advert,
          webSite: data.webSite,
          actIndex: route.query.actIndex ? parseFloat(route.query.actIndex) : -1
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  // asyncData(route) {
  //   return {
  //     actIndex: route.query.actIndex ? parseFloat(route.query.actIndex) : 0
  //   }
  // },
  mounted() {
    // console.log("this.",this.seoInfo)
    if (typeof this.$route.query.actIndex !== 'undefined') {
      this.actIndex = parseFloat(this.$route.query.actIndex)
    }

  },
  watch: {
    $route(to, from){
      this.actIndex = parseFloat(this.$route.query.actIndex)
      // console.log(3333,this.actIndex)
    }
  },
  methods: {
    show(){
      // let query = this.$route.query.actIndex;
      // let path = this.$router.history.path;
      //对象的拷贝
      // let newQuery = JSON.parse(JSON.stringify(query));
      // newQuery.pid = pid;
      // this.$router.push({ path, actIndex: newQuery });
      // console.log("active",this.actIndex,this.$route.query.actIndex)
      // this.$route.query.actIndex = this.actIndex
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1000);
    },
    arrivalBottom() {
      this.$refs['data-list'].getNextPage()
    },
    clickData(data) {
      this.$router.push({
        name: 'accessories-accessories',
        query: {
          goodId: data.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.list-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  .slide-tab {
    width: 100vw;
    height: 50px;
    border-bottom: 1px solid rgba(221, 221, 221, 1); /*no*/
    overflow-x: scroll;
    background: white;
    .slider-window {
      width: max-content;
      height: 49px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .slider-one {
        position: relative;
        font-size: 16px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        // margin-right: 56px;
        margin-right: 47px;
        .slider-bar {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 33px;
          height: 4px;
          background: rgba(242, 155, 135, 1);
          border-radius: 2px;
        }
      }
      .slider-one.active {
        color: rgba(51, 51, 51, 1);
      }
      .slider-one:last-child {
        margin-right: 0;
      }
    }
  }
  .noScrollBar {
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
