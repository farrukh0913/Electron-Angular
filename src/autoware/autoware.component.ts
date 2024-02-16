import { Component, HostListener } from '@angular/core';
import { IpcRenderer } from 'electron';
import * as echarts from 'echarts';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { callJSFun } from '../assets/test.js';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'autoware-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './autoware.component.html',
  styleUrl: './autoware.component.scss'
})

export class AutowareComponent {
  title = 'my-electron-app';
  charts: any;
  users: any[] = [];
  ipc: IpcRenderer | any;
  autoWareForm: FormGroup | any;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (this.charts) {
      this.charts.resize();
    }
  }

  constructor(private readonly fb: FormBuilder) {
    this.initIPC();
    this.autoWareForm = this.fb.group({
      map_Path: ['$HOME/autoware_map/sample-map-t', Validators.required],
      vechile_Model: ['sample_vehicle', [Validators.required]],
      sensor_model: ['sample_sensor_kit', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const chartElement = document.getElementById('echarts-chart');
    this.charts = echarts.init(chartElement);

    // Define your chart options
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true,
        show: false
      },
      xAxis: [
        {
          type: 'category',
          data: ['cpu0', 'cpu2', 'cpu4', 'cpu6', 'cpu8', 'cpu10', 'cpu12', "cpu14", "cpu16", "cpu18"],
        }

      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'transperent'
            }
          }
        },



      ],

      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '30%',
          data: [100, 150, 200, 334, 390, 330, 220, 120, 330, 240]
        }
      ]
    };

    // Set chart options and data
    this.charts.setOption(option);
  }

  async launchAutoware() {
    // callJSFun();
    console.log('this.autoWareForm.value: ', this.autoWareForm.value);
    const command: string = `ros2 launch autoware_launch planning_simulator.launch.xml map_path:=${this.autoWareForm.value.map_Path} vehicle_model:=${this.autoWareForm.value.vechile_Model} sensor_model:=${this.autoWareForm.value.sensor_model}`
    const commands = {
      bashCommand: 'mkdir ~/Desktop/school',
      launchAutoware: 'mkdir ~/Desktop/school2'
    }

    this.ipc.send('runTerminalCommands', commands);
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

}