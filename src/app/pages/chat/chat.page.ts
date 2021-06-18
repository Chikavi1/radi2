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
  messages: any;
  text:string = null;
  id = '1234'
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


    this.crudService.read_messages(this.id).subscribe(data => {

      this.ScrollToBottomMessage();

      console.log(data);


      this.messages = data.map(e => {
        return {
          id: e.payload.doc.id,
          date: e.payload.doc.data()['Date'],
          text: e.payload.doc.data()['Text'],
          chatId: e.payload.doc.data()['ChatID'],
          role: e.payload.doc.data()['Role'],
        };
      })
      console.log(this.messages);

    });
  }


  enviar(){
    let record = {};
    record['Date'] = new Date();
    record['Text'] = this.text;
    record['ChatID'] = this.id;
    record['Role'] = 1;

    this.crudService.create_message(record).then(resp => {
      this.text = "";
      this.ScrollToBottomMessage();

    })
      .catch(error => {
        console.log(error);
      });
  }





}
