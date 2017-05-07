<template>
  <ul class="nav nav-pills nav-justified dk-wizard-nav mt-1">
    <li role="presentation" :class="active=='basic'?'active':''"><a
      v-bind:href="'#/index/store/activity/add/basicSetting/'+prototypeId+'?storeId='+storeId"><span
      class="badge">1</span>基础设置</a></li>
    <li role="presentation" v-if="activityId>0" :class="active=='game'?'active':''"><a :href="'/index/store/activity/add/gameSetting/'+activityId"><span class="badge">2</span>抽奖方式</a></li>
    <li role="presentation" :class="active=='prize'?'active':''"><a href="#/index/store/activity/add/prizeSetting/6"><span class="badge">3</span>奖项设置</a></li>
    <li role="presentation" v-if="gameId>0" v-for="(item,index) in pageList" :class="active=='basic'?'active':''"><a :href="'/index/store/activity/add/settingResource/'+item.id+'?gameId='+gameId"><span
      class="badge">{{index+4}}</span>{{item.title}}</a></li>
  </ul>
</template>

<script>
  export default {
    data: function () {
      return {
        pageList:''
      }
    },
    created: function () {
      this.getPageList();
    },
    computed: {},
    props: {
      storeId: 0,
      prototypeId: 0,
      activityId:0,
      gameId:0,
      active:''
    },
    methods: {
      getPageList: function () {
        var self = this;
        console.log(self.active);
        $.ajax({
          url: commonApp.api.prototype.listGameResource.url(self.prototypeId),
          success: function (res) {
            self.pageList = res.prototypePageList;
          }
        });
      }
    }
  };
</script>
