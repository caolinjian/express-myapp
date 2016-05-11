(function () {
    // ensure underscore,backbone and jquery are available
    if (typeof $ === 'undefined') alert('underscore environment not loaded');
    if (typeof _ === 'undefined') alert('jquery environment not loaded');
    if (typeof Backbone === 'undefined') alert('backbone environment not loaded');

    Backbone.UI = Backbone.UI || {};
    var templateSetting={
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    var templeHTML = '<a class="<%= currentPage==1?\'pageA disable\':\'pageA\' %>" data-index="1">' +
        '<span>首页</span>' +
        '</a>' +
        '<a class="<%= currentPage==1?\'pageA disable\':\'pageA\' %>" data-index="<%= currentPage-1 %>">' +
        '<span>上一页</span>' +
        '</a>' +
        '<% for(var i=0;i<showList.length;i++){ %>' +
        '<a class="<%= currentPage==showList[i]?\'pageA pageActive disable\':\'pageA\' %>" data-index="<%=' +
        ' showList[i] %>">' +
        '<span><%= showList[i] %></span>' +
        '</a>' +
        '<% } %>' +
        '<a class="<%= currentPage==totalPage?\'pageA disable\':\'pageA\' %>" data-index="<%= currentPage+1 %>">' +
        '<span>下一页</span>' +
        '</a>' +
        '<a class="<%= currentPage==totalPage?\'pageA disable\':\'pageA\' %>" data-index="<%= totalPage %>">' +
        '<span>尾页</span>' +
        '</a>';
    Backbone.UI.Panigator = function () {
        this.isInit = false;
        this.model;
        this.view;
        var PanigatorModel = Backbone.Model.extend({
            defaults: {
                size: 5,
                currentPage: 1, //第一页 从1开始计数不是0 
                showPageA: 5, //最多显示多少个按钮 
                total: 10
            }
        });
        var PanigatorView = Backbone.View.extend({
            el: '.pager',
            events: {
                'click .pageA': 'changePage'
            },
            initialize: function () {
                var self = this;
                self.setTotalPage();
                self.model.bind('change currentPage', function () {
                    self.setTotalPage();
                });
            },
            changePage: function (ev) {
                if ($(ev.currentTarget).hasClass('disable')||$(ev.currentTarget).hasClass('pageActive')){
                    return false;
                }
                this.model.attributes.pageChange($(ev.currentTarget).data('index'))
            },
            render: function (page) {
                this.$el.html(_.template(templeHTML,templateSetting)(this.model.toJSON()));
            },
            setTotalPage: function () {
                var showList = [];
                var totalPage = Math.floor((this.model.get('total') - 1) / this.model.get('size')) + 1;
                var currentPage = this.model.get('currentPage');
                var showPageA = this.model.get('showPageA');
                if (totalPage <= showPageA || currentPage < Math.floor(showPageA / 2) + 1) {
                    for (var i = 1; i <= totalPage && showList.length <= showPageA - 1; i++) {
                        showList.push(i)
                    }
                } else if (currentPage > totalPage - Math.ceil(showPageA / 2)) {
                    for (var i = totalPage; showList.length <= showPageA - 1; i--) {
                        showList.unshift(i)
                    }
                } else {
                    for (var i = currentPage - Math.floor(showPageA / 2); i <= currentPage + Math.ceil(showPageA / 2) - 1 && showList.length <= showPageA - 1; i++) {
                        showList.push(i)
                    }
                }
                this.model.set('totalPage', totalPage);
                this.model.set('showList', showList);
            }
        });
        this.init = function (options) {
            var self=this;
            self.model = new PanigatorModel(options);
            self.view= new PanigatorView({
                model: self.model
            });
            self.isInit=true;
        }
    }
})()