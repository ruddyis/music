<template>
  <Header class="header">
    <!--stop事件修饰符是为了阻止事件冒泡-->
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{title}}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .header{
    .header-left{
      @include bg_img('../../assets/images/back');
    }
    .header-right{
      @include bg_img('../../assets/images/more')
    }
    .header-title{
      width: 70%;
      text-align: center;
      line-height: 100px;
      color:#fff;
      font-weight: bold;
      @include font_size($font-medium);
      @include no-wrap();
    }
  }

</style>
