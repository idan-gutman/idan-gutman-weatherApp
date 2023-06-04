import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UnitPipe } from "./pipes/unit.pipe";


const directives = [
    UnitPipe
]


@NgModule({
    declarations: [directives],
    exports: [directives]
})

export class CoreModule { }