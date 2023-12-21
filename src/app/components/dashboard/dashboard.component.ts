import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private http: HttpService, private router: Router) { }
  usersList: any = [];
  columns: string[] = [];
  sortedColumn: string = "";
  shadow!:any;
  allSelector:boolean=false;
dragit(event:any){
  this.shadow=event.target;
}
dragover(e:any){
  let children=Array.from(e.target.parentNode.parentNode.children);
if(children.indexOf(e.target.parentNode)>children.indexOf(this.shadow))
  e.target.parentNode.after(this.shadow);
  else e.target.parentNode.before(this.shadow);
}

  
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.getdataFromServer('users').subscribe((Response: any) => { //actual backend responsed
      if (Response && Response.length > 0) {
        this.usersList = Response;
        this.columns = Object.keys(this.usersList[0]);
        let finalListCol= delete this.usersList[0].select;
        this.columns=Object.keys(this.usersList[0]);
      }
    },
      (err: any) => {
        alert(err);
      }
    );
  }
  onChangeUserlist(event:any){
    const id=event.target.value;
    const isChecked= event.target.checked;
    // console.log(isChecked,id);

    this.usersList=this.usersList.map((el:any)=>{
      if(el.id==id){
        el.select=isChecked;
        return el;
      }
      if(id==-1){
        console.log(this.allSelector);
        el.select=this.allSelector;
        return el;
      }
      return el;
    });
    // console.log(this.allSelector);
    // console.log(this.usersList);
   }
   deleteRecord(){
    let list:any=[];
    let selectedId=this.usersList.filter((el:any)=>el.select).map((el:any)=>el.id);
    console.log("Deleted id",selectedId);
  

    if(selectedId.length>0){
      this.http.deleteRecords(selectedId as number[]).subscribe(
        (resp:any)=>{
          this.usersList=this.usersList.filter((data:any)=>!data.select);
          console.log("false data",this.usersList);
        },
        (err:any)=>{
          alert("something went wrong");
        }
      );
    }
    else{
      alert("You must select atleast one record!");
    }
  
   }

  // delete(user: any, index: number) {
  //   const endPoint = 'users/' + user.id;
  //   this.http.deleteDataFromServer(endPoint).subscribe(
  //     (response: any) => {
  //       this.usersList.splice(index, 1);
  //       // console.log("Data deleted successfully!",response);
  //       alert("Data deleted successfully!");
  //     },
  //     (error: any) => {
  //       alert(error);
  //     }
  //   );
  // }
  logout() {
    this.router.navigate(['/login']);
  }

}
