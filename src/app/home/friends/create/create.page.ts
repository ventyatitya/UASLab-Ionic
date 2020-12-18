import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Friends } from '../friends';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  isDesktop: boolean;
  key: string;

  @ViewChild('f', null) f: NgForm;
  friend: any;
  constructor(
    private router: Router,
    private frSrv: FriendsService,
    private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('friendKey')) { return; }
      const key = paramMap.get('friendKey');
      this.key = key;

      this.db.object<Friends>('/friend/' + key).valueChanges().subscribe(data => {
        this.friend = data;
      });
    });

    setTimeout(() => {
      this.f.setValue(this.friend);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.frSrv.create(form.value).then(res => {
      console.log(res);
      this.router.navigateByUrl('./friends');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('.friends');
  }
}
