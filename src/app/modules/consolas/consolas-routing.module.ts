import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConsolasComponent } from "./consolas.component";

const routes: Routes = [
    {
        path: "",
        component: ConsolasComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsolasRoutingModule {}
