import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Friends } from './friends';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private dbPath = '/friends';
  friendsRef: AngularFireList<Friends> = null;

  constructor(private db: AngularFireDatabase) {
    this.friendsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Friends> {
    return this.friendsRef;
  }

  create(friends: Friends): any {
    return this.friendsRef.push(friends);
  }

  update(key: string, value: any): Promise<void> {
    return this.friendsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.friendsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.friendsRef.remove();
  }
}
