/**
 * Created by vajoylan on 2015/7/7.
 */

define(function (require, exports, module) {
    var React = require('react'),
        PropTypes = React.PropTypes;

    var TabPane = React.createClass({

        propTypes : {
            handleClick: PropTypes.func,
            tapCallback: PropTypes.func,
            tab: PropTypes.string  // 标题内容
        },

        tapCallback : function(){
            this.props.handleClick();
            this.props.tapCallback && setTimeout(this.props.tapCallback.bind(this), 10)
        },

        render: function () {
            return (
                <li onClick={this.tapCallback} className={this.props.isAct ? 'current' : null}>
                  {this.props.tab}
                </li>
            )
        }
    });

    module.exports = TabPane;
});