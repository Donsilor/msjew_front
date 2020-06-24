import Finish from './finish.vue'

export default {
  layout: `no-bar`,
  directives: {
    clickOutSide: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }

        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE['custom-made'],
      isBoard: false,
      boardDesc: {
        url: ``,
        title: ``,
        price: ``,
        step: null
      },
      boardArr: [],
      diamondTag: null
    }
  },
  watch: {
    $route: function() {
      this.makeBoardArr()
    }
  },
  mounted() {
    // const melo = JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
    this.makeBoardArr()
  },
  components: {
    finish: Finish
  },
  computed: {
    doneBegin: function() {
      return this.boardArr.length >= 1
    },
    doneFinish: function() {
      return this.boardArr.length >= 2
    },
    active: function() {
      return parseInt(this.$route.query.step)
    }
  },
  methods: {
    judgeStep(index) {
      const l = this.boardArr.length
      switch (index) {
        case 1:
          if (l > 0) {
            setTimeout(() => {
              if (this.boardDesc.step === 1) {
                this.isBoard = !this.isBoard
              } else {
                this.isBoard = true
              }
              this.boardDesc = this.boardArr[0]
            }, 0)
          }
          break
        case 2:
          if (l > 1) {
            setTimeout(() => {
              if (this.boardDesc.step === 2) {
                this.isBoard = !this.isBoard
              } else {
                this.isBoard = true
              }
              this.boardDesc = this.boardArr[1]
            }, 0)
          }
          break
        case 3:
          // console.log(this.$route.query.melo)
          if (l > 1) {
            this.$router.push({
              name: this.$route.name,
              query: {
                melo: this.$route.query.melo,
                step: 3,
                isBack: true
              }
            })
            this.isBoard = false
          }
          break
      }
    },
    closeBoard() {
      this.isBoard = false
    },
    switchStep() {
      if (this.boardDesc.step === 1) {
        this.doSomeRemark(
          JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
            .steps[0],
          1
        )
      } else if (this.boardDesc.step === 2) {
        this.doSomeRemark(
          JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
            .steps[1],
          2
        )
      } else {
        console.log(1111)
      }
      this.isBoard = !this.isBoard
    },
    resetStep() {
      let melo = JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
      const isBack = this.$route.query.isBack
      const step = parseInt(this.$route.query.step)
      const routeArr = this.$route.name.split(`-`)
      const linkArr = [routeArr[0], routeArr[1]]
      if (this.boardDesc.step === 1) {
        // 第一步
        // this.$toast(`click reset step one`)
        if (step === 3) {
          // 完成后的重置
          linkArr.push(this.checkCt(melo.steps[1].ct))
          linkArr.push(`made`)
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`list`)
          const obj = {
            steps: [
              {
                goodsId: melo.steps[1].goodsId,
                goodsDetailsId: melo.steps[1].goodsDetailsId,
                goodsType: melo.steps[1].goodsType,
                ct: melo.steps[1].ct,
                cartId: melo.steps[1].cartId,
                page: `detail`
              },
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: melo.steps[0].ct,
                cartId: melo.steps[0].cartId,
                page: `list`
              }
            ]
          }
          this.isBoard = false
          this.$router.push({
            name: linkArr.join(`-`),
            query: {
              melo: this.$helpers.base64Encode(JSON.stringify(obj)),
              step: 2
            }
          })
        } else if (isBack && step !== 3) {
          linkArr.push(this.checkCt(melo.steps[1].ct))
          linkArr.push(`made`)
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`list`)
          const obj = {
            steps: [
              {
                goodsId: melo.steps[1].goodsId,
                goodsDetailsId: melo.steps[1].goodsDetailsId,
                goodsType: melo.steps[1].goodsType,
                ct: melo.steps[1].ct,
                cartId: melo.steps[1].cartId,
                page: `detail`
              },
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: melo.steps[0].ct,
                cartId: melo.steps[0].cartId,
                page: `list`
              }
            ]
          }
          melo = JSON.parse(JSON.stringify(obj))
          this.isBoard = false
          this.$router.push({
            name: linkArr.join(`-`),
            query: {
              melo: this.$helpers.base64Encode(JSON.stringify(melo)),
              step: 2
            }
          })
        } else {
          // 未完成的重置
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`made`)
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`list`)
          const obj = {
            steps: [
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: melo.steps[0].ct,
                cartId: ``,
                page: `list`
              },
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: null,
                cartId: ``,
                page: `list`
              }
            ]
          }
          melo = JSON.parse(JSON.stringify(obj))
          this.isBoard = false
          this.$router.push({
            name: linkArr.join(`-`),
            query: {
              melo: this.$helpers.base64Encode(JSON.stringify(melo)),
              step: 1
            }
          })
        }
      } else if (this.boardDesc.step === 2) {
        // 第二步
        // this.$toast(`click reset step two`)
        linkArr.push(this.checkCt(melo.steps[0].ct))
        linkArr.push(`made`)
        linkArr.push(this.checkCt(melo.steps[1].ct))
        linkArr.push(`list`)
        const obj = {
          steps: [
            {
              goodsId: melo.steps[0].goodsId,
              goodsDetailsId: melo.steps[0].goodsDetailsId,
              goodsType: melo.steps[0].goodsType,
              ct: melo.steps[0].ct,
              cartId: melo.steps[0].cartId,
              page: `detail`
            },
            {
              goodsId: null,
              goodsDetailsId: null,
              goodsType: null,
              ct: melo.steps[1].ct,
              cartId: melo.steps[1].cartId,
              page: `list`
            }
          ]
        }
        melo = JSON.parse(JSON.stringify(obj))
        this.isBoard = false
        this.$router.push({
          name: linkArr.join(`-`),
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      }
    },
    async makeBoardArr() {
      const ctNum = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      ).steps[0].ct
      this.diamondTag = parseInt(ctNum)
      // setTimeout(() => {
      //   this.diamondTag = parseInt(ctNum)
      // }, 0)
      // console.log(
      //   `diamond=========>`,
      //   JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
      // )
      
      
      if (!this.$route.query.isBack && parseInt(this.$route.query.step) === 2) {
        if(this.diamondTag == 2){
          var url1 =  `/wap/goods/style/detail`;
        }else{
          var url1 =  `/wap/goods/diamond/detail`; 
        }
        this.$axios({
          method: `post`,
          url: url1,
          params: {
            goodsId: JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsId
          }
        })
          .then(res => {
            this.boardArr = []
            const gdi = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsDetailsId
            for (const i in res.details) {
              if (gdi === res.details[i].id) {
                const o = {
                  url: `${this.$IMG_URL}${res.goodsImages.split(',')[0]}`,
                  title: `${res.goodsName}`,
                  price: `${res.coinType} ${
                    res.details[i].retailMallPrice
                  }`,
                  step: 1
                }
                this.boardArr.push(o)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else if (
        this.$route.query.isBack ||
        parseInt(this.$route.query.step) === 3
      ) {
        // console.log(444444)
        if(this.diamondTag == 1){
          var url2 =  `/wap/goods/diamond/detail`;
          var url3 =  `/wap/goods/style/detail`;
          
        }else{
          var url2 =  `/wap/goods/style/detail`;
          var url3 =  `/wap/goods/diamond/detail`;
        }

        await this.$axios({
          method: `post`,
          url: url2,
          params: {
            goodsId: JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsId
          }
        })
          .then(res => {
            this.boardArr = []
            const gdi = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsDetailsId
            for (const i in res.details) {
              if (gdi === res.details[i].id) {
                const o = {
                  url: `${this.$IMG_URL}${res.goodsImages.split(',')[0]}`,
                  title: `${res.goodsName}`,
                  price: `${res.coinType} ${
                    res.details[i].retailMallPrice
                  }`,
                  step: 1
                }
                this.boardArr.push(o)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
        await this.$axios({
          method: `post`,
          url: url3,
          params: {
            goodsId: JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[1].goodsId
          }
        })
          .then(res => {
            const gdi = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[1].goodsDetailsId
            for (const i in res.details) {
              if (gdi === res.details[i].id) {
                const o = {
                  url: `${this.$IMG_URL}${res.goodsImages.split(',')[0]}`,
                  title: `${res.goodsName}`,
                  price: `${res.coinType} ${
                    res.details[i].retailMallPrice
                  }`,
                  step: 2
                }
                this.boardArr.push(o)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    doSomeRemark(obj, step) {
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      const routeArr = this.$route.name.split(`-`)
      const linkArr = [routeArr[0], routeArr[1], routeArr[2], routeArr[3]]
      const cd = parseInt(obj.ct)
      if (cd === 1 && obj.page === `list`) {
        linkArr.push(`diamond`)
        linkArr.push(`list`)
      } else if (cd === 1 && obj.page === `detail`) {
        linkArr.push(`diamond`)
        linkArr.push(`detail`)
      } else if (cd === 2 && obj.page === `list`) {
        linkArr.push(`ring`)
        linkArr.push(`list`)
      } else if (cd === 2 && obj.page === `detail`) {
        linkArr.push(`ring`)
        linkArr.push(`detail`)
      } else if (cd === 4 && obj.page === `list`) {
        linkArr.push(`necklace`)
        linkArr.push(`list`)
      } else if (cd === 4 && obj.page === `detail`) {
        linkArr.push(`necklace`)
        linkArr.push(`detail`)
      } else if (cd === 8 && obj.page === `list`) {
        linkArr.push(`bracelet`)
        linkArr.push(`list`)
      } else if (cd === 8 && obj.page === `detail`) {
        linkArr.push(`bracelet`)
        linkArr.push(`detail`)
      }
      if (step === 1 && melo.steps[1].goodsId === null) {
        melo.steps[1].ct = null
      }
      this.$router.push({
        name: linkArr.join(`-`),
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          step: step,
          goodId: obj.goodsId,
          isBack: melo.steps[1].goodsId !== null
        }
      })
    },
    checkCt(i) {
      switch (i) {
        case 1:
          return `diamond`
        case 2:
          return `ring`
        case 4:
          return `necklace`
        case 8:
          return `bracelet`
      }
    },
    async addCart() {
      console.log(`in!!!!!`)
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      if (melo.steps.length === 1000) {
        console.log(1)
      } else if (melo.steps[0].goodsDetailsId && melo.steps[1].goodsDetailsId) {
        const timeSock = new Date().getTime()
        const goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsDetailsId
                : melo.steps[1].goodsDetailsId,
            goodsId:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsId
                : melo.steps[1].goodsId,
            groupId: timeSock,
            groupType: 2,
            goodsType:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsType
                : melo.steps[1].goodsType,
            serviceId: 0,
            serviceVal: 'string'
          },
          {
            goodsCount: 1,
            goodsDetailsId:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsDetailsId
                : melo.steps[0].goodsDetailsId,
            goodsId:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsId
                : melo.steps[0].goodsId,
            groupId: timeSock,
            groupType: 2,
            goodsType:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsType
                : melo.steps[0].goodsType,
            serviceId: 0,
            serviceVal: 'string'
          }
        ]
        console.log(melo)
        this.$nuxt.$loading.start()
        let smoothly = true
        if (melo.steps[0].cartId || melo.steps[1].cartId) {
          await this.$store
            .dispatch('removeCart', [
              melo.steps[0].cartId,
              melo.steps[1].cartId
            ])
            .then(data => {
              smoothly = true
            })
            .catch(err => {
              console.log(err)
              smoothly = false
              this.$nuxt.$loading.finish()
              this.$toast(`${err.message}`)
            })
        }
        if (!smoothly) return
        await this.$store
          .dispatch('addCart', goodInfo)
          .then(data => {
            // facebook 添加购物车统计-start
            if(this.$store.state.platform == 31){
              console.log("facebook购物车数据统计")
              fbq('track', 'AddToCart');
            }
            // facebook 添加购物车统计-end
            
            this.$nuxt.$loading.finish()
            this.$toast(this.lang.addCartSuccess)
            setTimeout(() => {
              this.$router.push({
                name: `cart`
              })
            }, 500)
          })
          .catch(err => {
            this.$nuxt.$loading.finish()
            this.$toast(`${err.message}`)
          })
      }
    }
  }
}
