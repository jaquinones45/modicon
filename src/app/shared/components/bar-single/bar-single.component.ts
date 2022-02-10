import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation,
} from "@angular/core";
import * as d3 from "d3";
@Component({
    selector: "app-bar-single",
    templateUrl: "./bar-single.component.html",
    styleUrls: ["./bar-single.component.scss"],
})
export class BarSingleComponent implements OnChanges {
    //-----Declarar variables utilizadas.
    hostElement; // Native element hosting the SVG container
    svg; // Top level SVG element
    g; // SVG Group element
    viewBoxHeight;
    viewBoxWidth;
    margin;
    width;
    height;
    @Input() data;
    @Input() meta_min = 70;
    @Input() meta_max = 120;
    alto: any;
    rojo: "#FF3C5F";
    amarillo: "#F2C94C";
    verde: "#34DB43";
    gris: "#9C9C9C";

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

        const xScale = d3
            .scaleLinear()
            .domain([0, 100])
            .range([this.margin.left, this.margin.left + this.width]);

        this.svg
            .append("rect")
            .attr("class", "rects")
            .attr("transform", `translate(0,${this.margin.top})`)
            .attr("x", this.margin.left)
            .attr("width", xScale(100))
            .attr("height", this.alto)
            .style("fill", "#F7F7F7");

        this.svg
            .append("rect")
            .attr("class", "rects")
            .attr("transform", `translate(0,${this.margin.top})`)
            .attr("x", this.margin.left)
            .attr("width", () => {
                if (this.data <= 100) return xScale(this.data);
                else return xScale(100);
            })
            .attr("height", this.alto)
            .style("fill", "#1561C0");

        this.svg
            .append("line")
            .attr("x1", xScale(this.meta_min))
            .attr("x2", xScale(this.meta_min))
            .attr("y1", 0)
            .attr("y2", this.viewBoxHeight)
            .attr("stroke", "#828282")
            .attr("stroke-width", 1);
        // .style('stroke-dasharray', '3, 3');
        this.svg
            .append("line")
            .attr("x1", xScale(this.meta_max))
            .attr("x2", xScale(this.meta_max))
            .attr("y1", 0)
            .attr("y2", this.viewBoxHeight)
            .attr("stroke", "#828282")
            .attr("stroke-width", 1);
        // .style('stroke-dasharray', '3, 3');
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
        this.viewBoxHeight = 20;
        this.viewBoxWidth = 200;
        this.svg = d3
            .select(this.hostElement)
            .append("svg")
            .attr("width", "100%")
            .attr("height", this.viewBoxHeight)
            .attr(
                "viewBox",
                "0 0 " + this.viewBoxWidth + " " + this.viewBoxHeight
            );
        // .attr('width', this.viewBoxWidth)

        //Responsive
        // .attr('width', '100%')
        // .attr('height', '100%')
        // .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);

        //-----------------------------------------------------------------------
        // Agregar elemento grafico
        this.g = this.svg.append("g").attr("transform", "translate(0,0)");
    } //Fin setChart

    private initProperties() {
        //---Inicializar propiedades
        this.alto = this.viewBoxHeight * 0.5;
        // this.alto = 9.39;
        this.margin = {
            top: this.viewBoxHeight * 0.25,
            right: 0,
            bottom: this.viewBoxHeight * 0.25,
            left: 0,
        };
        this.width = this.viewBoxWidth - this.margin.left - this.margin.right;
        this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;
    } //Fin init
}
