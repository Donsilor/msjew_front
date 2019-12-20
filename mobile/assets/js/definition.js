export default language => {
  const lang = require('@/assets/lang/index.js').getLang(language).definition

  return {
    shape: [
      {
        id: 18,
        name: lang.shape.round,
        image: '/diamond/shape/1.png',
        desc: lang.shape.roundDesc
      },
      {
        id: 19,
        name: lang.shape.Princess,
        image: '/diamond/shape/2.png',
        desc: lang.shape.PrincessDesc
      },
      {
        id: 20,
        name: lang.shape.Emerald,
        image: '/diamond/shape/3.png',
        desc: lang.shape.EmeraldDesc
      },
      {
        id: 21,
        name: lang.shape.Asscher,
        image: '/diamond/shape/8.png',
        desc: lang.shape.AsscherDesc
      },
      {
        id: 22,
        name: lang.shape.Cushion,
        image: '/diamond/shape/4.png',
        desc: lang.shape.CushionDesc
      },
      {
        id: 23,
        name: lang.shape.Marquise,
        image: '/diamond/shape/6.png',
        desc: lang.shape.MarquiseDesc
      },
      {
        id: 24,
        name: lang.shape.Radiant,
        image: '/diamond/shape/10.png',
        desc: lang.shape.RadiantDesc
      },
      {
        id: 25,
        name: lang.shape.Oval,
        image: '/diamond/shape/5.png',
        desc: lang.shape.OvalDesc
      },
      {
        id: 26,
        name: lang.shape.PearShape,
        image: '/diamond/shape/9.png',
        desc: lang.shape.PearShapeDesc
      },
      {
        id: 27,
        name: lang.shape.Heart,
        image: '/diamond/shape/7.png',
        desc: lang.shape.HeartDesc
      }
    ],

    color: [
      {
        id: 37,
        url: `/diamond/color/J.png`,
        name: `J`,
        desc: lang.color.j
      },
      {
        id: 36,
        url: `/diamond/color/I.png`,
        name: `I`,
        desc: lang.color.i
      },
      {
        id: 35,
        url: `/diamond/color/H.png`,
        name: `H`,
        desc: lang.color.h
      },
      {
        id: 34,
        url: `/diamond/color/G.png`,
        name: `G`,
        desc: lang.color.g
      },
      {
        id: 33,
        url: `/diamond/color/F.png`,
        name: `F`,
        desc: lang.color.f
      },
      {
        id: 32,
        url: `/diamond/color/E.png`,
        name: `E`,
        desc: lang.color.e
      },
      {
        id: 31,
        url: `/diamond/color/D.png`,
        name: `D`,
        desc: lang.color.d
      }
    ],

    clarity: [
      {
        id: 38,
        url: `/diamond/clarity/SI2.png`,
        name: `SI2`,
        desc: lang.clarity.si2
      },
      {
        id: 39,
        url: `/diamond/clarity/SI1.png`,
        name: `SI1`,
        desc: lang.clarity.si1
      },
      {
        id: 40,
        url: `/diamond/clarity/VS2.png`,
        name: `VS2`,
        desc: lang.clarity.vs2
      },
      {
        id: 41,
        url: `/diamond/clarity/VS1.png`,
        name: `VS1`,
        desc: lang.clarity.vs1
      },
      {
        id: 42,
        url: `/diamond/clarity/VVS2.png`,
        name: `VVS2`,
        desc: lang.clarity.vvs2
      },
      {
        id: 43,
        url: `/diamond/clarity/VVS1.png`,
        name: `VVS1`,
        desc: lang.clarity.vvs1
      },
      {
        id: 44,
        url: `/diamond/clarity/IF.png`,
        name: `IF`,
        desc: lang.clarity.if
      },
      {
        id: 45,
        url: `/diamond/clarity/FL.png`,
        name: `FL`,
        desc: lang.clarity.fl
      }
    ],

    cut: [
      {
        name: lang.cut.gd,
        sortCut: lang.cut.scgd,
        id: 28,
        url: `/diamond/cut/GD.png`,
        desc: lang.cut.gdDesc
      },
      {
        name: lang.cut.vg,
        sortCut: lang.cut.scvg,
        id: 29,
        url: `/diamond/cut/vg.png`,
        desc: lang.cut.vgDesc
      },
      {
        name: lang.cut.ideal,
        sortCut: lang.cut.scideal,
        id: 30,
        url: `/diamond/cut/id.png`,
        desc: lang.cut.idealDesc
      }
    ],

    luster: [
      {
        name: 'Ex',
        shortCut: `Ex`,
        id: 48
      },
      {
        name: 'VG',
        shortCut: `VG`,
        id: 47
      },
      {
        name: 'GD',
        shortCut: `GD`,
        id: 46
      }
    ],

    symmetry: [
      {
        name: 'Ex',
        shortCut: `Ex`,
        id: 51
      },
      {
        name: 'VG',
        shortCut: `VG`,
        id: 50
      },
      {
        name: 'GD',
        shortCut: `GD`,
        id: 49
      }
    ],

    carat: [
      {
        url: `/diamond/carat/14.png`,
        name: `1/4`
      },
      {
        url: `/diamond/carat/13.png`,
        name: `1/3`
      },
      {
        url: `/diamond/carat/12.png`,
        name: `1/2`
      },
      {
        url: `/diamond/carat/34.png`,
        name: `3/4`
      },
      {
        url: `/diamond/carat/1.png`,
        name: `1`
      },
      {
        url: `/diamond/carat/15.png`,
        name: `1.5`
      },
      {
        url: `/diamond/carat/2.png`,
        name: `2`
      },
      {
        url: `/diamond/carat/3.png`,
        name: `3`
      }
    ],

    style: {
      rings: [
        {
          id: 445,
          name: lang.style.SolitaireRing,
          image: '/ring-type/1.png'
        },
        {
          id: 446,
          name: lang.style.JumpRing,
          image: '/ring-type/4.png'
        },
        {
          id: 447,
          name: lang.style.PaveSetRing,
          image: '/ring-type/5.png'
        },
        {
          id: 448,
          name: lang.style.ClassicalRing,
          image: '/ring-type/7.png'
        },
        {
          id: 449,
          name: lang.style.ChannelSetRing,
          image: '/ring-type/6.png'
        },
        {
          id: 450,
          name: lang.style.HaloSetRing,
          image: '/ring-type/2.png'
        },
        {
          id: 451,
          name: lang.style.ThreeStoneRing,
          image: '/ring-type/3.png'
        }
      ],
      coupleRings: [
        {
          id: 1,
          image: `/ring-type/classic.png`,
          name: lang.style.ClassicSeries
        },
        {
          id: 2,
          image: `/ring-type/Row.png`,
          name: lang.style.ChannelSetSeries
        }
      ],
      manRings: [
        {
          id: 457,
          image: `/ring-type/man/1.png`,
          name: lang.style.WeddingRing
        },
        {
          id: 458,
          image: `/ring-type/man/2.png`,
          name: lang.style.ThreeDReliefRing
        },
        {
          id: 459,
          image: `/ring-type/man/3.png`,
          name: lang.style.DiamondRing
        },
        {
          id: 460,
          image: `/ring-type/man/4.png`,
          name: lang.style.SpecialRing
        }
      ],
      womanRings: [
        {
          id: 452,
          image: `/ring-type/woman/1.png`,
          name: lang.style.WeddingRing
        },
        {
          id: 453,
          image: `/ring-type/woman/2.png`,
          name: lang.style.FullyDiamondInlaidRing
        },
        {
          id: 454,
          image: `/ring-type/woman/3.png`,
          name: lang.style.WeddingAnniversaryRing
        },
        {
          id: 455,
          image: `/ring-type/woman/4.png`,
          name: lang.style.DiamondRing
        },
        {
          id: 456,
          image: `/ring-type/woman/5.png`,
          name: lang.style.CasualRing
        }
      ]
    },

    quality: {
      rings: [
        {
          id: 120,
          name: lang.quality.platinum14K,
          image: '/ring-color/1.png'
        },
        {
          id: 121,
          name: lang.quality.platinum18K,
          image: '/ring-color/2.png'
        },
        {
          id: 122,
          name: lang.quality.gold14K,
          image: '/ring-color/3.png'
        },
        {
          id: 123,
          name: lang.quality.gold18K,
          image: '/ring-color/4.png'
        },
        {
          id: 126,
          name: lang.quality.platinum,
          image: '/ring-color/5.png'
        },
        {
          id: 125,
          name: lang.quality.roseGold18K,
          image: '/ring-color/6.png'
        }
      ],
      necklace: [
        {
          id: 219,
          name: lang.quality.platinum14K,
          image: '/ring-color/1.png'
        },
        {
          id: 222,
          name: lang.quality.platinum18K,
          image: '/ring-color/2.png'
        },
        {
          id: 220,
          name: lang.quality.gold14K,
          image: '/ring-color/3.png'
        },
        {
          id: 223,
          name: lang.quality.gold18K,
          image: '/ring-color/4.png'
        },
        {
          id: 225,
          name: lang.quality.platinum,
          image: '/ring-color/5.png'
        },
        {
          id: 224,
          name: lang.quality.roseGold18K,
          image: '/ring-color/6.png'
        }
      ],
      pendant: [
        {
          id: 227,
          name: lang.quality.platinum14K,
          image: '/ring-color/1.png'
        },
        {
          id: 230,
          name: lang.quality.platinum18K,
          image: '/ring-color/2.png'
        },
        {
          id: 228,
          name: lang.quality.gold14K,
          image: '/ring-color/3.png'
        },
        {
          id: 231,
          name: lang.quality.gold18K,
          image: '/ring-color/4.png'
        },
        {
          id: 233,
          name: lang.quality.platinum,
          image: '/ring-color/5.png'
        },
        {
          id: 232,
          name: lang.quality.roseGold18K,
          image: '/ring-color/6.png'
        }
      ],
      studEarring: [
        {
          id: 235,
          name: lang.quality.platinum14K,
          image: '/ring-color/1.png'
        },
        {
          id: 238,
          name: lang.quality.platinum18K,
          image: '/ring-color/2.png'
        },
        {
          id: 236,
          name: lang.quality.gold14K,
          image: '/ring-color/3.png'
        },
        {
          id: 239,
          name: lang.quality.gold18K,
          image: '/ring-color/4.png'
        },
        {
          id: 241,
          name: lang.quality.platinum,
          image: '/ring-color/5.png'
        },
        {
          id: 240,
          name: lang.quality.roseGold18K,
          image: '/ring-color/6.png'
        }
      ],
      earring: [
        {
          id: 243,
          name: lang.quality.platinum14K,
          image: '/ring-color/1.png'
        },
        {
          id: 246,
          name: lang.quality.platinum18K,
          image: '/ring-color/2.png'
        },
        {
          id: 244,
          name: lang.quality.gold14K,
          image: '/ring-color/3.png'
        },
        {
          id: 247,
          name: lang.quality.gold18K,
          image: '/ring-color/4.png'
        },
        {
          id: 249,
          name: lang.quality.platinum,
          image: '/ring-color/5.png'
        },
        {
          id: 248,
          name: lang.quality.roseGold18K,
          image: '/ring-color/6.png'
        }
      ],
      BraceletLine: [
        {
          id: 251,
          name: lang.quality.platinum14K,
          image: '/ring-color/1.png'
        },
        {
          id: 254,
          name: lang.quality.platinum18K,
          image: '/ring-color/2.png'
        },
        {
          id: 252,
          name: lang.quality.gold14K,
          image: '/ring-color/3.png'
        },
        {
          id: 255,
          name: lang.quality.gold18K,
          image: '/ring-color/4.png'
        },
        {
          id: 257,
          name: lang.quality.platinum,
          image: '/ring-color/5.png'
        },
        {
          id: 256,
          name: lang.quality.roseGold18K,
          image: '/ring-color/6.png'
        }
      ],
      bracelet: [
        {
          id: 259,
          name: lang.quality.platinum14K,
          image: '/ring-color/1.png'
        },
        {
          id: 262,
          name: lang.quality.platinum18K,
          image: '/ring-color/2.png'
        },
        {
          id: 260,
          name: lang.quality.gold14K,
          image: '/ring-color/3.png'
        },
        {
          id: 263,
          name: lang.quality.gold18K,
          image: '/ring-color/4.png'
        },
        {
          id: 265,
          name: lang.quality.platinum,
          image: '/ring-color/5.png'
        },
        {
          id: 264,
          name: lang.quality.roseGold18K,
          image: '/ring-color/6.png'
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
