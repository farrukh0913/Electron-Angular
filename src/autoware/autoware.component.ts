import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as echarts from 'echarts';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export class MyModule {}

@Component({
  selector: 'autoware-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './autoware.component.html',
  styleUrl: './autoware.component.scss'
})

export class AutowareComponent {
  title = 'my-electron-app';
  charts: any;
  users: any[] = [];

  constructor(private http: HttpClient) {}
  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.renderChart();
  }

  onResize(event: Event): void {
    if (this.charts) {
      this.charts.resize();
    }
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
          data: ['cpu0', 'cpu2', 'cpu4', 'cpu6', 'cpu8', 'cpu10', 'cpu12',"cpu14", "cpu16","cpu18"],


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
          data: [100, 150, 200, 334, 390, 330, 220,120,330,240]
        }
      ]
    };

    // Set chart options and data
    this.charts.setOption(option);
  }

  getUsers() {
    this.http.get('http://localhost:3000/users')
      .subscribe((data: any) => {
        console.log('data: ', data);
        this.users = data
        // handle the data
      });
  }

}

