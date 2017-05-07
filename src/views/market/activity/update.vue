<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>活动管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'活动管理'},{text:'添加活动', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/market/activity/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>编辑活动</h4>
        <hr>
        <form class="form-horizontal mt-2 update-activity-form" method="post" novalidate="novalidate">
          <input type="hidden" name="id" v-model="activity.id">
          <div class="form-group ">
            <label for="name" class="control-label col-lg-2">名称</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="activity.name" id="name" name="name" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="url" class="control-label col-lg-2">链接地址</label>
            <div class="col-lg-10">
              <input class="form-control" id="url" name="url" type="text" v-model="activity.url">
            </div>
          </div>
          <div class="form-group ">
            <label for="content" class="control-label col-lg-2">内容</label>
            <div class="col-lg-10">
              <textarea class="form-control" id="content" name="content" v-model="activity.content"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-lg-10">
              <button class="btn btn-inverse" type="submit">保存</button>
              <button class="btn btn-default" type="reset">取消</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import 'jquery-validation'
  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        activity: {},
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getActivity();
    },
    mounted: function () {
      this.submitForm();
    },
    destroyed: function () {
    },
    methods: {
      getActivity: function () {
        let self = this;
        self.ajax({
          url: api.market.activity.get.url(self.$route.params.id),
          success: function (res) {
            self.activity = res.activityDomain;
          }
        });
      },
      submitForm: function () {
        let self = this;
        $.each($('.update-activity-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              name: {
                required: true
              },
              url: {
                required: true
              },
              content: {
                required: true
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.market.activity.update.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/market/activity/list');
                    }
                  });
                }
              });
            }
          });
        })
      },
    },
    watch: {
    }
  }
</script>
