<template>
  <div id="invest">
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
            <router-link to="/statistic/holderIncrease"><span>用户增长统计</span></router-link>
          </li>
          <li>
            <router-link to="/statistic/invite"><span>用户邀请统计</span></router-link>
          </li>
          <li>
            <router-link to="/statistic/salesInvite"><span>客户经理邀请统计</span></router-link>
          </li>
          <li>
            <router-link to="/statistic/investFull"><span>全额投保统计</span></router-link>
          </li>
          <li>
            <router-link to="/statistic/investInstallment"><span>分期投保统计</span></router-link>
          </li>
          <li>
            <router-link to="/statistic/storeInvest"><span>线下门店业绩统计</span></router-link>
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
    name: 'statistic',
  }
</script>