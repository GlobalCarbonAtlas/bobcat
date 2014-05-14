//CF http://www.w3schools.com/dom/dom_parser.asp
  //Fonction pour charger xml comme un DOM document, exploitable par js ensuite :
function loadXMLDoc() {
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET","onlyBasicInfo.xml",false);
xhttp.send();
return xhttp.responseXML; 
}
