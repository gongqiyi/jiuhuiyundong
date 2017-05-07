<template>
  <div id="invest">
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
            <a href="javascript:void(0);"><span class=""></span><span>提现管理</span></a>
            <ul>
              <li>
                <router-link to="/finance/withdrawal/list"><span>提现记录列表</span></router-link>
              </li>
              <li>
                <router-link to="/finance/withdrawal/setting"><span>提现相关配置</span></router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/finance/point/list"><span>积分记录</span></router-link>
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
    name: 'finance',
  }
</script>