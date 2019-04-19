<template>
  <div class="swiper-container">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in urllist" :key="item.id">
        <img :src="item.url" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urllist: [
        {id: 1, url: require("@/assets/cyan.png")},
        {id: 2, url: require("@/assets/pink.png")},
        {id: 3, url: require("@/assets/red.png")},
        {id: 4, url: require("@/assets/yellow.png")}
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 250px;
    img {
      height: 100%
    }
  }

</style>
