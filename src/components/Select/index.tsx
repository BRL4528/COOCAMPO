import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef<any>(null);

  const [isFocused, setFocused] = useState(false);
  const [isFielld, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      // positon: 'absolute',
      // flexDirection: 'column',
      background: state.isSelected ? '#1c9cd9' : '#fff',

      color: '#333',
      ':hover': {
        backgroundColor: '#b6d4f5',
      },
    }),
    control: () => ({
      display: 'flex',
      alignItems: 'center',
      width: 500,

      // Width: ,
    }),
    singleValue: () => ({
      color: '#333',
    }),
  };

  const handleSelectFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setFocused(false);

    setIsFilled(!!selectRef.current);
  }, []);

  return (
    <>
      <Container isFielld={isFielld} isFocused={isFocused}>
        <div>{Icon && <Icon size={20} />}</div>
        <ReactSelect
          styles={customStyles}
          onFocus={handleSelectFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={selectRef}
          classNamePrefix="react-select"
          {...rest}
        />
      </Container>
    </>
  );
};

export default Select;
