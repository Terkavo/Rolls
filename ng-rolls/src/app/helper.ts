export class Helper {
    static IsEventHasClass(event: Event, className: string): boolean {
        let targets = event.composedPath()
        for (let index = 0; index < targets.length; index++) {
            const element = <HTMLElement>targets[index];
            if (element.classList === undefined)
                continue
            for (let index = 0; index < element.classList.length; index++)
                if (element.classList[index] === className)
                    return true
        }
        return false
    }
}