import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { JexiaDataService } from '../services/jexia-data.service';
import { ITeacher } from '../interfaces/ITeacher';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  
  city: string;
  
  constructor(private storage: Storage, private jexiaDataService:JexiaDataService, private  toastController: ToastController ) { 
   
    this.storage.get('location').then((val)=>{
      if(val != undefined){
        let settings = JSON.parse(val);
        this.city = settings.city;
        
      } else {
        //get geolocation: nice for part 2?
      }
    })


  }

  ngOnInit() {
  }

  async saveSettings(){
    let location = {
      city: this.city,
    }

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
      this.storage.set('location', JSON.stringify(location));      
      const toast = await this.toastController.create({
        message: 'Your settings have been saved.',
        duration: 2000
      });
      toast.present();  
    }
   
  }

}
