import { loggerService } from '../../services/logger.service';
import { createInput, WithInputOptions } from './builderElements/inputBuilderElement';
import { createSelect, WithSelectConfig } from './builderElements/inputSelectElement';
import { CSSProperties } from 'react';
import { createSubmitButtonElement, SubmitButtonConfig } from './builderElements/submitButtonElement';
import { FormSectionBuilder, FormSectionConfig } from './builderElements/formSectionBuilder';
import { CheckboxProps, FormCheckbox } from './builderElements/checkBoxElement';

export class FormBuilder {
  public elements: JSX.Element[] = [];
  public section: FormSectionBuilder | null = null;
  private tempElements: JSX.Element[] = [];
  private sectionCount = 0;

  public constructor(private readonly name?: string) {}

  public static create(name?: string): FormBuilder {
    return new FormBuilder(name);
  }

  public withInput(config: WithInputOptions, cssProperties?: CSSProperties): this {
    const input = createInput(config, cssProperties);

    if (this.section) {
      this.section.addElements(input);
    } else {
      this.tempElements.push(input);
    }

    return this;
  }

  public withSelect(config: WithSelectConfig, cssProperties?: CSSProperties): this {
    const select = createSelect(config, cssProperties);

    if (this.section) {
      this.section.addElements(select);
    } else {
      this.tempElements.push(createSelect(config, cssProperties));
    }

    return this;
  }

  public withCheckbox(config: CheckboxProps): this {
    const checkbox = <FormCheckbox {...config} key={config.key ?? config.id ?? config.name}/>;

    if (this.section) {
      this.section.addElements(checkbox);
    } else {
      this.tempElements.push(checkbox);
    }

    return this;
  }

  public withSubmitButton(config: SubmitButtonConfig): this {
    const button = createSubmitButtonElement(config);

    if (this.section) {
      this.section.addElements(button);
    } else {
      this.tempElements.push(button);
    }

    return this;
  }

  public withSectionStart(config: FormSectionConfig = { component: 'section', withDivider: true }): this {
    this.createSectionFromTempElements();

    if (this.section) {
      throw new Error('Can not open new section inside existing one');
    }

    this.section = FormSectionBuilder.create({ ...config, index: this.sectionCount });
    this.sectionCount += 1;

    return this;
  }

  public withSectionEnd(): this {
    if (this.section) {
      this.elements.push(this.section.build());
      this.section = null;
    }

    return this;
  }

  private createSectionFromTempElements(): this {
    if (this.tempElements.length) {
      const section = FormSectionBuilder.create({ index: this.sectionCount }).addElements([...this.tempElements]).build();

      this.tempElements = [];
      this.sectionCount += 1;
      this.elements.push(section);
    }

    return this;
  }

  public build(): () => JSX.Element {
    const { elements } = this;

    this.createSectionFromTempElements();

    if (this.section) {
      this.withSectionEnd();
    }

    return function BuiltForm(): JSX.Element {
      loggerService.log('Built form render');

      return (
        <>{elements}</>
      );
    };
  }
}
