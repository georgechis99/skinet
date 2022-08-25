export interface IMultiselectDropdownItem {
    name: string;
    checked: boolean;
}

export class MultiselectDropdownItem implements IMultiselectDropdownItem {
    name: string;
    checked: boolean;

    constructor(name: string, checked: boolean = false) {
        this.name = name;
        this.checked = checked;
    }


}