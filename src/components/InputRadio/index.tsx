/* eslint-disable no-param-reassign */
// import React, {
//   InputHTMLAttributes,
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
// } from 'react';
// import { IconBaseProps } from 'react-icons';
// import { FiAlertCircle } from 'react-icons/fi';
// import { useField } from '@unform/core';

// import { Container, Error } from './styles';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   name: string;
//   value?: string;
//   icon?: React.ComponentType<IconBaseProps>;
// }

// const Input: React.FC<InputProps> = ({ name, value, icon: Icon, ...rest }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [isFocused, setIsFocused] = useState(false);
//   const [isFilled, setIsFilled] = useState(false);

//   const { fieldName, defaultValue, registerField, error } = useField(name);

//   const handleInputFocus = useCallback(() => {
//     setIsFocused(true);
//   }, []);

//   const handleInputBlur = useCallback(() => {
//     setIsFocused(false);
//     setIsFilled(!!inputRef.current?.value);
//   }, []);

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: inputRef.current,
//       path: 'value',
//     });
//   }, [fieldName, registerField]);

//   return (
//     <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
//       {Icon && <Icon size={20} />}
//       <input
//         type="radio"
//         name={name}
//         value={value}
//         onFocus={handleInputFocus}
//         onBlur={handleInputBlur}
//         defaultValue={defaultValue}
//         ref={inputRef}
//         {...rest}
//       />
//       {error && (
//         <Error title={error}>
//           <FiAlertCircle color="#c53030" size={20} />
//         </Error>
//       )}
//     </Container>
//   );
// };

// export default Input;
import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}
const CheckboxInput: React.FC<Props> = ({ name, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <div>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};
export default CheckboxInput;
