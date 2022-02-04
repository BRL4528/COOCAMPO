/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast, TypeOptions } from 'react-toastify';

export function apllyToast(
  types: TypeOptions,
  text: {} | null | undefined,
  positions?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left',
) {
  toast(text, {
    position: positions || 'bottom-right',
    autoClose: 5000,
    type: types,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
