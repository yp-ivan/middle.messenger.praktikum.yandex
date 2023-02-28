import Block from 'core/Block';
import { ValidateType, ValidateRegex, errorsTexts } from './validateType';

type ValidateItem = {
  rule: ValidateType;
  value: string;
};

function getType(obj: Record<string, string | RegExp>, type: ValidateType) {
  return Object
    .entries(obj)
    .filter(([key]) => key === type)
    .flat()[1];
}

export function validateControl(rules: ValidateItem[]): unknown | string {
  for (let i = 0; i < rules.length; i++) {
    const { rule, value } = rules[i];
    const ruleType = getType(ValidateRegex, rule);
    if (ruleType !== undefined && !(ruleType as RegExp).test(value)) {
      return (getType(errorsTexts, rule) as string);
    }
  }
}

export function validateForm(refs: { [key: string]: Block }) {
  let hasError = false;
  Object.entries(refs).forEach((ref: unknown) => {
    if (ref[0].endsWith('Input')) {
      const { value }: { value: string } = ref[1].refs.inputRef.getContent() as HTMLInputElement;
      const rule = ref[1].props.validateRule;
      const error = validateControl([{ rule, value }]);
      ref[1].refs.errorRef.setProps({
        text: error
      });
      if (error) {
        hasError = true;
      }
    }
  });
  return hasError;
}

export function getFormValues(refs, printConsole = false) {
  const values: Array<Record<string, any>> = [];
  Object.entries(refs).forEach((ref: unknown) => {
    if (ref[0].endsWith('Input')) {
      const { name }: { name: string } = ref[1].props;
      const { value }: { value: string } = ref[1].refs.inputRef.getContent() as HTMLInputElement;
      values.push({ name, value });
    }
  });
  if (printConsole && values.length) {
    // Выводим в консоль содержимое полей формы (согласно чек-листу)
    console.log('formValues', values);
  }
  return values;
}
