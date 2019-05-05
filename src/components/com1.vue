<template>
<!-- 商品列表项区域 -->
<div class="goodslist">
<!-- S 左侧边栏 -->
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item, index) in goodsList" class="menu-item" :class="{current:currentIndex === index}"
                @click="selectMenu(index, $event)" :key="index">
                <span class="menu-type">{{item.type}}</span>
            </li>
        </ul>
    </div>
<!-- E 左侧边栏 -->

<!-- S 右侧边栏 -->
    <div class="foods-wrapper" ref="foodWrapper">
        <ul>
            <li v-for="(item, type) in goodsList" class="type-list" :key="type">
                <h4 class="food-type">{{item.type}}</h4>
                <ul>
                    <li v-for="(food, index) in item.foods" class="food-list" :key="index">
                        <span class="food-item">{{food.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    // name: 'goodslist',
    data() {
        return {
            goodsList: [
                {
                    'type': '正餐',
                    'foods': [
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                    ]
                },
                {
                    'type': '甜品',
                    'foods': [
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                    ]
                },
                {
                    'type': '饮料',
                    'foods': [
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                    ]
                },
                {
                    'type': '水果',
                    'foods': [
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                    ]
                },
                {
                    'type': '冷饮',
                    'foods': [
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                        {'name': '白萝卜五花肉1'},
                    ]
                },
            ],
            listHeight:[],
            scrolly: 0,
            // menuScroll: '',
            // foodScroll: ''
        }
    },
    mounted() {
        this.$nextTick(()=> {
            this.initScroll()
            this.freshHeight()
            // this.menuScroll.refresh()
            // this.foodScroll.refresh()
        })
    },
    updated() {
        this.menuScroll.refresh()
        this.foodScroll.refresh()
    },
    methods: {
        initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
            })
            this.foodScroll = new BScroll(this.$refs.foodWrapper, {
            probeType: 3, //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
            click: true
            })
            //结合BScroll的接口使用,监听scroll事件(实时派发的),并获取鼠标坐标，当滚动时能实时暴露出scroll
            this.foodScroll.on('scroll', (pos) => {
                this.scrolly = Math.abs(Math.round(pos.y))
            })
        },
        freshHeight() {
            let foodList = this.$refs.foodWrapper.getElementsByClassName('type-list')  //获取每一个food的dom对象
            let height = 0;
            this.listHeight.push(height)  //初始化第一个高度为0
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i] //每一个item都是刚才获取的food的每一个dom
                height += item.clientHeight //主要是为了获取每一个foods内部块的高度
                this.listHeight.push(height)
            }
        },

        selectMenu(index, event) {
            if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回
                return;
            }
            let foodList = this.$refs.foodWrapper.getElementsByClassName('type-list')  //获取每一个food的dom对象
            let el = foodList[index];
            //类似jump to的功能,通过这个方法,跳转到指定的dom
            this.foodScroll.scrollToElement(el, 300);
        }
    },
    computed: {
        currentIndex () { //计算到达哪个区域的区间的时候的对应的索引值
            for(let i = 0; i < this.listHeight.length; i++) { 
                let height = this.listHeight[i] //当前menu子块的高度
                let height2 = this.listHeight[i+1] //下一个menu子块的高度
            //滚动到底部的时候,height2为undefined,需要考虑这种情况
            //需要确定是在两个menu子块的高度区间
                if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
                    return i //返回这个menu子块的索引
                }
            }
            return 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .goodslist {
        display: flex;
        height: 100%;
        overflow: hidden;
        .menu-wrapper {
                flex: 1;
                text-align: center;
                background-color: #fafafa;
            .menu-item {
                .menu-type {
                    display: block;
                    padding: 10px 10px;
                }
            }
            .current {
                background-color: #ffffff;
            }
        };
        .foods-wrapper {
            flex: 4;
            text-align: center;
            .type-list {
                .food-type {
                    padding: 10px 10px;
                    text-align: left;
                    background-color: #fafafa;
                };
                .food-list {
                    .food-item {
                        padding: 30px 0;
                        display: block;
                        border-bottom: 1px solid #fafafa;
                    }
                }
            }
        }
    }
</style>

