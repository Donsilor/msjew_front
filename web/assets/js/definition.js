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
        id: 54,
        name: lang.shape.Princess,
        icon: '/diamonds/shape-icon/2.png',
        image: '/diamonds/shape/pincess.png',
        desc: lang.shape.PrincessDesc
      },
      {
        id: 55,
        name: lang.shape.Emerald,
        icon: '/diamonds/shape-icon/10.png',
        image: '/diamonds/shape/emerald.png',
        desc: lang.shape.EmeraldDesc
      },
      {
        id: 60,
        name: lang.shape.Asscher,
        icon: '/diamonds/shape-icon/8.png',
        image: '/diamonds/shape/asscher.png',
        desc: lang.shape.AsscherDesc
      },
      {
        id: 58,
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
        id: 61,
        name: lang.shape.Radiant,
        icon: '/diamonds/shape-icon/3.png',
        image: '/diamonds/shape/radiant.png',
        desc: lang.shape.RadiantDesc
      },
      {
        id: 17,
        name: lang.shape.Oval,
        icon: '/diamonds/shape-icon/5.png',
        image: '/diamonds/shape/oval.png',
        desc: lang.shape.OvalDesc
      },
      {
        id: 59,
        name: lang.shape.PearShape,
        icon: '/diamonds/shape-icon/9.png',
        image: '/diamonds/shape/pear.png',
        desc: lang.shape.PearShapeDesc
      },
      {
        id: 56,
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
          name: lang.style.OpenMouth,
          image: '/engagement-rings/ring-style/4.png',
          desc: lang.style.JumpRingDesc
        },
        {
          id: 111,
          name: lang.style.GroupRing,
          image: '/engagement-rings/ring-style/5.png',
          desc: lang.style.PaveSetRingDesc
        },
        // {
        //   id: 112,
        //   name: lang.style.ClassicalRing,
        //   image: '/engagement-rings/ring-style/7.png',
        //   desc: lang.style.ClassicalRingDesc
        // },
        // {
        //   id: 113,
        //   name: lang.style.ChannelSetRing,
        //   image: '/engagement-rings/ring-style/6.png',
        //   desc: lang.style.ChannelSetRingDesc
        // },
        {
          id: 114,
          name: lang.style.ClawRing,
          image: '/engagement-rings/ring-style/2.png',
          desc: lang.style.HaloSetRingDesc
        },
        {
          id: 115,
          name: lang.style.ThreeMainStoneRings,
          image: '/engagement-rings/ring-style/3.png',
          desc: lang.style.ThreeStoneRingDesc
        }
      ],
      coupleRings: [
        {
          id: 107,
          image: `/ring-style/pair-ring/classic.png`,
          name: lang.style.ClassicSeries
        },
        {
          id: 108,
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
        },
        {
          id: 196,
          image: `/ring-style/woman/5.png`,
          name: lang.style.CasualRing,
          desc: lang.style.CasualRingDesc
        }
      ],
      //款式
      styleRings: [
        {
          id: 160,
          image: `/ring-style/woman/2.png`,
          name: lang.ringsMenu.engagementRing,
          desc: lang.style.FullyDiamondInlaidRingDesc
        },
        {
          id: 161,
          image: `/ring-style/woman/3.png`,
          name: lang.ringsMenu.weddingRing,
          desc: lang.style.WeddingAnniversaryRingDesc
        },
        {
          id: 164,
          image: `/ring-style/woman/4.png`,
          name: lang.ringsMenu.ring,
          desc: lang.style.DiamondRingDesc
        },
        {
          id: 163,
          image: `/ring-style/woman/5.png`,
          name: lang.ringsMenu.fashionRing,
          desc: lang.style.CasualRingDesc
        },
        
      ],
      // 风格
      styleMsRings: [
        {
          id: 277,
          image: `/ring-style/woman/2.png`,
          name: lang.ringsMenu.ModernSimplicity,
          desc: lang.style.FullyDiamondInlaidRingDesc
        },
        {
          id: 278,
          image: `/ring-style/woman/3.png`,
          name: lang.ringsMenu.ClassicRetro,
          desc: lang.style.WeddingAnniversaryRingDesc
        },
        {
          id: 279,
          image: `/ring-style/woman/4.png`,
          name: lang.ringsMenu.PersonalityFun,
          desc: lang.style.DiamondRingDesc
        },
        {
          id: 280,
          image: `/ring-style/woman/5.png`,
          name: lang.ringsMenu.FashionLimit,
          desc: lang.style.CasualRingDesc
        },
        
      ],
      //款式
      forPeople: [
        {
          id: 41,
          image: `/ring-style/man/1.png`,
          name: lang.forPeople.men,
          desc: lang.style.WeddingRingDesc
        },
        {
          id: 42,
          image: `/ring-style/man/2.png`,
          name: lang.forPeople.women,
          desc: lang.style.FullyDiamondInlaidRingDesc
        },
        {
          id: 43,
          image: `/ring-style/man/3.png`,
          name: lang.forPeople.universal,
          desc: lang.style.WeddingAnniversaryRingDesc
        },
      
      ],

      // 送礼对象
      MsForPeople: [
        {
          id: 42,
          image: `/ring-style/man/1.png`,
          name: lang.forPeople.RomanticLady,
          desc: lang.style.WeddingRingDesc
        },
        {
          id: 41,
          image: `/ring-style/man/2.png`,
          name: lang.forPeople.DistinguishedMan,
          desc: lang.style.FullyDiamondInlaidRingDesc
        }
      
      ],

      // 设计师系列
      designer:[
        {
          id: 288,
          image: `/ring-style/man/2.png`,
          name: lang.designer.letterSeries,
          desc: lang.style.FullyDiamondInlaidRingDesc
        }
      ]

    },

    quality: {
      rings: [
        // {
        //   id: 31,
        //   name: lang.quality.platinum14K,
        //   image: '/ring-material/1.png'
        // },
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
        // {
        //   id: 32,
        //   name: lang.quality.gold14K,
        //   image: '/ring-material/3.png'
        // },
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 35,
          name: lang.quality.fineSilver925,
          image: '/ring-material/5.png'
        }
        
      ],
      necklace: [
        {
          id: 28,
          name: lang.quality.platinum18K,
          image: '/ring-material/2.png'
        },
     
        {
          id: 29,
          name: lang.quality.gold18K,
          image: '/ring-material/4.png'
        },
        {
          id: 30,
          name: lang.quality.roseGold18K,
          image: '/ring-material/6.png'
        },
        {
          id: 34,
          name: lang.quality.platinum,
          image: '/ring-material/5.png'
        },
        {
          id: 35,
          name: lang.quality.fineSilver925,
          image: '/ring-material/5.png'
        },
        
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

    // 材质
    material: {
      rings: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ],
      necklace: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ],
      pendant: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ],
      studEarring: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ],
      earring: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ],
      braceletLine: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ],
      bracelet: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ],
      designer: [
        {
          id: [204],
          name: lang.quality.alloy,
          image: '/ring-material/6.png'
        },
        {
          id: [35],
          name: lang.quality.silver925,
          image: '/ring-material/5.png'
        },
        {
          id: [289,290,291],
          name: lang.quality.gold9k,
          image: '/ring-material/5.png'
        },
        {
          id: [31,32,33],
          name: lang.quality.gold14k,
          image: '/ring-material/2.png'
        },
        {
          id: [28,29,30],
          name: lang.quality.gold18k,
          image: '/ring-material/4.png'
        }
      ]
    },

    //石头类型
    stoneType: [
      {
        id: 169,
        name: lang.stoneType.diamond,
        image: '/ring-material/1.png'
      },
      {
        id: 184,
        name: lang.stoneType.jackpot,
        image: '/ring-material/2.png'
      },
      {
        id: 185,
        name: lang.stoneType.pearl,
        image: '/ring-material/3.png'
      },
      {
        id: 186,
        name: lang.stoneType.jade,
        image: '/ring-material/4.png'
      },
      {
        id: 187,
        name: lang.stoneType.other,
        image: '/ring-material/5.png'
      }
      
    ],

    jewellery: [
      {
        id: 206,
        categoryId: 4,
        name: lang.jewellery.necklaces,
        iconfont: 'iconJewelry-necklace',
        qualityName: 'necklace'
      },
      {
        id: 207,
        categoryId: 5,
        name: lang.jewellery.pendants,
        iconfont: 'icondiamond-pendant',
        qualityName: 'pendant'
      },
      // {
      //   id: 208,
      //   categoryId: 6,
      //   name: lang.jewellery.earStud,
      //   iconfont: 'icondiamond-earring',
      //   qualityName: 'studEarring'
      // },
      // {
      //   id: 209,
      //   categoryId: 7,
      //   name: lang.jewellery.earrings,
      //   iconfont: 'iconsp-dz1',
      //   qualityName: 'earring'
      // },
      {
        id: 210,
        categoryId: 8,
        name: lang.jewellery.bracelets,
        iconfont: 'iconJewelry-bracelet',
        qualityName: 'braceletLine'
      },
      {
        id: 211,
        categoryId: 9,
        name: lang.jewellery.bangles,
        iconfont: 'iconshouhuan',
        qualityName: 'bracelet'
      },
      {
        id: 210,
        categoryId: 21,
        name: lang.jewellery.earring,
        iconfont: 'iconfont iconsp-dz1',
        qualityName: 'earring'
      },
      {
        id: 210,
        categoryId: 22,
        name: lang.jewellery.earrings,
        iconfont: 'iconfont iconsp-dz1',
        qualityName: 'earrings'
      },
      {
        id: 210,
        categoryId: 6,
        name: lang.jewellery.earStud,
        iconfont: 'iconfont icondiamond-earring',
        qualityName: 'earStud'
      },
      {
        id: 210,
        categoryId: 23,
        name: lang.jewellery.earLine,
        iconfont: 'iconfont iconsp-dz1',
        qualityName: 'earLine'
      },
      {
        id: 211,
        categoryId: 24,
        name: lang.jewellery.earDrop,
        iconfont: 'iconfont iconsp-dz1',
        qualityName: 'earDrop'
      },
      // {
      //   id: 211,
      //   categoryId: 16,
      //   name: lang.jewellery.decoration,
      //   iconfont: 'iconshouhuan',
      //   qualityName: 'decoration'
      // },
      // {
      //   id: 211,
      //   categoryId: 17,
      //   name: lang.jewellery.widgets,
      //   iconfont: 'iconshouhuan',
      //   qualityName: 'widgets'
      // },
      // {
      //   id: 211,
      //   categoryId: 18,
      //   name: lang.jewellery.other,
      //   iconfont: 'iconshouhuan',
      //   qualityName: 'others'
      // },
    ],

    diamond: {
      polish: [
        {
          id: 69,
          name: lang.polish['69']
        },
        {
          id: 68,
          name: lang.polish['68']
        },
        {
          id: 67,
          name: lang.polish['67']
        }
      ],
      symmetry: [
        {
          id: 72,
          name: lang.symmetry['72']
        },
        {
          id: 71,
          name: lang.symmetry['71']
        },
        {
          id: 70,
          name: lang.symmetry['70']
        }
      ],
      card: [
        {
          id: 138,
          name: 'GIA'
        },
        {
          id: 151,
          name: 'AGS'
        },
        {
          id: 152,
          name: 'IGI'
        }
      ],
      fluorescence: [
        {
          id: 122,
          name: lang.fluorescence['122']
        },
        {
          id: 121,
          name: lang.fluorescence['121']
        },
        {
          id: 120,
          name: lang.fluorescence['120']
        },
        {
          id: 21,
          name: lang.fluorescence['21']
        },
        {
          id: 20,
          name: lang.fluorescence['20']
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

    languageOptionsCn: [
      {
        code: 'zh_CN',
        content: '简体中文',
        shortCut: '简'
      },
      {
        code: 'zh_TW',
        content: '繁體中文',
        shortCut: '繁'
      }
    ],

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
        content: ''
      },
      {
        code: 'USD',
        content: 'USD'
      }
    ],

    coinOptionsCn: [
      // {
      //   code: 'HKD',
      //   content: 'HKD'
      // },
      {
        code: 'CNY',
        content: 'CNY'
      },
      // {
      //   code: 'USD',
      //   content: 'USD'
      // }
    ],

    coinOptionsTw: [
      {
        code: 'TWD',
        content: 'TWD'
      }
    ]
  }
}
