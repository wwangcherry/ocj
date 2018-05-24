require.config({
    baseUrl : "/",
    paths : {
        jquery : "lib/jquery/jquery-1.12.4.min",
        artTemplate : "lib/artTemplate/template-web",
        cookie : "lib/jquery-plugins/jquery.cookie",
        zoom : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        addHeaderAndFooter : "js/addHeaderAndFooter",
        fly : "lib/jquery-plugins/jquery.fly.min",
        carousel : "lib/jquery-plugins/jquery.ww_carousel-ocj"
    },
    shim : {
        zoom :{
            deps : ["jquery"]
        },
        fly :{
            deps : ["jquery"]
        },
        carousel :{
            deps : ["jquery"]
        }
    }
});
