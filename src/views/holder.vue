<template>
  <div id="content">
    <!--2.内容管理的侧边导航条  开始-->
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
           <router-link to="/member"><span class=""></span><span>用户管理</span></router-link>
          </li>
          <li>
            <router-link to="/recharge"><span class=""></span><span>充值</span></router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <!--2.内容管理的侧边导航条  结束-->
    <div class="dk-main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'content',
  }
</script>