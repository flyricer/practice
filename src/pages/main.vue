<template>
   <div class="main-container">
  		<keep-alive>
   			<router-view></router-view>	 
   	</keep-alive>
		<foot-nav></foot-nav>
   </div>
</template>

<script>

import footNav from '../components/foot-nav.vue'

export default {
   components:{
        footNav
   }
}
</script>

<style lang="scss">
   .main-container {
      width: 100%;
      height: 100%
   }
</style>
