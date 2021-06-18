import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'ion2-calendar';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './credentials';

import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { Network } from '@ionic-native/network/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoginPage } from './pages/login/login.page';
import { LoginPageModule } from './pages/login/login.module';
import { ForgotPassPage } from './pages/forgot-pass/forgot-pass.page';
import { ForgotPassPageModule } from './pages/forgot-pass/forgot-pass.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    LoginPage,
    ForgotPassPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    ComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    FormsModule,
    IonicSelectableModule,
    LoginPageModule,
    ForgotPassPageModule,
    AngularFireAuthModule
    ],
  providers: [
    
    StatusBar,
    SplashScreen,
    Stripe,
    Geolocation,
    Camera,
    File,
    Crop,
    Network,
    FileTransfer,
    NativeGeocoder,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
