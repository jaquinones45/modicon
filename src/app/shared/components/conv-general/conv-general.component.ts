import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conv-general',
  templateUrl: './conv-general.component.html',
  styleUrls: ['./conv-general.component.scss']
})
export class ConvGeneralComponent {
  @Input() apagado = false;
}
