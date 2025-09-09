import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private meta: Meta,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  setMeta() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.route;
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      ).subscribe(data => {
        this.meta.updateTag({ name: 'description', content: data['description'] || 'الوصف الافتراضي' });
        this.meta.updateTag({ property: 'og:title', content: data['title'] || 'العنوان الافتراضي' });
        this.meta.updateTag({ property: 'og:description', content: data['description'] || 'الوصف الافتراضي' });
        this.meta.updateTag({ property: 'og:image', content: data['image'] || 'default-image-url' });
        this.meta.updateTag({ property: 'og:url', content: window.location.href });
        this.meta.updateTag({ name: 'twitter:title', content: data['title'] || 'العنوان الافتراضي' });
        this.meta.updateTag({ name: 'twitter:description', content: data['description'] || 'الوصف الافتراضي' });
        this.meta.updateTag({ name: 'twitter:image', content: data['image'] || 'default-image-url' });

        this.title.setTitle(data['title'] || 'العنوان الافتراضي');
      });
    }
  }
}
