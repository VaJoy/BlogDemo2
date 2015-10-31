/**
 * Created by VaJoy on 2015/10/31.
 */
import React from 'react';

const Alert = React.createClass({
    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
});

export default Alert;
