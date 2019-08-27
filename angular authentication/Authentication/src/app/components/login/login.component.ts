import { Auth } from "./../../class/auth";
import { AuthService } from "./../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      (data: Auth) => {
        // console.log(data)
        this.tokenService.SetToken(data.token);
        this.loginForm.reset();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
