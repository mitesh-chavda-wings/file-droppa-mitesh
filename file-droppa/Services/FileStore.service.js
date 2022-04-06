import { Injectable, EventEmitter } from "@angular/core";
import { FileWrapper } from "./FileWrapper.service";
var FilesStore = (function () {
    function FilesStore() {
        this.filesUpdated = new EventEmitter(true);
        this.startAutoUploading = null;
        this.beforeAddFile = null;
        this.WSfiles = new WeakSet();
        this._iFiles = [];
    }
    Object.defineProperty(FilesStore.prototype, "files", {
        get: function () {
            return this.iFiles.reduce(function (res, iFile) {
                res.push(iFile.File);
                return res;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilesStore.prototype, "iFiles", {
        get: function () {
            return this._iFiles;
        },
        set: function (files) {
            this._iFiles = files;
        },
        enumerable: true,
        configurable: true
    });
    FilesStore.prototype.addFiles = function (files) {
        var _this = this;
        files = files.filter(function (file) {
            if (!_this.WSfiles.has(file)) {
                if (typeof _this.beforeAddFile === "function" && _this.beforeAddFile(file)) {
                    _this.WSfiles.add(file);
                    return true;
                }
                else if (typeof _this.beforeAddFile !== "function") {
                    return true;
                }
                return false;
            }
        }).map(function (file) {
            var iFile = new FileWrapper(file);
            _this.startAutoUploading && _this.startAutoUploading(iFile);
            return iFile;
        });
        this.iFiles = this.iFiles.concat(files);
        this.filesUpdated.emit(true);
    };
    FilesStore.prototype.removeFiles = function (iFile) {
        this.WSfiles.delete(iFile.File);
        this.iFiles = this.iFiles.filter(function (item) {
            return item.id !== iFile.id;
        });
        this.filesUpdated.emit(true);
    };
    FilesStore.prototype.clearStore = function () {
        var _this = this;
        this.iFiles.forEach(function (iFile) {
            _this.WSfiles.delete(iFile.File);
        });
        this.iFiles = [];
        this.filesUpdated.emit(true);
    };
    return FilesStore;
}());
export { FilesStore };
FilesStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FilesStore.ctorParameters = function () { return []; };
//# sourceMappingURL=FileStore.service.js.map