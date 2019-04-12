import React from 'react';
import Wrapper from '../hoc/Wrapper';

const layout = props => (
    <Wrapper>
        <div>future components</div>
        <div>{props.children}</div>
    </Wrapper>
);

export default layout;
