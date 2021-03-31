/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default function typesTable(title: string) {
  if (title === '(PPR) % RESULTADO FINANCEIRO') {
    return 'Meta global';
  }
  if (title === '(PPR) RESULTADO LÍQUIDO') {
    return 'Meta global';
  }
  if (title === '(PPR) FATURAMENTO LÍQUIDO') {
    return 'Meta global';
  }
  return 'Meta do setor';
}
