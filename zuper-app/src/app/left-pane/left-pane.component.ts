import { ChangeDetectorRef, Component, EventEmitter, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrl: './left-pane.component.scss'
})
export class LeftPaneComponent {

    fieldGroups !: any[];
    
    newItem = {name:'',description:'',elements:[]}
    isModalOpen !: boolean;
    taskName !: string;
    descriptionName !: string;
    displayError = false;
    index !: number;
    @Output() indexEmitter =new EventEmitter<number>();
    @Output() defaultItem = new EventEmitter<boolean>();
    @Output() isEditable = new EventEmitter<boolean>();
    @Output() selectedItem = new EventEmitter();
  
    constructor(private cd:ChangeDetectorRef){}
  
    ngOnInit(){
      this.fieldGroups = [
        {name:'AMC Reports',description:'test1',elements:[{label:"Email",type:'input-text',value:"test"}]},
        {name:'HVAC Repair',description:'test2',elements:[{label:"Text area",type:'input-text-area',value:""}]},
        {name:'AMC Yearly',description:'test3',elements:[{label:"Phone Number",type:'input-number',value:""}]},
        {name:'AMC Installations',description:'test4',elements:[{emailId:'test'}]}  
      ];
  
      this.selectedItem.emit(JSON.parse(JSON.stringify(this.newItem)));
      this.isEditablefn(true)
      this.cd.detectChanges()
    }

    ngOnChanges(changes:SimpleChanges){
      if(changes['fieldGroups']){
        this.fieldGroups = JSON.parse(JSON.stringify(changes['fieldGroups'].currentValue));
      }
        console.log(changes['fieldGroups'].currentValue)
      
    }
  
    onClickItem(item:any,i:number){
      this.isEditablefn(false)
     this.defaultItem.emit(false);
     console.log(item);
     this.selectedItem.emit(JSON.parse(JSON.stringify(item))); 
     this.indexEmitter.emit(i);
     this.index = i
     this.cd.detectChanges()
    }
  
    draggedIndex: number | null = null;
  
    onDragStart(event: DragEvent, index: number): void {
      this.draggedIndex = index;
      event.dataTransfer?.setData('text/plain', index.toString());
    }
  
    onDragOver(event: DragEvent): void {
      event.preventDefault();
    }
  
    onDrop(event: DragEvent, dropIndex: number): void {
      event.preventDefault();
  
      if (this.draggedIndex !== null) {
        const draggedItem = this.fieldGroups[this.draggedIndex];
        const targetItem = this.fieldGroups[dropIndex];
  
        this.fieldGroups[this.draggedIndex] = targetItem;
        this.fieldGroups[dropIndex] = draggedItem;
  
        this.draggedIndex = null;
      }
    }
  
    openModal() {
      this.isModalOpen = true;
      this.displayError = false;
      this.taskName = "";
      this.descriptionName = ""
    }
  
    closeModal() {
      this.isModalOpen = false;
    }
  
    Onsubmit(){
      this.displayError = false;
      if(this.taskName.trim().length >= 1){
        this.addNewItem(this.taskName,this.descriptionName);
        this.closeModal();
      } else{
        this.displayError = true;
      }
     
    }
  
    addNewItem(name:string,description:string){
      let newItem = JSON.parse(JSON.stringify(this.newItem));;
      newItem.name = name;
      newItem.description = description
      this.fieldGroups.push(newItem)
    }
  
    onDefaultClick(){
      this.selectedItem.emit(JSON.parse(JSON.stringify(this.newItem)));
      this.indexEmitter.emit(-1)
      this.index = -1
      this.defaultItem.emit(true);
      this.isEditablefn(true)
    }
  
    copyText(){
      
    }

    isEditablefn(val:boolean){
      this.isEditable.emit(val)
    }
  
}
