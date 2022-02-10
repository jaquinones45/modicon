import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation,
} from "@angular/core";
import * as d3 from "d3";
@Component({
    selector: "app-bar-pumps",
    templateUrl: "./bar-pumps.component.html",
    styleUrls: ["./bar-pumps.component.scss"],
})
export class BarPumpsComponent implements OnChanges {
    //-----Declarar variables utilizadas.
    hostElement; // Native element hosting the SVG container
    svg;
    g; // SVG Group element
    viewBoxHeight;
    viewBoxWidth;
    margin;
    width;
    height;
    @Input() data;
    @Input() name = "";
    @Input() meta_min = 70;
    @Input() meta_max = 120;
    alto = 5;
    rojo = "#FF3C5F";
    amarillo = "#F2C94C";
    verde = "#34DB43";
    gris = "#9C9C9C";

    constructor(private elRef: ElementRef) {
        this.hostElement = this.elRef.nativeElement;
    }
    ngOnChanges(): void {
        if (this.data != null) {
            this.createChart();
        }
    }

    createChart() {
        this.removeExistingChartFromParent();
        this.setChartDimension();
        this.initProperties();

        this.svg
            .selectAll(".circles")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("class", "circles")
            .attr("cy", this.margin.top + 5)
            .attr("cx", (d, i) => i * (this.alto + 10) + 5)
            .attr("r", this.alto)
            .style("fill", (d) => {
                if (d.BEP * 100 < this.meta_min || d.BEP * 100 > this.meta_max)
                    return this.rojo;
                else return this.verde;
            });

        this.svg
            .append("text")
            .text(this.name)
            .attr("x", 0)
            .attr("y", 5)
            .attr("fill", "#828282")
            .style("font-size", "10px")
            .style("text-anchor", "start")
            .attr("dy", ".35em");
    }

    private removeExistingChartFromParent() {
        // !!!!Caution!!!
        // Make sure not to do;
        //     d3.select('svg').remove();
        // That will clear all other SVG elements in the DOM
        d3.select(this.hostElement).select("svg").remove();
    } //Fin removeexistingChart

    //-----
    private setChartDimension() {
        // Se hace responsive el svg  setChartDimension()
        this.viewBoxHeight = this.name == "" ? 10 : 30;
        this.viewBoxWidth = 20 * this.data.length;
        this.svg = d3
            .select(this.hostElement)
            .append("svg")
            .attr("width", this.viewBoxWidth)
            .attr("height", this.viewBoxHeight);

        //Responsive
        /* .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight); */

        //-----------------------------------------------------------------------
        // Agregar elemento grafico
        this.g = this.svg.append("g").attr("transform", "translate(0,0)");
    } //Fin setChart

    private initProperties() {
        //---Inicializar propiedades
        this.margin = {
            top: this.name == "" ? 0 : 15,
            right: 0,
            bottom: 0,
            left: 0,
        };
        this.width = this.viewBoxWidth - this.margin.left - this.margin.right;
        this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;
    } //Fin init
}
