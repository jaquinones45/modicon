import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import * as d3 from "d3";
@Component({
    selector: "app-tarjetas",
    templateUrl: "./tarjetas.component.html",
    styleUrls: ["./tarjetas.component.scss"],
})
export class TarjetasComponent implements OnInit {
    constructor() {}
    @Input() data;
    @Input() sistemas: Object[];
    @Output() filterBySistema = new EventEmitter();
    @Output() filterByBalance = new EventEmitter();
    porcentaje: any = {};
    programa: any = {};
    balance: any = {};
    svg;
    ngOnInit(): void {
        this.svg = d3.select("#map221");
    }

    ngOnChanges() {
        console.log(this.sistemas)
        this.svg = d3.select("#map221");
    }

    valLimit(value: number, type: string, sistema: number) {
        let max, min;
        max = this.data.limit.filter(
            (c) =>
                c.equipo.toLowerCase() == type &&
                c.parametro == "Maximo" &&
                c.sistema == sistema
        );
        min = this.data.limit.filter(
            (c) =>
                c.equipo.toLowerCase() == type &&
                c.parametro == "Minimo" &&
                c.sistema == sistema
        );

        max = max.length > 0 ? max[0].valor : 0;
        min = min.length > 0 ? min[0].valor : 0;
        if (value >= min && value <= max) return "#34DB43";
        return "#FF3C5F";
    }

    valTypeUnit(type: string, sistema: number) {
        return this.data.limit.filter(
            (c) =>
                c.equipo.toLowerCase() == type &&
                c.parametro == "Minimo" &&
                c.sistema == sistema
        );
    }

    coordenada(location, type) {
        if (type) return location.split(',')[1]
        else return location.split(',')[0]
    }

    makeData(sistema) {
        let data = [
            {
                key: "D.ENERGÉTICO",
                value: 0,
                unidad: "0%",
                color: "#34DB43",
                linck: false,
            },
            {
                key: "PROGRAMA",
                value: 0,
                unidad: "0%",
                color: "#34DB43",
                linck: false,
            },
            {
                key: "BALANCE",
                value: 0,
                unidad: "0%",
                color: "#34DB43",
                linck: false,
            },
        ];

        return data;
    }

    emitfilterBySistema(sistema) {
        this.filterBySistema.emit(sistema);
    }

    emitfilterBalance(sistema) {
        this.filterByBalance.emit(sistema);
    }    
}
