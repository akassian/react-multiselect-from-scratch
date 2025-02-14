import React, { useState, useEffect, useCallback, useRef } from 'react';

const Dropdown = ({
    options,
    multiselect,
    defaultSelected,
    selectedOptions,
    onSelect,
    label = '',
    placeholder = 'Select...',
    open,
    onToggleDropdown
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultSelected || (multiselect ? [] : ''));
    const isControlled = open !== undefined;
    const dropdownOpen = isControlled ? open : isOpen;
    const dropdownSelected = isControlled ? selectedOptions : selected;
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            if (isControlled && dropdownOpen) {
                onToggleDropdown();
            } else {
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        // cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleSelect = useCallback((option) => {
        if (multiselect) {
            const newSelection = dropdownSelected.includes(option)
                ? dropdownSelected.filter(item => item !== option)
                : [...dropdownSelected, option];

            if (isControlled) {
                onSelect(newSelection);
            } else {
                setSelected(newSelection);
            }
        } else {
            if (isControlled) {
                onSelect(option);
            } else {
                setSelected(option);
            }
            handleToggleDropdown();
        }
    }, [dropdownSelected, multiselect, onSelect]);

    const handleToggleAll = () => {
        if (multiselect) {
            if (isControlled) {
                onSelect(dropdownSelected.length === options.length ? [] : options);
            } else {
                setSelected(dropdownSelected.length === options.length ? [] : options);
            }
        }
    };

    const isSelected = (option) => {
        return multiselect ? dropdownSelected.includes(option) : dropdownSelected === option;
    };

    const handleToggleDropdown = () => {
        if (isControlled) {
            onToggleDropdown();
        } else {
            setIsOpen(prevOpen => !prevOpen);
        }
    };

    const clearSingleSelect = () => {
        if (isControlled) {
            onSelect('')
            onToggleDropdown();
        } else {
            setSelected('');
            setIsOpen(prevOpen => !prevOpen);
        }
    }

    const getPlaceholderText = () => {
        if (multiselect) {
            return dropdownSelected.length > 0 ? dropdownSelected.join(', ') : placeholder;
        } else {
            return dropdownSelected || placeholder;
        }
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className={`dropdown ${dropdownOpen ? 'active' : ''}`} onClick={handleToggleDropdown}>
                {label && <label>{label}</label>}
                <div className="dropdown-selected">
                    {getPlaceholderText()}
                </div>
                <div className="dropdown-arrow">
                    {dropdownOpen ? '▲' : '▼'}
                </div>
            </div>
            {dropdownOpen && (
                <div className="dropdown-options">
                    {multiselect && (
                        <div className="dropdown-option" onClick={handleToggleAll}>
                            {dropdownSelected.length === options.length ? 'Deselect All' : 'Select All'}
                        </div>
                    )}
                    {!multiselect && (
                        <div className="dropdown-option" onClick={clearSingleSelect}>
                            <i>None</i>
                        </div>
                    )}
                    {options.map(option => (
                        <div
                            key={option}
                            className={`dropdown-option ${isSelected(option) ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {multiselect && (
                                <input
                                    type="checkbox"
                                    checked={dropdownSelected.includes(option)}
                                    onChange={() => handleSelect(option)}
                                />
                            )}
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
