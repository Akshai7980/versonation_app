import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  artists: any = [];
  dataLoaded: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.loginService.getCurrentUserDetails().then(async (user: any) => {
      const uid = user.uid;
      if (uid) {
        this.fetchWatchList(uid);
      }
    });
    this.loaderService.hide();
  }

  fetchWatchList(uid: string) {
    const subscribeWatchList = this.fbService
      .getWatchlist(uid)
      .subscribe((data: any) => {
        if (data && data.artists && data.artists.length) {
          const watchList =
            data && data.artists && data.artists.length ? data.artists : [];
          if (watchList.length > 0) {
            const subscribeArtist = this.fbService
              .getMultipleArtist(watchList)
              .subscribe((data: any) => {
                if (data && data.docs) {
                  this.artists = data.docs?.map((doc: any) => {
                    return {
                      id: doc.id,
                      Image: doc.Image ? doc.Image : '',
                      name: doc.name ? doc.name : '',
                      ...doc.data()
                    };
                  });
                }
                // console.log('artists:', this.artists);
              });
            this.subscriptions.push(subscribeArtist);
          }
        }
      });
    this.subscriptions.push(subscribeWatchList);
    this.dataLoaded = true;
  }

  openArtistDetails(art: any) {
    this.router.navigate(['/streaming/artistDetails'], {queryParams: {artistId: art.id}});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: any) =>
      subscription.unsubscribe()
    );
  }
}
