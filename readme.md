### angular2-relatedpost

[angular2-relatedpost](https://learn-angular2.com) integration with Angular2.

#### Quick links

[Plunker template](https://embed.plnkr.co/GwwH0Q4tbiYvboBuhLld/)

### Install

```bash
npm install --save angular2-relatedpost
```

### Setup

#### For SystemJS

In the SystemJs config file (systemjs.config.js) add a mapping for the package

```javascript
var map = {
    ...
    'angular2-relatedpost': 'node_modules/angular2-relatedpost'
};
```

and add the package to the list of packages

```javascript
var packages = {
    ...
    'angular2-relatedpost': { main: 'index.js', defaultExtension: 'js'}
};
```

Import the **RelatedPostComponent** and **RelatedPostService** inside **app.module.ts**. If you are going to use the **RelatedPostService** than add the provider too.

For example in **app.module.ts**

```javascript
import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { DemoComponent } from './demo.component';

import { RelatedPostComponent, RelatedPostService } from 'angular2-relatedpost/index';

...

@NgModule({
    imports: [
        //A2 stuff
        BrowserModule,
    ],
    providers: [
        RelatedPostService
    ],
    declarations: [
        AppComponent,
	RelatedPostComponent,
        DemoComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
```
Add the post title, tags, description, image url and show_in_related_post to routes as shown below.

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
			post_tags: ["Angular", "Angular2", "Home"],
			post_title: 'Learn-Angular2 Home',
			post_description: 'Related post description - Home page',
			post_image_url: './images/img1.png',
			show_in_related_post: 'true'
		},
	},
	{
		path: 'contact',
		component: ContactComponent,
		data: {
			post_tags:  ["Angular", "Angular2", "Contact"],
			post_title: 'Learn-Angular2 Contact',
			post_description: 'Related post description - Contact page',
			post_image_url: './images/img2.png',
			show_in_related_post: 'true'
		}
	},
	{
		path: 'about',
		component: AboutComponent,
		data: {
			post_tags:  ["Angular", "Angular2", "About"],
			post_title: 'Learn-Angular2 About',
			post_description: 'Related post description - About page',
			post_image_url: './images/img3.png',
			show_in_related_post: 'true'
		}
	},
	{
		path: 'content',
		component: ContentComponent,
		data: {
			post_tags:  ["Angular", "Angular2", "Content", "About", "Home"],
			post_title: 'Learn-Angular2 Content',
			post_description: 'Related post description - Content page',
			post_image_url: './images/img4.png',
			show_in_related_post: 'true'
		}
	},
	{
		path: 'not-found',
		component: PageNotFoundComponent,
		data: {
			show_in_related_post: 'false'
		}
	},
];
```

### Usage

This library contains the **RelatedPostService** and **RelatedPostComponent**.
Below are usage notes for each. A demo app is also available as in the [repo](https://github.com/abhishek9180/angular2-relatedpost.git).

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

  //Maximum related post per page
  private relatedPostCount: number = 5;

  constructor() {}
}

```

Pass "showRelatedPostImage", "relatedPostMatchPercentage" and "relatedPostCount" to **relatedPostComponent** using the selector "related-post" as given below

```html
<related-post [relatedPostMatchPercentage]="relatedPostMatchPercentage" [showRelatedPostImage]="showRelatedPostImage" [relatedPostCount]="relatedPostCount"></related-post>
```
Or you can simply `use the selector without passing value` in this case the default value will be used.
```html
<related-post></related-post>
```

### API
#### Inputs

* `relatedPostMatchPercentage` : Minimum matching percentage for related posts (`default is 50`).
* `showRelatedPostImage` : show or hide image(boolean value `default is false`).
* `relatedPostCount` : Maximum number of related posts per page (`default is 5`).

