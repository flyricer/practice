# practice

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# git
克隆到本地
git clone https://github.com/flyricer/practice.git 或者 git clone git://github.com/flyricer/practice.git
git checkout -b dev origin/dev 创建远程origin的dev分支到本地
git branch --set-upstream-to=origin/dev dev 指定本地dev分支与远程origin/dev分支的链接
git add . 提交到暂存区
git commit -m "提交信息" 将暂存区内容提交到当前分支

默认单仓库
git push origin < branch name,eg: master || dev >
git tag -a v0.1.0 -m "version1" 版本标签
git push origin v0.1.0 提交

多仓库
git remote add gitee https://gitee.com/flyricer/firstPractice.git
git push gitee master
git remote add github https://github.com/flyricer/practice.git
git push github master

git init 初始化仓库
git remote -v 查看仓库信息
git status 查看仓库状态
git log 查看历史记录
git reset --hard < name > 回退到历史版本
git reflog 查看回退操作的历史记录

git stash 把当前工作现场“储藏”起来，等以后恢复现场后继续工作
git branch -D < name > 删除未合并的分支
创建+切换分支：git checkout -b < name >
合并某分支到当前分支：git merge < name >
删除分支：git branch -d < name >