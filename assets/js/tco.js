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
var benzineprijs = 1.8862; // in €/L incl btw
var dieselprijs = 2.0172; // in €/L incl btw
var elektriciteitsprijsThuis = 0.58; // in €/kWh incl btw
var elektriciteitsprijsWerk = 0.55*1.21; // in €/kWh incl btw
var elektriciteitsprijsPubliek = 0.49; // in €/kWh incl btw
var elektriciteitsprijsOnderweg = 0.77; // in €/kWh incl btw
var aardgasprijs = 3.610; // in €/kg incl btw
var waterstofprijs = 9.999; // in €/kg incl. btw
var inflatie = 0.1063;
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
{ 'segment': 'E', 'id': 'tesla-models-performance', 'brand': 'Tesla', 'name': 'Model S Plaid', 'v': 'AWD (5d) 1100pk', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 810, 'acc': 2.1, 'koffer': 804, 'cilinder': 0, 'bat': 200, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 140970, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'tesla-model-x', 'brand': 'Tesla', 'name': 'Model X Long Range Plus', 'v': 'AWD (5d) 562pk', 'fuel': 'Elektrisch', 'verbrEl': 18.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 413, 'acc': 4.6, 'koffer': 2487, 'cilinder': 0, 'bat': 95, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 94970, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'tesla-model-x-performance', 'brand': 'Tesla', 'name': 'Model X Performance', 'v': 'AWD (5d) 796pk', 'fuel': 'Elektrisch', 'verbrEl': 17.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 585, 'acc': 2.8, 'koffer': 2487, 'cilinder': 0, 'bat': 95, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 111970, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'tesla-models-longrange', 'brand': 'Tesla', 'name': 'Model S Long Range Plus', 'v': 'AWD (4d) 476pk', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 413, 'acc': 3.8, 'koffer': 804, 'cilinder': 0, 'bat': 95, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 85970, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': '0', 'brand': 'Tesla', 'name': 'Model S Performance', 'v': 'AWD (5d) 796pk', 'fuel': 'Elektrisch', 'verbrEl': 15.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 585, 'acc': 2.5, 'koffer': 804, 'cilinder': 0, 'bat': 95, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 102970, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KN1', 'model': 'N1', 'mtm': 3000, 'id': 'ford-tourneo-custom-phev', 'brand': 'Ford', 'name': 'Tourneo Custom', 'v': 'L1H1 Ecoboost PHEV', 'fuel': 'Plug-in hybride', 'verbrEl': 25.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 70, 'power': 93, 'acc': 0, 'koffer': 1150, 'cilinder': 999, 'bat': 13.6, 'tank': 70, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 65933, 'pk': 6, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'KN1', 'model': 'N1', 'mtm': 3000, 'id': 'mercedes-eqv', 'brand': 'Mercedes-Benz', 'name': 'EQV', 'v': '300 (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 27.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 12.1, 'koffer': 1030, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 76551, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'kia-sorento-phev', 'brand': 'KIA', 'name': 'Sorento PHEV', 'v': 'More 1.6 PHEV 4WD AT6 (5d) 265pk', 'fuel': 'Plug-in hybride', 'verbrEl': 20.1, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 44, 'power': 227, 'acc': 6.6, 'koffer': 963, 'cilinder': 1497, 'bat': 13.8, 'tank': 57, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 55090, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-discovery-sport-phev', 'brand': 'Land', 'name': 'Rover Discovery Sport PHEV', 'v': 'P300e PHEV AWD Auto S (5d) 309pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 227, 'acc': 6.6, 'koffer': 963, 'cilinder': 1497, 'bat': 15, 'tank': 57, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 55990, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jeep-compass-phev', 'brand': 'Jeep', 'name': 'Compass 4xE', 'v': '1.3 Turbo T4 240 4xe ATX Trailhawk (5d) 241pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.9, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 50, 'power': 195, 'acc': 8.7, 'koffer': 898, 'cilinder': 1598, 'bat': 11.4, 'tank': 67, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 43800, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q7', 'brand': 'Audi', 'name': 'Q7', 'v': 'Quattro triptronic 3.0 45 TDI 170kW (5d) 231pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 170, 'acc': 7.1, 'koffer': 890, 'cilinder': 2967, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 61080, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'vw-touran', 'brand': 'Volkswagen', 'name': 'Touran', 'v': 'Trendline 1.4 TSi 110kW DSG  (5d) 150pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 110, 'acc': 8.9, 'koffer': 834, 'cilinder': 1395, 'bat': 0, 'tank': 58, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 28880, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-mustang-mache-standard', 'brand': 'Ford', 'name': ' Mustang Mach-E Extended Range', 'v': '99kWh Extended Range RWD (5d) 294pk', 'fuel': 'Elektrisch', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 113, 'acc': 8.3, 'koffer': 171, 'cilinder': 0, 'bat': 88, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 56150, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-e-tron-55', 'brand': 'Audi', 'name': 'e-tron 55', 'v': '55 Quattro Advanced (5d) 408pk', 'fuel': 'Elektrisch', 'verbrEl': 22.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 5.7, 'koffer': 660, 'cilinder': 0, 'bat': 86.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 85770, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-e-tron-sportback-55', 'brand': 'Audi', 'name': 'e-tron Sportback 55', 'v': '55 Quattro Advanced (5d) 408pk', 'fuel': 'Elektrisch', 'verbrEl': 21.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 5.7, 'koffer': 615, 'cilinder': 0, 'bat': 86.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 87780, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KN1', 'model': 'N1', 'mtm': 3000, 'id': 'fiat-doblo-benz', 'brand': 'Fiat', 'name': 'Dobl&ograve;', 'v': 'Easy 1.4 T-Jet (5d) 120pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 196, 'power': 88, 'acc': 12.3, 'koffer': 790, 'cilinder': 1368, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 18690, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KN1', 'model': 'N1', 'mtm': 3000, 'id': 'fiat-doblo-cng', 'brand': 'Fiat', 'name': 'Dobl&ograve; (CNG)', 'v': '1.4 T-Jet CNG Lounge Natural Power (5d) 120pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 161, 'power': 88, 'acc': 12.3, 'koffer': 790, 'cilinder': 1368, 'bat': 0, 'tank': 60, 'tankcng': 16, 'tankfcev': 0, 'ecoscore': 71, 'price': 22290, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'peugeot-5008-dies', 'brand': 'Peugeot', 'name': '5008', 'v': 'Allure 1.5 BlueHDi 96kW S&S EAT8 (5d) 130pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 105, 'power': 96, 'acc': 11.8, 'koffer': 780, 'cilinder': 1499, 'bat': 0, 'tank': 56, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 37180, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'peugeot-5008-benz', 'brand': 'Peugeot', 'name': '5008', 'v': 'Allure 1.2 PureTech 96kW S&S EAT8 (5d) 130pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 116, 'power': 96, 'acc': 10.2, 'koffer': 780, 'cilinder': 1199, 'bat': 0, 'tank': 56, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 35830, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KN1', 'model': 'N1', 'mtm': 3000, 'id': 'citroen-berlingo-multispace', 'brand': 'Citro&euml;n', 'name': 'Berlingo Multispace', 'v': 'Shine 1.5 BlueHDi 130 EAT8 S&S XTR M (5d) 130pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 96, 'acc': 12.3, 'koffer': 775, 'cilinder': 1499, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 29760, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne', 'brand': 'Porsche', 'name': 'Cayenne', 'v': '3.0 (5d) 340pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 210, 'power': 250, 'acc': 6.2, 'koffer': 772, 'cilinder': 2995, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 79944, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-t6-momentum-dies', 'brand': 'Volvo', 'name': 'XC90', 'v': 'Momentum 2.0 D5 4WD Geartronic 5PL. (5d) 235pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 158, 'power': 173, 'acc': 7.8, 'koffer': 721, 'cilinder': 1969, 'bat': 0, 'tank': 71, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 64800, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-t6-momentum-benz', 'brand': 'Volvo', 'name': 'XC90', 'v': 'Momentum 2.0 T6 4WD Geartronic 5PL. (5d) 310pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 192, 'power': 228, 'acc': 6.5, 'koffer': 721, 'cilinder': 1969, 'bat': 0, 'tank': 71, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 68100, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':192 },
{ 'segment': 'SUV-C', 'id': 'citroen-c5-aircross-32', 'brand': 'Citro&euml;n', 'name': 'C5 Aircross Hybrid', 'v': '225 e-EAT8 Business GPS (5d) 225pk', 'fuel': 'Plug-in hybride', 'verbrEl': 23.2, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 165, 'acc': 8.7, 'koffer': 720, 'cilinder': 1598, 'bat': 11.6, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 36179, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KN1', 'model': 'N1', 'mtm': 3000, 'id': 'peugeot-partner-tepee', 'brand': 'Peugeot', 'name': 'Partner tepee', 'v': 'Active 1.2 PureTech 81kW S/S (5d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 81, 'acc': 12.2, 'koffer': 675, 'cilinder': 1199, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 19925, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-velar-phev', 'brand': 'Land', 'name': 'Rover Range Rover Velar PHEV', 'v': 'P400e SE (5d) 404pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21.9, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 297, 'acc': 5.4, 'koffer': 673, 'cilinder': 1997, 'bat': 13, 'tank': 69, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 82200, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':133 },
{ 'segment': 'E', 'id': 'jaguar-i-pace', 'brand': 'Jaguar', 'name': 'I-Pace EV320 S', 'v': 'Business Pack (5d) 320pk', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 235, 'acc': 6.4, 'koffer': 577, 'cilinder': 0, 'bat': 84.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 67990, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-taycan-turbo', 'brand': 'Porsche', 'name': 'Taycan Turbo', 'v': '93 kWh (4d) 680pk', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 500, 'acc': 3.2, 'koffer': 447, 'cilinder': 0, 'bat': 83.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 157844, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'renault-kangoo', 'brand': 'Renault', 'name': 'Kangoo Energy', 'v': 'dCi 90 Limited (5d) 90pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 70, 'acc': 13.8, 'koffer': 660, 'cilinder': 1461, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 18025, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q7-etron', 'brand': 'Audi', 'name': 'Q7', 'v': '3.0 55 TFSI e quattro tiptronic (5d) 381pk', 'fuel': 'Plug-in hybride', 'verbrEl': 23.7, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 59, 'power': 280, 'acc': 5.9, 'koffer': 650, 'cilinder': 2995, 'bat': 17.3, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 70500, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':204 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5', 'brand': 'BMW', 'name': 'X5 xDrive 40i', 'v': '(250 kW) (5d) 340pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 183, 'power': 250, 'acc': 5.5, 'koffer': 650, 'cilinder': 2998, 'bat': 0, 'tank': 83, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 71150, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'jaguar-f-pace-dies', 'brand': 'Jaguar', 'name': 'F-Pace', 'v': 'Prestige 2.0D 132kW 4x4 Aut. (5d) 180pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 132, 'acc': 8.7, 'koffer': 650, 'cilinder': 1999, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 53060, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'jaguar-f-pace-benz', 'brand': 'Jaguar', 'name': 'F-Pace', 'v': 'Prestige 2.0 184kW 4x4 Aut. (5d) 250pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 170, 'power': 184, 'acc': 6.8, 'koffer': 650, 'cilinder': 1997, 'bat': 0, 'tank': 63, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 55560, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat', 'brand': 'Volkswagen', 'name': 'Passat Variant', 'v': 'Comfortline 2.0 TDI SCR 110kW DSG7 (5d) 150pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 113, 'power': 110, 'acc': 8.9, 'koffer': 650, 'cilinder': 1968, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 38120, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-phev', 'brand': 'Porsche', 'name': 'Cayenne E-Hybrid', 'v': '3.0 (5d) 462pk', 'fuel': 'Plug-in hybride', 'verbrEl': 39.2, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 71, 'power': 340, 'acc': 5, 'koffer': 645, 'cilinder': 2995, 'bat': 14.1, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 93024, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':215 },
{ 'segment': 'C', 'id': 'citroen-c4-grand-picasso', 'brand': 'Citro&euml;n', 'name': 'Grand C4 Picasso', 'v': 'Business Lounge 2.0 BlueHDi 150 S&S MAN6 (5d) 150pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 106, 'power': 110, 'acc': 9.8, 'koffer': 645, 'cilinder': 1997, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 26257, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi-2', 'brand': '&Scaron;koda', 'name': 'Octavia Combi', 'v': 'Ambition 2.0 CRTDI GreenTec 110kW DSG7  (5d) 150pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 98, 'power': 110, 'acc': 8.8, 'koffer': 640, 'cilinder': 1968, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 34665, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi-3', 'brand': '&Scaron;koda', 'name': 'Octavia Combi', 'v': 'Ambition 1.5 TSI ACT 110kW DSG 7 GreenT (5d) 150pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 110, 'acc': 8.3, 'koffer': 640, 'cilinder': 1498, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 28150, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-1', 'brand': '&Scaron;koda', 'name': 'Superb', 'v': 'Ambition 2.0 CRTDI 140kW  (5d) 190pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 140, 'acc': 8.4, 'koffer': 625, 'cilinder': 1968, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 35175, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-taycan-4splus', 'brand': 'Porsche', 'name': 'Taycan 4S Plus', 'v': '93 kWh (4d) 530pk', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 390, 'acc': 4, 'koffer': 407, 'cilinder': 0, 'bat': 83.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 117648, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-eqc-400', 'brand': 'Mercedes-Benz', 'name': 'EQC 400 ', 'v': '4MATIC Business Solution (5d) 408pk', 'fuel': 'Elektrisch', 'verbrEl': 22.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 5.1, 'koffer': 500, 'cilinder': 0, 'bat': 80, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 74899, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4-1st', 'brand': 'Volkswagen', 'name': 'ID.4 1ST', 'v': '1st (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 18.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 8.5, 'koffer': 543, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 47280, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-dies', 'brand': 'Volkswagen', 'name': 'Tiguan', 'v': 'Comfortline 2.0 TDI SCR 110kW DSG (5d) 150pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 110, 'acc': 9.3, 'koffer': 615, 'cilinder': 1968, 'bat': 0, 'tank': 58, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 39800, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-benz', 'brand': 'Volkswagen', 'name': 'Tiguan', 'v': 'Comfortline 1.4 TSI 110kW DSG 4Motion (5d) 150pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 110, 'acc': 9.2, 'koffer': 615, 'cilinder': 1395, 'bat': 0, 'tank': 58, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 34200, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'jaguar-f-pace-phev', 'brand': 'Jaguar', 'name': 'F-Pace', 'v': 'P400e AWD Auto S (5d) 404pk', 'fuel': 'Plug-in hybride', 'verbrEl': 26, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 297, 'acc': 5.3, 'koffer': 613, 'cilinder': 1997, 'bat': 13.8, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 76700, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jaguar-e-pace-phev', 'brand': 'Jaguar', 'name': 'E-Pace', 'v': 'P300e Aut. AWD R-Dynamic SE (5d) 309pk', 'fuel': 'Plug-in hybride', 'verbrEl': 27.2, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 44, 'power': 297, 'acc': 5.3, 'koffer': 613, 'cilinder': 1997, 'bat': 15, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 60850, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80', 'brand': '&Scaron;koda', 'name': 'ENYAQ iV 80', 'v': '80kWh (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 16.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 8.5, 'koffer': 585, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 44800, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c', 'brand': 'Mercedes-Benz', 'name': 'C-klasse Break', 'v': 'C200 (5d) 184pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 135, 'acc': 7.9, 'koffer': 590, 'cilinder': 1497, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 42471, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-st', 'brand': 'SEAT', 'name': 'Leon ST (CNG)', 'v': 'Style 1.4L TGI 81kW (5d) 110pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 96, 'power': 81, 'acc': 11, 'koffer': 587, 'cilinder': 1395, 'bat': 0, 'tank': 9, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 81, 'price': 24990, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-id3-pro-77', 'brand': 'Volkswagen', 'name': 'ID.3 Pro (77 kWh)', 'v': '77 kWh Pro S (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 15.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.9, 'koffer': 385, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 39550, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi', 'brand': '&Scaron;koda', 'name': 'Octavia Combi PHEV', 'v': '1.4 TSI PHEV 150kW DSG6 Clever+ (5d) 204pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.8, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 132, 'acc': 8.7, 'koffer': 585, 'cilinder': 1395, 'bat': 10.4, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 45570, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'tesla-model3-performance', 'brand': 'Tesla', 'name': 'Model 3 Performance', 'v': 'Dual Motor AWD (4d) 490pk', 'fuel': 'Elektrisch', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 360, 'acc': 3.3, 'koffer': 425, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 65470, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-phev', 'brand': 'Volkswagen', 'name': 'Arteon eHybrid', 'v': '1.4 eHybrid DSG Elegance (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 160, 'acc': 7.8, 'koffer': 565, 'cilinder': 1395, 'bat': 13, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 52620, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'audi-a3-sportback-etron', 'brand': 'Audi', 'name': 'A3 Sportback', 'v': '1.4 40 TFSI e Advanced (5d) 204pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.3, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 270, 'acc': 5.7, 'koffer': 565, 'cilinder': 1984, 'bat': 8.8, 'tank': 52, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 39100, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-phev', 'brand': 'Volkswagen', 'name': 'Tiguan eHybrid', 'v': '1.4 eHybrid DSG R-Line (5d) 245pk', 'fuel': 'Plug-in hybride', 'verbrEl': 26, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 160, 'acc': 7.8, 'koffer': 563, 'cilinder': 1395, 'bat': 13, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 45640, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq-phev', 'brand': 'Hyundai', 'name': 'IONIQ PHEV', 'v': '1.6 Gdi ISG DCT Plug-in Hybride Feel (5d) 141pk', 'fuel': 'Plug-in hybride', 'verbrEl': 11.7, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 104, 'acc': 10.6, 'koffer': 563, 'cilinder': 1580, 'bat': 8.9, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 36999, 'pk': 9, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-v90-t6-awd-r-design', 'brand': 'Volvo', 'name': 'V90', 'v': 'Momentum D4 Geartronic  (5d) 190pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 140, 'acc': 8.5, 'koffer': 560, 'cilinder': 1969, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 53300, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-velar-dies', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'D240 2.0 (5d) 240pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 177, 'acc': 7.3, 'koffer': 558, 'cilinder': 1999, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 61600, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-velar-benz', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'P250 2.0 (5d) 250pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 173, 'power': 184, 'acc': 6.7, 'koffer': 558, 'cilinder': 1997, 'bat': 0, 'tank': 63, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 57300, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'ds-ds7-crossback-e-tense-phev', 'brand': 'DS', 'name': 'DS 7 Crossback E-Tense 4x4', 'v': 'Performance Line (5d) 225pk', 'fuel': 'Plug-in hybride', 'verbrEl': 22.8, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 35, 'power': 221, 'acc': 5.9, 'koffer': 555, 'cilinder': 1598, 'bat': 11.6, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 49490, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'rangerover-landrover-phev', 'brand': 'Land', 'name': 'Rover Range Rover PHEV', 'v': 'P400e Vogue (5d) 404pk', 'fuel': 'Plug-in hybride', 'verbrEl': 24.3, 'verbrBr': 8.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 76, 'power': 297, 'acc': 6.8, 'koffer': 550, 'cilinder': 1997, 'bat': 13, 'tank': 90, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 120700, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':160 },
{ 'segment': 'SUV-D', 'id': 'audi-q5', 'brand': 'Audi', 'name': 'Q5', 'v': 'S Tronic Quattro 2.0 TDi 120kW (5d) 163pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 120, 'acc': 8.9, 'koffer': 550, 'cilinder': 1968, 'bat': 0, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 48190, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3', 'brand': 'BMW', 'name': 'X3 xDrive20i', 'v': '(135 kW) (5d) 184pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 135, 'acc': 8.3, 'koffer': 550, 'cilinder': 1998, 'bat': 0, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 46700, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-phev', 'brand': 'Mercedes-Benz', 'name': 'GLC PHEV', 'v': '300e 4MATIC (5d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.7, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 45, 'power': 235, 'acc': 5.7, 'koffer': 550, 'cilinder': 1991, 'bat': 13.5, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 61589, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':152 },
{ 'segment': 'D', 'id': 'hyundai-ioniq-hybrid', 'brand': 'Hyundai', 'name': 'IONIQ Hybrid', 'v': 'Premium 1.6 GDi ISG DCT (5d) 141pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 3.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 79, 'power': 104, 'acc': 10.8, 'koffer': 550, 'cilinder': 1580, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 27499, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-dies', 'brand': 'Mercedes-Benz', 'name': 'GLC 250', 'v': 'd 4MATIC (5d) 204pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 161, 'power': 150, 'acc': 7.6, 'koffer': 550, 'cilinder': 2143, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 49731, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-benz', 'brand': 'Mercedes-Benz', 'name': 'GLC 250', 'v': 'MATIC (5d) 211pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 155, 'acc': 7.3, 'koffer': 550, 'cilinder': 1991, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 47432, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-recharge', 'brand': 'Volvo', 'name': 'XC40 P8 Recharge', 'v': '4x4 R-design (5d) 408pk', 'fuel': 'Elektrisch', 'verbrEl': 23.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 4.9, 'koffer': 413, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 62900, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'polestar-2-ev', 'brand': 'Polestar', 'name': '2 (78 kWh)', 'v': '78kWh Aut. 4x4 Pilot Plus (5d) 408pk', 'fuel': 'Elektrisch', 'verbrEl': 19.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 4.5, 'koffer': 405, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 58900, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-ix3', 'brand': 'BMW', 'name': 'iX3', 'v': 'sDrive35 (5d) 286pk', 'fuel': 'Elektrisch', 'verbrEl': 18.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.7, 'koffer': 510, 'cilinder': 0, 'bat': 74, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 68500, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-e', 'brand': 'Mercedes-Benz', 'name': 'E-klasse Berline', 'v': 'E250 (4d) 184pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 155, 'acc': 6.9, 'koffer': 540, 'cilinder': 1991, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 49973, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a7-sportback-phev', 'brand': 'Audi', 'name': 'A7 Sportback', 'v': 'TFSI e 2.0 50 Quattro 220kW S tronic (5d) 299pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.6, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 220, 'acc': 6.3, 'koffer': 535, 'cilinder': 1984, 'bat': 14.1, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 71640, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6', 'brand': 'Audi', 'name': 'A6', 'v': 'Design S tronic 40 TDI (4d)', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 150, 'acc': 8.1, 'koffer': 530, 'cilinder': 1968, 'bat': 0, 'tank': 63, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 53250, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-5-dies', 'brand': 'BMW', 'name': '520d Berline', 'v': '140kW aut. (4d) 190pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 140, 'acc': 7.2, 'koffer': 530, 'cilinder': 1995, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 52600, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-5-benz', 'brand': 'BMW', 'name': '520i Berline', 'v': '135kW Aut. (4d) 184pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 135, 'acc': 7.8, 'koffer': 530, 'cilinder': 1998, 'bat': 0, 'tank': 68, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 51250, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508-sw-phev', 'brand': 'Peugeot', 'name': '508 SW PHEV', 'v': '1.6 Hybrid 225 e-EAT8 GT (5d) 225pk', 'fuel': 'Plug-in hybride', 'verbrEl': 23.5, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 165, 'acc': 8.4, 'koffer': 530, 'cilinder': 1598, 'bat': 11.5, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 51450, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-berline-phev', 'brand': 'Audi', 'name': 'A6 Berline', 'v': 'TFSI e 50 S tronic Quattro (4d) 299pk', 'fuel': 'Plug-in hybride', 'verbrEl': 17.4, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 35, 'power': 220, 'acc': 6.2, 'koffer': 530, 'cilinder': 1984, 'bat': 14.1, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 63280, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-530e-iperformance', 'brand': 'BMW', 'name': '530e Berline PHEV', 'v': '530e 185kW (4d) 252pk', 'fuel': 'Plug-in hybride', 'verbrEl': 20.3, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 185, 'acc': 6.1, 'koffer': 530, 'cilinder': 1998, 'bat': 10.4, 'tank': 46, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 60400, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': '0', 'brand': 'Audi', 'name': 'Q3', 'v': '45 TFSI e S tronic (5d) 245pk', 'fuel': 'Plug-in hybride', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 180, 'acc': 7.3, 'koffer': 530, 'cilinder': 1395, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 44500, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': '0', 'brand': 'Audi', 'name': 'Q3 Sportback', 'v': '45 TFSI e S tronic (5d) 245pk', 'fuel': 'Plug-in hybride', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 180, 'acc': 7.3, 'koffer': 530, 'cilinder': 1395, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 46000, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60-t6-phev', 'brand': 'Volvo', 'name': 'V60 T6 Recharge', 'v': '4x4 Geartronic Inscription (5d) 341pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.8, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 251, 'acc': 5.4, 'koffer': 529, 'cilinder': 1969, 'bat': 9.6, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 60630, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60-2018', 'brand': 'Volvo', 'name': 'V60', 'v': 'Momentum T6 4x4 Geartronic (5d) 310pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 228, 'acc': 5.8, 'koffer': 529, 'cilinder': 1969, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 50900, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60-t8-phev', 'brand': 'Volvo', 'name': 'V60 T8 Recharge', 'v': '4x4 Geartronic Inscription (5d) 392pk', 'fuel': 'Plug-in hybride', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 288, 'acc': 4.9, 'koffer': 529, 'cilinder': 1969, 'bat': 9.6, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 63430, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'peugeot-3008', 'brand': 'Peugeot', 'name': '3008', 'v': 'Line 1.2 PureTech 96kW S&S Auto GT (5d) 130pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 96, 'acc': 9.7, 'koffer': 520, 'cilinder': 1199, 'bat': 0, 'tank': 53, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 35650, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'bmw-7-dies', 'brand': 'BMW', 'name': '740d Berline', 'v': 'xDrive (4d) 320pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 235, 'acc': 5.2, 'koffer': 515, 'cilinder': 2993, 'bat': 0, 'tank': 78, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 100400, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'bmw-7-benz', 'brand': 'BMW', 'name': '740i Berline', 'v': '(240 kW) (4d) 326pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 240, 'acc': 5.5, 'koffer': 515, 'cilinder': 2998, 'bat': 0, 'tank': 78, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 96300, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'opel-grandland-x-dies', 'brand': 'Opel', 'name': 'Grandland X', 'v': 'Innovation 1.5 Turbo D S/S AT8 (5d) 131pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 99, 'power': 96, 'acc': 12.3, 'koffer': 514, 'cilinder': 1499, 'bat': 0, 'tank': 53, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 33900, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'tesla-model-y', 'brand': 'Tesla', 'name': 'Model Y Long Range', 'v': 'Dual Motor AWD (5d)  351 pk', 'fuel': 'Elektrisch', 'verbrEl': 14.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 258, 'acc': 5.1, 'koffer': 1900, 'cilinder': 0, 'bat': 72.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 63980, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'ds9-e-tense', 'brand': 'DS', 'name': 'DS9 E-Tense', 'v': 'Performance Line+', 'fuel': 'Plug-in hybride', 'verbrEl': 23.8, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 165, 'acc': 8.3, 'koffer': 510, 'cilinder': 1598, 'bat': 11.9, 'tank': 42, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 53990, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-combi-1', 'brand': '&Scaron;koda', 'name': 'Superb Combi IV PHEV', 'v': 'Ambition 1.4 TSI iV 160kW DSG6 (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.4, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 160, 'acc': 7.8, 'koffer': 510, 'cilinder': 1395, 'bat': 10.4, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 44640, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-gle-coupe-phev', 'brand': 'Mercedes-Benz', 'name': 'GLE Coup&eacute; PHEV', 'v': '300e 4MATIC (5d) 333pk', 'fuel': 'Plug-in hybride', 'verbrEl': 32.8, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 19, 'power': 245, 'acc': 6.9, 'koffer': 510, 'cilinder': 1991, 'bat': 31.2, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 93049, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-gle-coupe-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'GLE Coup&eacute; PHEV', 'v': '350de 4MATIC (5d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 31.2, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 235, 'acc': 6.9, 'koffer': 510, 'cilinder': 1950, 'bat': 31.2, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 94864, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'tesla-model-y-performance', 'brand': 'Tesla', 'name': 'Model Y Performance', 'v': 'Dual Motor AWD (5d)  462 pk', 'fuel': 'Elektrisch', 'verbrEl': 14.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 340, 'acc': 3.7, 'koffer': 1900, 'cilinder': 0, 'bat': 72.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 70980, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-taycan-4s', 'brand': 'Porsche', 'name': 'Taycan 4S', 'v': '79 kWh (4d) 530pk', 'fuel': 'Elektrisch', 'verbrEl': 21.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 390, 'acc': 4, 'koffer': 407, 'cilinder': 0, 'bat': 71, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 110534, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a4-dies', 'brand': 'Audi', 'name': 'A4 Avant', 'v': 'S Tronic Business ED 2.0 35 TDi 110kW  (5d) 150pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 110, 'acc': 9.2, 'koffer': 505, 'cilinder': 1968, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 37465, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a4-benz', 'brand': 'Audi', 'name': 'A4 Avant', 'v': 'S Tronic 2.0 35 TFSi 110kW  (5d) 150pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 110, 'acc': 9.2, 'koffer': 505, 'cilinder': 1984, 'bat': 0, 'tank': 54, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 36450, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a4-cng', 'brand': 'Audi', 'name': 'A4 Avant g-tron', 'v': '2.0 TFSi CNG 125kW S tronic (5d) 170pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 125, 'acc': 8.4, 'koffer': 505, 'cilinder': 1984, 'bat': 0, 'tank': 7, 'tankcng': 17, 'tankfcev': 0, 'ecoscore': 78, 'price': 40879, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x1', 'brand': 'BMW', 'name': 'X1 sDrive', 'v': '18iA (103 kW) (5d) 140pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 133, 'power': 103, 'acc': 9.6, 'koffer': 505, 'cilinder': 1499, 'bat': 0, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 33300, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': '0', 'brand': 'Audi', 'name': 'A8 L', 'v': 'TFSI e 60 TFSI e quattro (4d) 449pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 60, 'power': 280, 'acc': 5.8, 'koffer': 505, 'cilinder': 2995, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 110100, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-t5-momentum', 'brand': 'Volvo', 'name': 'XC60', 'v': 'Momentum T5 Geartronic(5d) 250pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 181, 'power': 184, 'acc': 6.9, 'koffer': 505, 'cilinder': 1969, 'bat': 0, 'tank': 71, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 51600, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':181 },
{ 'segment': 'D', 'id': 'tesla-model3-longrange', 'brand': 'Tesla', 'name': 'Model 3 Long Range ', 'v': 'Dual Motor AWD (4d) 476pk', 'fuel': 'Elektrisch', 'verbrEl': 14.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 350, 'acc': 4.4, 'koffer': 425, 'cilinder': 0, 'bat': 70, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 59970, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'citroen-e-spacetourer-75', 'brand': 'Citro&euml;n', 'name': '&Euml;-Spacetourer (75 kWh)', 'v': 'M 75 kWh Feel (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 29.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 13.3, 'koffer': 507, 'cilinder': 0, 'bat': 68, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 60500, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-v90-t6-phev', 'brand': 'Volvo', 'name': 'V90 T6 Recharge', 'v': 'Geartronic Inscription (5d) 341pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.3, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 40, 'power': 251, 'acc': 5.9, 'koffer': 501, 'cilinder': 1969, 'bat': 9.6, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 70900, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-v90-t8-phev', 'brand': 'Volvo', 'name': 'V90 T8 Recharge', 'v': 'Geartronic Inscription (5d) 392pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.2, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 40, 'power': 288, 'acc': 5.3, 'koffer': 501, 'cilinder': 1969, 'bat': 9.6, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 76690, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-coupe-phev', 'brand': 'Porsche', 'name': 'Cayenne E-Hybrid Coupé', 'v': '3.0 E-Hybrid (5d) 462pk', 'fuel': 'Plug-in hybride', 'verbrEl': 40.3, 'verbrBr': 8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 73, 'power': 340, 'acc': 5.1, 'koffer': 500, 'cilinder': 2995, 'bat': 14.1, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 100609, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':217 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-coupe-phev', 'brand': 'Mercedes-Benz', 'name': 'GLC Coup&eacute; PHEV', 'v': '300e 4MATIC (5d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.7, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 45, 'power': 235, 'acc': 5.8, 'koffer': 500, 'cilinder': 1991, 'bat': 13.5, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 64314, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':159 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'opel-zafira-e-life-75', 'brand': 'Opel', 'name': 'Zafira E Life (75 kWh)', 'v': '75 kWh L2H1 e-Elegance (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 21.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 265, 'acc': 5.2, 'koffer': 487, 'cilinder': 0, 'bat': 68, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 71198, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5-phev', 'brand': 'BMW', 'name': 'X5 xDrive45e PHEV', 'v': '(210kW) (5d) 394pk', 'fuel': 'Plug-in hybride', 'verbrEl': 22.3, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 27, 'power': 290, 'acc': 5.6, 'koffer': 500, 'cilinder': 2998, 'bat': 21.6, 'tank': 69, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 81200, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':199 },
{ 'segment': 'E', 'id': 'volvo-s90-t6-momentum', 'brand': 'Volvo', 'name': 'S90', 'v': 'Momentum T4 Geartronic  (4d) 190pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 140, 'acc': 7.8, 'koffer': 500, 'cilinder': 1969, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 50500, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3', 'brand': 'BMW', 'name': '320i Touring', 'v': 'xDrive (135 kW) (5d) 184pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 135, 'acc': 7.9, 'koffer': 495, 'cilinder': 1998, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 42600, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-panamera-benz', 'brand': 'Porsche', 'name': 'Panamera', 'v': '3.0 V6 4 330pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 243, 'acc': 5.5, 'koffer': 495, 'cilinder': 2995, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 97986, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-panamera-dies', 'brand': 'Porsche', 'name': 'Panamera', 'v': '4.0 4s 422pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 176, 'power': 310, 'acc': 4.5, 'koffer': 495, 'cilinder': 3956, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 122670, 'pk': 20, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'peugeot-traveller-75', 'brand': 'Peugeot', 'name': 'Traveller (75 kWh)', 'v': '75kWh Standard Business (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 21.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 560, 'acc': 13.1, 'koffer': 447, 'cilinder': 0, 'bat': 68, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 57550, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-sportage', 'brand': 'KIA', 'name': 'Sportage', 'v': 'Sense 1.6 T AWD DCT7 (5d) 177pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 130, 'acc': 9.1, 'koffer': 491, 'cilinder': 1591, 'bat': 0, 'tank': 62, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 36940, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': '0', 'brand': 'Suzuki', 'name': 'Across', 'v': '0', 'fuel': 'Plug-in hybride', 'verbrEl': 24.1, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 174, 'acc': 0, 'koffer': 490, 'cilinder': 0, 'bat': 18.1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 65000, 'pk': 0, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-4', 'brand': '&Scaron;koda', 'name': 'Octavia PHEV', 'v': '1.4 TSI PHEV 150kW DSG6 Clever+ (5d) 204pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.8, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 150, 'acc': 7.8, 'koffer': 490, 'cilinder': 1395, 'bat': 10.4, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 44650, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-gle-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'GLE PHEV', 'v': '350de 4MATIC Business Solution (5d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 31.8, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 235, 'acc': 6.8, 'koffer': 490, 'cilinder': 1950, 'bat': 31.2, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 84579, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-gle-phev', 'brand': 'Mercedes-Benz', 'name': 'GLE PHEV', 'v': '300e 4MATIC (5d) 333pk', 'fuel': 'Plug-in hybride', 'verbrEl': 31.8, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 21, 'power': 245, 'acc': 6.9, 'koffer': 490, 'cilinder': 1991, 'bat': 31.2, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 78650, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-sport', 'brand': 'Land', 'name': 'Rover Range Rover Sport', 'v': '2.0 SD4 SE (5d) 240pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 177, 'acc': 8.3, 'koffer': 489, 'cilinder': 1999, 'bat': 0, 'tank': 72, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 54, 'price': 69200, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508-phev', 'brand': 'Peugeot', 'name': '508 PHEV', 'v': '1.6 Hybrid 225 e-EAT8 GT (5d) 225pk', 'fuel': 'Plug-in hybride', 'verbrEl': 23.5, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 265, 'acc': 5.2, 'koffer': 487, 'cilinder': 1598, 'bat': 11.5, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 49550, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-mustang-mache-extended', 'brand': 'Ford', 'name': ' Mustang Mach-E Standard Range', 'v': '76kWh Standard Range RWD (5d) 269pk', 'fuel': 'Elektrisch', 'verbrEl': 17.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 216, 'acc': 6, 'koffer': 502, 'cilinder': 0, 'bat': 68, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 48000, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-e-tron-32', 'brand': 'Audi', 'name': 'e-tron 50', 'v': '50 Quattro Advanced (5d) 313pk', 'fuel': 'Elektrisch', 'verbrEl': 22.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 230, 'acc': 6.8, 'koffer': 660, 'cilinder': 0, 'bat': 64.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 72930, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-phev', 'brand': '&Scaron;koda', 'name': 'Superb IV PHEV', 'v': 'Ambition TSI iV 160kW DSG6 (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.8, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 28, 'power': 160, 'acc': 7.7, 'koffer': 485, 'cilinder': 1395, 'bat': 10.4, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 43360, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat-gte-variant', 'brand': 'Volkswagen', 'name': 'Passat Variant GTE', 'v': '1.4 TSI DSG6 GTE (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.3, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 160, 'acc': 7.6, 'koffer': 483, 'cilinder': 1395, 'bat': 13, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 49210, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi-4', 'brand': '&Scaron;koda', 'name': 'Octavia Combi G-Tec', 'v': 'Ambition 1.5 TGI 96kW DSG 7 (5d) 131pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 96, 'power': 96, 'acc': 10, 'koffer': 480, 'cilinder': 1498, 'bat': 0, 'tank': 50, 'tankcng': 15, 'tankfcev': 0, 'ecoscore': 80, 'price': 30880, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a5', 'brand': 'Audi', 'name': 'A5 Sportback', 'v': '2.0 TDI 100kW S Tronic  Business Edition (5d) 136pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 100, 'acc': 8.9, 'koffer': 480, 'cilinder': 1968, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 39335, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-e-break-phev', 'brand': 'Mercedes-Benz', 'name': 'E-Klasse Break', 'v': '300e Business Solution (5d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 17.6, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 40, 'power': 225, 'acc': 6, 'koffer': 480, 'cilinder': 1950, 'bat': 13.5, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 69454, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-e-break-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'E-klasse Break PHEV', 'v': '300de Business Solution (5d) 306pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21.6, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 225, 'acc': 6, 'koffer': 480, 'cilinder': 1950, 'bat': 10.8, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 71269, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'land-rover-range-rover-evoque-phev', 'brand': 'Land', 'name': 'Rover Range Rover Evoque PHEV', 'v': 'P300e PHEV AWD Auto S (5d) 309pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 227, 'acc': 6.4, 'koffer': 472, 'cilinder': 1497, 'bat': 15, 'tank': 57, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 57400, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'renault-kadjar', 'brand': 'Renault', 'name': 'Kadjar', 'v': 'Intens 1.5 Energy dCi 110 EDC (5d) 110pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 99, 'power': 81, 'acc': 11.7, 'koffer': 472, 'cilinder': 1461, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 30350, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x2-phev', 'brand': 'BMW', 'name': 'X2 xDrive25e PHEV', 'v': '(162kW) (5d) 220pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.4, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 162, 'acc': 9.6, 'koffer': 470, 'cilinder': 1499, 'bat': 10, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 47350, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-sportstourer-phev', 'brand': 'SEAT', 'name': 'Leon Sportstourer PHEV', 'v': '1.4 e-Hybrid PHEV 204 FR DSG (5d) 204pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21.3, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 27, 'power': 150, 'acc': 7.7, 'koffer': 470, 'cilinder': 1395, 'bat': 12.8, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 35730, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308', 'brand': 'Peugeot', 'name': '308', 'v': 'Allure 1.5 BlueHDi 130 DPF S&S EAT8  (5d) 130pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 93, 'power': 96, 'acc': 9.4, 'koffer': 470, 'cilinder': 1499, 'bat': 0, 'tank': 52, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 29740, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'bmw-2', 'brand': 'BMW', 'name': '220d Active Tourer ', 'v': '(140kW) (5d) 190pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 140, 'acc': 7.6, 'koffer': 468, 'cilinder': 1995, 'bat': 0, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 35800, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-t6-phev', 'brand': 'Volvo', 'name': 'XC60 T6 Recharge', 'v': 'Geartronic Inscription (5d) 341pk', 'fuel': 'Plug-in hybride', 'verbrEl': 17.8, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 42, 'power': 251, 'acc': 5.9, 'koffer': 468, 'cilinder': 1969, 'bat': 11.6, 'tank': 70, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 66200, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':181 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-t8-phev', 'brand': 'Volvo', 'name': 'XC60 T8 Recharge', 'v': 'Geartronic Inscription (5d) 392pk', 'fuel': 'Plug-in hybride', 'verbrEl': 17.8, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 42, 'power': 288, 'acc': 5.5, 'koffer': 468, 'cilinder': 1969, 'bat': 9.6, 'tank': 70, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 72250, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':181 },
{ 'segment': 'E', 'id': 'volvo-s90-t8-phev', 'brand': 'Volvo', 'name': 'S90 T8 Recharge', 'v': 'Geartronic Inscription (4d) 392pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.3, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 288, 'acc': 5.1, 'koffer': 461, 'cilinder': 1969, 'bat': 9.6, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 72640, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'hyundai-nexo-fcev', 'brand': 'Hyundai', 'name': 'NEXO', 'v': 'FCEV #1 (5d) 163pk', 'fuel': 'Waterstof', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0.9, 'co2': 0, 'power': 120, 'acc': 9.5, 'koffer': 461, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 6, 'ecoscore': 79, 'price': 81999, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mercedes-cla', 'brand': 'Mercedes-Benz', 'name': 'CLA-klasse', 'v': '200 d DCT (4d) 136pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 110, 'acc': 8.3, 'koffer': 460, 'cilinder': 1950, 'bat': 0, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 36421, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-e-tron-sportback', 'brand': 'Audi', 'name': 'e-tron Sportback 50', 'v': '50 Quattro Advanced (5d) 313pk', 'fuel': 'Elektrisch', 'verbrEl': 21.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 230, 'acc': 6.8, 'koffer': 615, 'cilinder': 0, 'bat': 64.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 74940, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-captur-dies', 'brand': 'Renault', 'name': 'Captur', 'v': 'Intens dCi 90 EDC (5d) 90pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 66, 'acc': 13.8, 'koffer': 455, 'cilinder': 1461, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 25275, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-captur-benz', 'brand': 'Renault', 'name': 'Captur', 'v': 'Energy TCi 150 EDC S-Edition (5d) 150pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 118, 'power': 110, 'acc': 9.2, 'koffer': 455, 'cilinder': 1332, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 25600, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mitsubishi-outlander-phev', 'brand': 'Mitsubishi', 'name': 'Outlander PHEV', 'v': '2.4 PHEV 4WD Instyle SDA AT (5d) 224pk', 'fuel': 'Plug-in hybride', 'verbrEl': 30.7, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 46, 'power': 165, 'acc': 10.5, 'koffer': 451, 'cilinder': 2360, 'bat': 13.8, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 54740, 'pk': 13, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-ev-64', 'brand': 'KIA', 'name': 'e-Niro 64 kWh', 'v': 'Must 150kW (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 15.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.8, 'koffer': 451, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 42940, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-soul-ev-64', 'brand': 'KIA', 'name': 'e-Soul 64 kWh', 'v': 'Must (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 15.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.9, 'koffer': 224, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 41590, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-ev-64', 'brand': 'Hyundai', 'name': 'Kona Electric 64 kWh', 'v': 'Twist TechnoPack PowerPack (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 14.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.6, 'koffer': 544, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 46499, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'seat-tarraco-phev', 'brand': 'SEAT', 'name': 'Tarraco PHEV', 'v': '1.4 TSI PHEV FR DSG (5d) 245pk', 'fuel': 'Plug-in hybride', 'verbrEl': 26.7, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 150, 'acc': 7.7, 'koffer': 450, 'cilinder': 1400, 'bat': 12.8, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 48750, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x1-phev', 'brand': 'BMW', 'name': 'X1 xDrive25e PHEV', 'v': '(162 kW) (5d) 220pk', 'fuel': 'Plug-in hybride', 'verbrEl': 13.8, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 40, 'power': 162, 'acc': 6.9, 'koffer': 450, 'cilinder': 1499, 'bat': 10, 'tank': 36, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 46350, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-phev', 'brand': 'BMW', 'name': 'X3 xDrive30e PHEV', 'v': '(120 kW) (5d) 272pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.6, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 44, 'power': 200, 'acc': 6.1, 'koffer': 450, 'cilinder': 1998, 'bat': 11.2, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 58150, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-s', 'brand': 'MINI', 'name': 'Countryman', 'v': 'SD ALL4 (140 kW) (5d) 190pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 140, 'acc': 7.6, 'koffer': 450, 'cilinder': 1995, 'bat': 0, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 38350, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mercedes-gla-phev', 'brand': 'Mercedes-Benz', 'name': 'GLA PHEV', 'v': '250e (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 17.4, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 32, 'power': 160, 'acc': 6.8, 'koffer': 450, 'cilinder': 1332, 'bat': 15.6, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 45617, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mercedes-cla-phev', 'brand': 'Mercedes-Benz', 'name': 'CLA Coup&eacute; PHEV', 'v': '250e (4d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 23, 'power': 160, 'acc': 6.9, 'koffer': 450, 'cilinder': 1332, 'bat': 10.8, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 43923, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-defender-110-phev', 'brand': 'Land', 'name': 'Rover Defender 110 PHEV', 'v': 'P400e S (5d) 404pk', 'fuel': 'Plug-in hybride', 'verbrEl': 34.8, 'verbrBr': 9.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 76, 'power': 105, 'acc': 8.2, 'koffer': 448, 'cilinder': 1997, 'bat': 19.2, 'tank': 90, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 78300, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':188 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-60', 'brand': '&Scaron;koda', 'name': 'ENYAQ iV 60', 'v': '60kWh (5d) 180pk', 'fuel': 'Elektrisch', 'verbrEl': 15.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 132, 'acc': 8.7, 'koffer': 585, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 38500, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-id3-1st', 'brand': 'Volkswagen', 'name': 'ID.3 1ST', 'v': '1ST Plus (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 15.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.3, 'koffer': 385, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 43750, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-sport-phev', 'brand': 'Land', 'name': 'Rover Range Rover Sport PHEV', 'v': 'P400e SE (5d) 404pk', 'fuel': 'Plug-in hybride', 'verbrEl': 24.5, 'verbrBr': 8.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 73, 'power': 297, 'acc': 6.7, 'koffer': 446, 'cilinder': 1997, 'bat': 13, 'tank': 90, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 92500, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':219 },
{ 'segment': 'SUV-B', 'id': 'dacia-duster', 'brand': 'Dacia', 'name': 'Duster', 'v': 'Comfort 1.5 dCi 110 EDC (5d) 109pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 116, 'power': 80, 'acc': 11.9, 'koffer': 445, 'cilinder': 1461, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 18700, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'vw-t-roc', 'brand': 'Volkswagen', 'name': 'T-Roc', 'v': 'Style 1.5 TSI ACT DSG  (5d) 150pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 110, 'acc': 8.4, 'koffer': 445, 'cilinder': 1498, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 28530, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-sporswagon-phev', 'brand': 'KIA', 'name': 'Ceed Sportswagon PHEV', 'v': 'Sense 1.6 GDi DCT ISG (5d) 141pk', 'fuel': 'Plug-in hybride', 'verbrEl': 17.8, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 104, 'acc': 10.8, 'koffer': 437, 'cilinder': 1580, 'bat': 8.9, 'tank': 37, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 36790, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-shooting-brake-phev', 'brand': 'Volkswagen', 'name': 'Arteon Shooting Break eHybrid', 'v': '1.4 eHybrid Elegance Shooting Brake (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21.3, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 160, 'acc': 7.1, 'koffer': 435, 'cilinder': 1332, 'bat': 13, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 53570, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'mercedes-b', 'brand': 'Mercedes-Benz', 'name': 'B-klasse', 'v': 'B2020 d 120kW (5d) 163pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 140, 'acc': 7.2, 'koffer': 430, 'cilinder': 1950, 'bat': 0, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 40898, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw5-touring-phev', 'brand': 'BMW', 'name': '530e Touring PHEV', 'v': '530e Auto (5d) 292pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 35, 'power': 215, 'acc': 6.1, 'koffer': 430, 'cilinder': 1998, 'bat': 10.4, 'tank': 46, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 63700, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-touring-phev', 'brand': 'BMW', 'name': '330e Touring', 'v': '330e (215 kW) (5d) 292pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.7, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 200, 'acc': 6.6, 'koffer': 430, 'cilinder': 1998, 'bat': 10.4, 'tank': 46, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 52350, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'nissan-qashqai-dies', 'brand': 'Nissan', 'name': 'Qashqai', 'v': 'Business Edition Xtronic 1.6 dCi (5d) 130pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 96, 'acc': 11.1, 'koffer': 430, 'cilinder': 1598, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 32810, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'nissan-qashqai-benz', 'brand': 'Nissan', 'name': 'Qashqai', 'v': 'Business Edition Xtronic 1.2 DIG-T (5d) 115pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 85, 'acc': 12.9, 'koffer': 430, 'cilinder': 1197, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 28910, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro', 'brand': 'KIA', 'name': 'Niro', 'v': 'Fusion 1.6 GDi HEV 6DCT (5d) 141pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 3.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 86, 'power': 104, 'acc': 11.5, 'koffer': 427, 'cilinder': 1580, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 30040, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'audi-a3-dies', 'brand': 'Audi', 'name': 'A3 Berline', 'v': 'Tronic Design 1.6 TDi 85kW S (4d) 116pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 103, 'power': 85, 'acc': 10.4, 'koffer': 425, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 31180, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'audi-a3-benz', 'brand': 'Audi', 'name': 'A3 Berline', 'v': 'Tronic Design 1.0 TFSi 85kW S (4d) 116pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 85, 'acc': 9.9, 'koffer': 425, 'cilinder': 999, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 29930, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-id3-pro', 'brand': 'Volkswagen', 'name': 'ID.3 Pro (58 kWh)', 'v': '58 kWh Pro Life (5d) 204pk', 'fuel': 'Elektrisch', 'verbrEl': 15.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.3, 'koffer': 385, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 37710, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'nissan-leaf-e-plus', 'brand': 'Nissan', 'name': 'LEAF e+', 'v': 'N-Connecta 62 kWh (5d) 217pk', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 160, 'acc': 6.9, 'koffer': 400, 'cilinder': 0, 'bat': 56, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 43490, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'renault-zoe', 'brand': 'Renault', 'name': 'ZOE', 'v': 'Zen B-buy R110 (5d) 109pk', 'fuel': 'Elektrisch', 'verbrEl': 17.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 80, 'acc': 11.4, 'koffer': 338, 'cilinder': 0, 'bat': 52, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 34100, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-golf-sportwagon', 'brand': 'Volkswagen', 'name': 'Golf Variant TGI', 'v': '1.4 TGi BlueMotion 96kW Comfortline DSG (5d) 131pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 95, 'power': 96, 'acc': 10.9, 'koffer': 424, 'cilinder': 1498, 'bat': 0, 'tank': 50, 'tankcng': 15, 'tankfcev': 0, 'ecoscore': 80, 'price': 27810, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'lexus-ux300e', 'brand': 'Lexus', 'name': 'UX 300e', 'v': '0', 'fuel': 'Elektrisch', 'verbrEl': 16.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.5, 'koffer': 367, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 49990, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'jeep-renegade-phev', 'brand': 'Jeep', 'name': 'Renegade 4xE ', 'v': '1.3 Turbo T4 190 4xe ATX Trailhawk (5d) 240pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.5, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 51, 'power': 177, 'acc': 7.3, 'koffer': 420, 'cilinder': 1332, 'bat': 11.4, 'tank': 37, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 38800, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'bmw-745e-phev', 'brand': 'BMW', 'name': '745e Berline PHEV', 'v': '745e (4d) 394pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.1, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 290, 'acc': 5.2, 'koffer': 420, 'cilinder': 2998, 'bat': 10.4, 'tank': 46, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 105800, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':174 },
{ 'segment': 'C', 'id': 'mercedes-a-berline-phev', 'brand': 'Mercedes-Benz', 'name': 'A-klasse Berline PHEV', 'v': 'Limousine A 250 e (4d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 160, 'acc': 6.7, 'koffer': 420, 'cilinder': 1332, 'bat': 15.6, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 41382, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'tesla-model3-sr-plus', 'brand': 'Tesla', 'name': 'Model 3 Standard Range Plus', 'v': 'RWD Plus (4d) 306pk', 'fuel': 'Elektrisch', 'verbrEl': 14.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 225, 'acc': 5.6, 'koffer': 425, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 51470, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'fiat-500l-benz', 'brand': 'Fiat', 'name': '500L', 'v': 'Business 1.3 Mjet 95CH/PK MTA (5d) 95pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 70, 'acc': 14.8, 'koffer': 412, 'cilinder': 1248, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 22000, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q8-phev', 'brand': 'Audi', 'name': 'Q8', 'v': '55 TFSI e quattro tiptronic (5d) 381pk', 'fuel': 'Plug-in hybride', 'verbrEl': 25.1, 'verbrBr': 8.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 66, 'power': 215, 'acc': 5.9, 'koffer': 410, 'cilinder': 1998, 'bat': 17.8, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 78640, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':210 },
{ 'segment': 'SUV-B', 'id': 'citroen-c3-aircross', 'brand': 'Citro&euml;n', 'name': 'C3 Aircross', 'v': 'Shine 1.2 PureTech 110 S&S EAT6 (5d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 81, 'acc': 10.7, 'koffer': 410, 'cilinder': 1199, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 22955, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'opel-crossland-x', 'brand': 'Opel', 'name': 'Crossland X', 'v': 'Innovation 1.2 81kW Turbo S/S Auto (5d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 81, 'acc': 11.8, 'koffer': 410, 'cilinder': 1199, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 23450, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-dies', 'brand': 'Peugeot', 'name': '2008', 'v': 'Line 1.5 BlueHDi 88kW EAT6 GT(5d) 120pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 88, 'acc': 10.4, 'koffer': 410, 'cilinder': 1499, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 26640, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-benz', 'brand': 'Peugeot', 'name': '2008', 'v': 'Line 1.2 Puretech 81kW S&S EAT6 GT (5d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 81, 'acc': 11.6, 'koffer': 410, 'cilinder': 1199, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 24895, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'citroen-e-spacetourer-50', 'brand': 'Citro&euml;n', 'name': '&Euml;-Spacetourer (50 kWh)', 'v': 'M 50 kWh Feel (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 25.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 12.1, 'koffer': 507, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 54500, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'peugeot-traveller-50', 'brand': 'Peugeot', 'name': 'Traveller (50 kWh)', 'v': '50kWh Standard Business (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 20.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 11.9, 'koffer': 603, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 51550, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-kuga', 'brand': 'Ford', 'name': 'Kuga', 'v': 'Businessclass 2.0 TDCi 4x2 88kW PS (5d) 120pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 161, 'power': 88, 'acc': 13.4, 'koffer': 406, 'cilinder': 1997, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 32200, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'audi-q2', 'brand': 'Audi', 'name': 'Q2', 'v': 'S Tronic Design 1.6 30 TDI 85kW (5d) 116pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 118, 'power': 85, 'acc': 10.5, 'koffer': 405, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 30620, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-t4-phev', 'brand': 'Volvo', 'name': 'XC40 T4 Recharge', 'v': 'Geartronic Inscription (5d) 211p', 'fuel': 'Plug-in hybride', 'verbrEl': 15.7, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 155, 'acc': 8.5, 'koffer': 405, 'cilinder': 1477, 'bat': 10.3, 'tank': 48, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 49630, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-panamera-phev', 'brand': 'Porsche', 'name': 'Panamera E-Hybrid', 'v': '2.9 (5d) 462pk', 'fuel': 'Plug-in hybride', 'verbrEl': 26.6, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 51, 'power': 340, 'acc': 4.6, 'koffer': 405, 'cilinder': 2894, 'bat': 14.1, 'tank': 80, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 112748, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':205 },
{ 'segment': 'SUV-C', 'id': 'ford-kuga-phev', 'brand': 'Ford', 'name': 'Kuga PHEV', 'v': '2.5i PHEV Aut. 165kW Trend (5d) 224pk', 'fuel': 'Plug-in hybride', 'verbrEl': 28.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 165, 'acc': 9.2, 'koffer': 405, 'cilinder': 2499, 'bat': 14.4, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 38650, 'pk': 13, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-phev', 'brand': 'MINI', 'name': 'Cooper Countryman PHEV', 'v': 'SE ALL4 (5d) 220pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.4, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 40, 'power': 165, 'acc': 6.8, 'koffer': 405, 'cilinder': 1499, 'bat': 10, 'tank': 36, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 40650, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'opel-zafira-e-life-50', 'brand': 'Opel', 'name': 'Zafira E Life (50 kWh)', 'v': '50 kWh L2H1 e-Elegance (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 20.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 13.3, 'koffer': 487, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 65198, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ds-ds3-crossback-e-tense', 'brand': 'DS', 'name': 'DS 3 Crossback E-Tense', 'v': 'Performance Line (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 17.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 8.7, 'koffer': 350, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 39250, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'mercedes-b-sportstourer-phev', 'brand': 'Mercedes-Benz', 'name': 'B-Klasse Sportstourer PHEV', 'v': 'B 250 e (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 18, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 150, 'acc': 6.8, 'koffer': 405, 'cilinder': 1332, 'bat': 15.6, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 41624, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mercedes-cla-shooting-brake-phev', 'brand': 'Mercedes-Benz', 'name': 'CLA Shooting Brake PHEV', 'v': '250e (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.4, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 160, 'acc': 6.8, 'koffer': 405, 'cilinder': 1332, 'bat': 10.8, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 45133, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-t5-phev', 'brand': 'Volvo', 'name': 'XC40 T5 Recharge', 'v': 'Geartronic Inscription (5d) 261pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.2, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 192, 'acc': 7.3, 'koffer': 405, 'cilinder': 1477, 'bat': 9.6, 'tank': 48, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 50730, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat-gte', 'brand': 'Volkswagen', 'name': 'Passat GTE', 'v': '1.4 TSI E-Motor  218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.8, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 160, 'acc': 7.4, 'koffer': 402, 'cilinder': 1395, 'bat': 13, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 46760, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'bmw-2phev', 'brand': 'BMW', 'name': '225xe Active Tourer PHEV', 'v': '225xe (5d) 224pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 52, 'power': 165, 'acc': 6.7, 'koffer': 400, 'cilinder': 1499, 'bat': 7.7, 'tank': 36, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 41100, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':132 },
{ 'segment': 'SUV-B', 'id': 'opel-mokka-e', 'brand': 'Opel', 'name': 'Mokka e', 'v': 'e-Elegance (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 17.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 12.1, 'koffer': 310, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 37500, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'opel-corsa-e', 'brand': 'Opel', 'name': 'Corsa-e', 'v': 'Corsa Auto Elegance (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 8.1, 'koffer': 267, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 33095, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra-sw', 'brand': 'Opel', 'name': 'Astra Sports Tourer', 'v': '1.4 Turbo 81kW ECOTEC CNG Innovation (5d) 110pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 116, 'power': 81, 'acc': 12.3, 'koffer': 397, 'cilinder': 1399, 'bat': 0, 'tank': 13, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 78, 'price': 27125, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'fiat-500l-cng', 'brand': 'Fiat', 'name': '500L (CNG)', 'v': 'Lounge (5d) 80pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 105, 'power': 59, 'acc': 15.7, 'koffer': 396, 'cilinder': 875, 'bat': 0, 'tank': 50, 'tankcng': 14, 'tankfcev': 0, 'ecoscore': 78, 'price': 22900, 'pk': 5, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'peugeot-3008-phev', 'brand': 'Peugeot', 'name': '3008 PHEV', 'v': 'Hybrid 225 e-Auto8 GT (5d) 225pk', 'fuel': 'Plug-in hybride', 'verbrEl': 26.4, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 165, 'acc': 8.7, 'koffer': 395, 'cilinder': 1598, 'bat': 11.6, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 49330, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'GLC PHEV', 'v': '300de 4MATIC (5d) 306pk', 'fuel': 'Plug-in hybride', 'verbrEl': 24, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 46, 'power': 225, 'acc': 6.2, 'koffer': 395, 'cilinder': 1950, 'bat': 10.8, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 64130, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-s60-t8-phev', 'brand': 'Volvo', 'name': 'S60 T8 Recharge', 'v': 'Geartronic Inscription (4d) 392pk', 'fuel': 'Plug-in hybride', 'verbrEl': 18.8, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 288, 'acc': 4.6, 'koffer': 391, 'cilinder': 1969, 'bat': 9.6, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 58450, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a5-sportback-gtron', 'brand': 'Audi', 'name': 'A5 Sportback g-tron', 'v': '2.0 TFSI CNG S tronic (5d) 170pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 125, 'acc': 8.4, 'koffer': 390, 'cilinder': 1984, 'bat': 0, 'tank': 7, 'tankcng': 17, 'tankfcev': 0, 'ecoscore': 78, 'price': 42800, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'audi-a8-phev', 'brand': 'Audi', 'name': 'A8', 'v': 'TFSI e 60 TFSI e quattro (4d) 449pk', 'fuel': 'Plug-in hybride', 'verbrEl': 21.2, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 50, 'power': 330, 'acc': 4.9, 'koffer': 390, 'cilinder': 2995, 'bat': 14.1, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 107100, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':190 },
{ 'segment': 'E', 'id': 'audi-a6-avant-phev', 'brand': 'Audi', 'name': 'A6 Avant', 'v': 'Competition 55 TFSI e quattro S tronic (5d)', 'fuel': 'Plug-in hybride', 'verbrEl': 17.6, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 250, 'acc': 4.9, 'koffer': 390, 'cilinder': 2995, 'bat': 14.1, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 74620, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'opel-grandland-x-phev', 'brand': 'Opel', 'name': 'Grandland X', 'v': '1.6 Turbo S/S Hybrid Ultimate (5d) 225pk', 'fuel': 'Plug-in hybride', 'verbrEl': 17.8, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 32, 'power': 165, 'acc': 8.9, 'koffer': 390, 'cilinder': 1598, 'bat': 11.6, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 46350, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'peugeot-e-208', 'brand': 'Peugeot', 'name': 'e-208', 'v': 'Allure (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 16.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 8.1, 'koffer': 311, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 34150, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'citroen-e-c4', 'brand': 'Citro&euml;n', 'name': '&Euml;-C4', 'v': '50 kWh Feel (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 14.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.7, 'koffer': 380, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 35600, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-ev', 'brand': 'Peugeot', 'name': 'e-2008', 'v': 'Allure (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 8.5, 'koffer': 405, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 38870, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane', 'brand': 'Renault', 'name': 'M&eacute;gane Berline', 'v': 'Energy 1.2TCe 130 EDC Bose Edition (5d) 132pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 97, 'acc': 10.8, 'koffer': 384, 'cilinder': 1197, 'bat': 0, 'tank': 47, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 27375, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-golf-ehybrid', 'brand': 'Volkswagen', 'name': 'Golf eHybrid', 'v': '1.4 eHybrid Style DSG (5d) 204pk', 'fuel': 'Plug-in hybride', 'verbrEl': 18.3, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 21, 'power': 150, 'acc': 7.4, 'koffer': 381, 'cilinder': 1395, 'bat': 13, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 39850, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mg-zs-ev', 'brand': 'MG', 'name': 'ZS EV', 'v': 'Luxury (5d) 44,5kWh 143pk', 'fuel': 'Elektrisch', 'verbrEl': 18.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 165, 'acc': 10.5, 'koffer': 451, 'cilinder': 0, 'bat': 42.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 32985, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-golf-gte', 'brand': 'Volkswagen', 'name': 'Golf GTE', 'v': '1.4 TSI E-Motor 204pk', 'fuel': 'Plug-in hybride', 'verbrEl': 11.4, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 150, 'acc': 7.6, 'koffer': 380, 'cilinder': 1395, 'bat': 8.7, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 41175, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-benz', 'brand': 'SEAT', 'name': 'Leon', 'v': 'Style 1.6 CRTDI 85kW DSG  (5d) 115pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 89, 'power': 85, 'acc': 10.4, 'koffer': 380, 'cilinder': 1968, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 26335, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-cng', 'brand': 'SEAT', 'name': 'Leon (CNG)', 'v': 'Style 1.5 TGI 96kW (5d) 110pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 96, 'power': 81, 'acc': 10.9, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 9, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 81, 'price': 24090, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-golf-dies', 'brand': 'Volkswagen', 'name': 'Golf VII', 'v': 'Comfortline 1.6 TDi 85kW  DSG (3d) 115pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 85, 'acc': 10.5, 'koffer': 380, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 27690, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-golf-benz', 'brand': 'Volkswagen', 'name': 'Golf VII', 'v': 'Comfortline 1.0 TSi 81kW DSG (3d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 81, 'acc': 9.9, 'koffer': 380, 'cilinder': 999, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 24870, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-s60', 'brand': 'Volvo', 'name': 'S60', 'v': 'Momentum D3 Geartronic eco (4d) 150pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 109, 'power': 110, 'acc': 9, 'koffer': 380, 'cilinder': 1969, 'bat': 0, 'tank': 68, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 37620, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'toyota-c-hr', 'brand': 'Toyota', 'name': 'C-HR', 'v': 'C-Business Plus 1.8 VVT i-Hybrid Aut. (5d) 122pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 86, 'power': 90, 'acc': 11, 'koffer': 377, 'cilinder': 1798, 'bat': 0, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 30290, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-330e-iperformance', 'brand': 'BMW', 'name': '330e Berline PHEV', 'v': '330e (135 kW)  (4d) 292pk', 'fuel': 'Plug-in hybride', 'verbrEl': 60, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 215, 'acc': 6.8, 'koffer': 375, 'cilinder': 1998, 'bat': 10.4, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 50750, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':149 },
{ 'segment': 'E', 'id': 'mercedes-e-berline-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'E-klasse Berline PHEV', 'v': '300de (4d) 306pk', 'fuel': 'Plug-in hybride', 'verbrEl': 20.8, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 32, 'power': 225, 'acc': 5.9, 'koffer': 370, 'cilinder': 1950, 'bat': 10.8, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 65219, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-e-berline-phev', 'brand': 'Mercedes-Benz', 'name': 'E-klasse Berline PHEV', 'v': '300e (4d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 20.4, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 235, 'acc': 5.7, 'koffer': 370, 'cilinder': 1991, 'bat': 13.5, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 63404, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mercedes-a', 'brand': 'Mercedes-Benz', 'name': 'A-klasse ', 'v': '180 DCT (5d) 136pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 100, 'acc': 8.8, 'koffer': 370, 'cilinder': 1332, 'bat': 0, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 29282, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra', 'brand': 'Opel', 'name': 'Astra', 'v': 'Dynamic 1.4 Turbo 110kW S/S (5d) 150pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 110, 'acc': 8.9, 'koffer': 370, 'cilinder': 1399, 'bat': 0, 'tank': 48, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 27150, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-ev-39', 'brand': 'KIA', 'name': 'e-Niro 39 kWh', 'v': 'Must 100kW (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 15.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.8, 'koffer': 451, 'cilinder': 0, 'bat': 39.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 39040, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-ev-39', 'brand': 'Hyundai', 'name': 'Kona Electric 39 kWh', 'v': 'Twist TechnoPack (5d) 136 pk', 'fuel': 'Elektrisch', 'verbrEl': 14.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.7, 'koffer': 544, 'cilinder': 0, 'bat': 39.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 40999, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona', 'brand': 'Hyundai', 'name': 'Kona', 'v': '1.6 T-GDI 4WD Urban (5d) 177pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 130, 'acc': 7.7, 'koffer': 361, 'cilinder': 1591, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 26599, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-mirai', 'brand': 'Toyota', 'name': 'Mirai', 'v': 'Berline (154 PK) e-CVT', 'fuel': 'Waterstof', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 1, 'co2': 0, 'power': 113, 'acc': 9.6, 'koffer': 361, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 5, 'ecoscore': 79, 'price': 79900, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-1', 'brand': 'BMW', 'name': '120i', 'v': '(165 kW) (5d) 224pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 134, 'power': 135, 'acc': 7.1, 'koffer': 360, 'cilinder': 1998, 'bat': 0, 'tank': 52, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 30850, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-prius-phev', 'brand': 'Toyota', 'name': 'Prius PHEV', 'v': '1.8 VVT-i PHEV Hybrid Business (5d) 122pk', 'fuel': 'Plug-in hybride', 'verbrEl': 14, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 90, 'acc': 11.1, 'koffer': 360, 'cilinder': 1798, 'bat': 8.8, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 43935, 'pk': 10, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'opel-mokka-x', 'brand': 'Opel', 'name': 'Mokka X', 'v': '1.6 CDTI Aut. Innovation (5d) 136pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 100, 'acc': 10.9, 'koffer': 356, 'cilinder': 1598, 'bat': 0, 'tank': 52, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 29150, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'seat-ibiza-benz', 'brand': 'SEAT', 'name': 'Ibiza', 'v': 'Style 1.0 TSI 115pk S&S DSG (5d) 115pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 109, 'power': 85, 'acc': 9.5, 'koffer': 355, 'cilinder': 999, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 20680, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-soul', 'brand': 'KIA', 'name': 'Soul Max', 'v': '1.6 CRDi DCT (5d) 136pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 100, 'acc': 11.1, 'koffer': 354, 'cilinder': 1582, 'bat': 0, 'tank': 54, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 27390, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'vw-polo-dies', 'brand': 'Volkswagen', 'name': 'Polo', 'v': 'Comfortline 1.6 TDI 70kW DSG 7 (5d) 95pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 103, 'power': 70, 'acc': 11.2, 'koffer': 351, 'cilinder': 1598, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 21100, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'vw-polo-benz', 'brand': 'Volkswagen', 'name': 'Polo', 'v': 'Comfortline 1.0 TSI  DSG (5d) 95pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 105, 'power': 70, 'acc': 10.8, 'koffer': 351, 'cilinder': 999, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 19300, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-coupe-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'GLC Coup&eacute; PHEV', 'v': '300de 4MATIC (5d) 306pk', 'fuel': 'Plug-in hybride', 'verbrEl': 24, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 45, 'power': 225, 'acc': 6.2, 'koffer': 350, 'cilinder': 1950, 'bat': 10.8, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 67155, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq-electric', 'brand': 'Hyundai', 'name': 'IONIQ Electric', 'v': 'Shine (5d) 136pk', 'fuel': 'Elektrisch', 'verbrEl': 13.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.9, 'koffer': 455, 'cilinder': 0, 'bat': 38.3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 42099, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-phev', 'brand': 'KIA', 'name': 'Niro PHEV', 'v': 'Sense 1.6 GDi PHEV 6DCT (5d) 141pk', 'fuel': 'Plug-in hybride', 'verbrEl': 14.8, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 104, 'acc': 11.5, 'koffer': 344, 'cilinder': 1580, 'bat': 8.9, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 38590, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-prius', 'brand': 'Toyota', 'name': 'Prius', 'v': 'Business 1.8 VVT-i (5d) 122pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 3.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 78, 'power': 90, 'acc': 10.6, 'koffer': 343, 'cilinder': 1798, 'bat': 0, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 31580, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'nissan-e-nv200-evalia', 'brand': 'Nissan', 'name': 'e-Evalia', 'v': 'Connect Edition (5d) 109pk', 'fuel': 'Elektrisch', 'verbrEl': 25.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 80, 'acc': 14, 'koffer': 1850, 'cilinder': 0, 'bat': 38, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 45096, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'skoda-fabia', 'brand': '&Scaron;koda', 'name': 'Fabia', 'v': 'Ambition 1.0 TSI 81kW DSG7 (5d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 106, 'power': 81, 'acc': 9.8, 'koffer': 330, 'cilinder': 999, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 18485, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'hyundai-i20', 'brand': 'Hyundai', 'name': 'i20', 'v': 'Twist 1.4 74kW Aut. (5d) 100pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 74, 'acc': 13.2, 'koffer': 326, 'cilinder': 1368, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 17549, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'volvo-v40', 'brand': 'Volvo', 'name': 'V40', 'v': 'Black Edition T2 Geartronic (5d) 122pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 90, 'acc': 9.8, 'koffer': 324, 'cilinder': 1498, 'bat': 0, 'tank': 62, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 23895, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'dacia-sandero', 'brand': 'Dacia', 'name': 'Sandero', 'v': 'Easy-R Stepway Plus  1.5 dCi 90 (5d) 90pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 98, 'power': 66, 'acc': 12, 'koffer': 320, 'cilinder': 1461, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 14300, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-phev', 'brand': 'Volvo', 'name': 'XC90 2.0 T8 4WD ', 'v': 'Geartronic Inscription 7PL. (5d) 392pk', 'fuel': 'Plug-in hybride', 'verbrEl': 16.3, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 288, 'acc': 5.8, 'koffer': 316, 'cilinder': 1969, 'bat': 9.6, 'tank': 70, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 88590, 'pk': 11, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'C-klasse Break PHEV', 'v': 'C300de Auto (5d) 306pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.6, 'verbrBr': 4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 225, 'acc': 5.6, 'koffer': 315, 'cilinder': 1950, 'bat': 10.8, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 54208, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'peugeot-208', 'brand': 'Peugeot', 'name': '208', 'v': 'Allure 1.2 PureTech 81kW S/S Auto (5d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 116, 'power': 74, 'acc': 10.8, 'koffer': 311, 'cilinder': 1199, 'bat': 0, 'tank': 44, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 21050, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-i3-s', 'brand': 'BMW', 'name': 'i3s  ', 'v': 'Advanced 120Ah (5d) 184pk', 'fuel': 'Elektrisch', 'verbrEl': 16.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 6.9, 'koffer': 260, 'cilinder': 0, 'bat': 37.9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 47250, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-i3', 'brand': 'BMW', 'name': 'i3', 'v': 'Advanced (5d) 170pk', 'fuel': 'Elektrisch', 'verbrEl': 15.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 125, 'acc': 7.3, 'koffer': 260, 'cilinder': 0, 'bat': 37.9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 42050, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mercedes-a-phev', 'brand': 'Mercedes-Benz', 'name': 'A-klasse PHEV', 'v': 'Hatchback A 250 e (5d) 218pk', 'fuel': 'Plug-in hybride', 'verbrEl': 15.4, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 23, 'power': 160, 'acc': 6.6, 'koffer': 310, 'cilinder': 1332, 'bat': 15.6, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 40535, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-captur-phev', 'brand': 'Renault', 'name': 'Captur', 'v': 'E-TECH Plug-in Hybrid Intens (5d) 159pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.6, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 117, 'acc': 10.1, 'koffer': 309, 'cilinder': 1598, 'bat': 9.8, 'tank': 39, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 32725, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-grandtour-phev', 'brand': 'Renault', 'name': 'M&eacute;gane Grandtour', 'v': 'E-TECH Plug-in Hybrid Intens (5d) 158pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.6, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 117, 'acc': 10.1, 'koffer': 309, 'cilinder': 1598, 'bat': 9.8, 'tank': 39, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 36575, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'opel-corsa', 'brand': 'Opel', 'name': 'Corsa', 'v': 'Black Edition 1.4 66kW Aut.  (5d) 90pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 93, 'power': 55, 'acc': 13.2, 'koffer': 309, 'cilinder': 1199, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 17695, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'citroen-c3', 'brand': 'Citro&euml;n', 'name': 'C3', 'v': 'Feel 1.2 PureTech 110 S&S EAT6 (5d) 110pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 111, 'power': 81, 'acc': 10, 'koffer': 300, 'cilinder': 1199, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 18495, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev', 'brand': 'Mercedes-Benz', 'name': 'C-klasse Break PHEV', 'v': 'C300e (5d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 20.4, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 235, 'acc': 5.4, 'koffer': 300, 'cilinder': 1991, 'bat': 10.8, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 50699, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-berline-phev', 'brand': 'Mercedes-Benz', 'name': 'C-klasse Berline PHEV', 'v': 'C300de (4d) 306pk', 'fuel': 'Plug-in hybride', 'verbrEl': 19.3, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 225, 'acc': 5.6, 'koffer': 300, 'cilinder': 1950, 'bat': 10.8, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 52635, 'pk': 10, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-phev-dies', 'brand': 'Mercedes-Benz', 'name': 'C-klasse Berline PHEV', 'v': 'C300e Auto (4d) 320pk', 'fuel': 'Plug-in hybride', 'verbrEl': 18.6, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 235, 'acc': 5.4, 'koffer': 300, 'cilinder': 1991, 'bat': 10.8, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 50699, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'nissan-micra', 'brand': 'Nissan', 'name': 'Micra', 'v': 'Acenta 1.5 dCi  (5d) 90pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 107, 'power': 66, 'acc': 11.9, 'koffer': 300, 'cilinder': 1461, 'bat': 0, 'tank': 41, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 18440, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'renault-clio-dies', 'brand': 'Renault', 'name': 'Clio', 'v': 'Zen dCi 75 (5d) 75pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 106, 'power': 55, 'acc': 12, 'koffer': 300, 'cilinder': 1461, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 17235, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'renault-clio-benz', 'brand': 'Renault', 'name': 'Clio', 'v': 'Zen TCe 75 (5d) 75pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 114, 'power': 55, 'acc': 12.3, 'koffer': 300, 'cilinder': 898, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 15235, 'pk': 5, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'ford-fiesta-benz', 'brand': 'Ford', 'name': 'Fiesta', 'v': 'EcoBoost Businessclass 1.0i 74kW aut. (5d) 100pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 74, 'acc': 12.2, 'koffer': 292, 'cilinder': 998, 'bat': 0, 'tank': 42, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 20625, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-xceed-phev', 'brand': 'KIA', 'name': 'XCeed PHEV', 'v': 'Sense 1.6 GDi DCT (5d) 141pk', 'fuel': 'Plug-in hybride', 'verbrEl': 18.5, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 32, 'power': 104, 'acc': 11, 'koffer': 291, 'cilinder': 1580, 'bat': 8.9, 'tank': 37, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 38390, 'pk': 9, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'toyota-yaris', 'brand': 'Toyota', 'name': 'Yaris', 'v': 'Comfort 1.5 VVT-i Hybrid e-CVT (5d) 100pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 3.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 75, 'power': 74, 'acc': 11.8, 'koffer': 286, 'cilinder': 1497, 'bat': 0, 'tank': 36, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 20920, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'fiat-punto-cng', 'brand': 'Fiat', 'name': 'Punto', 'v': '1.4 51kW CNG Easy (5d) 70pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 51, 'acc': 16.9, 'koffer': 275, 'cilinder': 1368, 'bat': 0, 'tank': 84, 'tankcng': 13, 'tankfcev': 0, 'ecoscore': 77, 'price': 16440, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-phev', 'brand': 'SEAT', 'name': 'Leon PHEV', 'v': '1.4 e-Hybrid PHEV 204 FR DSG (5d) 204pk', 'fuel': 'Plug-in hybride', 'verbrEl': 20.6, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 27, 'power': 150, 'acc': 7.5, 'koffer': 270, 'cilinder': 1395, 'bat': 12.8, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 34820, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-3+1', 'brand': 'Fiat', 'name': '500e 3+1', 'v': '42kWh Business Opening Edition (3d) 118pk', 'fuel': 'Elektrisch', 'verbrEl': 13.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 198, 'acc': 6, 'koffer': 502, 'cilinder': 0, 'bat': 37.3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 28919, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'seat-ibiza-cng', 'brand': 'SEAT', 'name': 'Ibiza (CNG)', 'v': 'Style 1.0 TGI 90pk (5d) 90pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 92, 'power': 66, 'acc': 12.1, 'koffer': 262, 'cilinder': 999, 'bat': 0, 'tank': 9, 'tankcng': 14, 'tankfcev': 0, 'ecoscore': 80, 'price': 18870, 'pk': 6, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-cabrio', 'brand': 'FIAT', 'name': '500c', 'v': '500e 42 kWh Icon (2d) 118pk', 'fuel': 'Elektrisch', 'verbrEl': 13.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 87, 'acc': 9, 'koffer': 185, 'cilinder': 0, 'bat': 37.3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 32900, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-berlina-42', 'brand': 'FIAT', 'name': '500 Berlina (42 kWh)', 'v': '500e 42 kWh Icon (4d) 118pk', 'fuel': 'Elektrisch', 'verbrEl': 12.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 87, 'acc': 9, 'koffer': 185, 'cilinder': 0, 'bat': 37.3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 31900, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'nissan-leaf', 'brand': 'Nissan', 'name': 'LEAF', 'v': 'N-Connecta 40kWh (5d) 150pk', 'fuel': 'Elektrisch', 'verbrEl': 20.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 110, 'acc': 7.9, 'koffer': 400, 'cilinder': 0, 'bat': 36, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 38590, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'skoda-citigo-ev', 'brand': '&Scaron;koda', 'name': 'Citigo E IV', 'v': 'Ambition (5d) 83pk', 'fuel': 'Elektrisch', 'verbrEl': 14.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 61, 'acc': 12.3, 'koffer': 250, 'cilinder': 0, 'bat': 32.3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 21600, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'smart-fortwo-benz', 'brand': 'smart', 'name': 'fortwo Coup&eacute;', 'v': 'Brabus 0.9 80kW 109pk (3d)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 80, 'acc': 9.5, 'koffer': 260, 'cilinder': 898, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 21659, 'pk': 5, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'kia-picanto', 'brand': 'KIA', 'name': 'Picanto', 'v': 'Fusion 1.2 AT (5d) 84pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 62, 'acc': 13.7, 'koffer': 255, 'cilinder': 1248, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 14240, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'skoda-citigo', 'brand': '&Scaron;koda', 'name': 'Citigo', 'v': 'Ambition 1.0 55kW ASG (5d) 75pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 103, 'power': 51, 'acc': 14.9, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 12090, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'seat-mii-electric', 'brand': 'SEAT', 'name': 'Mii electric', 'v': 'Plus (5d) 83pk', 'fuel': 'Elektrisch', 'verbrEl': 14.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 61, 'acc': 12.3, 'koffer': 251, 'cilinder': 0, 'bat': 32.3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 22290, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'vw-polo-cng', 'brand': 'Volkswagen', 'name': 'Polo TGI', 'v': '1.0 TGI Comfortline (5d) 90pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 89, 'power': 66, 'acc': 11.9, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 40, 'tankcng': 11, 'tankfcev': 0, 'ecoscore': 80, 'price': 21600, 'pk': 6, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'vw-up-benz', 'brand': 'Volkswagen', 'name': 'up!', 'v': 'High-up! 1.0 MPi 55kW BMT ASG (5d) 75pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 55, 'acc': 14.9, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 15410, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mazda-mx30-ev', 'brand': 'Mazda', 'name': 'MX-30', 'v': 'e-SKYACTIV 145 pk Skydrive (5d) 145pk', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 107, 'acc': 9.7, 'koffer': 366, 'cilinder': 0, 'bat': 30, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 35790, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'fiat-qubo', 'brand': 'Fiat', 'name': 'Qubo', 'v': '1.4 Lounge CNG Natural Power (5d) 70pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 135, 'power': 51, 'acc': 17.5, 'koffer': 250, 'cilinder': 1368, 'bat': 0, 'tank': 77, 'tankcng': 13, 'tankfcev': 0, 'ecoscore': 74, 'price': 16840, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra-cng', 'brand': 'Opel', 'name': 'Astra (CNG)', 'v': '1.4 Turbo 81kW ECOTEC CNG Innovation (5d) 110pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 113, 'power': 81, 'acc': 10.9, 'koffer': 241, 'cilinder': 1399, 'bat': 0, 'tank': 13, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 78, 'price': 26250, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'ford-explorer-phev', 'brand': 'Ford', 'name': 'Explorer PHEV', 'v': 'EcoBoost ST-Line 3.0i  457ps (5d) 457pk', 'fuel': 'Plug-in hybride', 'verbrEl': 29.9, 'verbrBr': 9.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 71, 'power': 336, 'acc': 6, 'koffer': 240, 'cilinder': 2999, 'bat': 13.6, 'tank': 68, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 79000, 'pk': 15, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':165 },
{ 'segment': 'A', 'id': 'fiat-panda-benz', 'brand': 'Fiat', 'name': 'Panda', 'v': 'Easy 1.2 8v 51kW Easy (5d) 69pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 114, 'power': 51, 'acc': 14.5, 'koffer': 225, 'cilinder': 1242, 'bat': 0, 'tank': 37, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 11190, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mini-mini-electric', 'brand': 'MINI', 'name': 'Cooper electric', 'v': 'SE M (3d) 184pk', 'fuel': 'Elektrisch', 'verbrEl': 15.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 7.3, 'koffer': 211, 'cilinder': 0, 'bat': 28.9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 35900, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'renault-twingo', 'brand': 'Renault', 'name': 'Twingo', 'v': 'Intens 0.9 TCe 90 EDC (5d) 90pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 66, 'acc': 10.8, 'koffer': 219, 'cilinder': 898, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 15400, 'pk': 5, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'skoda-citigo-cng', 'brand': '&Scaron;koda', 'name': 'Citigo G-Tec', 'v': 'Ambition 1.0 CNG 50kW (5d) 68pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 82, 'power': 50, 'acc': 16.3, 'koffer': 213, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 12, 'tankfcev': 0, 'ecoscore': 81, 'price': 13845, 'pk': 6, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'seat-mii', 'brand': 'SEAT', 'name': 'Mii', 'v': 'Style 1.0 50kW CNG EcoFuel (5d) 68pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 82, 'power': 50, 'acc': 16.3, 'koffer': 213, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 11, 'tankfcev': 0, 'ecoscore': 82, 'price': 14320, 'pk': 6, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'vw-up-cng', 'brand': 'Volkswagen', 'name': 'eco up!', 'v': '1.0 MPi CNG 44kW BMT Move up! (5d) 68pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 90, 'power': 50, 'acc': 16.3, 'koffer': 213, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 11, 'tankfcev': 0, 'ecoscore': 81, 'price': 16530, 'pk': 6, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'honda-e', 'brand': 'Honda', 'name': 'e', 'v': 'Advance 16" (5d) 154pk', 'fuel': 'Elektrisch', 'verbrEl': 17.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 227, 'acc': 6.5, 'koffer': 494, 'cilinder': 0, 'bat': 28.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 37500, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-panda-cng', 'brand': 'Fiat', 'name': 'Panda (CNG)', 'v': '0.9 Twinair 59kW CNG Lounge (5d) 80pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 85, 'power': 59, 'acc': 12.8, 'koffer': 200, 'cilinder': 875, 'bat': 0, 'tank': 72, 'tankcng': 12, 'tankfcev': 0, 'ecoscore': 79, 'price': 15040, 'pk': 5, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'vw-caddy-diesel', 'brand': 'Volkswagen', 'name': 'Caddy', 'v': 'Trendline 2.0 CRTDi 75kW SCR BMT DSG (5d) 102pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 75, 'acc': 13, 'koffer': 3300, 'cilinder': 1968, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 25100, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'vw-caddy-cng', 'brand': 'Volkswagen', 'name': 'Caddy (CNG)', 'v': '1.4 TGi BMT 81kW Comfortline (5d) 110pk', 'fuel': 'Bi-fuel CNG', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 81, 'acc': 12.9, 'koffer': 190, 'cilinder': 1395, 'bat': 0, 'tank': 13, 'tankcng': 26, 'tankfcev': 0, 'ecoscore': 76, 'price': 27810, 'pk': 8, 'image': true, 'testcyclus':'NEDC2', 'fakehybrides':0 },
{ 'segment': 'MPV-Comp', 'id': 'renault-grand-scenic', 'brand': 'Renault', 'name': 'Grand Sc&eacute;nic', 'v': 'Intens TCe 140 EDC GPF 7P (5d) 140pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 103, 'acc': 10.4, 'koffer': 189, 'cilinder': 1332, 'bat': 0, 'tank': 53, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 31925, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500-dies', 'brand': 'Fiat', 'name': '500', 'v': '1.3 Mjet 95hp Lounge (3d) 95pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 89, 'power': 70, 'acc': 10.7, 'koffer': 185, 'cilinder': 1248, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 18490, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500-benz', 'brand': 'Fiat', 'name': '500', 'v': '1.2 Lounge 8v 69hp Lounge (3d) 69pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 51, 'acc': 12.9, 'koffer': 185, 'cilinder': 1242, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 15490, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-berlina-24', 'brand': 'FIAT', 'name': '500 Berlina (24 kWh)', 'v': '500e 24 kWh Action (3d) 95pk', 'fuel': 'Elektrisch', 'verbrEl': 12.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 70, 'acc': 9, 'koffer': 185, 'cilinder': 0, 'bat': 23.8, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 23900, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'renault-twingo-ev', 'brand': 'Renault', 'name': 'Twingo', 'v': 'R80 Zen (5d) 82pk', 'fuel': 'Elektrisch', 'verbrEl': 16.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 116, 'acc': 9.8, 'koffer': 422, 'cilinder': 0, 'bat': 21.3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 21250, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'smart-fortwo-cabrio', 'brand': 'smart', 'name': 'EQ fortwo cabrio', 'v': '60kW Comfort (2d) 82pk', 'fuel': 'Elektrisch', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 180, 'acc': 11.9, 'koffer': 615, 'cilinder': 0, 'bat': 16.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 28250, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'smart-forfour-eq', 'brand': 'smart', 'name': 'EQ forfour', 'v': '60kW Comfort (5d) 82pk', 'fuel': 'Elektrisch', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 12.7, 'koffer': 185, 'cilinder': 0, 'bat': 16.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 25750, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'smart-forfour-benz', 'brand': 'smart', 'name': 'forfour', 'v': 'Brabus 0.9 80kW (5d) 109pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 80, 'acc': 10.5, 'koffer': 185, 'cilinder': 898, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 22627, 'pk': 5, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'smart-fortwo-coupe', 'brand': 'smart', 'name': 'EQ fortwo coup&eacute;', 'v': '60kW Comfort (3d) 82pk', 'fuel': 'Elektrisch', 'verbrEl': 16.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 11.6, 'koffer': 260, 'cilinder': 0, 'bat': 16.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 25250, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'opel-adam', 'brand': 'Opel', 'name': 'Adam', 'v': 'Glam 1.2 51kW (3d) 70pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 51, 'acc': 14.9, 'koffer': 170, 'cilinder': 1229, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 15550, 'pk': 7, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'toyota-aygo', 'brand': 'Toyota', 'name': 'Aygo', 'v': '1.0 VVT-i x-cite M/M (5d) 69pk', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 97, 'power': 51, 'acc': 15.5, 'koffer': 168, 'cilinder': 998, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 15780, 'pk': 6, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'polestar-1-phev', 'brand': 'Polestar', 'name': '1', 'v': '34kWh Aut. 4x4 (3d) 606 pk', 'fuel': 'Plug-in hybride', 'verbrEl': 27.4, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 13, 'power': 448, 'acc': 4.2, 'koffer': 126, 'cilinder': 1969, 'bat': 34, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 157500, 'pk': 11, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'KM1', 'model': 'M1', 'id': 'nissan-nv-200', 'brand': 'Nissan', 'name': 'NV200 Combi', 'v': 'DSD 1.5 dCi 66kW PRO 7S (5d) 90pk', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 133, 'power': 66, 'acc': 0, 'koffer': 0, 'cilinder': 1468, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 21120, 'pk': 8, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'F', 'id': '0', 'brand': 'Tesla', 'name': 'Roadster', 'v': '0', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 1000, 'acc': 2.1, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 215000, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': '0', 'brand': 'Tesla', 'name': 'Cybertruck Tri Motor', 'v': 'Tri Motor AWD', 'fuel': 'Elektrisch', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 600, 'acc': 2.9, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 78000, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': '0', 'brand': 'Tesla', 'name': 'Cybertruck Dual Motor', 'v': 'Dual Motor AWD', 'fuel': 'Elektrisch', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 0, 'acc': 4.5, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 56000, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': '0', 'brand': 'Tesla', 'name': 'Cybertruck Single Motor', 'v': 'Single Motor RWD', 'fuel': 'Elektrisch', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 0, 'acc': 6.5, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 45000, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'D', 'id': '0', 'brand': 'Polestar', 'name': '2 (63 kWh)', 'v': '0', 'fuel': 'Elektrisch', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 0, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 0, 'pk': 4, 'image': true, 'testcyclus':'WLTP', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': '0', 'brand': 'Toyota', 'name': 'RAV4', 'v': '0', 'fuel': 'Plug-in hybride', 'verbrEl': 0, 'verbrBr': 2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 0, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 0, 'pk': 0, 'image': true, 'testcyclus':'0', 'fakehybrides':0 }

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
				cptCarBoxHtml.push('<div class="car col-md-3 col-xs-4" id="' + carsLeft[i].id + '"> <h4>Selecteren als eerste wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '-32.png" width="220" /> <h2>' + carsLeft[i].brand + ' ' + carsLeft[i].name + '</h2> <h3>' + carsLeft[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsLeft[i].fuel) + '">' + drivetrainToString(carsLeft[i].fuel,'') + '</span><br /><span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsLeft[i].price,0) + ',-</span></p> </div>');					 
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
				allCarBoxHtml.push('<div class="car col-md-3 col-xs-4" id="' + carsRight[i].id + '"> <h4>Selecteren als tweede wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '-32.png" width="220" /> <h2>' + carsRight[i].brand + ' ' + carsRight[i].name + '</h2> <h3>' + carsRight[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsRight[i].fuel) + '">' + drivetrainToString(carsRight[i].fuel,'') + '</span><br /><span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsRight[i].price,0) + ',-</span></p> </div>');					 
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
		terms = addCommas(car.batterijcapaciteit / car.verbrEl / rijgedrag *100) + ' + ' + addCommas(car.tank / car.verbrBr / rijgedrag *100) + ' km';
	} else if (car.drivetrain == 'fcev') {
		terms = addCommas(car.tankFCEV / car.verbrFCEV / rijgedrag *100) + ' km';
	} else if (car.drivetrain == 'cng') {
		terms = addCommas(car.tankCNG / car.verbrCNG / rijgedrag *100) + ' + ' + addCommas(car.tank / car.verbrBr / rijgedrag *100) + ' km';
	} else {
		terms = addCommas(car.tank / verbruik[1]*100) + ' km';
	}
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
	terms.push('<span><img id="ch-' + car.id + '" class="active ' + flipped + '" src="assets/img/cars/' + car.imageSrc() + '-32.png" title="' + car.fullName + '" /></span>'); // Gekozen wagen als eerste plaatsen, actief
	jQuery.each(definitiveList, function(i, item) { 
		imageSrc = definitiveList[i].id;
		if (definitiveList[i].image == false) { imageSrc = 'silhouettes/' + definitiveList[i].segment; }
		terms.push('<span><img id="ch-' + definitiveList[i].id + '" class="' + flipped + '" src="assets/img/cars/' + imageSrc + '-32.png" title="' + definitiveList[i].brand + ' ' + definitiveList[i].name + '" /></span>');
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
	
	this.solidariteitsbijdragePY = function() { // Solidariteitsbijdrage per 1/1/2023
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
			fa = Math.min(1,Math.max(fa,0.5)); // Minimum is 50%, maximum 100%
		}
		if (this.co2 > 200) { // Vanaf 200g/km is de fiscale aftrek 40%
			fa = 0.4;
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
			else { // VÓÓR 2016: {(CO2 * f + x) / 250}^6 * (4.500 + c) * LC ; NA 2016: (BIV = [({CO2 * f + x}/ 246)6 * 4.500 + c] * LC ); VANAF 2021: BIV = [{(CO2 * f * q) / 246}^6 * 4.500 + c]* LC
				var LC = 1; // Leeftijdscorrectie: 1 bij nieuwe voertuigen
				var q = 1.07; // 1.07 in 2021, wordt jaarlijks verhoogd met 0,035 vanaf 2022.
				var bMinimum = 45.56; // 45.35 in 2019 ; 40 in 2012;
				var bMaximum = 11391.05; // 11336.47 in 2019 ; 10.000 in 2012
	
				var f = 1;
				if (this.drivetrain == 'lpg') f = 0.88;
				if (this.drivetrain == 'cng') f = 0.93; // Voor 100% aardgasvoertuigen 0.93; voor bi-fuel 0.744
				var c = 0;
				if (this.drivetrain == 'dies') { // bedragen per 1/7/2020
					if (this.euro == 0) { c = 3106.80; }
					else if (this.euro == 1) { c = 911.48; }
					else if (this.euro == 2) { c = 675.55; }
					else if (this.euro == 3) { c = 535.34; }
					else if (this.euro == 4) { c = 498.44; }
					else if (this.euro == 5) { c = 498.44; }
					else if (this.euro == 6) { c = 492.71; }
				}
				else { // Benzine, PHEV > 50g en LPG (Geen diesel)
					if (this.euro == 0) { c = 1235.69; }
					else if (this.euro == 1) { c = 552.62; }
					else if (this.euro == 2) { c = 165.25; }
					else if (this.euro == 3) { c = 103.66; }
					else if (this.euro == 4) { c = 24.88; }
					else if (this.euro == 5 || this.euro == 6) { c = 22.36; }
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
				switch(this.fiscalePK) {  // M1 vanaf 1/7/2022 INCLUSIEF OPDECIEM
					case 1 : case 2 : case 3 : 
					case 4 : v =   92.8; break;
					case 5 : v =  116.16; break;
					case 6 : v =  167.9; break;
					case 7 : v =  219.38; break;
					case 8 : v =  271.26; break;
					case 9 : v =  323.14; break;
					case 10: v =  374.35; break;
					case 11: v =  486.02; break;
					case 12: v =  597.43; break;
					case 13: v =  708.58; break;
					case 14: v =  820.12; break;
					case 15: v =  931.52; break; 
					case 16: v = 1220.21; break; 
					case 17: v = 1509.16; break; 
					case 18: v = 1797.97; break; 
					case 19: v = 2086.13; break; 
					default: v = 2374.94; 
				}
				if (this.fiscalePK > 20) { // Fiscale PK boven 21
					v = v + (this.fiscalePK - 20) * 288.82; // M1 vanaf 1/7/2022
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
				
				v = Math.max(v,52.79); // Minimum M1 vanaf 1/7/2022 INCLUSIEF OPDECIEM
			}
		} else { //N1
			// Verkeersbelasting N1 criterium 1: MTM vanaf 1/7/2022 INCLUSIEF OPDECIEM
			v = Math.ceil(this.mtm/500) * 22.2;
			
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
				
			v = Math.max(v,50.71) // Minimum N1 vanaf 1/7/2023 INCLUSIEF OPDECIEM
		}
		return v;
	}
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
		$('#tco-result-image-left').attr('src','assets/img/cars/' + leftCar.imageSrc() + '-32.png');
		$('#tco-result-image-right').attr('src','assets/img/cars/' + rightCar.imageSrc() + '-32.png');
				
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
		$('.thumbLeft').attr('src','assets/img/cars/' + leftCar.imageSrc() + '-32.png').attr('title',leftCar.fullName).attr('alt',leftCar.fullName);
		$('.thumbRight').attr('src','assets/img/cars/' + rightCar.imageSrc() + '-32.png').attr('title',rightCar.fullName).attr('alt',rightCar.fullName);
		
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
	term += 311 * 1.271 * inflatieFactor; // Geïndexeerde BA verzekering
	term += 0.02 * (car.priceIncl + opties) * inflatieFactor * btwFactorFromIncl; // geïndexeerde omnium verzekering op de aankoop incl. (niet-recupereerbare) BTW
	return Math.round(term);
}

function calculateTCOIncentives(car,opties,korting) { 
	var term = 0;
	term += car.biv(); // BIV
	term += car.vkbPY() * inflatieFactor; // Geïndexeerde verkeersbelasting
	if ( entiteit != 'np' && gebruiksdoel == 'bw') { // solidariteitsbijdrage
		term += car.solidariteitsbijdragePY() * inflatieFactor;
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
			fa += 1 * car.solidariteitsbijdragePY() * inflatieFactor;
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
	$('#start-image-left').attr('src','assets/img/cars/' + cars[id1].id + '-32.png');
	$('#start-image-right').attr('src','assets/img/cars/' + cars[id2].id + '-32.png');
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	