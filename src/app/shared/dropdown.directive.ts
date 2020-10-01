import { Directive, HostListener, HostBinding } from '@angular/core'


@Directive({
    selector: '[appDropdown]'
})
export class DropDownDirective {

    @HostBinding('class.open') isOpen = false;  // open is css class

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}