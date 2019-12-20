<template>
  <div :class="['top-bar', { fixed: fixedStatus }]">
    <header :class="['header']">
      <div class="title">
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
      </div>
      <div class="shortcut">
        <div class="row-flex justify-between shortcut-content">
          <div class="row-flex left-item">
            <!--        <div class="date">24/7</div>-->
            <div class="row-flex align-item-center service">
              <i class="iconfont iconphone"></i>
              <span>(852) 2165 3905</span>
              <!--          <span class="gap-line"></span>-->
              <!--          <span>聯系 24/7</span>-->
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
                <span class="text">{{ $t(`${lang}.login`) }}</span>
              </div>
            </nuxt-link>

            <!--        登录后的用户菜单-->
            <div v-else class="item user">
              <el-dropdown type="primary" trigger="click" placement="bottom">
                <span class="row-flex align-item-center el-dropdown-link">
                  <i class="iconfont icongerenzhongxin"></i>
                  {{ userInfo.name }} {{ userInfo.surname }}
                  <i class="iconfont iconkuozhan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, n) in userMenus" :key="n">
                    <nuxt-link v-if="item.to" :to="item.to">
                      {{ item.name }}
                    </nuxt-link>
                    <span v-if="item.action" @click="item.action">
                      {{ item.name }}
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <!--        心愿单-->
            <nuxt-link
              :to="{ path: hadLogin ? '/account/wish-list' : '/login' }"
            >
              <div class="item wish">
                <i class="iconfont icongerenzhongxin_xinyuandan"></i>
                <span class="text"
                  >{{ $t(`${lang}.wish`) }}({{ wishAmount }})</span
                >
              </div>
            </nuxt-link>

            <!--        购物车-->
            <nuxt-link :to="{ path: '/shopping-cart' }">
              <div class="item cart">
                <i class="iconfont icongouwuche"></i>
                <span class="text"
                  >{{ $t(`${lang}.cart`) }}({{ cartAmount }})</span
                >
              </div>
            </nuxt-link>

            <!--        语言切换-->
            <div class="item language">
              <el-dropdown
                type="primary"
                trigger="click"
                placement="bottom"
                @command="setLanguage"
              >
                <span class="row-flex align-item-center el-dropdown-link">
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
            <div class="item coin">
              <el-dropdown
                type="primary"
                trigger="click"
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
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <div class="nav-box">
          <div class="row-flex nav-content">
            <div class="row-flex align-item-center left-item">
              <div class="logo">
                <nuxt-link to="/">
                  <img src="/components/topBar/logo.png" />
                </nuxt-link>
              </div>
            </div>
            <div class="row-flex align-item-center justify-end right-item">
              <ul class="nav-list">
                <li
                  v-for="(nav, index) in navList"
                  :key="index"
                  class="nav-item"
                  @mouseover="changeActiveNavMenu(nav.key)"
                  @mouseout="changeActiveNavMenu('')"
                >
                  <nuxt-link v-if="nav.to" :to="nav.to">
                    <div
                      :class="[
                        'nav-item-name',
                        { active: activeNavMenu === nav.key }
                      ]"
                    >
                      {{ nav.name }}
                    </div>
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
              <span class="gap-line"></span>
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
              <div v-show="!fixedStatus" class="search-box">
                <input
                  v-model="keyword"
                  :placeholder="$t(`${lang}.search`)"
                  @keyup.enter="toSearch"
                />
                <i class="iconfont iconicon-sousuo" @click="toSearch"></i>
              </div>
              <div v-show="fixedStatus" class="icon-group">
                <nuxt-link
                  :to="{ path: hadLogin ? '/account/settings' : '/login' }"
                >
                  <i class="iconfont icongerenzhongxin"></i>
                </nuxt-link>
                <nuxt-link :to="{ path: '/account/wish-list' }">
                  <i class="iconfont icongerenzhongxin_xinyuandan"></i>
                </nuxt-link>
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
                  { 'dotted-right-line': groupIndex < menu.groups.length - 1 }
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
                    @click="changeActiveNavMenu('')"
                  >
                    <nuxt-link v-if="item.to" :to="item.to">
                      <span v-if="item.icon" class="item-icon">
                        <i :class="['iconfont', item.icon]"></i>
                      </span>
                      <span class="item-name">{{ item.name }}</span>
                    </nuxt-link>
                    <a v-else>
                      <span v-if="item.icon" class="item-icon">
                        <i :class="['iconfont', item.icon]"></i>
                      </span>
                      <span class="item-name">{{ item.name }}</span>
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
    </header>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
const lang = 'components.topBar'
export default {
  data() {
    return {
      lang,
      keyword: '',
      languageOptions: this.$bddDefinition.languageOptions,
      coinOptions: this.$bddDefinition.coinOptions,
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
          name: this.$t(`${lang}.loginOut`),
          action: this.logout
        }
      ],
      activeNavMenu: '',
      navList: [
        {
          key: 'engagement-ring',
          name: this.$t(`${lang}.engagementRing`),
          to: {
            path: '/engagement-rings'
          }
        },
        {
          key: 'wedding-ring',
          name: this.$t(`${lang}.weddingRing`),
          to: {
            path: '/wedding-rings'
          }
        },
        {
          key: 'diamond',
          name: this.$t(`${lang}.diamond`),
          to: {
            path: '/diamonds'
          }
        },
        {
          key: 'jewellery-accessories',
          name: this.$t(`${lang}.jewelleryAccessories`),
          to: {
            path: '/jewellery/all'
          }
        }
      ],
      otherNavList: [
        {
          key: 'education',
          name: this.$t(`${lang}.education`),
          to: {
            path: '/education/diamonds/carat'
          }
        }
      ],
      menus: {
        'engagement-ring': {
          image: 'https://bdd-cdn.leyouwangluo.com/adt/image1564544333790.png',
          groups: [
            [
              {
                groupName: this.$t(
                  `${lang}.engagementRingMenu.designYourEngagementRing`
                ),
                data: [
                  {
                    name: this.$t(
                      `${lang}.engagementRingMenu.startFromSetting`
                    ),
                    icon: 'iconstar-jt',
                    to: {
                      path: this.$startDj(2)
                    }
                  },
                  {
                    name: this.$t(
                      `${lang}.engagementRingMenu.startFromDiamond`
                    ),
                    icon: 'iconstar-zs',
                    to: {
                      path: this.$startDj(1)
                    }
                  }
                ]
              },
              {
                groupName: this.$t(
                  `${lang}.engagementRingMenu.inspiredByCustomerRings`
                ),
                data: [
                  {
                    name: this.$t(
                      `${lang}.engagementRingMenu.matchWithRoundDiamonds`
                    ),
                    icon: ''
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.engagementRingMenu.style`),
                data: [
                  {
                    name: this.$t(`${lang}.engagementRingMenu.solitaire`),
                    icon: 'iconring-jy ring-icon',
                    to: {
                      path: '/engagement-rings/solitaire'
                    }
                  },
                  {
                    name: this.$t(`${lang}.engagementRingMenu.jump`),
                    icon: 'iconring-sh ring-icon',
                    to: {
                      path: '/engagement-rings/jump'
                    }
                  },
                  {
                    name: this.$t(`${lang}.engagementRingMenu.paveSet`),
                    icon: 'iconring-gdx ring-icon',
                    to: {
                      path: '/engagement-rings/pave-set'
                    }
                  },
                  {
                    name: this.$t(`${lang}.engagementRingMenu.classical`),
                    icon: 'iconring-js ring-icon',
                    to: {
                      path: '/engagement-rings/classical'
                    }
                  },
                  {
                    name: this.$t(`${lang}.engagementRingMenu.channelSet`),
                    icon: 'iconring-bx ring-icon',
                    to: {
                      path: '/engagement-rings/channel-set'
                    }
                  },
                  {
                    name: this.$t(`${lang}.engagementRingMenu.haloSet`),
                    icon: 'iconring-yx ring-icon',
                    to: {
                      path: '/engagement-rings/halo-set'
                    }
                  },
                  {
                    name: this.$t(`${lang}.engagementRingMenu.threeStone`),
                    icon: 'iconring-sz ring-icon',
                    to: {
                      path: '/engagement-rings/three-stone'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.engagementRingMenu.color`),
                data: [
                  {
                    id: 120,
                    name: this.$t(`${lang}.engagementRingMenu.14KWhite`),
                    icon: 'iconmaterial-big-pt color-icon color-14k-white',
                    to: {
                      path: '/engagement-rings/14k-white'
                    }
                  },
                  {
                    id: 121,
                    name: this.$t(`${lang}.engagementRingMenu.18KWhite`),
                    icon: 'iconmaterial-big-pt color-icon color-18k-white',
                    to: {
                      path: '/engagement-rings/18k-white'
                    }
                  },
                  {
                    id: 122,
                    name: this.$t(`${lang}.engagementRingMenu.14KYellow`),
                    icon: 'iconmaterial-big-pt color-icon color-14k-yellow',
                    to: {
                      path: '/engagement-rings/14k-yellow'
                    }
                  },
                  {
                    id: 123,
                    name: this.$t(`${lang}.engagementRingMenu.18KYellow`),
                    icon: 'iconmaterial-big-pt color-icon color-18k-yellow',
                    to: {
                      path: '/engagement-rings/18k-yellow'
                    }
                  },
                  {
                    id: 124,
                    name: this.$t(`${lang}.engagementRingMenu.platinum`),
                    icon: 'iconmaterial-big-pt color-icon color-platinum',
                    to: {
                      path: '/engagement-rings/platinum'
                    }
                  },
                  {
                    id: 125,
                    name: this.$t(`${lang}.engagementRingMenu.18KRoseGold`),
                    icon: 'iconmaterial-big-pt color-icon color-18k-rose-gold',
                    to: {
                      path: '/engagement-rings/18k-rose-gold'
                    }
                  }
                  // {
                  //   name: this.$t(`${lang}.engagementRingMenu.14KRoseGold`),
                  //   icon: 'iconmaterial-big-pt color-icon',
                  //   href: '/engagement-rings/14k-rose-gold'
                  // },
                  // {
                  //   name: this.$t(`${lang}.engagementRingMenu.fineSilver`),
                  //   icon: 'iconmaterial-big-pt color-icon',
                  //   href: '/engagement-rings/fine-silver'
                  // }
                ]
              }
            ]
          ]
        },
        'wedding-ring': {
          image: 'https://bdd-cdn.leyouwangluo.com/adt/image1564544333790.png',
          groups: [
            [
              {
                groupName: this.$t(`${lang}.weddingRingMenu.coupleRings`),
                data: [
                  {
                    name: this.$t(`${lang}.weddingRingMenu.classicSeries`),
                    icon: 'iconmarry-jd ring-icon',
                    to: {
                      path: '/wedding-rings/classic-series'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.channelSetSeries`),
                    icon: 'iconmarry-pz ring-icon',
                    to: {
                      path: '/wedding-rings/channel-set-series'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.weddingRingMenu.women`),
                data: [
                  {
                    name: this.$t(`${lang}.weddingRingMenu.classic`),
                    icon: 'iconmarry--woman-jingdian ring-icon',
                    to: {
                      path: '/wedding-rings/womens-classic'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.eternity`),
                    icon: 'iconmarry--woman-yongheng ring-icon',
                    to: {
                      path: '/wedding-rings/womens-eternity'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.anniversary`),
                    icon: 'iconmarry--woman-zhounian ring-icon',
                    to: {
                      path: '/wedding-rings/womens-anniversary'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.diamond`),
                    icon: 'iconmarry--woman-zuans ring-icon',
                    to: {
                      path: '/wedding-rings/womens-diamond'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.stackable`),
                    icon: 'iconmarry--woman-duidie ring-icon',
                    to: {
                      path: '/wedding-rings/womens-stackable'
                    }
                  }
                ]
              },
              {
                groupName: this.$t(`${lang}.weddingRingMenu.men`),
                data: [
                  {
                    name: this.$t(`${lang}.weddingRingMenu.classic`),
                    icon: 'iconmarry--woman-jingdian ring-icon',
                    to: {
                      path: '/wedding-rings/mens-classic'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.engravable`),
                    icon: 'iconmarry--man-diaoke ring-icon',
                    to: {
                      path: '/wedding-rings/mens-carved'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.diamond`),
                    icon: 'iconmarry--woman-zuans ring-icon',
                    to: {
                      path: '/wedding-rings/mens-diamond'
                    }
                  },
                  {
                    name: this.$t(`${lang}.weddingRingMenu.stackable`),
                    icon: 'iconmarry--man-jinshu ring-icon',
                    to: {
                      path: '/wedding-rings/mens-alternative-metals'
                    }
                  }
                ]
              }
            ],
            [
              {
                key: 'material',
                groupName: this.$t(`${lang}.weddingRingMenu.color`),
                data: [
                  {
                    id: 120,
                    name: this.$t(`${lang}.weddingRingMenu.14KWhite`),
                    icon: 'iconmaterial-big-pt color-icon color-14k-white',
                    to: {
                      path: '/wedding-rings/14k-white'
                    }
                  },
                  {
                    id: 121,
                    name: this.$t(`${lang}.weddingRingMenu.18KWhite`),
                    icon: 'iconmaterial-big-pt color-icon color-18k-white',
                    to: {
                      path: '/wedding-rings/18k-white'
                    }
                  },
                  {
                    id: 122,
                    name: this.$t(`${lang}.weddingRingMenu.14KYellow`),
                    icon: 'iconmaterial-big-pt color-icon color-14k-yellow',
                    to: {
                      path: '/wedding-rings/14k-yellow'
                    }
                  },
                  {
                    id: 123,
                    name: this.$t(`${lang}.weddingRingMenu.18KYellow`),
                    icon: 'iconmaterial-big-pt color-icon color-18k-yellow',
                    to: {
                      path: '/wedding-rings/18k-yellow'
                    }
                  },
                  {
                    id: 124,
                    name: this.$t(`${lang}.weddingRingMenu.platinum`),
                    icon: 'iconmaterial-big-pt color-icon color-platinum',
                    to: {
                      path: '/wedding-rings/platinum'
                    }
                  },
                  {
                    id: 125,
                    name: this.$t(`${lang}.weddingRingMenu.18KRoseGold`),
                    icon: 'iconmaterial-big-pt color-icon color-18k-rose-gold',
                    to: {
                      path: '/wedding-rings/18k-rose-gold'
                    }
                  }
                  // {
                  //   name: this.$t(`${lang}.weddingRingMenu.14KRoseGold`),
                  //   icon: 'iconstar-zs',
                  //   href: '/wedding-rings/14k-rose-gold'
                  // },
                  // {
                  //   name: this.$t(`${lang}.weddingRingMenu.fineSilver`),
                  //   icon: 'iconstar-zs',
                  //   href: '/wedding-rings/fine-silver'
                  // }
                ]
              }
            ]
          ]
        },
        diamond: {
          image: 'https://bdd-cdn.leyouwangluo.com/adt/image1564544333790.png',
          groups: [
            [
              {
                groupName: this.$t(
                  `${lang}.diamondMenu.designYourEngagementRing`
                ),
                data: [
                  {
                    name: this.$t(`${lang}.diamondMenu.startFromSetting`),
                    icon: 'iconstar-jt',
                    to: {
                      path: this.$startDj(2)
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.startFromDiamond`),
                    icon: 'iconstar-zs',
                    to: {
                      path: this.$startDj(1)
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.diamondMenu.looseDiamond`),
                data: [
                  {
                    name: this.$t(`${lang}.diamondMenu.round`),
                    icon: 'iconyuanxin shape-icon',
                    to: {
                      path: '/diamonds/round-cut'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.oval`),
                    icon: 'icontuoyuan shape-icon',
                    to: {
                      path: '/diamonds/oval-cut'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.princess`),
                    icon: 'iconfangxing shape-icon',
                    to: {
                      path: '/diamonds/princess-cut'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.emerald`),
                    icon: 'iconfushe shape-icon',
                    to: {
                      path: '/diamonds/emerald-cut'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.heart`),
                    icon: 'iconaixin shape-icon',
                    to: {
                      path: '/diamonds/heart-shaped'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.marquise`),
                    icon: 'iconhoujue shape-icon',
                    to: {
                      path: '/diamonds/marquise-cut'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.cushion`),
                    icon: 'icondianzi shape-icon',
                    to: {
                      path: '/diamonds/cushion-cut'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.pearShape`),
                    icon: 'iconli shape-icon',
                    to: {
                      path: '/diamonds/pear-shaped'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.asscher`),
                    icon: 'iconaqies shape-icon',
                    to: {
                      path: '/diamonds/asscher-cut'
                    }
                  },
                  {
                    name: this.$t(`${lang}.diamondMenu.radiant`),
                    icon: 'iconcui shape-icon',
                    to: {
                      path: '/diamonds/radiant-cut'
                    }
                  }
                ]
              }
            ],
            [
              {
                groupName: this.$t(`${lang}.diamondMenu.designYourOwnJewelry`),
                data: [
                  {
                    name: this.$t(`${lang}.diamondMenu.customRing`),
                    icon: 'iconJewelry-made-ring',
                    to: {
                      path: this.$startDj(2)
                    }
                  }
                  // {
                  //   name: this.$t(`${lang}.diamondMenu.customBracelet`),
                  //   icon: 'iconJewelry-bracelet',
                  //   href: '/'
                  // },
                  // {
                  //   name: this.$t(`${lang}.diamondMenu.customNecklace`),
                  //   icon: 'iconJewelry-made-Bracelet',
                  //   href: '/'
                  // }
                ]
              }
            ]
          ]
        },
        'jewellery-accessories': {
          image: 'https://bdd-cdn.leyouwangluo.com/adt/image1564544333790.png',
          groups: [
            [
              {
                groupName: this.$t(`${lang}.jewelleryAccessoriesMenu.jewelry`),
                data: [
                  {
                    name: this.$t(`${lang}.jewelleryAccessoriesMenu.necklaces`),
                    icon: 'iconJewelry-necklace',
                    to: {
                      path: '/jewellery/necklaces'
                    }
                  },
                  {
                    name: this.$t(`${lang}.jewelleryAccessoriesMenu.pendants`),
                    icon: 'icondiamond-pendant',
                    to: {
                      path: '/jewellery/pendants'
                    }
                  },
                  {
                    name: this.$t(`${lang}.jewelleryAccessoriesMenu.earStud`),
                    icon: 'icondiamond-earring',
                    to: {
                      path: '/jewellery/ear-stud'
                    }
                  },
                  {
                    name: this.$t(`${lang}.jewelleryAccessoriesMenu.earrings`),
                    icon: 'iconJewelry-earring',
                    to: {
                      path: '/jewellery/earrings'
                    }
                  },
                  {
                    name: this.$t(`${lang}.jewelleryAccessoriesMenu.bracelets`),
                    icon: 'iconJewelry-bracelet',
                    to: {
                      path: '/jewellery/bracelets'
                    }
                  },
                  {
                    name: this.$t(`${lang}.jewelleryAccessoriesMenu.bangles`),
                    icon: 'iconshouhuan',
                    to: {
                      path: '/jewellery/bangles'
                    }
                  }
                ]
              }
            ],
            // [
            //   {
            //     groupName: this.$t(
            //       `${lang}.jewelleryAccessoriesMenu.customAccessories`
            //     ),
            //     data: [
            //       // {
            //       //   name: this.$t(
            //       //     `${lang}.jewelleryAccessoriesMenu.customNecklace`
            //       //   ),
            //       //   icon: 'iconJewelry-made-Bracelet',
            //       //   to: {
            //       //     path: '/'
            //       //   }
            //       // },
            //       // {
            //       //   name: this.$t(
            //       //     `${lang}.jewelleryAccessoriesMenu.customBracelet`
            //       //   ),
            //       //   icon: 'iconJewelry-bracelet',
            //       //   to: {
            //       //     path: '/'
            //       //   }
            //       // },
            //       {
            //         name: this.$t(
            //           `${lang}.jewelleryAccessoriesMenu.customRing`
            //         ),
            //         icon: 'iconJewelry-made-ring',
            //         to: {
            //           path: '/'
            //         }
            //       }
            //     ]
            //   }
            // ],
            [
              {
                groupName: this.$t(
                  `${lang}.jewelleryAccessoriesMenu.specialGift`
                ),
                data: [
                  {
                    name: this.$t(
                      `${lang}.jewelleryAccessoriesMenu.giftsUnderHKD1000`
                    ),
                    icon: 'iconJewelry-gift-d',
                    to: {
                      path: '/'
                    }
                  },
                  {
                    name: this.$t(
                      `${lang}.jewelleryAccessoriesMenu.designYourOwnJewelryAccessories`
                    ),
                    icon: 'iconJewelry-gift-design',
                    to: {
                      path: '/'
                    }
                  },
                  {
                    name: this.$t(
                      `${lang}.jewelleryAccessoriesMenu.giftForLadies`
                    ),
                    icon: 'iconJewelry-gift-woman',
                    to: {
                      path: '/'
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
    languageInfo() {
      let result = ''
      const language = this.$store.state.language
      const languageOptions = this.$bddDefinition.languageOptions
      for (let n = 0, length = languageOptions.length; n < length; n++) {
        if (languageOptions[n].code === language) {
          result = languageOptions[n]
          break
        }
      }
      return result
    },
    coinInfo() {
      let result = ''
      const coin = this.$store.state.coin
      const coinOptions = this.$bddDefinition.coinOptions
      for (let n = 0, length = coinOptions.length; n < length; n++) {
        if (coinOptions[n].code === coin) {
          result = coinOptions[n]
          break
        }
      }
      return result
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    ...mapMutations(['setCoin', 'setLanguage']),
    fixed(status) {
      this.fixedStatus = !!status
    },
    changeActiveNavMenu(nav) {
      this.activeNavMenu = nav
    },
    setCoin(coin) {
      this.$store.commit('setCoin', coin)
      window.location.reload()
    },
    setLanguage(lang) {
      this.$store.commit('setLanguage', lang)
      window.location.reload()
    },
    logout() {
      this.$store.dispatch('logout', lang)
      window.location.reload()
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
.top-bar {
  height: 150px;
  transition: all 0.3s linear;

  .header {
    position: absolute;
    width: 100%;
    min-width: 1360px;
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
      .shortcut-content {
        /*max-width: 1360px;*/
        /*margin: auto;*/
        height: 43px;
        max-height: 45px;
        overflow: hidden;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        transition: max-height 0.3s linear;

        .left-item {
          flex-grow: 0;
          flex-shrink: 0;

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
            margin-left: 11px;
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
        .right-item {
          flex-grow: 1;
          flex-shrink: 1;

          .item {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;

            .el-dropdown-link {
              font-size: 12px;
            }
            .iconfont {
              margin-right: 9px;
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
            margin-right: 35px;

            .icongerenzhongxin {
              font-size: 22px;
              color: #666666;
            }
            .iconkuozhan {
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
            margin-right: 30px;

            .icongouwuche {
              font-size: 22px;
              color: #636363;
            }
          }
          .language {
            margin-right: 30px;

            .iconkuozhan {
              font-size: 6px;
              color: #636363;
              display: inline-block;
              transform: rotateZ(90deg);
            }
          }
          .coin {
            margin-right: 14px;

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

          .left-item {
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
            flex-grow: 1;
            flex-shrink: 1;

            .nav-list {
              width: 560px;
              height: 100%;
              list-style: none;
              display: flex;
              align-items: stretch;
              justify-content: space-between;

              .nav-item {
                flex-grow: 1;
                flex-shrink: 1;
                text-align: center;
                cursor: pointer;
                /*margin-right: 90px;*/

                &:nth-last-of-type(1) {
                  margin-right: 0;
                }

                .nav-item-name {
                  display: inline-block;
                  position: relative;
                  height: 100%;
                  line-height: 75px;
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(99, 99, 99, 1);

                  &.active {
                    color: #9b745c;

                    &:after {
                      content: '';
                      position: absolute;
                      width: 100%;
                      height: 1px;
                      left: 0;
                      top: 100%;
                      background-color: #9b745c;
                    }
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
              input {
                width: 135px;
                padding: 3px 6px;
                border-bottom: 1px solid #adadad;
                font-size: 14px;
                font-weight: 400;
                color: #636363;
              }
              input::-webkit-input-placeholder {
                color: #636363;
              }
              .iconfont {
                color: #666666;
                font-size: 23px;
                cursor: pointer;
              }
            }

            .icon-group {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
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
            max-width: 1366px;
            margin: auto;
            display: flex;
            flex-direction: row;
            align-items: stretch;
            overflow: hidden;
            border-bottom: 0;
            box-sizing: border-box;

            .platoon-item {
              flex-grow: 1;
              flex-shrink: 1;
              position: relative;

              .group {
                margin-bottom: 59px;

                &:nth-last-of-type(1) {
                  margin-bottom: 0;
                }

                .group-name {
                  height: 19px;
                  margin-bottom: 29px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #333333;
                }
                .group-item {
                  height: 19px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-bottom: 24px;
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
                  }
                }
              }
            }

            .dotted-right-line {
              margin-right: 58px;
              border-right: 1px dotted #bbbbbd;

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
</style>
