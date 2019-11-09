import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { AbstractCameraService } from '../services/abstract-camera.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Login } from '../classes/login';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = false;
  message: string;
  imageString = '';
  faceApiResponse: Observable<FaceRecognitionResponse>;
  //subscriptionKey: string = 'b36a4edbc372433ea78d2786acb63dbe';
  //subscriptionKey: string = 'f19864adc9dc421b999b28f03212170b';
  subscriptionKey = environment.subscriptionKey;
  isButtonVisible = true;
  model : any={};
  errorMessage:string;

  userForm = new FormGroup({
    email : new FormControl(),
    password : new FormControl(),
  });

  constructor(
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: AbstractCameraService,
    private loginService: LoginService,
    private router: Router
  ) {}

  processImage() {
    console.log("Inside processImage");
    if (!this.subscriptionKey) {
      console.log("subscriptionKey Invalid");
      return;
    }

    this.faceApiResponse = this.cameraService.getPhoto().pipe(
      switchMap(base64Image => {
        console.log("Inside getPhoto");
        this.isButtonVisible = false;
        this.imageString = base64Image;
        return this.faceRecognitionService.scanImage(
          this.subscriptionKey,
          base64Image
        );
      })
    );
  }

  onFormSubmit()    
  { 
    console.log("Entry onFormSubmit login component");
    const user = this.userForm.value;
    this.loginUser(user);
  }
  
  loginUser(login:Login)    
  {    
    this.loginService.login(login).subscribe(    
    ()=>    
    {    
      this.data = true;    
      this.message = 'User logged-in Successfully';    
      this.userForm.reset();
      this.router.navigate(['/Dashboard']);    
    });    
  }

  ngOnInit() {
  }

}
