function a2w_get_order_fulfillment(data/*, callback*/){
 
    var storeEvent = new CustomEvent('order_fulfillment', {"detail":data});
 /*   
    document.addEventListener('get_order_fulfillment_response', function respListener(event) {
        var data = event.detail;
      
            callback(data);
            document.removeEventListener('get_order_fulfillment_response', respListener);
  
    });*/
    
    document.dispatchEvent(storeEvent); 
}

function a2w_get_order_tracking_code(data, callback){
     var storeEvent = new CustomEvent('order_tracking_code', {"detail":data});

    document.addEventListener('order_tracking_code_response', function respListener(event) {
        var data = event.detail;
    
        callback(data);
      
        document.removeEventListener('order_tracking_code_response', respListener);
       
  
    });
    
    document.dispatchEvent(storeEvent); 
}

function ma_set_cookie(cookie_array, callback) {
	var reqId = Math.random().toString(); 
	var data = {"cookie_array":cookie_array, "reqId":reqId};
	var storeEvent = new CustomEvent('WEB_SET_ALIEXPRESS_COOKIE_REQUEST', {"detail":data});
	
	document.addEventListener('WEB_SET_ALIEXPRESS_COOKIE_RESPONSE', function respListener(event) {
		var data = event.detail;
		if(data.reqId == reqId) {
			callback();
			document.removeEventListener('WEB_SET_ALIEXPRESS_COOKIE_RESPONSE', respListener);
		}
	});
	
	document.dispatchEvent(storeEvent);
}

function ma_get_product(url, callback) {
    var reqId = Math.random().toString(); 
    var data = {"url":url, "reqId":reqId};
    var storeEvent = new CustomEvent('WEB_GET_PRODUCT_HTML_REQUEST', {"detail":data});
    
    document.addEventListener('WEB_GET_PRODUCT_HTML_RESPONSE', function respListener(event) {
        var data = event.detail;
        if(data.reqId == reqId) {
            callback(data.html);
            document.removeEventListener('WEB_GET_PRODUCT_HTML_RESPONSE', respListener);
        }
    });
    
    document.dispatchEvent(storeEvent);
}

var maAPILoaded = new CustomEvent('maAPILoaded');
document.dispatchEvent(maAPILoaded);