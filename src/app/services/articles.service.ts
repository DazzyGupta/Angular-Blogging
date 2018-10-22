import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from '../models/article.model';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { ArticleList } from '../models/article-list.model';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  tagname: string;
  url = 'https://conduit.productionready.io/api';
  id : string;
  constructor(private http: HttpClient,
          private jwt: JwtService) { }

  getArticles(){
    return this.http.get(`${this.url}/articles`);
  }

  getArticleDetails(slug){
    if(this.jwt.getToken()){
      return this.http.get(`${this.url}/articles/${slug}`,{headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
    }
    else{
      return this.http.get(`${this.url}/articles/${slug}`);
    }
  }

  getTags(){
    return this.http.get(`${this.url}/tags`);
  }

  getAuthorDetails(username){
    if(this.jwt.getToken()){
      return this.http.get(`${this.url}/profiles/${username}`,{headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
    }
    else{
      return this.http.get(`${this.url}/profiles/${username}`);
    }
  }

  getMyArticles(username){
     return this.http.get(`${this.url}/articles?author=${username}`);
  }

  getFavArticles(username){
    return this.http.get(`${this.url}/articles?favorited=${username}`);
  }

  getFeedArticles(){
    return this.http.get(`${this.url}/articles/feed`);
  }

  newArticle(article){
      console.log(article);
      return this.http.post(`${this.url}/articles`,article, { headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
    }

  
    deleteArticle(slug){
    return this.http.delete(`${this.url}/articles/${slug}`, { headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}})
  }

  favorite(slug){
    if(this.jwt.getToken()){
      return this.http.post(`${this.url}/articles/${slug}/favorite`,{}
    ,{ headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}})
    }else{
      return this.http.post(`${this.url}/articles/${slug}/favorite`,{});
    }  
  }

  unfavorite(slug){
    if(this.jwt.getToken()){
      return this.http.delete(`${this.url}/articles/${slug}/favorite`, { headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
    }else{
      return this.http.delete(`${this.url}/articles/${slug}/favorite`);
    }
  }
     
  updateArticle(article, slug){
    return this.http.put(`${this.url}/articles/${slug}`,article, { headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
  }

  addComment(comment, slug){
    return this.http.post(`${this.url}/articles/${slug}/comments`,comment, { headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
  }

  getComments(slug){
    console.log(`${this.url}/articles/${slug}/comments`);
    return this.http.get(`${this.url}/articles/${slug}/comments`);
  }

  deleteComment(slug, id){
    return this.http.delete(`${this.url}/articles/${slug}/comments/${id}`,{ headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
  }

  query(config: ArticleList){

      const params = {};
      
      Object.keys(config.filters)
      .forEach((key) => {
        params[key] = config.filters[key];
        console.log('params list')
        console.log(params[key]);
        this.tagname = params[key];
        
      });

      console.log('tagname');
      console.log(this.tagname);

      if(this.tagname !== undefined){
        let tag = this.tagname;
        this.tagname = undefined;
        return this.http.get(`${this.url}/articles?tag=${tag}`);
      }    
      else{
        this.id = config.type === 'feed' ? 'feed' : '';
        if(this.id == 'feed'){
          return this.http.get(`${this.url}/articles/${this.id}`, 
          { headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}},);
        }
        else if(this.id == ''){
          return this.http.get(`${this.url}/articles/${this.id}`);
        }       
      }
    }
}

  
