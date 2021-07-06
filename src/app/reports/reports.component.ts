import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
userlist:any=[];
actionPlantype: string = 'A';
alertContent:any;
del_id:any;
toastmsg:any='';
logtype:any;
  constructor( public authenticationService: AuthenticateService,private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) { }

  ngOnInit() {
    this.logtype=localStorage.getItem('Designation')

    this.getusers();
  }
getusers(){
  this.authenticationService.getallusers().subscribe((res: any) => {
    if (res.status == 200) {
    this.userlist=res.response;
  console.log('this',this.userlist);

    }else{
      this.userlist=[];

    }
  })
}
deleteuser(id, temp, flag, content) {
  this.actionPlantype = flag;
  this.alertContent = content;
   this.del_id = id;
  this.ngbmodalActive = this.ngbmodal.open(temp, { size: 'sm', backdrop: 'static', windowClass: 'Center-aligned' });
}
deleteaction() {
  let obj = 
    {
      "_id":this.del_id,
      
  };
  console.log(obj)
  this.authenticationService.deleteuser(obj).subscribe((dataRes: any) => {
    if (dataRes.status == 200) {
      this.toastmessage('deleted successfully');

      this.ngbmodalActive.close();
       this.getusers();
    }
  });
}

onCloseAlert(type, content) {​​​​​​​​
  if (type == 'D') {​​​​​​​​
  this.deleteaction();
  this.ngbmodalActive.close()
  }​​​​​​​​ else {​​​​​​​​
  this.ngbmodalActive.close();
   }​​​​​​​​
   
  }​​​​​​​​
  toastmessage(msg) {
    this.toastmsg = msg;
    setTimeout(() => {
      this.toastmsg = '';
    }, 2000);
  }
}
