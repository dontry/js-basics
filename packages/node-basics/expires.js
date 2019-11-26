<div id="last-visit"></div>
<script>
    (function() {
        var name = 'lastvisit';
        var lastvisit = null;
        var d1 = new Date();
        var div = document.getElementById('last-visit');
        var message = '';
        for (var cookies=document.cookie.split(';'), i=0, lastvisit=''; i<cookies.length; i++) {
            if (cookies[i].replace(/^\s+|\s+$/g, '').indexOf(name)==0) {
                lastvisit = cookies[i].replace(/^\s+|\s+$/g, '').substring(name.length+1);
            }
        }
        if (!lastvisit) {
            message = 'Welcome to our site';
        } else {
            var d2 = new Date(lastvisit);
            var diff = Math.round((d1 - d2) / (24*60*60*1000));
            message = diff==0?'':'It has been ' + diff + ' days since your last visit';
        }
        div.innerHTML = message;
        var d3 = new Date();
        d3.setTime(d3.getTime() + 10*24*60*60*1000);
        document.cookie = name + "=" + d1.toString() + "; expires="+d3.toISOString();
    })();
</script>