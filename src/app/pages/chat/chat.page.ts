import { Component,  OnInit, ViewChild } from '@angular/core';

import { ChatService } from '../../services/chat.service';

import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})


export class ChatPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent, static: false}) myContent: IonContent;
  students: any;
  text:string = null;

  constructor(private crudService: ChatService) {

  }
  ScrollToBottom(){
    setTimeout(() => {
      this.myContent.scrollToBottom(300);
   }, 1250);

  }

  ScrollToBottomMessage(){
    setTimeout(() => {
      this.myContent.scrollToBottom(300);
   }, 300);

  }


  ngOnInit() {

    this.ScrollToBottom();


    this.crudService.read_Students().subscribe(data => {

      this.ScrollToBottomMessage();

      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          date: e.payload.doc.data()['Date'],
          text: e.payload.doc.data()['Text'],
          chatId: e.payload.doc.data()['ChatID'],
          role: e.payload.doc.data()['Role'],
        };
      })
      console.log(this.students);

    });
  }


  enviar(){
    let record = {};
    record['Date'] = new Date();
    record['Text'] = this.text;
    record['ChatID'] = "asd1";
    record['Role'] = 1;

    this.crudService.create_NewStudent(record).then(resp => {
      this.text = "";
      this.ScrollToBottomMessage();

    })
      .catch(error => {
        console.log(error);
      });
  }





}
