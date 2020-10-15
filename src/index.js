import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

import ExampleWithLightbox from './ExampleWithLightbox';
import jsonp from 'jsonp';
import Cookie from 'js-cookie'; 


class App extends React.Component {
  constructor() {
    super();
    this.state = { width: -1 };
    this.loadPhotos = this.loadPhotos.bind(this);
  }
  componentDidMount() {
    this.loadPhotos();
  }
  loadPhotos() {
    const urlParams = {
      api_key: '455b5e2fa6b951f9b9ab58a86d5e1f8a',
      photoset_id: '72157708141247864',
      user_id: '146659101@N08',
      format: 'json',
      per_page: '120',
      extras: 'url_m,url_c,url_l,url_h,url_o',
    };

   // Cookie.set('phone','7024801820'); //#4
    var phone1 = Cookie.get('phone');

    let url ='http://70.173.151.16:8001/geturls&' + phone1; // 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
  /*  url = Object.keys(urlParams).reduce((acc, item) => {
      return acc + '&' + item + '=' + urlParams[item];
    }, url);*/

//asdf
    jsonp(url /*, { name: 'jsonFlickrApi' } */ , (err, data) => {
      //console.log(data);
      if(data ==='wrong'){
        return;
      }
      let photos = data.photoset.photo.map(item => {
        let aspectRatio = parseFloat(item.width_o / item.height_o);
        return {
          src: item.url_l,
          width: parseInt(item.width_o),
          height: parseInt(item.height_o),
          title: item.title,
          alt: item.title,
          key: item.id,
          srcSet: [
            `${item.url_l} ${item.height_o}w`,
            `${item.url_l} ${item.height_o}w`,
            `${item.url_l} ${item.height_o}w`,
            `${item.url_l} ${item.height_o}w`,
          ],
          sizes: '(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw',
        };
      });
      this.setState({ 
        photos: this.state.photos ? this.state.photos.concat(photos) : photos,
      });
    });
  }

  render() {
    if (this.state.photos) {
      const width = this.state.width;
      return (
        <div className="App">

          <ExampleWithLightbox photos={this.state.photos.slice(0, this.state.photos.length-1)} />

        </div>
      );
    } else {
      return (
        <div className="App">
          <div id="msg-app-loading" className="loading-msg">
            Loading
          </div>
        </div>
      );
    }
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
