export default {
  props: {
    defaultCondition: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      searchConditions: {}
    }
  },
  created() {
    this.searchConditions = Object.assign(
      this.searchConditions,
      this.defaultCondition
    )
  },
  // mounted(){
  //   var seCo = localStorage.getItem('searchCondition');
  //   if(!seCo){}else{
  //     this.searchConditions = JSON.parse(seCo)
  //   }

  //   var searchCondition = JSON.stringify(this.searchConditions);
  //   localStorage.setItem('searchCondition',searchCondition);
  // },
}
