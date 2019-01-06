$(document).ready(function(){  
    $(window).on('resize', _.debounce(handleResize, 500));
});

function handleResize() {
    location.reload();
}
