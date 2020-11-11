<template>
  <div :class="['top-bar', { fixed: fixedStatus }]">
    <header :class="['header']">
      <!-- <div class="title">
        <div class="row-flex justify-between title-content">
          <span class="item">
            {{ $t(`${lang}.customerService`) }}
          </span>
          <span class="item">
            {{ $t(`${lang}.lifetimeWarranty`) }}
          </span>
          <span class="item">
            {{ $t(`${lang}.freeInternationalShipping`) }}
          </span>
          <span class="item">
            {{ $t(`${lang}.refundPolicy`) }}
          </span>
        </div>
      </div> -->
      <div class="ms-title"></div>
      <div class="shortcut">
        <div class="row-flex justify-between shortcut-content">
          <div class="row-flex left-item">
            <!--        <div class="date">24/7</div>-->
            <div class="row-flex align-item-center service">
              <div class="ms-logo">
                <!-- <a href="https://www.bddco.cn/" target="_blank">
                  <img src="/components/topBar/bdd-logo.png" />
                </a> -->
              </div>
              <!-- <i class="iconfont iconphone"></i>
              <span v-if="this.$store.state.platform === 20">0755-25160872-8005</span>
              <span v-else>0755-25160872-8005</span> -->
              <!--          <span class="gap-line"></span>-->
              <!--          <span>聯系 24/7</span>-->
            </div>
          </div>
          <div class="row-flex center-item" >
            <!--        <div class="date">24/7</div>-->
            <div class="row-flex align-item-center service">
              <div class="ms-logo">
                <nuxt-link to="/">
                  <img src="/components/topBar/ms-logo.png" />
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="row-flex align-item-center justify-end right-item">
            <!--            <div class="item story-image">-->
            <!--              <img src="/components/topBar/story.png" />-->
            <!--            </div>-->

            <!--        登录前的用户菜单-->
            <nuxt-link v-if="!hadLogin" to="/login">
              <div class="item user">
                <i class="iconfont icongerenzhongxin"></i>
                <span class="text" @click="login()"></span>
                <!-- <span class="text" @click="login()">{{ $t(`${lang}.login`) }}</span> -->
              </div>
            </nuxt-link>

            <!--        登录后的用户菜单-->
            <div v-else class="item user">
              <el-dropdown type="primary"  placement="bottom">
                <span v-if="userInfo.lastname==null||userInfo.lastname==''||userInfo.firstname==null||userInfo.firstname==''" class="row-flex align-item-center el-dropdown-link span">
                  <i class="iconfont icongerenzhongxin"></i>
                  {{ showMobile }}
                  <i class="iconfont iconkuozhan"></i>
                </span>
                <!-- <span v-else-if="language === 'zh_CN'&&userInfo.lastname!==''&&userInfo.firstname!==''" class="row-flex align-item-center el-dropdown-link span">
                  <i class="iconfont icongerenzhongxin"></i>
                  {{ userInfo.realname }}
                  <i class="iconfont iconkuozhan"></i>
                </span> -->
                <span v-else  class="row-flex align-item-center el-dropdown-link span">
                  <i class="iconfont icongerenzhongxin"></i>
                  {{ userInfo.realname}}
                  <i class="iconfont iconkuozhan"></i>
                </span>

                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-for="(item, n) in userMenus" :key="n" class="menu-box">
                    <nuxt-link class="menu-item" v-if="item.to" :to="item.to">
                      {{ item.name }}
                    </nuxt-link>
                    <span class="menu-item" v-if="item.action" @click="item.action">
                      {{ item.name }}
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <!--        心愿单-->
          <!--  <nuxt-link
              :to="{ path: hadLogin ? '/account/wish-list' : '/login' }"
            >
              <div class="item wish">
                <i class="iconfont icongerenzhongxin_xinyuandan"></i>
                <span class="text"
                  >{{ $t(`${lang}.wish`) }}({{ wishAmount }})</span
                >
              </div>
            </nuxt-link> -->

            <!--        购物车-->
            <nuxt-link :to="{ path: '/shopping-cart' }">
              <div class="item cart">
                <i class="iconfont icongouwuche"></i>
                <span class="text"
                  ></span
                >
                <span class="text"
                  >({{ cartAmount }})</span
                >
              </div>
            </nuxt-link>

            <!--        语言切换-->
            <div v-if="this.$store.state.platform === 10" class="item language">
               <!--<el-dropdown
                type="primary"

                placement="bottom"
                @command="setLanguage"
              >
                <span class="row-flex align-item-center el-dropdown-link span">
                  {{ languageInfo.content }}<i class="iconfont iconkuozhan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(option, n) in languageOptionsCn"
                    :key="n"
                    :command="option.code"
                  >
                    {{ option.content }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <!-- <el-dropdown
                v-if="this.$store.state.platform === 30"
                type="primary"

                placement="bottom"
                @command="setLanguage"
              >
                <span class="row-flex align-item-center el-dropdown-link span">
                  English
                </span>
              </el-dropdown> -->
              <el-dropdown
                
                type="primary"

                placement="bottom"
                @command="setLanguage"
              >
                <span class="row-flex align-item-center el-dropdown-link span">
                  {{ languageInfo.content }}<i class="iconfont iconkuozhan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(option, n) in languageOptions"
                    :key="n"
                    :command="option.code"
                  >
                    {{ option.content }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <!--        货币切换-->
            <div v-if="this.$store.state.platform === 10 || this.$store.state.platform === 30" class="item coin">
              <el-dropdown
                type="primary"

                placement="bottom"
                @command="setCoin"
              >
                <span class="row-flex align-item-center el-dropdown-link gray">
                  {{ coinInfo.content }}<i class="iconfont iconkuozhan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(option, n) in coinOptions"
                    :key="n"
                    :command="option.code"
                  >
                    {{ option.content }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- <div v-if="this.$store.state.platform === 20" class="item coin">
              <el-dropdown
                type="primary"

                placement="bottom"
                @command="setCoin"
              >
                <span class="row-flex align-item-center el-dropdown-link">
                  {{ coinInfo.content }}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(option, n) in coinOptionsCn"
                    :key="n"
                    :command="option.code"
                  >
                    {{ option.content }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else-if="this.$store.state.platform === 40" class="item coin">
              <el-dropdown
                type="primary"

                placement="bottom"
                @command="setCoin"
              >
                <span class="row-flex align-item-center el-dropdown-link">
                  {{ coinInfo.content }}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(option, n) in coinOptionsTw"
                    :key="n"
                    :command="option.code"
                  >
                    {{ option.content }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div  class="item coin">
              <el-dropdown
                type="primary"

                placement="bottom"
                @command="setCoin"
              >
                <span class="row-flex align-item-center el-dropdown-link">
                  {{ coinInfo.content }}<i class="iconfont iconkuozhan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(option, n) in coinOptions"
                    :key="n"
                    :command="option.code"
                  >
                    {{ option.content }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div> -->
          </div>
        </div>
      </div>
      
      <nav class="nav">
        <div class="nav-box">
          <div class="row-flex nav-content">
            <!-- <div class="row-flex align-item-center left-item">
              <div class="logo">
                <nuxt-link to="/">
                  <img src="/components/topBar/logo.png" />
                </nuxt-link>
              </div>
            </div> -->
            <div class="row-flex align-item-center justify-center right-item">
              <!-- <div v-show="fixedStatus" class="icon-logo"> 
                <nuxt-link to="/">
                  <img src="/components/topBar/ms-logo.png" />
                </nuxt-link>
              </div> -->
              <ul class="nav-list">
                <li
                  v-for="(nav, index) in navList"
                  :key="index"
                  class="nav-item"
                  :class="{ activeColor:activeNavMenu == nav.key}"
                  @mouseover="changeActiveNavMenu(nav.key)"
                  @mouseout="changeActiveNavMenu('')"
                >
                  <nuxt-link
                    v-if="nav.to"
                    :class="['nav-item-name',{ active: activeNavMenu === nav.key }]"
                    :to="nav.to" target="_blank">
                    {{ nav.name }}
                  </nuxt-link>

                  <div
                    v-else
                    :class="[
                      'nav-item-name',
                      { active: activeNavMenu === nav.key }
                    ]"
                  >
                    {{ nav.name }}
                  </div>
                </li>
              </ul>
              <!-- <span class="gap-line"></span> -->
              <!-- <span style="margin: 0 49px;"></span> -->
              <ul class="nav-list other-nav-list">
                <li
                  v-for="(nav, index) in otherNavList"
                  :key="index"
                  class="nav-item"
                >
                  <nuxt-link v-if="nav.to" :to="nav.to">
                    <div class="nav-item-name">
                      {{ nav.name }}
                    </div>
                  </nuxt-link>
                  <div v-else class="nav-item-name">
                    {{ nav.name }}
                  </div>
                </li>
              </ul>
              <div v-show="!fixedStatus" class="search-box justify-end">
                <input
                  v-model.trim="keyword"
                  :placeholder="$t(`${lang}.search`)"
                  @keyup.enter="toSearch"
                />
                <span class="icon">
                  <i class="iconfont iconicon-sousuo" @click="toSearch"></i>
                </span>
              </div>
              <div v-show="fixedStatus" class="icon-group">
                <nuxt-link
                  :to="{ path: hadLogin ? '/account/settings' : '/login' }"
                >
                  <i class="iconfont icongerenzhongxin"></i>
                </nuxt-link>
                <!-- <nuxt-link :to="{ path: '/account/wish-list' }">
                  <i class="iconfont icongerenzhongxin_xinyuandan"></i>
                </nuxt-link> -->
                <nuxt-link :to="{ path: '/shopping-cart' }">
                  <i class="iconfont icongouwuche"></i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div :class="['menu', { active: activeNavMenu }]">
          <div
            v-for="(menu, index) in menus"
            :key="index"
            :class="['menu-item', { active: index === activeNavMenu }]"
            @mouseover="changeActiveNavMenu(index)"
            @mouseout="changeActiveNavMenu('')"
          >
            <section :class="['menu-item-content', index + '-menu']">
              <div
                v-for="(group, groupIndex) in menu.groups"
                :key="groupIndex"
                :class="[
                  'platoon-item',
                  { 'dotted-right-line': groupIndex < menu.groups.length - 1,'dotted-margin-right':language == 'en_US' }
                ]"
              >
                <dl
                  v-for="(groupItem, groupItemIndex) in group"
                  :key="groupItemIndex"
                  class="group"
                >
                  <dt class="group-name">{{ groupItem.groupName }}</dt>
                  <dt
                    v-for="(item, itemIndex) in groupItem.data"
                    :key="itemIndex"
                    class="group-item"
                    @click="changeActiveNavMenu('');addColor(index,groupIndex,groupItemIndex,itemIndex)"
                  >
                    <nuxt-link v-if="item.to" :to="item.to">
                      <span v-if="item.icon" class="item-icon">
                        <i :class="['iconfont', item.icon]"></i>
                      </span>
                      <span class="item-name" >
                        <span > {{ item.name }}</span>
                      </span>
                    </nuxt-link>
                    <a v-else>
                      <span v-if="item.icon" class="item-icon">
                        <i :class="['iconfont', item.icon]"></i>
                      </span>
                      <span class="item-name">
                        <span> {{ item.name }}</span>
                      </span>
                    </a>
                  </dt>
                </dl>
              </div>
              <div class="platoon-item image-platoon">
                <img :src="menu.image" />
              </div>
            </section>
          </div>
        </div>
      </nav>

      <div class="header__backdrop" v-show="backdrop"></div>
    </header>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
const lang = 'components.topBar'
export default {
  data() {
    return {
      backdrop:false,
      colorline:false,
      current1:'',
      current2:'',
      current3:'',
      current4:'',
      url:'',
      language:'',
      lang,
      keyword: '',
      languageOptions: this.$bddDefinition.languageOptions,
      languageOptionsCn: this.$bddDefinition.languageOptionsCn,
      coinOptions: this.$bddDefinition.coinOptions,
      coinOptionsCn: this.$bddDefinition.coinOptionsCn,
      coinOptionsTw: this.$bddDefinition.coinOptionsTw,
      userMenus: [
        {
          name: this.$t(`${lang}.order`),
          to: {
            path: '/account/orders'
          }
        },
        {
          name: this.$t(`${lang}.account`),
          to: {
            path: '/account/settings'
          }
        },
        {
          name: this.$t(`${lang}.coupon`),
          to: {
            path: '/account/coupon'
          }
        },
        {
          name: this.$t(`${lang}.loginOut`),
          action: this.logout
        }
      ],
      activeNavMenu: '',
      navList: [
        {
          key: 'ring',
          name: this.$t(`${lang}.ring`),
        },
        {
          key: 'necklace',
          name: this.$t(`${lang}.necklace`),
        },
        {
          key: 'bracelet',
          name: this.$t(`${lang}.bracelet`),
        },
        {
          key: 'earring',
          name: this.$t(`${lang}.earring`),
        },
        {
          key: 'Designer',
          name: this.$t(`${lang}.Designer`),
        },
        {
          key: 'NewProducts',
          name: this.$t(`${lang}.NewProducts`),
        },
        {
          key: 'moreShineWorld',
          name: this.$t(`${lang}.moreShineWorld`),
        }
      ],
      otherNavList: [
        // {
        //   key: 'education',
        //   name: this.$t(`${lang}.education`),
        //   to: {
        //     path: '/education/diamonds/carat'
        //   }
        // }
      ],
      menus: {
        'ring': {
          groups: [
            [
              {
                groupName: this.$t(`${lang}.ringsMenu.series`),
                data: [
                  {
                    name: this.$t(`${lang}.ringsMenu.Alphabetic`),
                    to: {
                      path: '/wedding-rings/ring-letter-series'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.ringsMenu.material`),
                data: [
                  {
                    name: this.$t(`${lang}.ringsMenu.alloy`),
                    to: {
                      path: '/wedding-rings/alloy'
                    }
                  },
                  {
                    name: this.$t(`${lang}.ringsMenu.925KSilver`),
                    to: {
                      path: '/wedding-rings/925-silver'
                    }
                  },
                  {
                    name: this.$t(`${lang}.ringsMenu.9KGold`),
                    to: {
                      path: '/wedding-rings/9k-gold'
                    }
                  },
                  {
                    name: this.$t(`${lang}.ringsMenu.14KGold`),
                    to: {
                      path: '/wedding-rings/14k-gold'
                    }
                  },
                  {
                    name: this.$t(`${lang}.ringsMenu.18KGold`),
                    to: {
                      path: '/wedding-rings/18k-gold'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'object',
                groupName: this.$t(`${lang}.ringsMenu.target`),
                data: [
                  {
                    id: 45,
                    name: this.$t(`${lang}.ringsMenu.RomanticLady`),
                    to: {
                      path: '/wedding-rings/ring-Romantic-lady'
                    }
                  },
                  {
                    id: 44,
                    name: this.$t(`${lang}.ringsMenu.DistinguishedMan`),
                    to: {
                      path: '/wedding-rings/ring-distinguished-man'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'mosaic',
                groupName: this.$t(`${lang}.ringsMenu.inlay`),
                data: [
                  {
                    id: 275,
                    name: this.$t(`${lang}.ringsMenu.GroupInlay`),
                    to: {
                      path: '/wedding-rings/ring-group-setting'
                    }
                  },
                  {
                    id: 276,
                    name: this.$t(`${lang}.ringsMenu.SingleDrill`),
                    to: {
                      path: '/wedding-rings/ring-single-drill'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'style',
                groupName: this.$t(`${lang}.ringsMenu.styles`),
                data: [
                  {
                    id: 277,
                    name: this.$t(`${lang}.ringsMenu.ModernSimplicity`),
                    icon: '',
                    to: {
                      path: '/wedding-rings/ring-modern-simplicity'
                    }
                  },
                  {
                    id: 278,
                    name: this.$t(`${lang}.ringsMenu.ClassicRetro`),
                    icon: '',
                    to: {
                      path: '/wedding-rings/ring-classic-retro'
                    }
                  },
                  {
                    id: 279,
                    name: this.$t(`${lang}.ringsMenu.PersonalityFun`),
                    icon: '',
                    to: {
                      path: '/wedding-rings/ring-fun-with-personality'
                    }
                  },
                  {
                    id: 280,
                    name: this.$t(`${lang}.ringsMenu.FashionLimit`),
                    icon: '',
                    to: {
                      path: '/wedding-rings/ring-fashion-limited'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.ringsMenu.prices`),
                data: [
                  {
                    id: 31,
                    name: this.$t(`${lang}.ringsMenu.priceRange1`),
                    icon: '',
                    to: {
                      path: `/wedding-rings/all?priceRange=${this.$helpers.base64Encode(JSON.stringify([0, 500]))}`
                    }
                  },
                  {
                    id: 28,
                    name: this.$t(`${lang}.ringsMenu.priceRange2`),
                    icon: '',
                    to: {
                      path: `/wedding-rings/all?priceRange=${this.$helpers.base64Encode(JSON.stringify([500, 1000]))}`
                    }
                  },
                  {
                    id: 32,
                    name: this.$t(`${lang}.ringsMenu.priceRange3`),
                    icon: '',
                    to: {
                      path: `/wedding-rings/all?priceRange=${this.$helpers.base64Encode(JSON.stringify([1000, 5000]))}`
                    }
                  },
                  {
                    id: 29,
                    name: this.$t(`${lang}.ringsMenu.priceRange4`),
                    icon: '',
                    to: {
                      path: `/wedding-rings/all?priceRange=${this.$helpers.base64Encode(JSON.stringify([5000, 10000]))}`
                    }
                  },
                  {
                    id: 34,
                    name: this.$t(`${lang}.ringsMenu.priceRange5`),
                    icon: '',
                    to: {
                      path: `/wedding-rings/all?priceRange=${this.$helpers.base64Encode(JSON.stringify([10000, 300000]))}`
                    }
                  }
                ]
              }
            ]
          ]
        },
        'necklace': {
          groups: [
            [
              {
                groupName: this.$t(`${lang}.necklaceMenu.series`),
                data: [
                  {
                    name: this.$t(`${lang}.necklaceMenu.Alphabetic`),
                    to: {
                      path: '/jewellery/necklace-letter-series'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.necklaceMenu.material`),
                data: [
                  {
                    id: 204,
                    name: this.$t(`${lang}.necklaceMenu.alloy`),
                    to: {
                      path: '/jewellery/necklace-alloy'
                    }
                  },
                  {
                    id: 35,
                    name: this.$t(`${lang}.necklaceMenu.925KSilver`),
                    to: {
                      path: '/jewellery/necklace-925-silver'
                    }
                  },
                  {
                    id: 272,
                    name: this.$t(`${lang}.necklaceMenu.9KGold`),
                    to: {
                      path: '/jewellery/necklace-9k-gold'
                    }
                  },
                  {
                    id: 273,
                    name: this.$t(`${lang}.necklaceMenu.14KGold`),
                    to: {
                      path: '/jewellery/necklace-14k-gold'
                    }
                  },
                  {
                    id: 274,
                    name: this.$t(`${lang}.necklaceMenu.18KGold`),
                    to: {
                      path: '/jewellery/necklace-18k-gold'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.necklaceMenu.target`),
                data: [
                  {
                    name: this.$t(`${lang}.necklaceMenu.RomanticLady`),
                    to: {
                      path: '/jewellery/necklace-Romantic-lady'
                    }
                  },
                  {
                    name: this.$t(`${lang}.necklaceMenu.DistinguishedMan`),
                    to: {
                      path: '/jewellery/necklace-distinguished-man'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.necklaceMenu.inlay`),
                data: [
                  {
                    id: 275,
                    name: this.$t(`${lang}.necklaceMenu.GroupInlay`),
                    to: {
                      path: '/jewellery/necklace-group-setting'
                    }
                  },
                  {
                    id: 276,
                    name: this.$t(`${lang}.necklaceMenu.SingleDrill`),
                    to: {
                      path: '/jewellery/necklace-single-drill'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.necklaceMenu.styles`),
                data: [
                  {
                    id: 277,
                    name: this.$t(`${lang}.necklaceMenu.ModernSimplicity`),
                    to: {
                      path: '/jewellery/necklace-modern-simplicity'
                    }
                  },
                  {
                    id: 278,
                    name: this.$t(`${lang}.necklaceMenu.ClassicRetro`),
                    to: {
                      path: '/jewellery/necklace-classic-retro'
                    }
                  },
                  {
                    id: 279,
                    name: this.$t(`${lang}.necklaceMenu.PersonalityFun`),
                    to: {
                      path: '/jewellery/necklace-fun-with-personality'
                    }
                  },
                  {
                    id: 280,
                    name: this.$t(`${lang}.necklaceMenu.FashionLimit`),
                    to: {
                      path: '/jewellery/necklace-fashion-limited'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.necklaceMenu.prices`),
                data: [
                  {
                    id: 31,
                    name: this.$t(`${lang}.necklaceMenu.priceRange1`),
                    icon: '',
                    to: {
                      path: `/jewellery/necklaces?priceRange=${this.$helpers.base64Encode(JSON.stringify([0, 500]))}`
                    }
                  },
                  {
                    id: 28,
                    name: this.$t(`${lang}.necklaceMenu.priceRange2`),
                    icon: '',
                    to: {
                      path: `/jewellery/necklaces?priceRange=${this.$helpers.base64Encode(JSON.stringify([500, 1000]))}`
                    }
                  },
                  {
                    id: 32,
                    name: this.$t(`${lang}.necklaceMenu.priceRange3`),
                    icon: '',
                    to: {
                      path: `/jewellery/necklaces?priceRange=${this.$helpers.base64Encode(JSON.stringify([1000, 5000]))}`
                    }
                  },
                  {
                    id: 29,
                    name: this.$t(`${lang}.necklaceMenu.priceRange4`),
                    icon: '',
                    to: {
                      path: `/jewellery/necklaces?priceRange=${this.$helpers.base64Encode(JSON.stringify([5000, 10000]))}`
                    }
                  },
                  {
                    id: 34,
                    name: this.$t(`${lang}.necklaceMenu.priceRange5`),
                    icon: '',
                    to: {
                      path: `/jewellery/necklaces?priceRange=${this.$helpers.base64Encode(JSON.stringify([10000, 300000]))}`
                    }
                  }
                ]
              }
            ]
          ]
        },
        'bracelet': {
          groups: [
            [
              {
                groupName: this.$t(
                  `${lang}.braceletMenu.series`
                ),
                data: [
                  {
                    name: this.$t(`${lang}.braceletMenu.Alphabetic`),
                    // icon: 'iconJewelry-bracelet',
                    to: {
                      path: '/jewellery/bracelet-letter-series'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.braceletMenu.material`),
                data: [
                  {
                    id: 28,
                    name: this.$t(`${lang}.braceletMenu.alloy`),
                    to: {
                      path: '/jewellery/bracelet-alloy'
                    }
                  },
                  {
                    id: 29,
                    name: this.$t(`${lang}.braceletMenu.925KSilver`),
                    to: {
                      path: '/jewellery/bracelet-925-silver'
                    }
                  },
                  {
                    id: 30,
                    name: this.$t(`${lang}.braceletMenu.9KGold`),
                    to: {
                      path: '/jewellery/bracelet-9k-gold'
                    }
                  },
                  {
                    id: 34,
                    name: this.$t(`${lang}.braceletMenu.14KGold`),
                    to: {
                      path: '/jewellery/bracelet-14k-gold'
                    }
                  },
                  {
                    id: 35,
                    name: this.$t(`${lang}.braceletMenu.18KGold`),
                    to: {
                      path: '/jewellery/bracelet-18k-gold'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.braceletMenu.target`),
                data: [
                  {
                    name: this.$t(`${lang}.braceletMenu.RomanticLady`),
                    to: {
                      path: '/jewellery/bracelet-Romantic-lady'
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.DistinguishedMan`),
                    to: {
                      path: '/jewellery/bracelet-distinguished-man'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.braceletMenu.inlay`),
                data: [
                  {
                    name: this.$t(`${lang}.braceletMenu.GroupInlay`),
                    to: {
                      path: '/jewellery/bracelet-group-setting'
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.SingleDrill`),
                    to: {
                      path: '/jewellery/bracelet-single-drill'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.braceletMenu.styles`),
                data: [
                  {
                    name: this.$t(`${lang}.braceletMenu.SimpleStylish`),
                    to: {
                      path: '/jewellery/bracelet-Simple-and-stylish'
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.WorkplaceCommuting`),
                    to: {
                      path: '/jewellery/bracelet-workplace-commute'
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.PersonalityFun`),
                    to: {
                      path: '/jewellery/bracelet-fun-with-personality'
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.TrendClassic`),
                    to: {
                      path: '/jewellery/bracelet-Trend-classic'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.braceletMenu.prices`),
                data: [
                  {
                    name: this.$t(`${lang}.braceletMenu.priceRange1`),
                    to: {
                      path: `/jewellery/bracelets?priceRange=${this.$helpers.base64Encode(JSON.stringify([0, 500]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.priceRange2`),
                    to: {
                      path: `/jewellery/bracelets?priceRange=${this.$helpers.base64Encode(JSON.stringify([500, 1000]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.priceRange3`),
                    to: {
                      path: `/jewellery/bracelets?priceRange=${this.$helpers.base64Encode(JSON.stringify([1000, 5000]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.priceRange4`),
                    to: {
                      path: `/jewellery/bracelets?priceRange=${this.$helpers.base64Encode(JSON.stringify([5000, 10000]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.braceletMenu.priceRange5`),
                    to: {
                      path: `/jewellery/bracelets?priceRange=${this.$helpers.base64Encode(JSON.stringify([10000, 300000]))}`
                    }
                  }
                ]
              }
            ]
          ]
        },
        'earring': {
          groups: [
            [
              {
                groupName: this.$t(
                  `${lang}.earringMenu.series`
                ),
                data: [
                  {
                    name: this.$t(`${lang}.earringMenu.Alphabetic`),
                    // icon: 'iconJewelry-bracelet',
                    to: {
                      path: '/jewellery/earring-letter-series'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.earringMenu.material`),
                data: [
                  {
                    id: 28,
                    name: this.$t(`${lang}.earringMenu.alloy`),
                    to: {
                      path: '/jewellery/earring-alloy'
                    }
                  },
                  {
                    id: 29,
                    name: this.$t(`${lang}.earringMenu.925KSilver`),
                    to: {
                      path: '/jewellery/earring-925-silver'
                    }
                  },
                  {
                    id: 30,
                    name: this.$t(`${lang}.earringMenu.9KGold`),
                    to: {
                      path: '/jewellery/earring-9k-gold'
                    }
                  },
                  {
                    id: 34,
                    name: this.$t(`${lang}.earringMenu.14KGold`),
                    to: {
                      path: '/jewellery/earring-14k-gold'
                    }
                  },
                  {
                    id: 35,
                    name: this.$t(`${lang}.earringMenu.18KGold`),
                    to: {
                      path: '/jewellery/earring-18k-gold'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.earringMenu.category`),
                data: [
                  {
                    name: this.$t(`${lang}.earringMenu.Earrings`),
                    to: {
                      path: '/jewellery/Earrings'
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.EarStuds`),
                    to: {
                      path: '/jewellery/earStud'
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.EarLine`),
                    to: {
                      path: '/jewellery/EarLine'
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.EarDrop`),
                    to: {
                      path: '/jewellery/EarDrop'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.earringMenu.styles`),
                data: [
                  {
                    name: this.$t(`${lang}.earringMenu.SimpleStylish`),
                    to: {
                      path: '/jewellery/earring-Simple-and-stylish'
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.WorkplaceCommuting`),
                    to: {
                      path: '/jewellery/earring-workplace-commute'
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.PersonalityFun`),
                    to: {
                      path: '/jewellery/earring-fun-with-personality'
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.TrendClassic`),
                    to: {
                      path: '/jewellery/earring-Trend-classic'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.earringMenu.prices`),
                data: [
                  {
                    name: this.$t(`${lang}.earringMenu.priceRange1`),
                    to: {
                      path: `/jewellery/Earring?priceRange=${this.$helpers.base64Encode(JSON.stringify([0, 500]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.priceRange2`),
                    to: {
                      path: `/jewellery/Earring?priceRange=${this.$helpers.base64Encode(JSON.stringify([500, 1000]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.priceRange3`),
                    to: {
                      path: `/jewellery/Earring?priceRange=${this.$helpers.base64Encode(JSON.stringify([1000, 5000]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.priceRange4`),
                    to: {
                      path: `/jewellery/Earring?priceRange=${this.$helpers.base64Encode(JSON.stringify([5000, 10000]))}`
                    }
                  },
                  {
                    name: this.$t(`${lang}.earringMenu.priceRange5`),
                    to: {
                      path: `/jewellery/Earring?priceRange=${this.$helpers.base64Encode(JSON.stringify([10000, 300000]))}`
                    }
                  }
                ]
              }
            ]
          ]
        },
        'Designer': {
          groups: [
            [
              {
                groupName: this.$t(
                  `${lang}.DesignerMenu.series`
                ),
                data: [
                  {
                    name: this.$t(`${lang}.DesignerMenu.Alphabetic`),
                    to: {
                      path: '/designer/designer-letter-series'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'style',
                groupName: this.$t(`${lang}.DesignerMenu.styles`),
                data: [
                  {
                    id: 28,
                    name: this.$t(`${lang}.DesignerMenu.ModernSimplicity`),
                    to: {
                      path: '/designer/designer-modern-simplicity'
                    }
                  },
                  {
                    id: 29,
                    name: this.$t(`${lang}.DesignerMenu.ClassicRetro`),
                    to: {
                      path: '/designer/designer-classic-retro'
                    }
                  },
                  {
                    id: 30,
                    name: this.$t(`${lang}.DesignerMenu.PersonalityFun`),
                    to: {
                      path: '/designer/designer-fun-with-personality'
                    }
                  },
                  {
                    id: 34,
                    name: this.$t(`${lang}.DesignerMenu.FashionLimit`),
                    to: {
                      path: '/designer/designer-fashion-limited'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.DesignerMenu.material`),
                data: [
                  {
                    name: this.$t(`${lang}.DesignerMenu.alloy`),
                    icon: '',
                    to: {
                      path: '/designer/designer-alloy'
                    }
                  },
                  {
                    name: this.$t(`${lang}.DesignerMenu.925KSilver`),
                    icon: '',
                    to: {
                      path: '/designer/designer-925-silver'
                    }
                  },
                  {
                    name: this.$t(`${lang}.DesignerMenu.9KGold`),
                    icon: '',
                    to: {
                      path: '/designer/designer-9k-gold'
                    }
                  },
                  {
                    name: this.$t(`${lang}.DesignerMenu.14KGold`),
                    icon: '',
                    to: {
                      path: '/designer/designer-14k-gold'
                    }
                  },
                  {
                    name: this.$t(`${lang}.DesignerMenu.18KGold`),
                    icon: '',
                    to: {
                      path: '/designer/designer-18k-gold'
                    }
                  }
                ]
              }
            ]
          ]
        }
      },
      fixedStatus: false
    }
  },
  computed: {
    ...mapState(['cartAmount', 'wishAmount']),
    ...mapGetters(['userInfo', 'hadLogin']),
    showMobile() {
      let result = this.userInfo.username
      if(result){
        result=result.replace(result.substr(9, 100),"....")
      }
      return result
    },
    languageInfo() {
      let result = ''
      const language = this.$store.state.language
      const languageOptions = this.$bddDefinition.languageOptions
      const languageOptionsCn = this.$bddDefinition.languageOptionsCn
      if(this.$store.state.platform === 10){
        for (let n = 0, length = languageOptions.length; n < length; n++) {
          if (languageOptions[n].code === language) {
            result = languageOptions[n]
            break
          }
        }
        return result
      } else {
        for (let n = 0, length = languageOptionsCn.length; n < length; n++) {
          if (languageOptionsCn[n].code === language) {
            result = languageOptionsCn[n]
            break
          }
        }
        return result
        
      }
    },
    coinInfo() {
      let result = ''
      const coin = this.$store.state.coin
      const coinOptions = this.$bddDefinition.coinOptions
      // const coinOptionsCn = this.$bddDefinition.coinOptionsCn
      // const coinOptionsTw = this.$bddDefinition.coinOptionsTw

      // if(this.$store.state.platform === 20){
      //   for (let n = 0, length = coinOptionsCn.length; n < length; n++) {
      //     if (coinOptionsCn[n].code === coin) {
      //       result = coinOptionsCn[n]
      //       break
      //     }
      //   }
      //   return result
      // }else if(this.$store.state.platform === 40){
      //   for (let n = 0, length = coinOptionsTw.length; n < length; n++) {
      //     if (coinOptionsTw[n].code === coin) {
      //       result = coinOptionsTw[n]
      //       break
      //     }
      //   }
      //   return result
      // } else {
        for (let n = 0, length = coinOptions.length; n < length; n++) {
          if (coinOptions[n].code === coin) {
            result = coinOptions[n]
            break
          }
        }
        return result
      // }
    }
  },
  mounted() {
    this.language = this.$store.state.language

    this.$nextTick(() => {})
  },
  methods: {
    // 点击登入获取上页url
    login(){
      let oldurl=window.location.pathname
      let params=window.location.search
      //如果是订单确认页面，返回到购物车
      if((/^\/billing-address/).test(oldurl)){
          oldurl = '/shopping-cart'
          params = ''
      }

      const url=oldurl+params
      localStorage.setItem('url',url)
      setTimeout(() => {
        this.$router.push({
            path: `/login`,
            // query: {url}
        })
      },0)
      // console.log("oldurl",url)
    },
    ...mapMutations(['setCoin', 'setLanguage']),
    fixed(status) {
      this.fixedStatus = !!status
    },
    changeActiveNavMenu(nav) {
      this.activeNavMenu = nav
      if(nav && nav !== 'NewProducts' && nav !== 'moreShineWorld'){
        this.backdrop = true
      } else {
        this.backdrop = false
      }
      // console.log("nav  colorline",this.activeNavMenu)
      
    },
    addColor(index1,index2,index3,index4){
      this.current1=index1;
      this.current2=index2;
      this.current3=index3;
      this.current3=index4;
    },
    setCoin(coin) {
      this.$store.commit('setCoin', coin)
      window.location.reload()
    },
    setLanguage(lang) {
      this.$store.commit('setLanguage', lang)
	  
	  var platform = this.$store.state.platform;
	  var loginType = 2;
	  if(platform == 20){
		  loginType = 1
	  }else{
		  if(lang == 'zh_CN'){
			  loginType = 1
		  }else{
			  loginType = 2
		  }
	  }
	  
	  sessionStorage.setItem('loginType', loginType)
      window.location.reload()
    },
    logout() {
      this.$store.dispatch('logout', lang)
      window.location.reload()
      // window.location.reload()
      // this.$store.dispatch('logout', lang)
      // setTimeout(() => {
      //   window.location.reload()
      // },0)
      // this.$router.push('/login')
      // this.$store.dispatch('logout', lang)
      // this.$router.push(`/login`)
      // this.$store.dispatch('logout', lang)
      //  this.$router.push('/login')
      // window.location.reload()
      // this.$router.replace({
      //   path: '/login',
      //   query: {
      //     type: 'login'
      //   }
      // })
    },
    toSearch() {
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.$helpers.base64Encode(this.keyword)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header__backdrop{
  right: 0;
  bottom: 0;
  z-index: 100;
  height: 100%;
  position: fixed;
  top: 100px;
  left: 0;
  background: rgba(0,0,0,.5);
}
.ms-title{
  height: 8px;
  background: #A8D3DE;
}
.icon-logo{
  width: 70px;
  height: 80px;
  margin-top: 20px;
  margin-right: 95px;
  img{
    width: 100%;
  }
}
.gray{
  color: #717171;
}
.top-bar {
  height: 150px;
  transition: all 0.3s linear;

  .header {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    background-color: #ffffff;
    z-index: 1200;

    .title {
      z-index: 1200;
      position: relative;
      height: 30px;
      background-color: #000000;

      .title-content {
        width: 830px;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          flex-grow: 0;
          flex-shrink: 0;
          font-size: 12px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .shortcut {
      z-index: 1200;
      position: relative;
      background-color: #ffffff;
      z-index: 10;
      max-width: 1366px;
      margin: auto;
      .shortcut-content {
        margin-top: 10px;
        /*max-width: 1360px;*/
        /*margin: auto;*/
        // height: 43px;
        // max-height: 45px;
        overflow: hidden;
        // border-bottom: 1px solid rgba(236, 236, 236, 1);
        transition: max-height 0.3s linear;

        .left-item {
          width: 45%;
          flex-grow: 0;
          flex-shrink: 0;
          height: 30px;

          .date {
            display: inline-block;
            padding: 0 5px;
            box-sizing: border-box;
            margin-left: 20px;
            width: 73px;
            height: 40px;
            line-height: 40px;
            background: rgba(95, 154, 174, 1);
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            color: #ffffff;
            text-align: right;
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .service {
            margin-left: 30px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(99, 99, 99, 1);

            .iconphone {
              font-size: 22px;
              margin-right: 11px;
            }
            .gap-line {
              width: 1px;
              height: 23px;
              margin: 0 11px;
              background: rgba(187, 187, 187, 1);
            }
          }
        }
        .center-item{
          display: flex;
          justify-content: center;
          width: 10%;
          text-align: center;
        }
        .right-item {
          height: 30px;
          width: 45%;
          flex-grow: 1;
          flex-shrink: 1;
          margin-right: 55px;
          

          .item {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;

            .el-dropdown-link {
              font-size: 12px;
            }
            .iconfont {
              // margin-right: 25px;
            }
            .text {
              font-size: 12px;
              font-weight: 400;
              color: rgba(113, 113, 113, 1);
            }
          }

          .story-image {
            margin-top: 5px;
            margin-right: 37px;
            font-size: 0;
            line-height: 0;

            img {
              width: 181px;
            }
          }
          .user {
            margin-right: 16px;

            .icongerenzhongxin {
              // width: 20px;
              // height: 22px;
              font-size: 22px;
              color: #666666;
            }
            .iconkuozhan {
              // width: 20px;
              // height: 22px;
              font-size: 6px;
              color: #636363;
              display: inline-block;
              transform: rotateZ(90deg);
            }
          }
          .wish {
            margin-right: 37px;

            .icongerenzhongxin_xinyuandan {
              font-size: 23px;
            }
          }
          .cart {
            // margin-right: 16px;

            .icongouwuche {
              font-size: 22px;
              color: #636363;
            }
          }
          .language {
            // margin-right: 16px;
            margin-left: 16px;

            .iconkuozhan {
              font-size: 6px;
              color: #636363;
              display: inline-block;
              transform: rotateZ(90deg);
            }
          }
          .coin {
            margin-left: 16px;

            .iconkuozhan {
              font-size: 6px;
              color: #636363;
              display: inline-block;
              transform: rotateZ(90deg);
            }
          }
        }
      }
    }
    .nav {
      z-index: 1200;
      position: relative;
      background-color: #ffffff;
      .nav-box {
        border-bottom: 1px solid rgba(236, 236, 236, 1);

        .nav-content {  
          max-width: 1366px;
          margin: auto;
          height: 75px;
          box-sizing: content-box;
          justify-content: space-between;

          .left-item {
            height: 100%;
            flex-grow: 0;
            flex-shrink: 0;

            .logo {
              font-size: 0;
              line-height: 0;

              img {
                width: 181px;
              }
            }
          }

          .right-item {
            width: 100%;
            height: 100%;
            position: relative;

            .nav-list {
              // width: 560px;
              margin-right: 0!important;
              width: 48%;
              height: 100%;
              list-style: none;
              display: flex;
              justify-content: space-between;
              .nav-item:hover{
                  border-bottom: 3px solid #A4D1DC;
                }
              .activeColor{
                border-bottom: 3px solid #A4D1DC;
              }
              .nav-item {
                height: 100%;
                text-align: center;
                cursor: pointer;
                display: flex;
                flex-grow: 1;
                justify-content: center;
                position: relative;
                bottom: -1px;

                // .nav-item-name:hover{
                //   border-bottom: 3px solid #A4D1DC;
                // }
                .nav-item-name {
                  height: 100%;
                  line-height: 75px;
                  font-size: 13px;
                  font-weight: 400;
                  color: #000;
                  position: relative;
                  bottom: 2px;

                  &.active {
                    // color: #A4D1DC;

                    // &:after {
                    //   content: '';
                    //   position: absolute;
                    //   width: 100%;
                    //   height: 1px;
                    //   left: 0;
                    //   top: 100%;
                    //   background-color: #A4D1DC;
                    // }
                  }
                }
              }
            }

            .gap-line {
              width: 1px;
              height: 11px;
              margin: 0 49px;
              /*margin: 0 49px 0 89px;*/
              background-color: #656565;
            }

            .other-nav-list {
              width: auto;
              height: 100%;
              margin-right: 60px;
              list-style: none;

              .nav-item {
                position: relative;
                height: 100%;
                line-height: 75px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(99, 99, 99, 1);
                cursor: pointer;
              }
            }

            .search-box {
              width: 162px;
              height: 28px;
              display: flex;
              position: absolute;
              right:50px;

              input {
                width: 135px;
                height: 28px;
                padding: 3px 6px;
                border-bottom: 1px solid #adadad;
                font-size: 14px;
                font-weight: 400;
                color: #636363;
              }
              input::-webkit-input-placeholder {
                color: #636363;
              }
              .icon{
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;

                .iconfont {
                  color: #666666;
                  font-size: 23px;
                  cursor: pointer;
                }
              }
            }

            .icon-group {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              // justify-content: space-between;
              width: 120px;

              .iconfont {
                font-size: 22px;
                color: #636363;
              }
            }
          }
        }
      }

      .menu {
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        background-color: #ffffff;

        &.active {
          box-shadow: 0 10px 10px 1px rgba(0, 0, 0, 0.1);
        }

        .menu-item {
          width: 100%;
          height: 0;
          padding: 0;
          opacity: 0;
          overflow: hidden;
          box-sizing: border-box;
          transition: opacity 0.5s linear;

          &.active {
            height: auto;
            padding: 40px 10px;
            opacity: 1;
          }

          .menu-item-content {
            width: 100%;
            max-width: 1243px;
            margin: auto;
            display: flex;
            flex-direction: row;
            align-items: stretch;
            overflow: hidden;
            border-bottom: 0;
            box-sizing: border-box;

            .platoon-item {
              // flex-grow: 1;
              // flex-shrink: 1;
              position: relative;
              padding: 5px 0;

              .group {
                margin-bottom: 59px;

                &:nth-last-of-type(1) {
                  margin-bottom: 0;
                }

                .group-name {
                  height: 19px;
                  margin-bottom: 15px;
                  font-size: 14px;
                  font-weight: 700;
                  color: #333333;
                }
                .activeColor{
                  .item-name span{
                    border-bottom: 1px solid #A4D1DC;
                  }
                }
                .group-item {
                  height: 19px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-bottom: 10px;
                  cursor: pointer;

                  &:nth-last-of-type(1) {
                    margin-bottom: 0;
                  }

                  a {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .item-icon {
                      min-width: 36px;
                      color: #999999;

                      .iconfont {
                        font-size: 16px;

                        &.ring-icon {
                          font-size: 34px;
                          margin-right: 20px;
                        }
                      }
                    }
                    .item-name {
                      flex-grow: 1;
                      flex-shrink: 1;
                      font-size: 14px;
                      font-weight: 400;
                      color: #999999;
                    }
                    .item-name span{
                      // text-transform: uppercase; 
                      position: relative;
                      text-decoration: none;
                      padding: 2px;
                    }

                    .item-name span:after {
                      content: "";
                      position: absolute;
                      width: 1px;
                      height: 1px;
                      left: 0;
                      bottom: 0;
                      z-index: 9;
                      background: transparent;
                      -webkit-transition: all 0.5s ease;
                      -moz-transition: all 0.5s ease;
                      -ms-transition: all 0.5s ease;
                      -o-transition: all 0.5s ease;
                      transition: all 0.5s ease;
                    }

                    .item-name span:hover,
                      .item-name span:focus {
                        // color: #FCA311;
                        -webkit-transition: all 0.5s ease;
                        -moz-transition: all 0.5s ease;
                        -ms-transition: all 0.5s ease;
                        -o-transition: all 0.5s ease;
                        transition: all 0.5s ease;
                      }

                      .item-name span:hover:after,
                      .item-name span:focus:after{
                        width: 100%;
                        background: #A2D0DC;
                        -webkit-transition: all 0.5s ease;
                        -moz-transition: all 0.5s ease;
                        -ms-transition: all 0.5s ease;
                        -o-transition: all 0.5s ease;
                        transition: all 0.5s ease;
                      }
                  }
                }
                
              }
            }

            .dotted-margin-right{
              margin-right: 80px!important;
            }
            .dotted-right-line {
              margin-right: 140px;
              // border-right: 1px dashed #bbbbbd;

              &:before {
                content: ' ';
                position: absolute;
                width: 8px;
                height: 8px;
                background: rgba(222, 220, 222, 1);
                border-radius: 50%;
                top: -10px;
                right: -4px;
              }

              &:after {
                content: ' ';
                position: absolute;
                width: 8px;
                height: 8px;
                background: rgba(222, 220, 222, 1);
                border-radius: 50%;
                bottom: -10px;
                right: -4px;
              }
            }

            .image-platoon {
              flex-grow: 0;
              flex-shrink: 0;
              font-size: 0;
              line-height: 0;
            }

            &.engagement-ring-menu {
              .platoon-item:nth-of-type(1) {
                flex-basis: 330px;
              }
              .platoon-item:nth-of-type(2) {
                flex-basis: 310px;
              }
              .platoon-item:nth-of-type(3) {
                flex-basis: 230px;
              }
              .platoon-item:nth-of-type(4) {
                .image-platoon {
                  img {
                    width: 370px;
                  }
                }
              }
            }

            &.wedding-ring-menu {
              .platoon-item:nth-of-type(1) {
                flex-basis: 200px;
              }
              .platoon-item:nth-of-type(2) {
                flex-basis: 440px;
                display: flex;
                flex-direction: row;

                .group {
                  flex-grow: 1;
                  flex-shrink: 1;
                }
              }
              .platoon-item:nth-of-type(3) {
                flex-basis: 230px;
              }
              .platoon-item:nth-of-type(4) {
                .image-platoon {
                  img {
                    width: 370px;
                  }
                }
              }
            }

            &.diamond-menu {
              .platoon-item:nth-of-type(1) {
                flex-basis: 240px;
              }
              .platoon-item:nth-of-type(2) {
                flex-basis: 440px;
                display: flex;
                flex-direction: row;

                .group {
                  flex-grow: 1;
                  flex-shrink: 1;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  align-content: flex-start;

                  .group-name {
                    width: 100%;
                  }
                  .group-item {
                    width: 50%;

                    &:nth-last-of-type(1) {
                      margin-bottom: 24px;
                    }
                  }
                }
              }
              .platoon-item:nth-of-type(3) {
                flex-basis: 230px;
              }
              .platoon-item:nth-of-type(4) {
                .image-platoon {
                  img {
                    width: 370px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.top-bar.fixed {
  height: 106px;
  .header {
    position: absolute;

    .shortcut {
      .shortcut-content {
        max-height: 0;
        border-bottom: 0;
      }
    }
  }
}
.span{
  outline: none
}
.menu-box{
  padding: 0;
}
.menu-item{
  display: block;
  padding: 0 20px;
}
</style>
