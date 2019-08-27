import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoginRoute= false

  constructor(private location:Location) { }

  ngOnInit() {
    if(this.location.path() !== ''){
      this.isLoginRoute= true
    }
  }

}

