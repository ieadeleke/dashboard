import Select, { Props } from 'react-select';

export type BaseSelectOption = {
    id: string,
    label: string,
    value: string
}

export const BaseSelect = (props: Props<any>) => {
    return <Select
        styles={{
            option: (baseStyles, state) => ({
                ...baseStyles,
                background: state.isFocused ? '#fff' : '#fff',
                fontFamily: 'Inter',
                color: 'black',
                cursor: state.isFocused ? 'pointer' : 'default',
            }),
            multiValue: (baseStyles) => ({
                ...baseStyles,
                background: 'white',
                marginRight: '8px',
                color: 'white',
                marginTop: '4px',
                marginBottom: '4px',
            }),
            multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                fontSize: '14px',
                color: 'gray',
                paddingLeft: '10px',
            }),
            singleValue: (baseStyles) => ({
                ...baseStyles,
                fontSize: '14px',
                color: 'gray',
                paddingLeft: '10px',
            }),
            multiValueRemove: () => ({
                paddingLeft: '2px',
                paddingRight: '2px',
            }),
            menu: (baseStyles) => ({
                ...baseStyles,
                background: '#fff',
                marginTop: '0',
                zIndex: '20',
            }),
            input: (baseStyles) => ({
                ...baseStyles,
                color: 'gray',
                backgroundColor: 'transparent'
            }),
            valueContainer: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'white',
                borderRadius: 16
            }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? 'gray' : 'gray',
                "&:hover": {
                    borderColor: "var(--color-primary)"
                },
                borderWidth: 1,
                boxShadow: 'none',
                backgroundColor: 'var(--background-primary)'
            }),
        }}
        {...props}
    />
}