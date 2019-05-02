<template>
    <div class="swiper-container" ref="wiperbox">
      <div class="swiper-list" ref="wiperlist" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
        <slot></slot>
      </div>
    </div>
</template>

<script>

export default {
    props:['itemHeight', 'pageNum'],
    data () {
        return {
            currentPage: 1,
            startY: 0,
            moveY: 0,
        }
    },
    mounted () {
        this.freshSize();
        this.$nextTick(()=>{
            
        })     
    },
    computed:{
        listStyle(){
            // let style = {
            //     height: this.mainHeight*this.pageNum+'px',
            // }
            // if(this.moveY != 0 ){
            //     //拖动效果
            //     style.top = this.pageNum == this.currentPage && this.moveY < 0 || this.currentPage == 1 && this.moveY > 0 ? 
            //                 -this.mainHeight*(this.currentPage-1)+'px' 
            //                 : -this.mainHeight*(this.currentPage-1)+ this.moveY +'px';
            //     style.transition = "top 0s";
            // }else{
            //     //滚动翻页效果
            //     style.top = -this.mainHeight*(this.currentPage-1)+'px';
            //     style.transition = "top 1s";
            // }
            // return style
        },
    },
    methods: {
        freshSize() {
            this.$refs.wiperlist.style.height = this.itemHeight*this.pageNum+'px'
        },
        touchStart(e){
            this.startY = e.touches[0].pageY;
        },
        touchMove(e){
            this.moveY = e.changedTouches[0].pageY - this.startY;
            this.$refs.wiperlist.style.transform = 'translateY('+ (-this.itemHeight*(this.currentPage-1)+this.moveY) + 'px)';
        },
        touchEnd(e){
            let goDown = 0;
            if (this.moveY > 10) {
                goDown = 1
            }else if(this.moveY < -10){
                goDown = -1
            }
            this.changeItem(goDown);
        },
        changeItem(down) {
            if(down > 0 && this.currentPage > 1 && this.currentPage <= this.pageNum ){ //往下滑
                this.currentPage = this.currentPage - 1;
            }else if(down < 0 && this.currentPage >= 1 && this.currentPage < this.pageNum ){  //往上滑
                this.currentPage = this.currentPage + 1;
            }
            this.$refs.wiperlist.style.transform = 'translateY('+ (-this.itemHeight*(this.currentPage-1)) + 'px)';
            this.$refs.wiperlist.style.transition = 'transform .5s'
        },
    },
};

</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 100%;
    position: relative;
    .swiper-list{
      width: 100%;
      position: absolute;
    }
  }

</style>
