export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    /*
    心愿单相关
     */
    inWish(id) {
      return this.$store.getters.inWish(id)
    },
    setWish(id) {
      if (this.inWish(id)) {
        this.removeWish(id)
      } else {
        this.addWish(id)
      }
    },
    addWish(id) {
      const _this = this

      if (!id) {
        this.$errorMessage('no id')
        return
      }

      const goodInfo = {
        goodsId: id,
        groupId: null,
        groupType: null,
        type: 1
      }

      _this.$store
        .dispatch('addWish', goodInfo)
        .then(data => {
          _this.$successMessage(_this.$t(`common.addWishSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    },
    removeWish(id) {
      const _this = this

      if (!id) {
        _this.$errorMessage('no id')
        return
      }

      _this.$store
        .dispatch('removeWish', id)
        .then(data => {
          _this.$successMessage(_this.$t(`common.removeWishSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    },
    /*
    钻石对比相关
     */
    inCompared(id) {
      return this.$store.getters.inCompared(id)
    },
    setCompared(id) {
      if (this.inCompared(id)) {
        this.removeCompared(id)
      } else {
        this.addCompared(id)
      }
    },
    /**
     * 加入对比
     * @param id为钻石的goodId
     */
    addCompared(id) {
      const _this = this

      if (!id) {
        this.$errorMessage('no id')
        return
      }

      const goodInfo = {
        goodsId: id,
        groupId: null,
        groupType: null,
        type: 1
      }

      _this.$store
        .dispatch('addCompared', goodInfo)
        .then(data => {
          _this.$successMessage(_this.$t(`common.addComparedSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    },
    /**
     * 删除钻石对比
     * @param id为钻石的goodId
     */
    removeCompared(id) {
      const _this = this

      if (!id) {
        _this.$errorMessage('no id')
        return
      }

      _this.$store
        .dispatch('removeCompared', id)
        .then(data => {
          _this.$successMessage(_this.$t(`common.removeComparedSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    }
  }
}
