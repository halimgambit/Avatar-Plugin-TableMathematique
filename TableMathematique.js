exports.action = function(data, callback){

	let tblCommand = {
		multiplication: function() {
			multiplication(data, client);
					},						
		addition : function() {
			addition (data, client);
					}					
	};
	
	let client = setClient(data);
	info("TableMathematique:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}

function multiplication(data, client) {

	let mathsMulti = data.action.rawSentence.replace(/table de multiplication |tables de multiplication |tables de multiplication de |table de multiplication de /i, "").replace("de", "").trim();
	let i = 1;
	function loop() {
	  if (i <= 10) {
		const result = i * parseInt(mathsMulti, 10);
		Avatar.speak(`${mathsMulti} * ${i} = ${result}`, data.client, () => {
		  Avatar.Speech.end(data.client);
		});
		i++;
		setTimeout(loop, 4000);
	  }
	}
	loop();
	return;
	
}


function addition (data, client) {

	let mathsAdd = data.action.rawSentence.replace(/table |d' |addition|d'addition |table d'addition de /i, "").replace("de", "").replace("d'", "").replace("addition","").replace("table d'addition", "").trim();
	let i = 1;
	function loop() {
	  if (i <= 10) {
		const result = i + parseInt(mathsAdd, 10);
		Avatar.speak(`${mathsAdd} + ${i} = ${result}`, data.client, () => {
		  Avatar.Speech.end(data.client);
		});
		i++;
		setTimeout(loop, 4000);
	  }
	}
	
	loop();
	return;
}

function setClient (data) {
	let client = data.client;
	if (data.action.room)
		client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
		client = data.action.setRoom;
	return client;
}