move these files into your project


point to <script src="path/to/decoder.js"><script>


Create a file input in your HTML page that has an id, say "xxx"
        <input type="file" id="xxx">


Then tell the page on load to QRIfy your field! Make sure to include your callback function, which will be called with a single argument (the FULL TEXT that was scanned): QRIfy('qrCode', onQrCode);//where qrCode is the id of your 
        <input type="file" id="xxx">


Basically, after you have a file field, then ondomready or on page load, call the following:

QRIfy('qrCode', callback);

where callcack is:

<body>
<form>
    <input type="file" id="qrCode" />
</form>
</body>

<script>
  callback = function(data){
    alert("We found this data in the scanned code:" + data);
  }
   QRIfy('qrCode', callback);
</script>
