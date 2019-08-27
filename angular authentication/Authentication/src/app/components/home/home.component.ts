import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
users:any=[];
isValid:boolean;
LoginUser:any;
  constructor(
    private authService:AuthService,
    private tokenService:TokenService,
    private router:Router
    ) { }

  ngOnInit() {
     this.getAllUsers();
     this.isLogin();
  }

  isLogin(){
   
   this.LoginUser = this.tokenService.GetToken();
   
  }




  getAllUsers(){
     this.authService.getUsers().subscribe(data=>{
       console.log(data)
       this.users=data.users
       this.isValid=true;
     },
     err=>{
       console.log(err)
       if(err.error.token=== null){
         this.isValid=false;
         setTimeout(()=>{
          this.tokenService.DeleteToken();
          this.router.navigate(['/']);
         }, 5000)
          
       }

     })
  }

  logout(){
    
    this.router.navigate(['/']);
    this.tokenService.DeleteToken();
  }

}
