import { MyButtonElement } from './index';

export interface RegisterOptions {
  prefix?: string;
}

const PREFIX_PATTERN = /^[a-z][a-z0-9]*$/;

export function register(options: RegisterOptions = {}) {
  const { prefix = 'my' } = options;
  if (!PREFIX_PATTERN.test(prefix)) {
    throw new TypeError(
      `[@demo/ui-elements] Invalid prefix: "${prefix}". Must match ${PREFIX_PATTERN}.`,
    );
  }
  define(`${prefix}-button`, MyButtonElement);
}

function define(tag: string, ctor: CustomElementConstructor) {
  if (typeof customElements === 'undefined') return;
  if (customElements.get(tag)) return;
  customElements.define(tag, ctor);
}
