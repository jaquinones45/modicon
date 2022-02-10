import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { TableModule } from "primeng/table";
import { BarPumpsComponent } from "./bar-pumps/bar-pumps.component";
const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
    },
];
@NgModule({
    declarations: [DashboardComponent, BarPumpsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        TableModule,
    ],
    exports: [BarPumpsComponent],
})
export class DashboardModule {}
