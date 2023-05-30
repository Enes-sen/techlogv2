import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpostformComponent } from './addpostform/addpostform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpformComponent } from './helpform/helpform.component';
import { LoginGuard } from './loginform/login.guard';
import { LoginformComponent } from './loginform/loginform.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';

const routes: Routes = [
  {path:"posts",component:PostsComponent},
  {path:"posts/:id",component:SinglepostComponent},
  {path:"",redirectTo:"posts",pathMatch:"full"},
  {path:"dashboard",component:DashboardComponent,canActivate:[LoginGuard]},
  {path:"dashboard/uploadimg",component:UploadimageComponent,canActivate:[LoginGuard]},
  {path:"help",component:HelpformComponent},
  {path:"dashboard/newpost",component:AddpostformComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginformComponent},
  {path:"register",component:RegisterformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
