import { Component,EventEmitter, OnInit,Input, Output } from '@angular/core';

@Component({
  selector: 'app-commo-alert',
  templateUrl: './commo-alert.component.html',
  styleUrls: ['./commo-alert.component.css']
})
export class CommoAlertComponent implements OnInit {
  @Output() onCloseAlert = new EventEmitter();
  @Input() alertContent: any;
  @Input() alertType: any;
  constructor() { }

  ngOnInit() {
  }
  deleteaction() {
    this.onCloseAlert.emit('D')
  }

  closeModal() {
    this.onCloseAlert.emit('')
  }
}
