import Block from 'core/Block';
import { ValidateType, ValidateRegex, errorsTexts } from './validateType';

type ValidateItem = {
  rule: ValidateType;
  value: string;
};

export type FormValue = {
  name: string;
  value: any;
};

const getType = (obj: Record<string, string | RegExp>, type: ValidateType) => {
  return Object
    .entries(obj)
    .filter(([key]) => key === type)
    .flat()[1];
};

export const validateControl = (rules: ValidateItem[]): string => {
  for (let i = 0; i < rules.length; i++) {
    const { rule, value } = rules[i];
    const ruleType = getType(ValidateRegex, rule);
    if (ruleType !== undefined && !(ruleType as RegExp).test(value)) {
      return (getType(errorsTexts, rule) as string);
    }
  }
  return '';
};

export const validateForm = (refs: { [key: string]: Block }) => {
  let isValid = true;
  Object.entries(refs).forEach((ref) => {
    if (ref[0].endsWith('Input')) {
      const { value }: { value: string } = ref[1].getRefs().inputRef.getContent() as HTMLInputElement;
      const rule = (ref[1] as Block).getProps().validateRule;
      const error = validateControl([{ rule, value }]);
      ref[1].getRefs().errorRef.setProps({
        text: error
      });
      if (error) {
        isValid = false;
      }
    }
  });
  return isValid;
};

export const getFormValues = (refs: { [key: string]: Block }, printConsole = true) => {
  const values: FormValue[] = [];
  Object.entries(refs).forEach((ref) => {
    if (ref[0].endsWith('Input')) {
      const { name } = ref[1].getProps();
      const { value }: { value: string } = ref[1].getRefs().inputRef.getContent() as HTMLInputElement;
      values.push({ name, value });
    }
  });
  if (printConsole) {
    // Выводим в консоль содержимое полей формы (согласно чек-листу)
    console.log('formValues', values);
  }
  return values;
};

export const getFormKeyValues = (values: FormValue[]): Indexed => {
  const keyValues: Indexed = {};
  values.forEach((item) => {
    if (keyValues[item.name] === undefined) {
      keyValues[item.name] = item.value;
    }
  });
  return keyValues;
};
