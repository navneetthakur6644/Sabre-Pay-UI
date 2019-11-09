import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { AbstractCameraService } from '../services/abstract-camera.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../classes/user';
import { LoginService } from '../services/login.service';
import { TableComponent } from '../table/table.component';
import { ContentComponent } from '../content/content.component';
import { EthcontractService } from '../services/ethcontract.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Wallet } from '../classes/wallet';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;
  message: string;
  imageString = '';
  faceApiResponse: Observable<FaceRecognitionResponse>;
  face: FaceRecognitionResponse;
  //subscriptionKey: string = 'b36a4edbc372433ea78d2786acb63dbe';
  //subscriptionKey: string = 'f19864adc9dc421b999b28f03212170b';
  subscriptionKey = environment.subscriptionKey;
  isButtonVisible = true;
  //userForm: any;
  statusCode: number;
  walletId: Wallet;

  userForm = new FormGroup({
    email : new FormControl(),
    password : new FormControl(),
    userRole : new FormControl(),
    faceID : new FormControl(),
    walletID : new FormControl()
  });

  constructor(private formbulider: FormBuilder,
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: AbstractCameraService,
    private loginService:LoginService,
    private tableComponent:TableComponent,
    private ethcontractService: EthcontractService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginService.getWalletId()
    .subscribe((wallet: any) => {
          console.log("wallet json : " + JSON.stringify(wallet));
          this.walletId = wallet;
          console.log("wallet address: " + this.walletId.address);   
    },
    errorCode =>  this.statusCode = errorCode);
  }

  processImage() {
    console.log("Inside register page processImage");
    if (!this.subscriptionKey) {
      console.log("register page subscriptionKey  Invalid");
      return;
    }

    this.faceApiResponse = this.cameraService.getPhoto().pipe(
      switchMap(base64Image => {
        console.log("Inside getPhoto register page");
        this.isButtonVisible = false;
        this.imageString = base64Image;
        return this.faceRecognitionService.scanImage(
          this.subscriptionKey,
          this.imageString
        );
      })
    );
  }


  onFormSubmit()    
  { 
    console.log("Entry onFormSubmit register component");
    this.subscribeFaceAPI();

    this.delay(4000).then(any=>{
      let faceRes = this.face[0];
      console.log("Face ID: " + faceRes["faceId"]);  
      this.userForm.get('faceID').setValue(faceRes["faceId"]);
  
      console.log("Wallet address ID: " + this.walletId.address);
      this.userForm.get('walletID').setValue(this.walletId.address);
      const user = this.userForm.value;
      //console.log("Face Id from user : " + user.faceId);
      console.log("wallet : " + JSON.stringify(this.walletId));
      this.creatUser(user);
      console.log("Exit onFormSubmit register component");
    });
  }

  subscribeFaceAPI() {
    console.log("Entry subscribeFaceAPI method onClick");
    this.faceRecognitionService.scanImage(
      this.subscriptionKey,
      this.imageString
      ).subscribe((faceResponse) => {
      console.log("Face recognition json : " + JSON.stringify(faceResponse));
      this.face = faceResponse;
      console.log("Face recognition json : " + JSON.stringify(this.face));
      //let faceRes = this.face[0];
      //console.log("Face ID: " + faceRes["faceId"]);   
      },
      errorCode =>  this.statusCode = errorCode);
      console.log("Exit subscribeFaceAPI method onClick");
  }

  
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
  creatUser(user:User)    
  {    
    this.loginService.createUser(user).subscribe(    
    ()=>    
    {    
      this.data = true;    
      this.message = 'Data saved Successfully';    
      this.userForm.reset();
      this.router.navigate(['/Dashboard']);    
    });    
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("body " + body);
  }
      private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
      }

}
