# Dropdown component

Generic and lightweight React dropdown component.


## Installation

With yarn
```
yarn add @rootre/forms-dropdown
```

or with npm

```
npm install @rootre/forms-dropdown
```

## Usage

### Basic usage:

```jsx harmony
import React from 'react';
import Dropdown from '@rootre/forms-dropdown';
import '@rootre/forms-dropdown/styles.css';

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

### Usage with controllers:

You can pass react useState instances to control dropdown's behavior:

```jsx harmony
import React, {useState} from 'react';
import Dropdown from '@rootre/forms-dropdown';
import '@rootre/forms-dropdown/styles.css';

export default function App() {
    const items = [
        {label: 'Cat'},
        {label: 'Dog'},
        {label: 'Rabbit'},
        {label: 'Parrot'},
    ];

    const activeItemController = useState(items[0]); // bare in mind that controllers override initials
    const openController = useState(false);
    const [, setActiveItem] = activeItemController;
    const [, setOpen] = openController;

    return (
        <div>
            <button onClick={() => setActiveItem(items[2])}>Set Rabbit</button>
            <button onClick={() => setOpen(true)}>Open dropdown</button>
            <Dropdown
                items={items}
                controllers={{
                    active: activeItemController,
                    open: openController,
                }}
            />
        </div>
    );
}
```

#### Note

> Controllers override initials, so if you want set controller 
for active item (controllers.active) you set initial active item 
in `useState(initialItem)`

## Styling

Component classes are bundled via CSS modules and uses local ident name: `dropdown_[local]`

### CSS file:

> import '@rootre/forms-dropdown/styles.css';

Importing whole css file get you all basic formatting.

Optionally, if you use overrides: `itemTemplate` or `itemsTemplate` you could use 
defaults from original sass file:

### Sass file:

> import '@rootre/forms-dropdown/styles.scss';

It gets you following defaults:

```css
.activeItem {} /* selected item */
.content {} /* wrapping div of opened dropdown contents */
.dropdown {} /* the whole dropdown */
.item {} /* item in opened dropdown list */
.list {} /* wrapping div of opened dropdown list */
```

## Demo

Check out basic [demo page](https://rootre.github.io/forms-dropdown/)

## Props

#### activeItemTemplate: `(label: string) => React.Component`

> default:

```jsx harmony
function activeItemTemplate(label) {
    return <span>{label}</span>;
}
```

#### afterChange: `(item: object) => void`

> default: () => {}

#### afterOpen: `(isOpen: boolean) => void`

> default: () => {}

#### controllers: `object`
#### controllers.active: `Array.<function>`

> default: `React.useState(null)`

Controller for getting/setting active item

#### controllers.open: `Array.<function>`

> default: `React.useState(false)`

Controller for opening/closing dropdown

#### disabled: `boolean`

> default: `false`

Passing true renders the component disabled/unclickable

#### hasError: `boolean`

> default: `false`

If true, an error class is added. Default styling paints borders in red 

#### initialIsOpened: `boolean`

> default: `false`

If dropdown should be rendered open or not

#### initialItem: `object`

> default: `null`

Item that will be shown on first render

#### itemTemplate: `(item: object, handleSelect: function, index: number, labelKey: string) => React.Component`

> default:
```jsx harmony
function itemTemplate(item, handleSelect, index, labelKey) {
    return (
        <div key={index} onClick={() => handleSelect(item)}>
            <span>{item[labelKey]}</span>
        </div>
    );
}
```

Use for custom formatting items in dropdown

#### itemsTemplate: `(items: object[], handleSelect: function, labelKey: string, itemTemplate: function) => React.Component`

> default:
```jsx harmony
function itemsTemplate(items, handleSelect, labelKey, itemTemplate) {
    return (
        <div className={styles.list}>
            {items.map((item, index) => itemTemplate(item, handleSelect, index, labelKey))}
        </div>
    )
}
```

Use if you want to override the whole list of items in dropdown

#### items: `Array.<object>`

> default: `[]`

Can be array of any objects you want, but each object has to have `labelKey` property set

#### labelKey: `string`

> default: `label`

Determines which item's object property will be used for rendering label inside dropdown 

#### placeholder: `string`

> default: `''`

A placeholder text for dropdown