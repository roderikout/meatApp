import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from '../services/lists.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, 
    private listsService: ListsService, private globals: Globals) {}
    public count = this.globals.country;

  ngOnInit() {
  }

  goToCutList() {
    this.router.navigate(['cut-list'], {relativeTo: this.route});
  }

  languageSelected(country: string) {
    this.listsService.changeCountry(country);
  }
}
