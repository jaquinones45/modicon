import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import * as d3 from "d3";
@Component({
    selector: "app-scale-bar-difference",
    templateUrl: "./scale-bar-difference.component.html",
    styleUrls: ["./scale-bar-difference.component.scss"],
})
export class ScaleBarDifferenceComponent implements OnInit {
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
    ngOnInit(): void {
        this.createChart();
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
            .selectAll(".texts")
            .data([this.goal_min, this.goal, this.goal_max])
            .enter()
            .append("text")
            .text((d) => d + "")
            .attr("x", (d) => xScale(d))
            .attr("y", this.viewBoxHeight / 2)
            .attr("fill", "#828282")
            .style("font-size", "10px")
            .style("text-anchor", "middle")
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
        this.viewBoxHeight = 10;
        this.viewBoxWidth = 180;
        this.svg = d3
            .select(this.hostElement)
            .append("svg")
            .attr("width", "100%")
            .attr(
                "viewBox",
                "0 0 " + this.viewBoxWidth + " " + this.viewBoxHeight
            )
            // .attr('width', this.viewBoxWidth)
            .attr("height", this.viewBoxHeight);
      
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
            top: this.viewBoxHeight * 0.35,
            right: 15,
            bottom: this.viewBoxHeight * 0.35,
            left: 15,
        };
        this.width = this.viewBoxWidth - this.margin.left - this.margin.right;
        this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;
    } //Fin init
}
