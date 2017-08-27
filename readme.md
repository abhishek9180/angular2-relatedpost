### angular2-relatedpost

[angular2-relatedpost](https://learn-angular2.com) integration with Angular2.

#### Quick links

[Plunker template](http://embed.plnkr.co/EdxsaT/)

###Install

```bash
npm install --save angular2-relatedpost
```

### Setup

#### For SystemJS

In the SystemJs config file (systemjs.config.js) add a mapping for the package

```javascript
var map = {
    ...
    'angular2-relatedpost': 'node_modules/angular2-relatedpost/lib'
};
```

and add the package to the list of packages

```javascript
var packages = {
    ...
    'angular2-relatedpost': { main: 'relatedPost.component', defaultExtension: 'js'}
};
```

Import the **RelatedPostComponent** and **RelatedPostService** inside **app.module.ts**. If you are going to use the **RelatedPostService** than add the provider too.

For example in **app.module.ts**

```javascript
import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { DemoComponent } from './demo.component';

import { RelatedPostComponent, RelatedPostService } from 'angular2-relatedpost';

...

@NgModule({
    imports: [
        //A2 stuff
        BrowserModule,
        RelatedPostComponent,
    ],
    providers: [
        RelatedPostService
    ],
    declarations: [
        AppComponent,
        DemoComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
```
Add the post title, tags, image url, show_in_related_post to routes.

```javascript
export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent,
		data: {
			meta: {
				title: 'Learn-Angular2 Home',
				description: 'Learn-angular2 Provides the solutions of many problems that we face during the development of angular2 applications. Here I will tell you about angular2 services, loggers, components and many more...'
			},
			post_tags: [],
			post_title: 'Learn-Angular2 Home',
			post_description: '',
			post_image_url: './images/404.png',
			show_in_related_post: 'false'
		},
	},
	{
		path: 'form-validation-in-angular2',
		component: FormValidationPostComponent,
		data: {
			post_tags: ['angular2', 'form-validation', 'form'],
			post_title: 'Form validation example in Angular',
			post_description: 'Validate user input in the UI and display useful validation messages.',
			post_image_url: './images/404.png',
			show_in_related_post: 'true'
    		}
	},
	{
		path: 'search-result-highlighter-in-angular2',
		component: SearchHighlighterPostComponent,
		data: {
			post_tags: ['angular2', 'search', 'search-highlighter'],
			post_title: 'Search result highlighter in Angular2',
			post_description: 'Filtering the data and highlighting the filtered/searched results using Pipe in angular',
			post_image_url: './images/404.png',
			show_in_related_post: 'true'
    		}
	},
	{
		path: 'http-get-and-post-in-angular2',
		component: HttpGetPostComponent,
		data: {
			post_tags: ['angular2', 'http', 'get()', 'post()', 'observable', 'promise', 'client-server-communication'],
			post_title: 'Angular2 Http get() & post() using Observable and Promise',
			post_description: 'Client-server communication using http protocol in Angular.',
			post_image_url: './images/404.png',
			show_in_related_post: 'true'
    		}
	},
	{
		path: 'show-image-preview',
		component: ImagePreviewPostComponent,
		data: {
			post_tags: ['angular2', 'image-upload', 'image-preview'],
			post_title: 'Show Uploaded Image Preview in Angular2',
			post_description: 'Show preview of uploaded Image File in Angular2',
			post_image_url: './images/404.png',
			show_in_related_post: 'true'
		}
	}
];


### Usage

This library contains the **RelatedPostService** and **RelatedPostComponent**.
Below are usage notes for each. A demo app is also available as in the [repo](https://github.com/Useful-Software-Solutions-Ltd/angular2-highlight-js/tree/master/demo).

#### For HighlightJsContentDirective

Use this to add posts that are Related to current post.

```typescript

@Component({
    selector: 'demo',
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.css']
})

export class DemoComponent {

  //if false then post image won't be displayed
  private showRelatedPostImage: boolean = true;
  //Sets the accuracy of matching
  private relatedPostMatchPercentage: number = 20;

  constructor() {}
}

```

Pass "showRelatedPostImage" and "relatedPostMatchPercentage" to **relatedPostComponent** using the selector "related-post" as given below

```html
<related-post [relatedPostMatchPercentage]="relatedPostMatchPercentage" [showRelatedPostImage]="showRelatedPostImage"></related-post>
```
