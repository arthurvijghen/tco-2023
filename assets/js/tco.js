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

{ 'segment': 'A', 'id': 'abarth-500', 'brand': 'Abarth', 'name': '500', 'v': '42 kWh Scorpionissima Aut', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 114, 'acc': 0, 'koffer': 185, 'cilinder': 0, 'bat': 42, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 43000, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'abarth-500c-23', 'brand': 'Abarth', 'name': '500C', 'v': '42 kWh Scorpionissima Aut', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 114, 'acc': 0, 'koffer': 185, 'cilinder': 0, 'bat': 42, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 46000, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'aiways-u5', 'brand': 'Aiways', 'name': 'U5', 'v': 'Xcite', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 432, 'cilinder': 0, 'bat': 63, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 39628, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'aiways-u5-2', 'brand': 'Aiways', 'name': 'U5', 'v': 'Prime', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 432, 'cilinder': 0, 'bat': 63, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 46312, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'alfa-romeo-tonale-23', 'brand': 'Alfa', 'name': 'Romeo Tonale', 'v': 'PHEV AT6e Q4 Ti', 'fuel': 'Plug-in hybride', 'verbrEl': 22.5, 'verbrBr': 10.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 132, 'acc': 0, 'koffer': 385, 'cilinder': 1332000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 53000, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'audi-a3-limo-23', 'brand': 'Audi', 'name': 'A3 Sportback', 'v': '40 TFSI e Advanced S-Tronic', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 110, 'acc': 0, 'koffer': 280, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 43030, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-diesel', 'brand': 'Audi', 'name': 'A6 ', 'v': '40 TDI S tronic Business Edition Attract', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 150, 'acc': 0, 'koffer': 676, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 61480, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-diesel-2', 'brand': 'Audi', 'name': 'A6 ', 'v': '40 TDI quattro S tronic Business Edition', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 150, 'acc': 0, 'koffer': 676, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 64330, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-berline-2', 'brand': 'Audi', 'name': 'A6 ', 'v': '40 TFSI S tronic Business Edition Attrac', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 157, 'power': 150, 'acc': 0, 'koffer': 676, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 59800, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-berline', 'brand': 'Audi', 'name': 'A6 ', 'v': '40 TFSI S tronic Business Edition Sport', 'fuel': 'Plug-in hybride', 'verbrEl': 19.6, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 158, 'power': 150, 'acc': 0, 'koffer': 676, 'cilinder': 1984000, 'bat': 17.1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 61400, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-avant-23', 'brand': 'Audi', 'name': 'A6 Avant ', 'v': '45 TDI quattro tiptronic Sport', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2967000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-avant-23-2', 'brand': 'Audi', 'name': 'A6 Avant ', 'v': '45 TFSI quattro S tronic Attraction', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 195, 'acc': 0, 'koffer': 565, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 68710, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-avant-23-3', 'brand': 'Audi', 'name': 'A6 Avant ', 'v': '40 TDI quattro S tronic Business Edition', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 150, 'acc': 0, 'koffer': 565, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 66630, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a7-sportback', 'brand': 'Audi', 'name': 'A7 Sportback', 'v': '50 TFSI e quattro S tronic', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 185, 'acc': 0, 'koffer': 535, 'cilinder': 1984000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 80010, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-55', 'brand': 'Audi', 'name': 'e-tron', 'v': '55 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 265, 'acc': 0, 'koffer': 660, 'cilinder': 0, 'bat': 86, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 88300, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-50', 'brand': 'Audi', 'name': 'e-tron', 'v': '50 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 230, 'acc': 0, 'koffer': 660, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 61500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-s-23', 'brand': 'Audi', 'name': 'e-tron', 'v': 'S QUATTRO', 'fuel': 'Elektrisch', 'verbrEl': 28, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 370, 'acc': 0, 'koffer': 660, 'cilinder': 0, 'bat': 68, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 97210, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-e-tron-gt', 'brand': 'Audi', 'name': 'e-tron GT', 'v': '93kWh Quattro', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 350, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 83, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 111630, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-e-tron-gt-2', 'brand': 'Audi', 'name': 'e-tron GT', 'v': '93kWh Quattro RS', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 440, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 83, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 155250, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-sportback-50', 'brand': 'Audi', 'name': 'e-tron Sportback', 'v': '55 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 265, 'acc': 0, 'koffer': 615, 'cilinder': 0, 'bat': 86, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 90300, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-sportback-55', 'brand': 'Audi', 'name': 'e-tron Sportback', 'v': '55 QUATTRO S-Line', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 265, 'acc': 0, 'koffer': 615, 'cilinder': 0, 'bat': 86, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 93000, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-sportsback-55-23', 'brand': 'Audi', 'name': 'e-tron Sportback', 'v': '50 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 230, 'acc': 0, 'koffer': 615, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 78500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-s-sportback-23', 'brand': 'Audi', 'name': 'e-tron Sportback', 'v': 'S QUATTRO', 'fuel': 'Elektrisch', 'verbrEl': 28, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 370, 'acc': 0, 'koffer': 615, 'cilinder': 0, 'bat': 68, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 99220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'audi-q3', 'brand': 'Audi', 'name': 'Q3 ', 'v': '45 TFSI e Attraction S-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 45, 'power': 110, 'acc': 0, 'koffer': 530, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 49030, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'audi-q3-sportback-phev-32', 'brand': 'Audi', 'name': 'Q3 Sportback', 'v': '45 TFSI e Attraction S-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 46, 'power': 110, 'acc': 0, 'koffer': 530, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 50530, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-1', 'brand': 'Audi', 'name': 'Q4 e-tron', 'v': '40 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 520, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 58170, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-2', 'brand': 'Audi', 'name': 'Q4 e-tron', 'v': '50 e-tron 77 kWh S-Line', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 162, 'acc': 0, 'koffer': 520, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 64780, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-3', 'brand': 'Audi', 'name': 'Q4 e-tron', 'v': '45 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 520, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 60230, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-sportback-1', 'brand': 'Audi', 'name': 'Q4 Sportback e-tron', 'v': '40 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 535, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 60220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-sportback-3', 'brand': 'Audi', 'name': 'Q4 Sportback e-tron', 'v': '40 e-tron 77 kWh S-Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 535, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 61220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-sportback-2', 'brand': 'Audi', 'name': 'Q4 Sportback e-tron', 'v': '50 e-tron 77 kWh S-Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 162, 'acc': 0, 'koffer': 535, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 66830, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-sportback-4', 'brand': 'Audi', 'name': 'Q4 Sportback e-tron', 'v': '45 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 535, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 62370, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-benzine', 'brand': 'Audi', 'name': 'Q5', 'v': '40 TDI Quattro S-tronic Business Edition', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 164, 'power': 150, 'acc': 0, 'koffer': 520, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 59600, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-benzine-23', 'brand': 'Audi', 'name': 'Q5', 'v': '35 TDI S-tronic Business Edition Advance', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 120, 'acc': 0, 'koffer': 520, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 56170, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5', 'brand': 'Audi', 'name': 'Q5', 'v': '50 TFSI eQuattro S-tronic Advanced', 'fuel': 'Plug-in hybride', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 185, 'acc': 0, 'koffer': 465, 'cilinder': 1984000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 64240, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-23', 'brand': 'Audi', 'name': 'Q5', 'v': '40 TFSI Quattro S-tronic Business Editio', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 174, 'power': 150, 'acc': 0, 'koffer': 520, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 56440, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-sportback-1', 'brand': 'Audi', 'name': 'Q5 Sportback', 'v': '50 TFSI eQuattro S-tronic Advanced', 'fuel': 'Plug-in hybride', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 185, 'acc': 0, 'koffer': 455, 'cilinder': 1984000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 66340, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-sportback', 'brand': 'Audi', 'name': 'Q5 Sportback', 'v': '40 TFSI Quattro S-tronic Business Editio', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 176, 'power': 150, 'acc': 0, 'koffer': 510, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 58540, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q7', 'brand': 'Audi', 'name': 'Q7', 'v': '50 TDI S Line Quattro Tiptronic', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2967000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q7-23-2', 'brand': 'Audi', 'name': 'Q7', 'v': '55 TFSI S Line eQuattro Tiptronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2995000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q7-23', 'brand': 'Audi', 'name': 'Q7', 'v': '55 TFSI Attraction eQuattro Tiptronic', 'fuel': 'Plug-in hybride', 'verbrEl': 23, 'verbrBr': 10.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 51, 'power': 250, 'acc': 0, 'koffer': 865, 'cilinder': 2995000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 79230, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':128 },
{ 'segment': 'SUV-EF', 'id': 'audi-q8-phev', 'brand': 'Audi', 'name': 'Q8', 'v': '60 TFSI e Tiptronic Quattro Competition', 'fuel': 'Plug-in hybride', 'verbrEl': 23, 'verbrBr': 11.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 58, 'power': 340, 'acc': 0, 'koffer': 605, 'cilinder': 2995000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 101690, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':145 },
{ 'segment': 'SUV-EF', 'id': 'audi-q8-e-tron', 'brand': 'Audi', 'name': 'Q8 e-tron', 'v': '50 Quattro Advanced', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 250, 'acc': 0, 'koffer': 569, 'cilinder': 0, 'bat': 95, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 76500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'baic-x35-2', 'brand': 'Audi', 'name': 'Q8 e-tron', 'v': '55 Quattro Advanced', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 0, 'koffer': 569, 'cilinder': 0, 'bat': 114, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 88300, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q8-e-tron-sportback', 'brand': 'Audi', 'name': 'Q8 Sportback e-tron', 'v': '50 Quattro Advanced', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 250, 'acc': 0, 'koffer': 528, 'cilinder': 0, 'bat': 95, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 78500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q8-e-tron-sportback-2', 'brand': 'Audi', 'name': 'Q8 Sportback e-tron', 'v': '55 Quattro Advanced', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 0, 'koffer': 528, 'cilinder': 0, 'bat': 114, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 90300, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'baic-x35', 'brand': 'BAIC', 'name': 'X35', 'v': '1.5 115PK', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 197, 'power': 85, 'acc': 0, 'koffer': 376, 'cilinder': 1500000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 21490, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'baic-x35-2', 'brand': 'BAIC', 'name': 'X35', 'v': '1.5 115PK LPG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 85, 'acc': 0, 'koffer': 376, 'cilinder': 1500000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 24290, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'bmw-1-benzine', 'brand': 'BMW', 'name': '1-Reeks (F40)', 'v': '118i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 150, 'power': 100, 'acc': 0, 'koffer': 380, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 34600, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'bmw-1-diesel', 'brand': 'BMW', 'name': '1-Reeks (F40)', 'v': '118d', 'fuel': 'Diesel', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 380, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 35000, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-2phev-33', 'brand': 'BMW', 'name': '2-Reeks Active Tourer (U06)', 'v': '218i DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 100, 'acc': 0, 'koffer': 404, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 36000, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-2phev-34', 'brand': 'BMW', 'name': '2-Reeks Active Tourer (U06)', 'v': '225e xDrive DCT', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 100, 'acc': 0, 'koffer': 415, 'cilinder': 1499000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 46650, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-2-coupe-benzine', 'brand': 'BMW', 'name': '2-Reeks Coup&eacute; (G42)', 'v': '218i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 158, 'power': 115, 'acc': 0, 'koffer': 390, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 40900, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-2-gran-coupe-benz', 'brand': 'BMW', 'name': '2-Reeks Gran Coup&eacute; (F44)', 'v': '218i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 100, 'acc': 0, 'koffer': 430, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 34950, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-2phev-32', 'brand': 'BMW', 'name': '2-Reeks Gran Tourer (F46)', 'v': '218i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 100, 'acc': 0, 'koffer': 645, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 32900, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-benzine', 'brand': 'BMW', 'name': '3-Reeks (G20)', 'v': '318i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 162, 'power': 115, 'acc': 0, 'koffer': 480, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 41000, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-phev', 'brand': 'BMW', 'name': '3-Reeks (G20)', 'v': '320e AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 8.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 40, 'power': 120, 'acc': 0, 'koffer': 480, 'cilinder': 1998000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 54450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-diesel', 'brand': 'BMW', 'name': '3-Reeks (G20)', 'v': '320d AUT 48v', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 145, 'power': 120, 'acc': 0, 'koffer': 480, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 48950, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-touring-phev-32', 'brand': 'BMW', 'name': '3-Reeks Touring (G21)', 'v': '318i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 168, 'power': 115, 'acc': 0, 'koffer': 500, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 42700, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-touring-phev-33', 'brand': 'BMW', 'name': '3-Reeks Touring (G21)', 'v': '320e AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 9.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 43, 'power': 120, 'acc': 0, 'koffer': 500, 'cilinder': 1998000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 56100, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-touring-phev-34', 'brand': 'BMW', 'name': '3-Reeks Touring (G21)', 'v': '318d AUT 48v', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 110, 'acc': 0, 'koffer': 500, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 47200, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-4-coupe-benz', 'brand': 'BMW', 'name': '4-Reeks Coup&eacute; (G22)', 'v': '420i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 162, 'power': 135, 'acc': 0, 'koffer': 440, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 50250, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-4coupe-23', 'brand': 'BMW', 'name': '4-Reeks Coup&eacute; (G22)', 'v': '420d', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 140, 'acc': 0, 'koffer': 440, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 53500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-5reeks-diesel', 'brand': 'BMW', 'name': '5-Reeks (G30)', 'v': '520d AUT 48v', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 141, 'power': 120, 'acc': 0, 'koffer': 530, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 59150, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-5-benz', 'brand': 'BMW', 'name': '5-Reeks (G30)', 'v': '520i AUT 48v', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 157, 'power': 120, 'acc': 0, 'koffer': 530, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 58350, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-5-phev', 'brand': 'BMW', 'name': '5-Reeks (G30)', 'v': '530e xDrive AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 9.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 135, 'acc': 0, 'koffer': 530, 'cilinder': 1998000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 70100, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw5-touring-phev-32', 'brand': 'BMW', 'name': '5-Reeks Touring (G31)', 'v': '520d AUT 48v', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 148, 'power': 120, 'acc': 0, 'koffer': 570, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 61750, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw5-touring-phev-33', 'brand': 'BMW', 'name': '5-Reeks Touring (G31)', 'v': '520i AUT 48v', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 120, 'acc': 0, 'koffer': 570, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 60900, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw5-touring-phev-34', 'brand': 'BMW', 'name': '5-Reeks Touring (G31)', 'v': '530e xDrive AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 9.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 51, 'power': 135, 'acc': 0, 'koffer': 570, 'cilinder': 1998000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 72750, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':128 },
{ 'segment': 'F', 'id': 'bmw-7-23', 'brand': 'BMW', 'name': '7-Reeks (G70)', 'v': '750e xDrive', 'fuel': 'Plug-in hybride', 'verbrEl': 27, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 230, 'acc': 0, 'koffer': 525, 'cilinder': 2998000, 'bat': 22, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 122400, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-i4-ee', 'brand': 'BMW', 'name': 'i4 (G26)', 'v': 'eDrive40', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 250, 'acc': 0, 'koffer': 470, 'cilinder': 0, 'bat': 80, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 64200, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-i4-elek-1', 'brand': 'BMW', 'name': 'i4 (G26)', 'v': 'M50', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 400, 'acc': 0, 'koffer': 470, 'cilinder': 0, 'bat': 80, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 79750, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-i4-23', 'brand': 'BMW', 'name': 'i4 (G26)', 'v': 'eDrive35', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 210, 'acc': 0, 'koffer': 470, 'cilinder': 0, 'bat': 80, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 59000, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'bmw-i7-23', 'brand': 'BMW', 'name': 'i7 (G70)', 'v': 'i7 xDrive60', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 400, 'acc': 0, 'koffer': 500, 'cilinder': 0, 'bat': 101, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 137900, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-ix-23', 'brand': 'BMW', 'name': 'iX (I20)', 'v': 'xDrive40', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 240, 'acc': 0, 'koffer': 500, 'cilinder': 0, 'bat': 70, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 82800, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-ix-23-1', 'brand': 'BMW', 'name': 'iX (I20)', 'v': 'xDrive50', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 385, 'acc': 0, 'koffer': 500, 'cilinder': 0, 'bat': 105, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 110150, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-ix-23-2', 'brand': 'BMW', 'name': 'iX (I20)', 'v': 'M60', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 455, 'acc': 0, 'koffer': 500, 'cilinder': 0, 'bat': 105, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 140600, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-ix1', 'brand': 'BMW', 'name': 'iX1 (U11)', 'v': 'xDrive30 AUT', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 200, 'acc': 0, 'koffer': 490, 'cilinder': 0, 'bat': 74, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 57950, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-ix3-32', 'brand': 'BMW', 'name': 'iX3 (G08)', 'v': 'iX3', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 210, 'acc': 0, 'koffer': 510, 'cilinder': 0, 'bat': 80, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 57450, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'bmw-x1-benzine', 'brand': 'BMW', 'name': 'X1 (U11)', 'v': 'sDrive18i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 160, 'power': 100, 'acc': 0, 'koffer': 490, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 38500, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'bmw-x1-diesel', 'brand': 'BMW', 'name': 'X1 (U11)', 'v': 'sDrive18d AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 100, 'acc': 0, 'koffer': 490, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 41150, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'bmw-x1-phev', 'brand': 'BMW', 'name': 'X1 (U11)', 'v': 'xDrive25e AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 100, 'acc': 0, 'koffer': 540, 'cilinder': 1499000, 'bat': 9.7, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 50700, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x2-benzine', 'brand': 'BMW', 'name': 'X2 (F39)', 'v': 'sDrive18i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 100, 'acc': 0, 'koffer': 470, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 34900, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x2-diesel', 'brand': 'BMW', 'name': 'X2 (F39)', 'v': 'sDrive18d', 'fuel': 'Diesel', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 470, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 37600, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-benzine', 'brand': 'BMW', 'name': 'X3 (G01)', 'v': 'xDrive20i AT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 192, 'power': 135, 'acc': 0, 'koffer': 550, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 54700, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-phev', 'brand': 'BMW', 'name': 'X3 (G01)', 'v': 'xDrive30e AT', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 9.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 57, 'power': 120, 'acc': 0, 'koffer': 450, 'cilinder': 1998000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 67650, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':143 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-diesel', 'brand': 'BMW', 'name': 'X3 (G01)', 'v': 'xDrive20d AT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 140, 'acc': 0, 'koffer': 550, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 57450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x4-benzine', 'brand': 'BMW', 'name': 'X4 (G02)', 'v': 'xDrive20i AT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 190, 'power': 135, 'acc': 0, 'koffer': 525, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 57350, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x4-diesel', 'brand': 'BMW', 'name': 'X4 (G02)', 'v': 'xDrive20d AT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 170, 'power': 140, 'acc': 0, 'koffer': 525, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 60100, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5-phev-2', 'brand': 'BMW', 'name': 'X5 (G05)', 'v': 'xDrive40i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5-phev', 'brand': 'BMW', 'name': 'X5 (G05)', 'v': 'xDrive50e', 'fuel': 'Plug-in hybride', 'verbrEl': 23, 'verbrBr': 12.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 155, 'acc': 0, 'koffer': 500, 'cilinder': 2998000, 'bat': 25, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 95250, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5-phev-3', 'brand': 'BMW', 'name': 'X5 (G05)', 'v': 'xDrive40d', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x6-benzine', 'brand': 'BMW', 'name': 'X6 (G06)', 'v': 'xDrive40i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 54, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x6-diesel', 'brand': 'BMW', 'name': 'X6 (G06)', 'v': 'xDrive40d', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x7-benzine', 'brand': 'BMW', 'name': 'X7 (G07)', 'v': 'xDrive40i AT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x7-diesel', 'brand': 'BMW', 'name': 'X7 (G07)', 'v': 'xDrive40d AT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 107936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'byd-atto-3', 'brand': 'BYD', 'name': 'Atto 3', 'v': 'Launch Edition', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 440, 'cilinder': 0, 'bat': 60, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 45990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'byd-han', 'brand': 'BYD', 'name': 'Han', 'v': '85 kWh AWD Premium', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 380, 'acc': 0, 'koffer': 410, 'cilinder': 0, 'bat': 85, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 71390, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'byd-han-23', 'brand': 'BYD', 'name': 'Han', 'v': '85 kWh AWD Emerald Edition', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 380, 'acc': 0, 'koffer': 410, 'cilinder': 0, 'bat': 85, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 75020, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'byd-tang', 'brand': 'BYD', 'name': 'Tang', 'v': '86 kWh AWD Premium', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 380, 'acc': 0, 'koffer': 235, 'cilinder': 0, 'bat': 86, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 71390, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'citroen-ami', 'brand': 'Citroen', 'name': 'Ami', 'v': 'Ami', 'fuel': 'Elektrisch', 'verbrEl': 6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 3, 'acc': 0, 'koffer': 63, 'cilinder': 0, 'bat': 6, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 92, 'price': 7790, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'citroen-ami-4', 'brand': 'Citroen', 'name': 'Ami', 'v': 'Ami Cargo', 'fuel': 'Elektrisch', 'verbrEl': 6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 3, 'acc': 0, 'koffer': 260, 'cilinder': 0, 'bat': 6, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 92, 'price': 8190, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-berlingo-feel', 'brand': 'Citroen', 'name': 'Berlingo ', 'v': 'M 50 kWh Feel', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 775, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 40350, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-berlingo-feel-1', 'brand': 'Citroen', 'name': 'Berlingo ', 'v': 'XL 50 kWh Shine', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1050, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 43330, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-e-berlingo-36', 'brand': 'Citroen', 'name': 'Berlingo Van', 'v': 'M Light PureTech S&S Club', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 170, 'power': 81, 'acc': 0, 'koffer': 3300, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 24176, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-e-berlingo-34', 'brand': 'Citroen', 'name': 'Berlingo Van', 'v': 'XL Heavy 50 kWh Club', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 38611, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-e-berlingo-35', 'brand': 'Citroen', 'name': 'Berlingo Van', 'v': 'M Heavy BlueHDi S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 96, 'acc': 0, 'koffer': 3300, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 19100, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-e-berlingo-38', 'brand': 'Citroen', 'name': 'Berlingo Van', 'v': 'XL Heavy PureTech S&S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 81, 'acc': 0, 'koffer': 3300, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 18211, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-e-berlingo-39', 'brand': 'Citroen', 'name': 'Berlingo Van', 'v': 'M Heavy 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 27782, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'citroen-c3-32', 'brand': 'Citroen', 'name': 'C3', 'v': 'PureTech C-Series S&S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 61, 'acc': 0, 'koffer': 300, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 19535, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'citroen-c4-1', 'brand': 'Citroen', 'name': 'C4', 'v': '&euml;-C4 100 kWh Feel', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 380, 'cilinder': 0, 'bat': 100, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 38600, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'citroen-c4x-elektrisch-1', 'brand': 'Citroen', 'name': 'C4', 'v': '&euml;-C4 100 kWh Business Lounge', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 408, 'cilinder': 0, 'bat': 100, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 32549, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'citroen-c4', 'brand': 'Citroen', 'name': 'C4', 'v': 'PureTech S&S Shine Pack EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 96, 'acc': 0, 'koffer': 537, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 34200, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'citroen-c4x-elektrisch-2', 'brand': 'Citroen', 'name': 'C4 X', 'v': '50 kWh Shine', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 510, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 40410, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'citroen-c5-aircross-2', 'brand': 'Citroen', 'name': 'C5 Aircross', 'v': 'PureTech S/S FEEL', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 96, 'acc': 0, 'koffer': 580, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 34330, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'citroen-c5-aircross-1', 'brand': 'Citroen', 'name': 'C5 Aircross', 'v': 'BlueHDi S/S LIVE EAT8', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 96, 'acc': 0, 'koffer': 580, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 36680, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'citroen-c5-aircross', 'brand': 'Citroen', 'name': 'C5 Aircross', 'v': 'Plug-in Hybrid S/S BUSINESS e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 110, 'acc': 0, 'koffer': 460, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 39809, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'citroen-c5x-23', 'brand': 'Citroen', 'name': 'C5 X', 'v': 'Hybrid e-EAT8 Feel', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 27, 'power': 110, 'acc': 0, 'koffer': 460, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 47220, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'citroen-jumper-e-7', 'brand': 'Citroen', 'name': 'Jumper', 'v': '30 L1H1 BlueHDI S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 103, 'acc': 0, 'koffer': 8000, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 26448, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'citroen-jumper-e-3', 'brand': 'Citroen', 'name': 'Jumper', 'v': '33 L2H2 BlueHDI S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 159, 'power': 103, 'acc': 0, 'koffer': 11500, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 28989, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'citroen-jumper-e-2', 'brand': 'Citroen', 'name': 'Jumper', 'v': '4-35 L4H3 BlueHDI S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 103, 'acc': 0, 'koffer': 17000, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 46857, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'citroen-jumper-e-4', 'brand': 'Citroen', 'name': 'Jumper', 'v': '35 L3H3 BlueHDI Club S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 168, 'power': 103, 'acc': 0, 'koffer': 15000, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 31530, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'citroen-jumper-e-5', 'brand': 'Citroen', 'name': 'Jumper', 'v': '4-35 L3H3 BlueHDI S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 168, 'power': 103, 'acc': 0, 'koffer': 15000, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 31953, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-jumpy-comfort', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'M 50 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 54670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-jumpy-comfort-1', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'M 75 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 60670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-jumpy-comfort-2', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'XL 75 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 61670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-jumpy', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'M BlueHDi S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 185, 'power': 107, 'acc': 0, 'koffer': 5300, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 26723, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-jumpy-e-2', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'M 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 33584, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'citroen-jumpy-e-4', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'M 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 39027, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'citroen-jumpy-e-3', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'XL 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 34854, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'citroen-jumpy-e-9', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'XL 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 40842, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'citroen-jumpy-1', 'brand': 'Citroen', 'name': 'Jumpy', 'v': 'XL BlueHDi S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 107, 'acc': 0, 'koffer': 6100, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 30450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-e-spacetourer-50-32', 'brand': 'Citroen', 'name': 'SpaceTourer', 'v': 'M 50 kWh BUSINESS', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 59290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-e-spacetourer-75-32', 'brand': 'Citroen', 'name': 'SpaceTourer', 'v': 'M 75 kWh BUSINESS', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 65290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-e-spacetourer-75-33', 'brand': 'Citroen', 'name': 'SpaceTourer', 'v': 'XL 75 kWh BUSINESS', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 989, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 66490, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'cupra-born-1', 'brand': 'Cupra', 'name': 'Born', 'v': '58 kWh', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 385, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 48240, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'cupra-born-23', 'brand': 'Cupra', 'name': 'Born', 'v': '77 kWh e-Boost', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 169, 'acc': 0, 'koffer': 385, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 51270, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'cupra-born-33', 'brand': 'Cupra', 'name': 'Born', 'v': '58 kWh e-Boost', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 169, 'acc': 0, 'koffer': 385, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 48490, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'cupra-formentor', 'brand': 'Cupra', 'name': 'Formentor', 'v': 'TSI', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 141, 'power': 110, 'acc': 0, 'koffer': 420, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 35620, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'cupra-formentor-1', 'brand': 'Cupra', 'name': 'Formentor', 'v': 'e-Hybrid DSG', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 110, 'acc': 0, 'koffer': 420, 'cilinder': 1395000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 44980, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'cupra-formentor-2', 'brand': 'Cupra', 'name': 'Formentor', 'v': 'TDI CR', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 110, 'acc': 0, 'koffer': 420, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 38230, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'cupra-leon', 'brand': 'Cupra', 'name': 'Leon', 'v': 'e-Hybrid DSG', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 110, 'acc': 0, 'koffer': 270, 'cilinder': 1395000, 'bat': 37, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 47930, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'cupra-leon', 'brand': 'Cupra', 'name': 'Leon', 'v': 'TSI', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 110, 'acc': 0, 'koffer': 270, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 35430, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'cupra-leon-st', 'brand': 'Cupra', 'name': 'Leon Sportstourer', 'v': 'e-Hybrid DSG', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 110, 'acc': 0, 'koffer': 470, 'cilinder': 1395000, 'bat': 37, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 48920, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'cupra-leon-st-2', 'brand': 'Cupra', 'name': 'Leon Sportstourer', 'v': 'TSI', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 110, 'acc': 0, 'koffer': 470, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 36490, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'dacia-duster-32', 'brand': 'Dacia', 'name': 'Duster ', 'v': 'ECO-G Journey', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 145, 'power': 74, 'acc': 0, 'koffer': 445, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 20590, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'dacia-duster-23', 'brand': 'Dacia', 'name': 'Duster ', 'v': 'TCe Expression', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 141, 'power': 96, 'acc': 0, 'koffer': 445, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 20490, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'dacia-duster-24', 'brand': 'Dacia', 'name': 'Duster ', 'v': 'Blue dCi Journey', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 85, 'acc': 0, 'koffer': 445, 'cilinder': 1461000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 21590, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'MPV', 'id': 'dacia-jogger-2', 'brand': 'Dacia', 'name': 'Jogger', 'v': 'ECO-G Essential 5PL', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 74, 'acc': 0, 'koffer': 607, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 17490, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'MPV', 'id': 'dacia-jogger', 'brand': 'Dacia', 'name': 'Jogger', 'v': 'TCe Essential 7PL', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 81, 'acc': 0, 'koffer': 160, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 18790, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'dacia-sandero-32', 'brand': 'Dacia', 'name': 'Sandero', 'v': 'TCe Expression', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 67, 'acc': 0, 'koffer': 310, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 10353, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'dacia-sandero-33', 'brand': 'Dacia', 'name': 'Sandero', 'v': 'ECO-G Expression', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 109, 'power': 74, 'acc': 0, 'koffer': 310, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 15390, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'dacia-spring', 'brand': 'Dacia', 'name': 'Spring', 'v': 'Expression', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 32, 'acc': 0, 'koffer': 270, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 21790, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'dfsk-fengong-5', 'brand': 'DFSK', 'name': 'FENGON 5', 'v': '1.5 137PK CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 224, 'power': 101, 'acc': 0, 'koffer': 779, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 30190, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'dfsk-fengong-5-2', 'brand': 'DFSK', 'name': 'FENGON 5', 'v': '1.5 137PK LPG CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 224, 'power': 101, 'acc': 0, 'koffer': 779, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 32990, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'dfsk-fengon-500', 'brand': 'DFSK', 'name': 'FENGON 500', 'v': '1.5 115PK', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 222, 'power': 85, 'acc': 0, 'koffer': 385, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 19990, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'dfsk-fengon-500-2', 'brand': 'DFSK', 'name': 'FENGON 500', 'v': '1.5 115PK LPG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 222, 'power': 85, 'acc': 0, 'koffer': 385, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 22750, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'dfsk-fengong-580', 'brand': 'DFSK', 'name': 'FENGON 580', 'v': '1.5 147PK CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 198, 'power': 108, 'acc': 0, 'koffer': 390, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 28490, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'dfsk-fengong-580-2', 'brand': 'DFSK', 'name': 'FENGON 580', 'v': '1.5 147PK LPG CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 198, 'power': 108, 'acc': 0, 'koffer': 390, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 30990, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'dfsk-fengon-7-2', 'brand': 'DFSK', 'name': 'FENGON 7', 'v': '2.0 220PK AWD AUT LPG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 218, 'power': 162, 'acc': 0, 'koffer': 450, 'cilinder': 1967000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 42990, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'dfsk-fengon-7', 'brand': 'DFSK', 'name': 'FENGON 7', 'v': '2.0 220PK AWD AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 10.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 245, 'power': 162, 'acc': 0, 'koffer': 450, 'cilinder': 1967000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 40190, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ds-ds3-crossback-e-tense-32', 'brand': 'DS', 'name': 'DS 3', 'v': 'PureTech Bastille AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 135, 'power': 96, 'acc': 0, 'koffer': 350, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 32150, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ds-ds3-crossback-e-tense-33', 'brand': 'DS', 'name': 'DS 3', 'v': 'E-TENSE Performance Line', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 114, 'acc': 0, 'koffer': 350, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 41500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ds-dis4', 'brand': 'DS', 'name': 'DS 4', 'v': 'BlueHDi Bastille + AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 96, 'acc': 0, 'koffer': 430, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 34300, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ds-dis4-2', 'brand': 'DS', 'name': 'DS 4', 'v': 'E-Tense Esprit De Voyage AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 132, 'acc': 0, 'koffer': 390, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 52850, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'ds-ds7-crossback-e-tense-phev-32', 'brand': 'DS', 'name': 'DS 7', 'v': 'BlueHDi AUT Performance Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 148, 'power': 96, 'acc': 0, 'koffer': 555, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 45400, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'ds-ds7-crossback-e-tense-phev-33', 'brand': 'DS', 'name': 'DS 7', 'v': 'E-TENSE AUT Bastille', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 132, 'acc': 0, 'koffer': 555, 'cilinder': 1598000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 51100, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'ds9-e-tense-32', 'brand': 'DS', 'name': 'DS 9', 'v': 'E-TENSE PHEV Performance Line +', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 147, 'acc': 0, 'koffer': 510, 'cilinder': 1598000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 62050, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500-e-31', 'brand': 'Fiat', 'name': '500', 'v': '42 kW 3+1', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 87, 'acc': 0, 'koffer': 185, 'cilinder': 0, 'bat': 42, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 35790, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-red-2', 'brand': 'Fiat', 'name': '500', 'v': '42 kW Red', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 87, 'acc': 0, 'koffer': 185, 'cilinder': 0, 'bat': 42, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 34190, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-red-3', 'brand': 'Fiat', 'name': '500', 'v': '24 kW Red', 'fuel': 'Elektrisch', 'verbrEl': 13, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 70, 'acc': 0, 'koffer': 185, 'cilinder': 0, 'bat': 24, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 29290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-berlina-42-33', 'brand': 'Fiat', 'name': '500', 'v': 'Hybrid Dolcevita', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 51, 'acc': 0, 'koffer': 185, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 18750, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-cabrio-1', 'brand': 'Fiat', 'name': '500C', 'v': '42 kW Red', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 87, 'acc': 0, 'koffer': 185, 'cilinder': 0, 'bat': 42, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 37190, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'fiat-doblo-e-2', 'brand': 'Fiat', 'name': 'Doblo Cargo', 'v': 'PureTech S&S L1 Light', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 81, 'acc': 0, 'koffer': 3300, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 17109, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'fiat-doblo-e-3', 'brand': 'Fiat', 'name': 'Doblo Cargo', 'v': 'BlueHDi S&S L2 Heavy', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 96, 'acc': 0, 'koffer': 4000, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 19905, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'fiat-e-doblo', 'brand': 'Fiat', 'name': 'Doblo Cargo', 'v': '50 kWh L1 Heavy', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 27782, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'fiat-e-doblo-2', 'brand': 'Fiat', 'name': 'Doblo Cargo', 'v': '50 kWh L2 Heavy', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 4000, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 40838, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'fiat-doblo-e-4', 'brand': 'Fiat', 'name': 'Doblo Cargo', 'v': 'PureTech S&S L2 Heavy', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 81, 'acc': 0, 'koffer': 4000, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 18211, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-diesel-23', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L1H1 3T5', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 198, 'power': 103, 'acc': 0, 'koffer': 8000, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 28989, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-diesel-24', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L2H2 3T3', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 215, 'power': 103, 'acc': 0, 'koffer': 11500, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 50, 'price': 29836, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-diesel-25', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L3H3 3T5', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 226, 'power': 103, 'acc': 0, 'koffer': 15000, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 49, 'price': 32377, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-diesel-26', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB Maxi L4H3 3T5', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 229, 'power': 132, 'acc': 0, 'koffer': 16000, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 49, 'price': 35003, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC Maxi L3 3T5 (Heavy Duty)', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 276, 'power': 132, 'acc': 0, 'koffer': 10000, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 45, 'price': 30852, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-1', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC Maxi L4 3T5 (Heavy Duty)', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 276, 'power': 132, 'acc': 0, 'koffer': 10000, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 45, 'price': 31106, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-2', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CDC Maxi L3 3T5', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 276, 'power': 132, 'acc': 0, 'koffer': 17000, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 45, 'price': 32122, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-3', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CDC Maxi L4 3T5', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 276, 'power': 132, 'acc': 0, 'koffer': 17000, 'cilinder': 2184000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 45, 'price': 32377, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-1', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB M-H1 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 10000, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 55664, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-2', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB M-H1 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 10000, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 76839, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-3', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB M-H2 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 11500, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 55967, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-4', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB M-H2 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 11500, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 77142, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-5', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L-H2 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 13000, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 57177, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-6', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L-H2 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 13000, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 78352, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-7', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L-H3 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 15000, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 58266, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-8', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L-H3 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 15000, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 79441, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-9', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB XL-H2 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 15000, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 58387, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-10', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB XL-H2 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 15000, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 79562, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-11', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB XL-H3 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 16000, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 59476, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-e-12', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB XL-H3 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 16000, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 80651, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-window-1', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB M-H2 3T5 47kWh (ruiten)', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 11500, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 56572, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-window-2', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB M-H2 3T5 79kWh (ruiten)', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 11500, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 77747, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-window-23', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L-H2 3T5 47kWh (ruiten)', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 13000, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 57782, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'fiat-ducato-window-24', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'GB L-H2 3T5 79kWh (ruiten)', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 13000, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 78957, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-4', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC M 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 54757, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-8', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC M 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 75932, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-9', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC ML 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 54757, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-10', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC L 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 55785, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-5', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC L 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 76960, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-6', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC XL 3T5 47kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 56814, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'fiat-ducato-cc-23-7', 'brand': 'Fiat', 'name': 'Ducato', 'v': 'CC XL 3T5 79kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 77989, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'fiat-scudo-diesel', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'GB MultiJet L2', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 137, 'power': 107, 'acc': 0, 'koffer': 5300, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 26723, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'fiat-scudo-diesel-2', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'CREWCAB MultiJet L3', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 144, 'power': 107, 'acc': 0, 'koffer': 4000, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 30450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'fiat-scudo-e-1', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'GB 50kW L3', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 34854, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'fiat-scudo-e-2', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'GB 75kW L3', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 40842, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'fiat-scudo-e-3', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'CREWCAB 75kW L3', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 4000, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 44351, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'fiat-scudo-combi', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'COMBI 50kW L2', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 327, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 54670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'fiat-scudo-combi-2', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'COMBI 75kW L2', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 327, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 60670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'fiat-tipo-23', 'brand': 'Fiat', 'name': 'Tipo', 'v': 'FireFly', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 74, 'acc': 0, 'koffer': 440, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 20550, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'fiat-tipo-sw', 'brand': 'Fiat', 'name': 'Tipo Stationwagon', 'v': 'FireFly', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 74, 'acc': 0, 'koffer': 550, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 21750, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ford-ecosport-benz', 'brand': 'Ford', 'name': 'EcoSport', 'v': 'EcoBoost Titanium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 134, 'power': 92, 'acc': 0, 'koffer': 320, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 25440, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'ford-explorer-phev', 'brand': 'Ford', 'name': 'Explorer', 'v': 'EcoBoost PHEV ST-Line AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 21.5, 'verbrBr': 12, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 71, 'power': 336, 'acc': 0, 'koffer': 330, 'cilinder': 3000000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 89750, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':178 },
{ 'segment': 'B', 'id': 'ford-fiesta-benz-32', 'brand': 'Ford', 'name': 'Fiesta', 'v': 'EcoBoost Titanium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 74, 'acc': 0, 'koffer': 292, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 24880, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ford-focus-23', 'brand': 'Ford', 'name': 'Focus', 'v': 'EcoBoost mHEV Titanium Design', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 92, 'acc': 0, 'koffer': 392, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 31720, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ford-focus-clipper-1', 'brand': 'Ford', 'name': 'Focus Clipper', 'v': 'EcoBoost mHEV Titanium Design', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 92, 'acc': 0, 'koffer': 392, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 32720, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-kuga-2', 'brand': 'Ford', 'name': 'Kuga ', 'v': 'EcoBoost Titanium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 88, 'acc': 0, 'koffer': 435, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 34650, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-kuga', 'brand': 'Ford', 'name': 'Kuga ', 'v': 'Titanium PHEV AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 15.8, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 25, 'power': 165, 'acc': 0, 'koffer': 405, 'cilinder': 2522000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 43970, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-kuga-1', 'brand': 'Ford', 'name': 'Kuga ', 'v': 'EcoBlue Titanium AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 88, 'acc': 0, 'koffer': 435, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 41450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-mustang-mach-e-1', 'brand': 'Ford', 'name': 'Mustang Mach-E', 'v': '99 kWh Premium RWD', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 216, 'acc': 0, 'koffer': 502, 'cilinder': 0, 'bat': 99, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 69100, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-mustang-mach-e-2', 'brand': 'Ford', 'name': 'Mustang Mach-E', 'v': '99 kWh AWD GT', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 358, 'acc': 0, 'koffer': 502, 'cilinder': 0, 'bat': 99, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 83770, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-mustang-mach-e', 'brand': 'Ford', 'name': 'Mustang Mach-E', 'v': '76 kWh Premium AWD', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 198, 'acc': 0, 'koffer': 502, 'cilinder': 0, 'bat': 76, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 68750, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ford-puma', 'brand': 'Ford', 'name': 'Puma', 'v': 'Ecoboost mHEV Titanium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 114, 'acc': 0, 'koffer': 468, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 28300, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'ford-ranger', 'brand': 'Ford', 'name': 'Ranger', 'v': 'EcoBlue A10 e-4WD Wildtrak', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2953000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 46, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'ford-tourneo-connect-23', 'brand': 'Ford', 'name': 'Tourneo Connect', 'v': 'Ecoboost Active', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 84, 'acc': 0, 'koffer': 1213, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 32760, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'ford-tourneo-custom-23', 'brand': 'Ford', 'name': 'Tourneo Custom', 'v': 'TDCi 320L L2H1 mHEV Trend', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 145, 'power': 96, 'acc': 0, 'koffer': 4350, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 51080, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'ford-transit-trend-1', 'brand': 'Ford', 'name': 'Transit', 'v': '350M L2 TD Trend FWD', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 238, 'power': 125, 'acc': 0, 'koffer': 10000, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 31195, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'ford-transit-trend-2', 'brand': 'Ford', 'name': 'Transit', 'v': '350L L3 TD Trend FWD', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 240, 'power': 125, 'acc': 0, 'koffer': 9500, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 31619, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'ford-transit-trend-3', 'brand': 'Ford', 'name': 'Transit', 'v': '350E L4 TD Trend RWD', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 245, 'power': 125, 'acc': 0, 'koffer': 0, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 46379, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'ford-transit-minivan', 'brand': 'Ford', 'name': 'Transit', 'v': 'MINIBUS 330M L2H2 TD Ambiente', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 226, 'power': 96, 'acc': 0, 'koffer': 6100, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 43409, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'ford-transit-minivan-2', 'brand': 'Ford', 'name': 'Transit', 'v': 'MINIBUS 330L L3H2 TD Ambiente', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 230, 'power': 96, 'acc': 0, 'koffer': 7600, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 44377, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'ford-transit-elek-1', 'brand': 'Ford', 'name': 'Transit', 'v': '350M L2H2 Electric 67kWh Trend RWD AUT', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 0, 'koffer': 9500, 'cilinder': 0, 'bat': 67, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 54176, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'ford-transit-elek-2', 'brand': 'Ford', 'name': 'Transit', 'v': '350L L3 Electric 67kWh Trend AUT RWD', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 67, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 51241, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'ford-transit-elek-3', 'brand': 'Ford', 'name': 'Transit', 'v': '350E L4 Electric 67kWh Trend AUT RWD', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 67, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 66846, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'ford-transit-connect-24', 'brand': 'Ford', 'name': 'Transit Connect', 'v': 'L2 EcoBoost Trend', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 74, 'acc': 0, 'koffer': 3600, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 19921, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'ford-transit-connect-23', 'brand': 'Ford', 'name': 'Transit Connect', 'v': 'L2 TDCi Trend', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 74, 'acc': 0, 'koffer': 3600, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 21357, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'ford-transit-courrier-2', 'brand': 'Ford', 'name': 'Transit Courier', 'v': 'EcoBoost Trend S&S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 74, 'acc': 0, 'koffer': 1910, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 14695, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'ford-transit-courrier', 'brand': 'Ford', 'name': 'Transit Courier', 'v': 'Duratorq TDCi Ambiente S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 74, 'acc': 0, 'koffer': 1910, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 21931, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'ford-transit-trend', 'brand': 'Ford', 'name': 'Transit Custom', 'v': '300L TD Trend', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 189, 'power': 110, 'acc': 0, 'koffer': 6800, 'cilinder': 1996000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 30958, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'honda-civic-benz', 'brand': 'Honda', 'name': 'Civic', 'v': 'HYBRID Elegance eCVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 105, 'acc': 0, 'koffer': 410, 'cilinder': 1993000, 'bat': 1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 31790, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'honda-e2', 'brand': 'Honda', 'name': 'e', 'v': 'Advance 17', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 113, 'acc': 0, 'koffer': 171, 'cilinder': 0, 'bat': 35, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 38995, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'honda-jazz', 'brand': 'Honda', 'name': 'Jazz', 'v': 'e:HEV Elegance e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 80, 'acc': 0, 'koffer': 304, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 26280, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-bayon', 'brand': 'Hyundai', 'name': 'BAYON', 'v': 'T-GDi Air', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 74, 'acc': 0, 'koffer': 411, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 21149, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'hyundai-i10', 'brand': 'Hyundai', 'name': 'i10', 'v': 'Twist', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 114, 'power': 49, 'acc': 0, 'koffer': 252, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 15849, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'hyundai-i20-32', 'brand': 'Hyundai', 'name': 'i20', 'v': 'T-GDI Twist', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 74, 'acc': 0, 'koffer': 352, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 20049, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'hyundai-i30', 'brand': 'Hyundai', 'name': 'i30', 'v': 'T-GDi 48v Twist DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 88, 'acc': 0, 'koffer': 395, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 26399, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'hyundai-i30-wagon', 'brand': 'Hyundai', 'name': 'i30 Wagon', 'v': 'T-GDi 48v Twist', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 118, 'power': 88, 'acc': 0, 'koffer': 602, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 26099, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq5', 'brand': 'Hyundai', 'name': 'IONIQ 5', 'v': '58 kWh Core', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 125, 'acc': 0, 'koffer': 531, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 54499, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq5-1', 'brand': 'Hyundai', 'name': 'IONIQ 5', 'v': '73 kWh Balance', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 531, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 64249, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq5-2', 'brand': 'Hyundai', 'name': 'IONIQ 5', 'v': '77 kWh Core', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 531, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 58499, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq6-3', 'brand': 'Hyundai', 'name': 'IONIQ 6', 'v': '53 kWh CORE PLUS', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 111, 'acc': 0, 'koffer': 401, 'cilinder': 0, 'bat': 53, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 53999, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq6-5', 'brand': 'Hyundai', 'name': 'IONIQ 6', 'v': '77,4 kWh CORE PLUS', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 401, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 58999, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-elek-1', 'brand': 'Hyundai', 'name': 'Kona', 'v': '39,2 kWh Techno', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 332, 'cilinder': 0, 'bat': 39, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 38499, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-elek', 'brand': 'Hyundai', 'name': 'Kona', 'v': '64 kWh Sky', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 332, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 47499, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'hyundai-santafe-phev', 'brand': 'Hyundai', 'name': 'Santa Fe', 'v': 'T-GDi HEV 2WD Shine Aut', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 152, 'power': 132, 'acc': 0, 'koffer': 634, 'cilinder': 1598000, 'bat': 1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 56099, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'hyundai-santafe-phev', 'brand': 'Hyundai', 'name': 'Santa Fe', 'v': 'T-GDi PHEV 4WD Shine Aut', 'fuel': 'Plug-in hybride', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 634, 'cilinder': 1598000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 64099, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'hyundai-staria', 'brand': 'Hyundai', 'name': 'Staria', 'v': 'CRDi Twist', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 205, 'power': 130, 'acc': 0, 'koffer': 2890, 'cilinder': 2199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 38719, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'MPV', 'id': 'hyundai-staria-1', 'brand': 'Hyundai', 'name': 'Staria', 'v': 'CRDi Feel AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 212, 'power': 130, 'acc': 0, 'koffer': 1303, 'cilinder': 2199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 46999, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'hyundai-tucson', 'brand': 'Hyundai', 'name': 'Tucson', 'v': 'T-GDi Techno', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 110, 'acc': 0, 'koffer': 620, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 34449, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'hyundai-tucson-2', 'brand': 'Hyundai', 'name': 'Tucson', 'v': 'T-GDi Techno 4WD 6AT PHEV', 'fuel': 'Plug-in hybride', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 616, 'cilinder': 1598000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 51449, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'jac-iev75', 'brand': 'JAC', 'name': 'IEV7S', 'v': '39 kWh', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 250, 'cilinder': 0, 'bat': 39, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 29900, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jaguar-epace', 'brand': 'Jaguar', 'name': 'E-PACE', 'v': 'P200 AWD AUT R-Dynamic S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 212, 'power': 147, 'acc': 0, 'koffer': 494, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 56600, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jaguar-epace-phev', 'brand': 'Jaguar', 'name': 'E-PACE', 'v': 'P300e AWD AUT R-Dynamic S', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 7.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 35, 'power': 227, 'acc': 0, 'koffer': 494, 'cilinder': 1498000, 'bat': 11, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 63200, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'jaguar-fpace', 'brand': 'Jaguar', 'name': 'F-PACE', 'v': 'P250 AWD AUT R-Dynamic S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 209, 'power': 183, 'acc': 0, 'koffer': 650, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 70900, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'jaguar-fpace-phev', 'brand': 'Jaguar', 'name': 'F-PACE', 'v': 'P400e PHEV AWD AUT R-Dynamic S', 'fuel': 'Plug-in hybride', 'verbrEl': 24, 'verbrBr': 8.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 297, 'acc': 0, 'koffer': 650, 'cilinder': 1997000, 'bat': 17, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 85100, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'jaguar-ipace', 'brand': 'Jaguar', 'name': 'I-PACE', 'v': 'EV400 R-Dynamic SE AWD AUT', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 294, 'acc': 0, 'koffer': 656, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 93900, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'jaguar-ipace-1', 'brand': 'Jaguar', 'name': 'I-PACE', 'v': 'EV400 R-Dynamic HSE AWD AUT', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 294, 'acc': 0, 'koffer': 656, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 102400, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'jaguar-xe', 'brand': 'Jaguar', 'name': 'XE', 'v': 'P250 R-Dynamic S AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 184, 'acc': 0, 'koffer': 549, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 52700, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'jaguar-xf', 'brand': 'Jaguar', 'name': 'XF', 'v': 'P250 AUT R-Dynamic S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 177, 'power': 184, 'acc': 0, 'koffer': 459, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 65300, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'jeep-avenger-1', 'brand': 'Jeep', 'name': 'Avenger', 'v': 'BEV Longitude', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 115, 'acc': 0, 'koffer': 296, 'cilinder': 0, 'bat': 54, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 39500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jeep-compass', 'brand': 'Jeep', 'name': 'Compass', 'v': 'Turbo T4 4xe ATX Limited', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 8.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 44, 'power': 96, 'acc': 0, 'koffer': 420, 'cilinder': 1332000, 'bat': 11, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 49920, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'jeep-grand-cherokee', 'brand': 'Jeep', 'name': 'Grand Cherokee', 'v': '4xe PHEV 4WD AT8 Overland', 'fuel': 'Plug-in hybride', 'verbrEl': 24, 'verbrBr': 11.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 69, 'power': 200, 'acc': 0, 'koffer': 520, 'cilinder': 1995000, 'bat': 17, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 93000, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'jeep-renegade', 'brand': 'Jeep', 'name': 'Renegade', 'v': 'T4 4xe Limited ATX', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 47, 'power': 96, 'acc': 0, 'koffer': 330, 'cilinder': 1332000, 'bat': 11, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 42400, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jeep-wrangler', 'brand': 'Jeep', 'name': 'Wrangler', 'v': 'Unlimited 4xe PHEV Sahara AT8 4X4', 'fuel': 'Plug-in hybride', 'verbrEl': 34.3, 'verbrBr': 13.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 79, 'power': 200, 'acc': 0, 'koffer': 533, 'cilinder': 1995000, 'bat': 17, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 65500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':198 },
{ 'segment': 'C', 'id': 'kia-ceed-benzine', 'brand': 'Kia', 'name': 'Ceed', 'v': 'T-GDi ISG Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 88, 'acc': 0, 'koffer': 395, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 25890, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-diesel', 'brand': 'Kia', 'name': 'Ceed', 'v': 'CRDi MHEV ISG Pulse', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 118, 'power': 100, 'acc': 0, 'koffer': 357, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 28990, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-sw-benz', 'brand': 'Kia', 'name': 'Ceed SW', 'v': 'T-GDi ISG Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 88, 'acc': 0, 'koffer': 625, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 27390, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-sw-diesel', 'brand': 'Kia', 'name': 'Ceed SW', 'v': 'CRDi MHEV ISG Pulse', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 100, 'acc': 0, 'koffer': 512, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 30490, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-sporswagon-phev-32', 'brand': 'Kia', 'name': 'Ceed SW', 'v': 'GDi PHEV Business Line DCT', 'fuel': 'Plug-in hybride', 'verbrEl': 9.3, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 77, 'acc': 0, 'koffer': 438, 'cilinder': 1580000, 'bat': 8, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 38290, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'kia-ev6-1', 'brand': 'Kia', 'name': 'EV6', 'v': '77,4kWh RWD Earth', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 520, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 59890, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'kia-ev6', 'brand': 'Kia', 'name': 'EV6', 'v': '58kWh RWD Air', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 125, 'acc': 0, 'koffer': 520, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 50490, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-benz-23', 'brand': 'Kia', 'name': 'Niro ', 'v': 'GDi HEV 6DCT Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 104, 'acc': 0, 'koffer': 451, 'cilinder': 1580000, 'bat': 1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 35190, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-phev-23', 'brand': 'Kia', 'name': 'Niro ', 'v': 'GDi PHEV 6DCT Pure', 'fuel': 'Plug-in hybride', 'verbrEl': 10.5, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 23, 'power': 104, 'acc': 0, 'koffer': 348, 'cilinder': 1580000, 'bat': 11, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 39790, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-e-23', 'brand': 'Kia', 'name': 'Niro ', 'v': '64,8 kWh Pulse', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 475, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 49990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'kia-picanto', 'brand': 'Kia', 'name': 'Picanto', 'v': 'MPI ISG Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 49, 'acc': 0, 'koffer': 255, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 16390, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-proceed-benz', 'brand': 'Kia', 'name': 'ProCeed', 'v': 'T-GDi ISG GT Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 88, 'acc': 0, 'koffer': 594, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 33090, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-rio', 'brand': 'Kia', 'name': 'Rio', 'v': 'Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 62, 'acc': 0, 'koffer': 300, 'cilinder': 1248000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 20390, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-sorento-2', 'brand': 'Kia', 'name': 'Sorento', 'v': 'HEV 2WD AT6 PULSE', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 132, 'acc': 0, 'koffer': 813, 'cilinder': 1598000, 'bat': 5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 55290, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-sorento', 'brand': 'Kia', 'name': 'Sorento', 'v': 'PHEV 4WD AT6 PULSE', 'fuel': 'Plug-in hybride', 'verbrEl': 20, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 132, 'acc': 0, 'koffer': 813, 'cilinder': 1598000, 'bat': 38, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 62590, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-sorento-3', 'brand': 'Kia', 'name': 'Sorento', 'v': 'CRDi 2WD DCT8 PULSE', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 142, 'acc': 0, 'koffer': 821, 'cilinder': 2199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 53090, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-soul-ev', 'brand': 'Kia', 'name': 'Soul ', 'v': 'EV 64KWH Pulse AUT', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 224, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 51290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-soul-ev-69', 'brand': 'Kia', 'name': 'Soul ', 'v': 'EV 39,2KWH Pulse AUT', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 224, 'cilinder': 0, 'bat': 39, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 47390, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-sportage-benz', 'brand': 'Kia', 'name': 'Sportage', 'v': 'T-GDi Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 110, 'acc': 0, 'koffer': 591, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 35090, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-sportage-diesel', 'brand': 'Kia', 'name': 'Sportage', 'v': 'CRDi Pulse 48V 7DCT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 100, 'acc': 0, 'koffer': 526, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 39690, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-sportage-phev', 'brand': 'Kia', 'name': 'Sportage', 'v': 'T-GDi PHEV Pulse 6A/T AWD', 'fuel': 'Plug-in hybride', 'verbrEl': 22.3, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 25, 'power': 132, 'acc': 0, 'koffer': 540, 'cilinder': 1598000, 'bat': 38, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 33383, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'kia-stonic-23', 'brand': 'Kia', 'name': 'Stonic', 'v': 'Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 62, 'acc': 0, 'koffer': 332, 'cilinder': 1248000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 24090, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-xceed-benz', 'brand': 'Kia', 'name': 'Xceed', 'v': 'T-GDi ISG Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 88, 'acc': 0, 'koffer': 426, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 29090, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-xceed-diesel', 'brand': 'Kia', 'name': 'Xceed', 'v': 'CRDi ISG MHEV Pulse e-clutch', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 100, 'acc': 0, 'koffer': 426, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 32190, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'kia-xceed-phev-32', 'brand': 'Kia', 'name': 'Xceed', 'v': 'GDi PHEV Business Line DCT6', 'fuel': 'Plug-in hybride', 'verbrEl': 9, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 77, 'acc': 0, 'koffer': 291, 'cilinder': 1580000, 'bat': 25, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 37990, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'range-rover-defender', 'brand': 'Land', 'name': 'Rover Defender 110', 'v': 'P400e PHEV AWD AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 43.6, 'verbrBr': 8.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 58, 'power': 297, 'acc': 0, 'koffer': 857, 'cilinder': 1997000, 'bat': 19.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 79400, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':145 },
{ 'segment': 'SUV-EF', 'id': 'land-rover-discovery', 'brand': 'Land', 'name': 'Rover Discovery', 'v': 'D250 AWD AUT R-Dynamic S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2996000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'landrover-discovery-sport-phev', 'brand': 'Land', 'name': 'Rover Discovery Sport', 'v': 'P300e PHEV S AWD AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 227, 'acc': 0, 'koffer': 963, 'cilinder': 1497000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 58900, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'range-rover-diesel', 'brand': 'Land', 'name': 'Rover Range Rover', 'v': 'D300 AWD AUTO SWB SE', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'landrover-rangerover-phev', 'brand': 'Land', 'name': 'Rover Range Rover', 'v': 'P440e AWD AUTO SWB SE', 'fuel': 'Plug-in hybride', 'verbrEl': 29, 'verbrBr': 9.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 324, 'acc': 0, 'koffer': 818, 'cilinder': 2996000, 'bat': 38, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 140589, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'landrover-rangerover-evoque-diesel', 'brand': 'Land', 'name': 'Rover Range Rover Evoque', 'v': 'D165 S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 162, 'power': 120, 'acc': 0, 'koffer': 472, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 47540, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'landrover-rangerover-evoque-phev', 'brand': 'Land', 'name': 'Rover Range Rover Evoque', 'v': 'P300e AUT AWD S', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 227, 'acc': 0, 'koffer': 472, 'cilinder': 1497000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 60460, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'landrover-rangerover-evoque-benzine', 'brand': 'Land', 'name': 'Rover Range Rover Evoque', 'v': 'P160 MHEV AUT S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 180, 'power': 118, 'acc': 0, 'koffer': 472, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 48230, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'range-rover-sport-phev', 'brand': 'Land', 'name': 'Rover Range Rover Sport', 'v': 'P440e AWD Auto S', 'fuel': 'Plug-in hybride', 'verbrEl': 28, 'verbrBr': 9.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 324, 'acc': 0, 'koffer': 450, 'cilinder': 2996000, 'bat': 38, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 102400, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'landrover-rangerover-velar-diesel', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'D200 MHEV AWD AUT S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 183, 'power': 150, 'acc': 0, 'koffer': 552, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 71050, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'landrover-rangerover-velar-benzine', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'P250 AWD AUT S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 226, 'power': 184, 'acc': 0, 'koffer': 568, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 69160, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'rangerover-velar-phev', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'P400e PHEV AWD AUT Dynamic SE', 'fuel': 'Plug-in hybride', 'verbrEl': 22, 'verbrBr': 9.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 42, 'power': 297, 'acc': 0, 'koffer': 503, 'cilinder': 1997000, 'bat': 19, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 89920, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'lexus-es-2023', 'brand': 'Lexus', 'name': 'ES', 'v': '300h', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 131, 'acc': 0, 'koffer': 454, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 55700, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'lexus-nx', 'brand': 'Lexus', 'name': 'NX ', 'v': '350h AWD Executive Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 140, 'acc': 0, 'koffer': 549, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 68650, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'lexus-rx-1', 'brand': 'Lexus', 'name': 'RX', 'v': '350h AWD CVT Business Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 180, 'acc': 0, 'koffer': 901, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 70980, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'lexus-rx', 'brand': 'Lexus', 'name': 'RX', 'v': '450h+ AWD CVT Business Line', 'fuel': 'Plug-in hybride', 'verbrEl': 27.8, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 225, 'acc': 0, 'koffer': 901, 'cilinder': 2487000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 85300, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'lexus-rz', 'brand': 'Lexus', 'name': 'RZ', 'v': '450e AWD Business Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 80, 'acc': 0, 'koffer': 522, 'cilinder': 0, 'bat': 71, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 75000, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'lexus-ux-2', 'brand': 'Lexus', 'name': 'UX', 'v': '250h Business Line', 'fuel': 'Benzine', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 112, 'acc': 0, 'koffer': 401, 'cilinder': 1987000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 50240, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'lexus-ux', 'brand': 'Lexus', 'name': 'UX', 'v': '300e Business Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 367, 'cilinder': 0, 'bat': 54, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 55850, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'lynkco-1', 'brand': 'Lynk&amp;Co', 'name': '1', 'v': '0', 'fuel': 'Plug-in hybride', 'verbrEl': 18.5, 'verbrBr': 9.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 27, 'power': 132, 'acc': 0, 'koffer': 466, 'cilinder': 1477000, 'bat': 17, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 42000, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'maxus-deliver-9-diesel', 'brand': 'Maxus', 'name': 'Deliver 9', 'v': 'GB Diesel CIT L3H2 RWD Base', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 254, 'power': 120, 'acc': 0, 'koffer': 11550, 'cilinder': 2000000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 46, 'price': 31754, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'maxus-deliver-9-diesel-1', 'brand': 'Maxus', 'name': 'Deliver 9', 'v': 'CC Diesel CIT L4 RWD Base', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 268, 'power': 120, 'acc': 0, 'koffer': 11000, 'cilinder': 2000000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 30907, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'maxus-edeliver-3-6', 'brand': 'Maxus', 'name': 'eDeliver 3', 'v': '35kWh LWB Aut', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 6300, 'cilinder': 0, 'bat': 35, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 29213, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'maxus-edeliver-3-7', 'brand': 'Maxus', 'name': 'eDeliver 3', 'v': '53kWh LWB Aut', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 6300, 'cilinder': 0, 'bat': 53, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 32178, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'maxus-edeliver-9-7', 'brand': 'Maxus', 'name': 'eDeliver 9', 'v': '52 kWh L2H2 N1', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 9700, 'cilinder': 0, 'bat': 52, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 49118, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'maxus-edeliver-9-10', 'brand': 'Maxus', 'name': 'eDeliver 9', 'v': '72 kWh L3H2 N1', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 11000, 'cilinder': 0, 'bat': 72, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 63033, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'maxus-edeliver-9-1', 'brand': 'Maxus', 'name': 'eDeliver 9', 'v': '89 kWh L3H3 N2', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 12500, 'cilinder': 0, 'bat': 89, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 75133, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'MPV', 'id': 'maxus-ev80', 'brand': 'Maxus', 'name': 'EV80', 'v': '56 kWh', 'fuel': 'Elektrisch', 'verbrEl': 34, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 92, 'acc': 0, 'koffer': 11600, 'cilinder': 0, 'bat': 56, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 66663, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'MPV', 'id': 'maxus-mifa9', 'brand': 'Maxus', 'name': 'Mifa 9', 'v': '90 kWh Luxury', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 180, 'acc': 0, 'koffer': 466, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 75990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'MPV', 'id': 'maxus-T90', 'brand': 'Maxus', 'name': 'T90', 'v': 'EV 89 kWh Elite', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 130, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 89, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 66538, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mazda-2-benz', 'brand': 'Mazda', 'name': '2', 'v': 'SKYACTIV-G SkyMove', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 109, 'power': 55, 'acc': 0, 'koffer': 280, 'cilinder': 1496000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 18490, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mazda-2-hyb', 'brand': 'Mazda', 'name': '2 Hybrid', 'v': 'Hybrid VVT-i Pure CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 3.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 87, 'power': 68, 'acc': 0, 'koffer': 286, 'cilinder': 1490000, 'bat': 4, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 26590, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mazda-3-hatchback-benz', 'brand': 'Mazda', 'name': '3 Hatchback ', 'v': 'SKYACTIV-G M Hybrid SkyMove AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 90, 'acc': 0, 'koffer': 351, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 27390, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mazda-3-benzine', 'brand': 'Mazda', 'name': '3 Sedan ', 'v': 'SKYACTIV-G M Hybrid SkyDrive AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 90, 'acc': 0, 'koffer': 444, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 29490, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mazda-6', 'brand': 'Mazda', 'name': '6', 'v': 'SKYACTIV-G SkyDrive', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 120, 'acc': 0, 'koffer': 489, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 33890, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mazda-6-wagon', 'brand': 'Mazda', 'name': '6 Wagon', 'v': 'SKYACTIV-G SkyDrive', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 157, 'power': 120, 'acc': 0, 'koffer': 522, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 33890, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'mazda-cx30-benzine', 'brand': 'Mazda', 'name': 'CX-30', 'v': 'SKYACTIV-G SkyMove AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 90, 'acc': 0, 'koffer': 430, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 29690, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mazda-cx5-benzine', 'brand': 'Mazda', 'name': 'CX-5', 'v': 'SKYACTIV-G Center-Line AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 120, 'acc': 0, 'koffer': 506, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 34990, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mazda-cx60', 'brand': 'Mazda', 'name': 'CX-60', 'v': 'PHEV i-ACTIV AWD 8AT Prime-Line', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 141, 'acc': 0, 'koffer': 570, 'cilinder': 2488000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 50890, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mazda-cx60-1', 'brand': 'Mazda', 'name': 'CX-60', 'v': 'e-SKYACTIV D BVA8 Exclusive-Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 147, 'acc': 0, 'koffer': 570, 'cilinder': 3283000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 48790, 'pk': 17, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mazda-mx30-ev-33', 'brand': 'Mazda', 'name': 'MX-30', 'v': 'E-SKYACTIV AUT Exclusive-Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 107, 'acc': 0, 'koffer': 332, 'cilinder': 0, 'bat': 35, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 38020, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mazda-mx30-ev-32', 'brand': 'Mazda', 'name': 'MX-30', 'v': 'E-SKYACTIV R-EV AUT Exclusive-Line', 'fuel': 'Plug-in hybride', 'verbrEl': 18, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 21, 'power': 55, 'acc': 0, 'koffer': 332, 'cilinder': 830000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 38020, 'pk': 5, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'mcro-microlino-1', 'brand': 'm-cro', 'name': 'Microlino', 'v': '6 kWh', 'fuel': 'Elektrisch', 'verbrEl': 7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 13, 'acc': 0, 'koffer': 230, 'cilinder': 0, 'bat': 6, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 17990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'mcro-microlino-3', 'brand': 'm-cro', 'name': 'Microlino', 'v': '10,5 kWh', 'fuel': 'Elektrisch', 'verbrEl': 7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 13, 'acc': 0, 'koffer': 230, 'cilinder': 0, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 21990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'mcro-microlino-6', 'brand': 'm-cro', 'name': 'Microlino', 'v': '14 kWh', 'fuel': 'Elektrisch', 'verbrEl': 7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 13, 'acc': 0, 'koffer': 230, 'cilinder': 0, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 23490, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-a-benz-23', 'brand': 'Mercedes', 'name': 'A-Klasse Berline', 'v': '180 7G-DCT Business Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 100, 'acc': 0, 'koffer': 405, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 38720, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-a-benz-23-1', 'brand': 'Mercedes', 'name': 'A-Klasse Berline', 'v': '250e 8G-DCT Business Line', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 24, 'power': 120, 'acc': 0, 'koffer': 345, 'cilinder': 1332000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 50820, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-a-benz-23-2', 'brand': 'Mercedes', 'name': 'A-Klasse Berline', 'v': '180d 8G-DCT Business Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 85, 'acc': 0, 'koffer': 395, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 39325, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mercedes-b-sportstourer-phev-32', 'brand': 'Mercedes', 'name': 'B-Klasse ', 'v': '180d 8G-DCT Business Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 85, 'acc': 0, 'koffer': 445, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 43923, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mercedes-b-sportstourer-phev-34', 'brand': 'Mercedes', 'name': 'B-Klasse ', 'v': '180 7G-DCT Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 100, 'acc': 0, 'koffer': 455, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 43681, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mercedes-b-sportstourer-phev-34', 'brand': 'Mercedes', 'name': 'B-Klasse ', 'v': '250e 8G-DCT Business Line', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 27, 'power': 120, 'acc': 0, 'koffer': 405, 'cilinder': 1332000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 50699, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'merc-c-benz', 'brand': 'Mercedes', 'name': 'C-Klasse', 'v': 'C180 9G-Tronic Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 125, 'acc': 0, 'koffer': 455, 'cilinder': 1496000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 47553, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mer-c-diesel', 'brand': 'Mercedes', 'name': 'C-Klasse', 'v': 'C200d 9G-Tronic Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 120, 'acc': 0, 'koffer': 455, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 49005, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'merc-c-benz-phev', 'brand': 'Mercedes', 'name': 'C-Klasse', 'v': 'C300e 9G-Tronic Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 18, 'verbrBr': 8.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 17, 'power': 150, 'acc': 0, 'koffer': 360, 'cilinder': 1999000, 'bat': 25, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 60258, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mer-c-diesel-phev', 'brand': 'Mercedes', 'name': 'C-Klasse', 'v': 'C300de 9G-Tronic Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 18, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 16, 'power': 145, 'acc': 0, 'koffer': 315, 'cilinder': 1993000, 'bat': 25, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 63888, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev-33', 'brand': 'Mercedes', 'name': 'C-Klasse Break', 'v': 'C200d 9G-Tronic Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 120, 'acc': 0, 'koffer': 490, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 50457, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev-32', 'brand': 'Mercedes', 'name': 'C-Klasse Break', 'v': 'C180 9G-Tronic Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 125, 'acc': 0, 'koffer': 490, 'cilinder': 1496000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 49005, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev-34', 'brand': 'Mercedes', 'name': 'C-Klasse Break', 'v': 'C300e 9G-Tronic Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 9.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 19, 'power': 150, 'acc': 0, 'koffer': 360, 'cilinder': 1999000, 'bat': 25, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 61710, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev-35', 'brand': 'Mercedes', 'name': 'C-Klasse Break', 'v': 'C300de 9G-Tronic Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 16, 'power': 145, 'acc': 0, 'koffer': 360, 'cilinder': 1993000, 'bat': 25, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 65340, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-coupe-diesel', 'brand': 'Mercedes', 'name': 'CLA Coup&eacute;', 'v': '180 d 8G-DCT Business Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 85, 'acc': 0, 'koffer': 450, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 41503, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-coupe-benz', 'brand': 'Mercedes', 'name': 'CLA Coup&eacute;', 'v': '180 7G-DCT Business Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 100, 'acc': 0, 'koffer': 460, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 40172, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-coupe-phev', 'brand': 'Mercedes', 'name': 'CLA Coup&eacute;', 'v': '250 e 7G-DCT Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 118, 'acc': 0, 'koffer': 395, 'cilinder': 1332000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 50820, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-shootingbrake-diesel', 'brand': 'Mercedes', 'name': 'CLA Shooting Brake', 'v': '180 d 8G-DCT Business Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 135, 'power': 85, 'acc': 0, 'koffer': 495, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 42713, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-shootingbrake-benzine', 'brand': 'Mercedes', 'name': 'CLA Shooting Brake', 'v': '180 7G-DCT Business Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 100, 'acc': 0, 'koffer': 505, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 41382, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-shootingbrake-phev', 'brand': 'Mercedes', 'name': 'CLA Shooting Brake', 'v': '250 e 7G-DCT Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 24, 'power': 118, 'acc': 0, 'koffer': 445, 'cilinder': 1332000, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 52030, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-cls-benz', 'brand': 'Mercedes', 'name': 'CLS', 'v': '220d AMG Line 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 148, 'power': 143, 'acc': 0, 'koffer': 520, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 74415, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-eklasse-diesel', 'brand': 'Mercedes', 'name': 'E-Klasse', 'v': '200 d Luxury Line 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 118, 'acc': 0, 'koffer': 540, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 55660, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-e-berline-phev-32', 'brand': 'Mercedes', 'name': 'E-Klasse', 'v': '200 Luxury Line 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 188, 'power': 145, 'acc': 0, 'koffer': 540, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 58080, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-e-phev', 'brand': 'Mercedes', 'name': 'E-Klasse', 'v': '300 e Luxury Line 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 8.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 155, 'acc': 0, 'koffer': 370, 'cilinder': 1991000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 68970, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-eklasse-diesel-phev', 'brand': 'Mercedes', 'name': 'E-Klasse', 'v': '300 de Luxury 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 143, 'acc': 0, 'koffer': 370, 'cilinder': 1950000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 70785, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-eklasse-wagon-diesel', 'brand': 'Mercedes', 'name': 'E-Klasse Break', 'v': '200 d Luxury Line 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 159, 'power': 118, 'acc': 0, 'koffer': 640, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 58080, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-e-break-benz', 'brand': 'Mercedes', 'name': 'E-Klasse Break', 'v': '200 Luxury Line 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 194, 'power': 145, 'acc': 0, 'koffer': 640, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 60500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-e-break-phev', 'brand': 'Mercedes', 'name': 'E-Klasse Break', 'v': '300 e Luxury Line 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 42, 'power': 155, 'acc': 0, 'koffer': 480, 'cilinder': 1991000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 71390, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'mercedes-eklasse-wagon-diesel-phev', 'brand': 'Mercedes', 'name': 'E-Klasse Break', 'v': '300 de Luxury 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 45, 'power': 143, 'acc': 0, 'koffer': 480, 'cilinder': 1950000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 73205, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa', 'brand': 'Mercedes', 'name': 'EQA', 'v': '250 Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 340, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 59653, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa-3', 'brand': 'Mercedes', 'name': 'EQA', 'v': '300 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 340, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 63767, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa-1', 'brand': 'Mercedes', 'name': 'EQA', 'v': '350 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 340, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 66671, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa-2', 'brand': 'Mercedes', 'name': 'EQA', 'v': '250+ Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 340, 'cilinder': 0, 'bat': 70, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 46710, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-eqb-2', 'brand': 'Mercedes', 'name': 'EQB', 'v': '300 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 495, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 66187, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-eqb', 'brand': 'Mercedes', 'name': 'EQB', 'v': '350 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 495, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 69091, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-eqb-1', 'brand': 'Mercedes', 'name': 'EQB', 'v': '250 Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 495, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 62073, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-eqb-3', 'brand': 'Mercedes', 'name': 'EQB', 'v': '250+ Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 495, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 64130, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-eqc-400-32', 'brand': 'Mercedes', 'name': 'EQC', 'v': '400 4MATIC Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 0, 'koffer': 500, 'cilinder': 0, 'bat': 80, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 77440, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-eqe-1', 'brand': 'Mercedes', 'name': 'EQE', 'v': '300 Business Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 180, 'acc': 0, 'koffer': 430, 'cilinder': 0, 'bat': 89, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 72600, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-eqe', 'brand': 'Mercedes', 'name': 'EQE', 'v': '350 Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 430, 'cilinder': 0, 'bat': 89, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 82280, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-eqe-2', 'brand': 'Mercedes', 'name': 'EQE', 'v': '350+ Long Range', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 430, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 81070, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-eqe-amg', 'brand': 'Mercedes', 'name': 'EQE', 'v': '500 AMG Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 0, 'koffer': 430, 'cilinder': 0, 'bat': 89, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 112530, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-eqe-suv-1', 'brand': 'Mercedes', 'name': 'EQE SUV', 'v': '350+ Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 520, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 94864, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-eqe-suv-2', 'brand': 'Mercedes', 'name': 'EQE SUV', 'v': '500 AMG Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 0, 'koffer': 520, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 115555, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-eqs-1', 'brand': 'Mercedes', 'name': 'EQS', 'v': '580 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 385, 'acc': 0, 'koffer': 610, 'cilinder': 0, 'bat': 107, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 172788, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-eqs', 'brand': 'Mercedes', 'name': 'EQS', 'v': '450+ Business Line', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 245, 'acc': 0, 'koffer': 610, 'cilinder': 0, 'bat': 107, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 104907, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-eqs-2', 'brand': 'Mercedes', 'name': 'EQS', 'v': '500 AMG Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 330, 'acc': 0, 'koffer': 610, 'cilinder': 0, 'bat': 107, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 128865, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-eqs-suv-1', 'brand': 'Mercedes', 'name': 'EQS SUV', 'v': '450+ Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 265, 'acc': 0, 'koffer': 645, 'cilinder': 0, 'bat': 108, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 119427, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-eqs-suv', 'brand': 'Mercedes', 'name': 'EQS SUV', 'v': '580 4MATIC AMG Line', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 400, 'acc': 0, 'koffer': 645, 'cilinder': 0, 'bat': 108, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 169400, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-eqs-suv-2', 'brand': 'Mercedes', 'name': 'EQS SUV', 'v': '500 4MATIC AMG Line', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 330, 'acc': 0, 'koffer': 645, 'cilinder': 0, 'bat': 108, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 148951, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-eqv-32', 'brand': 'Mercedes', 'name': 'EQV', 'v': '300 L3', 'fuel': 'Elektrisch', 'verbrEl': 28, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1410, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 83006, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-g-klasse', 'brand': 'Mercedes', 'name': 'G-Klasse', 'v': '400 d 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2925000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 43, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-gla-diesel', 'brand': 'Mercedes', 'name': 'GLA', 'v': '180d 8G-DCT Business Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 152, 'power': 85, 'acc': 0, 'koffer': 425, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 44044, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-gla-benz', 'brand': 'Mercedes', 'name': 'GLA', 'v': '180 7G-DCT Business Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 100, 'acc': 0, 'koffer': 435, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 42834, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-gla-phev', 'brand': 'Mercedes', 'name': 'GLA', 'v': '250e 8G-DCT Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 118, 'acc': 0, 'koffer': 385, 'cilinder': 1332000, 'bat': 15.6, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 54571, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-glb-diesel', 'brand': 'Mercedes', 'name': 'GLB', 'v': '180d 8G-DCT Business Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 159, 'power': 85, 'acc': 0, 'koffer': 570, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 45617, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-glb-benz', 'brand': 'Mercedes', 'name': 'GLB', 'v': '180 7G-DCT Business Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 100, 'acc': 0, 'koffer': 570, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 44407, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'merc-glc-diesel', 'brand': 'Mercedes', 'name': 'GLC', 'v': '220 d 4MATIC Business Line 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 145, 'acc': 0, 'koffer': 600, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 60500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'merc-glc-benz', 'brand': 'Mercedes', 'name': 'GLC', 'v': '200 4MATIC Business Line 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 150, 'acc': 0, 'koffer': 600, 'cilinder': 1999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 58080, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'merc-glc-phev', 'brand': 'Mercedes', 'name': 'GLC', 'v': '300e 4MATIC Business Line 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 9.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 15, 'power': 150, 'acc': 0, 'koffer': 400, 'cilinder': 1999000, 'bat': 31, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 75020, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'merc-glc-diesel-phev', 'brand': 'Mercedes', 'name': 'GLC', 'v': '300de 4MATIC Business Line 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 10, 'power': 145, 'acc': 0, 'koffer': 600, 'cilinder': 1993000, 'bat': 31, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 77440, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-coupe-benzine', 'brand': 'Mercedes', 'name': 'GLC Coup&eacute;', 'v': '200 4MATIC 9-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 204, 'power': 145, 'acc': 0, 'koffer': 500, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 57717, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-coupe-diesel', 'brand': 'Mercedes', 'name': 'GLC Coup&eacute;', 'v': '200d 4MATIC 9-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 180, 'power': 120, 'acc': 0, 'koffer': 500, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 56386, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-coupe-benzine-phev', 'brand': 'Mercedes', 'name': 'GLC Coup&eacute;', 'v': '300 e 4MATIC 9-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 9.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 61, 'power': 155, 'acc': 0, 'koffer': 350, 'cilinder': 1991000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 69212, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':153 },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-coupe-diesel-phev', 'brand': 'Mercedes', 'name': 'GLC Coup&eacute;', 'v': '300de 4MATIC 9-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 7.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 57, 'power': 143, 'acc': 0, 'koffer': 500, 'cilinder': 1950000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 72358, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':143 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-benz', 'brand': 'Mercedes', 'name': 'GLE', 'v': 'AMG 53 4MATIC+ 9G-TRONIC Sport Edition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 50, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-diesel-1', 'brand': 'Mercedes', 'name': 'GLE', 'v': '350 de 4MATIC 9G-TRONIC Business Line', 'fuel': 'Plug-in hybride', 'verbrEl': 24.7, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 17, 'power': 145, 'acc': 0, 'koffer': 715, 'cilinder': 1993000, 'bat': 31.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 91839, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-diesel', 'brand': 'Mercedes', 'name': 'GLE', 'v': '300 d 4MATIC 9G-TRONIC Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 164, 'power': 198, 'acc': 0, 'koffer': 855, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 54, 'price': 87846, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-phev', 'brand': 'Mercedes', 'name': 'GLE', 'v': '400 e 4MATIC 9G-TRONIC Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 25.2, 'verbrBr': 8.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 20, 'power': 185, 'acc': 0, 'koffer': 715, 'cilinder': 1999000, 'bat': 31.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 98736, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-gle-coupe-diesel', 'brand': 'Mercedes', 'name': 'GLE Coup&eacute;', 'v': '350 de 4MATIC 9G-TRONIC AMG Line', 'fuel': 'Plug-in hybride', 'verbrEl': 24.2, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 17, 'power': 145, 'acc': 0, 'koffer': 731, 'cilinder': 1993000, 'bat': 31.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 106964, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'mercedes-gle-coupe-benzine', 'brand': 'Mercedes', 'name': 'GLE Coup&eacute;', 'v': '400 e 4MATIC 9G-TRONIC AMG Line', 'fuel': 'Plug-in hybride', 'verbrEl': 24.6, 'verbrBr': 9.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 20, 'power': 185, 'acc': 0, 'koffer': 731, 'cilinder': 1999000, 'bat': 31.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 106601, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gls-diesel', 'brand': 'Mercedes', 'name': 'GLS', 'v': '350d 4MATIC 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 251, 'power': 210, 'acc': 0, 'koffer': 355, 'cilinder': 2925000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 94985, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gls-benz', 'brand': 'Mercedes', 'name': 'GLS', 'v': '450 4MATIC 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 49, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-s-phev', 'brand': 'Mercedes', 'name': 'S-Klasse ', 'v': '450e 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 20, 'verbrBr': 10.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 20, 'power': 220, 'acc': 0, 'koffer': 550, 'cilinder': 2999000, 'bat': 28, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 128502, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'mercedes-sprinter-diesel', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '319 CDI L4 RWD 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 280, 'power': 140, 'acc': 0, 'koffer': 15500, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 44, 'price': 39777, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'mercedes-sprinter-diesel-1', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '317 CDI L2 RWD Functional', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 235, 'power': 125, 'acc': 0, 'koffer': 0, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 48, 'price': 41975, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'mercedes-sprinter-diesel-2', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '317 CDI L3 RWD Functional', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 236, 'power': 125, 'acc': 0, 'koffer': 0, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 48, 'price': 42538, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-sprinter-diesel-3', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '311 CDI L1 RWD 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 249, 'power': 84, 'acc': 0, 'koffer': 4012, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 47, 'price': 45550, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-sprinter-diesel-4', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '315 CDI L1 RWD 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 249, 'power': 110, 'acc': 0, 'koffer': 4012, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 44, 'price': 47402, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'mercedes-sprinter-diesel-5', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '317 CDI L1 RWD 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 283, 'power': 125, 'acc': 0, 'koffer': 4012, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 44, 'price': 34320, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'merc-sprinter-elek-4', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '35 kWh L2 FWD', 'fuel': 'Elektrisch', 'verbrEl': 39, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 5539, 'cilinder': 0, 'bat': 38, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 51713, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'merc-sprinter-elek-1', 'brand': 'Mercedes', 'name': 'Sprinter ', 'v': '47 kWh L2 FWD', 'fuel': 'Elektrisch', 'verbrEl': 39, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 5539, 'cilinder': 0, 'bat': 47, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 61251, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-tklasse', 'brand': 'Mercedes', 'name': 'T-Klasse', 'v': 'T180 Style', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 96, 'acc': 0, 'koffer': 775, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 28435, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-tklasse-1', 'brand': 'Mercedes', 'name': 'T-Klasse', 'v': 'T160d Style', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 70, 'acc': 0, 'koffer': 775, 'cilinder': 1461000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 28508, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-vito-m1', 'brand': 'Mercedes', 'name': 'Vito', 'v': 'Tourer 114 CDI L1 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 238, 'power': 100, 'acc': 0, 'koffer': 580, 'cilinder': 2143000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 36227, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-vito-m1-2', 'brand': 'Mercedes', 'name': 'Vito', 'v': 'Tourer 114 CDI L2 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 239, 'power': 100, 'acc': 0, 'koffer': 990, 'cilinder': 2143000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 37014, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-vito-m1-3', 'brand': 'Mercedes', 'name': 'Vito', 'v': 'Tourer 114 CDI L3 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 240, 'power': 100, 'acc': 0, 'koffer': 1390, 'cilinder': 2143000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 26460, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'merc-vito-1', 'brand': 'Mercedes', 'name': 'Vito', 'v': 'GB 114 CDI Perfect Tool L2', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 100, 'acc': 0, 'koffer': 6300, 'cilinder': 2143000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 31097, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'mercedes-evito', 'brand': 'Mercedes', 'name': 'Vito', 'v': 'GB L3', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 6900, 'cilinder': 0, 'bat': 85, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 51594, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-evito-m1', 'brand': 'Mercedes', 'name': 'Vito', 'v': 'Tourer PRO L2', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 990, 'cilinder': 0, 'bat': 85, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 53228, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'merc-vklasse-diesel', 'brand': 'Mercedes', 'name': 'V-Klasse', 'v': '220d 9G-TRONIC L1', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 186, 'power': 120, 'acc': 0, 'koffer': 610, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 59472, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'merc-vklasse-diesel-1', 'brand': 'Mercedes', 'name': 'V-Klasse', 'v': '220d 9G-TRONIC L2', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 187, 'power': 120, 'acc': 0, 'koffer': 1030, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 60385, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'merc-vklasse-diesel-2', 'brand': 'Mercedes', 'name': 'V-Klasse', 'v': '220d 9G-TRONIC L3', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 188, 'power': 120, 'acc': 0, 'koffer': 1410, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 61317, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mg4-1', 'brand': 'MG', 'name': '4', 'v': '64 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 363, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 35785, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mg-5-1', 'brand': 'MG', 'name': '5', 'v': 'Standard Range 51 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 130, 'acc': 0, 'koffer': 479, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 35885, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mg-5-2', 'brand': 'MG', 'name': '5', 'v': 'Long Range 72 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 115, 'acc': 0, 'koffer': 479, 'cilinder': 0, 'bat': 61, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 38885, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mg-ehs-phev', 'brand': 'MG', 'name': 'EHS', 'v': 'PHEV Comfort', 'fuel': 'Plug-in hybride', 'verbrEl': 22, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 43, 'power': 119, 'acc': 0, 'koffer': 448, 'cilinder': 1490000, 'bat': 16, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 37385, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mg-marvel-r-1', 'brand': 'MG', 'name': 'MARVEL R', 'v': '70 kWh Luxury', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 38, 'acc': 0, 'koffer': 507, 'cilinder': 0, 'bat': 70, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 49785, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mg-zs-benz', 'brand': 'MG', 'name': 'ZS', 'v': 'VTi-Tech Luxury', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 78, 'acc': 0, 'koffer': 448, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 21285, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'mg-zs-ev-33', 'brand': 'MG', 'name': 'ZS EV', 'v': '51 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 130, 'acc': 0, 'koffer': 448, 'cilinder': 0, 'bat': 51, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 35885, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'mg-zs-ev-35', 'brand': 'MG', 'name': 'ZS EV', 'v': '72 kWh Comfort (11 kW OBC)', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 115, 'acc': 0, 'koffer': 448, 'cilinder': 0, 'bat': 72, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 37885, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mini-3deurs-benz', 'brand': 'Mini', 'name': 'Mini 3-deurs (F56)', 'v': 'Cooper AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 100, 'acc': 0, 'koffer': 211, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 29250, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mini-mini-electric-32', 'brand': 'Mini', 'name': 'Mini 3-deurs (F56)', 'v': 'Cooper SE', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 0, 'koffer': 211, 'cilinder': 0, 'bat': 32, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 36500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mini-5deurs', 'brand': 'Mini', 'name': 'Mini 5-deurs (F55)', 'v': 'Cooper AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 100, 'acc': 0, 'koffer': 211, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 30050, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mini-clubman', 'brand': 'Mini', 'name': 'Mini Clubman (F54)', 'v': 'Cooper AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 145, 'power': 100, 'acc': 0, 'koffer': 360, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 34450, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-benzine', 'brand': 'Mini', 'name': 'Mini Countryman (F60)', 'v': 'Cooper AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 158, 'power': 100, 'acc': 0, 'koffer': 450, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 35850, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-phev', 'brand': 'Mini', 'name': 'Mini Countryman (F60)', 'v': 'Cooper S E ALL4 AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 14.9, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 47, 'power': 92, 'acc': 0, 'koffer': 450, 'cilinder': 1499000, 'bat': 26, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 31535, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'nissan-ariya-23', 'brand': 'Nissan', 'name': 'Ariya', 'v': '63 kWh Evolve', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 160, 'acc': 0, 'koffer': 468, 'cilinder': 0, 'bat': 63, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 60600, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'nissan-ariya-23-1', 'brand': 'Nissan', 'name': 'Ariya', 'v': '87 kWh Evolve e-4ORCE', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 225, 'acc': 0, 'koffer': 415, 'cilinder': 0, 'bat': 87, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 70100, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'nissan-juke', 'brand': 'Nissan', 'name': 'Juke ', 'v': 'HYBRIDE N-Connecta AMT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 118, 'power': 69, 'acc': 0, 'koffer': 422, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 31750, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'nissan-leaf', 'brand': 'Nissan', 'name': 'Leaf ', 'v': '40 kWh Acenta', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 110, 'acc': 0, 'koffer': 400, 'cilinder': 0, 'bat': 40, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 39250, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'nissan-leaf-60', 'brand': 'Nissan', 'name': 'Leaf ', 'v': '62 kWh N-Connecta', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 160, 'acc': 0, 'koffer': 400, 'cilinder': 0, 'bat': 62, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 45400, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'nissan-micra', 'brand': 'Nissan', 'name': 'Micra', 'v': 'IG-T Acenta', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 68, 'acc': 0, 'koffer': 300, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 19310, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'nissan-qashqai', 'brand': 'Nissan', 'name': 'Qashqai ', 'v': 'Mild-Hybrid Acenta', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 103, 'acc': 0, 'koffer': 436, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 34840, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'nissan-townstar-m1', 'brand': 'Nissan', 'name': 'Townstar', 'v': 'DIG-T N-Connecta', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 157, 'power': 96, 'acc': 0, 'koffer': 775, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 29100, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'nissan-townstar-ev-3', 'brand': 'Nissan', 'name': 'Townstar', 'v': 'DIG-T Acenta', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 157, 'power': 96, 'acc': 0, 'koffer': 3300, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 18549, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'nissan-townstar-ev-4', 'brand': 'Nissan', 'name': 'Townstar', 'v': 'EV Acenta', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 27688, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'nissan-xtrail', 'brand': 'Nissan', 'name': 'X-Trail', 'v': 'dCi Tekna', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 161, 'power': 110, 'acc': 0, 'koffer': 565, 'cilinder': 1749000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 39570, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'nissan-xtrail-1', 'brand': 'Nissan', 'name': 'X-Trail New', 'v': 'Mild-Hybrid Business Edition X-Tronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 169, 'power': 120, 'acc': 0, 'koffer': 585, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 45800, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra-23', 'brand': 'Opel', 'name': 'Astra', 'v': 'Turbo Start/Stop Business Edition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 81, 'acc': 0, 'koffer': 367, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 28600, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra-23-1', 'brand': 'Opel', 'name': 'Astra', 'v': 'Turbo Start/Stop Hybrid Edition E-AT8', 'fuel': 'Plug-in hybride', 'verbrEl': 14, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 110, 'acc': 0, 'koffer': 305, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 28560, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra-st-1', 'brand': 'Opel', 'name': 'Astra Sports Tourer', 'v': 'Turbo Start/Stop Edition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 96, 'acc': 0, 'koffer': 486, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 30100, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra-st', 'brand': 'Opel', 'name': 'Astra Sports Tourer', 'v': 'Turbo Start/Stop Hybrid Edition E-AT8', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 23, 'power': 110, 'acc': 0, 'koffer': 436, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 42300, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'opel-combo-cargo-3', 'brand': 'Opel', 'name': 'Combo Cargo', 'v': 'Turbo D BlueInjection L1H1 Heavy', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 96, 'acc': 0, 'koffer': 3300, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 19100, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'opel-combo-cargo-1', 'brand': 'Opel', 'name': 'Combo Cargo', 'v': '50 kWH L1H1 Light', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 27782, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'opel-combo-cargo-2', 'brand': 'Opel', 'name': 'Combo Cargo', 'v': '50 kWH L2H1 Heavy', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3900, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 28586, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'opel-combo-cargo-3', 'brand': 'Opel', 'name': 'Combo Cargo', 'v': 'L1H1 Turbo Edition Plus', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 81, 'acc': 0, 'koffer': 0, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 18501, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-combo-life-1', 'brand': 'Opel', 'name': 'Combo Life', 'v': 'L1H1 50 kWh Edition Plus', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 597, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 42320, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'opel-corsa-e-33', 'brand': 'Opel', 'name': 'Corsa ', 'v': 'e-Edition', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 267, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 36350, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'opel-corsa-e-32', 'brand': 'Opel', 'name': 'Corsa ', 'v': 'Start/Stop Elegance', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 55, 'acc': 0, 'koffer': 309, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 22700, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'opel-crossland', 'brand': 'Opel', 'name': 'Crossland', 'v': 'Turbo ECOTEC S/S Elegance', 'fuel': 'Benzine', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 81, 'acc': 0, 'koffer': 410, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 26500, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'opel-grandland', 'brand': 'Opel', 'name': 'Grandland ', 'v': 'Turbo Start/Stop Hybrid Business Edition', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 132, 'acc': 0, 'koffer': 514, 'cilinder': 1598000, 'bat': 13, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 49800, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'opel-grandland-1', 'brand': 'Opel', 'name': 'Grandland ', 'v': 'Turbo Start/Stop Business Elegance', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 96, 'acc': 0, 'koffer': 514, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 37450, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'opel-mokka-e-32', 'brand': 'Opel', 'name': 'Mokka', 'v': 'Turbo S/S Elegance', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 124, 'power': 74, 'acc': 0, 'koffer': 350, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 27700, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'opel-mokka-e-33', 'brand': 'Opel', 'name': 'Mokka', 'v': 'BEV 50kWh e-Elegance', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 350, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 44400, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'opel-movano-diesel', 'brand': 'Opel', 'name': 'Movano', 'v': 'Turbo D L4 Edition Heavy', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 185, 'power': 121, 'acc': 0, 'koffer': 0, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 29751, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'opel-movano-diesel-1', 'brand': 'Opel', 'name': 'Movano', 'v': 'Turbo D L3 Edition Heavy', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 185, 'power': 121, 'acc': 0, 'koffer': 0, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 29497, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-vivaro-m1', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'COMBI 50kWh battery pack L2H1 AT', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 54220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-vivaro-m1-1', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'COMBI 75kWh battery pack L2H1 AT', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 60220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-vivaro-m1-2', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'COMBI 75kWh battery pack L3H1 AT', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 989, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 61220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'opel-vivaro-e-4', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'L2H1 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 33584, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'opel-vivaro-e-5', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'L2H1 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 39027, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'opel-vivaro-diesel', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'L3H1 Turbo D S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 189, 'power': 107, 'acc': 0, 'koffer': 6100, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 49, 'price': 27993, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'opel-vivaro-e-1', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'L3H1 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 34854, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'opel-vivaro-e-2', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'L3H1 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 40842, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'opel-vivaro-diesel-1', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'DC L3H1 Turbo D S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 189, 'power': 107, 'acc': 0, 'koffer': 6100, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 49, 'price': 30450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'opel-vivaro-e-3', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'DC L3H1 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 44351, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-zafira-e-life-75-32', 'brand': 'Opel', 'name': 'Zafira Life', 'v': '50 kWh e-Business Edition L2H1', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 60090, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-zafira-e-life-50-32', 'brand': 'Opel', 'name': 'Zafira Life', 'v': '75 kWh e-Business Edition L2H1', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 66090, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-zafira-e-life-50-33', 'brand': 'Opel', 'name': 'Zafira Life', 'v': '75 kWh e-Business Edition L3H1', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 989, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 67290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-ev-32', 'brand': 'Peugeot', 'name': '2008', 'v': 'Electrique Allure', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 43365, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-ev-33', 'brand': 'Peugeot', 'name': '2008', 'v': 'PureTech S&S Allure', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 124, 'power': 74, 'acc': 0, 'koffer': 405, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 29515, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'peugeot-e-208-32', 'brand': 'Peugeot', 'name': '208', 'v': 'e-208 Allure', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 311, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 38765, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'peugeot-208-benz', 'brand': 'Peugeot', 'name': '208', 'v': 'PureTech S&S Active', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 55, 'acc': 0, 'koffer': 311, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 22265, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'peugeot-3008', 'brand': 'Peugeot', 'name': '3008', 'v': 'PureTech S&S Allure Pack', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 160, 'power': 96, 'acc': 0, 'koffer': 520, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 40345, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'peugeot-3008-1', 'brand': 'Peugeot', 'name': '3008', 'v': 'HYBRID Active Pack e-DSC6', 'fuel': 'Plug-in hybride', 'verbrEl': 15.7, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 100, 'acc': 0, 'koffer': 520, 'cilinder': 1199000, 'bat': 13.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 42135, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-23', 'brand': 'Peugeot', 'name': '308', 'v': 'PureTech S&S Allure Pack', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 96, 'acc': 0, 'koffer': 412, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 32400, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-24', 'brand': 'Peugeot', 'name': '308', 'v': 'Hybrid S&S Allure Pack e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 110, 'acc': 0, 'koffer': 361, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 45250, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-sw', 'brand': 'Peugeot', 'name': '308 SW', 'v': 'PureTech S&S Allure', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 96, 'acc': 0, 'koffer': 608, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 32550, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-sw-1', 'brand': 'Peugeot', 'name': '308 SW', 'v': 'Hybrid S&S Allure Pack e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 110, 'acc': 0, 'koffer': 548, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 46250, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-408-1', 'brand': 'Peugeot', 'name': '408', 'v': 'PureTech S&S Allure Pack EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 96, 'acc': 0, 'koffer': 536, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 37850, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-408', 'brand': 'Peugeot', 'name': '408', 'v': 'Hybrid S&S Allure e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 14.1, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 110, 'acc': 0, 'koffer': 471, 'cilinder': 1598000, 'bat': 12.4, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 47050, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'peugeot-5008-benz-32', 'brand': 'Peugeot', 'name': '5008', 'v': 'PureTech S/S Allure Pack', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 96, 'acc': 0, 'koffer': 780, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 42545, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'peugeot-5008-benz-33', 'brand': 'Peugeot', 'name': '5008', 'v': 'Hybrid GT e-DSC6', 'fuel': 'Plug-in hybride', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 100, 'acc': 0, 'koffer': 780, 'cilinder': 1199000, 'bat': 13.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 49245, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508-23', 'brand': 'Peugeot', 'name': '508', 'v': 'PureTech S&S Allure EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 141, 'power': 96, 'acc': 0, 'koffer': 487, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 41365, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508-24', 'brand': 'Peugeot', 'name': '508', 'v': 'Plug-In Hybrid Allure e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 32, 'power': 110, 'acc': 0, 'koffer': 487, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 50365, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508sw-23', 'brand': 'Peugeot', 'name': '508 SW', 'v': 'Plug-In Hybrid Allure e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 110, 'acc': 0, 'koffer': 530, 'cilinder': 1598000, 'bat': 12, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 52165, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508sw-23-1', 'brand': 'Peugeot', 'name': '508 SW', 'v': 'PureTech S&S Allure EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 96, 'acc': 0, 'koffer': 530, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 43165, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'peugeot-boxer-diesel', 'brand': 'Peugeot', 'name': 'Boxer', 'v': 'FT L2H1 335 BlueHDI S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 170, 'power': 121, 'acc': 0, 'koffer': 10000, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 29836, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'peugeot-boxer-diesel-1', 'brand': 'Peugeot', 'name': 'Boxer', 'v': 'FT L2H2 335 BlueHDI S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 173, 'power': 121, 'acc': 0, 'koffer': 11500, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 30683, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'peugeot-boxer-diesel-2', 'brand': 'Peugeot', 'name': 'Boxer', 'v': 'FT L4H3 435 BlueHDI S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 173, 'power': 121, 'acc': 0, 'koffer': 17000, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 33647, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'peugeot-expert-diesel', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Standard L2 BlueHDi S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 135, 'power': 107, 'acc': 0, 'koffer': 5300, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 26723, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'peugeot-e-expert-2', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Standard L2 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 33584, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'peugeot-e-expert-3', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Standard L2 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 39027, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'peugeot-e-expert-4', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Long L3 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 34854, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'peugeot-e-expert-5', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Long L3 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 40842, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'peugeot-expert-diesel-1', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'DC Long L3 BlueHDi S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 144, 'power': 107, 'acc': 0, 'koffer': 6100, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 30450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'peugeot-e-expert-1', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'DC Long L3 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 44351, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-exper-combi', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Long Combi L3 75klWh Aut', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 989, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 61670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-exper-combi-1', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Standard Combi L2 50kWh Aut', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 54670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'peugeot-partner-4', 'brand': 'Peugeot', 'name': 'Partner ', 'v': 'Standard L1 Heavy BlueHDi S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 96, 'acc': 0, 'koffer': 3300, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 19100, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'peugeot-partner-1', 'brand': 'Peugeot', 'name': 'Partner ', 'v': 'Long L2 DC Heavy 1.5 BlueHDi S/S 130PK E', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 96, 'acc': 0, 'koffer': 3900, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 22446, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'peugeot-partner-2', 'brand': 'Peugeot', 'name': 'Partner ', 'v': 'Standard L1 Heavy 50 kWh Aut', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 27782, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-cc', 'id': 'peugeot-partner-3', 'brand': 'Peugeot', 'name': 'Partner ', 'v': 'Long L2 Heavy 50 kWh Aut', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 28586, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-e-rifter-1', 'brand': 'Peugeot', 'name': 'Rifter', 'v': '50 kWh Allure', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 775, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 41410, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-e-rifter-2', 'brand': 'Peugeot', 'name': 'Rifter', 'v': '50 kWh Allure Pack LONG', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 322, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 44430, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-traveller-50-32', 'brand': 'Peugeot', 'name': 'Traveller', 'v': 'Standard L2 Business 50kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 59290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-traveller-75-32', 'brand': 'Peugeot', 'name': 'Traveller', 'v': 'Standard L2 Business 75kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 603, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 65290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-traveller-75-32', 'brand': 'Peugeot', 'name': 'Traveller', 'v': 'Long L3 Business 75kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 989, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 66490, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'polestar-2-3', 'brand': 'Polestar', 'name': '2', 'v': 'Standard Range Single Motor', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 200, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 69, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 49990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'polestar-2', 'brand': 'Polestar', 'name': '2', 'v': 'Long Range Single Motor', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 221, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 82, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 55690, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'polestar-2-2', 'brand': 'Polestar', 'name': '2', 'v': 'Long Range Dual Motor', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 310, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 82, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 61990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'polestar-2-1', 'brand': 'Polestar', 'name': '2', 'v': 'Polestar Engineered BST edition 230', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 350, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 78, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 83900, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'polestar-3-1', 'brand': 'Polestar', 'name': '3', 'v': 'Long Range Dual motor', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 360, 'acc': 0, 'koffer': 484, 'cilinder': 0, 'bat': 111, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 89900, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-benzine', 'brand': 'Porsche', 'name': 'Cayenne ', 'v': '0', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-phev', 'brand': 'Porsche', 'name': 'Cayenne ', 'v': 'E-Hybrid', 'fuel': 'Plug-in hybride', 'verbrEl': 25.4, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 80, 'power': 250, 'acc': 0, 'koffer': 770, 'cilinder': 2995000, 'bat': 25.9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 95191, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':200 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-coupe', 'brand': 'Porsche', 'name': 'Cayenne Coup&eacute;', 'v': 'E-Hybrid', 'fuel': 'Plug-in hybride', 'verbrEl': 25.6, 'verbrBr': 10.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 75, 'power': 340, 'acc': 0, 'koffer': 625, 'cilinder': 2995000, 'bat': 17.9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 99547, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':188 },
{ 'segment': 'SUV-C', 'id': 'porsche-macan', 'brand': 'Porsche', 'name': 'Macan ', 'v': 'S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 13, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-panamera', 'brand': 'Porsche', 'name': 'Panamera', 'v': '4 E-Hybrid PDK', 'fuel': 'Plug-in hybride', 'verbrEl': 22.5, 'verbrBr': 8.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 45, 'power': 243, 'acc': 0, 'koffer': 495, 'cilinder': 2894000, 'bat': 17.9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 117104, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-panamera-st', 'brand': 'Porsche', 'name': 'Panamera Sport Turismo', 'v': '4 E-Hybrid PDK', 'fuel': 'Plug-in hybride', 'verbrEl': 23.1, 'verbrBr': 9.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 243, 'acc': 0, 'koffer': 425, 'cilinder': 2894000, 'bat': 17.9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 120008, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'porsche-taycan-23-1', 'brand': 'Porsche', 'name': 'Taycan', 'v': '4S', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 320, 'acc': 0, 'koffer': 447, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 110534, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-arkana-benz', 'brand': 'Renault', 'name': 'Arkana', 'v': 'E-Tech Hybrid Evolution', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 70, 'acc': 0, 'koffer': 480, 'cilinder': 1598000, 'bat': 1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 33350, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'renault-austral', 'brand': 'Renault', 'name': 'Austral', 'v': 'mild hybrid advanced Techno', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 96, 'acc': 0, 'koffer': 487, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 34900, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-captur-benz-32', 'brand': 'Renault', 'name': 'Captur II', 'v': 'E-Tech plug-in hybrid Techno EDC', 'fuel': 'Plug-in hybride', 'verbrEl': 11, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 31, 'power': 68, 'acc': 0, 'koffer': 309, 'cilinder': 1598000, 'bat': 9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 25375, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-captur-phev', 'brand': 'Renault', 'name': 'Captur II', 'v': 'TCe Evolution', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 135, 'power': 67, 'acc': 0, 'koffer': 395, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 23750, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'renault-espace-diesel', 'brand': 'Renault', 'name': 'Clio ', 'v': 'TCe Evolution', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 67, 'acc': 0, 'koffer': 318, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 20450, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-espace-diesel', 'brand': 'Renault', 'name': 'Espace', 'v': 'Blue dCi Equilibre EDC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 173, 'power': 137, 'acc': 0, 'koffer': 680, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 52225, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'renault-express', 'brand': 'Renault', 'name': 'Express Van', 'v': 'Tce Confort', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 74, 'acc': 0, 'koffer': 3300, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 21986, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'renault-grand-scenic', 'brand': 'Renault', 'name': 'Grand Sc&eacute;nic', 'v': 'TCe Equilibre EDC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 103, 'acc': 0, 'koffer': 611, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 32425, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'renault-kangoo-etech-life-25', 'brand': 'Renault', 'name': 'Kangoo', 'v': 'TCe Equilibre', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 157, 'power': 74, 'acc': 0, 'koffer': 775, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 17525, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'renault-kangoo-etech-life-23', 'brand': 'Renault', 'name': 'Kangoo', 'v': 'EV45 11 kW Equilibre', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 88, 'acc': 0, 'koffer': 775, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 40290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'renault-kangoo-etech-life-24', 'brand': 'Renault', 'name': 'Kangoo', 'v': 'EV45 DC 80 kW Equilibre', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 88, 'acc': 0, 'koffer': 775, 'cilinder': 0, 'bat': 45, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 41625, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'renault-kangoo-van-4', 'brand': 'Renault', 'name': 'Kangoo Van', 'v': 'TCe Confort', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 96, 'acc': 0, 'koffer': 3300, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 17639, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'renault-kangoo-van-14', 'brand': 'Renault', 'name': 'Kangoo Van', 'v': 'EV45 11kW Start', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 233, 'power': 90, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 44, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 25346, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'renault-kangoo-van-13', 'brand': 'Renault', 'name': 'Kangoo Van', 'v': 'EV45 22kW Start', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 44, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 25643, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'renault-koleos-benz', 'brand': 'Renault', 'name': 'Koleos', 'v': 'TCe Techno EDC GPF', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 116, 'acc': 0, 'koffer': 498, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 41500, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-e-40', 'brand': 'Renault', 'name': 'M&eacute;gane E-Tech', 'v': 'EV60 Super Charge Evolution ER', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 96, 'acc': 0, 'koffer': 440, 'cilinder': 0, 'bat': 60, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 43350, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-grandtour', 'brand': 'Renault', 'name': 'M&eacute;gane Grandtour', 'v': 'TCe Equilibre', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 103, 'acc': 0, 'koffer': 521, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 27325, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-grandtour-1', 'brand': 'Renault', 'name': 'M&eacute;gane Grandtour', 'v': 'E-TECH Plug-in Hybrid Equilbre Aut', 'fuel': 'Plug-in hybride', 'verbrEl': 12.6, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 67, 'acc': 0, 'koffer': 521, 'cilinder': 1598000, 'bat': 9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 38275, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-32', 'brand': 'Renault', 'name': 'M&eacute;gane Hatchback', 'v': 'TCe Equilibre', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 103, 'acc': 0, 'koffer': 402, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 26325, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-d1', 'brand': 'Renault', 'name': 'M&eacute;gane Hatchback', 'v': 'E-TECH Plug-in Hybrid Equilbre Aut', 'fuel': 'Plug-in hybride', 'verbrEl': 12.5, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 68, 'acc': 0, 'koffer': 402, 'cilinder': 1598000, 'bat': 9, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 37275, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'renault-master-diesel', 'brand': 'Renault', 'name': 'Master', 'v': 'Energy Blue dCi L3H3 3.5T FWD Confort', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 132, 'acc': 0, 'koffer': 14800, 'cilinder': 2298000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 54, 'price': 31301, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'renault-master-diesel-1', 'brand': 'Renault', 'name': 'Master', 'v': 'Energy dCi L4H3 3.5T RWD Confort', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 211, 'power': 120, 'acc': 0, 'koffer': 16000, 'cilinder': 2298000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 32444, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'renault-master-diesel-2', 'brand': 'Renault', 'name': 'Master', 'v': 'Blue dCi L2H2 3.5T FWD', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 10.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 280, 'power': 99, 'acc': 0, 'koffer': 10310, 'cilinder': 2298000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 30632, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'renault-master-e-1', 'brand': 'Renault', 'name': 'Master', 'v': 'E.V. L1H2 3.1T', 'fuel': 'Elektrisch', 'verbrEl': 34, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 57, 'acc': 0, 'koffer': 9000, 'cilinder': 0, 'bat': 33, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 51369, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'renault-master-e-2', 'brand': 'Renault', 'name': 'Master', 'v': 'E.V. L2H2 3.5T', 'fuel': 'Elektrisch', 'verbrEl': 32, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 57, 'acc': 0, 'koffer': 10800, 'cilinder': 0, 'bat': 33, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 58629, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'renault-master-e-3', 'brand': 'Renault', 'name': 'Master', 'v': 'E.V. L2 3.5T', 'fuel': 'Elektrisch', 'verbrEl': 40, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 57, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 33, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 56572, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'renault-trafic-DC', 'brand': 'Renault', 'name': 'Trafic', 'v': 'Energy Blue dCi Confort L2H2 2.9T', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 186, 'power': 125, 'acc': 0, 'koffer': 8900, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 28764, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'renault-trafic-passenger', 'brand': 'Renault', 'name': 'Trafic Passenger', 'v': 'Blue dCi Life L2', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 187, 'power': 81, 'acc': 0, 'koffer': 908, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 35450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'renault-twingo-32', 'brand': 'Renault', 'name': 'Twingo ', 'v': 'EV22 Techno', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 59, 'acc': 0, 'koffer': 219, 'cilinder': 0, 'bat': 22, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 25050, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'renault-zoe-1-32', 'brand': 'Renault', 'name': 'Zoe', 'v': 'EV50 Iconic', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 338, 'cilinder': 0, 'bat': 52, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 38125, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'seat-arona-23', 'brand': 'SEAT', 'name': 'Arona', 'v': 'TSI Style', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 70, 'acc': 0, 'koffer': 379, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 23810, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'seat-ateca-benz', 'brand': 'SEAT', 'name': 'Ateca', 'v': 'TSI Move! Navi', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 81, 'acc': 0, 'koffer': 510, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 32325, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'seat-ibiza-benz-32', 'brand': 'SEAT', 'name': 'Ibiza ', 'v': 'MPI S/S Style', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 59, 'acc': 0, 'koffer': 355, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 13979, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-benz-32', 'brand': 'SEAT', 'name': 'Leon', 'v': 'TSI Move!', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 81, 'acc': 0, 'koffer': 270, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 27650, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-sportstourer', 'brand': 'SEAT', 'name': 'Leon Sportstourer', 'v': 'TSI Move!', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 81, 'acc': 0, 'koffer': 620, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 28700, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'seat-tarraco-phev-32', 'brand': 'SEAT', 'name': 'Tarraco', 'v': 'TSI Move! DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 160, 'power': 110, 'acc': 0, 'koffer': 700, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 42350, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'seres-3', 'brand': 'Seres', 'name': '3', 'v': '54 kWh 163PK', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 120, 'acc': 0, 'koffer': 526, 'cilinder': 0, 'bat': 54, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 39990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'silence-s04', 'brand': 'Silence', 'name': 'S04', 'v': '11,2 kWh', 'fuel': 'Elektrisch', 'verbrEl': 7.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 14, 'acc': 0, 'koffer': 247, 'cilinder': 0, 'bat': 11, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 16285, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-8', 'brand': 'Skoda', 'name': 'Enyaq Coupe iV', 'v': '80 kWh', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 570, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 59675, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-1', 'brand': 'Skoda', 'name': 'Enyaq Coupe iV', 'v': '80 kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 570, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 67620, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-3', 'brand': 'Skoda', 'name': 'Enyaq Coupe iV', 'v': '60 kWh', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 132, 'acc': 0, 'koffer': 570, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 52820, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-2', 'brand': 'Skoda', 'name': 'Enyaq Coupe iV', 'v': '60 kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 132, 'acc': 0, 'koffer': 570, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 60765, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-5', 'brand': 'Skoda', 'name': 'Enyaq Coupe iV', 'v': '80x kWh', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 570, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 62605, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-4', 'brand': 'Skoda', 'name': 'Enyaq Coupe iV', 'v': '80x kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 570, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 70550, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-7', 'brand': 'Skoda', 'name': 'Enyaq Coupe iV', 'v': 'RS', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 220, 'acc': 0, 'koffer': 570, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 70550, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32', 'brand': 'Skoda', 'name': 'Enyaq iV', 'v': '80 kWh', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 585, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 57070, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-60-32-1', 'brand': 'Skoda', 'name': 'Enyaq iV', 'v': '60 kWh', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 132, 'acc': 0, 'koffer': 585, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 49495, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-60-32', 'brand': 'Skoda', 'name': 'Enyaq iV', 'v': '60 kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 132, 'acc': 0, 'koffer': 585, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 58325, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32-2', 'brand': 'Skoda', 'name': 'Enyaq iV', 'v': '80 kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 585, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 65490, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32-1', 'brand': 'Skoda', 'name': 'Enyaq iV', 'v': '80x kWh', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 585, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 60000, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32-3', 'brand': 'Skoda', 'name': 'Enyaq iV', 'v': '80x kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 585, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 68420, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-coupe-6', 'brand': 'Skoda', 'name': 'Enyaq iV', 'v': 'RS', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 220, 'acc': 0, 'koffer': 585, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 68420, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'skoda-fabia-32', 'brand': 'Skoda', 'name': 'Fabia ', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 70, 'acc': 0, 'koffer': 343, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 15712, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'skoda-kamiq-32', 'brand': 'Skoda', 'name': 'Kamiq', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 70, 'acc': 0, 'koffer': 400, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 20240, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-karoq-benz-1', 'brand': 'Skoda', 'name': 'Karoq', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 81, 'acc': 0, 'koffer': 521, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 34000, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'skoda-kodiaq-23', 'brand': 'Skoda', 'name': 'Kodiaq', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 110, 'acc': 0, 'koffer': 835, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 41860, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi-2-32', 'brand': 'Skoda', 'name': 'Octavia Combi', 'v': 'CRTDI Ambition', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 111, 'power': 85, 'acc': 0, 'koffer': 640, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 39460, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi-3-32', 'brand': 'Skoda', 'name': 'Octavia Combi', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 81, 'acc': 0, 'koffer': 640, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 35285, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-scala-32', 'brand': 'Skoda', 'name': 'Scala', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 70, 'acc': 0, 'koffer': 467, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 28510, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-32', 'brand': 'Skoda', 'name': 'Superb', 'v': 'TSI ACT Ambition DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 110, 'acc': 0, 'koffer': 625, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 43600, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-33', 'brand': 'Skoda', 'name': 'Superb', 'v': 'CRTDI Ambition DSG', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 110, 'acc': 0, 'koffer': 625, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 47025, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-combi', 'brand': 'Skoda', 'name': 'Superb Combi', 'v': 'TSI ACT Ambition DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 161, 'power': 110, 'acc': 0, 'koffer': 660, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 45010, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-combi-1', 'brand': 'Skoda', 'name': 'Superb Combi', 'v': 'CRTDI Ambition DSG', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 144, 'power': 110, 'acc': 0, 'koffer': 660, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 48435, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'smart-fortwo', 'brand': 'Smart', 'name': 'Fortwo Coup&eacute;', 'v': 'EQ Comfort', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 0, 'koffer': 260, 'cilinder': 0, 'bat': 17, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 27104, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ssangyong-korando-2', 'brand': 'Ssangyong', 'name': 'Korando', 'v': 'T-GDI Amber 2WD', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 120, 'acc': 0, 'koffer': 551, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 29990, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ssangyong-korando-1', 'brand': 'Ssangyong', 'name': 'Korando', 'v': '62 kWh Platinum 2WD', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 551, 'cilinder': 0, 'bat': 62, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 44990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'ssangyong-rexton-diesel-1', 'brand': 'Ssangyong', 'name': 'Rexton', 'v': 'E-XDI 4WD AUT Quartz', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 214, 'power': 149, 'acc': 0, 'koffer': 784, 'cilinder': 2157000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 50, 'price': 47990, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ssangyong-tivoli-23', 'brand': 'Ssangyong', 'name': 'Tivoli', 'v': 'T-GDI Amber 2WD', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 158, 'power': 94, 'acc': 0, 'koffer': 395, 'cilinder': 1197000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 23490, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'subaru-forester', 'brand': 'Subaru', 'name': 'Forester', 'v': 'e-BOXER Comfort AWD Lineartronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 185, 'power': 110, 'acc': 0, 'koffer': 509, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 35995, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'subaru-outback', 'brand': 'Subaru', 'name': 'Outback', 'v': 'Comfort', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 193, 'power': 124, 'acc': 0, 'koffer': 561, 'cilinder': 2498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 39995, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'subaru-solterra-23', 'brand': 'Subaru', 'name': 'Solterra', 'v': 'Solterra', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 160, 'acc': 0, 'koffer': 452, 'cilinder': 0, 'bat': 71, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 55745, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'subaru-xv', 'brand': 'Subaru', 'name': 'XV ', 'v': 'Pure Lineartronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 180, 'power': 84, 'acc': 0, 'koffer': 385, 'cilinder': 1600000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 17496, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'suzuki-across', 'brand': 'Suzuki', 'name': 'Across', 'v': 'Plug-In Hybrid Grand Luxe Xtra AWD CVT', 'fuel': 'Plug-in hybride', 'verbrEl': 24.1, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 136, 'acc': 0, 'koffer': 490, 'cilinder': 2487000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 61999, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'suzuki-ignis-23', 'brand': 'Suzuki', 'name': 'Ignis', 'v': 'Grand Luxe + SHVS (MY21)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 116, 'power': 66, 'acc': 0, 'koffer': 260, 'cilinder': 1242000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 21599, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'suzuki-s-cross', 'brand': 'Suzuki', 'name': 'S-Cross', 'v': 'Grand Luxe + 2WD', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 96, 'acc': 0, 'koffer': 430, 'cilinder': 1373000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 27199, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'suzuki-swace-benz', 'brand': 'Suzuki', 'name': 'Swace', 'v': 'Hybrid GL+ CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 99, 'power': 72, 'acc': 0, 'koffer': 596, 'cilinder': 1798000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 33499, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'suzuki-swift-23', 'brand': 'Suzuki', 'name': 'Swift', 'v': 'Grand Luxe + SHVS (MY20 K12D)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 113, 'power': 66, 'acc': 0, 'koffer': 265, 'cilinder': 1242000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 21699, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'suzuki-sx4-scross', 'brand': 'Suzuki', 'name': 'SX4 S-Cross', 'v': 'Grand Luxe + SHVS (MY20)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 95, 'acc': 0, 'koffer': 430, 'cilinder': 1373000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 24099, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'suzuki-vitara-benz', 'brand': 'Suzuki', 'name': 'Vitara', 'v': 'Grand Luxe SHVS 2WD (MY23)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 95, 'acc': 0, 'koffer': 362, 'cilinder': 1373000, 'bat': 3, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 24799, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'tesla-model3-lr', 'brand': 'Tesla', 'name': 'Model 3', 'v': 'Long-Range Dual Motor AWD', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 425, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 52990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'tesla-model3-std', 'brand': 'Tesla', 'name': 'Model 3', 'v': 'Standard Plus RWD', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 175, 'acc': 0, 'koffer': 425, 'cilinder': 0, 'bat': 55, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 44990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'tesla-models', 'brand': 'Tesla', 'name': 'Model S', 'v': 'Long Range', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 193, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 100, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 99990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'tesla-model-x', 'brand': 'Tesla', 'name': 'Model X', 'v': 'Long Range', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 307, 'acc': 0, 'koffer': 660, 'cilinder': 0, 'bat': 100, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 113990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'tesla-model-y-1', 'brand': 'Tesla', 'name': 'Model Y', 'v': 'Long Range AWD', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 254, 'acc': 0, 'koffer': 854, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 53990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'toyota-aygo-32', 'brand': 'Toyota', 'name': 'Aygo X', 'v': 'VVT-i Play', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 53, 'acc': 0, 'koffer': 231, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 18300, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'toyota-bz4x-23', 'brand': 'Toyota', 'name': 'bZ4X', 'v': '71,4 kWh 2WD bZ4X', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 452, 'cilinder': 0, 'bat': 71, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 56820, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'toyota-bz4x-23-1', 'brand': 'Toyota', 'name': 'bZ4X', 'v': '71,4 kWh AWDi Style', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 160, 'acc': 0, 'koffer': 452, 'cilinder': 0, 'bat': 71, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 67380, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'toyota-camry', 'brand': 'Toyota', 'name': 'Camry', 'v': 'Hybrid Camry Plus e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 160, 'acc': 0, 'koffer': 524, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 45040, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'toyota-chr', 'brand': 'Toyota', 'name': 'C-HR', 'v': 'Hybrid C-LUB Mono-Tone e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 72, 'acc': 0, 'koffer': 377, 'cilinder': 1797000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 37490, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-corolla', 'brand': 'Toyota', 'name': 'Corolla ', 'v': 'Hybrid Dynamic e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 100, 'power': 103, 'acc': 0, 'koffer': 361, 'cilinder': 1798000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 34440, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-corolla-cross', 'brand': 'Toyota', 'name': 'Corolla Cross', 'v': 'Hybrid 2WD Dynamic e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 114, 'power': 112, 'acc': 0, 'koffer': 415, 'cilinder': 1987000, 'bat': 4, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 39280, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-corolla-sportstourer', 'brand': 'Toyota', 'name': 'Corolla Touring Sports', 'v': 'Hybrid Dynamic e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 101, 'power': 103, 'acc': 0, 'koffer': 598, 'cilinder': 1798000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 35430, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'toyota-landcruiser', 'brand': 'Toyota', 'name': 'Land Cruiser 150', 'v': 'D-4D Country AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 248, 'power': 150, 'acc': 0, 'koffer': 621, 'cilinder': 2755000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 66130, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-mirai-1', 'brand': 'Toyota', 'name': 'Mirai', 'v': 'Premium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0.8, 'co2': 0, 'power': 134, 'acc': 0, 'koffer': 321, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 72140, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'toyota-proace-medium', 'brand': 'Toyota', 'name': 'Proace', 'v': 'D-4D Comfort Medium', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 88, 'acc': 0, 'koffer': 5300, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 28629, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'toyota-proace-cargo-50kwh', 'brand': 'Toyota', 'name': 'Proace', 'v': 'EV 50kW Comfort Medium', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 50, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 39620, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'toyota-proace-plus-cargo-75kwh', 'brand': 'Toyota', 'name': 'Proace', 'v': 'EV 75kW Comfort Plus Medium', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 48210, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'toyota-proace-city', 'brand': 'Toyota', 'name': 'Proace City', 'v': 'Comfort SWB', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 81, 'acc': 0, 'koffer': 3300, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 19921, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'toyota-proace-city-1', 'brand': 'Toyota', 'name': 'Proace City', 'v': 'Comfort LWB', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 158, 'power': 81, 'acc': 0, 'koffer': 3900, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 29439, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'toyota-proace-city-verso', 'brand': 'Toyota', 'name': 'Proace City Verso', 'v': 'Shuttle LWB', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 150, 'power': 81, 'acc': 0, 'koffer': 209, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 30350, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'toyota-proace-verso', 'brand': 'Toyota', 'name': 'Proace Verso', 'v': 'D-4D MPV Medium', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 184, 'power': 106, 'acc': 0, 'koffer': 550, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 53895, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'toyota-rav4', 'brand': 'Toyota', 'name': 'RAV4 ', 'v': 'Hybrid Dynamic Business e-CVT (Lithium)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 129, 'acc': 0, 'koffer': 580, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 47440, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'toyota-rav4-phev', 'brand': 'Toyota', 'name': 'RAV4 ', 'v': 'Plug-in Hybrid Dynamic Plus e-CVT AWD-i', 'fuel': 'Plug-in hybride', 'verbrEl': 19.9, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 136, 'acc': 0, 'koffer': 580, 'cilinder': 2487000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 45800, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'toyota-yaris-32', 'brand': 'Toyota', 'name': 'Yaris', 'v': 'VVT-i Dynamic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 53, 'acc': 0, 'koffer': 286, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 23220, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'toyota-yaris-cross-benz', 'brand': 'Toyota', 'name': 'Yaris Cross', 'v': 'VVT-i Dynamic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 92, 'acc': 0, 'koffer': 390, 'cilinder': 1490000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 28560, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-benzine', 'brand': 'Volkswagen', 'name': 'Arteon', 'v': 'eHybrid OPF Elegance DSG6', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 115, 'acc': 0, 'koffer': 563, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 59475, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volkswagen-arteon-phev', 'brand': 'Volkswagen', 'name': 'Arteon', 'v': 'TSI OPF Elegance Business', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 110, 'acc': 0, 'koffer': 563, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 51755, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-shooting-brake-phev-32', 'brand': 'Volkswagen', 'name': 'Arteon Shooting Brake', 'v': 'eHybrid OPF Elegance DSG6', 'fuel': 'Plug-in hybride', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 115, 'acc': 0, 'koffer': 1632, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 60520, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-shooting-brake-phev-33', 'brand': 'Volkswagen', 'name': 'Arteon Shooting Brake', 'v': 'TSI OPF Elegance Business', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 144, 'power': 110, 'acc': 0, 'koffer': 1632, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 52480, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-caddy-diesel-32', 'brand': 'Volkswagen', 'name': 'Caddy ', 'v': 'TSI Maxi Drive', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 84, 'acc': 0, 'koffer': 191, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 31530, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-caddy-cng-32', 'brand': 'Volkswagen', 'name': 'Caddy ', 'v': 'TGI Maxi Life', 'fuel': 'CNG', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 7.6, 'verbrFCEV': 0, 'co2': 124, 'power': 96, 'acc': 0, 'koffer': 191, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 39310, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'volkswagen-caddy-cargo-1', 'brand': 'Volkswagen', 'name': 'Caddy Cargo', 'v': 'TSI Maxi', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 84, 'acc': 0, 'koffer': 191, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 27449, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-s', 'id': 'volkswagen-caddy-cargo', 'brand': 'Volkswagen', 'name': 'Caddy Cargo', 'v': 'TGI Maxi', 'fuel': 'CNG', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 7.7, 'verbrFCEV': 0, 'co2': 125, 'power': 96, 'acc': 0, 'koffer': 191, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 24059, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'volkswagen-caravelle', 'brand': 'Volkswagen', 'name': 'Caravelle', 'v': 'TDI Trendline LWB', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 188, 'power': 81, 'acc': 0, 'koffer': 5000, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 48840, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'vw-crafter-1', 'brand': 'Volkswagen', 'name': 'Crafter ', 'v': 'GB L3H3 30 TDI (EURO VI-e)', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 198, 'power': 120, 'acc': 0, 'koffer': 11300, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 34935, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'vw-crafter', 'brand': 'Volkswagen', 'name': 'Crafter ', 'v': 'E-Crafter GB L3H3 35 AUT', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 11300, 'cilinder': 0, 'bat': 35, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 61067, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'vw-crafter-2', 'brand': 'Volkswagen', 'name': 'Crafter ', 'v': 'GB L4H3 35 TDI', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 208, 'power': 130, 'acc': 0, 'koffer': 14400, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 40205, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-l', 'id': 'vw-crafter-3', 'brand': 'Volkswagen', 'name': 'Crafter ', 'v': 'GB L5H3 35 TDI', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 208, 'power': 130, 'acc': 0, 'koffer': 16000, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 51, 'price': 41553, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'volkswagen-golf-wit', 'brand': 'Volkswagen', 'name': 'Golf ', 'v': 'TSI OPF Life Business', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 81, 'acc': 0, 'koffer': 381, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 32045, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'volkswagen-golf-phev', 'brand': 'Volkswagen', 'name': 'Golf ', 'v': 'eHybrid OPF Style Business DSG', 'fuel': 'Plug-in hybride', 'verbrEl': 11, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 21, 'power': 110, 'acc': 0, 'koffer': 381, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 47210, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'volkswagen-golf-variant', 'brand': 'Volkswagen', 'name': 'Golf Variant ', 'v': 'TSI OPF Life Business', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 124, 'power': 81, 'acc': 0, 'koffer': 611, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 32935, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-id3', 'brand': 'Volkswagen', 'name': 'ID.3', 'v': '58 kWh Life Business', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 385, 'cilinder': 0, 'bat': 58, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 47155, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-id3-1', 'brand': 'Volkswagen', 'name': 'ID.3', 'v': '77 kWh Business Premium', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 385, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 60750, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '77 kWh Pro Performance', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 543, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 53830, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4-1', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '77 kWh GTX 4MOTION', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 70, 'acc': 0, 'koffer': 543, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 62220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '77 kWh Pro', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 128, 'acc': 0, 'koffer': 543, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 52080, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4-1', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '52 kWh Pure Performance', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 125, 'acc': 0, 'koffer': 543, 'cilinder': 0, 'bat': 52, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 46260, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'vw-id5', 'brand': 'Volkswagen', 'name': 'ID.5', 'v': '77 kWh Pro', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 128, 'acc': 0, 'koffer': 549, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 55375, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'vw-id5-2', 'brand': 'Volkswagen', 'name': 'ID.5', 'v': '77 kWh Pro Performance', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 549, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 57130, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'vw-id5-3', 'brand': 'Volkswagen', 'name': 'ID.5', 'v': '77 kWh GTX 4MOTION', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 220, 'acc': 0, 'koffer': 549, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 64330, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'volkswagen-idbuzz', 'brand': 'Volkswagen', 'name': 'ID.Buzz', 'v': '150 kW (77kWh) RWD Pro', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1121, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 68607, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'vw-id-buzz-cargo-1', 'brand': 'Volkswagen', 'name': 'ID.Buzz Cargo', 'v': '150 kW (77kWh) RWD', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 3900, 'cilinder': 0, 'bat': 77, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 45349, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-multivan-phev', 'brand': 'Volkswagen', 'name': 'Multivan ', 'v': 'TSI PHEV DSG6 KWB', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 110, 'acc': 0, 'koffer': 1700, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 59482, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-multivan-1', 'brand': 'Volkswagen', 'name': 'Multivan ', 'v': 'TSI DSG7 LWB', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 198, 'power': 100, 'acc': 0, 'koffer': 1900, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 50914, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-multivan', 'brand': 'Volkswagen', 'name': 'Multivan ', 'v': 'TDI DSG7 LWB', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 170, 'power': 110, 'acc': 0, 'koffer': 1900, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 55, 'price': 55933, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat-32', 'brand': 'Volkswagen', 'name': 'Passat Variant', 'v': 'TDI SCR Style', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 110, 'acc': 0, 'koffer': 650, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 42800, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat-gte-variant-32', 'brand': 'Volkswagen', 'name': 'Passat Variant', 'v': 'GTE DSG6', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 160, 'acc': 0, 'koffer': 650, 'cilinder': 1395000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 57070, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat-33', 'brand': 'Volkswagen', 'name': 'Passat Variant', 'v': 'TSI ACT OPF Elegance', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 110, 'acc': 0, 'koffer': 650, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 43410, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'vw-polo-benz-32', 'brand': 'Volkswagen', 'name': 'Polo', 'v': 'TSI OPF Life', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 70, 'acc': 0, 'koffer': 351, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 24680, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volkswagen-sharan', 'brand': 'Volkswagen', 'name': 'Sharan', 'v': 'TSI OPF Highline', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 183, 'power': 110, 'acc': 0, 'koffer': 955, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 49850, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'vw-taigo-23', 'brand': 'Volkswagen', 'name': 'Taigo', 'v': 'TSI OPF Life', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 70, 'acc': 0, 'koffer': 440, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 26205, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'vw-tcross', 'brand': 'Volkswagen', 'name': 'T-Cross', 'v': 'TSI OPF Life', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 81, 'acc': 0, 'koffer': 355, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 27025, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-benzine', 'brand': 'Volkswagen', 'name': 'Tiguan', 'v': 'TSI OPF Life', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 96, 'acc': 0, 'koffer': 615, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 38360, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volkswagen-tiguan-allspace', 'brand': 'Volkswagen', 'name': 'Tiguan Allspace', 'v': 'TSI OPF Life', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 110, 'acc': 0, 'koffer': 760, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 43570, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'vw-touareg-23', 'brand': 'Volkswagen', 'name': 'Touareg ', 'v': 'V6 TDI SCR 4MOTION TIPTRONIC Business El', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 309, 'power': 243, 'acc': 0, 'koffer': 454, 'cilinder': 2967000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 54, 'price': 122936, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-touran-32', 'brand': 'Volkswagen', 'name': 'Touran', 'v': 'TSI ACT OPF Trendline DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 110, 'acc': 0, 'koffer': 834, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 37130, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-transporter', 'brand': 'Volkswagen', 'name': 'Transporter', 'v': 'Kombi TDI LWB', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 191, 'power': 110, 'acc': 0, 'koffer': 6700, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 52850, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'vw-transporter-1', 'brand': 'Volkswagen', 'name': 'Transporter', 'v': 'TDI KWB', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 196, 'power': 110, 'acc': 0, 'koffer': 5800, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 29016, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'vw-transporter-2', 'brand': 'Volkswagen', 'name': 'Transporter', 'v': 'TDI LWB', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 198, 'power': 110, 'acc': 0, 'koffer': 6700, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 30030, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'vw-transporter-3', 'brand': 'Volkswagen', 'name': 'Transporter', 'v': 'PU TDI', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 221, 'power': 110, 'acc': 0, 'koffer': 5700, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 50, 'price': 31205, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1-m', 'id': 'vw-transporter-4', 'brand': 'Volkswagen', 'name': 'Transporter', 'v': 'PUDC TDI', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 216, 'power': 110, 'acc': 0, 'koffer': 5800, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 50, 'price': 33479, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'vw-t-roc-32', 'brand': 'Volkswagen', 'name': 'T-Roc', 'v': 'TSI OPF Life', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 145, 'power': 110, 'acc': 0, 'koffer': 445, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 31060, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'vw-up-benz-32', 'brand': 'Volkswagen', 'name': 'up!', 'v': 'Up!', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 116, 'power': 48, 'acc': 0, 'koffer': 251, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 16630, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-c40-23', 'brand': 'Volvo', 'name': 'C40', 'v': 'Recharge Core', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 175, 'acc': 0, 'koffer': 413, 'cilinder': 0, 'bat': 66, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 53950, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-c40-23-1', 'brand': 'Volvo', 'name': 'C40', 'v': 'Recharge Extended Range Core', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 185, 'acc': 0, 'koffer': 413, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 55950, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-c40-23-2', 'brand': 'Volvo', 'name': 'C40', 'v': 'Recharge Twin Plus', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 110, 'acc': 0, 'koffer': 413, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 63800, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-ex90', 'brand': 'Volvo', 'name': 'EX90', 'v': 'Twin Motor AWD Ultra', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 180, 'acc': 0, 'koffer': 310, 'cilinder': 0, 'bat': 111, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 103500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-s60', 'brand': 'Volvo', 'name': 'S60', 'v': 'T8 Plug-in hybrid benzine Plus Bright AW', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 8.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 25, 'power': 228, 'acc': 0, 'koffer': 442, 'cilinder': 1969000, 'bat': 14, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 65200, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-s60-1', 'brand': 'Volvo', 'name': 'S60', 'v': 'B4 Mild hybrid benzine Plus Bright', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 145, 'acc': 0, 'koffer': 442, 'cilinder': 1969000, 'bat': 1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 50300, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-s90-1', 'brand': 'Volvo', 'name': 'S90', 'v': 'T8 Plug-in Hybrid Plus Bright AWD Geartr', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 25, 'power': 228, 'acc': 0, 'koffer': 461, 'cilinder': 1969000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 77590, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-s90', 'brand': 'Volvo', 'name': 'S90', 'v': 'B4 Mild Hybrid Plus Bright Geartronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 145, 'acc': 0, 'koffer': 461, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 62250, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60-plugin', 'brand': 'Volvo', 'name': 'V60', 'v': 'T6 PHEV benzine Core Bright AWD Geartron', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 25, 'power': 186, 'acc': 0, 'koffer': 648, 'cilinder': 1969000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 62130, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60', 'brand': 'Volvo', 'name': 'V60', 'v': 'B3 Mild hybrid benzine Core 7-DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 120, 'acc': 0, 'koffer': 648, 'cilinder': 1969000, 'bat': 1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 46750, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60-1', 'brand': 'Volvo', 'name': 'V60', 'v': 'B4 Mild hybrid diesel Essential Geartron', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 162, 'power': 145, 'acc': 0, 'koffer': 648, 'cilinder': 1969000, 'bat': 1, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 48650, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-v90', 'brand': 'Volvo', 'name': 'V90', 'v': 'T6 PHEV AWD AUT Plus Bright', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 25, 'power': 186, 'acc': 0, 'koffer': 551, 'cilinder': 1969000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 76250, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-v90-1', 'brand': 'Volvo', 'name': 'V90', 'v': 'B4 Benzine AUT Plus Bright', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 145, 'acc': 0, 'koffer': 551, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 66250, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-v90-2', 'brand': 'Volvo', 'name': 'V90', 'v': 'B4 Diesel AUT Plus Bright', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 164, 'power': 145, 'acc': 0, 'koffer': 551, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 67350, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-recharge', 'brand': 'Volvo', 'name': 'XC40', 'v': 'PHEV T4 DCT Plus Bright Design', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 55, 'power': 95, 'acc': 0, 'koffer': 405, 'cilinder': 1477000, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 38850, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40', 'brand': 'Volvo', 'name': 'XC40', 'v': 'T2 Plus Dark Design AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 179, 'power': 95, 'acc': 0, 'koffer': 452, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 43850, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-electric', 'brand': 'Volvo', 'name': 'XC40', 'v': 'Recharge Core', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 175, 'acc': 0, 'koffer': 419, 'cilinder': 0, 'bat': 69, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 52450, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'Volvo-xc40-1', 'brand': 'Volvo', 'name': 'XC40', 'v': 'Recharge Core Extended Range', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 185, 'acc': 0, 'koffer': 419, 'cilinder': 0, 'bat': 82, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 54450, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-2', 'brand': 'Volvo', 'name': 'XC40', 'v': 'Recharge Twin Plus AWD', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 110, 'acc': 0, 'koffer': 419, 'cilinder': 0, 'bat': 82, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 62300, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-recharge', 'brand': 'Volvo', 'name': 'XC60', 'v': 'B4 Mild hybrid diesel Plus Dark Geartron', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 176, 'power': 145, 'acc': 0, 'koffer': 613, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 61750, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-recharge-1', 'brand': 'Volvo', 'name': 'XC60', 'v': 'B4 Mild hybrid benzine Plus Dark Geartro', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 191, 'power': 145, 'acc': 0, 'koffer': 613, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 59550, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60', 'brand': 'Volvo', 'name': 'XC60', 'v': 'T6 PHEV benzine Ultimate Black Edition A', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 186, 'acc': 0, 'koffer': 598, 'cilinder': 1969000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 64316, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90', 'brand': 'Volvo', 'name': 'XC90', 'v': 'T8 PHEV Plus Bright AWD Geartronic', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 228, 'acc': 0, 'koffer': 640, 'cilinder': 1969000, 'bat': 18, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 96690, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-1', 'brand': 'Volvo', 'name': 'XC90', 'v': 'B5 Mild Hybrid Plus Bright AWD Geartroni', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 218, 'power': 184, 'acc': 0, 'koffer': 680, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 54, 'price': 84740, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-2', 'brand': 'Volvo', 'name': 'XC90', 'v': 'B5 Mild Hybrid Plus Bright AWD Geartroni', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 202, 'power': 173, 'acc': 0, 'koffer': 680, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 54, 'price': 83690, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-base', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'BASE', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 17672, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-box', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'BOX', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 6430, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 20356, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-bus', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'BUS', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 1300, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 21922, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-cabrio', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'CABRIO', 'fuel': 'Elektrisch', 'verbrEl': 75, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 480, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 23265, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-kipper', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'KIPPER', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 1140, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 24942, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-pickup', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'PICKUP ', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 1150, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 18567, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-pickup-bus', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'PICKUP BUS', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 480, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 20692, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-offroad-transporter', 'brand': 'XBUS', 'name': 'Offroad', 'v': 'TRANSPORTER', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 2760, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 20285, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-base', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'BASE', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 17672, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-bus', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'BUS', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 1300, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 21922, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-kipper', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'KIPPER', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 1140, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 24942, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-box', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'BOX', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 6430, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 20356, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-transporter', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'TRANSPORTER', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 2760, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 20285, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-pickup-bus', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'PICKUP BUS', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 480, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 20692, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-pickup', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'PICKUP ', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 1150, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 18567, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xbus-standard-cabrio', 'brand': 'XBUS', 'name': 'Standaard', 'v': 'CABRIO', 'fuel': 'Elektrisch', 'verbrEl': 7.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 56, 'acc': 0, 'koffer': 480, 'cilinder': 0, 'bat': 15, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 23265, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 },
{ 'segment': 'L7e', 'id': 'xev-yoyo', 'brand': 'XEV', 'name': 'Yoyo', 'v': '10,3 kWh', 'fuel': 'Elektrisch', 'verbrEl': 6.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 11, 'acc': 0, 'koffer': 180, 'cilinder': 0, 'bat': 10, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 92, 'price': 15770, 'pk': 4, 'image': false, 'testcyclus':'WLTP','model':'L7e', 'fakehybrides':0 }



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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	