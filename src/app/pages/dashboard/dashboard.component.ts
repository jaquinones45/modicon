import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "../../app.breadcrumb.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    data = [
        { name: "Galan 14", desc: "POZOS GALAN L14", status: null, hap: null },

        {
            name: "Galan 10",
            desc: "GALAN BUCARAMANGA - L10",
            status: null,
            hap: null,
        },
        {
            name: "Galan 16",
            desc: "GALAN  SALGAR - L16",
            status: null,
            hap: null,
        },
        {
            name: "Galan 12",
            desc: "GALAN  SALGAR - L12",
            status: null,
            hap: null,
        },
        {
            name: "Galan 08",
            desc: "GALAN  SALGAR - L8",
            status: null,
            hap: null,
        },
    ];
    loaded = false;
    constructor(
        private breadcrumbService: AppBreadcrumbService,
    ) {
        this.breadcrumbService.setItems([
            { label: "Dashboard", routerLink: ["/"] },
        ]);
    }

    ngOnInit() {

    }

}
