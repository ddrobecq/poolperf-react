const _PLAYER1_KEY = "PlayerId1";
const _PLAYER2_KEY = "PlayerId2";

/* GET PARAM FROM localStorage */
export function getPlayerId (nId){
	let strKeyName = getKeyName (nId);
	let strKeyValue = localStorage.getItem (strKeyName);
   
	if (strKeyValue == null){
		return nId;
	}
	else{
		let nValue = Number (strKeyValue);
		if (!(isNaN (nValue))) return nValue;
		else return nId;
	} 
}

/* SET VALUE INOT localStorage() */
export function setPlayerId (nId, nValue){
	let strKeyName = getKeyName (nId);

	localStorage.setItem(strKeyName, String(nValue));
}

/* GET KEY NAME ACCODING THE REQUESTED ID */ 
function getKeyName (nId){
	if (nId == 1){
		return (_PLAYER1_KEY);
	}
	else{
		return(_PLAYER2_KEY);
	}
}    
