import { Pipe } from '@angular/core';
/*
 * Converts bytes to MB, GB and so on
 * Takes an bytes value argument that defaults to 0.
 * Usage:
 *   value | getSize
 * Example:
 *   {{ 1024 |  getSize}}
 *   formats to: 1 MB
 */
var GetSizePipe = (function () {
    function GetSizePipe() {
    }
    GetSizePipe.prototype.transform = function (value) {
        var bytes = value || 0, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], k = 1000, i = Math.floor(Math.log(bytes) / Math.log(k));
        if (bytes === 0) {
            return '0 Byte';
        }
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    };
    return GetSizePipe;
}());
export { GetSizePipe };
GetSizePipe.decorators = [
    { type: Pipe, args: [{ name: 'getSize' },] },
];
/** @nocollapse */
GetSizePipe.ctorParameters = function () { return []; };
//# sourceMappingURL=GetSize.pipe.js.map