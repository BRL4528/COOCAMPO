/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import './styles.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  option: {
    id: string;
    value: string;
    label: string;
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function RadioInput({ name, option, ...rest }: Props) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.find(ref => ref.checked)?.value || '';
      },
      setValue: (refs: HTMLInputElement[], id: string) => {
        const inputRef = refs.find(ref => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <>
      {/* {options.map(option => ( */}
      <div className="displayCollum">
        {option.label}

        <label htmlFor={option.id} key={option.id}>
          <input
            onClick={() => console.log('teste')}
            ref={ref => inputRefs.current.push(ref as HTMLInputElement)}
            id={option.id}
            type="radio"
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />
        </label>
      </div>
      {/* ))} */}
    </>
  );
}
