<template>
  <div class="container">
    <div class="attr-wrap" ref="attr-wrap">
      <div class="close-wrap">
        <div class="close">
          <i class="iconfont iconguanbi" @click="$emit('close')"></i>
        </div>
      </div>

      <div class="scroll">
        <div class="goods-img">
          <img :src="goodsImagesArr[0]" alt="">
        </div>

        <div class="goods-name"> {{ goodsInfo.goodsName }} </div>
        <div class="goods-price">
          <span>{{ formatCoin(coinType) }}</span>
          <span>{{ formatNumber(price1) }}</span>
          <span v-if="price1 != price2">-</span>
          <span v-if="price1 != price2">{{ formatNumber(price2) }}</span>
        </div>

        <div class="attr-box">
          <div class="attr-group" v-if="goodsInfo.carats && goodsInfo.carats.length">
            <div class="attr-type">{{ lang.goodsCarat }}</div>
            <div class="attr-list clearfix">
              <div class="attr-child" :class="{active: selectIndex.caratsIndex == index}" v-for="(item, index) in goodsInfo.carats" :key="index" @click="chooseAttr('carats', index)">{{ item.content }}{{ item.name }}</div>
            </div>
          </div>
          <div class="attr-group" v-if="goodsInfo.materials && goodsInfo.materials.length">
            <div class="attr-type">{{ lang.goodsMaterial }}</div>
            <div class="attr-list clearfix" :class="[language == 'en_US' ? 'en' : 'material']">
              <div class="attr-child" :class="{active: selectIndex.materialsIndex == index}" v-for="(item, index) in goodsInfo.materials" :key="index" @click="chooseAttr('materials', index)">{{ item.name }}</div>
            </div>
          </div>
          <div class="attr-group" v-if="goodsInfo.sizes && goodsInfo.sizes.length">
            <div class="attr-type">{{ lang.goodsSize }}</div>
            <div class="attr-list size clearfix">
              <div class="attr-child" :class="{active: selectIndex.sizesIndex == index}" v-for="(item, index) in goodsInfo.sizes" :key="index" @click="chooseAttr('sizes', index)">{{ item.content }}{{ item.name }}</div>
            </div>
          </div>
          <div class="attr-group" v-if="goodsInfo.colors && goodsInfo.colors.length">
            <div class="attr-type">{{ lang.goodsColor }}</div>
            <div class="attr-list clearfix">
              <div class="attr-child" :class="{active: selectIndex.colorsIndex == index}" v-for="(item, index) in goodsInfo.colors" :key="index" @click="chooseAttr('colors', index)">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="confirm" @click="confirm()">{{ lang.submit }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: false,
      default: {}
    },
    attrIndex: {
      type: Object,
      required: false,
      default: {}
    },
    attrIndexB: {
      type: Object,
      required: false,
      default: () => {}
    },
    doubleType: {
      type: String,
      required: false,
      default: ''
    },
    firstRing: {
      type: Object,
      required: false,
      default: () => {}
    },
    secondRing: {
      type: Object,
      required: false,
      default: () => {}
    },
    goodsAttrA: {
      type: Object,
      required: false,
      default: () => {}
    },
    goodsAttrB: {
      type: Object,
      required: false,
      default: () => {}
    },
    firstRingId: {
      type: String,
      required: false,
      default: ''
    },
    secondRingId: {
      type: String,
      required: false,
      default: ''
    },
    attrRegroupA: {
      type: [String, Object],
      required: false,
      default: ''
    },
    attrRegroupB: {
      type: [String, Object],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      language: this.$store.state.language,
      goodsId: '',
      price1: '',
      price2: '',
      coinType: '',
      goodsImagesArr: [],
      goodsInfo: {
        goodsImages: '',
        goodsImagesArr: [],
        goodsName: '',
        carats: [],
        coinType: '',
        colors: [],
        coupon: {},
        details: [],
        materials: [],
        sizes: [],
        salePrice: ''
      },
      goodsInfoB: {
        goodsImages: '',
        goodsImagesArr: [],
        goodsName: '',
        carats: [],
        coinType: '',
        colors: [],
        coupon: {},
        details: [],
        materials: [],
        sizes: [],
        salePrice: ''
      },
      selectIndex: {
        caratsIndex: 0,
        materialsIndex: 0,
        sizesIndex: 0,
        colorsIndex: 0
      },
      doubleSelect: {
        type: '',
        material: '',
        carat: '',
        size: '',
        color: '',
        price: '',
        id: '',
        index: {},
        attrRegroup: ''
      }
    }
  },
  mounted() {
    var that = this;
    setTimeout(function() {
      that.$refs['attr-wrap'].classList.add('active')
    }, 20) 

    this.goodsInfo = this.info;

    if(this.goodsInfo.goodsImages){
      this.goodsImagesArr = this.goodsInfo.goodsImages.split(',')
    }

    this.coinType = this.info.coinType

    if(this.doubleType == 'doubleA'){
      this.goodsInfo = this.goodsAttrA

      if(this.attrRegroupA){
        this.goodsInfo = this.attrRegroupA
      }

      if(this.attrIndex && JSON.stringify(this.attrIndex) != "{}"){
        this.selectIndex = this.attrIndex
      }
    }else if(this.doubleType == 'doubleB'){
      this.goodsInfo = this.goodsAttrB

      if(this.attrRegroupB){
        this.goodsInfo = this.attrRegroupB
      }

      if(this.attrIndexB && JSON.stringify(this.attrIndexB) != "{}"){
        this.selectIndex = this.attrIndexB
      }
    }

    this.chooseAttr()
  },
  methods: {
    chooseAttr(type, index) {
      switch (type) {
        case 'carats': this.selectIndex.caratsIndex = this.selectIndex.caratsIndex == index ? -1 : index
          break;
        case 'materials': this.selectIndex.materialsIndex = this.selectIndex.materialsIndex == index ? -1 : index
          break;
        case 'sizes': this.selectIndex.sizesIndex = this.selectIndex.sizesIndex == index ? -1 : index
          break;
        case 'colors': this.selectIndex.colorsIndex = this.selectIndex.colorsIndex == index ? -1 : index
          break;
      }

      if(this.doubleType){
        // 原选中属性
        let oldId = {
          material: '',
          size: '',
          carat: '',
          color: ''
        }

        oldId.material = this.goodsInfo.materials[this.selectIndex.materialsIndex]
        oldId.carat = this.goodsInfo.carats[this.selectIndex.caratsIndex]
        oldId.size = this.goodsInfo.sizes[this.selectIndex.sizesIndex]

        let newIndex = {
          materialsIndex: -1,
          caratsIndex: -1,
          sizesIndex: -1,
          colorsIndex: -1
        }

        // 重组属性集合-需要展示的
        let attrRegroup = {
            materials: [],
            sizes: [],
            carats: [],
            colors: []
          },
        
        // 重组属性集合-需计算价格的
          attrPrice= {
            materials: [],
            sizes: [],
            carats: [],
            colors: []
          };
          
          this.doubleSelect.type = this.doubleType
          this.doubleSelect.color = this.goodsInfo.colors[this.selectIndex.colorsIndex]

        // 对戒一
        if(this.doubleType == 'doubleA'){
          let materialA = this.selectIndex.materialsIndex == -1 ? -1 : this.goodsInfo.materials[this.selectIndex.materialsIndex].id,
              caratA = this.selectIndex.caratsIndex == -1 ? -1 : this.goodsInfo.carats[this.selectIndex.caratsIndex].sortBy,
              sizesA = this.selectIndex.sizesIndex == -1 ? -1 : this.goodsInfo.sizes[this.selectIndex.sizesIndex].sortBy,
              repetitionA = false;

          this.firstRing.details.forEach(item => {
            repetitionA = false
            attrRegroup.materials.forEach(m => {
              if(m == item.material){
                repetitionA = true;
              }
            })

            if(!repetitionA){
              attrRegroup.materials.push(item.material)
            }

            repetitionA = false
            attrRegroup.carats.forEach(m => {
              if(m == item.carat){
                repetitionA = true;
              }
            })

            if(!repetitionA){
              attrRegroup.carats.push(item.carat)
            }

            if(materialA != -1 && caratA != -1 && sizesA != -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionA = true;
                }
              })

              if(!repetitionA && item.material == materialA && item.carat == caratA){
                attrRegroup.sizes.push(item.size)
              }
              
              attrPrice.materials[0] = materialA
              attrPrice.carats[0] = caratA
              attrPrice.sizes[0] = sizesA

              this.doubleSelect.material = materialA
              this.doubleSelect.carat = caratA
              this.doubleSelect.size = sizesA
            }else if(materialA == -1 && caratA != -1 && sizesA != -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.sizes){
                  repetitionA = true;
                }
              })

              if(!repetitionA && item.carat == caratA){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials = attrRegroup.materials
              attrPrice.carats[0] = caratA
              attrPrice.sizes[0] = sizesA
            }else if(materialA != -1 && caratA == -1 && sizesA != -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.sizes){
                  repetitionA = true;
                }
              })

              if(!repetitionA && item.material == materialA){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.carats = attrRegroup.carats
              attrPrice.materials[0] = materialA
              attrPrice.sizes[0] = sizesA
            }else if(materialA != -1 && caratA != -1 && sizesA == -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionA = true;
                }
              })

              if(!repetitionA && item.material == materialA && item.carat == caratA){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.sizes = attrRegroup.sizes
              attrPrice.materials[0] = materialA
              attrPrice.carats[0] = caratA
            }else if(materialA != -1 && caratA == -1 && sizesA == -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionA = true;
                }
              })

              if(!repetitionA && item.material == materialA){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials[0] = materialA
              attrPrice.carats = attrRegroup.carats
              attrPrice.sizes = attrRegroup.sizes
            }else if(materialA == -1 && caratA != -1 && sizesA == -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionA = true;
                }
              })

              if(!repetitionA && item.carat == caratA){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials = attrRegroup.materials
              attrPrice.sizes = attrRegroup.sizes
              attrPrice.carats[0] = caratA
            }else if(materialA == -1 && caratA == -1 && sizesA != -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionA = true;
                }
              })

              if(!repetitionA){
                attrRegroup.sizes.push(item.size)
              }
  
              attrPrice.materials = attrRegroup.materials
              attrPrice.carats = attrRegroup.carats
              attrPrice.sizes[0] = sizesA
            }else if(materialA == -1 && caratA == -1 && sizesA == -1){
              repetitionA = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionA = true;
                }
              })

              if(!repetitionA){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials = attrRegroup.materials
              attrPrice.carats = attrRegroup.carats
              attrPrice.sizes = attrRegroup.sizes
            }
          })

          // id转换为具体数据
          let firstRingAR={
            materials: [],
            sizes: [],
            carats: [],
            colors: []
          };

          this.firstRing.materials.forEach(f => {
            if(this.doubleSelect.material == f.id){
              this.doubleSelect.material = f
            }

            attrRegroup.materials.forEach(g => {
              if(g == f.id){
                firstRingAR.materials.push(f)
              }
            })
          })

          this.firstRing.carats.forEach(h => {
            if(this.doubleSelect.carat == h.sortBy){
              this.doubleSelect.carat = h
            }

            attrRegroup.carats.forEach(i => {
              if(i == h.sortBy){
                firstRingAR.carats.push(h)
              }
            })
          })

          this.firstRing.sizes.forEach(j => {
            if(this.doubleSelect.size == j.sortBy){
              this.doubleSelect.size = j
            }

            attrRegroup.sizes.forEach(k => {
              if(k == j.sortBy){
                firstRingAR.sizes.push(j)
              }
            })
          })

          firstRingAR.colors = this.goodsInfo.colors

          this.goodsInfo = firstRingAR

          // 重新获取index
          if(this.selectIndex.materialsIndex != -1){
            this.goodsInfo.materials.forEach((ma, index) => {
              if(ma == oldId.material){
                newIndex.materialsIndex = index
              }
            })
          }

          if(this.selectIndex.caratsIndex != -1){
            this.goodsInfo.carats.forEach((ca, index) => {
              if(ca == oldId.carat){
                newIndex.caratsIndex = index
              }
            })
          }

          if(this.selectIndex.sizesIndex != -1){
            this.goodsInfo.sizes.forEach((sa, index) => {
              if(sa == oldId.size){
                newIndex.sizesIndex = index
              }
            })
          }

          newIndex.colorsIndex = this.selectIndex.colorsIndex
          this.selectIndex = newIndex

          let adsA = [],
              priceA = [];
          this.firstRing.details.forEach(b => {
            attrPrice.materials.forEach(c => {
              attrPrice.carats.forEach(d => {
                attrPrice.sizes.forEach(e => {
                  if(b.material==c && b.carat==d && b.size==e){
                    adsA.push(b.id)
                  }
                })
              })
            })
          })

          this.info.details.forEach(f => {
            adsA.forEach(g => {
              if(f.ladyRing == g && f.menRing == this.secondRingId || f.menRing == g && f.ladyRing == this.secondRingId){
                priceA.push(f.retailMallPrice)
                this.doubleSelect.id = f.id
              }
            })
          })

          if(priceA.length > 1){
            this.price1 = Math.min(...priceA)
            this.price2 = Math.max(...priceA)
          }else if(priceA.length == 1){
            this.price1 = priceA[0]
            this.price2 = priceA[0]
            this.doubleSelect.price = priceA[0]
          }
        }else if(this.doubleType == 'doubleB'){
          let materialB = this.selectIndex.materialsIndex == -1 ? -1 : this.goodsInfo.materials[this.selectIndex.materialsIndex].id,
              caratB = this.selectIndex.caratsIndex == -1 ? -1 : this.goodsInfo.carats[this.selectIndex.caratsIndex].sortBy,
              sizesB = this.selectIndex.sizesIndex == -1 ? -1 : this.goodsInfo.sizes[this.selectIndex.sizesIndex].sortBy,
              repetitionB = false;

          this.secondRing.details.forEach(item => {
            repetitionB = false
              attrRegroup.materials.forEach(m => {
                if(m == item.material){
                  repetitionB = true;
                }
              })

              if(!repetitionB){
                attrRegroup.materials.push(item.material)
              }

              repetitionB = false
              attrRegroup.carats.forEach(m => {
                if(m == item.carat){
                  repetitionB = true;
                }
              })

              if(!repetitionB){
                attrRegroup.carats.push(item.carat)
              }

            if(materialB != -1 && caratB != -1 && sizesB != -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB && item.material == materialB && item.carat == caratB){
                attrRegroup.sizes.push(item.size)
              }
              
              attrPrice.materials[0] = materialB
              attrPrice.carats[0] = caratB
              attrPrice.sizes[0] = sizesB

              this.doubleSelect.material = materialB
              this.doubleSelect.carat = caratB
              this.doubleSelect.size = sizesB
            }else if(materialB == -1 && caratB != -1 && sizesB != -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB && item.carat == caratB){
                attrRegroup.sizes.push(item.size)
              }
 
              attrPrice.materials = attrRegroup.materials
              attrPrice.carats[0] = caratB
              attrPrice.sizes[0] = sizesB
            }else if(materialB != -1 && caratB == -1 && sizesB != -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB && item.material == materialB){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.carats = attrRegroup.carats
              attrPrice.materials[0] = materialB
              attrPrice.sizes[0] = sizesB
            }else if(materialB != -1 && caratB != -1 && sizesB == -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB && item.material == materialB && item.carat == caratB){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.sizes = attrRegroup.sizes
              attrPrice.materials[0] = materialB
              attrPrice.carats[0] = caratB
            }else if(materialB != -1 && caratB == -1 && sizesB == -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB && item.material == materialB){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials[0] = materialB
              attrPrice.carats = attrRegroup.carats
              attrPrice.sizes = attrRegroup.sizes
            }else if(materialB == -1 && caratB != -1 && sizesB == -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB && item.carat == caratB){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials = attrRegroup.materials
              attrPrice.sizes = attrRegroup.sizes
              attrPrice.carats[0] = caratB
            }else if(materialB == -1 && caratB == -1 && sizesB != -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials = attrRegroup.materials
              attrPrice.carats = attrRegroup.carats
              attrPrice.sizes[0] = sizesB
            }else if(materialB == -1 && caratB == -1 && sizesB == -1){
              repetitionB = false
              attrRegroup.sizes.forEach(m => {
                if(m == item.size){
                  repetitionB = true;
                }
              })

              if(!repetitionB){
                attrRegroup.sizes.push(item.size)
              }

              attrPrice.materials = attrRegroup.materials
              attrPrice.carats = attrRegroup.carats
              attrPrice.sizes = attrRegroup.sizes
            }
          })

          // id转换为具体数据
          let secondRingBR={
            materials: [],
            sizes: [],
            carats: [],
            colors: []
          };
          this.secondRing.materials.forEach(f => {
            if(this.doubleSelect.material == f.id){
              this.doubleSelect.material = f
            }

            attrRegroup.materials.forEach(g => {
              if(g == f.id){
                secondRingBR.materials.push(f)
              }
            })
          })

          this.secondRing.carats.forEach(h => {
            if(this.doubleSelect.carat == h.sortBy){
              this.doubleSelect.carat = h
            }

            attrRegroup.carats.forEach(i => {
              if(i == h.sortBy){
                secondRingBR.carats.push(h)
              }
            })
          })

          this.secondRing.sizes.forEach(j => {
            if(this.doubleSelect.size == j.sortBy){
              this.doubleSelect.size = j
            }

            attrRegroup.sizes.forEach(k => {
              if(k == j.sortBy){
                secondRingBR.sizes.push(j)
              }
            })
          })

          secondRingBR.colors = this.goodsInfo.colors

          this.goodsInfo = secondRingBR

          // 重新获取index
          if(this.selectIndex.materialsIndex != -1){
            this.goodsInfo.materials.forEach((ma, index) => {
              if(ma == oldId.material){
                newIndex.materialsIndex = index
              }
            })
          }

          if(this.selectIndex.caratsIndex != -1){
            this.goodsInfo.carats.forEach((ca, index) => {
              if(ca == oldId.carat){
                newIndex.caratsIndex = index
              }
            })
          }

          if(this.selectIndex.sizesIndex != -1){
            this.goodsInfo.sizes.forEach((sa, index) => {
              if(sa == oldId.size){
                newIndex.sizesIndex = index
              }
            })
          }

          newIndex.colorsIndex = this.selectIndex.colorsIndex
          this.selectIndex = newIndex

          let adsB = [],
              priceB = [];
          this.secondRing.details.forEach(b => {
            attrPrice.materials.forEach(c => {
              attrPrice.carats.forEach(d => {
                attrPrice.sizes.forEach(e => {
                  if(b.material==c && b.carat==d && b.size==e){
                    adsB.push(b.id)
                  }
                })
              })
            })
          })

          this.info.details.forEach(f => {
            adsB.forEach(g => {
              if(f.ladyRing == g && f.menRing == this.firstRingId || f.menRing == g && f.ladyRing == this.firstRingId){
                priceB.push(f.retailMallPrice)
                this.doubleSelect.id = f.id
              }
            })
          })

          if(priceB.length > 1){
            this.price1 = Math.min(...priceB)
            this.price2 = Math.max(...priceB)
          }else if(priceB.length == 1){
            this.price1 = priceB[0]
            this.price2 = priceB[0]
            this.doubleSelect.price = priceB[0]
          }
        }

        this.doubleSelect.select = this.selectIndex
        this.doubleSelect.attrRegroup = this.goodsInfo
      }else{
        if(type != 'colors'){
          this.getGoodsPrice()
        }
      }
    },
    getGoodsPrice() {
      const { caratsIndex, materialsIndex, sizesIndex } = this.selectIndex;
      const { carats, materials, sizes, colors } = this.goodsInfo;

      let arr=[], caratsId, materialsId, sizesId;
      if(carats && carats.length){
        caratsId = caratsIndex == -1 ? null : carats[caratsIndex].sortBy
      }else{
        this.selectIndex.caratsIndex = null
      }

      if(materials && materials.length){
        materialsId = materialsIndex == -1 ? null : materials[materialsIndex].id
      }else{
        this.selectIndex.materialsIndex = null
      }

      if(sizes && sizes.length){
        sizesId = sizesIndex == -1 ? null : sizes[sizesIndex].sortBy
      }else{
        this.selectIndex.sizesIndex = null
      }

      if(!colors || !colors.length){
        this.selectIndex.colorsIndex = null
      }

      this.goodsInfo.details.map(item => {
        if (
          item.carat == (caratsId == null ? item.carat : caratsId) &&
          item.material == (materialsId == null ? item.material : materialsId) &&
          item.size == (sizesId == null ? item.size : sizesId)
        ) {
          arr.push(item.retailMallPrice);
        }
      })

      if(arr.length > 1){
        this.price1 = Math.min(...arr)
        this.price2 = Math.max(...arr)
      }else if(arr.length == 1){
        this.price1 = arr[0]
        this.price2 = arr[0]
      }
    },
    confirm() {
      if(this.selectIndex.materialsIndex == -1){
          this.$toast.show(this.lang.pleaseChooseMaterial)
          return
      }

      if(this.selectIndex.caratsIndex == -1){
          this.$toast.show(this.lang.pleaseChooseCarat)
          return
      }

      if(this.selectIndex.sizesIndex == -1){
          this.$toast.show(this.lang.pleaseChooseSize)
          return
      }

      if(this.selectIndex.colorsIndex == -1){
          this.$toast.show(this.lang.pleaseChooseColor)
          return
      }
      if(this.doubleType){
        this.$emit('changeAttr', this.doubleSelect)
      }else{
        this.$emit('changeAttr', this.selectIndex)
      }
      
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .container{
    /* display: none; */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  .attr-wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background-color: #fff;
    transform: translateY(100%);
  }
  .attr-wrap.active{
    transition: transform 0.4s ease;
    transform: translateY(0);
  }

  .scroll{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 40px 16px;
    overflow: auto;
  }

  .close-wrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: 2;
  }

  .close{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #fff;
  }

  .goods-img{
    width: 140px;
    height: 140px;
    border: 1px solid #ccc;
    margin: 10px auto 0;
    overflow: hidden;
  }

  .goods-img img{
    width: 100%;
    height: 100%;
  }

  .goods-name{
    text-align: center;
    margin-top: 20px;
  }

  .goods-price{
    text-align: center;
    font-size: 18px;
    color: #f29b87;
    line-height: 50px;
    border-bottom: 1px solid #e9e9e9;
  }

  .attr-box{
    font-size: 12px;
    margin-top: 10px;
  }
  .attr-group{
    padding: 14px 0;
    border-bottom: 1px solid #e9e9e9;
  }
  .attr-group:last-child{
    border-bottom: none;
  }
  .attr-type{
    text-align: left;
    color: #947465;
  }
  .attr-list{
    margin-top: 10px;
  }

  .attr-child{
    float: left;
    width: 60px;
    height: 28px;
    background-color: #f3f3f3;
    border-radius: 4px;
    text-align: center;
    line-height: 26px;
    border: 1px solid #f3f3f3;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 6px 14px 6px 0;
    padding: 0 4px;
  }

  .attr-child:nth-child(4n){
    margin-right: 0;
  }

  .size .attr-child{
    width: 34px;
    margin-right: 14px;
  }

  .material .attr-child{
    width: 75px;
    margin-right: 14px;
  }
  .material .attr-child:nth-child(4n){
    margin-right: 0;
  }

  .en .attr-child{
    width: 104px;
    margin-right: 14px;
  }
  .en .attr-child:nth-child(3n){
    margin-right: 0;
  }

  .attr-child.active{
    background-color: #fce3de;
    border-color: #f9cac1;
  }

  .confirm{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 40px;
    background-color: #f29b87;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    letter-spacing: 2px;
  }
</style>
