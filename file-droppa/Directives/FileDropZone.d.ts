import { ElementRef } from '@angular/core';
import { FileParser } from "../Services/FileParser.service";
import { FilesStore } from "../Services/FileStore.service";
export declare class FileDropZone {
    private filesStore;
    private el;
    private fileParser;
    private hiddenFileInput;
    promise: any;
    constructor(filesStore: FilesStore, el: ElementRef, fileParser: FileParser);
    multiple: boolean;
    onClick(e: any): void;
    drop(e: any): void;
    dragenter(e: any): void;
    dragover(e: any): void;
    dragleave(e: any): void;
    OnDestroy(): void;
    updateStyles(dragOver?: boolean): void;
    updateFilesStore(files: Array<File>): void;
    createHiddenInput(): void;
}
