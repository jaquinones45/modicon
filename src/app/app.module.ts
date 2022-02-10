import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { DatePipe, DecimalPipe } from "@angular/common";

import { AppCodeModule } from "./app.code.component";
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { AppConfigComponent } from "./app.config.component";
import { AppMenuComponent } from "./app.menu.component";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { AppRightPanelComponent } from "./app.rightpanel.component";
import { AppBreadcrumbComponent } from "./app.breadcrumb.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppFooterComponent } from "./app.footer.component";
import { DashboardDemoComponent } from "./demo/view/dashboarddemo.component";
import { FormLayoutDemoComponent } from "./demo/view/formlayoutdemo.component";
import { FloatLabelDemoComponent } from "./demo/view/floatlabeldemo.component";
import { InvalidStateDemoComponent } from "./demo/view/invalidstatedemo.component";
import { InputDemoComponent } from "./demo/view/inputdemo.component";
import { ButtonDemoComponent } from "./demo/view/buttondemo.component";
import { TableDemoComponent } from "./demo/view/tabledemo.component";
import { ListDemoComponent } from "./demo/view/listdemo.component";
import { TreeDemoComponent } from "./demo/view/treedemo.component";
import { PanelsDemoComponent } from "./demo/view/panelsdemo.component";
import { OverlaysDemoComponent } from "./demo/view/overlaysdemo.component";
import { MediaDemoComponent } from "./demo/view/mediademo.component";
import { MenusDemoComponent } from "./demo/view/menusdemo.component";
import { MessagesDemoComponent } from "./demo/view/messagesdemo.component";
import { MiscDemoComponent } from "./demo/view/miscdemo.component";
import { EmptyDemoComponent } from "./demo/view/emptydemo.component";
import { ChartsDemoComponent } from "./demo/view/chartsdemo.component";
import { FileDemoComponent } from "./demo/view/filedemo.component";
import { DocumentationComponent } from "./demo/view/documentation.component";
import { DisplayComponent } from "./utilities/display.component";
import { ElevationComponent } from "./utilities/elevation.component";
import { FlexboxComponent } from "./utilities/flexbox.component";
import { GridComponent } from "./utilities/grid.component";
import { IconsComponent } from "./utilities/icons.component";
import { WidgetsComponent } from "./utilities/widgets.component";
import { SpacingComponent } from "./utilities/spacing.component";
import { TypographyComponent } from "./utilities/typography.component";
import { TextComponent } from "./utilities/text.component";
import { AppCrudComponent } from "./pages/app.crud.component";
import { AppCalendarComponent } from "./pages/app.calendar.component";
import { AppTimelineDemoComponent } from "./pages/app.timelinedemo.component";
import { AppInvoiceComponent } from "./pages/app.invoice.component";
import { AppHelpComponent } from "./pages/app.help.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppLoginComponent } from "./pages/app.login.component";

import { CountryService } from "./demo/service/countryservice";
import { CustomerService } from "./demo/service/customerservice";
import { EventService } from "./demo/service/eventservice";
import { IconService } from "./demo/service/iconservice";
import { NodeService } from "./demo/service/nodeservice";
import { PhotoService } from "./demo/service/photoservice";
import { ProductService } from "./demo/service/productservice";

import { MenuService } from "./app.menu.service";
import { AppBreadcrumbService } from "./app.breadcrumb.service";
import { PrimengModule } from "./ui-primeng/primeng/primeng.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppCodeModule,
        PrimengModule,
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppRightPanelComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardDemoComponent,
        FormLayoutDemoComponent,
        FloatLabelDemoComponent,
        InvalidStateDemoComponent,
        InputDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        DisplayComponent,
        ElevationComponent,
        FlexboxComponent,
        GridComponent,
        IconsComponent,
        WidgetsComponent,
        SpacingComponent,
        TypographyComponent,
        TextComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppTimelineDemoComponent,
        AppLoginComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MenuService,
        AppBreadcrumbService,
        DatePipe,
        DecimalPipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
