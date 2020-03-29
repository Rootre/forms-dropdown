import React from 'react';
import {render} from 'react-dom';

import Component from '../../src';

function App() {
    const items = [
        {label: 'Cat'},
        {label: 'Dog'},
        {label: 'Rabbit'},
        {label: 'Parrot'},
    ];

    return (
        <div>
            <h1>Dropdown</h1>
            <Component items={items}/>
        </div>
    );
}

render(<App/>, document.getElementById('root'));