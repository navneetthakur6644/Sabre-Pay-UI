import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilityServiceComponent } from './utility-service/utility-service.component';

import { HttpClientModule } from '@angular/common/http';  
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component'; 
import {
  AbstractCameraService,
  cameraFactory
} from './services/abstract-camera.service';
import { DesktopCameraService } from './services/desktop-camera.service';
import { FaceRecognitionService } from './services/face-recognition.service';
import { MobileCameraService } from './services/mobile-camera.service';
import { PlatformInformationProvider } from './services/platform-information.provider';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './services/login.service';
import { EthcontractService } from './services/ethcontract.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilityServiceComponent,
    LoginComponent,
	DashboardComponent,
	ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DesktopCameraService,
    MobileCameraService,
    FaceRecognitionService,
    LoginService,
    EthcontractService,
    PlatformInformationProvider,
    {
      provide: AbstractCameraService,
      useFactory: cameraFactory,
      deps: [PlatformInformationProvider]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

