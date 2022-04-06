import { EventEmitter } from '@angular/core';
import { FilesStore } from "../Services/FileStore.service";
import { FileUpload } from "../Services/FileUpload.service";
export declare class FileDroppa {
    filesStore: FilesStore;
    private fileUploadService;
    showFilesList: boolean;
    autoUpload: boolean;
    beforeRequest: Function;
    url: string;
    beforeFileUpload: Function;
    beforeAddFile: Function;
    dropZoneTemplate: string;
    filesUpdated: EventEmitter<{}>;
    fileUploaded: EventEmitter<{}>;
    uploadButtonTemplate: string;
    removeButtonTemplate: string;
    multiple: boolean;
    constructor(filesStore: FilesStore, fileUploadService: FileUpload);
    private startAutoUploading(iFile);
    /**
     * We got to pass Input parameters to Service instances
     */
    ngOnInit(): void;
    removeAllFiles(): void;
    uploadAllFiles(): void;
}
