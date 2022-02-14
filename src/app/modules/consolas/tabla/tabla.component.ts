import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() data;
  @Input() code;
  @Output() salida = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @Output() mapPlant = new EventEmitter<any>();
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  original: any;
  datos = [];
  page = 1
  pageSize = 18

  rowSelectCode = 0
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rowSelectCode = 0
  }
  
  ngOnChanges() {
    this.original = this.data;
    this.datos = this.data;
    this.senData();
    if (this.code) this.rowSelectCode = this.code
  }

  senData() {
    this.salida.emit(this.table.nativeElement)
  }

  setRefresh($event) {
    this.refresh.emit($event)
  }

  redirectRevision(id) {
    this.redirectTo(`type-system/${id}/revision`)
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => this.router.navigate([uri])
    );
  }
  
  clickMapPlant($event) {
    console.log($event)
    this.rowSelectCode = 0
    this.mapPlant.emit($event)
    this.rowSelectCode = $event
  }

  selectCode($event) {
    if (this.rowSelectCode === $event) return true
    else return false
  }
}
