import { Auth } from './../../class/auth';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
 // loading:boolean=false;
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private tokenService:TokenService,
    private router:Router,
      ) { }
  

  ngOnInit() {
    this.regForm = this.fb.group({
      username:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      })
    //  this.tokenService.DeleteToken();
  }
  

  register(){
  //console.log(this.regForm.value)
   this.authService.registerUser(this.regForm.value).subscribe((data:Auth)=>{
   this.tokenService.SetToken(data.token);
   this.regForm.reset();
  
    //console.log(this.tokenService.GetToken())
   // this.loading= true;
    this.router.navigate(['/login']);
   
   //this.loading= false;
   
   },err=>{
     console.log(err)
   }
   )
  }

}
