require.config({
    baseUrl: 'js/lib/',  //相对于index.html页面文件的地址
    paths:{   //这里配置的地址，都是相对于上方的baseUrl的
        avalon: 'avalon',
        domReady:'domReady',
        mmHistory: 'mmHistory',
        mmRouter: 'mmRouter',
        css: 'css'  //加上css.js
    },
    shim:{
        avalon: { exports: "avalon" },
        mmHistory:{ deps: ['avalon']},
        mmRouter:{ deps: ['avalon']},
    }
});

require(['mmHistory','mmRouter',"domReady!"], function() {
    var vm = avalon.define({
        $id: "user",
        username:conf.username,
        pageUrl:"mine.html"  //默认为mine.html
    });
    function callback() {
        if(this.path==="/index"){
            vm.pageUrl="mine.html"; //如果url后缀变成"#!/index"，则pageUrl为“mine.html”
        }else {
            var path_tail = this.path.replace(/\//, ""); //去掉this.path值的第一个斜杠
            vm.pageUrl = path_tail + ".html";  //动态修改pageUrl属性值
        }
    }
    avalon.router.get("/*path", callback); //劫持url hash并触发回调
    avalon.history.start(); //历史记录堆栈管理
    avalon.scan();
});

