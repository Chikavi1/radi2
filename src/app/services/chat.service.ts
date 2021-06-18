import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_message(record) {
    return this.firestore.collection('messages').add(record);
  }

  read_messages(id) {
    return this.firestore.collection('messages', ref => ref.where('ChatID', '==', id).orderBy("Date", "asc")).snapshotChanges();
  }

  update_message(recordID,record){
    this.firestore.doc('messages/' + recordID).update(record);
  }

  delete_message(record_id) {
    this.firestore.doc('messages/' + record_id).delete();
  }
}