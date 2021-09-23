/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast, TypeOptions } from 'react-toastify';

export function apllyToast(types: TypeOptions, text: string) {
  toast(text, {
    position: 'bottom-right',
    autoClose: 5000,
    type: types,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
