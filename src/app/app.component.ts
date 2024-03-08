import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AutowareComponent } from '../autoware/autoware.component';
import { PointCloudComponent } from './point-cloud/point-cloud.component';

@Component({
  selector: 'app-root',
  standalone: true ,
  imports: [RouterOutlet, MatTabsModule, MatButtonToggleModule, MatIconModule, AutowareComponent ,PointCloudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'my-electron-app';
  constructor(){
    this.title = "Test Electron!";
  }

}