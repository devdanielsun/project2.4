import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [
    CommonModule,
    UnauthorizedRoutingModule,
  ],
  bootstrap: [UnauthorizedComponent]
})
export class UnauthorizedModule { }
