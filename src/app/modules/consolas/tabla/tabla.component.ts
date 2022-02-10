import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() data;
  @Output() salida = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  original: any;
  datos = [];
  page = 1
  pageSize = 18
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {}
  
  ngOnChanges() {
    this.original = this.data;
    this.datos = this.data;
    this.senData();
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
}
