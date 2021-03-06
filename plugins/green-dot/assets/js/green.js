/*
greenDot 0.02
*/

/* Helper Functions **/

  /*
   * Set Green Dot parents to relative
   *
   * Verify that positioning of parents where green dots are
   * inserted are set to position: relative unless they are
   * already set to absolute
   **/
  function gdParentRel() {
     $('.post-edit-link').parent().each( function(){
       $this = $(this);
       if ( $this.css("position") != "absolute" ) {
         $this.css("position","relative");
       }
     });
  }

  /* Close all instances of edit box **/
  function gdCloseEdit() {
    if ( $('.front-edit')[0] ) {
      $('.front-edit').remove();
      $('body').removeClass('is-gd-edit-visible');
      location.reload();
    }
  }

  /* Hide Wordpress sidebar & header from edit popup **/
  function gdHideSidebar() {
    var bar = $('#front-edit').contents().find("body");
    if ( bar.css("display") !== "block" ) {
      console.log("Run");
      setTimeout(gdHideSidebar , 100);
    } else {
      $('#front-edit').contents().find("head").append("<style>#adminmenuback{display:none}#wpadminbar {display:none} #adminmenuwrap {display:none;} #wpcontent {margin-left:0;}</style>");
      $('body').addClass('is-gd-edit-visible');
    }
  }

  /* Open Edit Page when clicking on Green Dot **/
  function gdOpenEdit() {
    // If Edit Box is already open, do nothing
    if ( $('.front-edit')[0] ) {
      return false;
    // Else open Edit Box
    } else {
      // Get link associated with green dot
      var link = $(this).attr("href");
      var iframeText = "<iframe class=\"front-edit\" id=\"front-edit\" src=" + link + "></iframe>";
  		// Add Edit box to body
  		$('body').append(iframeText);
      var frontEdit = $('#front-edit');
  		// Focus on Edit box
  		frontEdit.focus();
  		// Hide sidebar when edit box loads
  		frontEdit.on("load",function() {
  			gdHideSidebar();
  		});
      // When focusing outside of edit box, close edit box and reload current page.
      frontEdit.on("blur",function() {
        gdCloseEdit();
      });
    }
  }




/* Initialise & Set Up Green Dot Plugin **/
  gdParentRel();

/* Event Listeners **/
  // Open Edit popup when clicking on green dot
  $('.post-edit-link').on('click',function(evt) {
    gdOpenEdit.bind($(this))();
    return false;
  });
  // Close edit popup when user clicks on page body
	$('body').on("click",function() {
		gdCloseEdit();
	});
