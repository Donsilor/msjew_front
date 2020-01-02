export default language => {
  const lang = require('@/assets/i18n/index.js').getLang(language).definition

  return {
    shape: [
      {
        id: 16,
        name: lang.shape.round,
        icon: '/diamonds/shape-icon/1.png',
        image: '/diamonds/shape/round.png',
        desc: lang.shape.roundDesc
      },
      {
        id: 17,
        name: lang.shape.Princess,
        icon: '/diamonds/shape-icon/2.png',
        image: '/diamonds/shape/pincess.png',
        desc: lang.shape.PrincessDesc
      },
      {
        id: 54,
        name: lang.shape.Emerald,
        icon: '/diamonds/shape-icon/10.png',
        image: '/diamonds/shape/emerald.png',
        desc: lang.shape.EmeraldDesc
      },
      {
        id: 55,
        name: lang.shape.Asscher,
        icon: '/diamonds/shape-icon/8.png',
        image: '/diamonds/shape/asscher.png',
        desc: lang.shape.AsscherDesc
      },
      {
        id: 56,
        name: lang.shape.Cushion,
        icon: '/diamonds/shape-icon/4.png',
        image: '/diamonds/shape/cushion.png',
        desc: lang.shape.CushionDesc
      },
      {
        id: 57,
        name: lang.shape.Marquise,
        icon: '/diamonds/shape-icon/6.png',
        image: '/diamonds/shape/marquise.png',
        desc: lang.shape.MarquiseDesc
      },
      {
        id: 58,
        name: lang.shape.Radiant,
        icon: '/diamonds/shape-icon/3.png',
        image: '/diamonds/shape/radiant.png',
        desc: lang.shape.RadiantDesc
      },
      {
        id: 59,
        name: lang.shape.Oval,
        icon: '/diamonds/shape-icon/5.png',
        image: '/diamonds/shape/oval.png',
        desc: lang.shape.OvalDesc
      },
      {
        id: 60,
        name: lang.shape.PearShape,
        icon: '/diamonds/shape-icon/9.png',
        image: '/diamonds/shape/pear.png',
        desc: lang.shape.PearShapeDesc
      },
      {
        id: 61,
        name: lang.shape.Heart,
        icon: '/diamonds/shape-icon/7.png',
        image: '/diamonds/shape/heart.png',
        desc: lang.shape.HeartDesc
      }
    ],

    color: [
      {
        id: 53,
        url: `/diamonds/color/J.png`,
        name: `J`,
        desc: lang.color.j
      },
      {
        id: 52,
        url: `/diamonds/color/I.png`,
        name: `I`,
        desc: lang.color.i
      },
      {
        id: 51,
        url: `/diamonds/color/H.png`,
        name: `H`,
        desc: lang.color.h
      },
      {
        id: 50,
        url: `/diamonds/color/G.png`,
        name: `G`,
        desc: lang.color.g
      },
      {
        id: 22,
        url: `/diamonds/color/F.png`,
        name: `F`,
        desc: lang.color.f
      },
      {
        id: 19,
        url: `/diamonds/color/E.png`,
        name: `E`,
        desc: lang.color.e
      },
      {
        id: 18,
        url: `/diamonds/color/D.png`,
        name: `D`,
        desc: lang.color.d
      }
    ],

    clarity: [
      {
        id: 66,
        url: `/diamonds/clarity/SI2.png`,
        name: `SI2`,
        desc: lang.clarity.si2
      },
      {
        id: 65,
        url: `/diamonds/clarity/SI1.png`,
        name: `SI1`,
        desc: lang.clarity.si1
      },
      {
        id: 64,
        url: `/diamonds/clarity/VS2.png`,
        name: `VS2`,
        desc: lang.clarity.vs2
      },
      {
        id: 63,
        url: `/diamonds/clarity/VS1.png`,
        name: `VS1`,
        desc: lang.clarity.vs1
      },
      {
        id: 62,
        url: `/diamonds/clarity/VVS2.png`,
        name: `VVS2`,
        desc: lang.clarity.vvs2
      },
      {
        id: 8,
        url: `/diamonds/clarity/VVS1.png`,
        name: `VVS1`,
        desc: lang.clarity.vvs1
      },
      {
        id: 7,
        url: `/diamonds/clarity/IF.png`,
        name: `IF`,
        desc: lang.clarity.if
      },
      {
        id: 6,
        url: `/diamonds/clarity/FL.png`,
        name: `FL`,
        desc: lang.clarity.fl
      }
    ],

    cut: [
      {
        name: lang.cut.gd,
        sortCut: lang.cut.scgd,
        id: 15,
        url: `/diamonds/cut/GD.png`,
        desc: lang.cut.gdDesc
      },
      {
        name: lang.cut.vg,
        sortCut: lang.cut.scvg,
        id: 14,
        url: `/diamonds/cut/vg.png`,
        desc: lang.cut.vgDesc
      },
      {
        name: lang.cut.ideal,
        sortCut: lang.cut.scideal,
        id: 13,
        url: `/diamonds/cut/id.png`,
        desc: lang.cut.idealDesc
      }
    ],

    luster: [
      {
        name: 'Ex',
        shortCut: `Ex`,
        id: 67
      },
      {
        name: 'VG',
        shortCut: `VG`,
        id: 68
      },
      {
        name: 'GD',
        shortCut: `GD`,
        id: 69
      }
    ],

    symmetry: [
      {
        name: 'Ex',
        shortCut: `Ex`,
        id: 70
      },
      {
        name: 'VG',
        shortCut: `VG`,
        id: 71
      },
      {
        name: 'GD',
        shortCut: `GD`,
        id: 72
      }
    ],

    carat: [
      {
        url: `/diamonds/carat/14.png`,
        name: `1/4`
      },
      {
        url: `/diamonds/carat/13.png`,
        name: `1/3`
      },
      {
        url: `/diamonds/carat/12.png`,
        name: `1/2`
      },
      {
        url: `/diamonds/carat/34.png`,
        name: `3/4`
      },
      {
        url: `/diamonds/carat/1.png`,
        name: `1`
      },
      {
        url: `/diamonds/carat/15.png`,
        name: `1.5`
      },
      {
        url: `/diamonds/carat/2.png`,
        name: `2`
      },
      {
        url: `/diamonds/carat/3.png`,
        name: `3`
      }
    ],

    style: {
      rings: [
        {
          id: 109,
          name: lang.style.SolitaireRing,
          image: '/engagement-rings/ring-style/1.png',
          desc: lang.style.SolitaireRingDesc
        },
        {
          id: 110,
          name: lang.style.JumpRing,
          image: '/engagement-rings/ring-style/4.png',
          desc: lang.style.JumpRingDesc
        },
        {
          id: 111,
          name: lang.style.PaveSetRing,
          image: '/engagement-rings/ring-style/5.png',
          desc: lang.style.PaveSetRingDesc
        },
        {
          id: 112,
          name: lang.style.ClassicalRing,
          image: '/engagement-rings/ring-style/7.png',
          desc: lang.style.ClassicalRingDesc
        },
        {
          id: 113,
          name: lang.style.ChannelSetRing,
          image: '/engagement-rings/ring-style/6.png',
          desc: lang.style.ChannelSetRingDesc
        },
        {
          id: 114,
          name: lang.style.HaloSetRing,
          image: '/engagement-rings/ring-style/2.png',
          desc: lang.style.HaloSetRingDesc
        },
        {
          id: 115,
          name: lang.style.ThreeStoneRing,
          image: '/engagement-rings/ring-style/3.png',
          desc: lang.style.ThreeStoneRingDesc
        }
      ],
      coupleRings: [
        {
          id: 1,
          image: `/ring-style/pair-ring/classic.png`,
          name: lang.style.ClassicSeries
        },
        {
          id: 2,
          image: `/ring-style/pair-ring/Row.png`,
          name: lang.style.ChannelSetSeries
        }
      ],
      manRings: [
        {
          id: 165,
          image: `/ring-style/man/1.png`,
          name: lang.style.WeddingRing,
          desc: lang.style.ManWeddingRingDesc
        },
        {
          id: 166,
          image: `/ring-style/man/2.png`,
          name: lang.style.ThreeDReliefRing,
          desc: lang.style.ThreeDReliefRingDesc
        },
        {
          id: 167,
          image: `/ring-style/man/3.png`,
          name: lang.style.DiamondRing,
          desc: lang.style.ManDiamondRingDesc
        },
        {
          id: 168,
          image: `/ring-style/man/4.png`,
          name: lang.style.SpecialRing,
          desc: lang.style.SpecialRingDesc
        }
      ],
      womanRings: [
        {
          id: 160,
          image: `/ring-style/woman/1.png`,
          name: lang.style.WeddingRing,
          desc: lang.style.WeddingRingDesc
        },
        {
          id: 161,
          image: `/ring-style/woman/2.png`,
          name: lang.style.FullyDiamondInlaidRing,
          desc: lang.style.FullyDiamondInlaidRingDesc
        },
        {
          id: 162,
          image: `/ring-style/woman/3.png`,
          name: lang.style.WeddingAnniversaryRing,
          desc: lang.style.WeddingAnniversaryRingDesc
        },
        {
          id: 163,
          image: `/ring-style/woman/4.png`,
          name: lang.style.DiamondRing,
          desc: lang.style.DiamondRingDesc
        },
        {
          id: 164,
          image: `/ring-style/woman/5.png`,
          name: lang.style.CasualRing,
          desc: lang.style.CasualRingDesc
        }
      ]
    },

    quality: {
      rings: [
        {
          id: 31,
          name: lang.quality.platinum14K,
          image: '/ring-material/1.png'
        },
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        {
          id: 32,
          name: lang.quality.gold14K,
          image: '/ring-material/3.png'
        },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        }
      ],
      necklace: [
        {
          id: 31,
          name: lang.quality.platinum14K,
          image: '/ring-material/1.png'
        },
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        {
          id: 32,
          name: lang.quality.gold14K,
          image: '/ring-material/3.png'
        },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        }
      ],
      pendant: [
        {
          id: 31,
          name: lang.quality.platinum14K,
          image: '/ring-material/1.png'
        },
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        {
          id: 32,
          name: lang.quality.gold14K,
          image: '/ring-material/3.png'
        },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        }
      ],
      studEarring: [
        {
          id: 31,
          name: lang.quality.platinum14K,
          image: '/ring-material/1.png'
        },
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        {
          id: 32,
          name: lang.quality.gold14K,
          image: '/ring-material/3.png'
        },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        }
      ],
      earring: [
        {
          id: 31,
          name: lang.quality.platinum14K,
          image: '/ring-material/1.png'
        },
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        {
          id: 32,
          name: lang.quality.gold14K,
          image: '/ring-material/3.png'
        },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        }
      ],
      braceletLine: [
        {
          id: 31,
          name: lang.quality.platinum14K,
          image: '/ring-material/1.png'
        },
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        {
          id: 32,
          name: lang.quality.gold14K,
          image: '/ring-material/3.png'
        },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        }
      ],
      bracelet: [
        {
          id: 31,
          name: lang.quality.platinum14K,
          image: '/ring-material/1.png'
        },
        {
          id: 38,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        {
          id: 32,
          name: lang.quality.gold14K,
          image: '/ring-material/3.png'
        },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        }
      ]
    },

    jewellery: [
      {
        id: 206,
        type_id: 4,
        name: lang.jewellery.necklaces,
        iconfont: 'iconJewelry-necklace',
        qualityName: 'necklace'
      },
      {
        id: 207,
        type_id: 5,
        name: lang.jewellery.pendants,
        iconfont: 'icondiamond-pendant',
        qualityName: 'pendant'
      },
      {
        id: 208,
        type_id: 6,
        name: lang.jewellery.earStud,
        iconfont: 'icondiamond-earring',
        qualityName: 'studEarring'
      },
      {
        id: 209,
        type_id: 7,
        name: lang.jewellery.earrings,
        iconfont: 'iconsp-dz1',
        qualityName: 'earring'
      },
      {
        id: 210,
        type_id: 8,
        name: lang.jewellery.bracelets,
        iconfont: 'iconJewelry-bracelet',
        qualityName: 'braceletLine'
      },
      {
        id: 211,
        type_id: 9,
        name: lang.jewellery.bangles,
        iconfont: 'iconshouhuan',
        qualityName: 'bracelet'
      }
    ],

    diamond: {
      polish: [
        {
          id: 46,
          name: lang.polish['46']
        },
        {
          id: 47,
          name: lang.polish['47']
        },
        {
          id: 48,
          name: lang.polish['48']
        }
      ],
      symmetry: [
        {
          id: 49,
          name: lang.symmetry['49']
        },
        {
          id: 50,
          name: lang.symmetry['50']
        },
        {
          id: 51,
          name: lang.symmetry['51']
        }
      ],
      card: [
        {
          id: 442,
          name: 'GIA'
        },
        {
          id: 443,
          name: 'AGS'
        },
        {
          id: 444,
          name: 'IGI'
        }
      ],
      fluorescence: [
        {
          id: 52,
          name: lang.fluorescence['52']
        },
        {
          id: 53,
          name: lang.fluorescence['53']
        },
        {
          id: 54,
          name: lang.fluorescence['54']
        },
        {
          id: 55,
          name: lang.fluorescence['55']
        },
        {
          id: 56,
          name: lang.fluorescence['56']
        }
      ]
    },

    sortBy: {
      default: [
        {
          content: lang.sortBy.BestSeller,
          sortType: 2,
          sortBy: `sale_volume`
        },
        {
          content: lang.sortBy['Price-from-low-to-high'],
          sortType: 1,
          sortBy: `sale_price`
        },
        {
          content: lang.sortBy['Price-from-high-to-low'],
          sortType: 2,
          sortBy: `sale_price`
        }
      ],
      search: [
        {
          content: lang.sortBy.BestSeller,
          sortType: 1,
          sortBy: `sale_volume`
        },
        {
          content: lang.sortBy['Price-from-low-to-high'],
          sortType: 2,
          sortBy: `sale_price`
        },
        {
          content: lang.sortBy['Price-from-high-to-low'],
          sortType: 3,
          sortBy: `sale_price`
        }
      ],
      diamond: [
        {
          content: lang.sortBy.BestSeller,
          sortType: 3,
          sortBy: ``
        },
        {
          content: lang.sortBy['Price-from-low-to-high'],
          sortType: 1,
          sortBy: `sale_price`
        },
        {
          content: lang.sortBy['Price-from-high-to-low'],
          sortType: 2,
          sortBy: `sale_price`
        },
        {
          content: lang.sortBy['carat-from-low-to-high'],
          sortType: 1,
          sortBy: `carat`
        },
        {
          content: lang.sortBy['carat-from-high-to-low'],
          sortType: 2,
          sortBy: `carat`
        },
        {
          content: lang.sortBy['color-from-low-to-high'],
          sortType: 1,
          sortBy: `color`
        },
        {
          content: lang.sortBy['color-from-high-to-low'],
          sortType: 2,
          sortBy: `color`
        },
        {
          content: lang.sortBy['cut-from-low-to-high'],
          sortType: 1,
          sortBy: `cut`
        },
        {
          content: lang.sortBy['cut-from-high-to-low'],
          sortType: 2,
          sortBy: `cut`
        },
        {
          content: lang.sortBy['clarity-from-low-to-high'],
          sortType: 1,
          sortBy: `clarity`
        },
        {
          content: lang.sortBy['clarity-from-high-to-low'],
          sortType: 2,
          sortBy: `clarity`
        }
      ]
    },

    languageOptions: [
      {
        code: 'zh_TW',
        content: '繁體中文',
        shortCut: '繁'
      },
      {
        code: 'en_US',
        content: 'English',
        shortCut: 'En'
      },
      {
        code: 'zh_CN',
        content: '简体中文',
        shortCut: '简'
      }
    ],

    coinOptions: [
      {
        code: 'HKD',
        content: 'HKD'
      },
      {
        code: 'CNY',
        content: 'CNY'
      },
      {
        code: 'USD',
        content: 'USD'
      }
    ]
  }
}
