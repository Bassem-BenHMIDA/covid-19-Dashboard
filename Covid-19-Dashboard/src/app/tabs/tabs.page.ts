import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  subscribe:any;
  constructor(public platform:Platform) {
    this.subscribe=this.platform.backButton.subscribeWithPriority(666666,()=> {
      if(this.constructor.name=="TabsPage")
      {
        if(window.confirm("do you want to exit"))
        {
          navigator["app"].exitApp();
        }
      }
    })
  }

}
