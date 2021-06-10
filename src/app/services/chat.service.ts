import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewStudent(record) {
    return this.firestore.collection('students').add(record);
  }

  read_Students() {
    return this.firestore.collection('students', ref => ref.where('ChatID', '==', "asd1").orderBy("Date", "asc")).snapshotChanges();
  }

  update_Student(recordID,record){
    this.firestore.doc('students/' + recordID).update(record);
  }

  delete_Student(record_id) {
    this.firestore.doc('students/' + record_id).delete();
  }
}