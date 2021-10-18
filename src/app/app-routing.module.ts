import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LoginComponent } from './login/login.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'list-users', component: ListUsersComponent, canActivate: [AuthGuard]},
  {path:'view-user/:id', component: ViewUserComponent, canActivate: [AuthGuard]},
  {path:'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  {path:'delete-user/:id', component: DeleteUserComponent, canActivate: [AuthGuard]},
  {path:'create-user', component: CreateUserComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
