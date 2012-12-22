/**
 * Loads qrcode dependencies, and creates a wrapper that only requires an <input type="file"...> as the handle
 * 
 * @example
 * //<input id="codeimage" type="file">
 * var callback = function(code){alert('the code was: ' + code);} 
 * QRIfy('codeimg', callback);//will be connected on DOMContentLoaded
 */
(new function(world){
    var head = document.getElementsByTagName('head')[0];
    var dependencies = ["grid.js","version.js","detector.js","formatinf.js","errorlevel.js","bitmat.js","datablock.js","bmparser.js","datamask.js","rsdecoder.js","gf256poly.js","gf256.js","decoder.js","QRCode.js","findpat.js","alignpat.js","databr.js","mpimage.js"]
    var scripts = document.getElementsByTagName('script');
    var path = '';
    for(i=0; i<scripts.length; i++){
        if(scripts[i].src && scripts[i].src.indexOf('decoder.js') != -1){
            path = scripts[i].src.replace('decoder.js','') + 'dependencies/';
            break;
        }
    } 
    
    var loadScript = function(src){
        document.write('<scr' + 'ipt type="text/javascript" src="' + src +'"></scr' + 'ipt>')
    }
    
    for(var i=0; i<dependencies.length; i++){
        loadScript(path + dependencies[i]);
    }
    
    var qrField = function(elemOrId){
        var elem = typeof(elemOrId) == 'string' ? document.getElementById(elemOrId) : elemOrId;
        var self = this;
        var spinner;
        
        self.callback = function(data){
            console.log("Set callback to receive the data in the code, data was: " + data);
        }
        
        
        var onDecode = function(data){
            self.callback(data && data.indexOf('error decoding') == -1 ? data : false);
            document.body.removeChild(spinner);
        }
        
        var handleFileSelect = function(evt){
            //alert('changed')
            var file = evt.target.files[0];
            
            spinner = document.createElement('img');
            var orientation = window.innerWidth > window.innerHeight ? 'LANDSCAPE' : 'PORTRAIT';
            spinner.setAttribute('style', (orientation == 'LANDSCAPE' ? 'height' : 'width') + ':50%; top:25%; position:absolute; left:25%;')
            
            var delayLoad = function(){
                var img = new Image();
                img.onload = function(){
                   //document.getElementById('preview').src = this.src;
                   //console.log('src is', this.src); 
                   qrcode.callback = onDecode;
                   qrcode.decode(this.src);
                   
                }
                
                var mpImg = new MegaPixImage(file);
                mpImg.render(img, { maxWidth: 1000, maxHeight: 1000, quality: 1.0 });
            }
            
            spinner.onload = function(){
                setTimeout(delayLoad, 400)    
            }
            spinner.alt="Loading...";
            spinner.innerHTML = "Loading...";
            
            spinner.src=path + 'spinner.gif';
            document.body.appendChild(spinner);
        }
        
        elem.addEventListener('DOMSubtreeModified', function(){alert('changed 1');})
        elem.addEventListener('change', handleFileSelect, false);
        
            
            
        
    }
    
    world.QRIfy = function(elemOrId, callback){
        if(typeof(elemOrId) == 'string'){
            var elem = document.getElementById(elemOrId);
            if(!elem){
                document.addEventListener('DOMContentLoaded', function(){QRIfy(elemOrId, callback);})
                return;
            }
        }
        var q = new qrField(elemOrId);
        if(typeof callback == 'function'){
            q.callback = callback;
        }
    }
    
}(window))
