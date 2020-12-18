import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  friends: any;
  constructor(private frSrv: FriendsService) { }

  ngOnInit() {
    this.frSrv.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.friends = data;
      console.log(data);
    });
  }

  delete(event, key) {
    console.log(key);
    this.frSrv.delete(key).then(res => {
      console.log(res);
    });
  }
}
