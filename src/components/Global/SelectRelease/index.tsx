/* eslint-disable react/jsx-one-expression-per-line */
import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { useField } from '@unform/core';

import { Select as SelectChakra, Tooltip } from '@chakra-ui/react';
import { SetToggleThemeContext } from '../../../contexts/SetToggleThemeContext';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  const { toggleTheme } = useContext(SetToggleThemeContext);
  const inputRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      className="select-block"
      theme={toggleTheme}
    >
      <div>
        <p>{label}</p>
        <Tooltip hasArrow label={error} bg="#c53030">
          <SelectChakra
            id={name}
            {...rest}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            size="md"
            isInvalid={!!error}
          >
            <option value="" disabled hidden>
              Selecione uma opção
            </option>

            {options.map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </SelectChakra>
        </Tooltip>
      </div>
    </Container>
  );
};

export default Select;
