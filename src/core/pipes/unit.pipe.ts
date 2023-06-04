import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "unitPipe" })

export class UnitPipe implements PipeTransform {

    transform(value: number): string {
        const toCelsius = Math.floor((value - 32) * 5 / 9).toFixed(0);
        return `${toCelsius}`;
    }
}