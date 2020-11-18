<template>
  <div class="single">
    <span class="name">{{ name }}</span>
    <div class="radio">
      <div
        v-for="(item, index) in lists"
        :key="index"
        class="radio-content"
        @click="changeVal(item.gender_id)"
      >
        <span class="title">{{ item.gender_name }}</span>
        <div class="circular">
          <span :class="item.gender_id == indexs ? 'active' : ''"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    val: {
      type: [String, Number],
      required: false,
      default: ''
    },
    list: {
      type: [Array, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      indexs: this.val
    }
  },
  computed:{
    lists(){
      let arrList = [];
      for (let i in this.list) {
        var j = {};
        j.gender_id = parseFloat(i)+1
        j.gender_name = this.list[i]
        arrList.push(j);
      }
      // console.log('22', arrList)
      return arrList
    }
  },
  created() {
    console.log('22', this.val, this.lists)
  },
  methods: {
    changeVal(val) {
      this.indexs = val
      this.$emit('close', this.indexs)
    }
  }
}
</script>

<style scoped lang="less">
.single {
  width: 100%;
  // height: 80px;
  text-align: left;
  display: flex;
  .name {
    // height: 14px;
    font-size: 14px;
    line-height: 40px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-right: 10px;
  }
  .radio {
    display: flex;
    justify-content: space-between;
    .radio-content {
      .title {
        height: 40px;
        margin: 0 6px 0 0;
        font-size: 14px;
        line-height: 40px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .circular {
        float: left;
        width: 16px;
        height: 16px;
        margin: 12px 8px 0 0;
        text-align: center;
        border: 1px solid #bbbbbb;
        border-radius: 50%;
        span {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin: 2px;
          border-radius: 50%;
          background: #ffffff;
        }
        .active {
          background: #f29b87;
        }
      }
    }
  }
}
</style>
