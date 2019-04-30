import { Device } from '@ionic-native/device/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Media } from '@ionic-native/media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ComponentsModule } from './components/components.module';

// Services
import { StorageService } from './services/storage/storage.service';
import { HelperService } from './services/helper/helper.service';
import { ApiService } from './services/api/api.service';
import { ConfigService } from './services/config/config.service';
import { UserService } from './services/user/user.service';
import { NutritionsService } from './services/nutritions/nutritions.service';
import { InterceptorModule } from './interceptor.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireDatabaseModule } from '@angular/fire/database';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, ComponentsModule, InterceptorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__dphdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
      }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar, SplashScreen, SpinnerDialog, Toast, Device, Media, NativeAudio, LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService, HelperService, ApiService, ConfigService, UserService, NutritionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
