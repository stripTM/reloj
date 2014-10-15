		var RELOJ = {
			iAntHora : 0,
			iAntMinuto : 0,
			init : function() {
				$("#corona").bind("click", RELOJ.arranca);
				RELOJ.arranca();
				var t = window.setInterval(RELOJ.arranca, 2000);
			},
			arranca : function() {
				function resetea($manillas, posicion, antPosicion) {
					//console.log("Resetea, posicion ("+posicion+") antPosicion ("+antPosicion +") y me quedo con "+(antPosicion-360));
					var iReset = (antPosicion-360);
//console.log("Sin anim ("+(iReset/6)+")");
					$manillas
						.addClass("noAnim")
						.css({
							"-moz-transform" :"rotate("+iReset+"deg)"
						})
						.bind("transitionend", function() {
//console.log("arranco");
							$manillas
								.removeClass("noAnim")
								.unbind("transitionend");
							window.setTimeout(
								function() {
									avanza($manillas, posicion);
								}, 0);
							
						});
					//console.log("Fin reset.");

					/* el evento transitionend no salta con el transform apagado */
/*
					window.setTimeout(
						function(){
							//console.log("volver a animar hasta "+posicion);
							$manillas
								.removeClass("noAnim")
								.css("-moz-transform", "rotate("+posicion+"deg)");
							//avanza($manillas, posicion);
						},100);
*/
				}
				function avanza($manillas, posicion){
//console.log("avanza ("+(posicion/6)+")");
					$manillas
						.css("-moz-transform", "rotate("+posicion+"deg)");
				}
				var d = new Date();
				//d.setMinutes ( d.getMinutes() - 146);

				var iHora = (d.getHours() % 12) * 30; /* Lo ponemos en modo 12 horas y la transformamos en grados */
				var iMinuto = d.getMinutes() * 6; /* Pasamos los minutos a grados */
				//var iMinuto = d.getSeconds() * 6; /* Pasamos los minutos a grados */
//iMinuto = (iMinuto*6)%360;
				iHora += iMinuto / 12; /* Le sumamos los minutos */

				/* Comprobar si da la vuelta para que no haga una animación hacia atrás */
				if (iHora < RELOJ.iAntHora) {
					//console.log("horas (reset) "+iHora+" "+RELOJ.iAntHora);
					resetea($("#horas"), iHora, RELOJ.iAntHora);
				}
				else {
					//console.log("horas (av) "+iHora);
					avanza($("#horas"), iHora);
				}

				if (iMinuto < RELOJ.iAntMinuto) {
					//console.log("minutos (reset) "+iMinuto+" a "+RELOJ.iAntMinuto);
					resetea($("#minutos"), iMinuto, RELOJ.iAntMinuto);
				}
				else {
					avanza($("#minutos"), iMinuto);
				}

				$("#corona")
					.attr("title", d.toLocaleTimeString().substr(0,5));

				RELOJ.iAntHora = iHora;
				RELOJ.iAntMinuto = iMinuto;
			}
		}
f1 = function(){
	$o = $("#minutos, #horas");
	$o
		.addClass("noAnim")
		.css({
			"-moz-transform" :"rotate(-100deg)"
		});
		window.setTimeout(function(){
			$o
				.removeClass("noAnim")
			.css({
			"-moz-transform" :"rotate(10deg)"
		});
		}, 0);

}


		$(document).ready(RELOJ.init);