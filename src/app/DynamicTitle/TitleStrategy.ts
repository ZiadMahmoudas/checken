import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  constructor(
    private readonly title: Title,
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(snapshot);
  }
}
