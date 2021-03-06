import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

/**
 * Bare in mind that defined controllers override initial values
 * @param {Function} [activeItemTemplate] - gets active item as a first param, returns React.Component
 * @param {Function} [afterChange] - triggered as side effect after item is changed, gets current item as a first argument, index as second
 * @param {Function} [afterOpen] - triggered as side effect after select is opened or closed, gets first argument boolean isOpen
 * @param {Object} [controllers] - custom controllers, has to respect useState hook api
 * @param {Function} [controllers.active] - controller for setting active item
 * @param {Function} [controllers.open] - controller opening Dropdown
 * @param {Boolean} [disabled]
 * @param {Boolean} [hasError]
 * @param {Boolean} [initialIsOpened]
 * @param {Object} [initialItem] - which item from items arary should be selected
 * @param {Function} [itemTemplate] - gets item as a first param, returns React.Component
 * @param {Function} [itemsTemplate] - gets array of items as a first param, returns array of React.Component(s)
 * @param {Object[]} items
 * @param {String} [labelKey] - key of an item which should be shown in selectbox
 * @param {String} [placeholder]
 * @return {null|React.Component}
 * @constructor
 */
export default function Dropdown(
    {
        activeItemTemplate = _activeItemTemplate,
        afterChange = () => {},
        afterOpen = () => {},
        controllers = {
            active: null,
            open: null,
        },
        disabled = false,
        hasError = false,
        initialIsOpened = false,
        initialItem = null,
        itemTemplate = _itemTemplate,
        itemsTemplate = _itemsTemplate,
        items = [],
        labelKey = 'label',
        placeholder = '',
    }
) {
    const dropdownRef = useRef();
    const [activeItem, setActiveItem] = controllers.active || useState(initialItem);
    const [isOpened, setIsOpened] = controllers.open || useState(initialIsOpened);

    const handleOpen = () => {
        if (disabled) {
            return;
        }

        setIsOpened(isOpened => !isOpened);
    };
    const handleDocumentInteraction = ({target}) => {
        if (!dropdownRef.current || dropdownRef.current.contains(target)) {
            return;
        }

        setIsOpened(false);
    };
    const handleSelect = (item) => {
        if (disabled) {
            return;
        }

        setActiveItem(item);
        setIsOpened(false);
    };

    useEffect(() => {
        afterChange(activeItem, isOpened);
    }, [activeItem]);
    useEffect(() => {
        afterOpen(isOpened);
    }, [isOpened]);
    useEffect(() => {
        if (!activeItem && !placeholder) {
            setActiveItem(items[0]);
        }

        self.document.addEventListener('click', handleDocumentInteraction, true);

        return () => {
            self.document.removeEventListener('click', handleDocumentInteraction, true);
        };
    }, []);

    if (items.length === 0 && !placeholder) {
        return null;
    }

    return (
        <div ref={dropdownRef} className={classNames(styles.dropdown, {
            [styles.disabled]: disabled,
            [styles.error]: hasError,
            [styles.opened]: isOpened,
        })}>
            <div className={styles.activeItem} onClick={handleOpen}>
                {activeItemTemplate(activeItem ? activeItem[labelKey] : placeholder || '...')}
            </div>
            {isOpened && (
                <div className={styles.content}>
                    {itemsTemplate(items, handleSelect, labelKey, itemTemplate)}
                </div>
            )}
        </div>
    );
}

function _activeItemTemplate(label) {
    return <span>{label}</span>;
}

function _itemTemplate(item, handleSelect, index, labelKey) {
    return (
        <div key={index} className={styles.item} onClick={() => handleSelect(item)}>
            <span>{item[labelKey]}</span>
        </div>
    );
}

function _itemsTemplate(items, handleSelect, labelKey, itemTemplate) {
    return (
        <div className={styles.list}>
            {items.map((item, index) => itemTemplate(item, handleSelect, index, labelKey))}
        </div>
    )
}
