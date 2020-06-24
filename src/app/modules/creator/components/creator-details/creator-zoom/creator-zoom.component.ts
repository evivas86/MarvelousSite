import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-creator-zoom',
  templateUrl: './creator-zoom.component.html',
  styleUrls: ['./creator-zoom.component.sass']
})
export class CreatorZoomComponent {

  public Img;

  constructor(
    public dialogRef: MatDialogRef<CreatorZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { img }) {
    this.Img = data.img;
  }

  public close(): void {
    this.dialogRef.close();
  }
}
