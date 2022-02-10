import { DecimalPipe } from "@angular/common";
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import * as d3 from "d3";
@Component({
    selector: "app-tarjeta-mapa",
    templateUrl: "./tarjeta-mapa.component.html",
    styleUrls: ["./tarjeta-mapa.component.scss"],
})
export class TarjetaMapaComponent implements OnInit {
    constructor(private elRef: ElementRef, private decimalPipe: DecimalPipe) {
        this.hostElement = this.elRef.nativeElement;
    }
    hostElement; // Native element hosting the SVG container
    @Input() svg;
    @Input() data;
    @Input() name = "-";
    @Input() pumps;
    @Input() meta_min = 70;
    @Input() meta_max = 120;
    @Input() title;
    @Input() id;
    @Input() x = 100;
    @Input() y = 100;
    @Output() filter = new EventEmitter();
    @Output() filterBalance = new EventEmitter();
    @Output() filterCumpliento = new EventEmitter();
    @Output() filterByDEnergetico = new EventEmitter();
    borde = 2;
    @Input() viewBoxHeight;
    @Input() viewBoxWidth;
    margin;
    width;
    height;

    rojo = "#FF3C5F";
    amarillo = "#F2C94C";
    verde = "#34DB43";
    gris = "#9C9C9C";

    dataAnt = [];
    ngOnInit(): void {
        // this.createChart();
    }

    ngOnChanges() {
        if (JSON.stringify(this.dataAnt) != JSON.stringify(this.data)) {
            this.dataAnt = this.data;
            this.createChart();
        }
    }

    createChart() {
        this.removeExistingChartFromParent();
        this.setChartDimension();
        this.initProperties();

        const formatNumberSiple = (number: number, decimales: number) => {
            number = parseFloat(number.toFixed(decimales));
            return new Intl.NumberFormat("de-DE").format(number);
        };

        if (this.pumps) {
            this.svg
                .selectAll(".circles")
                .data(this.pumps)
                .enter()
                .append("circle")
                .attr("class", "circles-map-" + this.id)
                .attr("cy", (d, i) => this.y + this.margin.top + 10 + 68)
                .attr("cx", (d, i) => {
                    return this.x + 100 + i * 12;
                })
                .attr("r", 5)
                .style("fill", (d, i) => {
                    if (
                        d.BEP * 100 < this.meta_min ||
                        d.BEP * 100 > this.meta_max
                    )
                        return this.rojo;
                    else {
                        return this.verde;
                    }
                });
        }

        //titulo
        let t = this.svg
            .append("text")
            .style("font", "4.5px aria-label, sans-serif")
            .style("text-anchor", "middle")
            .attr(
                "transform",
                `translate(${this.x + 100},${this.y + this.margin.top + 10})`
            )
            .attr("dy", ".35em")
            .style("font-size", "0.9rem")
            .style("font-weight", "600")
            .attr("fill", "#474747")
            .style("cursor", "pointer")
            .on("click", () => {
                this.filter.emit(this.id);
            })
            .text(this.title.toUpperCase());

        let heightText = 0;
        this.data.forEach((element) => {
            heightText += 24;
            let texts = this.svg
                .append("text")
                .style("font", "4.5px aria-label, sans-serif")
                .style("text-anchor", "start")
                .attr("x", this.x + 10)
                .attr("y", this.y + this.margin.top + 10 + heightText)
                .style("font-size", "0.9rem")
                .style("font-weight", "400")
                .attr("fill", "#474747")
                .style("cursor", "pointer")
                .style("text-decoration", () =>
                    element.linck ? "underline" : "none"
                )
                .on("click", () => {
                    if (element.linck && element.key == "BALANCE")
                        this.filterBalance.emit(this.id);
                    else if (element.linck && element.key == "PROGRAMA")
                        this.filterCumpliento.emit(this.id);
                    else if (element.linck && element.key == "D.ENERGÉTICO")
                        this.filterByDEnergetico.emit(this.id);
                    else this.filter.emit(this.id);
                })
                .on("mouseover", (d) => {
                    if (element.linck) {
                        texts.attr("fill", "blue");
                    }
                })
                .on("mouseout", (d) => {
                    if (element.linck) texts.attr("fill", "#474747");
                })
                .text(element.key);

            this.svg
                .append("text")
                .style("font", "4.5px aria-label, sans-serif")
                .style("text-anchor", "start")
                .attr("x", this.x + 120)
                .attr("y", this.y + this.margin.top + 10 + heightText)
                .style("font-size", "0.9rem")
                .style("font-weight", "400")
                .attr("fill", element.color)
                .style("cursor", "pointer")
                .on("click", () => {
                    this.filter.emit(this.id);
                })
                .text(
                    element.value != null
                        ? formatNumberSiple(element.value, 2) +
                              " " +
                              element.unidad.toLowerCase()
                        : ""
                );
        });
    }

    removeExistingChartFromParent() {
        // !!!!Caution!!!
        // Make sure not to do;
        //     d3.select('svg').remove();
        // That will clear all other SVG elements in the DOM
        d3.select("text" + this.name).remove();
        d3.select(".tarjeta" + this.name).remove();
        d3.select(".circles-map-" + this.id).remove();
    } //Fin removeexistingChart

    setChartDimension() {
        // Se hace responsive el svg  setChartDimension()

        /* this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', this.viewBoxWidth)
      .attr('height', this.viewBoxHeight) */
        //Responsive
        /* .attr('width', '100%')
     .attr('height', '100%')
     .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
     */

        //-----------------------------------------------------------------------
        // Agregar elemento grafico
        // d3.select(this.hostElement).append('svg');
        this.svg
            .append("rect")
            .attr("class", "tarjeta" + this.name)
            .attr("height", this.viewBoxHeight)
            .attr("width", this.viewBoxWidth)
            .on("click", () => {
                this.filter.emit(this.id);
            })
            .attr(
                "viewBox",
                "0 0 " + this.viewBoxWidth + " " + this.viewBoxHeight
            )
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("fill", "#FDFEFF")
            .style("cursor", "pointer")
            .attr("filter", "drop-shadow(0px 4px 3px rgb(0 0 0 / 58%))")
            .attr("transform", `translate(${this.x},${this.y})`);
    } //Fin setChart

    initProperties() {
        //---Inicializar propiedades
        this.margin = { top: 3, right: 2, bottom: 0, left: this.borde };

        this.width = this.viewBoxWidth - this.margin.left - this.margin.right;

        this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;
    } //Fin init
}
