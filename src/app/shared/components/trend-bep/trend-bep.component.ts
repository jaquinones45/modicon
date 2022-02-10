import {
    Component,
    OnChanges,
    ElementRef,
    Input,
    Output,
    EventEmitter,
} from "@angular/core";
import * as d3 from "d3";
import { DatePipe, DecimalPipe } from "@angular/common";
import { ThirdPartyDraggable } from "@fullcalendar/interaction";
import moment from "moment";

@Component({
    selector: "app-trend-bep",
    templateUrl: "./trend-bep.component.html",
    styleUrls: ["./trend-bep.component.scss"],
})
export class TrendBepComponent implements OnChanges {
    //-----Declarar variables utilizadas.
    hostElement; // Native element hosting the SVG container
    svg; // Top level SVG element
    g; // SVG Group element

    tip;
    barPadding: number;
    x;
    duration;
    xAxis: (g) => any;
    yAxis: (g) => any;
    color;
    barStep: number;
    margin;
    root;
    width;
    height;
    @Input() viewBoxHeight = 50;
    @Input() viewBoxWidth = 250;

    @Input() data: any[];
    @Input() goal = 70;
    @Output() salida = new EventEmitter<any>();
    text_l = "%";
    @Input() hasAxis = false;
    @Input() id = "";

    //---Fin declaracion

    constructor(
        private elRef: ElementRef,
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe
    ) {
        this.hostElement = this.elRef.nativeElement;
    }

    ngOnChanges(): void {
        //Obtener datos
        if (this.data != null) {
            this.createChart();
        }
    }

    createChart(): void {
        this.removeExistingChartFromParent();

        document.querySelectorAll("#tooltip-" + this.id).forEach((element) => {
            let padre = element.parentNode;
            padre.removeChild(element);
        });

        //TOOTIP
        var div = d3
            .select("body")
            .append("div")
            .attr("id", "tooltip-" + this.id)
            .attr("class", "tooltip")
            .style("opacity", 0);

        const pointerentered = () => {
            dot.attr("display", null);
        };

        const formatNumberSiple = (number: number, decimales: number) => {
            number = parseFloat(number.toFixed(decimales));
            return new Intl.NumberFormat("de-DE").format(number);
        };
        const formatNumberSipleP = (number: number, decimales: number) => {
            number = parseFloat(number.toFixed(decimales));
            return new Intl.NumberFormat("de-DE").format(number) + " %";
        };
        const pointermoved = (event) => {
            const I = d3.range(X.length).filter((i) => {
                return zDomain.has(X[i]);
            });

            const [xm, ym] = d3.pointer(event);

            const i = d3.least(I, (i: any) => {
                return Math.hypot(
                    x_time(
                        moment(
                            moment.utc(X[i]).format("YYYY-MM-DD HH:mm:ss")
                        ).valueOf()
                    ) - xm,
                    yScale(Y[i]) - ym
                );
            }); // closest point
            dot.attr(
                "transform",
                `translate(${x_time(
                    moment(
                        moment.utc(X[i]).format("YYYY-MM-DD HH:mm:ss")
                    ).valueOf()
                )},${yScale(Y[i])})`
            );

            this.svg
                .property("value", O[i])
                .dispatch("input", { bubbles: true });

            div.transition().duration(500).style("opacity", 0);
            div.transition().duration(200).style("opacity", 0.9);
            div.html(
                `<p class="font-bold mb-0 pb-0"> ${moment(
                    moment.utc(this.data[i].fecha).format("YYYY-MM-DD HH:mm:ss")
                ).format("HH:mm")} </p>
                <br> BEP: ${formatNumberSiple(Y[i], 2)}`
            )
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY - 28}px`);
        };
        const pointerleft = () => {
            dot.attr("display", "none");
            this.svg.node().value = null;
            div.transition().duration(500).style("opacity", 0);
            this.svg.dispatch("input", { bubbles: true });
        };

        this.svg = d3
            .select(this.hostElement)
            .append("svg")
            .attr("class", "container-chart")
            .on("pointerenter", pointerentered)
            .on("pointermove", pointermoved)
            .on("pointerleave", pointerleft)
            .attr("id", "trend-bep" + this.id)
            .attr("width", "100%")
            .attr(
                "viewBox",
                "0 0 " + this.viewBoxWidth + " " + this.viewBoxHeight
            )
            // .attr("width", this.viewBoxWidth)
            .attr("height", this.viewBoxHeight);

        //Responsive

        /* .attr("height", "100%")
         */

        /*  this.viewBoxHeight = document.getElementById(
            "trend-bep" + this.id
        ).clientHeight;
        this.viewBoxWidth = document.getElementById(
            "trend-bep" + this.id
        ).clientWidth; */
        this.g = this.svg.append("g").attr("transform", "translate(0,0)");

        this.initProperties();
        const dot = this.svg.append("g").attr("display", "none");
        dot.append("circle").attr("r", 2.5);

        const X = d3.map(this.data, (d, i) => d.fecha);
        const Y = d3.map(this.data, (d) => d.valor);
        const O = d3.map(this.data, (d) => d);
        const Z = d3.map(this.data, (d, i) => d.fecha);
        let zDomain: any = Z;
        zDomain = new d3.InternSet(zDomain);

        //ESCALAS

        let max = d3.max(this.data, (d) => d.valor);
        let min = d3.min(this.data, (d) => d.valor);

        if (Math.abs(max - this.goal) > Math.abs(this.goal - min)) {
            min = this.goal - Math.abs(max - this.goal);
        } else {
            max = this.goal + Math.abs(this.goal - min);
        }
        const yScale = d3
            .scaleLinear()
            .domain([min, max])
            .rangeRound([this.height + this.margin.top, this.margin.top]);
        const tickFormatRound = function (num) {
            return num.toFixed(0);
        };
        const diff = max - min;

        //EJE IZQUIERDO
        const yAxis = (g) =>
            g
                .attr("transform", `translate(${this.margin.left},0)`)
                .call(
                    d3
                        .axisLeft(yScale)
                        .ticks(2)
                        .tickValues([min, max])
                        .tickFormat((d: any) => {
                            return formatNumberSipleP(d, 0);
                        })
                        .tickSize(-this.width)
                )
                .call((g) =>
                    g
                        .selectAll(".tick text")
                        .style("fill", "gray")
                        .attr("font-size", 12)
                )
                .call((g) =>
                    g.selectAll(".tick line").style("stroke", "lightgray")
                )
                .call((g) => g.selectAll(".domain").attr("stroke-width", 0));

        if (this.hasAxis) this.svg.append("g").call(yAxis);

        // const ini_date = new Date(this.data[0].fecha);
        // ini_date.setHours(0);
        // ini_date.setMinutes(0);
        // ini_date.setSeconds(0);
        // ini_date.setMilliseconds(0);

        // const end_date = new Date(this.data[0].fecha);
        // end_date.setHours(24);
        // end_date.setMinutes(0);
        // end_date.setSeconds(0);
        const ini_date = moment(
            moment.utc(this.data[0].fecha).format("YYYY-MM-DD") + " 00:00:00"
        );
        const end_date = moment(
            moment.utc(this.data[0].fecha).format("YYYY-MM-DD") + " 23:59:59"
        );

        const x_time = d3
            .scaleTime()
            .domain([ini_date.valueOf(), end_date.valueOf()])
            .range([this.margin.left, this.margin.left + this.width]);

        const tickFormat = function (date) {
            return moment(moment.utc(date)).format("HH:mm");
        };

        //EJE X
        const xAxis = (g) =>
            g
                .attr(
                    "transform",
                    `translate(0,${this.margin.top + this.height})`
                )
                .call(
                    d3
                        .axisBottom(x_time)
                        .tickFormat(tickFormat)
                        .tickValues([
                            ini_date.valueOf(),
                            moment(
                                moment.utc(ini_date).format("YYYY-MM-DD") +
                                    " 12:00:00"
                            ).valueOf(),
                            end_date.valueOf(),
                        ])
                )
                //.call((g) => g.selectAll('.domain').remove())
                .call((g) =>
                    g
                        .selectAll(".tick text")
                        .attr("transform", `translate(0,5)rotate(0)`)
                        .style("text-anchor", "middle")
                        .attr("font-size", 12)
                )
                .call((g) =>
                    g
                        .selectAll(".tick text")
                        .style("fill", "gray")
                        .attr("font-size", 12)
                )
                .call((g) =>
                    g.selectAll(".tick line").style("stroke", "lightgray")
                )
                //.call((g) => g.selectAll('.domain').remove())
                .call((g) =>
                    g
                        .selectAll(".tick text")
                        .attr("transform", `translate(0,5)rotate(0)`)
                        .style("text-anchor", "middle")
                        .attr("font-size", 12)
                )
                .call((g) => g.selectAll(".domain").attr("stroke-width", 0));
        if (this.hasAxis) this.svg.append("g").call(xAxis);
        ///LINEA GRANDIENTE
        var defs = this.svg.append("defs");
        const threshold = this.goal;
        var gradient = defs
            .append("linearGradient")
            .attr("id", "svgGradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", this.viewBoxHeight);
        /* .selectAll("stop")
            .data([
                {
                    offset: yScale(this.goal) / this.viewBoxHeight,
                    color: "#2ED47A",
                },
                {
                    offset: yScale(this.goal) / this.viewBoxHeight,
                    color: "#FF005C",
                },
            ])
            .join("stop")
            .attr("offset", (d) => d.offset)
            .attr("stop-color", (d) => d.color); */
        const limit = 50;
        gradient
            .append("stop")
            .attr("class", "start")
            .attr("offset", limit + "%")
            .attr("stop-color", "#2ED47A")
            .attr("stop-opacity", 1);

        gradient
            .append("stop")
            .attr("class", "end")
            .attr("offset", limit + "%")
            .attr("stop-color", "#FF005C")
            .attr("stop-opacity", 1);

        const lineGenerator = d3
            .line()
            .x((d: any, i) =>
                x_time(
                    moment(
                        moment.utc(d.fecha).format("YYYY-MM-DD HH:mm:ss")
                    ).valueOf()
                )
            )
            .y((d: any) => yScale(d.valor));

        this.svg
            .append("path")
            .attr("d", lineGenerator(this.data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "url(#svgGradient)")
            .style("mix-blend-mode", "multiply");

        //TEXTOS

        if (this.hasAxis)
            this.svg
                .append("text")
                .attr("class", "subtitulo")
                .text(this.text_l)
                .style("fill", "gray")
                .style("text-anchor", "middle")
                .attr(
                    "transform",
                    `translate(${5},${
                        this.margin.top + this.height / 2
                    })rotate(-90)`
                )
                .attr("dy", ".35em");

        this.svg
            .append("line")
            .style("stroke", "#C5C5C5")
            .style("stroke-dasharray", "2, 2")
            .attr("stroke-width", 2)
            .attr("x1", this.margin.left)
            .attr("y1", yScale(this.goal))
            .attr("x2", this.margin.left + this.width)
            .attr("y2", yScale(this.goal));
    } //Fin createChart

    private removeExistingChartFromParent() {
        // !!!!Caution!!!
        // Make sure not to do;
        //     d3.select('svg').remove();
        // That will clear all other SVG elements in the DOM
        d3.select(this.hostElement)
            .select("#trend-bep" + this.id)
            .remove();
    } //Fin removeexistingChart

    //-----

    private initProperties() {
        //---Inicializar propiedades

        this.margin = { top: 5, right: 5, bottom: 5, left: 5 };
        if (this.hasAxis)
            this.margin = { top: 20, right: 25, bottom: 30, left: 30 };

        this.width = this.viewBoxWidth - this.margin.left - this.margin.right;
        this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;
    } //Fin init
} //Fin clase
