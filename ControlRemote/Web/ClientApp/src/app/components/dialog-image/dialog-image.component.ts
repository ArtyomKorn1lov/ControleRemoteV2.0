import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PathModel } from 'src/app/models/PathModel';
import { ModelImageStatistic } from 'src/app/models/ModelImageStatistic';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent implements OnInit {

  public imageBase64: string = "";
  public domain: string = "";
  public login: string = "";
  public name: string = "";
  public station: string = "";
  public date: string = "";
  public time: string = "";
  private index: number = 0;
  private imageModels: ModelImageStatistic[] = [];

  constructor(public dialogRef: MatDialogRef<DialogImageComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fileService: FileService) { }

  public close(): void {
    this.dialogRef.close();
  }

  public async prevImage(): Promise<void> {
    this.index--;
    if (this.index < 0)
      this.index = this.imageModels.length - 1;
    this.time = this.printZero(this.imageModels[this.index].hour) + ':' + this.printZero(this.imageModels[this.index].minute);
    const pathModel = new PathModel(this.imageModels[this.index].imagePath);
    await this.fileService.getImage(pathModel).subscribe({
      next: (data) => {
        this.imageBase64 = "data:image/png;base64," + data;
        return;
      },
      error: (bad) => {
        console.log(bad);
        this.imageBase64 = "assets/no-img.jpg";
        return;
      }
    });
  }

  public async nextImage(): Promise<void> {
    this.index++;
    if (this.index > this.imageModels.length - 1)
      this.index = 0;
    this.time = this.printZero(this.imageModels[this.index].hour) + ':' + this.printZero(this.imageModels[this.index].minute);
    const pathModel = new PathModel(this.imageModels[this.index].imagePath);
    await this.fileService.getImage(pathModel).subscribe({
      next: (data) => {
        this.imageBase64 = "data:image/png;base64," + data;
        return;
      },
      error: (bad) => {
        console.log(bad);
        this.imageBase64 = "assets/no-img.jpg";
        return;
      }
    });
  }

  public printZero(hour: number): string {
    if (hour < 10)
      return '0' + hour;
    return hour.toString();
  }

  public async ngOnInit(): Promise<void> {
    this.domain = this.data.domain;
    this.login = this.data.login;
    this.name = this.data.name;
    this.station = this.data.station;
    this.date = this.data.date;
    const hour_j = this.data.j;
    const minute_i = this.data.i;
    this.imageModels = this.data.imageModel;
    let pathModel = new PathModel("");
    for (let count = 0; count < this.imageModels.length; count++) {
      if (this.imageModels[count].index_hour == hour_j && this.imageModels[count].index_minute == minute_i) {
        this.index = count;
        this.time = this.printZero(this.imageModels[count].hour) + ':' + this.printZero(this.imageModels[count].minute);
        pathModel = new PathModel(this.imageModels[count].imagePath);
        await this.fileService.getImage(pathModel).subscribe({
          next: (data) => {
            this.imageBase64 = "data:image/png;base64," + data;
            return;
          },
          error: (bad) => {
            console.log(bad);
            this.imageBase64 = "assets/no-img.jpg";
            return;
          }
        });
      }
    }
  }

}
