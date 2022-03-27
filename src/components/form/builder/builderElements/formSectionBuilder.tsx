import { CSSProperties } from 'react';
import { FormSection } from './components/FormSection';

const constructorToken = Symbol('FormSectionBuilder');

export interface FormSectionConfig {
  component?: 'section' | 'div';
  styles?: CSSProperties;
  withDivider?: boolean;
  index?: number;
  heading?: string;
  shrinkable?: boolean;
}

export class FormSectionBuilder {
  private elements: JSX.Element[] = [];

  public constructor(private readonly config: FormSectionConfig = {}, token: symbol) {
    if (token !== constructorToken) {
      throw new Error('Invalid constructor');
    }
  }

  public static create(config: FormSectionConfig): FormSectionBuilder {
    return new FormSectionBuilder(config, constructorToken);
  }

  public addElements(elements: JSX.Element[] | JSX.Element): this {
    this.elements = [...this.elements, ...(Array.isArray(elements) ? elements : [elements])];

    return this;
  }

  public build(): JSX.Element {
    return (
      <FormSection key={`section_${this.config.index}`} {...this.config}>{this.elements}</FormSection>
    );
  }
}
