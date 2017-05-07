<template>
  <div id="app">
    <!-- 顶部导航 -->
    <nav class="navbar navbar-inverse dk-navbar">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#dk-navbar-collapse" aria-expanded="false">
          <span class="sr-only">切换导航</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- 样式一 -->
        <!--<a class="navbar-brand navbar-brand-img" href="#">
          <img class="dk-brand-img-lg" src="./assets/images/logo-lg.png">
          <img class="dk-brand-img-sm" class="" src="./assets/images/logo-sm.png">
        </a>-->
        <!-- 样式二 -->
        <a class="navbar-brand" href="#">
          <img src="./assets/images/logo-sm.png">
          <span>九回云动</span>
          <span class="caret"></span>
        </a>
      </div>
      <div class="collapse navbar-collapse" id="dk-navbar-collapse">
        <!-- 顶部主导航 -->
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/admin">管理员管理<span class="sr-only"></span></router-link>
          </li>
          <li><router-link to="/statistic">统计报表 <span class="sr-only"></span></router-link></li>
          <li>
            <router-link to="/holder">会员员管理<span class="sr-only"></span></router-link>
          </li>
          <li>
            <router-link to="/venues">场馆管理<span class="sr-only"></span></router-link>
          </li>
        </ul>
        <!-- 顶部其他导航 -->
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown dk-user-control">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false">
              <img class="dk-avatar" src="./assets/images/avatar.png">
              <span>管理员设置</span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="首页-修改密码.html"><span class="ion ion-ios-gear-outline"></span>修改密码</a></li>
              <li role="separator" class="divider"></li>
              <li><a class="" href="#"><span class="ion ion-log-out"></span>安全退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav><!-- 顶部导航 结束 -->
    <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default{
    name: 'app',
    mounted: function () {
      commonApp.init();
    },
    computed: {
      user(){
        return JSON.parse(window.sessionStorage.userContext);
      }
    }
  }
</script>
