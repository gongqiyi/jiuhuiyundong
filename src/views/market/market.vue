<template>
  <div id="invest">
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
            <router-link to="/market/investPointRule/list"><span>投保返积分管理</span></router-link>
          </li>
          <li>
            <router-link to="/market/invitePointRule/list"><span>邀请返积分管理</span></router-link>
          </li>
          <li>
            <router-link to="/market/salesAwardRule/list"><span>客户经理邀请奖励管理</span></router-link>
          </li>
          <li>
            <router-link to="/market/activity/list"><span>活动管理</span></router-link>
          </li>
          <li>
            <router-link to="/market/inviteRecord/list"><span>邀请记录管理</span></router-link>
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
    name: 'market',
  }
</script>