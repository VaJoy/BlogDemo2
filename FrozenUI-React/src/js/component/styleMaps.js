define(function (require, exports, module) {

    module.exports = {
        globalCN: {},
        loadingCN: {
            block: {
                partial: 'demo-block',
                global: 'ui-loading-block show'
            },
            wrap: {
                partial: 'ui-loading-wrap',
                global: 'ui-loading-cnt'
            },
            i: {
                partial: 'ui-loading',
                global: 'ui-loading-bright'
            }
        }
    };
});