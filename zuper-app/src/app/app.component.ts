import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zuper-app';
  fieldGroups !: any[];
  selectedItem !: any;
  newItem = {name:'',description:'',elements:[]}

  ngOnInit(){
    this.fieldGroups = [
      {name:'AMC Reports',description:'test1',elements:[{emailId:'test'}]},
      {name:'HVAC Repair',description:'test2',elements:[{emailId:'test'}]},
      {name:'AMC Yearly',description:'test3',elements:[{emailId:'test'}]},
      {name:'AMC Installations',description:'test4',elements:[{emailId:'test'}]}  
    ];
    this.selectedItem = this.fieldGroups[0];
  }

  onClickItem(item:any){
   console.log(item);
   this.selectedItem = item; 
  }

  createNewItem(){
    this.fieldGroups.push(this.newItem)
  }
}
