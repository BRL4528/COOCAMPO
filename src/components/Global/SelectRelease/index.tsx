/* eslint-disable react/jsx-one-expression-per-line */
import { useField } from '@unform/core';
import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
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
    >
      <div>
        <p>{label}</p>
        <select
          value=""
          id={name}
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
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
        </select>
      </div>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
