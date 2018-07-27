// JavaScript Document

// TCO Tool variables //


var scrollLimit = 10000;
var tcoReady = false;

var master;
var segment = '';
var drivetrainLeft = 'ev';
var drivetrainRight = 'benz';

var entiteit = '';
var btwplicht = 'n';
var gebruiksdoel = 'bw';

var vennootschapsbelasting = 0.3399; // 33,99% vennnootschapsbelasting
var benzineprijs = 1.416; // in €/L incl btw
var dieselprijs = 1.315; // in €/L incl btw
var elektriciteitsprijs = 0.28; // in €/kWh incl btw
var aardgasprijs = 0.99; // in €/kg incl btw
var inflatie = 0.0203;
var inflatieFactor = 1;

var distancePY = 30000; // in km per year
var oldDistancePY = 0;
var duration = 5; //in years
var oldDuration = 0;
var rijgedrag = 1.42;
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
var customFuel = 'benz';

var filterLeft = ['cng','ev','phev'];
var filterRight = ['cng','benz','dies','ev','phev'];

var nB = '?';
var nvt = 'n.v.t.';

var kangooZELease = new blc([0,73],[10000,76],[15000,90],[20000,106],[25000,126]); // BELANGRIJK: INCLUSIEF BTW!!!!!
var zoeZELease = new blc([0,49],[5000,79],[12500,86],[15000,94],[17500,102],[20000,122],[30000,142]); // BELANGRIJK: INCLUSIEF BTW!!!!!
var smartLease = new blc([0,65]);
var leafLease = new blc([0,79],[10000,86],[15000,102],[20000,122],[25000,122]);
var evaliaLease = new blc([0,73],[10000,76],[15000,90],[20000,106],[25000,106]);

var cars = [ // PRIJZEN INCLUSIEF BTW // 0 betekent niet van toepassing // undefined of '' betekent niet beschikbaar // bonus toevoegen
	{ 'segment': 'C', 'id': 'BMW-1', 'brand': 'BMW', 'name': '1', 'v': 'Hatch 118i (100 kW) (5d) 136pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'co2': 123, 'power': 100, 'acc': 8.5, 'koffer': 360, 'cilinder': 1499, 'bat': 0, 'tank': 52, 'tankcng': 0, 'ecoscore': 72, 'price': 25800, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'E', 'id': 'BMW-6', 'brand': 'BMW', 'name': '6', 'v': 'Coupe 640i (235kW) (2d) 320pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'co2': 172, 'power': 235, 'acc': 5.3, 'koffer': 460, 'cilinder': 2979, 'bat': 0, 'tank': 70, 'tankcng': 0, 'ecoscore': 60, 'price': 86780, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'F', 'id': 'BMW-7', 'brand': 'BMW', 'name': '7', 'v': 'Berline 740i (240 kW) (4d) 326pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'co2': 159, 'power': 240, 'acc': 5.5, 'koffer': 500, 'cilinder': 2998, 'bat': 0, 'tank': 78, 'tankcng': 0, 'ecoscore': 65, 'price': 94600, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'A', 'id': 'Fiat-500', 'brand': 'FIAT', 'name': '500', 'v': '1.2 8v 51kW Pop Star (3d) 69pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'co2': 115, 'power': 51, 'acc': 12.9, 'koffer': 185, 'cilinder': 1242, 'bat': 0, 'tank': 35, 'tankcng': 0, 'ecoscore': 73, 'price': 14090, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'MPV-Mid', 'id': 'Ford-C-Max', 'brand': 'Ford', 'name': 'Focus C-Max', 'v': '1.0i EcoBoost 92kW S/S Trend (5d) 125pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'co2': 117, 'power': 92, 'acc': 11.4, 'koffer': 471, 'cilinder': 998, 'bat': 0, 'tank': 55, 'tankcng': 0, 'ecoscore': 71, 'price': 21750, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'Ford-Fiesta', 'brand': 'Ford', 'name': 'Fiesta', 'v': '1.0i EcoBoost 74kW Powershift Trend (5d) 100pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'co2': 114, 'power': 74, 'acc': 10.8, 'koffer': 290, 'cilinder': 999, 'bat': 0, 'tank': 42, 'tankcng': 0, 'ecoscore': 72, 'price': 18200, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'C', 'id': 'Ford-Focus', 'brand': 'Ford', 'name': 'Focus', 'v': '1.0i EcoB. 74kW S/S Trend (5d) 100pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'co2': 99, 'power': 74, 'acc': 12.5, 'koffer': 363, 'cilinder': 998, 'bat': 0, 'tank': 55, 'tankcng': 0, 'ecoscore': 72, 'price': 19900, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'SUV-D', 'id': 'Honda-CRV', 'brand': 'Honda', 'name': 'CR-V', 'v': '2.0i i-VTEC 4x4 Aut. Elegance (5d) 155pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'co2': 175, 'power': 114, 'acc': 12.3, 'koffer': 589, 'cilinder': 1997, 'bat': 0, 'tank': 58, 'tankcng': 0, 'ecoscore': 63, 'price': 33940, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'Lexus-GS', 'brand': 'Lexus', 'name': 'GS', 'v': '300h Business Edition (4d) 223pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'co2': 104, 'power': 133, 'acc': 9, 'koffer': 482, 'cilinder': 2494, 'bat': 0, 'tank': 66, 'tankcng': 0, 'ecoscore': 75, 'price': 46240, 'bonus': 0, 'pk': 13, 'image': true },
{ 'segment': 'F', 'id': 'Lexus-LS', 'brand': 'Lexus', 'name': 'LS', 'v': '600h F Sport Line (4d) 445pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 8.6, 'verbrCNG': 0, 'co2': 199, 'power': 327, 'acc': 6.1, 'koffer': 465, 'cilinder': 4969, 'bat': 0, 'tank': 84, 'tankcng': 0, 'ecoscore': 59, 'price': 126300, 'bonus': 0, 'pk': 25, 'image': true },
{ 'segment': 'F', 'id': 'Mercedes-S-class', 'brand': 'Mercedes-Benz', 'name': 'S-klasse', 'v': 'S-Klasse S 500 (4d) 455pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 8.4, 'verbrCNG': 0, 'co2': 196, 'power': 335, 'acc': 4.8, 'koffer': 530, 'cilinder': 4663, 'bat': 0, 'tank': 80, 'tankcng': 0, 'ecoscore': 59, 'price': 111562, 'bonus': 0, 'pk': 23, 'image': true },
{ 'segment': 'SUV-E', 'id': 'Porsche-cayenne', 'brand': 'Porsche', 'name': 'Cayenne', 'v': '3.6 S (5d) 420pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 9.5, 'verbrCNG': 0, 'co2': 223, 'power': 309, 'acc': 5.5, 'koffer': 670, 'cilinder': 3604, 'bat': 0, 'tank': 85, 'tankcng': 0, 'ecoscore': 56, 'price': 87241, 'bonus': 0, 'pk': 18, 'image': true },
{ 'segment': 'F', 'id': 'Porsche-Panamera', 'brand': 'Porsche', 'name': 'Panamera', 'v': '2.9 4S (5d) 440pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'co2': 184, 'power': 324, 'acc': 4.4, 'koffer': 495, 'cilinder': 2894, 'bat': 0, 'tank': 75, 'tankcng': 0, 'ecoscore': 58, 'price': 116523, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'A', 'id': 'Smart-Fortwo', 'brand': 'smart', 'name': 'Fortwo', 'v': '0.9 66kW Coupé Prime (3d) 90pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'co2': 97, 'power': 66, 'acc': 10.4, 'koffer': 260, 'cilinder': 898, 'bat': 0, 'tank': 28, 'tankcng': 0, 'ecoscore': 76, 'price': 14258, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'D', 'id': 'Toyota-prius', 'brand': 'Toyota', 'name': 'Prius', 'v': '1.8 VVT-i Hybrid Business (5d) 122pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3, 'verbrCNG': 0, 'co2': 70, 'power': 90, 'acc': 10.6, 'koffer': 502, 'cilinder': 1798, 'bat': 0, 'tank': 45, 'tankcng': 0, 'ecoscore': 77, 'price': 31580, 'bonus': 0, 'pk': 10, 'image': true },
{ 'segment': 'B', 'id': 'Toyota-yaris', 'brand': 'Toyota', 'name': 'Yaris', 'v': '1.5 VVT-i HYbrid Comfort (5d) 100pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3.3, 'verbrCNG': 0, 'co2': 75, 'power': 74, 'acc': 11.8, 'koffer': 286, 'cilinder': 1497, 'bat': 0, 'tank': 36, 'tankcng': 0, 'ecoscore': 80, 'price': 20225, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'D', 'id': 'Volvo-V60', 'brand': 'Volvo', 'name': 'V60', 'v': 'T3 Geartronic Momentum (5d) 152pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'co2': 138, 'power': 112, 'acc': 8.7, 'koffer': 430, 'cilinder': 1498, 'bat': 0, 'tank': 68, 'tankcng': 0, 'ecoscore': 68, 'price': 37790, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-D', 'id': 'Volvo-xc60', 'brand': 'Volvo', 'name': 'XC60', 'v': 'T5 Geartronic Momentum (5d) 245pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'co2': 157, 'power': 180, 'acc': 7.2, 'koffer': 495, 'cilinder': 1969, 'bat': 0, 'tank': 70, 'tankcng': 0, 'ecoscore': 65, 'price': 46680, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-E', 'id': 'Volvo-XC70', 'brand': 'Volvo', 'name': 'XC90', 'v': 'T5 4WD Geartronic Momentum 7PL. (5d) 254pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'co2': 176, 'power': 187, 'acc': 8.2, 'koffer': 314, 'cilinder': 1969, 'bat': 0, 'tank': 71, 'tankcng': 0, 'ecoscore': 63, 'price': 63750, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'VW-golf', 'brand': 'Volkswagen', 'name': 'Golf', 'v': '1.4 TSi 92kW DSG BMT Trendline (5d) 125pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'co2': 116, 'power': 92, 'acc': 9.1, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 71, 'price': 24090, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'D', 'id': 'VW-Passat', 'brand': 'Volkswagen', 'name': 'Passat', 'v': '1.4 TSI ACT Highline DSG-7 (4d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'co2': 117, 'power': 110, 'acc': 8.4, 'koffer': 586, 'cilinder': 1395, 'bat': 0, 'tank': 66, 'tankcng': 0, 'ecoscore': 72, 'price': 35470, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'x-audi-a1', 'brand': 'Audi', 'name': 'A1', 'v': '1.0 TFSI ultra 70kW Design (3d) 95pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'co2': 97, 'power': 70, 'acc': 10.9, 'koffer': 270, 'cilinder': 999, 'bat': 0, 'tank': 45, 'tankcng': 0, 'ecoscore': 76, 'price': 18550, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'K', 'id': 'x-citroen-berlingo', 'brand': 'Citro&euml;n', 'name': 'Berlingo', 'v': '1.6 VTi 95 MAN Feel Edition (5d) 97pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'co2': 148, 'power': 72, 'acc': 12.8, 'koffer': 544, 'cilinder': 1598, 'bat': 0, 'tank': 60, 'tankcng': 0, 'ecoscore': 66, 'price': 19660, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'A', 'id': 'x-citroen-c1', 'brand': 'Citro&euml;n', 'name': 'C1', 'v': '1.0 VTi ETG Shine (5d) 69pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'co2': 97, 'power': 50, 'acc': 14.6, 'koffer': 196, 'cilinder': 998, 'bat': 0, 'tank': 35, 'tankcng': 0, 'ecoscore': 76, 'price': 14450, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'B', 'id': 'x-citroen-c3', 'brand': 'Citro&euml;n', 'name': 'C3', 'v': '1.2 PureTech 82 S&S ETG Seduction (5d) 82pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'co2': 97, 'power': 60, 'acc': 14.4, 'koffer': 300, 'cilinder': 1199, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 74, 'price': 16545, 'bonus': 0, 'pk': 7, 'image': false },
{ 'segment': 'B', 'id': 'x-dacia-sandero', 'brand': 'Dacia', 'name': 'Sandero', 'v': '1.2 16v Ambiance (5d) 73pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'co2': 130, 'power': 54, 'acc': 14.5, 'koffer': 320, 'cilinder': 1149, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 70, 'price': 8700, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'K', 'id': 'x-fiat-doblo', 'brand': 'FIAT', 'name': 'Doblo', 'v': '1.4 T-Jet Street (5d) 120pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'co2': 169, 'power': 88, 'acc': 12.3, 'koffer': 790, 'cilinder': 1368, 'bat': 0, 'tank': 60, 'tankcng': 0, 'ecoscore': 64, 'price': 17990, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'MPV-Comp', 'id': 'x-ford-b-max', 'brand': 'Ford', 'name': 'B-Max', 'v': '1.0i EcoBoost 74kW S/S Trend (5d) 100pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'co2': 114, 'power': 74, 'acc': 13.2, 'koffer': 318, 'cilinder': 998, 'bat': 0, 'tank': 48, 'tankcng': 0, 'ecoscore': 72, 'price': 18000, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'A', 'id': 'x-hyundai-i10', 'brand': 'Hyundai', 'name': 'i10', 'v': '1.0 Blue Drive (5d) 67pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'co2': 98, 'power': 49, 'acc': 15.1, 'koffer': 252, 'cilinder': 998, 'bat': 0, 'tank': 40, 'tankcng': 0, 'ecoscore': 72, 'price': 12549, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'C', 'id': 'x-mercedes-a', 'brand': 'Mercedes-Benz', 'name': 'A-klasse', 'v': 'A 180 BlueEFFICIENCY Style Edition (5d) 122pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'co2': 120, 'power': 90, 'acc': 8.9, 'koffer': 341, 'cilinder': 1595, 'bat': 0, 'tank': 40, 'tankcng': 0, 'ecoscore': 72, 'price': 27528, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'MPV-Comp', 'id': 'x-nissan-note', 'brand': 'Nissan', 'name': 'Note', 'v': 'DIG-S 98 Acenta CVT (5d) 98pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'co2': 119, 'power': 72, 'acc': 12.6, 'koffer': 411, 'cilinder': 1198, 'bat': 0, 'tank': 41, 'tankcng': 0, 'ecoscore': 72, 'price': 18840, 'bonus': 0, 'pk': 7, 'image': false },
{ 'segment': 'A', 'id': 'x-opel-karl', 'brand': 'Opel', 'name': 'Karl', 'v': '1.0 ecoFLEX S/S Enjoy (5d) 75pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'co2': 99, 'power': 55, 'acc': 13.9, 'koffer': 195, 'cilinder': 999, 'bat': 0, 'tank': 32, 'tankcng': 0, 'ecoscore': 76, 'price': 11800, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'A', 'id': 'x-peugeot-108', 'brand': 'Peugeot', 'name': '108', 'v': '1.0 Active s/s (5d) 69pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'co2': 88, 'power': 51, 'acc': 13, 'koffer': 196, 'cilinder': 998, 'bat': 0, 'tank': 35, 'tankcng': 0, 'ecoscore': 78, 'price': 12445, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'B', 'id': 'x-peugeot-208', 'brand': 'Peugeot', 'name': '208', 'v': '1.2 PureTech 60kW BMP s/s Active (5d) 82pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'co2': 97, 'power': 60, 'acc': 14.5, 'koffer': 311, 'cilinder': 1199, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 75, 'price': 17775, 'bonus': 0, 'pk': 7, 'image': false },
{ 'segment': 'MPV-Mid', 'id': 'x-peugeot-3008', 'brand': 'Peugeot', 'name': '3008', 'v': '2.0 BlueHDi 110kW S&S GT Line (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'co2': 114, 'power': 110, 'acc': 9.6, 'koffer': 520, 'cilinder': 1997, 'bat': 0, 'tank': 53, 'tankcng': 0, 'ecoscore': 64, 'price': 36300, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'D', 'id': 'x-peugeot-508', 'brand': 'Peugeot', 'name': '508', 'v': '1.6 121kW S/S Auto Allure (4d) 165pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'co2': 134, 'power': 121, 'acc': 9.7, 'koffer': 515, 'cilinder': 1598, 'bat': 0, 'tank': 72, 'tankcng': 0, 'ecoscore': 69, 'price': 34160, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'B', 'id': 'x-renault-clio', 'brand': 'Renault', 'name': 'Clio', 'v': 'Energy TCe 120 EDC Limited (5d) 118pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'co2': 120, 'power': 87, 'acc': 9.2, 'koffer': 300, 'cilinder': 1197, 'bat': 0, 'tank': 45, 'tankcng': 0, 'ecoscore': 71, 'price': 19350, 'bonus': 0, 'pk': 7, 'image': false },
{ 'segment': 'MPV-Mid', 'id': 'x-renault-scenic', 'brand': 'Renault', 'name': 'Sc&eacute;nic', 'v': 'Energy TCe 115 Zen (5d) 116pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'co2': 129, 'power': 85, 'acc': 12.3, 'koffer': 437, 'cilinder': 1197, 'bat': 0, 'tank': 52, 'tankcng': 0, 'ecoscore': 70, 'price': 23100, 'bonus': 0, 'pk': 7, 'image': false },
{ 'segment': 'A', 'id': 'x-renault-twingo', 'brand': 'Renault', 'name': 'Twingo', 'v': '1.0 SCe 70 S&S Life (5d) 71pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'co2': 95, 'power': 52, 'acc': 14.5, 'koffer': 219, 'cilinder': 999, 'bat': 0, 'tank': 35, 'tankcng': 0, 'ecoscore': 75, 'price': 10150, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'C', 'id': 'x-toyota-auris', 'brand': 'Toyota', 'name': 'Auris', 'v': '1.8 VVT-i Hybrid CVT Comfort (5d) 136pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3.6, 'verbrCNG': 0, 'co2': 82, 'power': 73, 'acc': 10.9, 'koffer': 360, 'cilinder': 1798, 'bat': 0, 'tank': 45, 'tankcng': 0, 'ecoscore': 79, 'price': 25860, 'bonus': 0, 'pk': 10, 'image': false },
{ 'segment': 'A', 'id': 'x-toyota-aygo', 'brand': 'Toyota', 'name': 'Aygo', 'v': '1.0 VVT-i x-play (5d) 69pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'co2': 95, 'power': 51, 'acc': 14.2, 'koffer': 168, 'cilinder': 998, 'bat': 0, 'tank': 35, 'tankcng': 0, 'ecoscore': 77, 'price': 11990, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'C', 'id': 'x-volvo-v40', 'brand': 'Volvo', 'name': 'V40', 'v': 'T2 Eco Geartronic Kinetic (5d) 122pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'co2': 125, 'power': 90, 'acc': 9.8, 'koffer': 335, 'cilinder': 1498, 'bat': 0, 'tank': 62, 'tankcng': 0, 'ecoscore': 71, 'price': 26600, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'MPV-Mid', 'id': 'x-vw-touran', 'brand': 'Volkswagen', 'name': 'Touran', 'v': '1.4 TSi 110kW DSG-7 BMT Trendline (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'co2': 126, 'power': 110, 'acc': 8.9, 'koffer': 834, 'cilinder': 1395, 'bat': 0, 'tank': 58, 'tankcng': 0, 'ecoscore': 71, 'price': 28440, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'A', 'id': 'x-vw-up', 'brand': 'Volkswagen', 'name': 'Up!', 'v': '1.0 MPi 55kW BMT ASG Move up! (5d) 75pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'co2': 97, 'power': 55, 'acc': 13.2, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 35, 'tankcng': 0, 'ecoscore': 76, 'price': 13651, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'C', 'id': 'Audi-A3-Gtron-Temp', 'brand': 'Audi', 'name': 'A3 g-tron', 'v': 'Sportback 1.4 TFSi 81kW g-tron Attraction (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 2.8, 'co2': 92, 'power': 81, 'acc': 10.8, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 11, 'ecoscore': 81, 'price': 25850, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'Fiat-500L', 'brand': 'FIAT', 'name': '500L', 'v': 'CNG NATURAL POWER Pop Star (5d) 80pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 3.9, 'co2': 105, 'power': 59, 'acc': 15.7, 'koffer': 400, 'cilinder': 875, 'bat': 0, 'tank': 50, 'tankcng': 14, 'ecoscore': 78, 'price': 20700, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'Fiat-500L-temp', 'brand': 'FIAT', 'name': '500L Living', 'v': 'Twinair/CNG 59kW Pop Star (5d) 80pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 3.9, 'co2': 105, 'power': 59, 'acc': 15.7, 'koffer': 638, 'cilinder': 875, 'bat': 0, 'tank': 50, 'tankcng': 14, 'ecoscore': 78, 'price': 21000, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'C', 'id': 'Mercedes-B-cng-temp', 'brand': 'Mercedes-Benz', 'name': 'B 200 NGT', 'v': 'B-Klasse B 200 c (5d) 156pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 4.4, 'co2': 115, 'power': 115, 'acc': 9.2, 'koffer': 488, 'cilinder': 1991, 'bat': 0, 'tank': 12, 'tankcng': 21, 'ecoscore': 77, 'price': 33033, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'Mercedes-E-cng-temp', 'brand': 'Mercedes-Benz', 'name': 'E 200 NGT', 'v': 'Berline E 200 Natural Gas Drive Avantgarde (4d) 156pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 4.4, 'co2': 118, 'power': 115, 'acc': 10.4, 'koffer': 540, 'cilinder': 1991, 'bat': 0, 'tank': 59, 'tankcng': 20, 'ecoscore': 77, 'price': 51812, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'VW-golf-tgi-temp', 'brand': 'Volkswagen', 'name': 'Golf TGI', 'v': '1.4 TGi BlueMotion Trendline DSG (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 3.6, 'co2': 92, 'power': 81, 'acc': 10.6, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 15, 'ecoscore': 81, 'price': 26630, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'x-fiat-doblo-cng', 'brand': 'FIAT', 'name': 'Doblo', 'v': '1.4 T-Jet CNG Lounge Natural Power (5d) 120pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 4.9, 'co2': 134, 'power': 88, 'acc': 12.7, 'koffer': 790, 'cilinder': 1368, 'bat': 0, 'tank': 22, 'tankcng': 16, 'ecoscore': 75, 'price': 23050, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'A', 'id': 'x-fiat-panda-cng', 'brand': 'FIAT', 'name': 'Panda', 'v': '0.9 Twinair 59kW CNG Street (5d) 80pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 3.1, 'co2': 85, 'power': 59, 'acc': 12.8, 'koffer': 200, 'cilinder': 875, 'bat': 0, 'tank': 35, 'tankcng': 12, 'ecoscore': 81, 'price': 14540, 'bonus': 0, 'pk': 5, 'image': false },
{ 'segment': 'B', 'id': 'x-fiat-punto-cng', 'brand': 'FIAT', 'name': 'Punto', 'v': '1.4 51kW CNG Street (5d) 70pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 4.2, 'co2': 115, 'power': 51, 'acc': 16.9, 'koffer': 200, 'cilinder': 1368, 'bat': 0, 'tank': 45, 'tankcng': 13, 'ecoscore': 77, 'price': 17810, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'K', 'id': 'x-fiat-qubo-cng', 'brand': 'FIAT', 'name': 'Qubo', 'v': '1.4 Lounge CNG Natural Power (5d) 70pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 4.2, 'co2': 119, 'power': 51, 'acc': 17.7, 'koffer': 275, 'cilinder': 1368, 'bat': 0, 'tank': 45, 'tankcng': 13, 'ecoscore': 76, 'price': 18175, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'B', 'id': 'x-lancia-ypsilon-cng', 'brand': 'Lancia', 'name': 'Ypsilon', 'v': '0.9 TwinAir 59kW CNG Gold (5d) 80pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 4, 'co2': 86, 'power': 59, 'acc': 13.1, 'koffer': 202, 'cilinder': 875, 'bat': 0, 'tank': 40, 'tankcng': 12, 'ecoscore': 81, 'price': 17390, 'bonus': 0, 'pk': 5, 'image': false },
{ 'segment': 'MPV-Mid', 'id': 'x-opel-zafira-cng', 'brand': 'Opel', 'name': 'Zafira Tourer 1.6 Turbo CNG', 'v': '1.6 Turbo CNG ecoFLEX Cosmo (5d) 150pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 9.4, 'verbrCNG': 5, 'co2': 136, 'power': 110, 'acc': 11.5, 'koffer': 710, 'cilinder': 1598, 'bat': 0, 'tank': 14, 'tankcng': 25, 'ecoscore': 0, 'price': 29200, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'C', 'id': 'x-seat-leon-cng', 'brand': 'Seat', 'name': 'Leon TGI', 'v': '1.4 TGI 81kW Reference (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 4.5, 'co2': 96, 'power': 81, 'acc': 10.9, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 17, 'ecoscore': 80, 'price': 21590, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'A', 'id': 'x-seat-mii-cng', 'brand': 'Seat', 'name': 'Mii', 'v': '1.0 50kW CNG Style (5d) 68pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 2.9, 'co2': 79, 'power': 50, 'acc': 16.3, 'koffer': 213, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 11, 'ecoscore': 83, 'price': 13650, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'D', 'id': 'x-skoda-octavia-cng', 'brand': '&Scaron;koda', 'name': 'Octavia', 'v': '1.4 TSi CNG 81kW G-Tec Ambition (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 3.7, 'co2': 94, 'power': 81, 'acc': 10.9, 'koffer': 460, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 15, 'ecoscore': 80, 'price': 25890, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'D', 'id': 'x-volvo-v60-cng', 'brand': 'Volvo', 'name': 'V60', 'v': 'T5 Bi-Fuel Geartronic Summum (5d) 245pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 4.3, 'co2': 116, 'power': 180, 'acc': 6.4, 'koffer': 310, 'cilinder': 1969, 'bat': 0, 'tank': 68, 'tankcng': 16, 'ecoscore': 75, 'price': 49350, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'K', 'id': 'x-vw-caddy-maxi-cng', 'brand': 'Volkswagen', 'name': 'Caddy Maxi CNG', 'v': '1.4 TGi 81KW BMT Maxi Trendline (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 4.3, 'co2': 116, 'power': 81, 'acc': 13.7, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 13, 'tankcng': 37, 'ecoscore': 77, 'price': 22780, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'A', 'id': 'x-vw-eco-up-cng', 'brand': 'Volkswagen', 'name': 'eco-Up', 'v': '1.0 MPi 50kW CNG BMT ECO-up! (5d) 68pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 2.9, 'co2': 82, 'power': 50, 'acc': 16.3, 'koffer': 213, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 11, 'ecoscore': 83, 'price': 14310, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'C', 'id': 'x-vw-golf-variant-cng', 'brand': 'Volkswagen', 'name': 'Golf Variant TGI', 'v': '1.4 TGi 81kW Trendline DSG (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 3.7, 'co2': 94, 'power': 81, 'acc': 10.9, 'koffer': 605, 'cilinder': 1395, 'bat': 0, 'tank': 51, 'tankcng': 16, 'ecoscore': 80, 'price': 27530, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'C', 'id': 'Audi-A3', 'brand': 'Audi', 'name': 'A3', 'v': 'Sportback (Nieuw model) 1.6 TDi 81kW S tronic (5d) 110pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'co2': 99, 'power': 81, 'acc': 10.7, 'koffer': 380, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 66, 'price': 27090, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'D', 'id': 'Audi-A4', 'brand': 'Audi', 'name': 'A4', 'v': '2.0 TDi 100kW S tronic Design (4d) 136pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'co2': 106, 'power': 100, 'acc': 9.1, 'koffer': 480, 'cilinder': 1968, 'bat': 0, 'tank': 40, 'tankcng': 0, 'ecoscore': 65, 'price': 37860, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'Audi-A6', 'brand': 'Audi', 'name': 'A6', 'v': '2.0 TDI Ultra 140kW (4d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'co2': 114, 'power': 140, 'acc': 8.4, 'koffer': 530, 'cilinder': 1968, 'bat': 0, 'tank': 73, 'tankcng': 0, 'ecoscore': 64, 'price': 42480, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'F', 'id': 'Audi-A8', 'brand': 'Audi', 'name': 'A8', 'v': '3.0 TDi 193kW Tip8 quattro LWB (4d) 262pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'co2': 155, 'power': 193, 'acc': 6.1, 'koffer': 490, 'cilinder': 2967, 'bat': 0, 'tank': 82, 'tankcng': 0, 'ecoscore': 59, 'price': 83925, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'SUV-D', 'id': 'Audi-Q5', 'brand': 'Audi', 'name': 'Q5', 'v': '2.0 TDi 140kW S tronic (5d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'co2': 126, 'power': 140, 'acc': 8.7, 'koffer': 540, 'cilinder': 1968, 'bat': 0, 'tank': 75, 'tankcng': 0, 'ecoscore': 62, 'price': 42880, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-F', 'id': 'Audi-Q7', 'brand': 'Audi', 'name': 'Q7', 'v': '3.0 TDI 200kW Tiptr. quattro (5d) 272pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'co2': 149, 'power': 200, 'acc': 6.3, 'koffer': 890, 'cilinder': 2967, 'bat': 0, 'tank': 75, 'tankcng': 0, 'ecoscore': 59, 'price': 63340, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'D', 'id': 'BMW-3', 'brand': 'BMW', 'name': '3', 'v': 'Touring 320d Efficientdynamics Edition (120 kW) (5d) 163pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'co2': 107, 'power': 120, 'acc': 8.2, 'koffer': 495, 'cilinder': 1995, 'bat': 0, 'tank': 57, 'tankcng': 0, 'ecoscore': 64, 'price': 38550, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'BMW-5', 'brand': 'BMW', 'name': '5', 'v': 'Berline 520d xDrive (140 kW) (4d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'co2': 119, 'power': 140, 'acc': 7.9, 'koffer': 520, 'cilinder': 1995, 'bat': 0, 'tank': 70, 'tankcng': 0, 'ecoscore': 63, 'price': 48650, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-D', 'id': 'BMW-X3', 'brand': 'BMW', 'name': 'X3', 'v': 'sDrive18d (110 kW) (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'co2': 130, 'power': 110, 'acc': 9.5, 'koffer': 550, 'cilinder': 1995, 'bat': 0, 'tank': 67, 'tankcng': 0, 'ecoscore': 62, 'price': 39550, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-E', 'id': 'BMW-X5', 'brand': 'BMW', 'name': 'X5', 'v': 'xDrive25d (155 kW) (5d) 211pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'co2': 146, 'power': 155, 'acc': 7.7, 'koffer': 650, 'cilinder': 1995, 'bat': 0, 'tank': 85, 'tankcng': 0, 'ecoscore': 60, 'price': 59250, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-F', 'id': 'BMW-X6', 'brand': 'BMW', 'name': 'X6', 'v': 'xDrive30d (190kW) (5d) 258pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'co2': 157, 'power': 190, 'acc': 6.7, 'koffer': 580, 'cilinder': 2993, 'bat': 0, 'tank': 85, 'tankcng': 0, 'ecoscore': 58, 'price': 68750, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'E', 'id': 'Jaguar-XF', 'brand': 'Jaguar', 'name': 'XF', 'v': '2.0D 132KW Aut. Prestige (4d) 180pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'co2': 114, 'power': 132, 'acc': 8.1, 'koffer': 540, 'cilinder': 1999, 'bat': 0, 'tank': 66, 'tankcng': 0, 'ecoscore': 64, 'price': 48225, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-E', 'id': 'Kia-sorento', 'brand': 'KIA', 'name': 'Sorento', 'v': 'Fusion 2.2 CRDi AWD Auto 7pl ISG (5d) 200pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'co2': 177, 'power': 147, 'acc': 9.6, 'koffer': 660, 'cilinder': 2199, 'bat': 0, 'tank': 71, 'tankcng': 0, 'ecoscore': 56, 'price': 40790, 'bonus': 0, 'pk': 12, 'image': true },
{ 'segment': 'C', 'id': 'Mercedes-B-temp', 'brand': 'Mercedes-Benz', 'name': 'B-klasse', 'v': 'B 180 d BlueEFFICIENCY Style Edition (5d) 109pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.6, 'verbrCNG': 0, 'co2': 94, 'power': 80, 'acc': 11.6, 'koffer': 488, 'cilinder': 1461, 'bat': 0, 'tank': 40, 'tankcng': 0, 'ecoscore': 66, 'price': 30710, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'E', 'id': 'Mercedes-E-class', 'brand': 'Mercedes-Benz', 'name': 'E-klasse', 'v': 'Berline E 220 d 120kW Avantgarde (4d) 163pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'co2': 102, 'power': 120, 'acc': 7.9, 'koffer': 540, 'cilinder': 1950, 'bat': 0, 'tank': 25, 'tankcng': 0, 'ecoscore': 65, 'price': 50892, 'bonus': 0, 'pk': 10, 'image': true },
{ 'segment': 'B', 'id': 'Mini', 'brand': 'MINI', 'name': 'MINI', 'v': '5 door One D (5d) 95pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.5, 'verbrCNG': 0, 'co2': 92, 'power': 70, 'acc': 11.4, 'koffer': 278, 'cilinder': 1496, 'bat': 0, 'tank': 44, 'tankcng': 0, 'ecoscore': 67, 'price': 20210, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-D', 'id': 'Mitubischi-outlander', 'brand': 'Mitsubishi', 'name': 'Outlander', 'v': '2.2 Di-D diesel 6MT 2WD 7pl. Intense Pr. (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'co2': 134, 'power': 110, 'acc': 10.3, 'koffer': 124, 'cilinder': 2268, 'bat': 0, 'tank': 63, 'tankcng': 0, 'ecoscore': 61, 'price': 33940, 'bonus': 0, 'pk': 12, 'image': true },
{ 'segment': 'SUV-D', 'id': 'Porsche-Macan', 'brand': 'Porsche', 'name': 'Macan', 'v': '3.0 S Diesel (155 kW) (5d) 211pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'co2': 164, 'power': 155, 'acc': 6.3, 'koffer': 500, 'cilinder': 2967, 'bat': 0, 'tank': 60, 'tankcng': 0, 'ecoscore': 58, 'price': 63041, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'SUV-E', 'id': 'VW-touareg', 'brand': 'Volkswagen', 'name': 'Touareg', 'v': '3.0L V6 TDI 193kW BMT (5d) 262pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'co2': 174, 'power': 193, 'acc': 7.3, 'koffer': 697, 'cilinder': 2967, 'bat': 0, 'tank': 85, 'tankcng': 0, 'ecoscore': 57, 'price': 60270, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'x-citroen-c3-picasso', 'brand': 'Citro&euml;n', 'name': 'C3 Picasso', 'v': '1.6 BlueHDi 100 MAN Business GPS (5d) 99pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'co2': 101, 'power': 73, 'acc': 12.1, 'koffer': 500, 'cilinder': 1560, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 65, 'price': 16335, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'C', 'id': 'x-citroen-c4', 'brand': 'Citro&euml;n', 'name': 'C4', 'v': '1.6 e-HDi 115 MAN6 Business GPS (5d) 114pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'co2': 97, 'power': 84, 'acc': 11.2, 'koffer': 380, 'cilinder': 1590, 'bat': 0, 'tank': 60, 'tankcng': 0, 'ecoscore': 66, 'price': 19239, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'MPV-Mid', 'id': 'x-citroen-c4-picasso', 'brand': 'Citro&euml;n', 'name': 'C4 Picasso', 'v': '1.6 BlueHDi 115 S&S MAN6 Business GPS (5d) 115pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.7, 'verbrCNG': 0, 'co2': 94, 'power': 85, 'acc': 11.7, 'koffer': 537, 'cilinder': 1560, 'bat': 0, 'tank': 55, 'tankcng': 0, 'ecoscore': 66, 'price': 22143, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'D', 'id': 'x-citroen-c5', 'brand': 'Citro&euml;n', 'name': 'C5', 'v': '1.6 e-HDi 115 EGMV6 Bus. GPS (4d) 114pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'co2': 111, 'power': 84, 'acc': 14.3, 'koffer': 439, 'cilinder': 1560, 'bat': 0, 'tank': 71, 'tankcng': 0, 'ecoscore': 64, 'price': 23595, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'B', 'id': 'x-hyundai-i20', 'brand': 'Hyundai', 'name': 'i20', 'v': '1.1 CRDi 55kW Blue Drive (5d) 75pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.6, 'verbrCNG': 0, 'co2': 92, 'power': 55, 'acc': 16, 'koffer': 326, 'cilinder': 1120, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 66, 'price': 16849, 'bonus': 0, 'pk': 6, 'image': false },
{ 'segment': 'C', 'id': 'x-kia-ceed', 'brand': 'KIA', 'name': 'C&#180;eed', 'v': 'Business Mind 1.6 CRDi 110 ISG EcoDynami (5d) 110pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'co2': 99, 'power': 81, 'acc': 10.6, 'koffer': 380, 'cilinder': 1582, 'bat': 0, 'tank': 53, 'tankcng': 0, 'ecoscore': 65, 'price': 24440, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'C', 'id': 'x-opel-astra', 'brand': 'Opel', 'name': 'Astra', 'v': '1.6 CDTI 81kW ecoFLEX S/S Edition (5d) 110pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.3, 'verbrCNG': 0, 'co2': 88, 'power': 81, 'acc': 10.9, 'koffer': 370, 'cilinder': 1598, 'bat': 0, 'tank': 48, 'tankcng': 0, 'ecoscore': 67, 'price': 22550, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'B', 'id': 'x-opel-corsa', 'brand': 'Opel', 'name': 'Corsa', 'v': '1.3 CDTI 70kW ecoF.S/S Easytronic Enjoy (5d) 95pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.2, 'verbrCNG': 0, 'co2': 84, 'power': 70, 'acc': 13.5, 'koffer': 285, 'cilinder': 1248, 'bat': 0, 'tank': 45, 'tankcng': 0, 'ecoscore': 68, 'price': 18600, 'bonus': 0, 'pk': 7, 'image': false },
{ 'segment': 'D', 'id': 'x-opel-insignia', 'brand': 'Opel', 'name': 'Insignia', 'v': 'Hatchback 1.6 CDTI 100kW Aut. Cosmo (5d) 136pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'co2': 133, 'power': 100, 'acc': 10.9, 'koffer': 530, 'cilinder': 1598, 'bat': 0, 'tank': 70, 'tankcng': 0, 'ecoscore': 61, 'price': 33850, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'MPV-Mid', 'id': 'x-opel-zafira-tourer', 'brand': 'Opel', 'name': 'Zafira Tourer', 'v': '1.6 CDTI ecoFLEX 100kW S/S Cosmo (5d) 136pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'co2': 109, 'power': 100, 'acc': 11.2, 'koffer': 710, 'cilinder': 1598, 'bat': 0, 'tank': 58, 'tankcng': 0, 'ecoscore': 75, 'price': 28300, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'C', 'id': 'x-peugeot-308', 'brand': 'Peugeot', 'name': '308', 'v': '1.6 BlueHDi 85kW s/s Auto Active (5d) 116pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.6, 'verbrCNG': 0, 'co2': 95, 'power': 85, 'acc': 9.9, 'koffer': 470, 'cilinder': 1560, 'bat': 0, 'tank': 53, 'tankcng': 0, 'ecoscore': 67, 'price': 25250, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'MPV-Mid', 'id': 'x-peugeot-5008', 'brand': 'Peugeot', 'name': '5008', 'v': '1.6 BlueHDi S&S 88kW Aut. Allure (5d) 120pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'co2': 112, 'power': 88, 'acc': 13.1, 'koffer': 823, 'cilinder': 1560, 'bat': 0, 'tank': 60, 'tankcng': 0, 'ecoscore': 64, 'price': 32300, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'K', 'id': 'x-peugeot-partner-tepee', 'brand': 'Peugeot', 'name': 'Partner Tepee', 'v': '1.6 BlueHDi 73kW S&S MSQ Tepee Active (5d) 100pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'co2': 109, 'power': 73, 'acc': 14.3, 'koffer': 675, 'cilinder': 1560, 'bat': 0, 'tank': 60, 'tankcng': 0, 'ecoscore': 65, 'price': 21275, 'bonus': 0, 'pk': 9, 'image': false },
{ 'segment': 'K', 'id': 'x-renault-kangoo-maxi', 'brand': 'Renault', 'name': 'Kangoo (maxi)', 'v': 'Energy dCi 75 Life (5d) 75pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'co2': 112, 'power': 55, 'acc': 16.3, 'koffer': 660, 'cilinder': 1461, 'bat': 0, 'tank': 60, 'tankcng': 0, 'ecoscore': 64, 'price': 17350, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'C', 'id': 'x-renault-megane', 'brand': 'Renault', 'name': 'M&eacute;gane', 'v': '1.5 Energy dCi 110 EDC Intens (5d) 110pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.7, 'verbrCNG': 0, 'co2': 95, 'power': 81, 'acc': 12, 'koffer': 524, 'cilinder': 1461, 'bat': 0, 'tank': 47, 'tankcng': 0, 'ecoscore': 66, 'price': 27000, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'B', 'id': 'x-skoda-fabia', 'brand': '&Scaron;koda', 'name': 'Fabia', 'v': '1.4 CRTDI 66kW DSG7 Ambition (5d) 90pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'co2': 99, 'power': 66, 'acc': 11.1, 'koffer': 330, 'cilinder': 1422, 'bat': 0, 'tank': 45, 'tankcng': 0, 'ecoscore': 66, 'price': 19690, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'D', 'id': 'x-skoda-octavia', 'brand': '&Scaron;koda', 'name': 'Octavia', 'v': '2.0 CRTDi 110kW DSG 6 GreenTec Ambition (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'co2': 115, 'power': 110, 'acc': 8.5, 'koffer': 590, 'cilinder': 1968, 'bat': 0, 'tank': 50, 'tankcng': 0, 'ecoscore': 61, 'price': 28850, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'K', 'id': 'x-vw-caddy-maxi', 'brand': 'Volkswagen', 'name': 'Caddy Maxi', 'v': '2.0 CRTDi 75kW SCR BMT Maxi Trendline (5d) 102pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'co2': 123, 'power': 75, 'acc': 13.3, 'koffer': 530, 'cilinder': 1968, 'bat': 0, 'tank': 55, 'tankcng': 0, 'ecoscore': 62, 'price': 21850, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'B', 'id': 'x-vw-polo', 'brand': 'Volkswagen', 'name': 'Polo', 'v': '1.4 TDI 66kW Comfortline BMT DSG (5d) 90pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.5, 'verbrCNG': 0, 'co2': 92, 'power': 66, 'acc': 10.9, 'koffer': 280, 'cilinder': 1422, 'bat': 0, 'tank': 45, 'tankcng': 0, 'ecoscore': 67, 'price': 21412, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'C', 'id': 'BMW-i3', 'brand': 'BMW', 'name': 'i3', 'v': 'i3 Advanced (5d) 170pk', 'fuel': 'ev', 'verbrEl': 11, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 125, 'acc': 7.3, 'koffer': 260, 'cilinder': 0, 'bat': 33, 'tank': 0, 'tankcng': 0, 'ecoscore': 88, 'price': 40150, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'Ford-focus-electric', 'brand': 'Ford', 'name': 'Focus Electric', 'v': 'Electric', 'fuel': 'ev', 'verbrEl': 14.2, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 107, 'acc': 11.4, 'koffer': 316, 'cilinder': 0, 'bat': 23, 'tank': 0, 'tankcng': 0, 'ecoscore': 86, 'price': 36330, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'B', 'id': 'KIA-soulEV', 'brand': 'KIA', 'name': 'Soul EV', 'v': 'Soul EV (5d) 110pk', 'fuel': 'ev', 'verbrEl': 14.7, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 81, 'acc': 11.2, 'koffer': 281, 'cilinder': 0, 'bat': 27, 'tank': 0, 'tankcng': 0, 'ecoscore': 86, 'price': 35290, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'Mercedes-B', 'brand': 'Mercedes-Benz', 'name': 'B-klasse', 'v': 'B-Klasse B 250 e Style (5d) 180pk', 'fuel': 'ev', 'verbrEl': 17.6, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 132, 'acc': 7.9, 'koffer': 501, 'cilinder': 0, 'bat': 36, 'tank': 0, 'tankcng': 0, 'ecoscore': 84, 'price': 39930, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'B', 'id': 'Mitsubishi-i-MiEV', 'brand': 'Mitsubishi', 'name': 'i-MiEV', 'v': 'Intro Edition (5d) 67pk', 'fuel': 'ev', 'verbrEl': 13.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 49, 'acc': 15.9, 'koffer': 235, 'cilinder': 0, 'bat': 16, 'tank': 0, 'tankcng': 0, 'ecoscore': 87, 'price': 28890, 'bonus': 4000, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'Nissan-Leaf24', 'brand': 'Nissan', 'name': 'LEAF 24 kWh', 'v': 'Acenta (5d) 109pk', 'fuel': 'ev', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 80, 'acc': 11.5, 'koffer': 370, 'cilinder': 0, 'bat': 24, 'tank': 0, 'tankcng': 0, 'ecoscore': 86, 'price': 31890, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'Nissan-Leaf24bl', 'brand': 'Nissan', 'name': 'LEAF 24 kWh (battery lease)', 'v': 'Acenta Battery leasing (5d) 109pk', 'fuel': 'ev', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 80, 'acc': 11.5, 'koffer': 370, 'cilinder': 0, 'bat': 24, 'tank': 0, 'tankcng': 0, 'ecoscore': 86, 'price': 25990, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'Nissan-Leaf30', 'brand': 'Nissan', 'name': 'LEAF 30 kWh', 'v': 'Acenta 30kWh (5d) 109pk', 'fuel': 'ev', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 80, 'acc': 11.5, 'koffer': 370, 'cilinder': 0, 'bat': 30, 'tank': 0, 'tankcng': 0, 'ecoscore': 86, 'price': 35350, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'Nissan-Leaf30bl', 'brand': 'Nissan', 'name': 'LEAF 30 kWh (battery lease)', 'v': 'Acenta Battery Leasing 30kWh (5d) 109pk', 'fuel': 'ev', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 80, 'acc': 11.5, 'koffer': 370, 'cilinder': 0, 'bat': 30, 'tank': 0, 'tankcng': 0, 'ecoscore': 86, 'price': 29450, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'K', 'id': 'Nissan-NV200-temp', 'brand': 'Nissan', 'name': 'e-NV200 Evalia', 'v': 'Connect Edition (5d) 109pk', 'fuel': 'ev', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 80, 'acc': 14, 'koffer': 1850, 'cilinder': 0, 'bat': 24, 'tank': 0, 'tankcng': 0, 'ecoscore': 85, 'price': 39006, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'K', 'id': 'Nissan-NV200-temp2', 'brand': 'Nissan', 'name': 'e-NV200 Evalia (battery Lease)', 'v': 'FLEX Connect Edition (5d)', 'fuel': 'ev', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 80, 'acc': 14, 'koffer': 1850, 'cilinder': 0, 'bat': 24, 'tank': 0, 'tankcng': 0, 'ecoscore': 85, 'price': 33106, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'SUV-E', 'id': 'Tesla-X75D', 'brand': 'Tesla', 'name': 'Model X 75D', 'v': '75kWh (Dual Motor) (5d) 328pk', 'fuel': 'ev', 'verbrEl': 20.8, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 386, 'acc': 6.2, 'koffer': 2180, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'ecoscore': 82, 'price': 100600, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'SUV-E', 'id': 'Tesla-Xp90D', 'brand': 'Tesla', 'name': 'Model X 90D', 'v': '90kWh (Dual Motor) (5d) 417pk', 'fuel': 'ev', 'verbrEl': 21.7, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 568, 'acc': 5, 'koffer': 2180, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'ecoscore': 81, 'price': 111200, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'VW-e-golf', 'brand': 'Volkswagen', 'name': 'e-Golf', 'v': 'e-Golf (5d) 115pk', 'fuel': 'ev', 'verbrEl': 12.7, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 85, 'acc': 10.4, 'koffer': 341, 'cilinder': 0, 'bat': 24.2, 'tank': 0, 'tankcng': 0, 'ecoscore': 88, 'price': 37110, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'B', 'id': 'x-citroen-c-zero', 'brand': 'Citroën', 'name': 'C-Zero', 'v': 'C-Zero Electric Seduction (5d) 67pk', 'fuel': 'ev', 'verbrEl': 13.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 49, 'acc': 15.9, 'koffer': 166, 'cilinder': 0, 'bat': 16, 'tank': 0, 'tankcng': 0, 'ecoscore': 87, 'price': 29985, 'bonus': 4000, 'pk': 4, 'image': false },
{ 'segment': 'A', 'id': 'x-citroen-mehari', 'brand': 'Citroën', 'name': 'E-Mehari', 'v': '0', 'fuel': 'ev', 'verbrEl': 41.3, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 42, 'acc': 0, 'koffer': 200, 'cilinder': 0, 'bat': 30, 'tank': 0, 'tankcng': 0, 'ecoscore': 70, 'price': 25200, 'bonus': 4000, 'pk': 4, 'image': false },
{ 'segment': 'C', 'id': 'x-hyundai-ioniq-e', 'brand': 'Hyundai', 'name': 'IONIQ Electric', 'v': 'Premium (5d) 120pk', 'fuel': 'ev', 'verbrEl': 11.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 88, 'acc': 9.9, 'koffer': 455, 'cilinder': 0, 'bat': 28, 'tank': 0, 'tankcng': 0, 'ecoscore': 88, 'price': 34999, 'bonus': 3500, 'pk': 4, 'image': false },
{ 'segment': 'B', 'id': 'x-peugeot-ion', 'brand': 'Peugeot', 'name': 'iOn', 'v': 'Lithium-iOn 330 V Active (5d) 67pk', 'fuel': 'ev', 'verbrEl': 13.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 49, 'acc': 15.9, 'koffer': 166, 'cilinder': 0, 'bat': 16, 'tank': 0, 'tankcng': 0, 'ecoscore': 87, 'price': 30120, 'bonus': 4000, 'pk': 4, 'image': false },
{ 'segment': 'K', 'id': 'x-renault-kangoo', 'brand': 'Renault', 'name': 'Kangoo Z.E. Maxi 5p', 'v': 'Kangoo Maxi Z.E. 5 zitplaatsen', 'fuel': 'ev', 'verbrEl': 15.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 44, 'acc': 20.3, 'koffer': 1300, 'cilinder': 0, 'bat': 22, 'tank': 0, 'tankcng': 0, 'ecoscore': 86, 'price': 28012, 'bonus': 3500, 'pk': 4, 'image': false },
{ 'segment': 'B', 'id': 'x-renault-zoe', 'brand': 'Renault', 'name': 'ZOE 22 kWh (Battery Lease)', 'v': 'Entry R90 B-rent', 'fuel': 'ev', 'verbrEl': 13.3, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 65, 'acc': 12.2, 'koffer': 338, 'cilinder': 0, 'bat': 22, 'tank': 0, 'tankcng': 0, 'ecoscore': 87, 'price': 22050, 'bonus': 4000, 'pk': 4, 'image': false },
{ 'segment': 'B', 'id': 'x-renault-zoe40', 'brand': 'Renault', 'name': 'ZOE 40 kWh (Battery Lease)', 'v': 'Life Q90 B-rent', 'fuel': 'ev', 'verbrEl': 13.3, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 65, 'acc': 12.2, 'koffer': 338, 'cilinder': 0, 'bat': 41, 'tank': 0, 'tankcng': 0, 'ecoscore': 87, 'price': 25250, 'bonus': 4000, 'pk': 4, 'image': false },
{ 'segment': 'B', 'id': 'x-renault-zoe40-BL', 'brand': 'Renault', 'name': 'ZOE 40 kWh (Battery Buy)', 'v': 'Life Q90 B-buy', 'fuel': 'ev', 'verbrEl': 13.3, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 65, 'acc': 12.2, 'koffer': 338, 'cilinder': 0, 'bat': 41, 'tank': 0, 'tankcng': 0, 'ecoscore': 87, 'price': 33650, 'bonus': 3500, 'pk': 4, 'image': false },
{ 'segment': 'B', 'id': 'x-renault-zoeBL', 'brand': 'Renault', 'name': 'ZOE 22 kWh (Battery Buy)', 'v': 'Entry R90 B-buy', 'fuel': 'ev', 'verbrEl': 13.3, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 65, 'acc': 12.2, 'koffer': 338, 'cilinder': 0, 'bat': 22, 'tank': 0, 'tankcng': 0, 'ecoscore': 87, 'price': 30550, 'bonus': 4000, 'pk': 4, 'image': false },
{ 'segment': 'F', 'id': 'x-tesla-S60', 'brand': 'Tesla', 'name': 'Model S 60', 'v': '60kWh (5d) 320pk', 'fuel': 'ev', 'verbrEl': 18.5, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 285, 'acc': 5.8, 'koffer': 745, 'cilinder': 0, 'bat': 60, 'tank': 0, 'tankcng': 0, 'ecoscore': 83, 'price': 80200, 'bonus': 2000, 'pk': 4, 'image': false },
{ 'segment': 'F', 'id': 'x-tesla-S75', 'brand': 'Tesla', 'name': 'Model S 75', 'v': '75kWh (5d) 320pk', 'fuel': 'ev', 'verbrEl': 18.9, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 386, 'acc': 5.8, 'koffer': 745, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'ecoscore': 83, 'price': 87500, 'bonus': 2000, 'pk': 4, 'image': false },
{ 'segment': 'F', 'id': 'x-tesla-SP90D', 'brand': 'Tesla', 'name': 'Model S P90D', 'v': '90kWh (Dual Motor) (5d) 422pk', 'fuel': 'ev', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 568, 'acc': 4.4, 'koffer': 894, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'ecoscore': 82, 'price': 103900, 'bonus': 2000, 'pk': 4, 'image': false },
{ 'segment': 'A', 'id': 'x-vw-e-up', 'brand': 'Volkswagen', 'name': 'e-Up!', 'v': 'e-up! (5d) 82pk', 'fuel': 'ev', 'verbrEl': 11.7, 'verbrBr': 0, 'verbrCNG': 0, 'co2': 0, 'power': 60, 'acc': 12.4, 'koffer': 250, 'cilinder': 0, 'bat': 18.7, 'tank': 0, 'tankcng': 0, 'ecoscore': 88, 'price': 26900, 'bonus': 4000, 'pk': 4, 'image': false },
{ 'segment': 'D', 'id': 'BMW-330e', 'brand': 'BMW', 'name': '330e', 'v': 'Berline 330e iPerformance (4d) 252pk', 'fuel': 'phev', 'verbrEl': 19, 'verbrBr': 4.9, 'verbrCNG': 0, 'co2': 44, 'power': 185, 'acc': 6.1, 'koffer': 480, 'cilinder': 1998, 'bat': 7.6, 'tank': 41, 'tankcng': 0, 'ecoscore': 76, 'price': 43850, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'BMW-i3-rex', 'brand': 'BMW', 'name': 'i3 REX', 'v': 'i3 Advanced Range Extender (5d) 170pk', 'fuel': 'phev', 'verbrEl': 11.5, 'verbrBr': 9.7, 'verbrCNG': 0, 'co2': 12, 'power': 125, 'acc': 8.1, 'koffer': 260, 'cilinder': 647, 'bat': 33, 'tank': 9, 'tankcng': 0, 'ecoscore': 86, 'price': 44650, 'bonus': 0, 'pk': 4, 'image': true },
{ 'segment': 'F', 'id': 'BMW-i8', 'brand': 'BMW', 'name': 'i8', 'v': '1.5 Hybride Aut. (2d) 362pk', 'fuel': 'phev', 'verbrEl': 11.9, 'verbrBr': 5.2, 'verbrCNG': 0, 'co2': 49, 'power': 266, 'acc': 4.4, 'koffer': 154, 'cilinder': 1499, 'bat': 7.1, 'tank': 42, 'tankcng': 0, 'ecoscore': 77, 'price': 142000, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-E', 'id': 'BMW-X5Xdrive40', 'brand': 'BMW', 'name': 'X5 xDrive40', 'v': 'xDrive40e (230 kW) (5d) 313pk', 'fuel': 'phev', 'verbrEl': 29, 'verbrBr': 7.4, 'verbrCNG': 0, 'co2': 77, 'power': 230, 'acc': 6.8, 'koffer': 500, 'cilinder': 1997, 'bat': 9, 'tank': 85, 'tankcng': 0, 'ecoscore': 71, 'price': 73950, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'Golf-GTE-temp', 'brand': 'Volkswagen', 'name': 'Golf GTE', 'v': '1.4 TSi BMT GTE DSG (5d) 204pk', 'fuel': 'phev', 'verbrEl': 11.4, 'verbrBr': 4.5, 'verbrCNG': 0, 'co2': 35, 'power': 150, 'acc': 7.6, 'koffer': 272, 'cilinder': 1398, 'bat': 8.8, 'tank': 40, 'tankcng': 0, 'ecoscore': 81, 'price': 38920, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'D', 'id': 'kia-optima-phev', 'brand': 'KIA', 'name': 'Optima PHEV', 'v': '2.0 GDi Auto (4d) 205pk', 'fuel': 'phev', 'verbrEl': 18.1, 'verbrBr': 5.1, 'verbrCNG': 0, 'co2': 37, 'power': 151, 'acc': 9.4, 'koffer': 307, 'cilinder': 1999, 'bat': 9.8, 'tank': 55, 'tankcng': 0, 'ecoscore': 0, 'price': 45490, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'Mercedes-C350-Temp', 'brand': 'Mercedes-Benz', 'name': 'C350e', 'v': 'C-Klasse Berline (New) C 350 E Avantgarde (4d) 279pk', 'fuel': 'phev', 'verbrEl': 11, 'verbrBr': 4.7, 'verbrCNG': 0, 'co2': 48, 'power': 205, 'acc': 5.9, 'koffer': 335, 'cilinder': 1991, 'bat': 6.2, 'tank': 50, 'tankcng': 0, 'ecoscore': 78, 'price': 53422, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-F', 'id': 'Mercedes-GLE500', 'brand': 'Mercedes-Benz', 'name': 'GLE500e', 'v': 'GLE 500 e 4MATIC (5d) 442pk', 'fuel': 'phev', 'verbrEl': 16, 'verbrBr': 7.7, 'verbrCNG': 0, 'co2': 78, 'power': 325, 'acc': 5.3, 'koffer': 690, 'cilinder': 2996, 'bat': 8.8, 'tank': 93, 'tankcng': 0, 'ecoscore': 68, 'price': 77198, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'F', 'id': 'Mercedes-S550-Temp', 'brand': 'Mercedes-Benz', 'name': 'S500', 'v': 'S-Klasse S 500 e L (4d) 449pk', 'fuel': 'phev', 'verbrEl': 13.5, 'verbrBr': 6.5, 'verbrCNG': 0, 'co2': 65, 'power': 330, 'acc': 5.2, 'koffer': 530, 'cilinder': 2996, 'bat': 8.7, 'tank': 78, 'tankcng': 0, 'ecoscore': 74, 'price': 118943, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'SUV-D', 'id': 'Mitsubishi-outlander-phev', 'brand': 'Mitsubishi', 'name': 'Outlander PHEV', 'v': '2.0L PHEV Business Edition 4WD (5d) 203pk', 'fuel': 'phev', 'verbrEl': 13.4, 'verbrBr': 5.5, 'verbrCNG': 0, 'co2': 42, 'power': 149, 'acc': 11, 'koffer': 463, 'cilinder': 1998, 'bat': 12, 'tank': 45, 'tankcng': 0, 'ecoscore': 78, 'price': 47240, 'bonus': 0, 'pk': 4, 'image': true },
{ 'segment': 'SUV-E', 'id': 'Porsche-Cayenne-S-E-Hybrid', 'brand': 'Porsche', 'name': 'Cayenne S E-Hybrid', 'v': '3.0 S e-Hybrid (5d) 416pk', 'fuel': 'phev', 'verbrEl': 20.8, 'verbrBr': 7.6, 'verbrCNG': 0, 'co2': 75, 'power': 306, 'acc': 5.9, 'koffer': 580, 'cilinder': 2995, 'bat': 10.8, 'tank': 80, 'tankcng': 0, 'ecoscore': 68, 'price': 89177, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'D', 'id': 'Volvo-V60-drivee', 'brand': 'Volvo', 'name': 'V60 PHEV', 'v': 'D6 Twin Engine Momentum (5d) 220pk', 'fuel': 'phev', 'verbrEl': 13.3, 'verbrBr': 5.4, 'verbrCNG': 0, 'co2': 48, 'power': 162, 'acc': 6, 'koffer': 310, 'cilinder': 2400, 'bat': 11.2, 'tank': 46, 'tankcng': 0, 'ecoscore': 74, 'price': 59080, 'bonus': 0, 'pk': 13, 'image': true },
{ 'segment': 'SUV-E', 'id': 'Volvo-XC90PHEV', 'brand': 'Volvo', 'name': 'XC90 PHEV', 'v': '2.0 T8 4WD Geartronic Momentum 7PL. (5d) 407pk', 'fuel': 'phev', 'verbrEl': 23, 'verbrBr': 7, 'verbrCNG': 0, 'co2': 49, 'power': 300, 'acc': 5.6, 'koffer': 314, 'cilinder': 1969, 'bat': 9.2, 'tank': 50, 'tankcng': 0, 'ecoscore': 75, 'price': 80350, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'vw-passat-gtephev-temp', 'brand': 'Volkswagen', 'name': 'Passat GTE', 'v': '1.4 TSI GTE (4d) 218pk', 'fuel': 'phev', 'verbrEl': 12.2, 'verbrBr': 5.1, 'verbrCNG': 0, 'co2': 37, 'power': 160, 'acc': 7.4, 'koffer': 402, 'cilinder': 1395, 'bat': 9.9, 'tank': 50, 'tankcng': 0, 'ecoscore': 80, 'price': 46110, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'x-audi-a3-etron', 'brand': 'Audi', 'name': 'A3 e-tron nieuw model', 'v': 'Sportback 1.4 TFSi e-tron S tronic Attraction (5d) 204pk', 'fuel': 'phev', 'verbrEl': 12.4, 'verbrBr': 4.5, 'verbrCNG': 0, 'co2': 38, 'power': 150, 'acc': 7.6, 'koffer': 280, 'cilinder': 1395, 'bat': 8.8, 'tank': 40, 'tankcng': 0, 'ecoscore': 80, 'price': 40300, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'SUV-F', 'id': 'x-audi-q7-etron', 'brand': 'Audi', 'name': 'Q7 e-tron', 'v': 'Audi Q7 E-tron 3.0 TDI Tiptr. Quattro S Line (5d) 373pk', 'fuel': 'phev', 'verbrEl': 25, 'verbrBr': 5.8, 'verbrCNG': 0, 'co2': 48, 'power': 275, 'acc': 6.2, 'koffer': 650, 'cilinder': 2967, 'bat': 17.3, 'tank': 75, 'tankcng': 0, 'ecoscore': 68, 'price': 82910, 'bonus': 0, 'pk': 15, 'image': false },
{ 'segment': 'C', 'id': 'x-bmw-225xe', 'brand': 'BMW', 'name': '225xe', 'v': 'Active Tourer 225xe (5d) 224pk', 'fuel': 'phev', 'verbrEl': 11.9, 'verbrBr': 5.3, 'verbrCNG': 0, 'co2': 46, 'power': 165, 'acc': 6.7, 'koffer': 468, 'cilinder': 1496, 'bat': 7.7, 'tank': 36, 'tankcng': 0, 'ecoscore': 79, 'price': 38300, 'bonus': 0, 'pk': 8, 'image': false },
{ 'segment': 'E', 'id': 'x-bmw-530e', 'brand': 'BMW', 'name': '530e', 'v': 'Berline iPerformance (4d) 252pk', 'fuel': 'phev', 'verbrEl': 18.8, 'verbrBr': 5.7, 'verbrCNG': 0, 'co2': 44, 'power': 185, 'acc': 6.2, 'koffer': 520, 'cilinder': 1998, 'bat': 9.4, 'tank': 41, 'tankcng': 0, 'ecoscore': 0, 'price': 57950, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'F', 'id': 'x-bmw-740e', 'brand': 'BMW', 'name': '740e', 'v': 'BMW 740e iPerformance', 'fuel': 'phev', 'verbrEl': 12.5, 'verbrBr': 5.9, 'verbrCNG': 0, 'co2': 45, 'power': 240, 'acc': 5.4, 'koffer': 515, 'cilinder': 1998, 'bat': 9.2, 'tank': 46, 'tankcng': 0, 'ecoscore': 78, 'price': 98200, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'E', 'id': 'x-mercedes-350e', 'brand': 'Mercedes-Benz', 'name': 'E350e', 'v': 'Berline (Nieuw model) E 350 e Avantgarde (4d) 299pk', 'fuel': 'phev', 'verbrEl': 20.7, 'verbrBr': 4.6, 'verbrCNG': 0, 'co2': 49, 'power': 220, 'acc': 6.2, 'koffer': 450, 'cilinder': 1991, 'bat': 6.2, 'tank': 60, 'tankcng': 0, 'ecoscore': 0, 'price': 65461, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'SUV-D', 'id': 'x-mercedes-GLCe', 'brand': 'Mercedes-Benz', 'name': 'GLC 350e', 'v': 'GLC-Klasse GLC 350 e 4MATIC (5d) 326pk', 'fuel': 'phev', 'verbrEl': 25.6, 'verbrBr': 5.9, 'verbrCNG': 0, 'co2': 59, 'power': 240, 'acc': 5.9, 'koffer': 550, 'cilinder': 1991, 'bat': 8.7, 'tank': 50, 'tankcng': 0, 'ecoscore': 74, 'price': 54813, 'bonus': 0, 'pk': 11, 'image': false },
{ 'segment': 'F', 'id': 'x-porsche-panameraPHEV', 'brand': 'Porsche', 'name': 'Panamera S E-Hybrid', 'v': '4 E-Hybrid (5d) 462pk', 'fuel': 'phev', 'verbrEl': 15.9, 'verbrBr': 7.6, 'verbrCNG': 0, 'co2': 56, 'power': 340, 'acc': 4.6, 'koffer': 405, 'cilinder': 2894, 'bat': 14.1, 'tank': 80, 'tankcng': 0, 'ecoscore': 0, 'price': 110957, 'bonus': 0, 'pk': 15, 'image': false },
{ 'segment': 'D', 'id': 'x-toyota-prius-PHEV', 'brand': 'Toyota', 'name': 'Prius PHEV', 'v': '1.8 Plug-in Hybrid Business Plus Automaat', 'fuel': 'phev', 'verbrEl': 17.6, 'verbrBr': 3, 'verbrCNG': 0, 'co2': 22, 'power': 90, 'acc': 11.8, 'koffer': 360, 'cilinder': 1798, 'bat': 8.8, 'tank': 43, 'tankcng': 0, 'ecoscore': 0, 'price': 37945, 'bonus': 0, 'pk': 10, 'image': false }



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

function fillCarBoxes(str) {
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
				cptCarBoxHtml.push('<div class="car col-md-4 col-xs-6" id="' + carsLeft[i].id + '"> <h4>Selecteren als eerste wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '.png" width="250" /> <h2>' + carsLeft[i].brand + ' ' + carsLeft[i].name + '</h2> <h3>' + carsLeft[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsLeft[i].fuel) + '">' + drivetrainToString(carsLeft[i].fuel,'') + '</span> <span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsLeft[i].price,0) + ',-</span></p> </div>');					 
			});
			cptCarBoxHtml.push('<div class="clear"></div>');
			$('#cpt-car-box').html(cptCarBoxHtml.join(''));
		} else { 
			$('#cpt-car-box').html('<p class="bg-warning">Er zijn geen ' + drivetrainToString(drivetrainLeft,'e').toLowerCase() + 'voertuigen in het ' + segment + '-segment.</p>');
		}
		carIdLeft = '';
		$('#section4').hide();
		$('#btn-go-to-section4').removeClass('active');
		$('#nav-4').addClass('disabled');
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
				allCarBoxHtml.push('<div class="car col-md-4 col-xs-6" id="' + carsRight[i].id + '"> <h4>Selecteren als tweede wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '.png" width="250" /> <h2>' + carsRight[i].brand + ' ' + carsRight[i].name + '</h2> <h3>' + carsRight[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsRight[i].fuel) + '">' + drivetrainToString(carsRight[i].fuel,'') + '</span> <span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsRight[i].price,0) + ',-</span></p> </div>');					 
			});
			if ( drivetrainRight == 'benz' || drivetrainRight == 'dies') { 
				allCarBoxHtml.push('<div class="car col-md-4 col-xs-6 customCar"> <h4>Selecteren als tweede wagen</h4> <img src="assets/img/custom.png" width="250" /> <h2>Stel een <span style="text-transform: lowercase;">' + drivetrainToString(drivetrainRight,'') + '</span>wagen samen</h2> <h3>Op basis van eigen criteria.</h3> <p><span class="car-drivetrain-' + fuelToFuelType(drivetrainRight) + '">' + drivetrainToString(drivetrainRight,'') + '</span> <span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; <span class="customPriceTag">' + addCommas(25000,0) + '</span>,-</span></p> </div>');
				customFuel = drivetrainRight;
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
		$('#nav-4').addClass('disabled');
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
			$('#nav-4').removeClass('disabled');
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
	}else {
		terms = addCommas(verbruik[1],1) + ' L';
	}
	return terms;
}

function rijbereikToString(verbruik,car) {
	var terms = '';
	if (car.drivetrain == 'ev') {
		terms = addCommas(car.batterijcapaciteit / verbruik[0]*100) + ' km';
	} else if (car.drivetrain == 'phev') {
		terms = addCommas(car.batterijcapaciteit / car.verbrEl / rijgedrag *100) + ' + ' + addCommas(car.tank / car.verbrBr / rijgedrag *100) + ' km';
	}else if (car.drivetrain == 'cng') {
		terms = addCommas(car.tankCNG / car.verbrCNG / rijgedrag *100) + ' + ' + addCommas(car.tank / car.verbrBr / rijgedrag *100) + ' km';
	}else {
		terms = addCommas(car.tank / verbruik[1]*100) + ' km';
	}
	return terms;
}

function suggestiesToString(car,flipped) {
	var terms = [];
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

function fuelToFuelType(str) {
	var terms = '';
	switch(str) {
      case 'ev':
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
	this.fullName = that.brand + ' ' + that.name;
	this.version = that.v; 
	if (typeof this.version == 'undefined') this.version = this.name;
	this.priceIncl = that.price; // INCLUSIEF BTW
	this.verbrEl = that.verbrEl; // energieverbruik in kWh/100 km
	this.verbrBr = that.verbrBr; // brandstofverbruik in L/100 km
	this.verbrCNG = that.verbrCNG; // CNG verbruik in kg/100 km
	if (typeof this.verbrEl == 'undefined') this.verbrEl = 0;
	if (typeof this.verbrBr == 'undefined') this.verbrBr = 0;
	if (typeof this.verbrCNG == 'undefined') this.verbrCNG = 0;
	this.drivetrain = that.fuel; // ev | benz | dies | lpg | cng
	this.image = that.image;
	this.euro = that.euro; // Euronorm (indien roetfilter werkelijke + 1)
	if (typeof this.euro == 'undefined') this.euro = 6;
	this.co2 = that.co2; // in g/km
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
	if (this.drivetrain == 'ev') this.cilinderText = nvt;
	this.batterijcapaciteit = that.bat;
	this.batterijcapaciteitText = addCommas(that.bat,1) + ' kWh';
	if (typeof that.bat == 'undefined' || that.bat == 'undefined') this.batterijcapaciteitText = nB
	if (this.drivetrain == 'cng' || this.drivetrain == 'dies' || this.drivetrain == 'benz') this.batterijcapaciteitText = nvt;
	this.tank = that.tank; // in L
	if (typeof this.tank == 'undefined') this.tank = 0;
	this.tankCNG = that.tankcng; // in kg
	if (typeof this.tankCNG == 'undefined') this.tankCNG = 0;
	this.tankText = this.tank;
	if (typeof that.tank == 'undefined' || that.tankcng == 'undefined') this.tankText = nB
	if (this.drivetrain == 'cng') { 
		this.tankText = this.tankCNG + ' kg + ' + this.tank + ' L'
	} else { 
		this.tankText = this.tank + ' L'
	}
	if (this.drivetrain == 'ev') this.tankText = nvt;
	this.model = that.model; // Personenwagen | Bestelwagen
	if (typeof this.model == 'undefined') this.model = 'Personenwagen';
	this.batterylease = that.blc; // PY inclusief BTW
	if (typeof this.batterylease == 'undefined') this.batterylease = new blc(); 
	this.fiscalePK = that.pk; // fiscale PK
	if (typeof this.fiscalePK == 'undefined') this.fiscalePK = 0;
	if(this.fuel == 'ev') {
		this.co2 = 0;
		this.fiscalePK = 4;
	}
	this.fuelType = drivetrainToString(that.fuel,'');
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
			rob *= 0.75; // Elektrische voertuigen hebben minder kosten
		}
		return rob;
	}
	
	this.vaaCoef = function() {
		var co2Coef = 0;
		var diesRef = 89; // Diesel-CO2-referentie: 89 g/km per 1/1/2016
		var benzRef = 107; // Benzine-CO2-referentie: 107 g/km per 1/1/2016
		if (this.drivetrain == 'ev') {
			co2Coef = 0.04;
		} else if (this.drivetrain == 'dies') {
			co2Coef = 0.055 + (this.co2 - diesRef) * 0.001;
		} else { // Benzine, cng, lpg
			co2Coef = 0.055 + (this.co2 - benzRef) * 0.001;
		}
		co2Coef = Math.min(Math.max(co2Coef,0.04),0.18);
		return co2Coef;
	}
	
	this.solidariteitsbijdragePY = function() { // Solidariteitsbijdrage per 1/1/2016
		var sol = 0;
		var solMinimum = 25.55; // Minimum bijdrage per maand
		var solIndex = 1.2267; // Index 2016
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
	
	this.fiscaleAftrek = function() {
		var fa = 0;
		if (this.drivetrain == 'ev') {
			fa = 1.2;
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
	
	this.biv = function() { // BIV vanaf 1/1/2016
		var b = 0;
		if (this.drivetrain == 'ev' || this.drivetrain == 'cng' || this.co2 <= 50) { 
			b = 0; // BIV is 0 euro voor ev, cng- en PHEV<50gCO2
		}
		else { // VÓÓR 2016: {(CO2 * f + x) / 250}^6 * (4.500 + c) * LC ; NA 2016: (BIV = [(CO2 * f + x)6 * 4.500 + c] * LC ) / 246
			var LC = 1; // Leeftijdscorrectie: 1 bij nieuwe voertuigen
			var x = 18; // 0 in 2012, 4.5 in 2013, 9 in 2014, 13.5 in 2015, 
			var bMinimum = 41.99; // minimum BIV-tarief vanaf 1 juli 2015 ; 40 in 2012
			var bMaximum = 10497.70; // maximum BIV-tarief vanaf 1 juli 2015 ; 10.000 in 2012

			var f = 1;
			if (this.drivetrain == 'lpg') f = 0.88;
			if (this.drivetrain == 'cng') f = 0.93; // Voor 100% aardgasvoertuigen 0.93; voor bi-fuel 0.744
			var c = 0;
			if (this.drivetrain == 'dies') {
				if (this.euro == 0) { c = 2863.15; }
				else if (this.euro == 1) { c = 840; }
				else if (this.euro == 2) { c = 622.57; }
				else if (this.euro == 3) { c = 493.36; }
				else if (this.euro == 4) { c = 467.06; }
				else if (this.euro == 5) { c = 459.35; }
				else if (this.euro == 6) { c = 454.07; }
			}
			else { // Benzine, PHEV > 50g en LPG
				if (this.euro == 0) { c = 1138.78; }
				else if (this.euro == 1) { c = 509.28; }
				else if (this.euro == 2) { c = 152.29; }
				else if (this.euro == 3) { c = 95.53; }
				else if (this.euro == 4) { c = 22.93; }
				else if (this.euro == 5 || this.euro == 6) { c = 20.61; }
			}
			b = 1;
			b *= this.co2*f + x; //{(CO2 * f + x) / 250}^6
			b /= 246;
			b = Math.pow(b,6);
			b *= 4500 + c;
			b *= LC;
			b = Math.max(Math.min(b,bMaximum),bMinimum);
		}
		return b;
	}
	
	this.vkbPY = function() { // Verkeersbelasting vanaf 1/1/2016
		var v = 0; 
		if (this.drivetrain == 'ev') { 
			v = 0; // Verkeersbelasting is 0 euro voor EV (en voor CNG- en PHEV-voertuigen (met 50 gram of minder) 0 gedurende 4 jaar)
		} else { // Andere brandstoffen en PHEV met > 50 g/km
			// Verkeersbelasting criterium 1: fiscale PK
			switch(this.fiscalePK) { 
				case 1 : case 2 : case 3 : 
				case 4 : v =   69.72; break; //  Was in 2015:70.32
				case 5 : v =   87.24; break; //  Was in 2015:87.96
				case 6 : v =  126.12; break; //  Was in 2015:127.20
				case 7 : v =  164.76; break; //  Was in 2015:166.20
				case 8 : v =  203.76; break; //  Was in 2015:205.56
				case 9 : v =  242.64; break; //  Was in 2015:244.80
				case 10: v =  281.16; break; //  Was in 2015:283.68
				case 11: v =  365.92; break; //  Was in 2015:368.28
				case 12: v =  448.56; break; //  Was in 2015:452.64
				case 13: v =  532.08; break; //  Was in 2015:536.88
				case 14: v =  615.84; break; //  Was in 2015:621.48
				case 15: v =  699.48; break; //  Was in 2015:705.84
				case 16: v =  916.20; break; //  Was in 2015:924.60
				case 17: v = 1133.16; break; //  Was in 2015:1143.48
				case 18: v = 1350.00; break; //  Was in 2015:1362.36
				case 19: v = 1566.36; break; //  Was in 2015:1580.76
				default: v = 1783.20; //  Was in 2015:1799.52
			}
			if (this.fiscalePK > 20) { // Fiscale PK boven 21
				v = v + (this.fiscalePK - 20) * 97.20; // was 98.04 in 2015
			}
			// Verkeersbelasting criterium 2: CO2
			var co2Reference = 122;
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
			else { // Benzine, PHEV > 50g en LPG
				if (this.euro == 0) { euroFactor = 0.3; }
				else if (this.euro == 1) { euroFactor = 0.1; }
				else if (this.euro == 2) { euroFactor = 0.05 }
				else if (this.euro == 3) { euroFactor = 0; }
				else if (this.euro == 4) { euroFactor = -0.125; }
				else if (this.euro == 5 || this.euro == 6) { euroFactor = -0.15; }
			}
			v = v + euroFactor * v;	
		}

		return v;
	}
}

function filterCars(lijst,seg,bs) {
	var newArray = [];
	jQuery.each(lijst, function(i, item) { 
		if (lijst[i].segment == seg) { 
			if (lijst[i].fuel == bs) { 
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

function calculateVerbr(car,phev,cng) { // Returnt een array van het re&euml;le verbruik in kWh, L en kg per 100 km, rekening houdend met de ratio's
	var verbruik = [];
	var phevVerhouding = phev;
	var cngVerhouding = cng;
	if (car.drivetrain == 'ev') phevVerhouding = 1; 
	if (car.drivetrain == 'dies' || car.drivetrain == 'benz') { 
		phevVerhouding = 0; 
		cngVerhouding = 0;
	}
	if (car.drivetrain == 'cng') phevVerhouding = 0; 
	if (car.drivetrain != 'cng' ) cngVerhouding = 0;
	verbruik.push(rijgedrag*phevVerhouding*car.verbrEl);
	verbruik.push(rijgedrag*(1-phevVerhouding)*(1-cngVerhouding)*car.verbrBr);
	verbruik.push(rijgedrag*cngVerhouding*car.verbrCNG);
	return verbruik;
}

function calculateTCO() {
	if (tcoReady) {
		var leftCar = master.item(carIdLeft);
		var rightCar = master.item(carIdRight);
		
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
		entiteit = $('#input-entiteit').val();
		btwplicht = $('#input-btwplicht').val();
		gebruiksdoel = $('#input-gebruiksdoel').val();
		
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
		$('#tco-result-specsheet-left-verbruik').html(verbruikToString(verbruikLeft,leftCar.drivetrain));
		$('#tco-result-specsheet-left-rijbereik').html(rijbereikToString(verbruikLeft,leftCar));
		
		$('#tco-result-specsheet-right-vermogen').html(rightCar.power);
		$('#tco-result-specsheet-right-acceleratie').html(rightCar.acc);
		$('#tco-result-specsheet-right-koffer').html(rightCar.koffer);
		$('#tco-result-specsheet-right-cilinderinhoud').html(rightCar.cilinderText);
		$('#tco-result-specsheet-right-batterijcapaciteit').html(rightCar.batterijcapaciteitText);
		$('#tco-result-specsheet-right-brandstoftank').html(rightCar.tankText);
		$('#tco-result-specsheet-right-verbruik').html(verbruikToString(verbruikRight,rightCar.drivetrain));
		$('#tco-result-specsheet-right-rijbereik').html(rijbereikToString(verbruikRight,rightCar));
	
		// Autosuggesties invullen en activeren
		$('#tco-result-car-switch-left').html(suggestiesToString(leftCar,''));
		$('#tco-result-car-switch-right').html(suggestiesToString(rightCar,'flipped'));
		
		$('#tco-result-car-switch-left img').click(function() { carIdLeft = $(this).attr('id').substring(3); calculateTCO(); }); 
		$('#tco-result-car-switch-right img').click(function() { carIdRight = $(this).attr('id').substring(3); calculateTCO(); });
		
		// Popovers inhoud instellen
		if ( leftCar.drivetrain == 'ev' ) { $('#tco-popover-left-elektriciteit').show(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').hide(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'ev' ) { $('#tco-popover-right-elektriciteit').show(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( leftCar.drivetrain == 'cng' ) { $('#tco-popover-left-elektriciteit').hide(); $('#tco-popover-left-aardgas').show(); $('#tco-popover-left-benzine').show(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').show(); }
		if ( rightCar.drivetrain == 'cng' ) { $('#tco-popover-right-elektriciteit').hide(); $('#tco-popover-right-aardgas').show(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').show(); }
		if ( leftCar.drivetrain == 'phev' ) { $('#tco-popover-left-elektriciteit').show(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').show(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').show(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'phev' ) { $('#tco-popover-right-elektriciteit').show(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').show(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'benz' ) { $('#tco-popover-right-elektriciteit').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'dies' ) { $('#tco-popover-right-elektriciteit').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').show(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		$('#tco-change-car-popover-left').hide(); 
		$('#tco-change-car-popover-right').hide(); 
		
		
		// TCO berekenen
		
		var tcoWagenLeft = calculateTCOWagen(leftCar,optionsLeft,discountLeft, residualLeft);
		var tcoWagenRight = calculateTCOWagen(rightCar,optionsRight,discountRight,residualRight);
		
		var tcoVerbruikLeft = calculateTCOVerbruik(leftCar,verbruikLeft);
		var tcoVerbruikRight = calculateTCOVerbruik(rightCar,verbruikRight);
		
		var tcoOverigeLeft = calculateTCOVerzROB(leftCar,optionsLeft);
		var tcoOverigeRight = calculateTCOVerzROB(rightCar,optionsRight);
		
		var tcoIncentivesLeft = calculateTCOIncentives(leftCar,optionsLeft,discountLeft);
		var tcoIncentivesRight = calculateTCOIncentives(rightCar,optionsRight,discountRight);
	
		var tcoWerknemerLeft = calculateTCOVAA(leftCar,optionsLeft,discountLeft);
		var tcoWerknemerRight = calculateTCOVAA(rightCar,optionsRight,discountRight);
	
		var tcoFiscaleAftrekLeft = calculateTCOFiscaleAftrek(leftCar,optionsLeft,tcoVerbruikLeft,tcoOverigeLeft);
		var tcoFiscaleAftrekRight = calculateTCOFiscaleAftrek(rightCar,optionsRight,tcoVerbruikRight,tcoOverigeRight);
	
		var tcoTotaalLeft = tcoWagenLeft + tcoVerbruikLeft + tcoOverigeLeft + tcoIncentivesLeft + tcoFiscaleAftrekLeft;
		var tcoTotaalRight = tcoWagenRight + tcoVerbruikRight + tcoOverigeRight +  tcoIncentivesRight + tcoFiscaleAftrekRight;
	
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
		if (rightCar.drivetrain == 'ev' || rightCar.drivetrain == 'cng' || rightCar.drivetrain == 'phev') { // Twee CPT-wagens
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
		x.parent().css('background','#1069C9').css('color','#FFF');
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
	term += verbruik[0] * elektriciteitsprijs; // Bereken de elektriciteitskosten in € per 100km
	if (car.drivetrain == 'diesel') { 
		term += verbruik[1] * dieselprijs; // Bereken de dieselkosten in € per 100km
	} else { // benzine, aardgas of phev
		term += verbruik[1] * benzineprijs; // Bereken de benzinekosten in € per 100km
	}
	term += verbruik[2] * aardgasprijs; // Bereken de aardgaskosten in € per 100km
	term *= distancePY * inflatieFactor * btwFactorFromIncl; // Totale prijs op volledige afstand * inflatiefactor * 100 incl. (niet-recupereerbare) BTW
	term /= 100;
	return Math.round(term);
}

function calculateTCOVerzROB(car,opties) { // verbruik houdt reeds rekening met rijgedrag en CNG of PHEV-verhouding
	var term = 0;
	term += car.robPKM() * distancePY * inflatieFactor * btwFactorFromIncl; // geïndexeerde onderhoudskosten incl. (niet-recupereerbare) BTW
	term += 311 * 1.271 * inflatieFactor; // Geïndexeerde BA verzekering
	term += 0.02 * (car.priceIncl + opties) * inflatieFactor * btwFactorFromIncl; // geïndexeerde omnium verzekering op de aankoop incl. (niet-recupereerbare) BTW
	return Math.round(term);
}

function calculateTCOIncentives(car,opties,korting) { 
	var term = 0;
	term += car.biv(); // BIV
	if (car.drivetrain == 'cng' || car.co2 < 51) { // Geïndexeerde verkeersbelasting 
		if (duration > 5) { 
			term += car.vkbPY() * ( inflatieFactor - 5); // Vrijstelling voor CNG en PHEV<51g tot 31/12/2020
		}
	}
	else { 
		term += car.vkbPY() * inflatieFactor; // Geïndexeerde verkeersbelasting
	}
	if (entiteit == 'np') { // Zero-emissiebonus voor nulemissievoertuigen
		term += car.zeroEmissieBonus;
	}
	if (car.drivetrain == 'cng') { // Aardgaspremie van KVBG (tot 29/1/2016)
		term -= 0;
	}
	if ( entiteit != 'np' && gebruiksdoel == 'bw') { // solidariteitsbijdrage 2016
		term += car.solidariteitsbijdragePY() * inflatieFactor;
		if (entiteit == 'vns') { // patronale bijdrage of werkgeversbijdrage
			term += calculateTCOVAA(car,opties,korting) * 0.17 * vennootschapsbelasting;
		}
	}
	return Math.round(term);
}

function calculateTCOVAA(car,opties,korting) {
	var vaa = 0;
	if ( entiteit != 'np' && gebruiksdoel == 'bw') {
		var vaaMinimum = 1260;
		var vaaBase = car.vaaCoef() * (car.priceExcl + opties/(1+btw) + (( car.priceExcl + opties - korting)*btw) ) * 6 / 7;
		for( i = 1; i <= duration; i++ ) { 
			if (duration < 6 ) { // Van 0 tot 60 maanden
				vaa += Math.max(vaaBase * (1 - i * 0.06),vaaMinimum);
			} else { // Vanaf 61 maanden
				vaa += Math.max(vaaBase * 0.7,vaaMinimum);
			}
		}
	}
	return Math.round(vaa);
}

function calculateTCOFiscaleAftrek(car,opties,tcoVerbruik,tcoOverige) {
	var fa = 0;
	if ( entiteit == 'vns' ) {
		fa = ((car.priceIncl + opties) + car.batterylease.pricePY(distancePY) * duration) * btwFactorFromIncl + tcoOverige + car.biv() + car.vkbPY() * inflatieFactor;
		if (gebruiksdoel == 'bw') { // Indien bedrijfswagen: CO2-afhankelijke aftrek
			fa *= car.fiscaleAftrek();
		}
		fa += 1 * car.solidariteitsbijdragePY() * inflatieFactor;
		fa += 0.75 * tcoVerbruik;
		fa *= vennootschapsbelasting * -1;
	}
	return Math.round(fa); // Fiscale aftrek als negatief getal
}

function createRandomStartImages() {
	var length = cars.length;
	var id1 = Math.floor(Math.random() * length);
	var id2 = Math.floor(Math.random() * length);
	$('#start-image-left').attr('src','assets/img/cars/' + cars[id1].id + '.png');
	$('#start-image-right').attr('src','assets/img/cars/' + cars[id2].id + '.png');
	if(cars[id1].image == false || cars[id2].image == false) createRandomStartImages(); // Altijd een auto nemen met een echte afbeelding
}

function changeCustomCar() { 
	master.remove('custom');
	var customName = $('#input-custom-name').val();
	var customEuro = $('#input-emissienorm').val();
	var customFiscPK = parseInt($('#input-fiscpk').val());
	
	master.add('custom', new Car( { 'segment': segment, 'id': 'custom', 'brand': '', 'name': customName, 'v': '', 'fuel': customFuel, 'verbrEl': 0, 'verbrBr': customVerbruik, 'verbrCNG': 0, 'co2': customCO2, 'power': 0, 'acc': 0, 'koffer': 0, 'cilinder': customCC, 'bat': 0, 'tank': 40, 'tankcng': 0, 'ecoscore': 0, 'price': customAankoop, 'bonus': 0, 'pk': customFiscPK, 'image': false, 'euro': customEuro } ));
	carIdRight = 'custom';
	$('.customPriceTag').html(addCommas(customAankoop,0));
	calculateTCO();
	
}

// Ready... //

    $(document).ready(function() {
		
		master = createCollection(cars);
		
		createRandomStartImages();
		
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
    	var initAfstand = new Powerange(inputAfstand, { decimal: false, callback: changeOutputAfstand, min: 5000, max: 50000, start: 30000, step: 1000 });
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
		
		var inputElektriciteitLeft = document.querySelector('.input-elektriciteit-left');
		var initElektriciteitLeft = new Powerange(inputElektriciteitLeft, { decimal: true, callback: changeOutputElektriciteitLeft, min: 0, max: 0.5, start: elektriciteitsprijs });
		function changeOutputElektriciteitLeft() { elektriciteitsprijs = parseFloat(inputElektriciteitLeft.value); $('#input-elektriciteit-left').val(addCommas(elektriciteitsprijs,2)); }
		
		var inputElektriciteitRight = document.querySelector('.input-elektriciteit-right');
		var initElektriciteitRight = new Powerange(inputElektriciteitRight, { decimal: true, callback: changeOutputElektriciteitRight, min: 0, max: 0.5, start: elektriciteitsprijs });
		function changeOutputElektriciteitRight() { elektriciteitsprijs = parseFloat(inputElektriciteitRight.value); $('#input-elektriciteit-right').val(addCommas(elektriciteitsprijs,2)); }
		
		var inputAardgasLeft = document.querySelector('.input-aardgas-left');
		var initAardgasLeft = new Powerange(inputAardgasLeft, { decimal: true, callback: changeOutputAardgasLeft, min: 0, max: 2, start: aardgasprijs });
		function changeOutputAardgasLeft() { aardgasprijs = parseFloat(inputAardgasLeft.value); $('#input-aardgas-left').val(addCommas(aardgasprijs,2)); }
		
		var inputAardgasRight = document.querySelector('.input-aardgas-right');
		var initAardgasRight = new Powerange(inputAardgasRight, { decimal: true, callback: changeOutputAardgasRight, min: 0, max: 2, start: aardgasprijs });
		function changeOutputAardgasRight() { aardgasprijs = parseFloat(inputAardgasRight.value); $('#input-aardgas-right').val(addCommas(aardgasprijs,2)); }
		
		var inputBenzineLeft = document.querySelector('.input-benzine-left');
		var initBenzineLeft = new Powerange(inputBenzineLeft, { decimal: true, callback: changeOutputBenzineLeft, min: 0, max: 2, start: benzineprijs });
		function changeOutputBenzineLeft() { benzineprijs = parseFloat(inputBenzineLeft.value); $('#input-benzine-left').val(addCommas(benzineprijs,2)); }
		
		var inputBenzineRight = document.querySelector('.input-benzine-right');
		var initBenzineRight = new Powerange(inputBenzineRight, { decimal: true, callback: changeOutputBenzineRight, min: 0, max: 2, start: benzineprijs });
		function changeOutputBenzineRight() { benzineprijs = parseFloat(inputBenzineRight.value); $('#input-benzine-right').val(addCommas(benzineprijs,2)); }
		
		var inputDieselLeft = document.querySelector('.input-diesel-left');
		var initDieselLeft = new Powerange(inputDieselLeft, { decimal: true, callback: changeOutputDieselLeft, min: 0, max: 2, start: dieselprijs });
		function changeOutputDieselLeft() { dieselprijs = parseFloat(inputDieselLeft.value); $('#input-diesel-left').val(addCommas(dieselprijs,2)); }
		
		var inputDieselRight = document.querySelector('.input-diesel-right');
		var initDieselRight = new Powerange(inputDieselRight, { decimal: true, callback: changeOutputDieselRight, min: 0, max: 2, start: dieselprijs });
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
			initElektriciteitLeft.setPosition(elektriciteitsprijs*400); $('#input-elektriciteit-left').val(addCommas(elektriciteitsprijs,2));
			initElektriciteitRight.setPosition(elektriciteitsprijs*400); $('#input-elektriciteit-right').val(addCommas(elektriciteitsprijs,2));
			initAardgasLeft.setPosition(aardgasprijs*100); $('#input-aardgas-left').val(addCommas(aardgasprijs,2));
			initAardgasRight.setPosition(aardgasprijs*100); $('#input-aardgas-right').val(addCommas(aardgasprijs,2));
			initBenzineLeft.setPosition(benzineprijs*100); $('#input-benzine-left').val(addCommas(benzineprijs,2));
			initBenzineRight.setPosition(benzineprijs*100); $('#input-benzine-right').val(addCommas(benzineprijs,2));
			initDieselLeft.setPosition(dieselprijs*100); $('#input-diesel-left').val(addCommas(dieselprijs,2));
			initDieselRight.setPosition(dieselprijs*100); $('#input-diesel-right').val(addCommas(dieselprijs,2));
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

		// Zichtbaarheid van SELECT boxes in de eerste stap, en invloed op de next knop en menu
		$('#input-entiteit').on('change', function() {
			if ($(this).val() == 'np') {
				$('#tco-control-btw-plicht').hide();
				$('#tco-control-gebruiksdoel').hide();
				$('#tco-control-verhoudingprive').hide();
				$('#btn-go-to-section2').addClass('active');
				$('#nav-2').removeClass('disabled');
				$('#nav-3').removeClass('disabled');
				initAfstand.setPosition(125); $('#input-afstand').val(addCommas(15000,0));
			}
			else { 
				initAfstand.setPosition(250); $('#input-afstand').val(addCommas(30000,0));
				$('#term-entity').html($('#input-entiteit option:selected').text());
				$('#tco-control-btw-plicht').slideDown();
				$('#tco-control-gebruiksdoel').slideDown(function() {
					var e = document.getElementById('input-gebruiksdoel');
					if ( e.options[e.selectedIndex].value == 'sel') {
						$('#btn-go-to-section2').removeClass('active');
						$('#nav-2').addClass('disabled');
						$('#nav-3').addClass('disabled');
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
				}
			}
			else { 
				$('#tco-control-verhoudingprive').hide();
			}
			$('#btn-go-to-section2').addClass('active');
			$('#nav-2').removeClass('disabled');
			$('#nav-3').removeClass('disabled');
			calculateTCO();
		});

		$('#input-prive-professioneel').on('change', function() { calculateTCO(); });
		$('#input-prive-rijgedrag').on('change', function() { calculateTCO(); });

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
		
		// Modal 
		
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
		
		var inputCustomCC = document.querySelector('.input-custom-cc');
		var initCustomCC = new Powerange(inputCustomCC, { decimal: false, callback: changeOutputCustomCC, min: 1000, max: 4000, start: 1600, step: 100 });
		function changeOutputCustomCC() { customCC = parseFloat(inputCustomCC.value); $('#input-custom-cc').val(inputCustomCC.value); changeCustomCar(); }
		
		$('#input-custom-name').change( function() { changeCustomCar() });
		$('#input-emissienorm').change( function() { changeCustomCar() });
		$('#input-fiscpk').change( function() { changeCustomCar() });
		
		$('#modalCustomCar').hide();
		$('#modalCustomCar').modal({
			show: false			   				   
		});


    });