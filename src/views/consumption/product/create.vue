<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>消费券管理</h4>
        <breadcrumb
                v-bind:items="[{text: '消费管理'},{text:'消费券管理'},{text:'添加消费券', active:true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/consumption/product/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>添加消费券</h4>
        <hr>
        <form class="form-horizontal mt-2 create-product-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="name" class="control-label col-lg-2">产品名称</label>
            <div class="col-lg-10">
              <input class="form-control" id="name" name="name" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="point" class="control-label col-lg-2">消费点数</label>
            <div class="col-lg-10">
              <input class="form-control" id="point" name="point" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="validTimeStart" class="control-label col-lg-2">起始时间</label>
            <div class="col-lg-10">
              <input class="form-control" id="validTimeStart" name="validTimeStart" type="text" required=""
                     aria-required="true" onclick="laydate()">
            </div>
          </div>
          <div class="form-group ">
            <label for="validTimeEnd" class="control-label col-lg-2">过期时间</label>
            <div class="col-lg-10">
              <input class="form-control" id="validTimeEnd" name="validTimeEnd" type="text" required=""
                     aria-required="true" onclick="laydate()">
            </div>
          </div>
          <div class="form-group ">
            <label for="description" class="control-label col-lg-2">说明</label>
            <div class="col-lg-10">
              <textarea class="form-control" id="description" name="description"></textarea>
            </div>
          </div>

          <div class="form-group ">
            <label for="remark" class="control-label col-lg-2">备注</label>
            <div class="col-lg-10">
              <input class="form-control" id="remark" name="remark" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="merchantIdList" class="control-label col-lg-2">支持商户</label>
            <div class="col-lg-10">
              <select id="merchantIdList" name="merchantIdList" class="form-control" multiple="multiple">
              </select>
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
  import '../../../../static/js/plugins/select2/js/select2.min'
  import '../../../../static/js/plugins/select2/js/i18n/zh-CN'
  import '../../../../static/js/plugins/select2/css/select2.min.css'
  import '../../../../static/js/plugins/laydate/laydate'

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
      this.initMerchantSelect2();
    },
    updated: function () {
    },
    destroyed: function () {
    },
    methods: {
      // 创建提交
      submitForm: function () {
        let self = this;
        $.each($('.create-product-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              name: {
                required: true
              },
              description: {
                required: true
              },
              point: {
                required: true,
              },
              validTimeStart: {
                required: true,
              },
              validTimeEnd: {
                required: true,
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.consumption.product.create.url,
                data: $(form).serialize(),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/consumption/product/list');
                    }
                  });
                }
              });
            }
          });
        })
      },
      // 初始化商户选择
      initMerchantSelect2: function () {
        let self = this;
        $('#merchantIdList').select2({
          language: 'zh-CN',
          ajax: {
            data: function (params) {
              return {
                name: params.term,
                pageIndex: params.page,
              };
            },
            url: api.consumption.merchant.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let merchantList = data.merchantPageList;
              return {
                results: merchantList.list,
                pagination: {
                  more: merchantList.hasNextPage,
                },
              };
            },
            cache: true,
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          templateResult: formatRepo,
          templateSelection: formatRepoSelection,
        });
        function formatRepo(repo) {
          if (repo.loading) return repo.text;
          return repo.name + ' - ' + repo.areaName;
        }

        function formatRepoSelection(repo) {
          return repo.name + ' - ' + repo.areaName;
        }
      },
    },
    watch: {}
  }
</script>
