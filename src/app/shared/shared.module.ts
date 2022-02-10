import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrendBepComponent } from "./components/trend-bep/trend-bep.component";
import { BarSingleComponent } from "./components/bar-single/bar-single.component";
import { BarDifferenceComponent } from "./components/bar-difference/bar-difference.component";
import { ScaleBarDifferenceComponent } from "./components/scale-bar-difference/scale-bar-difference.component";
import { ConvGeneralComponent } from "./components/conv-general/conv-general.component";
import { VarNumComponent } from "./components/var-num/var-num.component";
import { MapaComponent } from "./components/mapa/mapa.component";
import { TarjetaMapaComponent } from "./components/tarjeta-mapa/tarjeta-mapa.component";

@NgModule({
    declarations: [
        TrendBepComponent,
        BarSingleComponent,
        BarDifferenceComponent,
        ScaleBarDifferenceComponent,
        ConvGeneralComponent,
        VarNumComponent,
        MapaComponent,
        TarjetaMapaComponent,
    ],
    imports: [CommonModule],
    exports: [
        TrendBepComponent,
        BarSingleComponent,
        BarDifferenceComponent,
        ScaleBarDifferenceComponent,
        ConvGeneralComponent,
        VarNumComponent,
        MapaComponent,
        TarjetaMapaComponent,
    ],
})
export class SharedModule {}
