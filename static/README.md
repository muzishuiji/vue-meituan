# STATIC

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your static files.
Each file inside this directory is mapped to `/`.
Thus you'd want to delete this README.md before deploying to production.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/assets#static).

### nuxt.js基础

asynData()获取的数据是用来渲染vue component,也就是用来渲染组件的,获取数据后修改组件相应的数据

fetch()是用来修改vuex,也就是store中的数据的,使用来获取数据之后修改vuex的state的.

创建既配置,创建一个页面会自动为其添加对应的路由

公共的头部组件和尾部组件可以放到模板中去,这样就不需要在每个页面都引入一次.

ssr用来解决seo的问题
