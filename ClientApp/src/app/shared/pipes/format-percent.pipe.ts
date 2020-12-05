import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'formatPercent' })

export class FormatPercentPipe implements PipeTransform {

    //#region public methods

    public transform(value: number): string {
        switch (true) {
            case (value == 0):
                return value.toFixed(2) + '% •'
            case (value < 0):
                return (value).toFixed(2) + '% ▼'
            case (value > 0):
                return (value).toFixed(2) + '% ▲'
        }
    }

    //#endregion

}