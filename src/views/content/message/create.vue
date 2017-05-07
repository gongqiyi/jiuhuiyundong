<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>站内信管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理', link: '/content'},{text:'站内信管理', link:'/content/area/list'},{text: '发送站内信', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/content/message/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>发送站内信</h4>
        <hr>
        <form class="form-horizontal mt-2 create-message-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="receiverIdList" class="control-label col-lg-2">收件人</label>
            <div class="col-lg-10">
              <select id="receiverIdList" name="receiverIdList" class="form-control" multiple="multiple">
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label for="title" class="control-label col-lg-2">标题</label>
            <div class="col-lg-10">
              <input class=" form-control" id="title" name="title" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="body" class="control-label col-lg-2">内容</label>
            <div class="col-lg-10">
              <textarea name="body" id="body" class="form-control"> </textarea>
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
  import '../../../../static/js/plugins/select2/js/select2.min'
  import '../../../../static/js/plugins/select2/js/i18n/zh-CN'
  import '../../../../static/js/plugins/select2/css/select2.min.css'

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
      this.initHolderSelect2();
    },
    methods: {
      // 表单提交
      submitForm: function () {
        let self = this;
        $.each($('.create-message-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              receiverIdList: {
                required: true
              },
              title: {
                required: true
              },
              body: {
                required: true
              }
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.content.message.create.url,
                data: $(form).serialize(),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/content/message/list');
                    }
                  });
                }
              });
            }
          });
        });
      },
      // 初始化用户选择
      initHolderSelect2: function () {
        let self = this;
        $('#receiverIdList').select2({
          language: 'zh-CN',
          ajax: {
            data: function (params) {
              return {
                mobile: params.term,
                pageIndex: params.page,
              };
            },
            url: api.holder.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let holderList = data.holderPageList;
              return {
                results: holderList.list,
                pagination: {
                  more: holderList.hasNextPage,
                },
              };
            },
            cache: true,
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          minimumInputLength: 3,
          templateResult: formatRepo,
          templateSelection: formatRepoSelection,
        });
        function formatRepo(repo) {
          if (repo.loading) return repo.text;
          return repo.realName + ' (' + repo.mobile + ')';
        }

        function formatRepoSelection(repo) {
          self.vehicleList = JSON.parse(repo.carInfo);
          if (repo.realName == null) {
            return repo.mobile;
          }
          else {
            return repo.realName + ' (' + repo.mobile + ')';
          }
        }
      },

    },
    watch: {}
  }
</script>
