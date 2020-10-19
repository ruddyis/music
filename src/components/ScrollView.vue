<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      onmousewheel: true, // 禁止鼠标滚动
      scrollbars: false, // 是否需要显示滚动条
      probeType: 3,
      // 解决卡顿拖拽问题
      scrollX: false,
      ScrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      click: true
    })
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY)
    //   this.iscroll.refresh()
    //   console.log(this.iscroll.maxScrollY)
    // }, 5000)

    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生变化,就会执行传入的回调函数
    mutationList:发生变化的数组
    observer:观察者对象
    */
    const observer = new MutationObserver((mutationList, observer) => {
      // console.log(mutationList)
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh()
      // console.log(this.iscroll.maxScrollY)
    })
    // 2.告诉观察者对象我们需要观察什么内容
    const config = {
      childList: true, // 观察目标子节点的变化,添加或者删除
      subtree: true, // 默认为false,设置为true可以观察后代节点
      attributeFilter: ['height', 'offsetHeight']// 观察特定属性
    }
    // 3.告诉观察者对象,我们需要观察谁,需要观察什么内容
    /*
    第一个参数:告诉观察者对象我们需要观察谁
    第二个参数:告诉观察者对象我们需要观察什么内容
    */
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped lang="scss">
  #wrapper{
    width: 100%;
    height: 100%;
  }
</style>
