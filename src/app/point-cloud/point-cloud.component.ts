import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-point-cloud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './point-cloud.component.html',
  styleUrl: './point-cloud.component.scss'
})

export class PointCloudComponent {
  pointCloud: FormGroup | any;
  ipc: IpcRenderer | any;
  constructor(private fb:FormBuilder){
    this.initIPC();

    this.pointCloud = this.fb.group({
      path: ['', Validators.required],
      inputDir: ['', Validators.required],
      outputDir: ['', [Validators.required]],
      prefix: ['', [Validators.required]],
      config: ['', [Validators.required]],
    });
    if ((<any>window)?.require) {
      this.ipc.on("directorySelected", async (event, arg) => {
        console.log('event: ', event);
        console.log('arg: ', arg);
      });
    }
  }

  initIPC() {
    if ((<any>window)?.require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }

  openDirectory(){
    this.ipc.send('openDirectory');
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target;
    console.log('Selected File:', selectedFile);
  }
}
