<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>城市地区管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理', link: '/content'},{text:'城市地区管理', link:'/content/area/list'},{text: '添加城市地区', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/content/area/list">返回</router-link>
      </div>

    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>添加城市地区</h4>
        <hr>
        <form class="form-horizontal mt-2 create-area-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="city" class="control-label col-lg-2">省份</label>
            <div class="col-lg-10">
              <input class=" form-control" id="province" name="province" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="city" class="control-label col-lg-2">城市</label>
            <div class="col-lg-10">
              <input class=" form-control" id="city" name="city" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-lg-10">
              <button class="btn btn-inverse" type="submit">添加</button>
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
      return {}
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
    },
    mounted: function () {
      this.submitForm();
    },
    methods: {
      submitForm: function () {
        let self = this;
        $.each($('.create-area-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              province: {
                required: true
              },
              city: {
                required: true
              }
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: 'http://jiuhui-m.doolab.cn/doc/index.html#!/venues-controller/createVenuesUsingPOST',
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/content/area/list');
                    }
                  });
                }
              });
            }
          });
        });
      }
    },
    watch: {}
  }
</script>
