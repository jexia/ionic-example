import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Dataset } from 'jexia-sdk-js/api/dataops/dataset';
import { DataOperations } from '@jexia/ng-jexia';
import { field } from 'jexia-sdk-js/api/dataops/filteringApi';
import { ITeacher } from '../interfaces/ITeacher';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JexiaDataService {
  //create a property from type Dataset with ITeacher interface and set it dataset teachers
  teacherdataset: Dataset<ITeacher> = this.dataOperations.dataset<ITeacher>('teachers');
  //select it and execute it 
  teachers: Promise<ITeacher[]> = this.teacherdataset.select().execute();
  //initalize behaviorsubject, default value is null
  teacherSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //using only the observable side of the behaviorsubject and let other components subscribe
  currentMessage: Observable<ITeacher[]> = this.teacherSource.asObservable();

 constructor(public dataOperations: DataOperations) {   }

 updateTeachers(teacherobj: any): void {
  let filterCondition = field("location").isEqualTo(teacherobj.city)
  let filteredTeachers = this.teacherdataset.select().where(filterCondition).execute().then(data => {
    //sending out the messagestream
    this.teacherSource.next(data);
  });
   
 }
 getAllTeachers(){
   this.teachers.then(data => {
     this.teacherSource.next(data);
   })
 }

}
