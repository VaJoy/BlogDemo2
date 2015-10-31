import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Alert from '../src/Alert';

describe('Alert', () => {
    it('往页面插入一段带有strong标签的组件', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Alert>
                <strong>Message</strong>
            </Alert>
        );
        assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
    });
});