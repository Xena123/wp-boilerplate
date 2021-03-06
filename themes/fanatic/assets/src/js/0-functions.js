//------------------------------------------------------------------|
// Functions                                                        |
//------------------------------------------------------------------|


//------------------------------------------------------------------|
//  Debounce: Make event listeners more efficient. Returns a        |
//  function, that, as long as it continues to be invoked, will     |
//  not be triggered. The function will be called after it stops    |
//  being called for N milliseconds. If `immediate` is passed,      |
//  trigger the function on the leading edge, instead of the        |
//  trailing.                                                       |
//  Usage:                                                          |
//    var myEfficientFn = debounce( function () {                   |
//      All the taxing stuff you do                                 |
//    }, 250 );                                                     |
//    window.addEventListener( 'resize', myEfficientFn );           |
//------------------------------------------------------------------|
function debounce( func, wait, immediate ) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if ( !immediate ) func.apply( context, args );
    };
    var callNow = immediate && !timeout;
    clearTimeout( timeout );
    timeout = setTimeout( later, wait );
    if ( callNow ) func.apply( context, args );
  };
}

//---------------------------------------------------------------------|
//  Throttled Window Resize Watcher                                    |
//  Reference:                                                         |
//  https://developer.mozilla.org/en-US/docs/Web/Events/resize#Example |
//  Usage:                                                             |
//    window.addEventListener("optimizedResize", function() {          |
//      // Run event code or call function                             |
//    });                                                              |
//---------------------------------------------------------------------|
( function() {
  var throttle = function ( type, name, obj ) {
    obj = obj || window;
    var running = false;
    var func = function () {
      if ( running ) {
        return;
      }
      running = true;
      requestAnimationFrame( function () {
        obj.dispatchEvent( new CustomEvent( name ) );
        running = false;
      } );
    };
    obj.addEventListener( type, func );
  };
  /* init - you can init any event */
  throttle( "resize", "optimizedResize" );
})();


//---------------------------------------------------------------------|
//  Toggle element                                                     |
//---------------------------------------------------------------------|
function toggle( obj ) {
  var el = document.getElementById( obj );
  if ( el.style.display != 'none' ) {
    el.style.display = 'none';
  } else {
    el.style.display = '';
  }
}


//------------------------------------------------------------------|
// Define & return map style                                        |
//------------------------------------------------------------------|
function getMapStyle() {
  var mapStyle = [
    {
      elementType: 'geometry',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#bdbdbd'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#ffffff'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#dadada'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#c9c9c9'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    }
  ];
  return mapStyle;
}


//---------------------------------------------------------------------|
//  Toggle Nav                                                         |
//---------------------------------------------------------------------|
function toggleNav() {
  var body = document.body;
  if ( body.classList.contains('is-menu-open') ) {
    body.classList.remove('is-menu-open');
  } else {
    body.classList.add('is-menu-open');
  }
}


//---------------------------------------------------------------------|
//  Toggle header shrink                                               |
//---------------------------------------------------------------------|
var headShrink = debounce( function () {
  var body = document.body;
  var scrollDist = window.pageYOffset;
  if ( scrollDist > 250 && !body.classList.contains('is-shrunk') ) {
    body.classList.add('is-shrunk');
  } else if ( scrollDist <= 250 && body.classList.contains('is-shrunk') ) {
    body.classList.remove('is-shrunk');
  }
}, 10 );

//---------------------------------------------------------------------|
//  Initialise Google Map                                              |
//---------------------------------------------------------------------|
function initMap() {
  // Set map styling
  var mapStyle = getMapStyle();
  // Set overlay color
  var overlayColor = '#85b5ec';

  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  var styledMapType = new google.maps.StyledMapType(
    mapStyle,
    {
      name: 'Styled Map'
    }
  );

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.4545, lng: -2.5879},
    zoom: 9,
    mapTypeControlOptions: {
      mapTypeIds: []
    },
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
}


//---------------------------------------------------------------------|
//  Create 'None' layout for isotope                                   |
//---------------------------------------------------------------------|
function isotopeNoLayout() {
  Isotope.Item.prototype._create = function( ) {
    // assign id, used for original-order sorting
    this.id = this.layout.itemGUID++;
    // transition objects
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    };
    this.sortData = {};
  };

  Isotope.Item.prototype.layoutPosition = function( ) {
    this.emitEvent('layout', [ this ]);
  };

  Isotope.prototype.arrange = function( opts ) {
    // set any options pass
    this.option( opts );
    this._getIsInstant( );
    // just filter
    this.filteredItems = this._filter( this.items );
    // flag for initalized
    this._isLayoutInited = true;
  };
  Isotope.LayoutMode.create( 'none' );
}



//---------------------------------------------------------------------|
//  Initialize Isotope (JQuery)                                        |
//---------------------------------------------------------------------|
function startIsotope() {
  if ( document.getElementById( 'isotope' ) ) {
    isotopeNoLayout();
    var isotopeButton = document.querySelectorAll('.isofilter__btn');

    var iso = $('#isotope').isotope({
      itemSelector: '.isotope-bx',
      layoutMode: 'none'
    });

    for ( var i = 0; i < isotopeButton.length; i++ ) {
      isotopeButton[i].addEventListener("click", function(event) {
        var filterValue = $( this ).attr( 'data-filter' );
        iso.isotope({ filter: filterValue });
        $('.isofilter__btn').removeClass( 'is-active' );
        $( this ).addClass( 'is-active' );
      }, false);
    }
  }
}


//---------------------------------------------------------------------|
//  Focus on child input when clicking on parent                       |
//---------------------------------------------------------------------|
function searchFocus() {
  var target = this.querySelector('input');
  target.focus();
}

//---------------------------------------------------------------------|
//  filter search: live filter. Set event watcher to update changes    |
//---------------------------------------------------------------------|
function filterNews() {
  var input = document.getElementById('news-search');
  var searchValue = input.value.toUpperCase();
  var articles = document.querySelectorAll('.isotope-bx');
  if ( searchValue != '' ) {
    for ( var i = 0; i < articles.length; i++ ) {
      var searchIn = articles[i].querySelector('.bx__ttl');
      if (searchIn.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
        articles[i].classList.remove('is-filtered');
      } else {
        articles[i].classList.add('is-filtered');
      }
    }
  } else {
    for ( var i = 0; i < articles.length; i++ ) {
      articles[i].classList.remove('is-filtered');
    }
  }
}
