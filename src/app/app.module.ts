import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { JexiaDataService } from './services/jexia-data.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage'; 
import { NgJexiaModule, DataOperationsModule } from '@jexia/ng-jexia';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgJexiaModule.initialize({
      projectID: '58c0dce5-5290-4504-a0da-9d43b3f9453d',
      key: '9f156831-547c-4c22-876e-6e4ffaeed229',
      secret: 'kjqaeCiuOOdt5raM',
      providers: [
        DataOperationsModule,
      ],
    })

  ],
  providers: [
    StatusBar,
    JexiaDataService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
