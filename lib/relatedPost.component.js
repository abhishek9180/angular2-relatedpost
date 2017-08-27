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
    }
    RelatedPostComponent.prototype.ngOnInit = function () {
        this.filterTags = this.route.snapshot.routeConfig;
        this.setRelatedPostData(this.relatedPostService.relatedPosts);
    };
    RelatedPostComponent.prototype.setRelatedPostData = function (allPosts) {
        var matchingAccuracy = 0;
        if (allPosts) {
            if (this.filterTags) {
                var c = 0;
                for (var i = 0; i < allPosts.length; i++, c++) {
                    //Skip the same post
                    if (!(allPosts[i].data && allPosts[i].data.show_in_related_post && allPosts[i].data.show_in_related_post === "true") || allPosts[i].path === this.filterTags.path || allPosts[i].path === '' || allPosts[i].path === '/') {
                        continue;
                    }
                    else if (allPosts[i].data && allPosts[i].data.post_tags && this.filterTags.data && this.filterTags.data.post_tags) {
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
        template: "\n    <style>\n    .related_post_image {\n        float: left;\n    }\n    .related_post_image>img {\n        min-width: 100px;\n        max-width: 110px;\n        padding: 15px 5px 10px 0px;\n        margin: auto\n    }\n    .related_post_title {\n        padding-left: 115px;\n    } \n    .related_post_without_image {\n        padding-left: 5px;\n    }\n    .related_post_title>p {\n        font-size: 16px;\n        font-weight: 500;\n    }\n    .related_post {\n        padding: 1px;\n    }\n\n    .related_post>a {\n        display: inline-block;\n        width: 100%;\n        height: 100%;\n    }\n\n    .related_post:hover {\n        background-color: #ddffff!important;\n        border-color: #2196F3 !important;\n    }\n    </style>\n\n    <hr>\n   \n    <ng-template  ngFor let-relatedPost let-i=\"index\" [ngForOf]=\"relatedPosts\">\n        <div class=\"w3-panel w3-light-grey w3-leftbar w3-border-grey related_post\" *ngIf=\"i < relatedPostCount\">\n            <a [routerLink]=\"'/'+[relatedPost.path]\">\n                <div class=\"related_post_image\">\n                    <img  *ngIf=\"showRelatedPostImage\" src=\"{{relatedPost.data.post_image_url}}\" alt=\"{{relatedPost.data.post_title}}\">\n                </div>\n                <div class=\"related_post_title\" [class.related_post_without_image]=\"!showRelatedPostImage\">\n                    <p>{{relatedPost.data.post_title}}</p>\n                </div>\n            </a>\n        </div>\n    </ng-template>\n  "
    }),
    __metadata("design:paramtypes", [relatedPost_service_1.RelatedPostService, router_1.ActivatedRoute, router_1.Router])
], RelatedPostComponent);
exports.RelatedPostComponent = RelatedPostComponent;
//# sourceMappingURL=relatedPost.component.js.map