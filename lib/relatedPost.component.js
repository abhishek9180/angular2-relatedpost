"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import RelatedPostService
var relatedPost_service_1 = require("./relatedPost.service");
var RelatedPostComponent = (function () {
    function RelatedPostComponent(relatedPostService, route, router) {
        this.relatedPostService = relatedPostService;
        this.route = route;
        this.router = router;
        this.relatedPosts = [];
        this.pathCounter = [];
        //input from other components
        this.showRelatedPostImage = false;
        this.relatedPostMatchPercentage = 50;
        this.relatedPostCount = 5;
    }
    RelatedPostComponent.prototype.ngOnInit = function () {
        this.filterTags = this.route.snapshot.routeConfig;
        this.setRelatedPostData(this.relatedPostService.relatedPosts);
    };
    RelatedPostComponent.prototype.setRelatedPostData = function (allPosts) {
        var matchingAccuracy = 0;
        if (allPosts) {
            if (this.filterTags && this.filterTags.data && this.filterTags.data.post_tags) {
                var c = 0;
                for (var i = 0; i < allPosts.length; i++, c++) {
                    //Skip the same post
                    if (!(allPosts[i].data && allPosts[i].data.show_in_related_post && allPosts[i].data.show_in_related_post === "true") || allPosts[i].path === this.filterTags.path || allPosts[i].path === '' || allPosts[i].path === '/') {
                        continue;
                    }
                    else if (allPosts[i].data && allPosts[i].data.post_tags) {
                        var count = 0;
                        for (var j = 0; j < this.filterTags.data.post_tags.length; j++) {
                            if (allPosts[i].data.post_tags.indexOf(this.filterTags.data.post_tags[j]) > -1) {
                                count++;
                            }
                        }
                        matchingAccuracy = Math.floor((this.filterTags.data.post_tags.length * (this.relatedPostMatchPercentage > 100 ? 100 : (this.relatedPostMatchPercentage < 0 ? 0 : this.relatedPostMatchPercentage))) / 100);
                        if (count >= matchingAccuracy) {
                            var j = this.pathCounter.length - 1;
                            while (count > this.pathCounter[j]) {
                                this.pathCounter[j + 1] = this.pathCounter[j];
                                this.relatedPosts[j + 1] = this.relatedPosts[j];
                                j--;
                            }
                            this.pathCounter[j + 1] = count;
                            this.relatedPosts[j + 1] = allPosts[i];
                        }
                    }
                    else {
                        console.error("Please provide title, tags, description to route.");
                    }
                }
            }
            else {
                console.error("No title, tags and description found for current route.");
            }
        }
        else {
            console.error("Please add route info.");
        }
        /* }, error => console.log(error));  */
    };
    return RelatedPostComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RelatedPostComponent.prototype, "showRelatedPostImage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RelatedPostComponent.prototype, "relatedPostMatchPercentage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RelatedPostComponent.prototype, "relatedPostCount", void 0);
RelatedPostComponent = __decorate([
    core_1.Component({
        selector: 'related-post',
        template: "\n    <style>\n    .related_post_image {\n        display: flex;\n        background-color: #b3b3ff;\n    }\n    .related_post_image>img {\n        min-width: 100px;\n        max-width: 110px;\n        margin: auto;\n        align-self: center;\n        flex: 1 1 auto;\n        padding: 5px;\n    }\n    .related_post_title {\n        flex: 12 1 auto;\n        padding: 5px;\n        white-space: nowrap;\n        overflow: hidden;\n    } \n\n    .related_post_title>h6 {\n        white-space: normal;\n        margin: auto;\n        font-size: 18px;\n        font-weight: 400;\n    }\n    .related_post_title>p {\n        font-size: 16px;\n        font-weight: 500;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n    .related_post {\n        padding: 1px;\n        color: #000;\n        background-color: #f1f1f1;\n        border-left: 6px solid #ccc;\n        margin-top: 16px;\n        margin-bottom: 16px;\n        border-color: #BBB;\n        display: flex;\n        flex-flow: row nowrap;\n        min-height: 100%;\n        width: 100%;\n    }\n\n    .related_post>a {\n        display: inline-block;\n        width: 100%;\n        height: 100%;\n    }\n\n    .related_post:hover {\n        background-color: #ddffff!important;\n        border-color: #2196F3 !important;\n    }\n    </style>\n\n    <hr>\n   \n    <ng-template  ngFor let-relatedPost let-i=\"index\" [ngForOf]=\"relatedPosts\">\n        <a [routerLink]=\"'/'+[relatedPost.path]\">\n            <div class=\"related_post\" *ngIf=\"i < relatedPostCount\">            \n                <div class=\"related_post_image\">\n                    <img  *ngIf=\"showRelatedPostImage\" src=\"{{relatedPost.data.post_image_url}}\" alt=\"{{relatedPost.data.post_title}}\">\n                </div>\n                <div class=\"related_post_title\" [class.related_post_without_image]=\"!showRelatedPostImage\">\n                    <h6 *ngIf=\"relatedPost.data.post_title\">{{relatedPost.data.post_title}}</h6>\n                    <p *ngIf=\"relatedPost.data.post_description\">{{relatedPost.data.post_description}}</p>\n                </div>\n            </div>\n        </a>\n    </ng-template>\n  "
    }),
    __metadata("design:paramtypes", [relatedPost_service_1.RelatedPostService, router_1.ActivatedRoute, router_1.Router])
], RelatedPostComponent);
exports.RelatedPostComponent = RelatedPostComponent;
//# sourceMappingURL=relatedPost.component.js.map