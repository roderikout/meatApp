import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cut-add',
  templateUrl: './cut-add.page.html',
  styleUrls: ['./cut-add.page.scss'],
})
export class CutAddPage implements OnInit {
  public createCutForm: FormGroup;

  constructor(
    public loadingCtrl:  LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createCutForm = formBuilder.group({
      cutName: ['', Validators.required],
      recipeList: ['', Validators.required],
    });
   }

   async createCut() {
    const loading = await this.loadingCtrl.create();

    const cutName = this.createCutForm.value.cutName;
    const recipeList = this.createCutForm.value.recipeList;

    this.firestoreService.createCut(cutName, recipeList).then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('');
        });
      },
      error => {
        console.error(error);
      }
    );

    return await loading.present();
   }

  ngOnInit() {
  }
}
