"use strict";

var SamsungTVSmp2 = require("./../../samsung-tv-smp2.js")

var self = module.exports = {
	
	init: function( devices_data, callback ) {
		
		devices_data.forEach(function(device_data){
			module.exports.setUnavailable( device_data, "Offline" );

			Homey.log(device_data);
            Homey.app.tvs[device_data.ip] = device_data;
		});
		
		
		callback( true );
	},
	
	deleted: function( device_data ) {
		
		delete Homey.app.tvs[ device_data.id ];
		
	},
	
	pair: function( socket ) {
		
		socket
			.on('ip_entered', function( data, callback ){
				
                Homey.log("ip_entered called");
				
				var ip = data.ip;
				
				Homey.log("IP ENTERED: " + ip);
				
				var smp2 = new SamsungTVSmp2(ip);
				
				smp2.getTVInfo(function(err, data) {
					
					if(!err) {
						
						Homey.app.addDevice(ip, function () {}); 
						
					}
					
					callback(err, data);
					
				});
				
			});
		
	}
	
}