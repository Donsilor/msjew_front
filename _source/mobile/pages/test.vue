<template>
  <div>
    <button @click="showSelect">select</button>
    <choose-eject
      ref="choose-eject"
      :type="'style'"
      :options="styleOptions"
      @onClear="chooseWhat"
    ></choose-eject>
  </div>
</template>

<script>
export default {
  layout: 'relative-top-bar',
  data() {
    return {
      qualityOptions: [
        {
          id: 1,
          name: '14k白色',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1d7AlLtjfAfNX6BpG0H2NkWsBm9C-n2Ntlg4PSgA74dFBgrY_7Q'
        },
        {
          id: 2,
          name: '18k白色',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1d7AlLtjfAfNX6BpG0H2NkWsBm9C-n2Ntlg4PSgA74dFBgrY_7Q'
        },
        {
          id: 3,
          name: '24k白色',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1d7AlLtjfAfNX6BpG0H2NkWsBm9C-n2Ntlg4PSgA74dFBgrY_7Q'
        },
        {
          id: 4,
          name: '14k黄色',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1d7AlLtjfAfNX6BpG0H2NkWsBm9C-n2Ntlg4PSgA74dFBgrY_7Q'
        },
        {
          id: 5,
          name: '18k黄色',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1d7AlLtjfAfNX6BpG0H2NkWsBm9C-n2Ntlg4PSgA74dFBgrY_7Q'
        },
        {
          id: 6,
          name: '24k黄色',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1d7AlLtjfAfNX6BpG0H2NkWsBm9C-n2Ntlg4PSgA74dFBgrY_7Q'
        }
      ],
      styleOptions: [
        {
          id: 1,
          name: '14k白色',
          image: require('../static/ring-yx.png')
        },
        {
          id: 2,
          name: '18k白色',
          image: require('../static/ring-yx.png')
        },
        {
          id: 3,
          name: '24k白色',
          image: require('../static/ring-yx.png')
        },
        {
          id: 4,
          name: '14k黄色',
          image: require('../static/ring-yx.png')
        },
        {
          id: 5,
          name: '18k黄色',
          image: require('../static/ring-yx.png')
        },
        {
          id: 6,
          name: '24k黄色',
          image: require('../static/ring-yx.png')
        }
      ]
    }
  },
  methods: {
    showSelect() {
      console.log(this.$refs)
      this.$refs['choose-eject'].showIt()
    },
    chooseWhat(options = []) {
      alert('你所选的是===>' + JSON.stringify(options))
    }
  }
}
</script>

<style scoped></style>
