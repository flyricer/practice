<template>
   <div class="wrapper-box" ref='wrapperBox'>
      <ul class="content-box clearfix" ref='contentBox'>
         <li class="list-box" v-for="item in itemList" :key="item.id">
            <a href="" class="item-path">
               <img :src="item.banner_url" ref="sliderItemImg"/>
            </a>
         </li>
      </ul>
   </div>
</template>

<script>

import BScroll from 'better-scroll'
import {getStyle} from '../base/js/util.js'


export default {

   data() {
      return {    
         itemList: [],
         scroller: '',
         currentPageIndex: 0,
         autoPlay: true,
         loop: true,
      }
   },

   mounted() {
      this.getData();
      this.$nextTick(() => {
         this.initScroll();
         if (this.autoPlay) {
            this.play()
         }
      })

      window.addEventListener('resize', () => {
         this.getData()
         this.scroller.refresh()
      })
   },

   destroyed() {
      clearTimeout(this.timer)
   },

   methods: {
      getData(){	    
         this.axios.get('http://60.205.222.7:9980/public/images/data.json')
         .then((res)=>{ 	  
            this.itemList=res.data.banner
            this.$nextTick(()=>{
               this.freshWidth(); 
            }) 		   	    		
         })
      },
      freshWidth(){
         let imgWidth = getStyle(this.$refs.wrapperBox,"width")
         let sliderWidth = imgWidth * (this.itemList.length + 2)
         this.$refs.contentBox.style.width = sliderWidth + 'px'        
         this.$refs.sliderItemImg.forEach(item => {
            item.style.width = imgWidth + "px";
         });
      },
      initScroll() {
         this.scroller = new BScroll(this.$refs.wrapperBox,{
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
               loop: this.loop,
               threshold: 0.3,
               speed: 400
            },
            stopPropagation: true,
         })
         this.scroller.on('scrollEnd', () => {
            let pageIndex = this.scroller.getCurrentPage().pageX //轮播到下一张，获取当前的index
            this.currentIndex = pageIndex 
 
            if (this.autoPlay) {
               clearTimeout(this.timer)    //如果设置了自动轮播就清除轮播再重新启动
               this.play()
            }
         })
      },
      play() {
         this.timer = setTimeout(() => {
            this.scroller.next()
         }, 2000)
      }
   }
}
</script>

<style lang="scss" scoped>
   .wrapper-box{
      width: 100%;
      overflow: hidden;
      .content-box{
         width: 100%;
         overflow: hidden;
         .list-box{
            float: left;
            .item-path {
               display: inline-block;
               img{
               // width: 100%;
               // height: 100%;
               vertical-align: bottom
               }
            }
         }
      }
   }

</style>
