/**
 * Created by vajoylan on 2015/9/13.
 */

    require('../../css/frozen.css');
    var React = require('react'),
        TabPane = require('../component/TabPane'),
        Tab = require('../component/Tab');

    var tapCallback = function(){
            alert('你点到我了!!');
        };

    React.render(
        <Tab defaultActiveKey={2} autoPlay={true} playTime={5000}>
            <TabPane tab='热门推荐'>
                <p>内容1</p><p>内容1</p><p>内容1</p><p>内容1</p>
            </TabPane>
            <TabPane tab='全部表情'>
                <p>内容2</p><p>内容2</p>
            </TabPane>
            <TabPane tapCallback={tapCallback} tab='表情'>
                <p>内容3</p>
            </TabPane>
        </Tab>, document.querySelector('.wrap')
    );