// data for all the cats
var model = {
    displayCat: null,
    cats: [
      {
        name: 'Fred',
        img: 'images/fred-cat.jpg',
        clickCount: 0
      },
      {
        name: 'Ivy',
        img: 'images/ivy-cat.jpg',
        clickCount: 0
      },
      {
        name: 'Bib',
        img: 'images/bib-cat.jpg',
        clickCount: 0
      },
      {
        name: 'Buster',
        img: 'images/buster-cat.jpg',
        clickCount: 0
      },
      {
        name: 'Sally',
        img: 'images/sally-cat.jpg',
        clickCount: 0
      }
    ],
    admin: 'off'
}

var octopus = {
  // requests to display cat list and initial display cat
  init: function() {
    'use strict()';
    catListView.init();
    catView.init();
    formView.init();
    this.closeAdmin();
    this.adminToggle();
  },

  getCats: function() {
    'use strict()';
    return model.cats;
  },

  getDisplayCat: function() {
    'use strict()';
    return model.displayCat;
  },

  setDisplayCat: function(cat) {
    'use strict()';
    model.displayCat = cat;
  },

  clickIncrement: function(cat) {
    'use strict()';
    model.displayCat.clickCount++;
    catView.render();
  },

  // toggle admin area when clicked on Admin button
  adminToggle: function() {
    var admin = document.getElementById('adminForm');

    document.getElementById('admin-button').onclick = function() {
      if (model.admin === 'off') {
        admin.style.display = 'block';
        model.admin = 'on';
      } else {
        admin.style.display = 'none';
        model.admin = 'off';
      }
    };
  },

  closeAdmin: function() {
    var admin = document.getElementById('adminForm');
    admin.style.display = 'none';
    model.admin = 'off';
  }
}


// view for list of cats
var catListView = {
  init: function() {
    'use strict()';
    this.catContainer = document.getElementById('cat-container');
    this.render();
  },

  render: function() {
    'use strict()';
    var cats = octopus.getCats();
    var cat, catItem, catButton;

    for (var i = 0; i < cats.length; i++) {
      cat = cats[i];
      catItem = document.createElement('li');
      catButton = document.createElement('button');

      catButton.setAttribute('id', cat.name);
      catButton.textContent = cat.name;

      catItem.appendChild(catButton);
      catItem.classList.add('cat');

      // event-listener for selected cat
      catItem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setDisplayCat(catCopy);
          catView.render();
          formView.default();
        };
      }) (cat));

      this.catContainer.appendChild(catItem);
    }
  }
}


// view for display cat
var catView = {

  // display first cat on load
  init: function() {
    var cats = octopus.getCats();
    this.displayCatImg = document.getElementById('displayCatImg');
    this.displayCatName = document.getElementById('displayCatName');
    this.catCount = document.getElementById('catCount');

    octopus.setDisplayCat(cats[0]);
    this.render();

    // event-listener for clicks on cat
    displayCatImg.addEventListener('click', function() {
      octopus.clickIncrement();
    });
  },

  render: function() {
    'use strict';
    var cat = octopus.getDisplayCat();
    this.displayCatImg.setAttribute('src', cat.img);
    this.displayCatName.textContent = cat.name;
    this.catCount.textContent = cat.clickCount;
  }
}


// view for the admin form
var formView = {
  init: function() {
    'use strict';
    this.form = document.getElementById('adminForm');
    this.form.onsubmit = function(e) {
      e.preventDefault();
      formView.render();
    };

    // call default values
    this.default();

    // close admin panel if clicked on Cancel
    document.getElementById('cancel').onclick = function() {
      octopus.closeAdmin();
    };
  },

  default: function() {
    // default values of admin form set to displayed cat's values
    var cat = octopus.getDisplayCat();
    this.form.catName.value = cat.name;
    this.form.catURL.value = cat.img;
    this.form.catClicks.value = cat.clickCount;
  },

  render: function() {
    'use strict';
    var cat = octopus.getDisplayCat();
    var oldButton = document.getElementById(cat.name);
    var form = this.form;

    cat.name = form.catName.value;
    cat.clickCount = form.catClicks.value;
    cat.img = form.catURL.value;

     // change button content and id to be the name of the new cat
     oldButton.textContent = cat.name;
     oldButton.setAttribute('id', cat.name);

    octopus.setDisplayCat(cat);
    octopus.closeAdmin();
    catView.render();
  }
}

// initiate application
octopus.init();

