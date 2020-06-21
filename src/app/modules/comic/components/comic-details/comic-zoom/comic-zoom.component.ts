import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-zoom',
  templateUrl: './comic-zoom.component.html',
  styleUrls: ['./comic-zoom.component.sass']
})
export class ComicZoomComponent {

  public Img;

  constructor(
    public dialogRef: MatDialogRef<ComicZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { img }) {
    this.Img = data.img;
  }

  public close(): void {
    this.dialogRef.close();
  }
}
