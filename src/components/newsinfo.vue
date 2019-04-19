<template>

<div class="newsinfo-container">sss
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <commentBox :id="this.id"></commentBox>
</div>
</template>

<script>
import commentBox from './comment.vue'

export default {
    name: 'newsinfo',
    components: {
        commentBox
    },
    data() {
        return {
            id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
            newsinfo: {} // 新闻对象
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo() {
            this.axios.get("/api/api/getnew/" + this.id).then(response => {
                this.newsinfo = response.data.message[0];
                // this.newsinfo = response.data.message[0];
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 4px;
    .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
    }
    .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
    }
    .content {
        img {
          width: 100%;
        }
    }
}
</style>
