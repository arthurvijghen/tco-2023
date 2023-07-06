// JavaScript Document

// TCO Tool variables //


var scrollLimit = 10000;
var tcoReady = false;
var debugmessage = '';

var master;
var segment = '';
var drivetrainLeft = 'ev';
var drivetrainRight = 'benz';

var entiteit = '';
var btwplicht = 'n';
var gebruiksdoel = 'bw';
var tankkaart = 'y';

// Bij verandering de slider inits ook aanpassen
var vennootschapsbelasting = 0.25; // 25% vennnootschapsbelasting in 2022
var benzineprijs = 1.7815; // in €/L incl btw
var dieselprijs = 1.7506; // in €/L incl btw
var elektriciteitsprijsThuis = 0.35; // in €/kWh incl btw
var elektriciteitsprijsWerk = 0.28*1.21; // in €/kWh incl btw
var elektriciteitsprijsPubliek = 0.42; // in €/kWh incl btw
var elektriciteitsprijsOnderweg = 0.74; // in €/kWh incl btw
var aardgasprijs = 1.830; // in €/kg incl btw
var waterstofprijs = 9.999; // in €/kg incl. btw
var inflatie = 0.0415;
var inflatieFactor = 1;

var distancePY = 15000; // in km per year
var oldDistancePY = 0;
var duration = 5; //in years
var oldDuration = 0;
var rijgedrag = 1.42;
var laadpunt = 0;
var laadmixThuis = 0.45;
var laadmixWerk = 0.45;
var laadmixPubliek = 0.05;
var laadmixOnderweg = 0.05;
var btw = 0.21;
var btwRecup = 0.35;
var btwFactorFromExcl = 1 + btw;
var btwFactorFromIncl = 1;

var carIdLeft = ''; var carIdRight = ''; 
var oldCarIdLeft = ''; var oldCarIdRight = ''
var optionsLeft = 0; var optionsRight = 0; 
var discountLeft = 0; var discountRight = 0; 
var residualLeft = 0; var residualRight = 0;
var cngRatioLeft = 0.75; var cngRatioRight = 0.75; // 75% CNG, 25% benzine
var phevRatioLeft = 0.5; var phevRatioRight = 0.5; // 50% elektrisch, 50% brandstof

var customName = 'Samengestelde auto';
var customEuro = 6;
var customFiscPK = 10;
var customAankoop = 25000;
var customVerbruik = 6;
var customCO2 = 110;
var customCC = 1600;
var customFuel = 'Benzine';

var filterLeft = ['cng','ev','phev','fcev'];
var filterRight = ['cng','benz','dies','ev','phev','fcev'];

var nB = '?';
var nvt = 'n.v.t.';

var kangooZELease = new blc([0,69],[10000,79],[15000,89],[20000,99],[25000,109]); // BELANGRIJK: INCLUSIEF BTW!!!!!
var zoeZELease = new blc([0,69],[10000,79],[15000,89],[20000,99],[25500,109]); // BELANGRIJK: INCLUSIEF BTW!!!!!
//var smartLease = new blc([0,65]);
//var leafLease = new blc([0,79],[10000,86],[15000,102],[20000,122],[25000,122]);
//var evaliaLease = new blc([0,73],[10000,76],[15000,90],[20000,106],[25000,106]);

var cars = [ // PRIJZEN INCLUSIEF BTW // 0 betekent niet van toepassing // undefined of '' betekent niet beschikbaar // bonus toevoegen



];

// Visual functions //

function scrollToAnchor(aid,margin){
    var aTag = $("#"+ aid);
    $('html,body').animate({scrollTop: aTag.offset().top - margin},'slow');
}

function resizeDiv() {
  vpw = $(window).width();
  vph = $(window).height();
  $('#startscreen-sub').css({
    'min-height': vph - 218 + 'px'
  });
}

function fillCarBoxes(str) { // Functie die ervoor zorgt dat bij stap 3 de overzichten worden aangemaakt per segment
	var tempCarSrc = ''
	if ( str != 'rght') {
		var carsLeft = filterCars(cars,segment,drivetrainLeft); // Totale database filteren op segment en brandstof
		var cptCarBoxHtml = [];
		if (carsLeft.length != 0) {
			jQuery.each(carsLeft, function(i, item) { 
				tempCarSrc = carsLeft[i].id;
				if(carsLeft[i].image == false) { 
					tempCarSrc = 'silhouettes/' + carsLeft[i].segment;
				}
				cptCarBoxHtml.push('<div class="car col-md-3 col-xs-6" id="' + carsLeft[i].id + '"> <h4>Selecteren als eerste wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '.png" width="220" /> <h2>' + carsLeft[i].brand + ' ' + carsLeft[i].name + '</h2> <h3>' + carsLeft[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsLeft[i].fuel) + '">' + drivetrainToString(carsLeft[i].fuel,'') + '</span><br /><span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsLeft[i].price,0) + ',-</span></p> </div>');					 
			});
			cptCarBoxHtml.push('<div class="clear"></div>');
			$('#cpt-car-box').html(cptCarBoxHtml.join(''));
		} else { 
			$('#cpt-car-box').html('<p class="bg-warning">Er zijn geen ' + drivetrainToString(drivetrainLeft,'e').toLowerCase() + 'voertuigen in het ' + segment + '-segment.</p>');
		}
		carIdLeft = '';
		$('#section4').hide();
		$('#btn-go-to-section4').removeClass('active');
		$('#navmenu-4').addClass('disabled');
	}
	
	if ( str != 'left') {
		var carsRight = filterCars(cars,segment,drivetrainRight);
		var allCarBoxHtml = [];
	
		if (carsRight.length != 0) {
			jQuery.each(carsRight, function(i, item) { 
				tempCarSrc = carsRight[i].id;
				if(carsRight[i].image == false) { 
					tempCarSrc = 'silhouettes/' + carsRight[i].segment;
				}
				allCarBoxHtml.push('<div class="car col-md-3 col-xs-6" id="' + carsRight[i].id + '"> <h4>Selecteren als tweede wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '.png" width="220" /> <h2>' + carsRight[i].brand + ' ' + carsRight[i].name + '</h2> <h3>' + carsRight[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsRight[i].fuel) + '">' + drivetrainToString(carsRight[i].fuel,'') + '</span><br /><span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsRight[i].price,0) + ',-</span></p> </div>');					 
			});
			if ( drivetrainRight == 'benz' || drivetrainRight == 'dies') { 
				allCarBoxHtml.push('<div class="car col-md-3 col-xs-4 customCar"> <h4>Selecteren als tweede wagen</h4> <img src="assets/img/custom.png" width="250" /> <h2>Stel een <span style="text-transform: lowercase;">' + drivetrainToString(drivetrainRight,'') + '</span>wagen samen</h2> <h3>Op basis van eigen criteria.</h3> <p><span class="car-drivetrain-' + fuelToFuelType(drivetrainRight) + '">' + drivetrainToString(drivetrainRight,'') + '</span> <span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; <span class="customPriceTag">' + addCommas(25000,0) + '</span>,-</span></p> </div>');
				customFuel = drivetrainToString(drivetrainRight,'');
			}
			allCarBoxHtml.push('<div class="clear"></div>');
			$('#all-car-box').html(allCarBoxHtml.join(''));
		} else {
			$('#all-car-box').html('<p class="bg-warning">Er zijn geen ' + drivetrainToString(drivetrainRight,'e').toLowerCase() + 'voertuigen in het ' + segment + '-segment.</p>');
		}
		$('.customCar').click(function() { 
			$('#modalCustomCar').modal('show');
			changeCustomCar();
		});
		carIdRight = '';
		$('#section4').hide();
		$('#btn-go-to-section4').removeClass('active');
		$('#navmenu-4').addClass('disabled');
	}
	
	$('.car img').click(function() {
		var side = $(this).parent().parent().attr('id').substring(0, 3);
		
		$('#' + side + '-car-box .car').removeClass('active');
		
		$(this).parent().toggleClass('active');
		
		if (side == 'cpt') {
			carIdLeft = $(this).parent().attr('id');
		} else {
			carIdRight = $(this).parent().attr('id');
		}
		
		if ( carIdLeft != '' && carIdRight != '' ) {
			$('#btn-go-to-section4').addClass('active');
			$('#navmenu-4').removeClass('disabled');
		}
	});
	
	$('.car img').hover(function() { 
		$(this).parent().toggleClass('active2');
	});
}

// String function //

function drivetrainToString(str1,str2) { 
	var terms = '';
	switch(str1) {
      case 'ev':
        terms = 'Elektrisch' + str2 + ' '
        break;
      case 'benz':
        terms = 'Benzine'
        break;
      case 'phev':
	    terms = 'Plug-in hybride '
        break;
 	  case 'cng':
        terms = 'Aardgas'
        break;
 	  case 'fcev':
        terms = 'Waterstof'
        break;
      case 'Elektrisch':
        terms = 'Elektrisch' + str2 + ' '
        break;
      case 'Benzine':
        terms = 'Benzine'
        break;
      case 'Plug-in hybride':
	    terms = 'Plug-in hybride '
        break;
 	  case 'Bi-fuel CNG':
        terms = 'Aardgas'
        break;
 	  case 'Waterstof':
        terms = 'Waterstof'
        break;
      default:
        terms = 'Diesel'
	 }
	 return terms;
}

function verbruikToString(verbruik,fuelType) {
	var terms = '';
	if (fuelType == 'ev') {
		terms = addCommas(verbruik[0],1) + ' kWh'; 
	} else if (fuelType == 'phev') {
		terms = addCommas(verbruik[0],1) + ' kWh + ' + addCommas(verbruik[1],1) + ' L';
	}else if (fuelType == 'cng') {
		terms = addCommas(verbruik[2],1) + ' kg + ' + addCommas(verbruik[1],1) + ' L';
	}else if (fuelType == 'fcev') {
		terms = addCommas(verbruik[3],1) + ' kg';
	}else {
		terms = addCommas(verbruik[1],1) + ' L';
	}
	return terms;
}

function verbruikTheoretischToString(car) {
	var terms = '<p>Volgens ' + car.testcyclus + ':</p>';
	if (car.drivetrain == 'ev') {
		terms += '<p>' + addCommas(car.verbrEl) + ' kWh </p>'; 
	} else if (car.drivetrain == 'phev') {
		terms += '<p>' + addCommas(car.verbrEl,1) + ' kWh <span class="car-tooltip" data-content="<p>Indien 100% elektrisch wordt gereden.</p>">i</span> ' + '</p><p>' + addCommas(car.verbrBr,1) + ' L <span class="car-tooltip" data-content="<p>Indien 100% op brandstof wordt gereden.</p>">i</span></p>';
	}else if (car.drivetrain == 'cng') {
		terms += '<p>' + addCommas(car.verbrCNG,1) + ' kg <span class="car-tooltip" data-content="<p>Indien 100% op CNG wordt gereden.</p>">i</span> ' + '</p><p>' + addCommas(car.verbrBr,1) + ' L <span class="car-tooltip" data-content="<p>Indien 100% op benzine wordt gereden.</p>">i</span></p>';
	}else if (car.drivetrain == 'fcev') {
		terms += '<p>' + addCommas(car.verbrFCEV,1) + ' kg </p>';
	}else {
		terms += '<p>' + addCommas(car.verbrBr,1) + ' L </p>';
	}
	return terms;
}

function rijbereikToString(verbruik,car) {
	var terms = '';
	if (car.drivetrain == 'ev') {
		terms = addCommas(car.batterijcapaciteit / verbruik[0] *100) + ' km';
	} else if (car.drivetrain == 'phev') {
		terms = addCommas(car.batterijcapaciteit / car.verbrEl / rijgedrag *100);
		/*+ ' + ' + addCommas(car.tank / car.verbrBr / rijgedrag *100) + ' km';*/
	} /*else if (car.drivetrain == 'fcev') {
		terms = addCommas(car.tankFCEV / car.verbrFCEV / rijgedrag *100) + ' km';
	} else if (car.drivetrain == 'cng') {
		terms = addCommas(car.tankCNG / car.verbrCNG / rijgedrag *100) + ' + ' + addCommas(car.tank / car.verbrBr / rijgedrag *100) + ' km';
	} else {
		terms = addCommas(car.tank / verbruik[1]*100) + ' km';
	}*/
	return terms;
}

function suggestiesToString(car,flipped) {
	var terms = [];
	//alert(car.drivetrain);
	var carSubList = filterCars(cars,car.segment,car.drivetrain);
	var definitiveList = [];
	jQuery.each(carSubList, function(i, item) { 
		if (carSubList[i].id != car.id) { 
			definitiveList.push(carSubList[i]);
		}		   
	});
	var imageSrc = car.id;
	if (car.image == false) { imageSrc = 'silhouettes/' + car.segment; }
	terms.push('<span><img id="ch-' + car.id + '" class="active ' + flipped + '" src="assets/img/cars/' + car.imageSrc() + '.png" title="' + car.fullName + '" /></span>'); // Gekozen wagen als eerste plaatsen, actief
	jQuery.each(definitiveList, function(i, item) { 
		imageSrc = definitiveList[i].id;
		if (definitiveList[i].image == false) { imageSrc = 'silhouettes/' + definitiveList[i].segment; }
		terms.push('<span><img id="ch-' + definitiveList[i].id + '" class="' + flipped + '" src="assets/img/cars/' + imageSrc + '.png" title="' + definitiveList[i].brand + ' ' + definitiveList[i].name + '" /></span>');
	});
	return terms.join(' ');
}

function fuelToFuelType(str) { // deze functie is vooral bedoeld om de brandstof om te zetten in icoon-namen
	var terms = '';
	switch(str) {
      case 'Elektrisch':
        terms = 'electric'
        break;
      case 'Waterstof':
        terms = 'electric'
        break;
      case 'Plug-in hybride':
	    terms = 'phev'
        break;
	  case 'ev':
        terms = 'electric'
        break;
      case 'fcev':
        terms = 'electric'
        break;
      case 'phev':
	    terms = 'phev'
        break;
      default:
        terms = 'fuel'
	 }
	 return terms;
}

function addCommas(nStr,n) {
	if(nStr != undefined) { nStr = nStr.toFixed(n);
		nStr += ''
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? ',' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + '.' + '$2');
		}
		return x1 + x2;
	}
	else { 
		return 'x';
	}
}

// TCO tool functions //

/*******************************/
/* Car collection              */
/*******************************/

function Car(that) { // Alle kenmerken van de voertuigen die - ongeacht de input van de gebruiker - hetzelfde blijven
	this.segment = that.segment;
	this.id = that.id;
	this.brand = that.brand;
	this.name = that.name;
	this.testcyclus = that.testcyclus;
	this.fullName = that.brand + ' ' + that.name;
	this.version = that.v; 
	if (typeof this.version == 'undefined') this.version = this.name;
	this.priceIncl = that.price; // INCLUSIEF BTW
	this.verbrEl = that.verbrEl; // energieverbruik in kWh/100 km
	this.verbrBr = that.verbrBr; // brandstofverbruik in L/100 km
	this.verbrCNG = that.verbrCNG; // CNG verbruik in kg/100 km
	this.verbrFCEV = that.verbrFCEV; // Waterstofverbruik in kg/100 km
	if (typeof this.verbrEl == 'undefined') this.verbrEl = 0;
	if (typeof this.verbrBr == 'undefined') this.verbrBr = 0;
	if (typeof this.verbrCNG == 'undefined') this.verbrCNG = 0;
	if (typeof this.verbrFCEV == 'undefined') this.verbrFCEV = 0;
	this.drivetrain = '';
	if (that.fuel == 'Elektrisch') this.drivetrain = 'ev';
	if (that.fuel == 'Benzine') this.drivetrain = 'benz';
	if (that.fuel == 'Diesel') this.drivetrain = 'dies';
	if (that.fuel == 'Bi-fuel CNG') this.drivetrain = 'cng';
	if (that.fuel == 'Plug-in hybride') this.drivetrain = 'phev';
	if (that.fuel == 'Waterstof') this.drivetrain = 'fcev';
	this.image = that.image;
	this.euro = that.euro; // Euronorm (indien roetfilter werkelijke + 1)
	this.mtm = that.mtm;
	if (typeof this.mtm == 'undefined') this.mtm = 2500;
	if (typeof this.euro == 'undefined') this.euro = 6;
	this.co2 = that.co2; // in g/km
	this.co2FakeHybrid = that.fakehybrides; // in g/km
	this.co = that.co; // in g/km
	this.hc = that.hc; // in g/km
	this.nox = that.nox; // in g/km
	this.pm = that.pm; // in g/km
	this.note = that.note;
	this.zeroEmissieBonus = that.bonus * -1;
	if (typeof that.bonus == 'undefined' || that.bonus == '') this.zeroEmissieBonus = 0;
	this.acc = addCommas(that.acc,1) + ' s';
	if (typeof that.acc == 'undefined' || that.acc == '') this.acc = nB;
	this.ecoscore = that.ecoscore;
	if (typeof this.ecoscore == 'undefined' || this.ecoscore == '' || this.ecoscore == 0) this.ecoscore = nB;
	this.ecoscoreCat = function () {
		var ecosc;
		if (this.ecoscore >= 75) {
			ecosc = 75
		} else if (this.ecoscore >= 67) { 
			ecosc = 67
		} else if (this.ecoscore >= 50) { 
			ecosc = 50
		} else if (this.ecoscore > 0) { 
			ecosc = 0
		} else { // 0
			ecosc = 'undefined'
		}
		return ecosc
	}
	if (typeof this.co2 == 'undefined') this.co2 = 9999;
	if (typeof this.co  == 'undefined') this.co = 0;	
	if (typeof this.hc  == 'undefined') this.hc = 0;	
	if (typeof this.nox == 'undefined') this.nox = 0;	
	if (typeof this.pm  == 'undefined') this.pm = 0;
	if (typeof this.note == 'undefined') this.note = '/';
	this.power = that.power + ' kW'; // in kW
	if (typeof that.power == 'undefined' || that.power == '') this.power = nB;
	this.koffer = that.koffer + ' L'; // in L
	if (typeof that.koffer == 'undefined' || that.koffer == '') this.koffer = nB
	this.cilinder = that.cilinder; // in cc
	this.cilinderText = that.cilinder + ' cc';
	if (typeof that.cilinder == 'undefined' || that.cilinder == '') this.cilinder = nB
	if (this.drivetrain == 'ev' || this.drivetrain == 'fcev') this.cilinderText = nvt;
	this.batterijcapaciteit = that.bat;
	this.batterijcapaciteitText = addCommas(that.bat,1) + ' kWh';
	if (typeof that.bat == 'undefined' || that.bat == 'undefined') this.batterijcapaciteitText = nB
	if (this.drivetrain == 'cng' || this.drivetrain == 'dies' || this.drivetrain == 'benz' || this.drivetrain == 'fcev') this.batterijcapaciteitText = nvt;
	this.tank = that.tank; // in L
	this.tankCNG = that.tankcng; // in kg
	this.tankFCEV = that.tankfcev; // in kg
	if (typeof this.tank == 'undefined') this.tank = 0;
	if (typeof this.tankCNG == 'undefined') this.tankCNG = 0;
	if (typeof this.tankFCEV == 'undefined') this.tankFCEV = 0;
	this.tankText = this.tank;
	if (typeof that.tank == 'undefined' || that.tankcng == 'undefined') this.tankText = nB
	if (this.drivetrain == 'cng') { 
		this.tankText = this.tankCNG + ' kg + ' + this.tank + ' L'
	} else if (this.drivetrain == 'fcev') {
		this.tankText = this.tankFCEV + ' kg';
	} else { 
		this.tankText = this.tank + ' L'
	}
	if (this.drivetrain == 'ev') this.tankText = nvt;
	this.model = that.model; // M1 | N1
	if (typeof this.model == 'undefined') this.model = 'M1';
	this.batterylease = that.blc; // PY inclusief BTW
	if (typeof this.batterylease == 'undefined') this.batterylease = new blc(); 
	this.fiscalePK = that.pk; // fiscale PK
	if (typeof this.fiscalePK == 'undefined') this.fiscalePK = 0;
	if(this.drivetrain == 'ev' || this.drivetrain == 'fcev') {
		this.co2 = 0;
		this.fiscalePK = 4;
	}
	this.fuelType = drivetrainToString(this.drivetrain,'');
	this.priceExcl = this.priceIncl/(1+btw);
	
	this.imageSrc = function() { 
		var is = this.id;
		if (this.image == false) { 
			is = 'silhouettes/' + this.segment;
		}
		return is;
	}
	
	this.robPKM = function() { // De onderhoudskosten inclusief BTW per kilometer
		var rob = 0;
		rob = (0.02+this.priceIncl/2000000)*(1+btw);
		if (this.drivetrain == 'ev') { 
			rob *= 0.75; // Elektrische voertuigen hebben 75% minder kosten
		}
		return rob;
	}
	
	this.vaaCoef = function() {
		var co2Coef = 0;
		var diesRef = 84; // Diesel-CO2-referentie: 84 g/km per 1/1/2021
		var benzRef = 102; // Benzine-CO2-referentie: 102 g/km per 1/1/2021
		if (this.drivetrain == 'ev' || this.drivetrain == 'fcev') {
			co2Coef = 0.04;
		} else if (this.drivetrain == 'dies') {
			co2Coef = 0.055 + (this.co2 - diesRef) * 0.001;
		} else if (this.drivetrain =='phev' && this.co2FakeHybrid != 0) { // PHEV
			co2Coef = 0.055 + (this.co2FakeHybrid - benzRef) * 0.001;
		} else { // Benzine, cng, lpg
			co2Coef = 0.055 + (this.co2 - benzRef) * 0.001;
		}
		co2Coef = Math.min(Math.max(co2Coef,0.04),0.18);
		return co2Coef;
	}
	
	this.solidariteitsbijdragePY = function() { // Solidariteitsbijdrage per 1/7/2023
		var sol = 0;
		var solMinimum = 31.34; // Minimum bijdrage per maand per 1/1/2023
		var solIndex = 1.5046; // Gezondheidsindex per 1/1/2023
		if (this.drivetrain == 'dies') {
			sol = (this.co2*9-600)/12;
		}
		else if (this.drivetrain == 'benz' || this.drivetrain == 'cng' ) {
			sol = (this.co2*9-768)/12;
		}
		else if (this.drivetrain == 'lpg') {
			sol = (this.co2*9-990)/12;
		}
		sol *= solIndex;
		sol = Math.max(sol,solMinimum);
		sol *= 12;
		return sol;
	}
	
	this.fiscaleAftrek2019 = function() {
		var fa = 0;
		if (this.drivetrain == 'ev' || this.drivetrain == 'fcev') {
			fa = 1;
		} else if (this.drivetrain  == 'dies') {
			if (this.co2 <= 60) { fa = 1; }
			else if (this.co2 <=105) { fa = 0.9; }
			else if (this.co2 <=115) { fa = 0.8; }
			else if (this.co2 <=145) { fa = 0.75; }
			else if (this.co2 <=170) { fa = 0.7; }
			else if (this.co2 <=195) { fa = 0.6; }
			else { fa = 0.5; }
		} else {
			if (this.co2 <= 60) { fa = 1; }
			else if (this.co2 <=105) { fa = 0.9; }
			else if (this.co2 <=125) { fa = 0.8; }
			else if (this.co2 <=155) { fa = 0.75; }
			else if (this.co2 <=180) { fa = 0.7; }
			else if (this.co2 <=205) { fa = 0.6; }
			else { fa = 0.5; }
		}
		return fa;
	}
	
	this.fiscaleAftrek = function() {
		var fa = 1; // Voor EV
		if (this.drivetrain != 'ev' && this.drivetrain != 'fcev') {
			var bc = 1;
			if (this.drivetrain == 'benz' || this.drivetrain == 'phev') {
				bc = 0.95; 
			} else if (this.drivetrain == 'cng') {
				if (this.fiscalePK <= 11 ) {
					bc = 0.9;
				} else {
					bc = 0.95; 
				}
			}
			if (this.co2FakeHybrid == 0) {
				fa = Math.round(100*(1.2 - 0.005 * bc * this.co2)) / 100;
			} else { 
				fa = Math.round(100*(1.2 - 0.005 * bc * this.co2FakeHybrid)) / 100;
			}
			fa = Math.min(1,fa); // Maximum 100%
			
			switch(duration) {  // Dalende fiscale aftrek vanaf 1/7/2023
				case 3 : fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa)/2)/3; break; //Aanname dat auto in helft van het jaar wordt ingeschreven
				case 4 : fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa)/2)/4; break;
				case 5 : fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0,fa)/2)/5; break;
				case 6 : fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*1 + Math.min(0,fa)/2)/6; break;
				case 7 : fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*2 + Math.min(0,fa)/2)/7; break;
				case 8 : fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*3 + Math.min(0,fa)/2)/8; break;
				case 9 : fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*4 + Math.min(0,fa)/2)/9; break;
				case 10: fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*5 + Math.min(0,fa)/2)/10; break;
				case 11: fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*6 + Math.min(0,fa)/2)/11; break;
				case 12: fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*7 + Math.min(0,fa)/2)/12; break;
				case 13: fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*8 + Math.min(0,fa)/2)/13; break;
				case 14: fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*9 + Math.min(0,fa)/2)/14; break;
				case 15: fa = (fa/2 + fa + Math.min(0.75,fa) + Math.min(0.5,fa) + Math.min(0.25,fa) + Math.min(0.25,fa)*10 + Math.min(0,fa)/2)/15; break;
				default: fa = 0; 
			}
		}
		return fa;
	}
	
	this.residualValue = function(d,leeftijd) { // Geeft de restwaarde ifv totale prijs inclusief BTW
		var r = 0; // 80% > 30% met s = 10% | 30% > 15% met s = 5% | 15% > 5% met s = 2.5%
		if       (d < 120001) { r = 90   - d / 2000; }
		else if ( d < 180001) { r = 60   - d / 4000; }
		else if ( d < 220001) { r = 37.5 - d / 8000; }
		else { r = 10; }
		if(d < 141000) r = r-(5-d/40000)*(leeftijd-3);
		r = Math.round(this.priceExcl*(r-5))/100;
		r = r/this.priceIncl;
		return r;
	}
	
	this.biv = function() { // BIV vanaf 1/1/2021 o.b.v. WLTP-uitstoot
		var b = 0;
		if (this.model = 'M1') {
			if (this.drivetrain == 'ev' || this.drivetrain == 'fcev') { 
				b = 0; // BIV is 0 euro voor alle zero emissie voertuigen
			}
			else { 
				var LC = 1; // Leeftijdscorrectie: 1 bij nieuwe voertuigen
				var q = 1.14; // 1.07 in 2021, wordt jaarlijks verhoogd met 0,035 vanaf 2022.
				var bMinimum = 53; // Waarde vanaf 1/7/2023
				var bMaximum = 13249.15; // Waarde vanaf 1/7/2023
	
				var f = 1;
				if (this.drivetrain == 'lpg') f = 0.88;
				if (this.drivetrain == 'cng') f = 0.744; // Voor 100% aardgasvoertuigen 0.93; voor bi-fuel 0.744
				var c = 0;
				if (this.drivetrain == 'dies') { // bedragen per 1/7/2023
					if (this.euro == 0) { c = 3613.58; }
					else if (this.euro == 1) { c = 1060.16; }
					else if (this.euro == 2) { c = 785.75; }
					else if (this.euro == 3) { c = 622.67; }
					else if (this.euro == 4) { c = 589.48; }
					else if (this.euro == 5) { c = 579.75; }
					else if (this.euro == 6) { c = 573.08; }
				}
				else { // Benzine, PHEV > 50g en LPG (Geen diesel)
					if (this.euro == 0) { c = 1437.25; }
					else if (this.euro == 1) { c = 642.76; }
					else if (this.euro == 2) { c = 192.21; }
					else if (this.euro == 3) { c = 120.57; }
					else if (this.euro == 4) { c = 28.94; }
					else if (this.euro == 5 || this.euro == 6) { c = 26.01; }
				}
				b = 1;
				b *= this.co2*f*q; //{(CO2 * f * q) / 246}^6
				b /= 246;
				b = Math.pow(b,6);
				b *= 4500 + c;
				b *= LC;
				b = Math.max(Math.min(b,bMaximum),bMinimum);
			}
		} else { //N1
			b = 0;
		}
		return b;
	}
	
	this.vkbPY = function() { // Verkeersbelasting vanaf 1/1/2021 o.b.v. WLTP-uitstoot
		var v = 0; 
		if (this.model == 'M1') {
			if (this.drivetrain == 'ev' || this.drivetrain == 'fcev') { 
				v = 0; // Verkeersbelasting is 0 euro voor zero emissie
			} else { // Andere brandstoffen en PHEV
				// Verkeersbelasting criterium 1: fiscale PK
				switch(this.fiscalePK) {  // M1 vanaf 1/7/2023 INCLUSIEF OPDECIEM
					case 1 : case 2 : case 3 : 
					case 4 : v =   88.80*1.1; break;
					case 5 : v =  111.12*1.1; break;
					case 6 : v =  160.56*1.1; break;
					case 7 : v =  209.76*1.1; break;
					case 8 : v =  259.44*1.1; break;
					case 9 : v =  309.00*1.1; break;
					case 10: v =  358.08*1.1; break;
					case 11: v =  464.76*1.1; break;
					case 12: v =  571.32*1.1; break;
					case 13: v =  677.76*1.1; break;
					case 14: v =  784.44*1.1; break;
					case 15: v =  891.00*1.1; break; 
					case 16: v = 1167.00*1.1; break; 
					case 17: v = 1443.36*1.1; break; 
					case 18: v = 1719.60*1.1; break; 
					case 19: v = 1995.12*1.1; break; 
					default: v = 2271.36*1.1; 
				}
				if (this.fiscalePK > 20) { // Fiscale PK boven 21
					v = v + (this.fiscalePK - 20) * 123.72 * 1.1; // M1 vanaf 1/7/2023
				}
				// Verkeersbelasting criterium 2: CO2; o.b.v. WLTP
				var co2Reference = 149;
				var co2step = 0.003; //0,3%
				var co2Factor = ( this.co2 - co2Reference) * co2step;
				v = v + co2Factor * v;
				// Verkeersbelasting criteirum 3: Euronorm
				var euroFactor = 0;
				if (this.drivetrain == 'dies') {
					if (this.euro == 0) { euroFactor = 0.5; }
					else if (this.euro == 1) { euroFactor = 0.4; }
					else if (this.euro == 2) { euroFactor = 0.35; }
					else if (this.euro == 3) { euroFactor = 0.3; }
					else if (this.euro == 4) { euroFactor = 0.25; }
					else if (this.euro == 5) { euroFactor = 0.175; }
					else if (this.euro == 6) { euroFactor = 0.15; }
				}
				else { // Benzine, PHEV en LPG
					if (this.euro == 0) { euroFactor = 0.3; }
					else if (this.euro == 1) { euroFactor = 0.1; }
					else if (this.euro == 2) { euroFactor = 0.05 }
					else if (this.euro == 3) { euroFactor = 0; }
					else if (this.euro == 4) { euroFactor = -0.125; }
					else if (this.euro == 5 || this.euro == 6) { euroFactor = -0.15; }
				}
				v = v + euroFactor * v;	
				
				v = Math.max(v,55.53); // Minimum M1 vanaf 1/7/2023 INCLUSIEF OPDECIEM
			}
		} else { //N1
			// Verkeersbelasting N1 criterium 1: MTM vanaf 1/7/2023 INCLUSIEF OPDECIEM
			v = Math.ceil(this.mtm/500) * 23.40;
			
			// Verkeersbelasting N1 criterium 2 & 3: CO2 en euronorm
			if (this.mtm <= 2500) {
				var co2Reference = 149;
				var co2step = 0.003; //0,3%
				var co2Factor = ( this.co2 - co2Reference) * co2step;
				v = v + co2Factor * v;	
				
				var euroFactor = 0;
				if (this.drivetrain == 'dies') {
					if (this.euro == 0) { euroFactor = 0.5; }
					else if (this.euro == 1) { euroFactor = 0.4; }
					else if (this.euro == 2) { euroFactor = 0.35; }
					else if (this.euro == 3) { euroFactor = 0.3; }
					else if (this.euro == 4) { euroFactor = 0.25; }
					else if (this.euro == 5) { euroFactor = 0.175; }
					else if (this.euro == 6) { euroFactor = 0.15; }
				}
				else { // Benzine, PHEV en LPG
					if (this.euro == 0) { euroFactor = 0.3; }
					else if (this.euro == 1) { euroFactor = 0.1; }
					else if (this.euro == 2) { euroFactor = 0.05 }
					else if (this.euro == 3) { euroFactor = 0; }
					else if (this.euro == 4) { euroFactor = -0.125; }
					else if (this.euro == 5 || this.euro == 6) { euroFactor = -0.15; }
				}
				v = v + euroFactor * v;	
			} else { // MTM > 2500 kg
				var euroFactor = 0;
				if (this.euro == 0) { euroFactor = 0.35; }
				else if (this.euro == 1) { euroFactor = 0.25; }
				else if (this.euro == 2) { euroFactor = 0.2; }
				else if (this.euro == 3) { euroFactor = 0.15; }
				else if (this.euro == 4) { euroFactor = 0.1; }
				else if (this.euro == 4) { euroFactor = 0.025; }
				else if (this.euro == 6) { euroFactor = 0; }
				
				v = v + euroFactor * v;
			}
				
			v = Math.max(v,53.35) // Minimum N1 vanaf 1/7/2023 INCLUSIEF OPDECIEM
		}
		return v;
	}
}

function solidarityFactor2023(car, d) {
	var factor = 1;
	if (car.drivetrain != 'ev' && car.drivetrain != 'fcev') { // Nieuwe regeling per 1/7/2023
		switch(d) {  // i.f.v. duurtijd wordt de solidarieitsbijdrage anders
			case 3 : factor = (2.25/2+2.25+2.75+4/2)/3; break; // Aanname dat auto in helft van het jaar wordt ingeschreven
			case 4 : factor = (2.25/2+2.25+2.75+4+5.5/2)/4; break;
			case 5 : factor = (2.25/2+2.25+2.75+4+5.5*1+5.5/2)/5; break;
			case 6 : factor = (2.25/2+2.25+2.75+4+5.5*2+5.5/2)/6; break;
			case 7 : factor = (2.25/2+2.25+2.75+4+5.5*3+5.5/2)/7; break;
			case 8 : factor = (2.25/2+2.25+2.75+4+5.5*4+5.5/2)/8; break;
			case 9 : factor = (2.25/2+2.25+2.75+4+5.5*5+5.5/2)/9; break;
			case 10: factor = (2.25/2+2.25+2.75+4+5.5*6+5.5/2)/10; break;
			case 11: factor = (2.25/2+2.25+2.75+4+5.5*7+5.5/2)/11; break;
			case 12: factor = (2.25/2+2.25+2.75+4+5.5*8+5.5/2)/12; break;
			case 13: factor = (2.25/2+2.25+2.75+4+5.5*9+5.5/2)/13; break;
			case 14: factor = (2.25/2+2.25+2.75+4+5.5*10+5.5/2)/14; break;
			case 15: factor = (2.25/2+2.25+2.75+4+5.5*11+5.5/2)/15; break;
			default: factor = 5.5; 
		}
	}
	return factor;
}

function filterCars(lijst,seg,bs) {
	var brandstof = '';
	switch(bs) {
      case 'ev':
        brandstof = 'Elektrisch';
        break;
      case 'benz':
        brandstof = 'Benzine';
        break;
      case 'phev':
	    brandstof = 'Plug-in hybride';
        break;
 	  case 'cng':
        brandstof = 'Bi-fuel CNG';
        break;
 	  case 'fcev':
        brandstof = 'Waterstof';
        break;
	  case 'dies':
        brandstof = 'Diesel';
        break;
      default:
        alert('problem');
	}
	var newArray = [];
	jQuery.each(lijst, function(i, item) { 
		if (lijst[i].segment == seg) { 
			if (lijst[i].fuel == brandstof) { 
				newArray.push(lijst[i]);
			}
		}		   
	});
	return newArray;
}

function collection() { 
	var args = Array.prototype.slice.call(arguments);
	this.length = args.length;
	this.items = new Array(this.length);  
	for(i in args) {
		this.items[i] = args[i];
	}
	this.add = function(key,item) {
		if(this.items[key] != undefined)
			return undefined;
		this.items[key] = item;
	 	return ++this.length;
	}
	this.remove = function(key) {
		if(this.items[key] == undefined)
			return undefined;
		delete this.items[key]
		return --this.length;
	}
	this.item = function(key) {
		return this.items[key];
	}
}

function createCollection(source) { 
	var col = new collection();
	for (x in source) { col.add(source[x].id, new Car(source[x])); }
	return col;
}

function blc() {
	var args = Array.prototype.slice.call(arguments);
	this.length = args.length;
	this.contract = new Array(args.length);  
	for(i in args) {
		this.contract[i] = args[i];
	}
	this.pricePY = function(distance) {
		var p = 0; 
		for(i=0;i< this.length; i++) { // gaat ervan uit dat prijzen oplopend zijn geordend
			if ( this.contract[i][0] < distance) p = this.contract[i][1];
		}
		return p*12;
	}
}

function calculateVerbr(car,phev,cng) { // Returnt een array van het re&euml;le verbruik in kWh, L en kg per 100 km, rekening houdend met de ratio's (0: elektrisch; 1: brandstof; 2: CNG en 3: waterstof)
	var verbruik = [];
	var phevVerhouding = phev;
	var cngVerhouding = cng;
	if (car.drivetrain == 'ev' || car.drivetrain == 'fcev') phevVerhouding = 1; 
	if (car.drivetrain == 'dies' || car.drivetrain == 'benz') { 
		phevVerhouding = 0; 
		cngVerhouding = 0;
	}
	if (car.drivetrain == 'cng') phevVerhouding = 0; 
	if (car.drivetrain != 'cng' ) cngVerhouding = 0;
	verbruik.push(rijgedrag*phevVerhouding*car.verbrEl);
	verbruik.push(rijgedrag*(1-phevVerhouding)*(1-cngVerhouding)*car.verbrBr);
	verbruik.push(rijgedrag*cngVerhouding*car.verbrCNG);
	verbruik.push(rijgedrag*car.verbrFCEV);
	return verbruik;
}

function calculateTCO() {
	if (tcoReady) {
		var leftCar = master.item(carIdLeft);
		var rightCar = master.item(carIdRight);
		
		if (leftCar.drivetrain == 'ev' || leftCar.drivetrain == 'fcev') { // Auto's switchen indien twee CPT-wagens. Dit om "Investeer" of "Bespaar" t.o.v. Z.E. alternatief te benoemen
			if( rightCar.drivetrain == 'cng' || rightCar.drivetrain == 'phev') {
				leftCar = master.item(carIdRight);
				rightCar = master.item(carIdLeft);
			}
		}
		
		if ( carIdLeft != oldCarIdLeft ) { // linkerauto is veranderd: reset een aantal waarden
			optionsLeft = 0; 
			discountLeft = 0; 
			residualLeft = leftCar.residualValue(distancePY*duration,duration);
			var cngRatioLeft = 0.75;
			var phevRatioLeft = 0.5;
		}
		if ( carIdRight != oldCarIdRight ) { // linnkerauto is veranderd: reset een aantal waarden
			optionsRight = 0; 
			discountRight = 0;
			residualRight = rightCar.residualValue(distancePY*duration,duration);
			cngRatioRight = 0.75;
			phevRatioRight = 0.5;
		}
		
		if ( oldDuration != duration || oldDistancePY != distancePY) { // gebruiksduur of jaarlijke kilometrage is veranderd. Indien niet, wordt de restwaarde overgenomen van het menu
			residualLeft = leftCar.residualValue(distancePY*duration,duration);
			residualRight = rightCar.residualValue(distancePY*duration,duration);
		}
		if (typeof phevRatioLeft == 'undefined') { phevRatioLeft = parseFloat($('#phevratioleftcont').html()); }
		if (typeof cngRatioLeft == 'undefined') { cngRatioLeft = parseFloat($('#cngratioleftcont').html()); }
		
		// Waarden ophalen uit velden
		rijgedrag = 1 + $('#input-rijgedrag').val()/100;
		laadpunt = parseInt($('#input-laadpunt').val());
		entiteit = $('#input-entiteit').val();
		btwplicht = $('#input-btwplicht').val();
		gebruiksdoel = $('#input-gebruiksdoel').val();
		tankkaart = $('#input-tankkaart').val();
		laadmixThuis = parseInt($('#input-laadmix-thuis').val())/100;
		laadmixWerk = parseInt($('#input-laadmix-werk').val())/100;
		laadmixPubliek = parseInt($('#input-laadmix-publiek').val())/100;
		laadmixOnderweg = parseInt($('#input-laadmix-onderweg').val())/100;
		
		// BTW bepalen
		if (entiteit == 'np') {
			btwFactorFromIncl = 1;
			btwFactorFromExcl = 1 + btw;
		} else { // Geen natuurlijke persoon
			if ( btwplicht == 'y') { // BTW plichtig
				if ( gebruiksdoel == 'pw') { // BTW plichtig en poolwagen
					btwFactorFromIncl = 1 / (1 + btw);
					btwFactorFromExcl = 1;
				} else { //BTW plichtig en bedrijfswagen
					if (btwRecup > 0.5) { btwRecup = 0.5; } // Maximale BTW-recuperatie van 50%
					btwFactorFromExcl = 1 + (1-btwRecup)*btw; // De factor die vermenigvuldigd moet worden met het bedrag excl btw
					btwFactorFromIncl = 1 / (1+btw) * btwFactorFromExcl;
				}
			} else { // Niet-BTW-plichtige organisaties
				btwFactorFromIncl = 1;
				btwFactorFromExcl = 1 + btw;
			}
		}
		
		// Inflatie bepalen
		inflatieFactor = calculateInflatie(duration,inflatie);
		
		// Verbruik berekenen
		var verbruikLeft = calculateVerbr(leftCar,phevRatioLeft,cngRatioLeft);
		var verbruikRight = calculateVerbr(rightCar,phevRatioRight,cngRatioRight);
				
		// Pas afbeeldingen in HERO aan
		$('#tco-result-image-left').attr('src','assets/img/cars/' + leftCar.imageSrc() + '.png');
		$('#tco-result-image-right').attr('src','assets/img/cars/' + rightCar.imageSrc() + '.png');
				
		// Pas titels en subtitels aan
		$('#tco-result-title-left').html(leftCar.brand + ' ' + leftCar.name);
		$('#tco-result-title-right').html(rightCar.brand + ' ' + rightCar.name);
		$('#tco-result-subtitle-left').html(leftCar.version);
		$('#tco-result-subtitle-right').html(rightCar.version);
		
		// Pas ecoscores aan
		$('#tco-result-ecoscore-left').removeClass().addClass('tco-result-ecoscore').addClass('ecoscore-bg-' + leftCar.ecoscoreCat());
		$('#tco-result-ecoscore-right').removeClass().addClass('tco-result-ecoscore').addClass('ecoscore-bg-' + rightCar.ecoscoreCat());
		$('#tco-result-ecoscore-left h3').html(leftCar.ecoscore);
		$('#tco-result-ecoscore-right h3').html(rightCar.ecoscore);
		
		// Pas drivetrain en prijs aan
		$('#tco-result-left-drivetrain-type').removeClass().addClass('car-drivetrain-' + fuelToFuelType(leftCar.drivetrain)).html(leftCar.fuelType);
		$('#tco-result-right-drivetrain-type').removeClass().addClass('car-drivetrain-' + fuelToFuelType(rightCar.drivetrain)).html(rightCar.fuelType);
		$('#tco-result-left-price').html('<span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(leftCar.priceIncl,0) + ',- incl. BTW');
		$('#tco-result-right-price').html('<span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(rightCar.priceIncl,0) + ',- incl. BTW');
		
		// Pas specs aan
		$('#tco-result-specsheet-left-vermogen').html(leftCar.power);
		$('#tco-result-specsheet-left-acceleratie').html(leftCar.acc);
		$('#tco-result-specsheet-left-koffer').html(leftCar.koffer);
		$('#tco-result-specsheet-left-cilinderinhoud').html(leftCar.cilinderText);
		$('#tco-result-specsheet-left-batterijcapaciteit').html(leftCar.batterijcapaciteitText);
		$('#tco-result-specsheet-left-brandstoftank').html(leftCar.tankText);
		$('#tco-result-specsheet-left-verbruik-reeel').html(verbruikTheoretischToString(leftCar));
		$('#tco-result-specsheet-left-verbruik').html(verbruikToString(verbruikLeft,leftCar.drivetrain));
		$('#tco-result-specsheet-left-rijbereik').html(rijbereikToString(verbruikLeft,leftCar));
		
		$('#tco-result-specsheet-right-vermogen').html(rightCar.power);
		$('#tco-result-specsheet-right-acceleratie').html(rightCar.acc);
		$('#tco-result-specsheet-right-koffer').html(rightCar.koffer);
		$('#tco-result-specsheet-right-cilinderinhoud').html(rightCar.cilinderText);
		$('#tco-result-specsheet-right-batterijcapaciteit').html(rightCar.batterijcapaciteitText);
		$('#tco-result-specsheet-right-brandstoftank').html(rightCar.tankText);
		$('#tco-result-specsheet-right-verbruik-reeel').html(verbruikTheoretischToString(rightCar));
		$('#tco-result-specsheet-right-verbruik').html(verbruikToString(verbruikRight,rightCar.drivetrain));
		$('#tco-result-specsheet-right-rijbereik').html(rijbereikToString(verbruikRight,rightCar));
		
		$('.car-tooltip').popover({
			placement: 'right',
			html: true
		});
	
		// Autosuggesties invullen en activeren
		$('#tco-result-car-switch-left').html(suggestiesToString(leftCar,''));
		$('#tco-result-car-switch-right').html(suggestiesToString(rightCar,'flipped'));
		
		$('#tco-result-car-switch-left img').click(function() { carIdLeft = $(this).attr('id').substring(3); calculateTCO(); }); 
		$('#tco-result-car-switch-right img').click(function() { carIdRight = $(this).attr('id').substring(3); calculateTCO(); });
		
		// Popovers inhoud instellen
		if ( leftCar.drivetrain == 'ev' ) { $('#tco-popover-left-elektriciteit-thuis').show(); $('#tco-popover-left-elektriciteit-werk').show(); $('#tco-popover-left-elektriciteit-publiek').show(); $('#tco-popover-left-elektriciteit-onderweg').show(); $('#tco-popover-left-waterstof').hide(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').hide(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'ev' ) { $('#tco-popover-right-elektriciteit-thuis').show(); $('#tco-popover-right-elektriciteit-werk').show(); $('#tco-popover-right-elektriciteit-publiek').show(); $('#tco-popover-right-elektriciteit-onderweg').show(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( leftCar.drivetrain == 'fcev' ) { $('#tco-popover-left-elektriciteit-thuis').hide(); $('#tco-popover-left-elektriciteit-werk').hide(); $('#tco-popover-left-elektriciteit-publiek').hide(); $('#tco-popover-left-elektriciteit-onderweg').hide(); $('#tco-popover-left-waterstof').show(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').hide(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'fcev' ) { $('#tco-popover-right-elektriciteit-thuis').hide(); $('#tco-popover-right-elektriciteit-werk').hide(); $('#tco-popover-right-elektriciteit-publiek').hide(); $('#tco-popover-right-elektriciteit-onderweg').hide(); $('#tco-popover-right-waterstof').show(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( leftCar.drivetrain == 'cng' ) { $('#tco-popover-left-elektriciteit-thuis').hide(); $('#tco-popover-left-elektriciteit-werk').hide(); $('#tco-popover-left-elektriciteit-publiek').hide(); $('#tco-popover-left-elektriciteit-onderweg').hide(); $('#tco-popover-left-waterstof').hide(); $('#tco-popover-left-aardgas').show(); $('#tco-popover-left-benzine').show(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').show(); }
		if ( rightCar.drivetrain == 'cng' ) { $('#tco-popover-right-elektriciteit-thuis').hide(); $('#tco-popover-right-elektriciteit-werk').hide(); $('#tco-popover-right-elektriciteit-publiek').hide(); $('#tco-popover-right-elektriciteit-onderweg').hide(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').show(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').show(); }
		if ( leftCar.drivetrain == 'phev' ) { $('#tco-popover-left-elektriciteit-thuis').show(); $('#tco-popover-left-elektriciteit-werk').show(); $('#tco-popover-left-elektriciteit-publiek').show(); $('#tco-popover-left-elektriciteit-onderweg').show(); $('#tco-popover-left-waterstof').hide(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').show(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').show(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'phev' ) { $('#tco-popover-right-elektriciteit-thuis').show(); $('#tco-popover-right-elektriciteit-werk').show(); $('#tco-popover-right-elektriciteit-publiek').show(); $('#tco-popover-right-elektriciteit-onderweg').show(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').show(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'benz' ) { $('#tco-popover-right-elektriciteit-thuis').hide(); $('#tco-popover-right-elektriciteit-werk').hide(); $('#tco-popover-right-elektriciteit-publiek').hide(); $('#tco-popover-right-elektriciteit-onderweg').hide(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'dies' ) { $('#tco-popover-right-elektriciteit-thuis').hide(); $('#tco-popover-right-elektriciteit-werk').hide(); $('#tco-popover-right-elektriciteit-publiek').hide(); $('#tco-popover-right-elektriciteit-onderweg').hide(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').show(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		$('#tco-change-car-popover-left').hide(); 
		$('#tco-change-car-popover-right').hide(); 
		
		
		// TCO berekenen
		
		var tcoWagenLeft = calculateTCOWagen(leftCar,optionsLeft,discountLeft, residualLeft);
		var tcoWagenRight = calculateTCOWagen(rightCar,optionsRight,discountRight,residualRight);
		
		var tcoVerbruikLeft = calculateTCOVerbruik(leftCar,verbruikLeft);
		var tcoVerbruikRight = calculateTCOVerbruik(rightCar,verbruikRight);
		
		var phevFossilConsLeft = calculateFossilConsPHEV(leftCar, verbruikLeft); // wordt enkel gebruikt om fiscale aftrek PHEV per 1/1/2023 te gebruiken
		var phevFossilConsRight = calculateFossilConsPHEV(rightCar, verbruikRight);
		
		var tcoOverigeLeft = calculateTCOVerzROB(leftCar,optionsLeft);
		var tcoOverigeRight = calculateTCOVerzROB(rightCar,optionsRight);
		
		var tcoIncentivesLeft = calculateTCOIncentives(leftCar,optionsLeft,discountLeft);
		var tcoIncentivesRight = calculateTCOIncentives(rightCar,optionsRight,discountRight);
	
		var tcoWerknemerLeft = calculateTCOVAA(leftCar,optionsLeft,discountLeft);
		var tcoWerknemerRight = calculateTCOVAA(rightCar,optionsRight,discountRight);
	
		var tcoFiscaleAftrekLeft = calculateTCOFiscaleAftrek(leftCar,optionsLeft,tcoVerbruikLeft,tcoOverigeLeft, phevFossilConsLeft);
		var tcoFiscaleAftrekRight = calculateTCOFiscaleAftrek(rightCar,optionsRight,tcoVerbruikRight,tcoOverigeRight, phevFossilConsRight);
	
		var tcoTotaalLeft = tcoWagenLeft + tcoVerbruikLeft + tcoOverigeLeft + tcoIncentivesLeft + tcoFiscaleAftrekLeft + laadpunt;
		var tcoTotaalRight = tcoWagenRight + tcoVerbruikRight + tcoOverigeRight +  tcoIncentivesRight + tcoFiscaleAftrekRight + laadpunt;
		
		debugmessage = tcoTotaalLeft;
	
		// TCO weergeven
		var mx = Math.max(tcoWagenLeft,tcoWagenRight,tcoVerbruikLeft,tcoVerbruikRight,tcoOverigeLeft,tcoOverigeRight,tcoIncentivesLeft,tcoIncentivesRight,tcoTotaalLeft,tcoTotaalRight);
		
		//alert('TCO WAGEN LINKS:\n------------\nAankoop en investering: ' + addCommas(tcoWagenLeft,0) + '€\nVerbruik: ' + addCommas(tcoVerbruikLeft,0) + '€\nVerzekering en onderhoud: ' + addCommas(tcoOverigeLeft,0) + '€\nIncentives: ' + addCommas(tcoIncentivesLeft,0) + '€\nFiscale aftrek: ' + addCommas(tcoFiscaleAftrekLeft,0) + '€\nTCO: ' + addCommas(tcoTotaalLeft,0) + '€\nVoordeel alel aard: ' + addCommas(tcoWerknemerLeft,0) + '\n\nTCO WAGEN RECHTS:\n------------\nAankoop en investering: ' + addCommas(tcoWagenRight,0) + '€\nVerbruik: ' + addCommas(tcoVerbruikRight,0) + '€\nVerzekering en onderhoud: ' + addCommas(tcoOverigeRight,0) + '€\nIncentives: ' + addCommas(tcoIncentivesRight,0) + '€\nFiscale aftrek: ' + addCommas(tcoFiscaleAftrekRight,0) + '€\nTCO: ' + addCommas(tcoTotaalRight,0) + '€\nVoordeel alel aard: ' + addCommas(tcoWerknemerRight,0));
		
		fillTCOBar('wagen',leftCar,rightCar,tcoWagenLeft,tcoWagenRight,mx);
		fillTCOBar('verbr',leftCar,rightCar,tcoVerbruikLeft,tcoVerbruikRight,mx);
		fillTCOBar('verzrob',leftCar,rightCar,tcoOverigeLeft,tcoOverigeRight,mx);
		fillTCOBar('prbel',leftCar,rightCar,tcoIncentivesLeft,tcoIncentivesRight,mx);
		fillTCOBar('totaltco',leftCar,rightCar,tcoTotaalLeft,tcoTotaalRight,mx);
		fillTCOBar('fisc',leftCar,rightCar,tcoFiscaleAftrekLeft,tcoFiscaleAftrekRight,mx);
		fillTCOBar('vaa',leftCar,rightCar,tcoWerknemerLeft,tcoWerknemerRight,mx);
		
		$('.years').html(duration);
		
		if( entiteit == 'np' ) { // Bij natuurlijke personen fiscale aftrek en VAA verbergen
			$('#tco-result-vaa').hide();
			$('#tco-result-fisc').hide();
		} else { // bij rechtspersonen het VAA en fiscale aftrek wel/niet tonen
			if (gebruiksdoel == 'bw') { $('#tco-result-vaa').show(); }
			else { $('#tco-result-vaa').hide(); }
			if ( entiteit == 'vns' ) { $('#tco-result-fisc').show(); }
			else { $('#tco-result-fisc').hide(); }
		}
		
		var verschil = tcoTotaalRight - tcoTotaalLeft;
		var term = 'Bespaar &euro;' + addCommas(verschil,0) + ' (of &euro;' + addCommas((verschil)/duration/12,0) + ' per maand) <br />met een ' + leftCar.fullName + '!';
		var loser = 'right';
		
		// Hero initialiseren
		if (rightCar.drivetrain == 'ev' || rightCar.drivetrain == 'fcev' || rightCar.drivetrain == 'cng' || rightCar.drivetrain == 'phev') { // Twee CPT-wagens
			if (tcoTotaalLeft > tcoTotaalRight) { // Rechts winnaar
				term = 'Bespaar &euro;' + addCommas(-verschil,0) + ' (of &euro;' + addCommas((-verschil)/duration/12,0) + ' per maand) <br />met een ' + rightCar.fullName + '!';
				loser = 'left';
			}			
		} else { // E&eacute;n CPT wagen
			if (tcoTotaalLeft > tcoTotaalRight) { // Rechts winnaar
				term = 'Investeer &euro;' + addCommas(-verschil,0) + ' (of &euro;' + addCommas((-verschil)/duration/12,0) + ' per maand) <br />voor een ' + leftCar.fullName + '!';
				loser = 'left';
			}
		}
		
		// Hero vullen		
		$('#tco-result-term').html(term);
		if (loser == 'left') { $('#tco-result-image-right').removeClass('loser'); $('#tco-result-image-left').addClass('loser'); }
		else { $('#tco-result-image-left').removeClass('loser'); $('#tco-result-image-right').addClass('loser'); }
		
		// Thumbs instellen
		$('.thumbLeft').attr('src','assets/img/cars/' + leftCar.imageSrc() + '.png').attr('title',leftCar.fullName).attr('alt',leftCar.fullName);
		$('.thumbRight').attr('src','assets/img/cars/' + rightCar.imageSrc() + '.png').attr('title',rightCar.fullName).attr('alt',rightCar.fullName);
		
		oldCarIdLeft = carIdLeft; oldCarIdRight = carIdRight;
		oldDuration = duration; oldDistancePY = distancePY;
	}
}

function fillTCOBar(el,car1,car2,tco1,tco2,maximum) { 
	var diff = tco1 - tco2;
	var divider = 1;
	var suffix = '';
	var suffix2 = '';
	var x = $('#tco-result-' + el + '-term');
	var y = $('#tco-result-' + el + '-diff');
	//x.parent().removeClass('wide');
	if ( entiteit == 'vns' ) {
		divider /= duration*12;
		//x.parent().addClass('wide');
		suffix = '<sub>/mnd</sub>';
		suffix2 = '/mnd';
	}
	if ( diff >= 0) {
		y.html('<sub>&euro;</sub>' + addCommas(divider*diff,0) + suffix);
		x.html('Investeer');
		x.parent().css('background','#E5E5E5').css('color','#000');
	} else { 
		y.html('<sub>&euro;</sub>' + addCommas(divider*diff*-1,0) + suffix);
		x.html('Bespaar');
		x.parent().css('background','#1C7074').css('color','#FFF');
	}
	$('#tco-result-' + el + '-left-bar').css('width', (tco1/maximum * 75) + '%');
	$('#tco-result-' + el + '-right-bar').css('width', (tco2/maximum * 75) + '%');
	$('#tco-result-' + el + '-left-nr').html(addCommas(divider*tco1,0) + ' &euro;' + suffix2);
	$('#tco-result-' + el + '-right-nr').html(addCommas(divider*tco2,0) + ' &euro;' + suffix2);
}

function calculateInflatie(duur,index) { 
	var term = 0;
	for ( i = 0; i < duur; i++) {
		term += Math.pow((1+index),i);
	}
	return term;
}

function calculateTCOWagen(car,opties,korting,restwaarde) {
	var term = 0;
	term += (car.priceIncl + opties) * btwFactorFromIncl; // Aankoopprijs incl. opties incl. (niet-recupereerbare) BTW 
	term *= 1 - korting;
	term+= car.batterylease.pricePY(distancePY) * duration * btwFactorFromIncl; // kosten batterijlease incl. (niet-recupereerbare) BTW ; dit bedrag wordt niet geïndexeerd
	term-= restwaarde*(car.priceIncl+opties);
	return Math.round(term);
}

function calculateTCOVerbruik(car,verbruik) { // verbruik houdt reeds rekening met rijgedrag en CNG of PHEV-verhouding
	var term = 0;
	var elektrPrijs = laadmixThuis * elektriciteitsprijsThuis + laadmixWerk * elektriciteitsprijsWerk + laadmixPubliek * elektriciteitsprijsPubliek + laadmixOnderweg * elektriciteitsprijsOnderweg;
	term += verbruik[0] * elektrPrijs; // Bereken de elektriciteitskosten in € per 100km
	if (car.drivetrain == 'diesel') { 
		term += verbruik[1] * dieselprijs; // Bereken de dieselkosten in € per 100km
	} else { // benzine, aardgas of phev
		term += verbruik[1] * benzineprijs; // Bereken de benzinekosten in € per 100km
	}
	term += verbruik[2] * aardgasprijs; // Bereken de aardgaskosten in € per 100km
	term += verbruik[3] * waterstofprijs; // Bereken de waterstofkosten in € per 100km
	term *= distancePY * inflatieFactor * btwFactorFromIncl; // Totale prijs op volledige afstand * inflatiefactor * 100 incl. (niet-recupereerbare) BTW
	term /= 100;
	return Math.round(term);
}

function calculateFossilConsPHEV(car,verbruik) { 
	var term = 0;
	if(car.drivetrain == 'phev') {
		term += verbruik[1] * benzineprijs; // Bereken de benzinekosten in € per 100km
	}
	term *= distancePY * inflatieFactor * btwFactorFromIncl; // Totale prijs op volledige afstand * inflatiefactor * 100 incl. (niet-recupereerbare) BTW
	term /= 100;
	return Math.round(term);
}

function calculateTCOVerzROB(car,opties) { // verbruik houdt reeds rekening met rijgedrag en CNG of PHEV-verhouding
	var term = 0;
	term += car.robPKM() * distancePY * inflatieFactor * btwFactorFromIncl; // geïndexeerde onderhoudskosten incl. (niet-recupereerbare) BTW
	term += 425 * 1.271 * inflatieFactor; // Geïndexeerde BA verzekering
	term += 0.02 * (car.priceIncl + opties) * inflatieFactor * btwFactorFromIncl; // geïndexeerde omnium verzekering op de aankoop incl. (niet-recupereerbare) BTW
	return Math.round(term);
}

function calculateTCOIncentives(car,opties,korting) { 
	var term = 0;
	term += car.biv(); // BIV
	term += car.vkbPY() * inflatieFactor; // Geïndexeerde verkeersbelasting
	if ( entiteit != 'np' && gebruiksdoel == 'bw') { // solidariteitsbijdrage
		term += car.solidariteitsbijdragePY() * solidarityFactor2023(car,duration) * inflatieFactor;
		if (entiteit == 'vns') { // patronale bijdrage of werkgeversbijdrage of verworpen uitgave
			if (tankkaart == 'y') {
				term += calculateTCOVAA(car,opties,korting) * 0.40 * vennootschapsbelasting;
			}
			else {
				term += calculateTCOVAA(car,opties,korting) * 0.17 * vennootschapsbelasting;
			}
		}
	}
	return Math.round(term);
}

function calculateTCOVAA(car,opties,korting) {
	var vaa = 0;
	if ( entiteit != 'np' && gebruiksdoel == 'bw') {
		var vaaMinimum = 1360; // Minimumbedrag per 1/1/2021
		var vaaBase = car.vaaCoef() * (car.priceExcl + opties/(1+btw) + (( car.priceExcl + opties - korting)*btw) ) * 6 / 7;
		for( i = 1; i <= duration; i++ ) { 
			if (duration < 6 ) { // Van 0 tot 60 maanden
				vaa += Math.max(vaaBase * (1 - i * 0.06),vaaMinimum);
			} else { // Vanaf 61 maanden
				vaa += Math.max(vaaBase * 0.7,vaaMinimum);
			}
			// Uitzondering voor PHEV toevoegen!
		}
	}
	return Math.round(vaa);
}

function calculateTCOFiscaleAftrek(car,opties,tcoVerbruik,tcoOverige,phevFossilCost) {
	var fa = 0;
	if ( entiteit == 'vns' ) {
		fa = ((car.priceIncl + opties) + car.batterylease.pricePY(distancePY) * duration) * btwFactorFromIncl + tcoOverige + car.biv() + car.vkbPY() * inflatieFactor;
		if (gebruiksdoel == 'bw') { // Indien bedrijfswagen: CO2-afhankelijke aftrek
			fa *= car.fiscaleAftrek();
			
			if (car.drivetrain == 'phev') {
				fa += car.fiscaleAftrek() * (tcoVerbruik - phevFossilCost) + 0.5 * phevFossilCost; // Nieuwe regel per 1/1/2023 voor PHEV's
			} else {
				fa += car.fiscaleAftrek() * tcoVerbruik;
			}
			fa += 1 * car.solidariteitsbijdragePY() * solidarityFactor2023(car,duration)* inflatieFactor;
		}
		else {
			fa += tcoVerbruik;
		}
		fa *= vennootschapsbelasting * -1;
	}
	return Math.round(fa); // Fiscale aftrek als negatief getal
}

function createRandomStartImages() {
	var length = cars.length;
	var id1 = 0;
	var id2 = 0; 
	id1 = Math.floor(Math.random() * length);
	id2 = Math.floor(Math.random() * length);
	$('#start-image-left').attr('src','assets/img/cars/' + cars[id1].id + '.png');
	$('#start-image-right').attr('src','assets/img/cars/' + cars[id2].id + '.png');
	if(cars[id1].image == false || cars[id2].image == false || cars[id1].id == 0 || cars[id2].id == 0) createRandomStartImages(); // Altijd een auto nemen met een echte afbeelding
}

function changeCustomCar() { 
	master.remove('custom');
	var customName = $('#input-custom-name').val();
	var customEuro = $('#input-emissienorm').val();
	//var customFiscPK = parseInt($('#input-fiscpk').val());
	
	master.add('custom', new Car( { 'segment': segment, 'id': 'custom', 'brand': '', 'name': customName, 'v': '', 'fuel': customFuel, 'verbrEl': 0, 'verbrBr': customVerbruik, 'verbrCNG': 0, 'co2': customCO2, 'power': 0, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 40, 'tankcng': 0, 'ecoscore': 0, 'price': customAankoop, 'bonus': 0, 'pk': customFiscPK, 'image': false, 'euro': customEuro, 'testcyclus':'WLTP', 'fakehybrides':0 } ));
	carIdRight = 'custom';
	$('.customPriceTag').html(addCommas(customAankoop,0));
	calculateTCO();
	
}

// Ready... //

    $(document).ready(function() {
		
		master = createCollection(cars);
		
		createRandomStartImages();
		
		//
		$('#tco-debug').click(function() {
			/*var leftCar = master.item(carIdLeft);
			var rightCar = master.item(carIdRight);
			alert('onderhoud: ' 
				  + addCommas(Math.round(leftCar.robPKM() * distancePY * inflatieFactor * btwFactorFromIncl),0) 
				  + ' vs '  
				  + addCommas(Math.round(rightCar.robPKM() * distancePY * inflatieFactor * btwFactorFromIncl),0) 
				  + '\n'
				  + 'BA-verzekering: ' 
				  + addCommas(Math.round(311 * 1.271 * inflatieFactor),0) 
				  + ' vs '  
				  + addCommas(Math.round(311 * 1.271 * inflatieFactor),0) 
				  + '\n'
				  + 'Omnium-verzekering: ' 
				  + addCommas(Math.round(0.02 * (leftCar.priceIncl + optionsLeft) * inflatieFactor * btwFactorFromIncl),0) 
				  + ' vs '  
				  + addCommas(Math.round(0.02 * (rightCar.priceIncl + optionsRight) * inflatieFactor * btwFactorFromIncl),0) 
				  + '\n'
				  );*/
			$('#tco-debug').html(debugmessage);
		});
		
		
		// Navigatie initialiseren
		$('.navbar-nav li').click(function() {
			$('.navbar-nav li').removeClass('active');
			$(this).addClass('active');
			$('.chapter').hide();
			$('#chapter-' + $(this).attr('id').substring(4)).slideDown();		
		});
		
		// Popover sluiten na klik buiten popover
		$('#section4').on('mouseup', function(e) {
			if(!$(e.target).closest('.popover').length) {
				$('.popover').each(function(){
					$(this.previousSibling).popover('hide');
				});
			}
		});
		
		// Hoofdnavigatie vastpinnen
        $('.navbar').scrollToFixed();
		
		// Subnavigatie vastpinnen
		$('#myScrollspy').scrollToFixed({ 
			marginTop: 65,
			limit: function() {
                    var limit = scrollLimit;
                    return limit;
                },
			zIndex: 950
		});
		
		// Startknop naar sectie 1
		$('#btn-start').click(function() {
          scrollToAnchor('section1',70);
        });
		
		// Vervolgknop naar sectie 2
		$('#btn-go-to-section2').click(function() {
			if ($(this).hasClass('active')) {
				$('#section2').show();
				scrollToAnchor('section2',70);
				$('#gebruiksdoel-vulin').hide();
			}
			else { 
				$('#gebruiksdoel-vulin').show();
			}
          
        });
		
		// Vervolgknop naar sectie 3
		$('#btn-go-to-section3').click(function() {
          $('#section3').show();
		  scrollToAnchor('section3',70);
        });
		
		// Vervolgknop naar sectie 4
		$('#btn-go-to-section4').click(function() {
          if ($(this).hasClass('active')) {
				$('#section4').show();
				scrollToAnchor('section4',25);
				scrollLimit = $('#section4').offset().top - $(this).outerHeight(true) - 20;
				tcoReady = true;
				calculateTCO();
				
			}
			else { 
				// Geef foutmeldingen bij missende velden /////////////////
			}
        });
		
		// Vervolgknop naar sectie 4
		$('#go-to-top').click(function() {
			scrollToAnchor('section2',25);
        });
		
		// Subnavigatie toggle
		$('#nav-toggle').click(function() {
		  $('#myScrollspy nav').slideToggle();
		  $('#nav-toggle').toggleClass('closed');
		  $('#nav-toggle span').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
		});
		
		// Subnavigatie anchor animatie
		$('.nav-pills>li>a').click(function() {
  		 scrollToAnchor($(this).attr('href').substring(1),70);
		});

		resizeDiv();

		window.onresize = function(event) {
			resizeDiv();
		}

		var inputAutoGebruik = document.querySelector('.input-prive-professioneel');
    	var initAutoGebruik = new Powerange(inputAutoGebruik, { decimal: false, callback: changeOutputAutoGebruik, min: 0, max: 100, start: 35, step: 5 });
		function changeOutputAutoGebruik() { btwRecup = parseFloat(inputAutoGebruik.value)/100; $('#input-prive-professioneel').val(inputAutoGebruik.value); calculateTCO(); }
		
		var inputAfstand = document.querySelector('.input-afstand');
    	var initAfstand = new Powerange(inputAfstand, { decimal: false, callback: changeOutputAfstand, min: 5000, max: 50000, start: 15000, step: 1000 });
		function changeOutputAfstand() { distancePY = parseFloat(inputAfstand.value); $('#input-afstand').val(parseInt(inputAfstand.value).toLocaleString('nl-NL')); calculateTCO(); }
		
		var inputLeeftijd = document.querySelector('.input-leeftijd');
    	var initLeeftijd = new Powerange(inputLeeftijd, { decimal: false, callback: changeOutputLeeftijd, min: 3, max: 15, start: 5, step: 1 });
		function changeOutputLeeftijd() { duration = parseFloat(inputLeeftijd.value);$('#input-leeftijd').val(inputLeeftijd.value); }
	
		var inputCatoptionsLeft = document.querySelector('.input-catprice-left');
		var initCatoptionsLeft = new Powerange(inputCatoptionsLeft, { decimal: false, callback: changeOutputCatoptionsLeft, min: 0, max: 20000, start: optionsLeft, step: 10 });
		function changeOutputCatoptionsLeft() { optionsLeft = parseFloat(inputCatoptionsLeft.value); $('#input-catprice-left').val(addCommas(optionsLeft,0)); }
		
		var inputCatoptionsRight = document.querySelector('.input-catprice-right');
		var initCatoptionsRight = new Powerange(inputCatoptionsRight, { decimal: false, callback: changeOutputCatoptionsRight, min: 0, max: 20000, start: optionsRight, step: 10 });
		function changeOutputCatoptionsRight() { optionsRight = parseFloat(inputCatoptionsRight.value); $('#input-catprice-right').val(addCommas(optionsRight,0)); }
		
		var inputDiscountLeft = document.querySelector('.input-discount-left');
		var initDiscountLeft = new Powerange(inputDiscountLeft, { decimal: true, callback: changeOutputDiscountLeft, min: 0, max: 50, start: discountLeft*100, step: 0.5 });
		function changeOutputDiscountLeft() { discountLeft = parseFloat(inputDiscountLeft.value/100); $('#input-discount-left').val(addCommas(discountLeft*100,0)); }
		
		var inputDiscountRight = document.querySelector('.input-discount-right');
		var initDiscountRight = new Powerange(inputDiscountRight, { decimal: true, callback: changeOutputDiscountRight, min: 0, max: 50, start: discountRight*100, step: 0.5 });
		function changeOutputDiscountRight() { discountRight = parseFloat(inputDiscountRight.value/100); $('#input-discount-right').val(addCommas(discountRight*100,0)); }
		
		var inputResidualLeft = document.querySelector('.input-residual-left');
		var initResidualLeft = new Powerange(inputResidualLeft, { decimal: true, callback: changeOutputResidualLeft, min: 0, max: 50, start: residualLeft*100, step: 0.5 });
		function changeOutputResidualLeft() { residualLeft = parseFloat(inputResidualLeft.value/100); $('#input-residual-left').val(addCommas(residualLeft*100,0)); }
		
		var inputResidualRight = document.querySelector('.input-residual-right');
		var initResidualRight = new Powerange(inputResidualRight, { decimal: true, callback: changeOutputResidualRight, min: 0, max: 50, start: residualRight*100, step: 0.5 });
		function changeOutputResidualRight() { residualRight = parseFloat(inputResidualRight.value/100); $('#input-residual-right').val(addCommas(residualRight*100,0)); }
		
		var inputElektriciteitThuisLeft = document.querySelector('.input-elektriciteit-thuis-left');
		var initElektriciteitThuisLeft = new Powerange(inputElektriciteitThuisLeft, { decimal: true, callback: changeOutputElektriciteitThuisLeft, min: 0, max: 1, start: elektriciteitsprijsThuis });
		function changeOutputElektriciteitThuisLeft() { elektriciteitsprijsThuis = parseFloat(inputElektriciteitThuisLeft.value); $('#input-elektriciteit-thuis-left').val(addCommas(elektriciteitsprijsThuis,2)); }
		
		var inputElektriciteitThuisRight = document.querySelector('.input-elektriciteit-thuis-right');
		var initElektriciteitThuisRight = new Powerange(inputElektriciteitThuisRight, { decimal: true, callback: changeOutputElektriciteitThuisRight, min: 0, max: 1, start: elektriciteitsprijsThuis });
		function changeOutputElektriciteitThuisRight() { elektriciteitsprijsThuis = parseFloat(inputElektriciteitThuisRight.value); $('#input-elektriciteit-thuis-right').val(addCommas(elektriciteitsprijsThuis,2)); }
		
		var inputElektriciteitWerkLeft = document.querySelector('.input-elektriciteit-werk-left');
		var initElektriciteitWerkLeft = new Powerange(inputElektriciteitWerkLeft, { decimal: true, callback: changeOutputElektriciteitWerkLeft, min: 0, max: 1, start: elektriciteitsprijsWerk });
		function changeOutputElektriciteitWerkLeft() { elektriciteitsprijsWerk = parseFloat(inputElektriciteitWerkLeft.value); $('#input-elektriciteit-werk-left').val(addCommas(elektriciteitsprijsWerk,2)); }
		
		var inputElektriciteitWerkRight = document.querySelector('.input-elektriciteit-werk-right');
		var initElektriciteitWerkRight = new Powerange(inputElektriciteitWerkRight, { decimal: true, callback: changeOutputElektriciteitWerkRight, min: 0, max: 1, start: elektriciteitsprijsWerk });
		function changeOutputElektriciteitWerkRight() { elektriciteitsprijsWerk = parseFloat(inputElektriciteitWerkRight.value); $('#input-elektriciteit-werk-right').val(addCommas(elektriciteitsprijsWerk,2)); }

		var inputElektriciteitPubliekLeft = document.querySelector('.input-elektriciteit-publiek-left');
		var initElektriciteitPubliekLeft = new Powerange(inputElektriciteitPubliekLeft, { decimal: true, callback: changeOutputElektriciteitPubliekLeft, min: 0, max: 1, start: elektriciteitsprijsPubliek });
		function changeOutputElektriciteitPubliekLeft() { elektriciteitsprijsPubliek = parseFloat(inputElektriciteitPubliekLeft.value); $('#input-elektriciteit-publiek-left').val(addCommas(elektriciteitsprijsPubliek,2)); }
		
		var inputElektriciteitPubliekRight = document.querySelector('.input-elektriciteit-publiek-right');
		var initElektriciteitPubliekRight = new Powerange(inputElektriciteitPubliekRight, { decimal: true, callback: changeOutputElektriciteitPubliekRight, min: 0, max: 1, start: elektriciteitsprijsPubliek });
		function changeOutputElektriciteitPubliekRight() { elektriciteitsprijsPubliek = parseFloat(inputElektriciteitPubliekRight.value); $('#input-elektriciteit-publiek-right').val(addCommas(elektriciteitsprijsPubliek,2)); }
		
		var inputElektriciteitOnderwegLeft = document.querySelector('.input-elektriciteit-onderweg-left');
		var initElektriciteitOnderwegLeft = new Powerange(inputElektriciteitOnderwegLeft, { decimal: true, callback: changeOutputElektriciteitOnderwegLeft, min: 0, max: 1, start: elektriciteitsprijsOnderweg });
		function changeOutputElektriciteitOnderwegLeft() { elektriciteitsprijsOnderweg = parseFloat(inputElektriciteitOnderwegLeft.value); $('#input-elektriciteit-onderweg-left').val(addCommas(elektriciteitsprijsOnderweg,2)); }
		var inputElektriciteitOnderwegRight = document.querySelector('.input-elektriciteit-onderweg-right');
		var initElektriciteitOnderwegRight = new Powerange(inputElektriciteitOnderwegRight, { decimal: true, callback: changeOutputElektriciteitOnderwegRight, min: 0, max: 1, start: elektriciteitsprijsOnderweg });
		function changeOutputElektriciteitOnderwegRight() { elektriciteitsprijsOnderweg = parseFloat(inputElektriciteitOnderwegRight.value); $('#input-elektriciteit-onderweg-right').val(addCommas(elektriciteitsprijsOnderweg,2)); }

		var inputWaterstofLeft = document.querySelector('.input-waterstof-left');
		var initWaterstofLeft = new Powerange(inputWaterstofLeft, { decimal: true, callback: changeOutputWaterstofLeft, min: 5, max: 15, start: waterstofprijs, step: 0.1 });
		function changeOutputWaterstofLeft() { waterstofprijs = parseFloat(inputWaterstofLeft.value); $('#input-waterstof-left').val(addCommas(waterstofprijs,2)); }
		
		var inputWaterstofRight = document.querySelector('.input-waterstof-right');
		var initWaterstofRight = new Powerange(inputWaterstofRight, { decimal: true, callback: changeOutputWaterstofRight, min: 5, max: 15, start: waterstofprijs, step: 0.1 });
		function changeOutputWaterstofRight() { waterstofprijs = parseFloat(inputWaterstofRight.value); $('#input-waterstof-right').val(addCommas(waterstofprijs,2)); }
		
		var inputAardgasLeft = document.querySelector('.input-aardgas-left');
		var initAardgasLeft = new Powerange(inputAardgasLeft, { decimal: true, callback: changeOutputAardgasLeft, min: 1, max: 5, start: aardgasprijs });
		function changeOutputAardgasLeft() { aardgasprijs = parseFloat(inputAardgasLeft.value); $('#input-aardgas-left').val(addCommas(aardgasprijs,2)); }
		
		var inputAardgasRight = document.querySelector('.input-aardgas-right');
		var initAardgasRight = new Powerange(inputAardgasRight, { decimal: true, callback: changeOutputAardgasRight, min: 1, max: 5, start: aardgasprijs });
		function changeOutputAardgasRight() { aardgasprijs = parseFloat(inputAardgasRight.value); $('#input-aardgas-right').val(addCommas(aardgasprijs,2)); }
		
		var inputBenzineLeft = document.querySelector('.input-benzine-left');
		var initBenzineLeft = new Powerange(inputBenzineLeft, { decimal: true, callback: changeOutputBenzineLeft, min: 1, max: 3, start: benzineprijs });
		function changeOutputBenzineLeft() { benzineprijs = parseFloat(inputBenzineLeft.value); $('#input-benzine-left').val(addCommas(benzineprijs,2)); }
		
		var inputBenzineRight = document.querySelector('.input-benzine-right');
		var initBenzineRight = new Powerange(inputBenzineRight, { decimal: true, callback: changeOutputBenzineRight, min: 1, max: 3, start: benzineprijs });
		function changeOutputBenzineRight() { benzineprijs = parseFloat(inputBenzineRight.value); $('#input-benzine-right').val(addCommas(benzineprijs,2)); }
		
		var inputDieselLeft = document.querySelector('.input-diesel-left');
		var initDieselLeft = new Powerange(inputDieselLeft, { decimal: true, callback: changeOutputDieselLeft, min: 1, max: 3, start: dieselprijs });
		function changeOutputDieselLeft() { dieselprijs = parseFloat(inputDieselLeft.value); $('#input-diesel-left').val(addCommas(dieselprijs,2)); }
		
		var inputDieselRight = document.querySelector('.input-diesel-right');
		var initDieselRight = new Powerange(inputDieselRight, { decimal: true, callback: changeOutputDieselRight, min: 1, max: 3, start: dieselprijs });
		function changeOutputDieselRight() { dieselprijs = parseFloat(inputDieselRight.value); $('#input-diesel-right').val(addCommas(dieselprijs,2)); }
		
		var inputPhevRatioLeft = document.querySelector('.input-phevratio-left');
		var initPhevRatioLeft = new Powerange(inputPhevRatioLeft, { decimal: false, callback: changeOutputPhevRatioLeft, min: 0, max: 100, start: phevRatioLeft*100, step: 1 });
		function changeOutputPhevRatioLeft() { phevRatioLeft = parseFloat(inputPhevRatioLeft.value/100); $('#input-phevratio-left').val(addCommas(phevRatioLeft*100,0)); $('#phevratioleftcont').html(phevRatioLeft); }
		
		var inputPhevRatioRight = document.querySelector('.input-phevratio-right');
		var initPhevRatioRight = new Powerange(inputPhevRatioRight, { decimal: false, callback: changeOutputPhevRatioRight, min: 0, max: 100, start: phevRatioRight*100, step: 1 });
		function changeOutputPhevRatioRight() { phevRatioRight = parseFloat(inputPhevRatioRight.value/100); $('#input-phevratio-right').val(addCommas(phevRatioRight*100,0)); }
		
		var inputCngRatioLeft = document.querySelector('.input-cngratio-left');
		var initCngRatioLeft = new Powerange(inputCngRatioLeft, { decimal: false, callback: changeOutputCngRatioLeft, min: 0, max: 100, start: cngRatioLeft*100, step: 1 });
		function changeOutputCngRatioLeft() { cngRatioLeft = parseFloat(inputCngRatioLeft.value/100); $('#input-cngratio-left').val(addCommas(cngRatioLeft*100,0)); $('#cngratioleftcont').html(cngRatioLeft); }
		
		var inputCngRatioRight = document.querySelector('.input-cngratio-right');
		var initCngRatioRight = new Powerange(inputCngRatioRight, { decimal: false, callback: changeOutputCngRatioRight, min: 0, max: 100, start: cngRatioRight*100, step: 1 });
		function changeOutputCngRatioRight() { cngRatioRight = parseFloat(inputCngRatioRight.value/100); $('#input-cngratio-right').val(addCommas(cngRatioRight*100,0)); }
		
		function updatePopovers() {
			initDiscountLeft.setPosition(discountLeft*227); $('#input-discount-left').val(addCommas(discountLeft*100,0));
			initDiscountRight.setPosition(discountRight*227); $('#input-discount-right').val(addCommas(discountRight*100,0));
			initResidualLeft.setPosition(residualLeft*227); $('#input-residual-left').val(addCommas(residualLeft*100,0));
			initResidualRight.setPosition(residualLeft*227); $('#input-residual-right').val(addCommas(residualRight*100,0));
			initElektriciteitThuisLeft.setPosition(elektriciteitsprijsThuis*210); $('#input-elektriciteit-thuis-left').val(addCommas(elektriciteitsprijsThuis,2));
			initElektriciteitThuisRight.setPosition(elektriciteitsprijsThuis*210); $('#input-elektriciteit-thuis-right').val(addCommas(elektriciteitsprijsThuis,2));
			initElektriciteitWerkLeft.setPosition(elektriciteitsprijsWerk*210); $('#input-elektriciteit-werk-left').val(addCommas(elektriciteitsprijsWerk,2));
			initElektriciteitWerkRight.setPosition(elektriciteitsprijsWerk*210); $('#input-elektriciteit-werk-right').val(addCommas(elektriciteitsprijsWerk,2));
			initElektriciteitPubliekLeft.setPosition(elektriciteitsprijsPubliek*210); $('#input-elektriciteit-publiek-left').val(addCommas(elektriciteitsprijsPubliek,2));
			initElektriciteitPubliekRight.setPosition(elektriciteitsprijsPubliek*210); $('#input-elektriciteit-publiek-right').val(addCommas(elektriciteitsprijsPubliek,2));
			initElektriciteitOnderwegLeft.setPosition(elektriciteitsprijsOnderweg*210); $('#input-elektriciteit-onderweg-left').val(addCommas(elektriciteitsprijsOnderweg,2));
			initElektriciteitOnderwegRight.setPosition(elektriciteitsprijsOnderweg*210); $('#input-elektriciteit-onderweg-right').val(addCommas(elektriciteitsprijsOnderweg,2));
			initWaterstofLeft.setPosition(waterstofprijs*10.5); $('#input-waterstof-left').val(addCommas(waterstofprijs,2));
			initWaterstofRight.setPosition(waterstofprijs*10.5); $('#input-waterstof-right').val(addCommas(waterstofprijs,2));
			initAardgasLeft.setPosition(aardgasprijs*42); $('#input-aardgas-left').val(addCommas(aardgasprijs,2));
			initAardgasRight.setPosition(aardgasprijs*42); $('#input-aardgas-right').val(addCommas(aardgasprijs,2));
			initBenzineLeft.setPosition(benzineprijs*70); $('#input-benzine-left').val(addCommas(benzineprijs,2));
			initBenzineRight.setPosition(benzineprijs*70); $('#input-benzine-right').val(addCommas(benzineprijs,2));
			initDieselLeft.setPosition(dieselprijs*50); $('#input-diesel-left').val(addCommas(dieselprijs,2));
			initDieselRight.setPosition(dieselprijs*50); $('#input-diesel-right').val(addCommas(dieselprijs,2));
		}
		
		$('.confirmPopover').click(function() { calculateTCO(); });
		
		$('.car-tab').click(function() {
			$('#car-tab-' + segment).toggleClass('active');
			segment = $(this).attr('id').substring(8);
			$(this).toggleClass('active');
			
			// Dropdowns aanpassen
			
			var dropDownLeftHtml = [];
			var dropDownRightHtml = [];
			jQuery.each(filterLeft, function(i, item) { 
				var carList = filterCars(cars,segment,item);
				if (carList.length > 0 ) dropDownLeftHtml.push('<div id="left-' + item + '">' + drivetrainToString(item, 'e') + 'wagens (' + carList.length + ')</div>');
			});
			jQuery.each(filterRight, function(i, item) { 
				var carList = filterCars(cars,segment,item);
				if (carList.length > 0 ) {
					var numberCP = carList.length;
					if (item == 'dies' || item == 'benz') numberCP += 1; // Aantal aanpassen ivm custom car
					dropDownRightHtml.push('<div id="rght-' + item + '">' + drivetrainToString(item, 'e') + 'wagens (' + numberCP + ')</div>');
				}			   
			});
			$('#left-car-switch-dropdown .popover-content').html(dropDownLeftHtml.join(''));
			$('#right-car-switch-dropdown .popover-content').html(dropDownRightHtml.join(''));
			
			// Eén item in dropdown activeren
			if (filterCars(cars,segment,drivetrainLeft).length == 0) { // indien geen resultaten bij actieve drivetrain » eerste aanduiden
				if (filterCars(cars,segment,'ev').length == 0) { // voorkeur voor EV
					drivetrainLeft = $('#left-car-switch-dropdown .popover-content div').first().attr('id').substring(5);
				} else { 
					drivetrainLeft = 'ev';
				}
			}
			if (filterCars(cars,segment,drivetrainRight).length == 0) drivetrainRight = 'benz'; // indien geen resultaten bij actieve drivetrain » reset naar benzine
			
			$('#left-' + drivetrainLeft).addClass('active');
			$('#rght-' + drivetrainRight).addClass('active');
			$('#left-car-switch-term').html(drivetrainToString(drivetrainLeft,'e'));
			$('#rght-car-switch-term').html(drivetrainToString(drivetrainRight,'e'));
			
			// Verander drivetrain in dropdown		
			$('.switch .popover-content div').click(function() {
			   var side = $(this).attr('id').substring(0,4);
			   if (side == 'left') drivetrainLeft = $(this).attr('id').substring(5);
			   if (side == 'rght') drivetrainRight = $(this).attr('id').substring(5);
			   var term = drivetrainToString($(this).attr('id').substring(5),'e'); // Titel wijzigen
			   $('#' + side + '-car-switch-term').html(term);
			   $(this).parent().children().removeClass('active');
			   $(this).addClass('active');
			   fillCarBoxes(side);
			});
			
			fillCarBoxes('both');
			
			$('.car-selector').slideDown();
		});
		
		
		
		// Initialiseren van de car chooser dropdowns
		$('#left-car-switch').click(function() { $('#left-car-switch-dropdown').toggle(); $('#right-car-switch-dropdown').hide(); }); $('#left-car-switch-dropdown').hide(); 
		$('#right-car-switch').click(function() { $('#right-car-switch-dropdown').toggle(); $('#left-car-switch-dropdown').hide(); });$('#right-car-switch-dropdown').hide(); 
		
		// Initialiseren van de popovers
		$('#tco-change-car-left').click(function() { updatePopovers(); $('#tco-change-car-popover-left').toggle(); $('#tco-change-car-popover-right').hide(); });
		$('#tco-change-car-right').click(function() { updatePopovers(); $('#tco-change-car-popover-right').toggle(); $('#tco-change-car-popover-left').hide(); });
		
		// Initialiseren van de tco-secties en tco-boxes
		$('#section2').hide();
		$('#section3').hide();
		$('#section4').hide();

		$('#tco-control-btw-plicht').hide();
		$('#tco-control-gebruiksdoel').hide();
		$('#tco-control-verhoudingprive').hide();
		$('#tco-control-tankkaart').hide();

		// Zichtbaarheid van SELECT boxes in de eerste stap, en invloed op de next knop en menu
		$('#input-entiteit').on('change', function() {
			if ($(this).val() == 'np') {
				$('#tco-control-btw-plicht').hide();
				$('#tco-control-gebruiksdoel').hide();
				$('#tco-control-verhoudingprive').hide();
				$('#btn-go-to-section2').addClass('active');
				$('#navmenu-2').removeClass('disabled');
				$('#navmenu-3').removeClass('disabled');
				initAfstand.setPosition(125); $('#input-afstand').val(addCommas(15000,0));
				distancePY = 15000;
			}
			else { 
				initAfstand.setPosition(250); $('#input-afstand').val(addCommas(30000,0));
				distancePY = 30000;
				$('#term-entity').html($('#input-entiteit option:selected').text());
				$('#tco-control-btw-plicht').slideDown();
				$('#tco-control-gebruiksdoel').slideDown(function() {
					var e = document.getElementById('input-gebruiksdoel');
					if ( e.options[e.selectedIndex].value == 'sel') {
						$('#btn-go-to-section2').removeClass('active');
						$('#navmenu-2').addClass('disabled');
						$('#navmenu-3').addClass('disabled');
					}
  				});
				if ($(this).val() == 'vns') { // BTW-plicht aanpassen voor vennootschappen
					$('#input-btwplicht option:first').text('Ja (standaard)');
					$('#input-btwplicht option:last').text('Nee');
					$('#input-btwplicht').val('y');
				} else {  // BTW-plicht aanpassen voor overheden en vzw's
					$('#input-btwplicht option:first').text('Ja');
					$('#input-btwplicht option:last').text('Nee (standaard)');
					$('#input-btwplicht').val('n');
				} 
				if ( $('#input-gebruiksdoel').val() == 'bw' &&  $('#input-btwplicht').val() == 'y') {
					$('#tco-control-verhoudingprive').slideDown();
				}
			}
			calculateTCO();
		});
		
		$('#input-btwplicht').on('change', function() { 
			if ( $(this).val() == 'y' ) {
				if ( $('#input-gebruiksdoel').val() == 'bw' ) {
					$('#tco-control-verhoudingprive').slideDown();
				} else if ( $('#input-gebruiksdoel').val() == 'pw' ) {
					$('#tco-control-verhoudingprive').hide();
				}
			}
			else { 
				$('#tco-control-verhoudingprive').hide();
			}
			calculateTCO();
		});
		
		$('#input-gebruiksdoel').on('change', function() {
			if	($(this).val() == 'bw') {
				if( $('#input-btwplicht').val() == 'y' ) { 
					$('#tco-control-verhoudingprive').slideDown();
					$('#tco-control-tankkaart').slideDown();
				}
			}
			else { 
				$('#tco-control-verhoudingprive').hide();
				$('#tco-control-tankkaart').hide();
			}
			$('#btn-go-to-section2').addClass('active');
			$('#navmenu-2').removeClass('disabled');
			$('#navmenu-3').removeClass('disabled');
			calculateTCO();
		});

		$('#input-prive-professioneel').on('change', function() { calculateTCO(); });
		$('#input-rijgedrag').on('change', function() { calculateTCO(); });
		$('#input-laadpunt').on('change', function() { calculateTCO(); });

		$('.laadmix-group').on('change', function() { 
			var waarde = $(this).val();
			var totalewaarde = parseInt($('#input-laadmix-thuis').val()) + parseInt($('#input-laadmix-werk').val()) + parseInt($('#input-laadmix-publiek').val()) + parseInt($('#input-laadmix-onderweg').val());
			$('.laadmix-alert').remove();
			if( $.isNumeric(waarde) ) { 
				$(this).val(Math.round(parseInt(waarde)));
				if(waarde < 0 || waarde > 100) { 
					$('#laadmix-group').after('<tr class="laadmix-alert"><td>&nbsp;</td><td colspan="9"><span class="glyphicon glyphicon-alert"></span>Geef een cijfer op van 0 tot 100.</td></tr>');
					$(this).val(0);
				} else { 
					if(totalewaarde > 100 || totalewaarde < 100)
						$('#laadmix-group').after('<tr class="laadmix-alert"><td>&nbsp;</td><td colspan="9"><span class="glyphicon glyphicon-alert"></span>Let op: voor een correcte berekening moet het totaal 100% bedragen.</td></tr>');

				}
			} else { 
				$('#laadmix-group').after('<tr class="laadmix-alert"><td>&nbsp;</td><td colspan="9"><span class="glyphicon glyphicon-alert"></span>Geef een cijfer op van 0 tot 100.</td></tr>');
				$(this).val(0);
			}
			$('#laadmix-total').html(Math.round(parseInt($('#input-laadmix-thuis').val()) + parseInt($('#input-laadmix-werk').val()) + parseInt($('#input-laadmix-publiek').val()) + parseInt($('#input-laadmix-onderweg').val())) + '%');
			calculateTCO();								   
		});

		$('.tco-result-specsheet .title').click(function() {
			$(this).next().slideToggle();
			if( $(this).children().first().hasClass('glyphicon-chevron-down') ) {
				$(this).children().first().removeClass().addClass('glyphicon glyphicon-chevron-up');
			}
			else { 
				$(this).children().first().removeClass().addClass('glyphicon glyphicon-chevron-down');
			}
		});

		$('.busy').click(function() { 
			$(this).slideUp();
		});
		
		$('.car-tooltip').popover({
			placement: 'right',
			html: true
		});
		
		$('#footer-more').click(function() { 
			$('#footer-container-exp').slideToggle();
			$('#footer-container').slideToggle();
		});
		$('#footer-close').click(function() { 
			$('#footer-container-exp').slideToggle();
			$('#footer-container').slideToggle();
		});
		
		// Modal eigen benzine- of dieselwagen samenstellen
		
		$('#modalCustomCar').show();
		
		var inputCustomAankoop = document.querySelector('.input-custom-aankoop');
		var initCustomAankoop = new Powerange(inputCustomAankoop, { decimal: false, callback: changeOutputCustomAankoop, min: 10000, max: 150000, start: 25000, step: 1000 });
		function changeOutputCustomAankoop() { customAankoop = parseFloat(inputCustomAankoop.value); $('#input-custom-aankoop').val(inputCustomAankoop.value); changeCustomCar(); }
		
		var inputCustomVerbruik = document.querySelector('.input-custom-verbruik');
		var initCustomVerbruik = new Powerange(inputCustomVerbruik, { decimal: true, callback: changeOutputCustomVerbruik, min: 3, max: 12, start: 6, step: 0.1 });
		function changeOutputCustomVerbruik() { customVerbruik = parseFloat(inputCustomVerbruik.value); $('#input-custom-verbruik').val(inputCustomVerbruik.value); changeCustomCar(); }
		
		var inputCustomCO2 = document.querySelector('.input-custom-co2');
		var initCustomCO2 = new Powerange(inputCustomCO2, { decimal: false, callback: changeOutputCustomCO2, min: 50, max: 250, start: 110, step: 1 });
		function changeOutputCustomCO2() { customCO2 = parseFloat(inputCustomCO2.value); $('#input-custom-co2').val(inputCustomCO2.value); changeCustomCar(); }
		
		//var inputCustomCC = document.querySelector('.input-custom-cc');
		//var initCustomCC = new Powerange(inputCustomCC, { decimal: false, callback: changeOutputCustomCC, min: 1000, max: 4000, start: 1600, step: 100 });
		//function changeOutputCustomCC() { customCC = parseFloat(inputCustomCC.value); $('#input-custom-cc').val(inputCustomCC.value); changeCustomCar(); }
		
		$('#input-custom-name').change( function() { changeCustomCar() });
		$('#input-emissienorm').change( function() { changeCustomCar() });
		//$('#input-fiscpk').change( function() { changeCustomCar() });
		
		$('#modalCustomCar').hide();
		$('#modalCustomCar').modal({
			show: false			   				   
		});
		
		// Overzicht wagens
		
		$('#voertuig-overzicht').bootstrapTable({
		  pagination: true,
  		  search: true,
		  data: cars,
		  showSearchButton: true,
		  showFullscreen: true,
		  sortable: true,
		  searchOnEnterKey: true,
		  showSearchClearButton: true,
		  visibleSearch: true,
		  undefinedText: 'Niet beschikbaar',
		  paginationPreText: '&lt; Vorige',
		  paginationNextText: 'Volgende &gt;',
		  formatFullscreen: function () {
			  return 'Volledig scherm'
		  },
		  formatColumns: function () {
			  return 'Selecteer kolommen'
		  },
		  formatDetailPagination: function () {
			  return 'Tonen %s rijen'
		  },
		  formatColumnsToggleAll: function () {
			  return 'Alles aan/uit'
		  },
		  formatSearch: function () {
			  return 'Zoeken op merk, model of brandstoftype'
		  },
		  paginationLoop: false,
		  pageSize: 25,
		  showColumnsToggleAll: true,
		  showColumns: true,
		  columns: [{
            title: 'Segment',
            field: 'segment',
			sortable: true,
			align: 'center'
            },{
			title: 'Merk',
            field: 'brand',
			sortable: true
            },{
            title: 'Model',
            field: 'name',
			sortable: true
            },{
            title: 'Versie',
            field: 'v',
			titleTooltip: 'Motorisatie, batterijpakket &amp; uitvoering',
			visible: false,
			searchable: false
            },{
            title: 'Brandstoftype',
            field: 'fuel',
			sortable: true,
			align: 'center'
			},{
            title: 'CO<sub>2</sub>-uitstoot',
            field: 'co2',
			sortable: true,
			titleTooltip: 'g/km',
			searchable: false,
			align: 'center'
			},{
			title: 'CO<sub>2</sub>-uitstoot valse hybride',
            field: 'fakehybrides',
			sortable: true,
			titleTooltip: 'In het geval van een valse hybride, wordt met deze CO<sub>2</sub>-uitstoot gerekend voor de berekening van het voordeel alle aard en de fiscale aftrekbaarheid.',
			searchable: false,
			align: 'center',
			visible: false
			},{
            title: 'Ecoscore',
            field: 'ecoscore',
			sortable: true,
			searchable: false,
			align: 'center'
			},{
			title: 'Elektrisch verbruik',
            field: 'verbrEl',
			sortable: true,
			visible: false,
			titleTooltip: 'kWh/100km',
			searchable: false,
			align: 'center'
			},{
            title: 'Brandstofverbruik',
            field: 'verbrBr',
			sortable: true,
			visible: false,
			titleTooltip: 'L/100km',
			searchable: false,
			align: 'center'
			},{
            title: 'CNG-verbruik',
            field: 'verbrCNG',
			sortable: true,
			visible: false,
			titleTooltip: 'kg/100km',
			searchable: false,
			align: 'center'
			},{
            title: 'Waterstofverbruik',
            field: 'verbrFCEV',
			sortable: true,
			visible: false,
			titleTooltip: 'kg/100km',
			searchable: false,
			align: 'center'
			},{
			title: 'Motorvermogen',
            field: 'power',
			visible: false,
			titleTooltip: 'kW',
			searchable: false,
			align: 'center'
			},{
			title: 'Acceleratie 0-100 km/h',
            field: 'acc',
			visible: false,
			titleTooltip: 's',
			searchable: false,
			align: 'center'
			},{
			title: 'Koffer-inhoud',
            field: 'koffer',
			visible: false,
			titleTooltip: 'L',
			searchable: false,
			align: 'center'			
			},{
			title: 'Batterijcapaciteit',
            field: 'bat',
			sortable: true,
			visible: false,
			titleTooltip: 'kWh',
			searchable: false,
			align: 'center'
			},{
			title: 'Tankinhoud',
            field: 'tank',
			sortable: true,
			visible: false,
			titleTooltip: 'L',
			searchable: false,
			align: 'center'
			},{
			title: 'Tankinhoud CNG',
            field: 'tankcng',
			sortable: true,
			visible: false,
			titleTooltip: 'kg',
			searchable: false,
			align: 'center'
			},{
			title: 'Tankinhoud waterstof',
            field: 'tankfcev',
			sortable: true,
			visible: false,
			titleTooltip: 'kg',
			searchable: false,
			align: 'center'
			},{
            title: 'Testcyclus',
            field: 'testcyclus',
			sortable: true,
			visible: false,
			searchable: false,
			align: 'center'
			},{
            title: 'Fiscale PK',
            field: 'pk',
			sortable: true,
			visible: false,
			searchable: false,
			align: 'center'
			},{
			title: 'Cataloguswaarde [&euro;]',
            field: 'price',
			sortable: true,
			searchable: false,
			titleTooltip: 'Inclusief BTW, zonder opties, zonder korting',
			align: 'right'
          }]
		});		
		
		$('.search-input').on("input", function(){
        	$("[name='search']").trigger( "click" );
    	});;
    });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	