import React, { useState, useRef, KeyboardEvent, HTMLInputTypeAttribute } from 'react';

interface InputChipProps {
    chips: string[];
    onChipsChange: (chips: string[]) => void;
    placeholder?: string;
    chipColor?: string;
    textColor?: string;
    removeIcon?: React.ReactNode;
    className?: string;
    inputClassName?: string;
    chipClassName?: string;
    name?: string;
    value?: string[];
    default?: string[];
}

const InputChip: React.FC<InputChipProps> = ({
    chips = [],
    onChipsChange,
    placeholder = 'Type and press Enter...',
    chipColor = 'bg-blue-100',
    textColor = 'text-blue-800',
    removeIcon = '×',
    className = '',
    inputClassName = '',
    chipClassName = '',
    ...props
}) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            // Prevent duplicates
            if (!chips.includes(inputValue.trim())) {
                const newChips = [...chips, inputValue.trim()];
                onChipsChange(newChips);
                setInputValue('');
            }
            e.preventDefault();
        } else if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
            // Remove last chip when backspace is pressed on empty input
            const newChips = chips.slice(0, -1);
            onChipsChange(newChips);
        }
    };

    const removeChip = (index: number) => {
        const newChips = chips.filter((_, i) => i !== index);
        onChipsChange(newChips);
    };

    return (
        <div
            // className={`flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 ${className}`}
            className={`chip-set-scrollbar flex overflow-x-auto items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 ${className}`}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Chips */}
            {chips.map((chip, index) => (
                <div
                    key={index}
                    className={`flex items-center ${chipColor} ${textColor} rounded-full py-1 px-3 text-sm font-medium ${chipClassName}`}
                >
                    {chip}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeChip(index);
                        }}
                        className={`ml-1.5 ${textColor} hover:opacity-70 focus:outline-none`}
                        aria-label={`Remove ${chip}`}
                    >
                        {removeIcon}
                    </button>
                </div>
            ))}

            {/* Input */}
            <input
                ref={inputRef}
                type="text"
                name={props.name}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 min-w-[100px] outline-none bg-transparent ${inputClassName}`}
                placeholder={chips.length === 0 ? placeholder : ''}
            />
        </div>
    );
};

export default InputChip;