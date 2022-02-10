import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppBreadcrumbService } from "src/app/app.breadcrumb.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/core/common.service";
import { L10n } from "@syncfusion/ej2-base";
import { environment } from "src/environments/environment";
import lodash from "lodash"

import stations from "src/stations.json";

declare var L: any;
@Component({
    selector: "app-consolas",
    templateUrl: "./consolas.component.html",
    styleUrls: ["./consolas.component.scss"],
})
export class ConsolasComponent implements OnInit {
    constructor(
        private breadcrumbService: AppBreadcrumbService,
        public router: Router,
        public app: AppComponent,
        private common: CommonService
    ) {
        this.breadcrumbService.setItems([
            {
                label: "CONSOLAS",
                routerLink: ["/consolas"],
            },
        ]);
    }

    consola = "";
    dataByLocation: any = undefined;
    history: any = [];
    porcentaje: any = [];
    programa: any = [];
    balance: any = [];
    detalle = false;
    consoles = [];
    sistemas = [];

    topActive = [];
    topSlots = [];
    topSwitches = [];

    dateSelected: Date[];
    loadProgressWorks: boolean = false;
    loadHitos: boolean = false;

    markers = [];
    coordinatesWorks = [];
    map: any;

    async ngOnInit() {
        if (stations.length > 0) this.sistemas = stations
        this.getTopActive();
        this.getTopSlots();
        this.getTopSwitches();
        this.initMap();
        this.loadProgressWorks = true;
        L10n.load(this.common.loadC);
        let dateFind: Date[] = [
            new Date(new Date().getFullYear(), 0, 1),
            new Date(
                new Date(new Date(new Date().getFullYear(), 0, 1)).getFullYear(),
                new Date(new Date(new Date().getFullYear(), 0, 1)).getMonth() + 12,
                0
            ),
        ];
        this.getCoordinatesWorks();
        this.dateSelected = dateFind;
    }

    getTopActive() {
        this.topActive = lodash
            .chain(stations)
            .groupBy('active')
            .map((value, key) => ({
                name: key,
                quantity: value.length,
                total: 0
            }))
            .value();

        let quantity_total = 0
        this.topActive.map((item:any) => quantity_total += item.quantity)

        this.topActive = this.topActive.map((item:any) => {
            item.total = Math.round(item.quantity / quantity_total * 100)
            return item
        })
    }

    getTopSlots() {
        this.topSlots = lodash
            .chain(stations)
            .groupBy('active')
            .map((value, key) => ({
                name: key,
                quantity: lodash.sumBy(value, 'slots'),
                total: 0
            }))
            .value();
        
        let quantity_total = 0
        this.topSlots.map((item:any) => quantity_total += item.quantity)

        this.topSlots = this.topSlots.map((item:any) => {
            item.total = Math.round(item.quantity / quantity_total * 100)
            return item
        })
    }

    getTopSwitches() {
        this.topSwitches = lodash
            .chain(stations)
            .groupBy('active')
            .map((value, key) => ({
                name: key,
                quantity: lodash.sumBy(value, 'switches'),
                total: 0
            }))
            .value();

        let quantity_total = 0
        this.topSwitches.map((item:any) => quantity_total += item.quantity)

        this.topSwitches = this.topSwitches.map((item:any) => {
            item.total = Math.round(item.quantity / quantity_total * 100)
            return item
        })
    }

    initMap() {
        this.map = L.map("map").setView([7.570868, -73.597333], 6).setZoom(9);
            
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "",
        }).addTo(this.map);
        // var myIcon = L.icon({
        //   iconUrl: "../../../../../assets/svg/record.svg",
        //   iconSize: [28, 45],
        //   iconAnchor: [14, 25],
        //   popupAnchor: [-3, -76],
        //   // shadowSize: [68, 95],
        //   // shadowAnchor: [22, 94],
        // });
        // var myIcon = L.icon({
        //   iconUrl: "../../../../../assets/svg/recordRed.svg",
        //   iconSize: [28, 45],
        //   iconAnchor: [14, 25],
        //   popupAnchor: [-3, -76],
        //   // shadowSize: [68, 95],
        //   // shadowAnchor: [22, 94],
        // });
        // L.marker([4.570868, -74.297333], { icon: myIcon }).addTo(this.map);
    }

    getCoordinatesWorks() {
        let groupMarkers = [];

        this.coordinatesWorks = stations;
        this.coordinatesWorks.forEach((element) => {
            let icon = "";
            icon = "recordGreen.svg";
            var myIcon = L.icon({
            iconUrl: environment.production
                ? "./assets/svg/" + icon
                : "../../../../../assets/svg/" + icon,
                iconSize: [38, 95],
                popupAnchor: [0,-15]
            });

            let photos = ''
            element.photos.map(ele => {
                photos += 
                `
                    <div class="col-6">
                        <img src="${environment.production
                            ? "./assets/stations/" + ele.photo
                            : "../../../../../assets/stations/" + ele.photo}" 
                            width="220px" height="150px"    
                        />
                    </div>
                `
            })

            let col_left = ''
            let col_right = ''
            let row = 0
            element.rtu.map((ele:any) => {
                if (ele.total) {
                    if (row === 0) {
                        col_left += `
                            <tr>
                                <td>${ele.name}:</td>
                                <td><b>${ele.total}</b></td>
                            </tr>
                        `
                        row = 1
                    } else {
                        col_right += `
                        <tr>
                            <td>${ele.name}:</td>
                            <td><b>${ele.total}</b></td>
                        </tr>
                        `
                        row = 0
                    }
                }
            })
            console.log(col_left)
            console.log(col_right)

            const customPopup = `
                <div 
                    style="
                        height: 300px;
                        width: 512px;
                        border: 5px solid #fff;
                        background: #f1f1f1;
                        overflow-y: scroll;
                    "
                >
                    <div 
                        style="
                            height: auto;
                            background:#fff;
                        "
                    >
                        <div class="grid" style="width:500px">
                            <div class="col-12">
                                <h6 class="card-title" style="margin-bottom: 0px;">${element.name}</h6>
                                <p class="card-subtitle m-0">${element.active}.</p>
                            </div>
                            <div class="col-6">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Código:</td>
                                            <td><b>${element.code}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Gabinetes:</td>
                                            <td><b>${element.cabinets}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Dimensiones (An*Al*Pr):</td>
                                            <td><b>${element.dimensions}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Referencia:</td>
                                            <td><b>${element.reference}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Slots:</td>
                                            <td><b>${element.slots}</b></td>
                                        </tr>
                                        ${col_left}
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-6">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Ubicación:</td>
                                            <td><b>${element.location}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Tag Gabinete:</td>
                                            <td><b>${element.tag_cabinets}</b></td>
                                        </tr>
                                        <tr>
                                            <td>PLC:</td>
                                            <td><b>${element.plc}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Backplanes:</td>
                                            <td><b>${element.backplanes}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Switches:</td>
                                            <td><b>${element.switches}</b></td>
                                        </tr>
                                        ${col_right}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="grid" style="width:500px">
                            ${photos}
                        </div>
                    </div>
                </div>
            `;
            // specify popup options 
            const customOptions = {
                'maxWidth': '500',
                'className' : 'custom'
            }

            /*let myPopup = L.popup({
                maxWidth: 600,
                maxHeight: 350
            }).setLatLng([48.86, 2.35]).setContent(customPopup).addTo(this.map);*/

            let marker = L
            .marker([this.coordenada(element.location, false), this.coordenada(element.location, true)], {
                icon: myIcon,
            })
            .bindPopup(customPopup, customOptions)
            .addTo(this.map);
            
            let isBouncing = true;
            this.markers.push({
                marker,
                code: element.code,
                isBouncing,
                latitud: this.coordenada(element.location, false),
                longitud: this.coordenada(element.location, true)
            });
            groupMarkers.push(marker);
        });
    }

    maxAnMin() {
        this.porcentaje = this.dataByLocation.limit.filter(
            (c) => c.equipo.toLowerCase() == "porcentaje energia"
        );
        this.programa = this.dataByLocation.limit.filter(
            (c) => c.equipo.toLowerCase() == "programa"
        );
        this.balance = this.dataByLocation.limit.filter(
            (c) => c.equipo.toLowerCase() == "balance"
        );
    }

    findBySistema(sistema: string) {
        this.router.navigate(["/detalle-sistema", sistema]);
    }

    filterByBalance(sistema: string) {
        this.router.navigate(["/balance-volumetrico", sistema]);
    }

    coordenada(location, type) {
        if (type) return location.split(',')[1]
        else return location.split(',')[0]
    }

    handleChange(e) {
        var index = e.index;
        this.consola = this.consoles[index].codigo;
    }
}
