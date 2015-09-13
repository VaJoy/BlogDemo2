/**
 * Created by vajoylan on 2015/9/13.
 */

define(function (require, exports, module) {
    var React = require('react'),
        PropTypes = React.PropTypes,
        globalEventHandler = require("./globalEventHandler");

    var Tab = React.createClass({
        timer: null,

        mixins: [globalEventHandler],

        propTypes: {
            defaultActiveKey: PropTypes.number, //默认激活标签项
            autoPlay: PropTypes.bool, //是否自动播放
            playTime: PropTypes.number
        },

        getDefaultProps: function () {
            return {
                autoPlay: true,
                playTime: 6000,
                defaultActiveKey: 1
            }
        },

        getInitialState: function () {
            return {
                actKey: this.props.defaultActiveKey,
                tabWidth: 0
            }
        },

        componentDidMount: function () {
            var tabWidth = this.getDOMNode().getBoundingClientRect().width;
            this.setState({tabWidth: tabWidth});
            var content = this.getDOMNode().querySelector('.ui-tab-content');
            setTimeout(function () {
                content.style.webkitTransition = '-webkit-transform .3s'
            }, 10);

            this.autoPlay()
        },

        handleClick: function (index) {
            this.setState({actKey: index});
            clearTimeout(this.timer);
            this.autoPlay();
        },

        renderPanes: function (child, index) {
            return React.cloneElement(child, {
                isAct: this.state.actKey == (index + 1),
                handleClick: this.handleClick.bind(this, index + 1)
            });
        },

        renderContents: function (child, index) {
            return (
                <li className={this.state.actKey == (index + 1) ? 'current' : null}>
                  {child.props.children}
                </li>
            )
        },

        autoPlay: function () {
            if (!this.props.autoPlay) return;
            this.timer = setTimeout(function () {
                var nextKey = this.state.actKey == this.props.children.length ? 1 : (this.state.actKey + 1);
                this.setState({actKey: nextKey});
                this.autoPlay();
            }.bind(this), this.props.playTime)
        },

        render: function () {
            this.windowResize(function () {
                var tabWidth = this.getDOMNode().getBoundingClientRect().width;
                this.setState({tabWidth: tabWidth});
            }.bind(this));

            var style = {
                width: 100 * this.props.children.length + '%',
                WebkitTransform: 'translateX(-' + this.state.tabWidth * (this.state.actKey - 1) + 'px)'
            };
            return (
                <div className="ui-tab">
                    <ul className="ui-tab-nav ui-border-b">
                        {React.Children.map(this.props.children, this.renderPanes)}
                    </ul>
                    <ul className="ui-tab-content" style={style}>
                        {React.Children.map(this.props.children, this.renderContents)}
                    </ul>
                </div>
            );
        }
    });

    module.exports = Tab;
});