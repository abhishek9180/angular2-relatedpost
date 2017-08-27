import { Component, Input, OnInit } from '@angular/core';
import {  Route, ActivatedRoute, Router } from '@angular/router';

//import RelatedPostService
import { RelatedPostService } from './relatedPost.service';



@Component({
    selector: 'related-post',
    template: `
    <style>
    .related_post_image {
        float: left;
    }
    .related_post_image>img {
        min-width: 100px;
        max-width: 110px;
        padding: 15px 5px 10px 0px;
        margin: auto
    }
    .related_post_title {
        padding-left: 115px;
    } 
    .related_post_without_image {
        padding-left: 5px;
    }
    .related_post_title>p {
        font-size: 16px;
        font-weight: 500;
    }
    .related_post {
        padding: 1px;
    }

    .related_post>a {
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    .related_post:hover {
        background-color: #ddffff!important;
        border-color: #2196F3 !important;
    }
    </style>

    <hr>
   
    <ng-template  ngFor let-relatedPost let-i="index" [ngForOf]="relatedPosts">
        <div class="w3-panel w3-light-grey w3-leftbar w3-border-grey related_post" *ngIf="i < relatedPostCount">
            <a [routerLink]="'/'+[relatedPost.path]">
                <div class="related_post_image">
                    <img  *ngIf="showRelatedPostImage" src="{{relatedPost.data.post_image_url}}" alt="{{relatedPost.data.post_title}}">
                </div>
                <div class="related_post_title" [class.related_post_without_image]="!showRelatedPostImage">
                    <p>{{relatedPost.data.post_title}}</p>
                </div>
            </a>
        </div>
    </ng-template>
  `
})

export class RelatedPostComponent implements OnInit {

    private relatedPosts: Route[] = [];
    private filterTags: Route;

    private pathCounter: number[] = [];

    //input from other components
    @Input() showRelatedPostImage: boolean;
    @Input() relatedPostMatchPercentage: number;
    @Input() relatedPostCount: number;

    constructor(private relatedPostService: RelatedPostService, private route:ActivatedRoute, private router:Router) {
    }

    ngOnInit() {       
            this.filterTags = this.route.snapshot.routeConfig;
            this.setRelatedPostData(this.relatedPostService.relatedPosts);
    }

    setRelatedPostData(allPosts: Route[]) {
            let matchingAccuracy: number = 0;
            
            if (allPosts) {
                if (this.filterTags) {
                    let c = 0;
                    for (let i = 0; i < allPosts.length; i++, c++) {
                        //Skip the same post
                        if (!(allPosts[i].data && allPosts[i].data.show_in_related_post && allPosts[i].data.show_in_related_post === "true") || allPosts[i].path === this.filterTags.path || allPosts[i].path === '' || allPosts[i].path === '/' ) {
                            continue;
                        } else if(allPosts[i].data && allPosts[i].data.post_tags && this.filterTags.data && this.filterTags.data.post_tags){
                            let count = 0;
                            for (let j = 0; j < this.filterTags.data.post_tags.length; j++) {
                                if (allPosts[i].data.post_tags.indexOf(this.filterTags.data.post_tags[j]) > -1) {
                                    count++;
                                }
                            }
                            
                            matchingAccuracy = Math.floor((this.filterTags.data.post_tags.length * (this.relatedPostMatchPercentage > 100 ? 100 : (this.relatedPostMatchPercentage < 0 ? 0 : this.relatedPostMatchPercentage)))/100);
                            if (count >= matchingAccuracy) {
                                let j=this.pathCounter.length-1;
                                while(count > this.pathCounter[j]){
                                    this.pathCounter[j+1] = this.pathCounter[j];
                                    this.relatedPosts[j+1] = this.relatedPosts[j];
                                    j--;
                                }
                                this.pathCounter[j+1]=count; 
                                this.relatedPosts[j+1] = allPosts[i];
                            }
                        } else {
                            console.error("Please provide title, tags, description to route.");
                        }

                    }
                } else {
                    console.error("No title, tags and description found for current route.");
                }

            } else {
                console.error("Please add route info.");
            }
         /* }, error => console.log(error));  */
    }
}