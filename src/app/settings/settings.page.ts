import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { JexiaDataService } from '../services/jexia-data.service';
import { ITeacher } from '../interfaces/ITeacher';
import { ILocation } from '../interfaces/ILocation';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  location: ILocation;
  city: string;
  
  constructor(private storage: Storage, private jexiaDataService:JexiaDataService, private  toastController: ToastController ) { }

  ngOnInit() {
    this.getLocationLocalStorage();

  }

  getLocationLocalStorage() {
    this.storage.get('location').then(val => {
      if(val != undefined){
        let location = JSON.parse(val);
        this.city = location.city;
      }
    })
  }

  setLocationLocalStorage(location: ILocation){
    this.storage.set('location', JSON.stringify(location))
  }

  async saveSettings(){
    let location = {city: this.city} as ILocation

    if(location.city == ""){
      this.storage.clear();
      this.jexiaDataService.getAllTeachers();
      const toast = await this.toastController.create({
        message: 'Your settings have been saved to default.',
        duration: 2000
      });
      toast.present();  
    } else {
      this.jexiaDataService.updateTeachers(location);
      this.setLocationLocalStorage(location);
      //this.storage.set('location', JSON.stringify(location));      
      const toast = await this.toastController.create({
        message: 'Your settings have been saved.',
        duration: 2000
      });
      toast.present();  
    }
   
  }

}
