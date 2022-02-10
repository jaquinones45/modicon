
import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-barra',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss']
})
export class BarraComponent implements OnInit {

  //-----Declarar variables utilizadas.
  hostElement; // Native element hosting the SVG container
  svg; // Top level SVG element
  g; // SVG Group element
  viewBoxHeight;
  viewBoxWidth;
  margin;
  width;
  height;
  @Input() data = 100;
  @Input() visibleText = true;
  alto = 8;
  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }
  ngOnInit(): void {
    this.createChart()
  }

  createChart() {
    this.removeExistingChartFromParent()
    this.setChartDimension()
    this.initProperties()
    this.decimalAdjust('round', this.data, -1)


    var xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([this.margin.left, this.margin.left + this.width]);

    this.svg.append("rect")
      .attr("class", "rects")
      .attr('transform', `translate(0,${this.margin.top})`)
      .attr("x", this.margin.left)
      .attr("width", xScale(100) - xScale(0))
      .attr("height", this.alto)
      .style("fill", "#F7F7F7")

    this.svg.append("rect")
      .attr("class", "rects")
      .attr('transform', `translate(0,${this.margin.top})`)
      .attr("x", this.margin.left)
      .attr("width", xScale(this.data) - xScale(0))
      .attr("height", this.alto)
      .style("fill", "#1561C0")

    if (this.visibleText) {
      this.svg
        .append("text")

        .text(() => {
          if (this.data < 10) return this.decimalAdjust('round', this.data, -1) + "%";
          else return this.decimalAdjust('round', this.data, 0) + "%"
        })
        .attr("x", xScale(100) + 3)
        .attr("y", this.viewBoxHeight * 0.7)
        .attr('fill', "#1561C0")
        .style("font-size", "14px")
        .style("text-anchor", "start")

    }


  }

  private decimalAdjust(type, value, exp) {
    this.svg

      .attr('transform', 'translate(0,0)')

    // Si exp es undefined o cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);

    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }//Fin removeexistingChart

  //-----
  private setChartDimension() {
    // Se hace responsive el svg  setChartDimension()
    this.viewBoxHeight = 22;
    this.viewBoxWidth = 80;
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', this.viewBoxWidth)
      .attr('height', this.viewBoxHeight)
    //Responsive
    /* .attr('width', '100%')
     .attr('height', '100%')
     .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
     */

    //-----------------------------------------------------------------------
    // Agregar elemento grafico   
    this.g = this.svg.append("g")
      .attr("transform", "translate(0,0)");
  }//Fin setChart

  private initProperties() {

    //---Inicializar propiedades
    let r=35;
    if(this.visibleText==false)r=2
    this.margin = ({ top: 2, right: r, bottom: 2, left: 2 })
    this.width = this.viewBoxWidth - this.margin.left - this.margin.right;
    this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;

  }//Fin init
}
