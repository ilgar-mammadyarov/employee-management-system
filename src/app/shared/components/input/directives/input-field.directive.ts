import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[appInputField]',
  standalone: true,
})
export class InputFieldDirective {
  @HostBinding('class') get classList(): string {
    return 'app-input-field';
  }
}
