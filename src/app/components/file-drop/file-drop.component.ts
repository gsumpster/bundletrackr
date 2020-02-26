import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bt-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileDropComponent implements OnInit {

  @Input() public dropZoneLabel;
  @Input() public dropZoneClassName;
  @Input() public contentClassName;
  @Output() public onFileDropped = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
