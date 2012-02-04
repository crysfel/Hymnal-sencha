<!DOCTYPE html>
<?php if(ENVIRONMENT == 'development') : ?>
<html>
<?php else :?>
<html manifest="<?php echo base_url(); ?>appcache.manifest">
<?php endif; ?>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Himnario Adventista</title>

    <link rel="stylesheet" href="<?php echo base_url(); ?>resources/css/hymnal.css" type="text/css">
    
    <?php if(ENVIRONMENT == 'development') : ?>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/sencha-touch-2.0.0/sencha-touch-all-debug.js"></script>
    <script type="text/javascript">
    	var Hymnal = {};
    	Hymnal.BASE_PATH = '<?php echo base_url(); ?>';
    </script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/app.js"></script>

    <?php else :?>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/sencha-touch-2.0.0/sencha-touch-all.js"></script>
    <script type="text/javascript">
        var Hymnal = {};
        Hymnal.BASE_PATH = '<?php echo base_url(); ?>';
    </script>
    <script type="text/javascript" src="<?php echo base_url(); ?>app-all.js"></script>
    <?php endif; ?>

    <link rel="apple-touch-icon-precomposed" href="<?php echo base_url(); ?>resources/images/icon.png"/>
</head>
<body>

</body>
</html>