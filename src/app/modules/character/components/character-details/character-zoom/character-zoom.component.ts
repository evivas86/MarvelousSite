import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-character-zoom',
  templateUrl: './character-zoom.component.html',
  styleUrls: ['./character-zoom.component.sass']
})
export class CharacterZoomComponent {

  public Img;

  constructor(
    public dialogRef: MatDialogRef<CharacterZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { img }) {
    this.Img = data.img;
  }

  public close(): void {
    this.dialogRef.close();
  }
}
