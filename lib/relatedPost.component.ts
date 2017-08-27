import { Component, Input, OnInit } from '@angular/core';
import {  Route, ActivatedRoute, Router } from '@angular/router';

//import RelatedPostService
import { RelatedPostService } from '../../_services/_relatedPost/relatedPost.service';



@Component({
    selector: 'related-post',
    template: `
    <hr>
        

        <div class="w3-panel w3-light-grey w3-leftbar w3-border-grey related_post"  *ngFor="let relatedPost of relatedPosts">
            <a [routerLink]="'/'+[relatedPost.path]">
                <div class="related_post_image">
                    <img  *ngIf="showRelatedPostImage" src="{{relatedPost.data.post_image_url}}" alt="{{relatedPost.data.post_title}}">
                </div>
                <div class="related_post_title" [class.related_post_without_image]="!showRelatedPostImage">
                    <p>{{relatedPost.data.post_title}}</p>
                </div>
            </a>
        </div>
  `,
    styleUrls: ['./app/_services/_relatedPost/css/relatedPost.style.css'],
})
export class RelatedPostComponent implements OnInit {

    private relatedPosts: Route[] = [];
    private filterTags: Route;

    //input from other components
    @Input() showRelatedPostImage: boolean;
    @Input() relatedPostMatchPercentage: number;

    constructor(private relatedPostService: RelatedPostService, private route:ActivatedRoute, private router:Router) {
    }

    ngOnInit() {       
            this.filterTags = this.route.snapshot.routeConfig;
            this.setRelatedPostData(this.relatedPostService.relatedPosts);
    }

    setRelatedPostData(allPosts: Route[]) {
            let matchingAccuracy: number = 0;
            
            if (allPosts) {
                let showRelatedPostCount: number = 0;
                for (let i = 0; i < allPosts.length; i++) {
                    if(allPosts[i].data && allPosts[i].data.show_in_related_post && allPosts[i].data.show_in_related_post === "true" && allPosts[i].path != this.filterTags.path && allPosts[i].path != '' || allPosts[i].path != '/'){
                        showRelatedPostCount++;
                    }
                }
                //Find the minimum tags matching required to add it to final related post array
                matchingAccuracy = Math.floor((showRelatedPostCount * this.relatedPostMatchPercentage)/100);
                if (this.filterTags) {
                    for (let i = 0; i < allPosts.length; i++) {
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
                            //If half of the tag matches with current passed tag then add it to related post
                            if (count >= matchingAccuracy) {
                                this.relatedPosts.push(allPosts[i]);
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