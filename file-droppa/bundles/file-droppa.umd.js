(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["file-droppa.umd"] = factory(require("@angular/core"), require("@angular/common"));
	else
		root["file-droppa.umd"] = factory(root["@angular/core"], root["@angular/common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FileWrapper_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesStore; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FilesStore = (function () {
    function FilesStore() {
        this.filesUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
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
            var iFile = new __WEBPACK_IMPORTED_MODULE_1__FileWrapper_service__["a" /* FileWrapper */](file);
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
FilesStore = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], FilesStore);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return File; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var File = (function () {
    function File() {
        this.ext = '';
        this.previewSrc = '';
        this.fileName = '';
        //TODO: workaround - depends on strict values;
        this.previewHeight = 75;
        this.removeFile = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
    //ngHooks
    File.prototype.ngAfterContentInit = function () {
        this.file && this.getFileType();
    };
    File.prototype.removeFileListener = function (e) {
        e.preventDefault();
        this.removeFile && this.removeFile.emit(true);
    };
    File.prototype.getFileType = function () {
        var _this = this;
        var imageType = /^image\//, reader;
        if (!imageType.test(this.file.type)) {
            var ext = this.file.name.split('.').pop();
            this.fileName = this.file.name;
            this.ext = ext.length > 3
                ? 'file'
                : "." + ext;
            return;
        }
        reader = new FileReader();
        reader.addEventListener("load", function () {
            var img = new Image, result = reader.result;
            img.onload = function () {
                var ratio = img.height / img.width, scaledHeight = ratio * _this.previewHeight;
                _this.previewSrc = result;
                _this.previewHeight = (scaledHeight < _this.previewHeight)
                    ? _this.previewHeight
                    : scaledHeight;
            };
            img.src = result;
        }, false);
        if (this.file) {
            reader.readAsDataURL(this.file);
        }
    };
    return File;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], File.prototype, "file", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], File.prototype, "index", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], File.prototype, "percentage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], File.prototype, "loadingSuccessful", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], File.prototype, "responseMessage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], File.prototype, "removeFile", void 0);
File = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'fileItem',
        styles: ["\n        .file-container {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            width: 75px;\n            margin: 20px 10px 0 0;\n            transition: opacity 0.5s, margin 0.5s linear;\n            flex-direction: column;\n            position:relative;\n        }\n\n        .file-container.uploaded {\n            opacity: 0;\n            margin: 0;\n            height: 0;\n            overflow: hidden;\n        }\n\n        .flex-block {\n            width: 90%;\n            text-align: center;\n            font-size: 0.8em;\n            margin: 2px 0;\n        }\n\n        .file-remove {\n            cursor: pointer;\n            position: absolute;\n            left: 87%;\n            top: 8px;\n        }\n        .file-upload-error {\n            position: absolute;\n            top: 8px;\n            left:-8px;\n        }\n        .file-name {\n            text-overflow: ellipsis;\n            overflow: hidden;\n        }\n\n        .file-preview {\n            background: #ccc;\n            border-radius: 2px;\n            width: inherit;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            flex-direction: column;\n            background-size: cover;\n            color: #fff;\n        }\n\n         .file-preview-ext {\n            text-transform: uppercase;\n        }\n\n        .file-progress {\n            width: 80%;\n            display: block;\n        }\n\n\n        button {\n            margin: 0;\n        }\n\nspan {\n    position:relative;\n    z-index:1;\n    overflow:hidden;\n    list-style:none;\n    padding:0;\n    margin:0 0 0.25em;\n}\n\nspan a:link {\n    display:block;\n    border:0;\n    padding-left:28px;\n    color:#c55500;\n}\n\nspan a:hover,\nspan a:focus {\n    color:#730800;\n    background:transparent;\n}\n\nspan:before,\nspan:after,\nspan a:before,\nspan a:after {\n    content:\"\";\n    position:absolute;\n    top:50%;\n    left:0;\n}\n\nspan a:before,\nspan a:after {\n    margin:-8px 0 0;\n    background:#c55500;\n}\n\nspan a:hover:before,\nspan a:focus:before {\n    background:#730800;\n}\n\n\n.remove a:before {\n    width:16px;\n    height:16px;\n    /* css3 */\n    -webkit-border-radius:16px;\n    -moz-border-radius:16px;\n    border-radius:16px;\n}\n\n.remove a:after {\n    left:3px;\n    width:10px;\n    height:2px;\n    margin-top:-1px;\n    background:#fff;\n}\n.warning:before {\n    content:\"!\";\n    z-index:2;\n    left:8px;\n    margin-top:-8px;\n    font-size:14px;\n    font-weight:bold;\n    color:#000;\n}\n\n.warning:after {\n    z-index:1;\n    border-width:0 11px 18px;\n    border-style:solid;\n    border-color:#F8D201 transparent;\n    margin-top:-10px;\n    background:transparent;\n}\n\n.file-upload-error .tooltiptext {\n    visibility: hidden;\n    white-space:nowrap;\n    background-color: black;\n    color: #fff;\n    text-align: center;\n    padding: 5px;\n    border-radius: 6px;\n\n    /* Position the tooltip text - see examples below! */\n    position: absolute;\n    z-index: 1;\n}\n\n.file-upload-error:hover .tooltiptext {\n    visibility: visible;\n}\n\n    "],
        template: "\n        <div *ngIf=\"file\" class=\"file-container\">\n            <div class=\"flex-block file-preview\" [ngStyle]=\"{'background-image': 'url(' + previewSrc + ')', 'height': previewHeight + 'px'}\">\n                <div *ngIf=\"ext\" class=\"flex-block file-preview-ext \">{{ext}}</div>\n                <div *ngIf=\"!previewSrc\" class=\"flex-block file-name\">{{fileName}}</div>\n                <progress [value]=\"percentage\" max=\"100\" class=\"file-progress\"></progress>\n            </div>\n            <div class=\"file-remove\">\n                <span class=\"remove\"><a href=\"#\" (click)=\"removeFileListener($event)\"></a></span>\n            </div>\n            <div *ngIf=\"!loadingSuccessful\" class=\"file-upload-error\">\n                <span class=\"warning\"></span>\n                <span *ngIf=\"responseMessage\" class=\"tooltiptext\">{{responseMessage}}</span>\n            </div>\n            <div class=\"flex-block\">{{file.size | getSize }}</div>\n        </div>\n    "
    })
], File);



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_FileParser_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_FileStore_service__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileDropZone; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FileDropZone = (function () {
    function FileDropZone(filesStore, el, fileParser) {
        this.filesStore = filesStore;
        this.el = el;
        this.fileParser = fileParser;
        this.hiddenFileInput = null;
        this.promise = null;
        this.createHiddenInput();
    }
    Object.defineProperty(FileDropZone.prototype, "multiple", {
        set: function (value) {
            var attributeName = 'multiple';
            if (value) {
                this.hiddenFileInput.setAttribute(attributeName, attributeName);
            }
            else {
                this.hiddenFileInput.removeAttribute(attributeName);
            }
        },
        enumerable: true,
        configurable: true
    });
    /*
     * Host Event Listeners
     * */
    FileDropZone.prototype.onClick = function (e) {
        this.hiddenFileInput && this.hiddenFileInput.click();
    };
    FileDropZone.prototype.drop = function (e) {
        var _this = this;
        e.preventDefault();
        if (!e.dataTransfer || !e.dataTransfer.files.length) {
            return;
        }
        this.promise = this.fileParser.processInputFromDrop(e)
            .then(function (files) {
            _this.updateFilesStore(files.slice());
        });
        this.updateStyles();
    };
    FileDropZone.prototype.dragenter = function (e) {
        e.preventDefault();
    };
    FileDropZone.prototype.dragover = function (e) {
        e.preventDefault();
        this.updateStyles(true);
    };
    FileDropZone.prototype.dragleave = function (e) {
        e.preventDefault();
        this.updateStyles();
    };
    /*
     * Public methods
     * */
    FileDropZone.prototype.OnDestroy = function () {
        this.hiddenFileInput && document.body.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
    };
    FileDropZone.prototype.updateStyles = function (dragOver) {
        if (dragOver === void 0) { dragOver = false; }
        //this.el.nativeElement.classList[(dragOver) ? 'add' : 'remove'](this._overCls);
    };
    FileDropZone.prototype.updateFilesStore = function (files) {
        this.filesStore.addFiles(files);
    };
    FileDropZone.prototype.createHiddenInput = function () {
        var _this = this;
        this.hiddenFileInput && document.body.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = document.createElement("input");
        this.hiddenFileInput.setAttribute("type", "file");
        this.hiddenFileInput.setAttribute("multiple", "multiple");
        this.hiddenFileInput.style.visibility = "hidden";
        this.hiddenFileInput.style.position = "absolute";
        this.hiddenFileInput.style.top = "0";
        this.hiddenFileInput.style.left = "0";
        this.hiddenFileInput.style.height = "0";
        this.hiddenFileInput.style.width = "0";
        this.hiddenFileInput.className = "_hiddenInputClassName";
        document.body.appendChild(this.hiddenFileInput);
        this.hiddenFileInput.addEventListener("change", function (e) {
            var files = [];
            for (var i = 0, l = e.target.files.length; i < l; i++) {
                files.push(e.target.files[i]);
            }
            _this.hiddenFileInput.value = "";
            _this.updateFilesStore(files);
        });
    };
    return FileDropZone;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], FileDropZone.prototype, "multiple", null);
FileDropZone = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'fileDropZone, [fileDropZone]',
        providers: [__WEBPACK_IMPORTED_MODULE_1__Services_FileParser_service__["a" /* FileParser */]],
        styles: ["\n        .file_dropZone_internal {\n            border: 3px dashed #DDD;\n            border-radius:10px;\n            padding:10px;\n            width:400px;\n            height:200px;\n            color:#CCC;\n            text-align:center;\n            display:table-cell;\n            vertical-align:middle;\n            cursor:pointer;\n        }\n    "],
        template: "\n        <ng-content></ng-content>\n    ",
        host: {
            '(drop)': 'drop($event)',
            '(dragenter)': 'dragenter($event)',
            '(dragover)': 'dragover($event)',
            '(dragleave)': 'dragleave($event)',
            '(click)': 'onClick($event)'
        },
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__Services_FileStore_service__["a" /* FilesStore */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__Services_FileParser_service__["a" /* FileParser */]])
], FileDropZone);



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_FileStore_service__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_FileUpload_service__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileDroppa; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FileDroppa = (function () {
    function FileDroppa(filesStore, fileUploadService) {
        var _this = this;
        this.filesStore = filesStore;
        this.fileUploadService = fileUploadService;
        this.showFilesList = true;
        this.autoUpload = false;
        this.beforeRequest = null;
        this.beforeFileUpload = null;
        this.beforeAddFile = null;
        this.dropZoneTemplate = "\n      <div class=\"file_dropZone_internal\">\n          Drop Files Here\n      </div>\n    ";
        this.filesUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
        this.fileUploaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
        this.uploadButtonTemplate = "\n      <div class=\"file-droppa-btn orange\">\n        <span>Upload All Files</span>\n       </div>\n    ";
        this.removeButtonTemplate = "\n      <div class=\"file-droppa-btn red\">\n        <span>Remove All Files</span>\n       </div>\n    ";
        this.multiple = true;
        filesStore.filesUpdated.subscribe(function () {
            _this.filesUpdated.emit(filesStore.files);
        });
        fileUploadService.fileUploadedEvent.subscribe(function (_a) {
            var success = _a[0], response = _a[1], iFile = _a[2];
            if (success) {
                _this.filesStore.removeFiles(iFile);
            }
            else {
                iFile.loadingSuccessful = false;
                iFile.responseText = false;
            }
            _this.fileUploaded.emit([success, response, iFile.file]);
        });
        filesStore.startAutoUploading = this.startAutoUploading.bind(this);
    }
    Object.defineProperty(FileDroppa.prototype, "url", {
        set: function (tmpUrl) {
            this.fileUploadService.url = tmpUrl;
        },
        enumerable: true,
        configurable: true
    });
    FileDroppa.prototype.startAutoUploading = function (iFile) {
        this.autoUpload && this.fileUploadService.uploadFile(iFile);
    };
    /**
     * We got to pass Input parameters to Service instances
     */
    FileDroppa.prototype.ngOnInit = function () {
        this.filesStore.beforeAddFile = (typeof this.beforeAddFile === "function") ? this.beforeAddFile : function (file) { return true; };
        this.fileUploadService.beforeRequest = this.beforeRequest;
        this.fileUploadService.beforeFileUpload = (typeof this.beforeFileUpload === "function") ? this.beforeFileUpload : function (formData) { return true; };
    };
    FileDroppa.prototype.removeAllFiles = function () {
        this.filesStore.clearStore();
    };
    FileDroppa.prototype.uploadAllFiles = function () {
        this.fileUploadService.uploadFiles(this.filesStore.iFiles);
    };
    return FileDroppa;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], FileDroppa.prototype, "showFilesList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], FileDroppa.prototype, "autoUpload", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], FileDroppa.prototype, "beforeRequest", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], FileDroppa.prototype, "url", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], FileDroppa.prototype, "beforeFileUpload", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], FileDroppa.prototype, "beforeAddFile", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FileDroppa.prototype, "dropZoneTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], FileDroppa.prototype, "filesUpdated", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], FileDroppa.prototype, "fileUploaded", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FileDroppa.prototype, "uploadButtonTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FileDroppa.prototype, "removeButtonTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], FileDroppa.prototype, "multiple", void 0);
FileDroppa = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'fileDroppa',
        providers: [__WEBPACK_IMPORTED_MODULE_1__Services_FileStore_service__["a" /* FilesStore */], __WEBPACK_IMPORTED_MODULE_2__Services_FileUpload_service__["a" /* FileUpload */]],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        styles: ["\n        .file-droppa-container {\n            width: 400px;\n        }\n        .file-droppa-btns {\n         display: flex;\n          align-items: center;\n          justify-content: center;\n\n        }\n        .file-droppa-btn {\n              margin: 15px;\n              padding: 0;\n\n              overflow: hidden;\n\n              border-width: 0;\n              outline: none;\n              border-radius: 2px;\n              box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\n\n              background-color: #2ecc71;\n              color: #ecf0f1;\n\n              transition: background-color .3s;\n              width: 140px;\n              text-align: center;\n              font-size: 12px;\n\n        }\n\n        .file-droppa-btn:hover{\n          background-color: #27ae60;\n        }\n\n        .file-droppa-btn span {\n          display: block;\n          padding: 12px 24px;\n        }\n\n        .file-droppa-btn.orange {\n          background-color: #e67e22;\n        }\n\n        .file-droppa-btn.orange:hover {\n          background-color: #d35400;\n        }\n\n        .file-droppa-btn.red {\n          background-color: #e74c3c;\n        }\n\n        .file-droppa-btn.red:hover{\n          background-color: #c0392b;\n        }\n        "
        ],
        template: "\n        <div class=\"file-droppa-container\">\n            <fileDropZone [multiple]=\"multiple\">\n                <div [innerHTML]=\"dropZoneTemplate\"></div>\n            </fileDropZone>\n            <br/>\n            <ng-content></ng-content>\n            <fileList *ngIf=\"showFilesList\"></fileList>\n            <div class=\"file-droppa-btns\" *ngIf=\"filesStore.iFiles.length\">\n              <div #uploadButtonArea (click)=\"uploadAllFiles($event)\">\n                <ng-content select=\"[upload-button]\"></ng-content>\n              </div>\n              <div *ngIf=\"uploadButtonArea.children.length === 0\" (click)=\"uploadAllFiles($event)\"\n                   [innerHTML]=\"uploadButtonTemplate\"></div>\n              <div #removeButtonArea (click)=\"removeAllFiles($event)\">\n                <ng-content select=\"[remove-button]\"></ng-content>\n              </div>\n              <div *ngIf=\"removeButtonArea.children.length === 0\" (click)=\"removeAllFiles($event)\"\n                   [innerHTML]=\"removeButtonTemplate\"></div>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__Services_FileStore_service__["a" /* FilesStore */], __WEBPACK_IMPORTED_MODULE_2__Services_FileUpload_service__["a" /* FileUpload */]])
], FileDroppa);



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_FileStore_service__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileList; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileList = (function () {
    function FileList(filesStore) {
        this.filesStore = filesStore;
    }
    FileList.prototype.removeFile = function (iFile) {
        this.filesStore.removeFiles(iFile);
    };
    return FileList;
}());
FileList = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'fileList, [fileList]',
        styles: ["\n        .file-list {\n            width: 430px;\n            margin-bottom: 5px;\n            display: flex;\n            flex-flow: wrap;\n            justify-content: flex-start;\n         }\n    "],
        template: "\n        <div class=\"file-list\">\n            <fileItem *ngFor=\"let file of filesStore.iFiles\"\n                [file]=\"file.File\"\n                [percentage]=\"file.percentage\"\n                [loadingSuccessful]=\"file.loadingSuccessful\"\n                [responseMessage]=\"file.responseMessage\"\n                (removeFile)=\"removeFile(file)\">\n            </fileItem>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__Services_FileStore_service__["a" /* FilesStore */]])
], FileList);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetSizePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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
GetSizePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'getSize' })
], GetSizePipe);



/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileParser; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FileParser = (function () {
    function FileParser() {
    }
    FileParser.prototype.processFilesFromInput = function (items) {
        var _this = this;
        var newFiles = Object.keys(items).reduce(function (result, key) {
            var entry, item = items[key];
            if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
                if (entry.isFile) {
                    result.push(Promise.resolve(item.getAsFile()));
                }
                else if (entry.isDirectory) {
                    result.push(_this.processDirectory(entry));
                }
            }
            else if (item.getAsFile != null) {
                if ((item.kind == null) || item.kind === "file") {
                    result.push(Promise.resolve(item.getAsFile()));
                }
            }
            else if (item.isFile) {
                var pr = new Promise(function (resolve, reject) {
                    item.file(resolve, reject);
                });
                result.push(pr);
            }
            else if (item.isDirectory) {
                result.push(_this.processDirectory(item));
            }
            return result;
        }, []);
        return Promise.all(newFiles).then(this.flattenArrayOfFiles);
    };
    FileParser.prototype.processDirectory = function (directory) {
        var _this = this;
        var dirReader = directory.createReader(), result = [];
        var readEntries = function () {
            return new Promise(function (resolve, reject) {
                dirReader.readEntries(function (entries) {
                    var pr = [];
                    if (entries.length) {
                        for (var i = 0; i < entries.length; i++) {
                            pr.push(_this.processFilesFromInput({ 0: entries[i] }));
                        }
                    }
                    else {
                        resolve(null);
                    }
                    result.push(readEntries());
                    Promise.all(pr).then(_this.flattenArrayOfFiles).then(resolve);
                }, function (error) {
                    reject("Error while reading folder");
                });
            });
        };
        result.push(readEntries());
        return Promise.all(result).then(this.flattenArrayOfFiles);
    };
    FileParser.prototype.processInputFromDrop = function (e) {
        var items = e.dataTransfer.items;
        if (items && items.length && (items[0].webkitGetAsEntry != null)) {
            return Promise.resolve(this.processFilesFromInput(items));
        }
        else if (items && items.length && !items[0].webkitGetAsEntry) {
            return Promise.resolve(items);
        }
        else if (e.dataTransfer.files) {
            var files = [];
            for (var i = 0, l = e.dataTransfer.files.length; i < l; i++) {
                files.push(e.dataTransfer.files[i]);
            }
            return Promise.resolve(files);
        }
    };
    FileParser.prototype.flattenArrayOfFiles = function (arrayOfPromises) {
        return Promise.resolve(arrayOfPromises.reduce(function (result, file) {
            if (file) {
                return result.concat(file);
            }
        }, []));
    };
    return FileParser;
}());
FileParser = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], FileParser);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUpload; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FileUpload = (function () {
    function FileUpload() {
        this.zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]({ enableLongStackTrace: false });
        this.url = null;
        this.beforeRequest = null;
        this.beforeFileUpload = null;
        this.fileUploadedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
    FileUpload.prototype.uploadFiles = function (iFiles) {
        var _this = this;
        return Promise.all(iFiles.reduce(function (res, iFile) {
            return res.push(_this.uploadFile(iFile)), res;
        }, []));
    };
    FileUpload.prototype.uploadFile = function (iFile) {
        var _this = this;
        if (!this.url) {
            throw "url to upload needs to be provided";
        }
        if (iFile.loading) {
            throw "Already under loading";
        }
        var that = this, formData = new FormData();
        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (event) {
            var progress = (event.loaded * 100) / event.total | 0;
            _this.zone.run(function () {
                iFile.percentage = progress;
            });
        };
        var pr = new Promise(function (resolve, reject) {
            xhr.onload = xhr.onerror = function (e) {
                var _this = this;
                that.zone.run(function () {
                    if (_this["status"] == 200) {
                        iFile.loading = false;
                        iFile.loadingSuccessful = true;
                        resolve(true);
                    }
                    else {
                        iFile.loading = false;
                        iFile.loadingSuccessful = false;
                        reject(false);
                    }
                });
            };
        }).then(function (success) {
            _this.fileUploadedEvent.emit([success, xhr.response, iFile]);
        }, function (reason) {
            _this.fileUploadedEvent.emit([reason, xhr.response, iFile]);
        });
        iFile.loading = true;
        xhr.open("POST", this.url, true);
        //Hook before request to provide user ability to add headers or something else in XHR
        typeof this.beforeRequest === "function" && this.beforeRequest(xhr);
        formData.append("" + iFile.File.name, iFile.File);
        if (typeof this.beforeFileUpload === "function") {
            Promise.resolve(this.beforeFileUpload(formData)).then(function (formData) {
                formData && xhr.send(formData);
                formData || console.warn("beforeFileUpload didn't return formData for " + iFile.File.name + " and upload was aborted");
            });
        }
        else {
            xhr.send(formData);
        }
        return pr;
    };
    return FileUpload;
}());
FileUpload = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], FileUpload);



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileWrapper; });
var FileWrapper = (function () {
    function FileWrapper(file) {
        this.loading = false;
        this.percentage = 0;
        this.removing = false;
        this.responseMessage = "Error happened during upload";
        this.id = Math.random().toString(36).substr(2);
        this.loadingSuccessful = true;
        this.uploader = null;
        this.File = file;
    }
    return FileWrapper;
}());



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Directives_FileDroppa__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Directives_File__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Directives_FileDropZone__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Directives_FileList__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Pipes_GetSize_pipe__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDroppa", function() { return FileDroppa; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var FileDroppa = (function () {
    function FileDroppa() {
    }
    return FileDroppa;
}());
FileDroppa = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__Pipes_GetSize_pipe__["a" /* GetSizePipe */],
            __WEBPACK_IMPORTED_MODULE_2__Directives_FileDroppa__["a" /* FileDroppa */],
            __WEBPACK_IMPORTED_MODULE_3__Directives_File__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__Directives_FileDropZone__["a" /* FileDropZone */],
            __WEBPACK_IMPORTED_MODULE_5__Directives_FileList__["a" /* FileList */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__Directives_FileDroppa__["a" /* FileDroppa */],
            __WEBPACK_IMPORTED_MODULE_3__Directives_File__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__Directives_FileDropZone__["a" /* FileDropZone */],
            __WEBPACK_IMPORTED_MODULE_5__Directives_FileList__["a" /* FileList */]
        ],
    })
], FileDroppa);



/***/ })
/******/ ]);
});
//# sourceMappingURL=file-droppa.umd.js.map