<template>
<div class="wiper-y" ref="wipery">
    <div class="wiper-container" ref="wiperbox">
        <div class="wiper-list" 
        ref="wiperlist" 
        @touchstart="touchStart"
        @touchend="touchEnd"
        @touchmove="touchMove">
            <div class="wiper-item" :style="itemStyle">第一页</div>
            <div class="wiper-item" :style="itemStyle">第二页</div>
            <div class="wiper-item" :style="itemStyle">第三页</div>
        </div>
    </div>
</div>
</template>

<script>


export default {
    name: 'swiper',
    props:['mainHeight'],
    data () {
        return {
            currentPage: 1,
            startY: 0,
            moveY: 0,
            pageNum: 0,
            ismove: false,
        }
    },
    mounted () {
        this.freshSize();
        this.$nextTick(()=>{
            // console.log(this.mainHeight)
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
        itemStyle() {
            let style = {
                height: this.mainHeight + "px",
            }
            return style
        }
    },

    methods: {

        freshSize() {
            this.pageNum = this.$refs.wiperlist.children.length;
            this.$refs.wipery.style.height = this.mainHeight + 'px';
            this.$refs.wiperlist.style.height = this.mainHeight*this.pageNum+'px'
        },
        touchStart(e){
            this.startY = e.touches[0].pageY;
        },
        touchMove(e){
            this.moveY = e.changedTouches[0].pageY - this.startY;
            this.transy(this.moveY)
        },
        touchEnd(e){
            let goDown = 0;
            if (this.moveY > 10) {
                goDown = 1
            }else if(this.moveY < -10){
                goDown = -1
            }
            this.changeItem(goDown);
            // console.log(this.$refs.wiperlist.scrollTop)
        },
        changeItem(down) {
            if(down > 0 && this.currentPage > 1 && this.currentPage <= this.pageNum ){ //往下滑
                this.currentPage = this.currentPage - 1;
            }else if(down < 0 && this.currentPage >= 1 && this.currentPage < this.pageNum ){  //往上滑
                this.currentPage = this.currentPage + 1;
            }
            console.log(this.currentPage)
            this.transy(0)
        },
        transy(x) {
            this.$refs.wiperlist.style.transform = 'translateY('+ (-this.mainHeight*(this.currentPage-1) + x) + 'px)';
            // console.log(this.$refs.wiperlist.style.transform)
            console.log(this.currentPage)
        }


    }
}
</script>

<style lang="scss" scoped>
.wiper-y {
    width: 100%;
    .wiper-container{
        height: 100%;
        width: 100%;
        background: #c4c4c4;
        overflow: hidden;
        position: relative;
        .wiper-list{
            position: absolute;
            width: 100%;
            transition: all .5s;
            .wiper-item{
                width: 100%;
                text-align: center;
                background-color: cyan
            }
        }
    }
}

</style>
