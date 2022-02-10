import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as EventEmitter from "events";
import { MenuItem } from "primeng/api";
import { AppComponent } from "./app.component";

@Component({
    selector: "app-menu",
    template: `
        <!-- <p-menubar class="layout-menu" [model]="model"></p-menubar> -->
        <!-- <ul class="layout-menu">
            <li
                app-menuitem
                *ngFor="let item of model; let i = index"
                [item]="item"
                [index]="i"
                [root]="true"
            ></li>
        </ul> -->
    `,
})
export class AppMenuComponent implements OnInit {
    model: MenuItem[];
    consoles = [];
    sistemas = [];
    plantas = [];
    constructor(
        public app: AppComponent,
        private router: Router
    ) {
    }

    ngOnInit() {}

    menu() {
        this.model = [
            // {
            //     label: "Dashboard",
            //     icon: "pi pi-fw pi-home",
            //     routerLink: ["/"],
            // },

            {
                label: "CONSOLAS",
                icon: "pi pi-fw pi-home",
                routerLink: ["/consolas"],
            },

            {
                label: "CONSOLAS",
                icon: "pi pi-fw pi-home",
                command: () => {
                    this.router.navigate(["/consolas"]);
                },
                routerLink: ["/consolas"],
                items: this.consoles.map((c) => {
                    return {
                        label: c.nombre,
                        icon: "pi pi-fw pi-chart-bar",
                        routerLink: ["/consolas"],
                        items: c.sistemas.map((s) => {
                            return {
                                label: s.nombre,
                                icon: "pi pi-fw pi-chart-bar",
                                command: () => {
                                    this.router.navigate([
                                        "/detalle-sistema",
                                        s.codigo,
                                    ]);
                                },
                                routerLink: ["/detalle-sistema", s.codigo],
                                items: s.plantas.map((p) => {
                                    return {
                                        label: p.nombre,
                                        icon: "pi pi-fw pi-chart-bar",
                                        command: () => {
                                            this.router.navigate([
                                                "/detalle-sistema",
                                                p.codigo,
                                            ]);
                                        },
                                        routerLink: [
                                            "/detalle-sistema",
                                            p.codigo,
                                        ],
                                    };
                                }),
                            };
                        }),
                    };
                }),
            },

            // {
            //     label: "CONSO0LA GALAN",
            //     icon: "pi pi-fw pi-home",
            //     items: [
            //         {
            //             label: "Dashboard Demo",
            //             icon: "pi pi-fw pi-home",
            //             routerLink: ["/demo"],
            //         },
            //         {
            //             label: "Optimización",
            //             icon: "pi pi-fw pi-chart-bar",
            //             routerLink: ["/optimization"],
            //         },
            //         {
            //             label: "Cumplimiento",
            //             icon: "pi pi-fw pi-chart-bar",
            //             routerLink: ["/compliance"],
            //         },
            //         {
            //             label: "Estimado",
            //             icon: "pi pi-fw pi-chart-bar",
            //             routerLink: ["/estimate"],
            //         },
            //     ],
            // },
        ];
    }
}
