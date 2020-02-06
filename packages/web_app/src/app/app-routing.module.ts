import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestResolve } from './resolvers/test-resolver.resolver';
import { TestComponent } from './test-component/test.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
    resolve: {
      test: TestResolve
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TestResolve]
})
export class AppRoutingModule {}
