import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-var-num",
    templateUrl: "./var-num.component.html",
    styleUrls: ["./var-num.component.scss"],
})
export class VarNumComponent implements OnInit {
    @Input() value;
    @Input() text;
    @Input() min = 97;
    @Input() max = 110;
    constructor() {}

    ngOnInit(): void {}
    ngOnChanges() {
        this.value = parseFloat(this.value);
    }
}
