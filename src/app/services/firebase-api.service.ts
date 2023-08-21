import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { documentId } from 'firebase/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {}

  getTopArtists() {
    return this.afs
      .collection('topArtists', (ref: any) => {
        let query = ref;
        {
          query = query.orderBy('followersCount', 'desc');
        }
        return query;
      })
      .valueChanges();
  }

  getPostsFromTable(lastDoc = null) {
    if (lastDoc) {
      return this.afs
        .collection('posts', (ref: any) => {
          let query = ref;
          {
            query = query
              .orderBy('timestamp', 'desc')
              .startAfter(lastDoc)
              .limit(30);
          }
          return query;
        })
        .get();
    }
    return this.afs
      .collection('posts', (ref: any) => {
        let query = ref;
        {
          query = query.orderBy('timestamp', 'desc').limit(30);
        }
        return query;
      })
      .get();
  }

  getComments(postId: string) {
    return this.afs
      .collection('comments', (ref: any) => {
        let query = ref;
        {
          query = query
            .where('postId', '==', postId)
            .orderBy('timestamp', 'desc');
        }
        return query;
      })
      .get();
  }

  getProfile(uid: string) {
    return this.afs.collection('profile').doc(uid).valueChanges();
  }

  getTopSongs() {
    return this.afs
      .collection('topSongs', (ref: any) => {
        let query = ref;
        {
          query = query.orderBy('likesCount', 'desc');
        }
        return query;
      })
      .valueChanges();
  }

  updatePost(postId: string, data: any) {
    return this.afs.collection('posts').doc(postId).set(data, { merge: true });
  }

  updatePostNotify(id: string, data: any) {
    return this.afs
      .collection('notifications')
      .doc(id)
      .collection(id)
      .add(data);
  }

  getStorageImageUrl(uid: string, type: string) {
    return new Promise((resolve) => {
      this.storage
        .ref(`images/${uid}/${type}`)
        .getDownloadURL()
        .pipe(first())
        .subscribe(
          (d) => {
            if (d) {
              resolve(d);
            } else {
              resolve('');
            }
          },
          (err) => resolve('')
        );
    });
  }

  getFollowing(uid: string) {
    return this.afs
      .collection('following', (ref) => {
        let query = ref;
        return query;
      })
      .doc(uid)
      .valueChanges();
  }

  updateFollowing(uid: string, data: any) {
    return this.afs.collection('following').doc(uid).set(data, { merge: true });
  }

  updateFollowCount(artistId: string) {
    this.afs
      .collection('following', (ref) => {
        let query: any = ref;
        {
          query = query.where('artists', 'array-contains', artistId);
        }
        return query;
      })
      .get()
      .subscribe((data: any) => {
        const followers = data.docs.map((doc: any) => {
          return { id: doc.id, ...doc.data() };
        });
        const followersCount = followers.length || 0;
        this.updateArtistDetails(artistId, { followersCount });
      });
  }

  updateArtistDetails(uid: string, data: any) {
    this.afs
      .collection('artists', (ref) => {
        let query: any = ref;
        {
          query = query.where('id', '==', uid);
        }
        return query;
      })
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          this.afs.collection('artists').doc(doc.id).set(data, { merge: true });
        });
      });
  }

  addComment(data: any) {
    return this.afs.collection('comments').add(data);
  }

  uploadImageAndGetUrl(uid: string, type: any, picUrl: string) {
    return new Promise((resolve, reject) => {
      const pic = picUrl.substring(picUrl.indexOf(',') + 1, picUrl.length);
      const x = this;
      this.storage
        .ref(`images/${uid}/${type}`)
        .putString(pic, 'base64')
        .then((snapshot) => {
          if (snapshot.state === 'success') {
            x.storage
              .ref(snapshot.metadata.fullPath)
              .getDownloadURL()
              .subscribe((url) => resolve(url));
          } else {
            console.log('image upload error');
            reject();
          }
        });
    });
  }

  updateProfile(uid: string, data: any) {
    return this.afs.collection('profile').doc(uid).set(data, { merge: true });
  }
  getArtists() {
    return this.afs
      .collection('artists', (ref) => {
        let query: any = ref;
        // {
        //   query = query.orderBy('followersCount', 'desc');
        // }
        return query;
      })
      .get();
  }

  getArtistById(artistId: string) {
    return this.afs
      .collection('artists', (ref) => {
        let query: any = ref;
        {
          query = query
            .where('id', '==', artistId)
        }
        return query;
      })
      .get();
  }

  getAlbums() {
    return this.afs
      .collection('albums', (ref) => {
        let query: any = ref;
        {
          query = query.orderBy('timestamp', 'desc');
        }
        return query;
      })
      .get();
  }

  getAlbumSongs(albumId: string) {
    return this.afs
      .collection('songs', (ref) => {
        let query: any = ref;
        {
          query = query
            .where('albumId', '==', albumId)
        }
        return query;
      })
      .get();
  }

  getAlbumById(albumId: string) {
    return this.afs
      .collection('albums', (ref) => {
        let query: any = ref;
        {
          query = query
            .where('albumId', '==', albumId)
        }
        return query;
      })
      .get();
  }

  getSongs(artistId?: string) {
    if (artistId) {
      return this.afs
        .collection('songs', (ref: any) => {
          let query: any = ref;
          {
            query = query
              .where('artistId', '==', artistId)
              .where('type', '!=', 'podcast')
              .orderBy('type', 'desc')
              .orderBy('timestamp', 'desc')
              .orderBy('likesCount', 'desc');
          }
          return query;
        })
        .get();
    }
    return this.afs
      .collection('songs', (ref) => {
        let query: any = ref;
        {
          query = query
            .where('type', '!=', 'podcast')
            .orderBy('type', 'desc')
            .orderBy('timestamp', 'desc')
            .orderBy('likesCount', 'desc');
        }
        return query;
      })
      .get();
  }

  getTags() {
    return this.afs
      .collection('tags', (ref) => {
        let query: any = ref;
        {
          query = query.orderBy('name', 'asc');
        }
        return query;
      })
      .get();
  }

  updateUserCollection(uid: string, data: any) {
    return this.afs.collection('users').doc(uid).set(data, { merge: true });
  }

  getPosts(lastDoc: any, filter?: string, followArtists?: any[]) {
    const body = { lastDoc, filter, followArtists };
    return this.http.request(
      'POST',
      'https://us-central1-verse-nation.cloudfunctions.net/getPosts',
      { responseType: 'json', body }
    );
  }

  getArtistsWithPagination(
    lastDoc: any,
    search: string,
    filter: any,
    tags: any
  ) {
    const body = { collection: 'artists', lastDoc, search, filter, tags };
    return this.http.request(
      'POST',
      'https://us-central1-verse-nation.cloudfunctions.net/getArtistOrSongsWithFilterAndPagination',
      {
        responseType: 'json',
        body
      }
    );
  }

  getWatchlist(uid: any) {
    return this.afs
      .collection('watchlist', (ref) => {
        let query: any = ref;
        return query;
      })
      .doc(uid)
      .valueChanges();
  }

  getMultipleArtist(ids: any) {
    return this.afs
      .collection('artists', (ref) => {
        let query: any = ref;
        {
          query = query
            .where('id', 'in', ids)
            .orderBy('followersCount', 'desc');
        }
        return query;
      })
      .get();
  }

  getPlaylists(uid: string) {
    return this.afs
      .collection('playlists', (ref) => {
        let query: any = ref;
        return query;
      })
      .doc(uid)
      .collection(uid)
      .get();
  }

  addPlaylist(uid: string, data: any) {
    return this.afs.collection('playlists').doc(uid).collection(uid).add(data);
  }

  updatePlaylist(uid: string, playlistId: any, data: any) {
    return this.afs
      .collection('playlists')
      .doc(uid)
      .collection(uid)
      .doc(playlistId)
      .set(data, { merge: true });
  }

  // addToPlaylist(uid: string,playlistId: any,data: any){
  //   return this.afs.collection('playlists').doc(uid).collection(uid).doc(playlistId).update({songs:firebase.firestore.FieldValue.arrayUnion(data)});
  // }

  updatePlaylistImage(uid: string, playlistId: any, ImageId: any) {
    return this.afs
      .collection('playlists')
      .doc(uid)
      .collection(uid)
      .doc(playlistId)
      .update({ Image: ImageId });
  }

  getSongsWithPagination(
    lastDoc: any,
    artistId: any,
    search: any,
    filter: any,
    tags: any
  ) {
    const body = {
      collection: 'songs',
      lastDoc,
      artistId,
      search,
      filter,
      tags
    };
    return this.http.request(
      'POST',
      'https://us-central1-verse-nation.cloudfunctions.net/getArtistOrSongsWithFilterAndPagination',
      {
        responseType: 'json',
        body
      }
    );
  }

  addPost(uid: string, data: any, postId: string) {
    return this.afs.collection('posts').doc(`${uid}_${postId}`).set(data);
  }

  getMultipleSongDetails(ids: any) {
    return this.afs
      .collection('songs', (ref: any) => {
        let query: any = ref;
        {
          query = query.where(documentId(), 'in', ids);
        }
        return query;
      })
      .get()
  }

  getCurrentPlaylist(uid: string, playlistId: string) {
    return this.afs
      .collection('playlists', (ref) => {
        let query: any = ref;
        return query;
      })
      .doc(uid)
      .collection(uid, (ref: any) => {
        let query: any = ref;
        {
          query = query.where(documentId(), '==', playlistId);
        }
        return query;
      })
      .get();
  }

}
