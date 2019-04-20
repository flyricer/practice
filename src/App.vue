<template>
    <div id="app">
    	<keep-alive>
    		 <router-view v-if="$route.meta.keepAlive"></router-view>
    	</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
// import footNav from './components/foot-nav.vue';

export default {
	 components:{
        // footNav,
    }
};
</script>


<style lang="scss">

// @import './base/css/base.scss';
@import './base/css/normalize.scss';
@import url('//at.alicdn.com/t/font_1118231_nkix49cz44.css');

body{
	background: #f1f8f7;
	#app{
		background: #fff;
		height: 100%;
		width: 100%;
		font-family: Microsoft YaHei;
	}	
}


</style>
