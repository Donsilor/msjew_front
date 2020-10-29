import QualityData from './data-layout/quality.vue'
import ObjectData from './data-layout/object.vue'
import MosaicData from './data-layout/mosaic.vue'
import SeriesData from './data-layout/series.vue'
import StyleData from './data-layout/style.vue'
import ShapeData from './data-layout/shape.vue'

export default {
  components: {
    QualityData,
    SeriesData,
    StyleData,
    ShapeData,
    ObjectData,
    MosaicData
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['quality','series', 'style','mosaic','object','shape'].indexOf(value) !== -1
      }
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.chooseEject,
      active: false,
      choose: []
    }
  },
  methods: {
    showIt(defaultChoose = null) {
      this.active = true
      if (defaultChoose) {
        this.$refs['data-options'].setChoose(
          JSON.parse(JSON.stringify(defaultChoose))
        )
      }
    },
    hideIt() {
      this.active = false
      // this.choose = []
    },
    resetChoose() {
      console.log(this.$refs['data-options'])
      this.$refs['data-options'].resetChoose()
    },
    chooseOption(data = []) {
      this.choose = data
    },
    closeEmit() {
      this.$emit('close')
      this.hideIt()
    },
    clearChoose() {
      // this.$nuxt.$loading.start()
      // setTimeout(() => {
      //   this.$nuxt.$loading.finish()
      // }, 1000);

      this.$emit('clear', JSON.parse(JSON.stringify(this.choose)))
      this.hideIt()
    }
  }
}
