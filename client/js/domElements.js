var domElements = (function(){
  
  var elements = [
    '.status-text', 
    '.status-light',
    '.screen',
    '.screen-status-light',
    '.screen-status-text',
    '.co-left',
    '.co-right',
    '.control-zone',
    '.control-cursor'
  ];

  // Return object with dom elements;
  function getDomElements(namesArr, func){
    var domElements = {};
    namesArr.forEach(function(el){
      domElements[func(el)] = document.querySelector(el);
    });
    return domElements;
  };

  // Return camel-cased dom element name (e.g. ".status-text" => "statusText");
  function elementNameToString(name){
    return name.replace(/(-[a-z])|(\.)/gi, function(el){
      if(el === "." || el === "#") return "";
      return el.substr(1,1).toUpperCase();
    });
  };

  return getDomElements(elements, elementNameToString);

}());