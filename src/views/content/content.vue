<template>
  <div id="content">
    <!--2.内容管理的侧边导航条  开始-->
    <aside class="dk-main-aside">
      <a id="js-toggle-aside-nav" class="dk-nav-shrink-btn" href="javascript:;"><span
              class="ion ion-navicon-round"></span></a>
      <nav class="dk-nav-aside scroll-bar">
        <ul id="js-aside-collapse">
          <li>
            <a href="#"><span class=""></span><span>新闻资讯管理</span></a>
            <ul>
              <li>
                <router-link to="/content/content/list"><span>内容管理</span></router-link>
              </li>
              <li>
                <router-link to="/content/category/list"><span>类别管理</span></router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/content/link/list"><span class=""></span><span>广告内容管理</span></router-link>
          </li>
          <li>
            <a href="javascript:void(0);"><span class=""></span><span>站内信管理</span></a>
            <ul>
              <li><router-link to="/content/message/create"><span>发站内信</span></router-link></li>
              <li><router-link to="/content/message/list"><span>站内信列表</span></router-link></li>
            </ul>
          </li>
          <li>
            <router-link to="/content/sms/list"><span class=""></span><span>短信管理</span></router-link>
          </li>
          <li>
            <router-link to="/content/area/list"><span class=""></span><span>城市区域管理</span></router-link>
          </li>
          <li>
            <router-link to="/content/visitor/list"><span class=""></span><span>访客管理</span></router-link>
          </li>
          <li>
            <router-link to="/content/feedback/list"><span class=""></span><span>意见反馈管理</span></router-link>
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