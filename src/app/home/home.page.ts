import { Component, OnInit } from '@angular/core';
import { JexiaDataService } from '../services/jexia-data.service';
import { ITeacher } from '../interfaces/ITeacher';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  location: Object;
  currentTeachers: ITeacher[];

  constructor(private jexiaDataService: JexiaDataService, private storage: Storage) {}

  ngOnInit(){
    this.showNearestTeacher();  
  }

  showNearestTeacher(){
    this.jexiaDataService.currentMessage.subscribe(message => this.currentTeachers = message)
    //check if there is a value in local storage
    this.storage.get('location').then((val) => {
    //if the currentTeachers has not yet been filled, use the entire dataset with records
    if((this.currentTeachers == null) && (val == undefined)) {
      this.jexiaDataService.getAllTeachers();  
    } else {
      this.location = JSON.parse(val);
      this.jexiaDataService.updateTeachers(this.location)
    }  

  })
  
 }
  
}
