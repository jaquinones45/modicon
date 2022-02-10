import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConsolasRoutingModule } from "./consolas-routing.module";
import { ConsolasComponent } from "./consolas.component";
import { SharedModule } from "src/app/shared/shared.module";
import { TarjetasComponent } from "./tarjetas/tarjetas.component";
import { TablaComponent } from "./tabla/tabla.component";
import { BarraComponent } from "./barra/barra.component";
import { PrimengModule } from "src/app/ui-primeng/primeng/primeng.module";
import { DashboardModule } from "src/app/pages/dashboard/dashboard.module";

@NgModule({
    declarations: [ConsolasComponent, TarjetasComponent, TablaComponent, BarraComponent],
    imports: [
        CommonModule,
        ConsolasRoutingModule,
        SharedModule,
        PrimengModule,
        DashboardModule,
    ],
})
export class ConsolasModule {}
