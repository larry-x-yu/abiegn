import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UploadModule } from './upload/upload.module';

// Clarity
import { ClarityModule } from '@clr/angular';
import { AutoConfigComponent } from './auto-config/auto-config.component';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    HomeModule,
    UploadModule,
    AboutModule,
    LoginModule,
    AppRoutingModule,     // The order the routing modules matter, this module should always appear
                          // after all modules that include a routing-module, otherwise their routes
                          // won't be recognized by Angular
    ClarityModule,
  ],
  declarations: [AppComponent, AutoConfigComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
