/* eslint-disable react/no-children-prop */
import React, { useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';
import {
  Input as InputChakra,
  InputProps as InputPropsElement,
  Tooltip,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Container } from './styles';

interface InputProps extends InputPropsElement {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  type?: string;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, type, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Tooltip hasArrow label={error} bg="#c53030">
        <InputGroup>
          {Icon ? (
            <InputLeftElement
              pointerEvents="none"
              children={Icon && <Icon color="gray.300" />}
            />
          ) : (
            ''
          )}

          <InputChakra
            isInvalid={!!error}
            defaultValue={defaultValue}
            type={type}
            ref={inputRef}
            size="md"
            {...rest}
          />
        </InputGroup>
      </Tooltip>
    </Container>
  );
};

export default Input;
