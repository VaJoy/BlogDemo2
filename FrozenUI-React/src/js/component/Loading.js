/**
 * Created by vajoylan on 2015/7/6.
 */

    var React = require('react'),
        loadingCN = require('../component/styleMaps').loadingCN, //引入加载组件类名对象
        PropTypes = React.PropTypes;

    var Loading = React.createClass({

        propTypes: {
            isPart: PropTypes.bool, //是否局部加载
            onHide: PropTypes.func,  //组件卸载后的回调
            content: PropTypes.string  // 展示内容
        },

        componentWillUnmount: function(){
            if(typeof this.props.onHide === 'function'){
                setTimeout(this.props.onHide, 10);
            }
        },

        render: function () {
            var content = this.props.content || '正在加载中...',
                flag = this.props.isPart ? 'partial' : 'global',
                component = (<div className={loadingCN.block[flag]}>
                    <div className={loadingCN.wrap[flag]}>
                        <i className={loadingCN.i[flag]}></i>
                        <p>{content}</p>
                    </div>
                </div>);

            return component
        }
    });

    module.exports = Loading;