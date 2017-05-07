<template>
  <div id="invest">
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
            <a href="javascript:void(0);"><span class=""></span><span>产品管理</span></a>
            <ul>
              <li>
                <router-link to="/invest/product/full/list"><span>全额投保产品管理</span></router-link>
              </li>
              <li>
                <router-link to="/invest/product/installment/list"><span>分期投保产品管理</span></router-link>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);"><span class=""></span><span>全额投保管理</span></a>
            <ul>
              <li>
                <router-link to="/invest/order/full/list"><span>订单列表</span></router-link>
              </li>
              <li>
                <router-link to="/invest/order/full/listException"><span>匹配异常订单</span></router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/invest/order/installment/list"><span>分期投保管理</span></router-link>
          </li>
          <li>
            <router-link to="/invest/store/list"><span class=""></span><span>门店管理</span></router-link>
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
    name: 'invest',
  }
</script>