import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements as defineCustomElementsForCamera } from '@ionic/pwa-elements/loader';

import { defineCustomElements as defineCustomElementsForPayment } from '@stripe-elements/stripe-elements/loader';




if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)

.then(() => defineCustomElementsForCamera(window))

  .catch(err => console.log(err));

  
  // Call the element loader after the platform has been bootstrapped

  defineCustomElementsForPayment(window);
