/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
    'https://samasc-nic-cooasgo.prismic.io/api/v2',
    {
      req,
      accessToken:
        'MC5ZVlcwU3hBQUFDTUE5b2dL.77-9MmNZVO-_ve-_ve-_ve-_vVMQ77-977-977-9Z--_vVk2IO-_vSnvv716OO-_ve-_vUU777-9K1NF',
    },
  );

  return prismic;
}
