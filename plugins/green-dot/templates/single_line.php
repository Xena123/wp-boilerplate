<!-- File: gd/templates/single_line.php -->
  <?php
    $blockId = get_the_ID();
    $textColumns = get_post_meta($blockId, 'gd_columns')[0];
    $textColour = get_post_meta($blockId, 'gd_background')[0];
    if ( $textColumns[0] == '2' ) {
      $textClass = 'l-column-two';
    } else if ( $textColumns[0] == '3' ) {
      $textClass = 'l-column-three';
    } else if ( $textColumns[0] == '4' ) {
      $textClass = 'l-column-four';
    } else {
      $textClass = '';
    }
    if ( $textColour == 'grey' ) {
      $bgClass = 'heavy--grey';
    } else {
      $bgClass = '';
    }
  ?>
<section class="row heavy <?php echo $bgClass; ?>">
  <div class="l-constrained--inner">
    <header class="row__header-center heavy__header">
      <h2><?php the_title(); ?></h2>
      <?php gd_insertEdit(); ?>
    </header>
    <div class="heavy__content <?php echo $textClass; ?>">
      <?php the_content(); ?>
    </div>
  </div>
</section>
