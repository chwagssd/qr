move these files into your project


point to &lt;script src="path/to/decoder.js">&lt;script>


Create a file input in your HTML page that has an id, say "xxx"
        &lt;input type="file" id="xxx">


Then tell the page on load to QRIfy your field! Make sure to include your callback function, 
which will be called with a single argument (the FULL TEXT that was scanned): QRIfy('qrCode', onQrCode);//where qrCode is the id of your 
        &lt;nput type="file" id="xxx">


Basically, after you have a file field, then ondomready or on page load, call the following:

QRIfy('qrCode', callback);

where callcack is:

&lt;body>
&lt;form>
    &lt;input type="file" id="qrCode" />
&lt;/form>
&lt;/body>

&lt;script>
  callback = function(data){
    alert("We found this data in the scanned code:" + data);
  }
   QRIfy('qrCode', callback);
&lt;/script>
