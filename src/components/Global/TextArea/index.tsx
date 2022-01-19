import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { Textarea, Tooltip } from '@chakra-ui/react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<TextAreaProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  // const handleInputFocus = useCallback(() => {
  //   setIsFocused(true);
  // }, []);

  // const handleInputBlur = useCallback(() => {
  //   setIsFocused(false);
  //   setIsFilled(!!inputRef.current?.value);
  // }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <Tooltip hasArrow label={error} bg="#c53030">
        <Textarea
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
          rows={5}
          isInvalid={!!error}
          color="gray.50"
          borderColor="gray.650"
        />
      </Tooltip>
    </div>
  );
};

export default Input;
