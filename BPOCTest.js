(function init() {
                document.addEventListener('DOMContentLoaded', completed);
                //fallback
                window.addEventListener("load", completed);
            })();

            function completed() {
                document.removeEventListener("DOMContentLoaded", completed);
                window.removeEventListener("load", completed);

                setUpIframe();
            }

            function setUpIframe() {
                var vdtFrame = document.getElementById('vdtFrame');
                

                if (vdtFrame == null || vdtFrame.nodeName != 'IFRAME') {
                    console.error('Vidata: An iframe element with id="vdtFrame" must be present on the page');
                    return;
                }


                var src = 'https://player.vidata.io/embed/index/' ;
                var entries = parseQuery(window.location.search);

                for (var entry in entries) {
                    if (entries.hasOwnProperty(entry)){
                        if(entry == 'id')
                            src += entries[entry];
                        else
                            src += '&' + entry + '=' + entries[entry];
                    }
                }
                vdtFrame.src = src;
                console.log(src);
    
                vdtFrame.setAttribute("allowfullscreen", true);
                vdtFrame.setAttribute("frameborder", 0);
            }

            function parseQuery(queryString) {
                var query = {};
                var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split('=');
                    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                }
                return query;
            }