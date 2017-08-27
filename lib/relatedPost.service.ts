import { Injectable } from '@angular/core';   

import {  Router, Route } from '@angular/router';

@Injectable()  
export class RelatedPostService {  

    relatedPosts: Route[] = [];
    
    constructor(private router: Router) {
        this.relatedPosts = this.router.config;
    }
}  