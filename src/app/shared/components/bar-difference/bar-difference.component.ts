import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation,
} from "@angular/core";
import * as d3 from "d3";
@Component({
    selector: "app-bar-difference",
    templateUrl: "./bar-difference.component.html",
    styleUrls: ["./bar-difference.component.scss"],
})
export class BarDifferenceComponent implements OnChanges {
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
    @Input() goal_min = 70;
    @Input() goal = 100;
    @Input() goal_max = 120;
    alto: any;
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
        const max = 130;
        const xScale = d3
            .scaleLinear()
            .domain([0, max])
            .range([this.margin.left, this.margin.left + this.width]);

        this.svg
            .append("rect")
            .attr("class", "rects")
            .attr("transform", `translate(0,${this.margin.top + 3.5})`)
            .attr("x", this.margin.left)
            .attr("width", xScale(max))
            .attr("height", this.alto)
            .style("fill", "#F7F7F7");
        this.svg
            .append("line")
            .attr("x1", xScale(this.goal_min))
            .attr("x2", xScale(this.goal_min))
            .attr("y1", 0)
            .attr("y2", this.viewBoxHeight)
            .attr("stroke", "#828282")
            .attr("stroke-width", 1)
            .style("stroke-dasharray", "2,2");
        this.svg
            .append("line")
            .attr("x1", xScale(this.goal))
            .attr("x2", xScale(this.goal))
            .attr("y1", 0)
            .attr("y2", this.viewBoxHeight)
            .attr("stroke", "#828282")
            .attr("stroke-width", 1)
            .style("stroke-dasharray", "2,2");
        this.svg
            .append("line")
            .attr("x1", xScale(this.goal_max))
            .attr("x2", xScale(this.goal_max))
            .attr("y1", 0)
            .attr("y2", this.viewBoxHeight)
            .attr("stroke", "#828282")
            .attr("stroke-width", 1)
            .style("stroke-dasharray", "2,2");

        this.svg
            .append("rect")
            .attr("class", "rects")
            .attr("transform", `translate(0,${this.margin.top})`)
            .attr("x", () => {
                if (this.data > this.goal) return xScale(this.goal);
                else return xScale(this.data);
            })
            .attr("width", Math.abs(xScale(this.goal) - xScale(this.data)))
            .attr("height", 14)
            .style("fill", () => {
                if (this.data < this.goal_min || this.data > this.goal_max)
                    return this.rojo;
                else return this.verde;
            });

        this.svg
            .append("text")
            .text((this.data - this.goal).toFixed(0) + "%")
            .attr("x", xScale(this.goal))
            .attr("y", this.viewBoxHeight / 2 - 3)
            .attr("fill", "#F5F5F5")
            .style("font-size", "11px")
            .style("text-anchor", () => {
                if (this.data > this.goal) return "start";
                else return "end";
            })
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
        this.viewBoxHeight = 30;
        this.viewBoxWidth = 180;
        this.svg = d3
            .select(this.hostElement)
            .append("svg")
            // .attr('width', this.viewBoxWidth)
            .attr("height", this.viewBoxHeight)
            .attr("width", "100%")
            .attr(
                "viewBox",
                "0 0 " + this.viewBoxWidth + " " + this.viewBoxHeight
            );

        //Responsive
        /*  .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight); */

        //-----------------------------------------------------------------------
        // Agregar elemento grafico
        this.g = this.svg.append("g").attr("transform", "translate(0,0)");
    } //Fin setChart

    private initProperties() {
        //---Inicializar propiedades
        this.alto = this.viewBoxHeight * 0.3;
        this.margin = {
            top: 5,
            right: 15,
            bottom: 5,
            left: 15,
        };
        this.width = this.viewBoxWidth - this.margin.left - this.margin.right;
        this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;
    } //Fin init
}
