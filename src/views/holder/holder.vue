<template>
  <div id="holder">
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
            <router-link to="/holder/list"><span class=""></span><span>会员管理</span></router-link>
          </li>
          <li>
            <router-link to="/holder/sales/list"><span class=""></span><span>客户经理管理</span></router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="dk-main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'holder',
  }
</script>