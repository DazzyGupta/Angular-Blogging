import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { SingleArticleComponent } from './single-article/single-article.component';
import { AboutArticleComponent } from './about-article/about-article.component';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { AboutUserComponent } from './about-user/about-user.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { FavoritedComponent } from './favorited/favorited.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard]},   
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: '', component: HomeComponent},
  {path: 'article/:slug', component: AboutArticleComponent},
  {path: 'new', component: CreateArticleComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'update/:slug', component: UpdateArticleComponent},
  {path: 'profiles/:username', component: AboutUserComponent},
  {path: 'profiles/:username/favorites' , component: FavoritedComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ArticlesListComponent,
    SingleArticleComponent,
    AboutArticleComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    CreateArticleComponent,
    AboutUserComponent,
    MyArticlesComponent,
    FavoritedComponent,
    SettingsComponent,
    UpdateArticleComponent,
    SingleCommentComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
