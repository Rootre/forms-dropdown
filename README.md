# Dropdown component

Highly customizable and lightweight React dropdown component.

# Installation and usage

With yarn
```
yarn add @rootre/forms-dropdown
```

or with npm

```
npm install @rootre/forms-dropdown
```

Basic usage in project:

```
import React from 'react';
import Dropdown from '@rootre/forms-dropdown';

export default function App() {
    const items = [
        {label: 'Cat'},
        {label: 'Dog'},
        {label: 'Rabbit'},
        {label: 'Parrot'},
    ];

    return (
        <div>
            <Dropdown 
                items={items}
                afterChange={item => {
                    console.log('selected item:', item);
                }}
            />
        </div>
    );
}
```

Your item object can be anything, only mandatory field 
is `label` key that is shown in component HTML.

# Props

* `activeItemTemplate` (optional) - gets active item as a first param, returns React.Component
* `afterChange` (optional) - triggered as side effect after item is changed, gets current item as a first argument, index as second
* `afterOpen` (optional) - triggered as side effect after select is opened or closed, gets first argument boolean isOpen
* `controllers` (optional) - object
* `controllers.active` - controller for setting active item
* `controllers.open` - controller for opening Dropdown
* `disabled`
* `hasError`
* `initialIsOpened`
* `initialItem`
* `itemTemplate` (optional) - gets item as a first param, returns React.Component
* `items`
* `labelKey` - default `label`
* `placeholder`

# Usage with controllers

You can pass state hooks to control dropdown's behavior:

```
import React, {useState} from 'react';
import Dropdown from '@rootre/forms-dropdown';

export default function App() {
    const items = [
        {label: 'Cat'},
        {label: 'Dog'},
        {label: 'Rabbit'},
        {label: 'Parrot'},
    ];

    const activeItemController = useState();
    const [, setActiveItem] = activeItemController;

    return (
        <div>
            <button onClick={() => setActiveItem(items[2])}>Set Rabbit</button>
            <Dropdown
                items={items}
                controllers={{
                    active: activeItemController,
                }}
            />
        </div>
    );
}
``` 