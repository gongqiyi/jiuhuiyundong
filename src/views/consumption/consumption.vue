<template>
  <div id="invest">
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
            <router-link to="/consumption/merchant/list"><span>商户管理</span></router-link>
          </li>
          <li>
            <router-link to="/consumption/merchant/award"><span>商户绩效奖励机制管理</span></router-link>
          </li>
          <li>
            <router-link to="/consumption/product/list"><span>消费券管理</span></router-link>
          </li>
          <li>
            <router-link to="/consumption/order/list"><span>消费券兑换记录</span></router-link>
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
    name: 'consumption',
  }
</script>