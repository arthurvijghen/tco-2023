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
{ 'segment': 'KM1', 'id': 'renault-kangoo-ze-maxi-32', 'brand': 'Renault', 'name': 'Kangoo Z.E.', 'v': 'Electric 33 maxi (5 pl) B-Buy', 'fuel': 'Elektrisch', 'verbrEl': 12.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 44, 'acc': 0, 'koffer': 3500, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 37679, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'jaguar-ipace', 'brand': 'Jaguar', 'name': 'I-PACE', 'v': 'EV400 S AWD Aut', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 294, 'acc': 0, 'koffer': 1453, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 82075, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'mazda-cx3-benzine', 'brand': 'Mazda', 'name': 'CX-3', 'v': 'SKYACTIV-G Hakon&eacute; AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 160, 'power': 89, 'acc': 0, 'koffer': 1260, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 26790, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mazda-cx5-benzine', 'brand': 'Mazda', 'name': 'CX-5', 'v': 'SKYACTIV-G Newground', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 120, 'acc': 0, 'koffer': 1377, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 34090, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'skoda-kodiaq-benz', 'brand': '&#x160;koda', 'name': 'Kodiaq', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 110, 'acc': 0, 'koffer': 2065, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 40560, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'skoda-kodiaq-benz-1', 'brand': '&#x160;koda', 'name': 'Kodiaq', 'v': 'CRTDI Ambition DSG7', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 110, 'acc': 0, 'koffer': 2065, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 45710, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'vw-transporter', 'brand': 'Volkswagen', 'name': 'Transporter', 'v': 'Kombi TDI LWB', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 191, 'power': 110, 'acc': 0, 'koffer': 6700, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 49346, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'cupra-ateca', 'brand': 'Cupra', 'name': 'Ateca', 'v': 'TSI DSG 4Drive', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 198, 'power': 221, 'acc': 0, 'koffer': 1579, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 52370, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'tesla-model3-std', 'brand': 'Tesla', 'name': 'Model 3', 'v': '0', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 425, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 65990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'tesla-model3-lr', 'brand': 'Tesla', 'name': 'Model 3', 'v': '0', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 175, 'acc': 0, 'koffer': 425, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 43100, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x2-benzine', 'brand': 'BMW', 'name': 'X2 (F39)', 'v': 'sDrive18i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 162, 'power': 100, 'acc': 0, 'koffer': 1355, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 36550, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-2phev-32', 'brand': 'BMW', 'name': '2-Reeks Gran Tourer (F46)', 'v': '218i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 100, 'acc': 0, 'koffer': 1905, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 32900, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5-phev', 'brand': 'BMW', 'name': 'X5 (G05)', 'v': 'xDrive45e AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 155, 'acc': 0, 'koffer': 0, 'cilinder': 2998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 86950, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'bmw-1-diesel', 'brand': 'BMW', 'name': '1-Reeks (F40)', 'v': '116d', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 85, 'acc': 0, 'koffer': 1200, 'cilinder': 1496000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 31350, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-benzine', 'brand': 'Mini', 'name': 'Mini Countryman (F60)', 'v': 'Cooper S ALL4 AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 170, 'power': 131, 'acc': 0, 'koffer': 1390, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 42150, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-phev', 'brand': 'Mini', 'name': 'Mini Countryman (F60)', 'v': 'Cooper S E ALL4 AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 47, 'power': 92, 'acc': 0, 'koffer': 1390, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 45050, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-benzine', 'brand': 'Porsche', 'name': 'Cayenne ', 'v': '0', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 11.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 259, 'power': 250, 'acc': 0, 'koffer': 1710, 'cilinder': 2995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 79945, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-jumper', 'brand': 'Citro&euml;n', 'name': 'Jumper', 'v': '33 L2H2 BlueHDI S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 165, 'power': 88, 'acc': 0, 'koffer': 11500, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 39507, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'peugeot-boxer-diesel', 'brand': 'Peugeot', 'name': 'Boxer', 'v': 'FT L2H2 333 BlueHDI S/S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 159, 'power': 88, 'acc': 0, 'koffer': 11500, 'cilinder': 2179000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 39507, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-55', 'brand': 'Audi', 'name': 'e-tron', 'v': '55 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 265, 'acc': 0, 'koffer': 1725, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 88300, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'tesla-models', 'brand': 'Tesla', 'name': 'Model S', 'v': 'Plaid', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 193, 'acc': 0, 'koffer': 877, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 129990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat-32', 'brand': 'Volkswagen', 'name': 'Passat Variant', 'v': 'GTE Business DSG6', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 160, 'acc': 0, 'koffer': 1780, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 59520, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq-benzine', 'brand': 'Hyundai', 'name': 'IONIQ', 'v': 'GDi ISG Feel 6-DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 77, 'acc': 0, 'koffer': 1518, 'cilinder': 1580000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 30499, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq-elek', 'brand': 'Hyundai', 'name': 'IONIQ', 'v': 'Electric Feel', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1417, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 40099, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'toyota-rav4', 'brand': 'Toyota', 'name': 'RAV4 ', 'v': 'Hybrid Dynamic Business e-CVT (Lithium)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 129, 'acc': 0, 'koffer': 580, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 45540, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'honda-e-32', 'brand': 'Honda', 'name': 'e', 'v': 'Advance 16', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 113, 'acc': 0, 'koffer': 857, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 38995, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'honda-e-33', 'brand': 'Honda', 'name': 'e', 'v': 'Advance 17', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 113, 'acc': 0, 'koffer': 857, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 38995, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ssangyong-tivoli-benz', 'brand': 'SsangYong', 'name': 'Tivoli', 'v': 'T-GDI Quartz 2WD AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 161, 'power': 120, 'acc': 0, 'koffer': 395, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 28190, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ssangyong-korando-benz', 'brand': 'SsangYong', 'name': 'Korando', 'v': 'T-GDI Quartz 4WD AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 120, 'acc': 0, 'koffer': 1248, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 37190, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-50', 'brand': 'Audi', 'name': 'e-tron', 'v': '50 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 230, 'acc': 0, 'koffer': 1725, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 76500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'vw-e-up-32', 'brand': 'Volkswagen', 'name': 'up!', 'v': 'Eco Up!', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 5.7, 'verbrFCEV': 0, 'co2': 103, 'power': 50, 'acc': 0, 'koffer': 959, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 19085, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-e-berlingo-32', 'brand': 'Citro&euml;n', 'name': 'Berlingo Van', 'v': 'M Light PureTech S&S Club', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 173, 'power': 81, 'acc': 0, 'koffer': 3800, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 24176, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'seat-tarraco-phev-32', 'brand': 'Seat', 'name': 'Tarraco', 'v': 'TSI Move!', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 150, 'power': 110, 'acc': 0, 'koffer': 1920, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 40260, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-ev-32', 'brand': 'Peugeot', 'name': '2008', 'v': 'Electrique Allure', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 405, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 43365, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'merc-vito-diesel', 'brand': 'Mercedes-Benz', 'name': 'Vito', 'v': 'Tourer 110 CDI PRO L2', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 193, 'power': 75, 'acc': 0, 'koffer': 990, 'cilinder': 1749000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 33251, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'alfa-romeo-giulia', 'brand': 'Alfa', 'name': 'Romeo Giulia', 'v': 'TB RWD AUT Super', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 165, 'power': 147, 'acc': 0, 'koffer': 1200, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 45450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'ford-explorer-phev', 'brand': 'Ford', 'name': 'Explorer', 'v': 'EcoBoost PHEV ST-Line AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 21.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 71, 'power': 336, 'acc': 0, 'koffer': 2274, 'cilinder': 3000000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 89750, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':178 },
{ 'segment': 'SUV-B', 'id': 'ford-ecosport-benz', 'brand': 'Ford', 'name': 'EcoSport New', 'v': 'EcoBoost Titanium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 134, 'power': 92, 'acc': 0, 'koffer': 0, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 25440, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-sportback-55', 'brand': 'Audi', 'name': 'e-tron Sportback', 'v': '55 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 265, 'acc': 0, 'koffer': 615, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 90300, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'e-tron-sportback-50', 'brand': 'Audi', 'name': 'e-tron Sportback', 'v': '50 QUATTRO Advanced', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 230, 'acc': 0, 'koffer': 615, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 78500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'skoda-kamiq-cng', 'brand': '&#x160;koda', 'name': 'Kamiq', 'v': 'TGI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 3.7, 'verbrFCEV': 0, 'co2': 100, 'power': 66, 'acc': 0, 'koffer': 1395, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 28270, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'hyundai-i10', 'brand': 'Hyundai', 'name': 'i10', 'v': 'Twist', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 114, 'power': 49, 'acc': 0, 'koffer': 1050, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 15849, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q7', 'brand': 'Audi', 'name': 'Q7', 'v': '55 TFSI S Line eQuattro Tiptronic', 'fuel': 'Plug-in hybride', 'verbrEl': 20.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 59, 'power': 250, 'acc': 0, 'koffer': 2050, 'cilinder': 2995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 79860, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':148 },
{ 'segment': '0', 'id': 'subaru-xv', 'brand': 'Subaru', 'name': 'XV ', 'v': 'Luxury Lineartronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 180, 'power': 84, 'acc': 0, 'koffer': 1310, 'cilinder': 1600000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 27995, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': '0', 'id': 'suzuki-swif-benz', 'brand': 'Suzuki', 'name': 'Swift', 'v': 'Grand Luxe + SHVS CVT (MY20 K12D)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 66, 'acc': 0, 'koffer': 579, 'cilinder': 1242000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 20999, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': '0', 'id': 'suzuki-sx4-scross', 'brand': 'Suzuki', 'name': 'SX4 S-Cross', 'v': 'Grand Luxe + SHVS (MY20)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 95, 'acc': 0, 'koffer': 1269, 'cilinder': 1373000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 24099, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'mercedes-vito-elek', 'brand': 'Mercedes-Benz', 'name': 'Vito', 'v': 'GB L3', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 6900, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 51594, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-vito-elek-1', 'brand': 'Mercedes-Benz', 'name': 'Vito', 'v': 'Tourer PRO L2', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 990, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 53228, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'audi-a1-sportback-benz', 'brand': 'Audi', 'name': 'A1 Sportback ', 'v': '25 TFSI Advanced', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 70, 'acc': 0, 'koffer': 1090, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 24200, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-phev', 'brand': 'Porsche', 'name': 'Cayenne ', 'v': 'E-Hybrid', 'fuel': 'Plug-in hybride', 'verbrEl': 25.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 71, 'power': 250, 'acc': 0, 'koffer': 1710, 'cilinder': 2995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 95191, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':178 },
{ 'segment': 'A', 'id': 'honda-jazz', 'brand': 'Honda', 'name': 'Jazz', 'v': 'e:HEV Elegance e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 80, 'acc': 0, 'koffer': 1205, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 26280, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'citroen-c3-32', 'brand': 'Citro&euml;n', 'name': 'C3', 'v': 'PureTech SHINE S&S EAT6', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 81, 'acc': 0, 'koffer': 922, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 24495, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'vw-touareg', 'brand': 'Volkswagen', 'name': 'Touareg ', 'v': 'V6 TFSI OPF 4MOTION TIPTRONIC Business E', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 11.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 253, 'power': 250, 'acc': 0, 'koffer': 1800, 'cilinder': 2995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 93970, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-5-benz', 'brand': 'BMW', 'name': '5-Reeks (G30)', 'v': '520i AUT 48v', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 157, 'power': 135, 'acc': 0, 'koffer': 530, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 57450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-5-phev', 'brand': 'BMW', 'name': '5-Reeks (G30)', 'v': '530e xDrive AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 135, 'acc': 0, 'koffer': 530, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 69050, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'bmw-1-benzine', 'brand': 'BMW', 'name': '1-Reeks (F40)', 'v': '116i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 80, 'acc': 0, 'koffer': 1200, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 28740, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'audi-a3-sportback-gtron-32', 'brand': 'Audi', 'name': 'A3 Limousine ', 'v': '30 TDI Advanced', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 85, 'acc': 0, 'koffer': 1200, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 32450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'ford-fiesta-benz-32', 'brand': 'Ford', 'name': 'Fiesta', 'v': 'EcoBoost mHEV Titanium A7 DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 133, 'power': 92, 'acc': 0, 'koffer': 1093, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 27460, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw5-touring-phev-32', 'brand': 'BMW', 'name': '5-Reeks Touring (G31)', 'v': '520i AUT 48v', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 135, 'acc': 0, 'koffer': 1700, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 60000, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'hyundai-i30', 'brand': 'Hyundai', 'name': 'i30', 'v': 'T-GDi 48v Twist', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 88, 'acc': 0, 'koffer': 1301, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 25149, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-4-diesel', 'brand': 'BMW', 'name': '4-Reeks Coup&eacute; (G22)', 'v': '420d', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 120, 'acc': 0, 'koffer': 440, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 52800, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'audi-a3-sportback-etron-32', 'brand': 'Audi', 'name': 'A3 Limousine ', 'v': '30 TFSI Advanced', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 110, 'acc': 0, 'koffer': 1200, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 30560, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x2-phev', 'brand': 'BMW', 'name': 'X2 (F39)', 'v': 'xDrive25e AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 44, 'power': 92, 'acc': 0, 'koffer': 1355, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 50000, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'seat-leon-benz-32', 'brand': 'Seat', 'name': 'Leon', 'v': 'eTSI Move! MHEV DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 110, 'acc': 0, 'koffer': 0, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 32140, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'toyota-yaris-32', 'brand': 'Toyota', 'name': 'Yaris', 'v': 'VVT-iE Dynamic CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 92, 'acc': 0, 'koffer': 286, 'cilinder': 1490000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 23670, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi-2-32', 'brand': '&#x160;koda', 'name': 'Octavia Combi', 'v': 'TSI eTec Ambition DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 118, 'power': 81, 'acc': 0, 'koffer': 1700, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 37100, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-shooting-brake-phev-32', 'brand': 'Volkswagen', 'name': 'Arteon Shooting Brake', 'v': 'TSI OPF Elegance', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 144, 'power': 110, 'acc': 0, 'koffer': 1632, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 48515, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'landrover-discovery-sport-phev', 'brand': 'Land', 'name': 'Rover Discovery Sport', 'v': 'P300e PHEV R-Dynamic S AWD AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 26.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 44, 'power': 227, 'acc': 0, 'koffer': 1574, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 61300, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'toyota-corolla', 'brand': 'Toyota', 'name': 'Corolla ', 'v': 'Hybrid Dynamic e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 1.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 42, 'power': 90, 'acc': 0, 'koffer': 361, 'cilinder': 1798000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 33590, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'peugeot-5008-benz-32', 'brand': 'Peugeot', 'name': '5008', 'v': 'PureTech S/S Allure Pack EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 96, 'acc': 0, 'koffer': 1940, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 45195, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'audi-q3-diesel', 'brand': 'Audi', 'name': 'Q3 ', 'v': '35 TDI Business Edition Advanced S-TRONI', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 141, 'power': 110, 'acc': 0, 'koffer': 1525, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 44950, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'audi-q3-sportback-phev-32-kopie', 'brand': 'Audi', 'name': 'Q3 Sportback', 'v': '35 TDI Business Edition S-Line S-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 110, 'acc': 0, 'koffer': 0, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 46850, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'bmw-x6-benzine', 'brand': 'BMW', 'name': 'X6 (G06)', 'v': 'xDrive40i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 10.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 239, 'power': 245, 'acc': 0, 'koffer': 1530, 'cilinder': 2998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 80800, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-2-gran-coupe-benz', 'brand': 'BMW', 'name': '2-Reeks Gran Coup&eacute; (F44)', 'v': '218i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 100, 'acc': 0, 'koffer': 430, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 36650, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'hyundai-i20-32', 'brand': 'Hyundai', 'name': 'i20', 'v': 'T-GDI Twist 7-DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 74, 'acc': 0, 'koffer': 1165, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 21199, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mini-3deurs-benz', 'brand': 'Mini', 'name': 'Mini 3-deurs (F56)', 'v': 'Cooper AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 100, 'acc': 0, 'koffer': 731, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 29250, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mini-mini-electric-32', 'brand': 'Mini', 'name': 'Mini 3-deurs (F56)', 'v': 'Cooper SE', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 0, 'koffer': 731, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 36500, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'opel-mokka-e-32', 'brand': 'Opel', 'name': 'Mokka', 'v': 'BEV 50kWh e-Elegance', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1060, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 42600, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'landrover-rangerover-velar-benzine', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'P250 AWD AUT S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 217, 'power': 184, 'acc': 0, 'koffer': 1731, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 69110, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'rangerover-velar-phev', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'P400e PHEV AWD AUT S', 'fuel': 'Plug-in hybride', 'verbrEl': 21.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 51, 'power': 297, 'acc': 0, 'koffer': 1731, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 82300, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':128 },
{ 'segment': 'SUV-EF', 'id': 'jaguar-fpace-phev', 'brand': 'Jaguar', 'name': 'F-PACE', 'v': 'P250 AWD AUT S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 213, 'power': 183, 'acc': 0, 'koffer': 1410, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 67710, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'jaguar-fpace', 'brand': 'Jaguar', 'name': 'F-PACE', 'v': 'P400e PHEV AWD AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 31, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 297, 'acc': 0, 'koffer': 1410, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 77000, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'mazda-cx30-benzine', 'brand': 'Mazda', 'name': 'CX-30', 'v': 'SKYACTIV-G SkyMove AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 90, 'acc': 0, 'koffer': 1406, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 29690, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'audi-q2-32', 'brand': 'Audi', 'name': 'Q2', 'v': '35 TFSI Business Edition Advanced S-Tron', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 110, 'acc': 0, 'koffer': 1050, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 36400, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'toyota-highlander', 'brand': 'Toyota', 'name': 'Highlander', 'v': 'Hybrid AWD-i e-CVT Highlander', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 137, 'acc': 0, 'koffer': 1909, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 67870, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-traveller-50-32', 'brand': 'Peugeot', 'name': 'Traveller', 'v': 'Standard L2 Business 50kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5200, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 59290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-traveller-75-32', 'brand': 'Peugeot', 'name': 'Traveller', 'v': 'Standard L2 Business 75kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5200, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 65290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'jaguar-xe', 'brand': 'Jaguar', 'name': 'XE', 'v': 'P250 R-Dynamic BLACK AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 187, 'power': 184, 'acc': 0, 'koffer': 549, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 55680, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-zafira-e-life-75-32', 'brand': 'Opel', 'name': 'Zafira Life', 'v': '50 kWh e-Business Edition L2H1', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5200, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 60090, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-zafira-e-life-50-32', 'brand': 'Opel', 'name': 'Zafira Life', 'v': '75 kWh e-Business Edition L2H1', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5200, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 66090, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'jaguar-xf', 'brand': 'Jaguar', 'name': 'XF', 'v': 'P250 AUT R-Dynamic S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 182, 'power': 184, 'acc': 0, 'koffer': 628, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 61430, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-jumpy-elektrisch', 'brand': 'Citro&euml;n', 'name': 'Jumpy', 'v': 'M 50 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 54670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-jumpy-elektrisch-1', 'brand': 'Citro&euml;n', 'name': 'Jumpy', 'v': 'M 75 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 60670, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'audi-q8-phev', 'brand': 'Audi', 'name': 'Q8', 'v': '55 TFSI e Tiptronic Quattro', 'fuel': 'Plug-in hybride', 'verbrEl': 21.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 280, 'acc': 0, 'koffer': 1755, 'cilinder': 2995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 83200, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'toyota-chr', 'brand': 'Toyota', 'name': 'C-HR', 'v': 'Hybrid C-LUB Mono-Tone e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 72, 'acc': 0, 'koffer': 377, 'cilinder': 1797000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 36750, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-caddy-diesel-32', 'brand': 'Volkswagen', 'name': 'Caddy ', 'v': 'TDI Life', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 75, 'acc': 0, 'koffer': 2556, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 31750, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-octavia-combi-3-32', 'brand': '&#x160;koda', 'name': 'Octavia Combi', 'v': 'CRTDI Ambition DSG', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 85, 'acc': 0, 'koffer': 1700, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 40305, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-caddy-cng-32', 'brand': 'Volkswagen', 'name': 'Caddy ', 'v': 'TSI Drive DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 84, 'acc': 0, 'koffer': 2556, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 29900, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'seat-ibiza-benz-32', 'brand': 'Seat', 'name': 'Ibiza ', 'v': 'TSI S/S Style DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 81, 'acc': 0, 'koffer': 1165, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 23340, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mazda-3-hatchback-benz', 'brand': 'Mazda', 'name': '3 Hatchback ', 'v': 'SKYACTIV-G M Hybrid SkyDrive Business AU', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 90, 'acc': 0, 'koffer': 1019, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 29090, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mazda-3-benzine', 'brand': 'Mazda', 'name': '3 Sedan ', 'v': 'SKYACTIV-G M Hybrid SkyDrive', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 90, 'acc': 0, 'koffer': 1132, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 27990, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'skoda-scala-32', 'brand': '&#x160;koda', 'name': 'Scala', 'v': 'TSI Style', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 81, 'acc': 0, 'koffer': 1410, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 31950, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'skoda-kamiq-32', 'brand': '&#x160;koda', 'name': 'Kamiq', 'v': 'TSI Ambition DSG7', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 81, 'acc': 0, 'koffer': 1395, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 31305, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': '0', 'id': 'suzuki-swace-benz', 'brand': 'Suzuki', 'name': 'Swace', 'v': 'Hybrid GL+ CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 72, 'acc': 0, 'koffer': 1232, 'cilinder': 1798000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 29999, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': '0', 'id': 'suzuki-ignis-benz', 'brand': 'Suzuki', 'name': 'Ignis', 'v': 'Grand Luxe + SHVS CVT (MY21)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 66, 'acc': 0, 'koffer': 1100, 'cilinder': 1242000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 21099, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'suzuki-vitara-benz', 'brand': 'Suzuki', 'name': 'Vitara', 'v': 'Grand Luxe Xtra SHVS Aut (MY21)', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 95, 'acc': 0, 'koffer': 1120, 'cilinder': 1373000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 27299, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-3', 'brand': 'Maxus', 'name': 'eDeliver 3', 'v': '35kWh SWB Aut', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 4800, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 39313, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-3-1', 'brand': 'Maxus', 'name': 'eDeliver 3', 'v': '53kWh SWB Aut', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 4800, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 43548, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-3-2', 'brand': 'Maxus', 'name': 'eDeliver 3', 'v': '35kWh LWB Aut', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 6300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 41733, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-3-3', 'brand': 'Maxus', 'name': 'eDeliver 3', 'v': '53kWh LWB Aut', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 6300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 45968, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'audi-q3-benzine', 'brand': 'Audi', 'name': 'Q3 ', 'v': '35 TFSI Business Edition Advanced S-TRON', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 145, 'power': 110, 'acc': 0, 'koffer': 1525, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 43190, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a5-sportback-diesel', 'brand': 'Audi', 'name': 'A5 Sportback', 'v': '30 TDI Business Edition S line S-tronic', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 100, 'acc': 0, 'koffer': 0, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 50560, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a5-sportback', 'brand': 'Audi', 'name': 'A5 Sportback', 'v': '35 TFSI Business Edition S line S-tronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 110, 'acc': 0, 'koffer': 0, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 46670, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'audi-q3', 'brand': 'Audi', 'name': 'Q3 ', 'v': '45 TFSI e S-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 15.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 110, 'acc': 0, 'koffer': 1525, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 47600, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a7-sportback', 'brand': 'Audi', 'name': 'A7 Sportback', 'v': '50 TFSI e quattro S tronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 1.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 185, 'acc': 0, 'koffer': 0, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 76200, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'cupra-formentor', 'brand': 'Cupra', 'name': 'Formentor', 'v': 'TSI DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 150, 'power': 110, 'acc': 0, 'koffer': 0, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 37920, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'toyota-landcruiser', 'brand': 'Toyota', 'name': 'Land Cruiser 150', 'v': 'D-4D Country AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 244, 'power': 150, 'acc': 0, 'koffer': 1434, 'cilinder': 2755000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 59020, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'toyota-ladcruiser-150-diesel', 'brand': 'Toyota', 'name': 'Land Cruiser 150', 'v': 'D-4D Country AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 9.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 244, 'power': 150, 'acc': 0, 'koffer': 1934, 'cilinder': 2755000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 52, 'price': 61380, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'toyota-camry', 'brand': 'Toyota', 'name': 'Camry', 'v': 'Hybrid Camry Plus e-CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 160, 'acc': 0, 'koffer': 524, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 43830, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32', 'brand': '&#x160;koda', 'name': 'Enyaq iV', 'v': '80 kWh', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 55405, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-60-32', 'brand': '&#x160;koda', 'name': 'Enyaq iV', 'v': '60 kWh', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 132, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 48050, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-shooting-brake-phev-33', 'brand': 'Volkswagen', 'name': 'Arteon Shooting Brake', 'v': 'eHybrid OPF Elegance DSG6', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 115, 'acc': 0, 'koffer': 1632, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 60520, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-x2-diesel', 'brand': 'BMW', 'name': 'X2 (F39)', 'v': 'sDrive20d AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 140, 'acc': 0, 'koffer': 1355, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 42100, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'lexus-es-benz', 'brand': 'Lexus', 'name': 'ES', 'v': '300h Explore Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 131, 'acc': 0, 'koffer': 0, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 58440, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'hyundai-santafe-phev', 'brand': 'Hyundai', 'name': 'Santa Fe', 'v': 'T-GDi PHEV 4WD Shine Aut', 'fuel': 'Plug-in hybride', 'verbrEl': 18.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 195, 'acc': 0, 'koffer': 634, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 64099, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-elek', 'brand': 'Hyundai', 'name': 'Kona', 'v': '39,2 kWh Techno', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1114, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 38499, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-elek-1', 'brand': 'Hyundai', 'name': 'Kona', 'v': '64  kWh TechnoPack PowerPack', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1114, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 43999, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5', 'brand': 'Audi', 'name': 'Q5', 'v': '50 TFSI eQuattro S-tronic Advanced', 'fuel': 'Plug-in hybride', 'verbrEl': 20.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 34, 'power': 185, 'acc': 0, 'koffer': 1405, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 62390, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-jumper-elektrisch', 'brand': 'Citro&euml;n', 'name': 'Jumper', 'v': 'FT 435 L1H1 37 kWu Club', 'fuel': 'Elektrisch', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 88, 'acc': 0, 'koffer': 8000, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 70168, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'jac-iev75', 'brand': 'JAC', 'name': 'IEV7S', 'v': '39 kWh', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 250, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 29900, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'cupra-formentor-1', 'brand': 'Cupra', 'name': 'Formentor', 'v': 'e-Hybrid DSG', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 110, 'acc': 0, 'koffer': 0, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 44980, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'smart-fortwo', 'brand': 'Smart', 'name': 'Fortwo Coup&eacute;', 'v': 'EQ Comfort+', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 0, 'koffer': 350, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 27104, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'vw-up-benz-32', 'brand': 'Volkswagen', 'name': 'up!', 'v': 'Up! ACTIVE', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 48, 'acc': 0, 'koffer': 959, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 17260, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq5', 'brand': 'Hyundai', 'name': 'IONIQ 5', 'v': '58 kWh Core', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 125, 'acc': 0, 'koffer': 1591, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 52499, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'hyundai-ioniq5-1', 'brand': 'Hyundai', 'name': 'IONIQ 5', 'v': '73 kWh Balance Vision', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 160, 'acc': 0, 'koffer': 1591, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 64249, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-60-32-1', 'brand': '&#x160;koda', 'name': 'Enyaq iV', 'v': '60 kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 132, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 56620, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32-1', 'brand': '&#x160;koda', 'name': 'Enyaq iV', 'v': '80 kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 63575, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'hyundai-bayon', 'brand': 'Hyundai', 'name': 'BAYON', 'v': 'T-GDi Twist 7DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 74, 'acc': 0, 'koffer': 1205, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 24349, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'merc-c-benz', 'brand': 'Mercedes-Benz', 'name': 'C-Klasse', 'v': 'C180 9G-Tronic Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 125, 'acc': 0, 'koffer': 455, 'cilinder': 1496000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 47553, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mg-ehs-phev', 'brand': 'MG', 'name': 'EHS', 'v': 'PHEV Comfort', 'fuel': 'Plug-in hybride', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 43, 'power': 119, 'acc': 0, 'koffer': 1375, 'cilinder': 1490000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 35585, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'ford-smax-benz', 'brand': 'Ford', 'name': 'S-Max', 'v': 'HEV Connected AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 140, 'acc': 0, 'koffer': 2000, 'cilinder': 2522000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 41350, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-rio', 'brand': 'KIA', 'name': 'Rio', 'v': 'T Pulse 7DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 74, 'acc': 0, 'koffer': 1078, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 22590, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'peugeot-rifter-e', 'brand': 'Peugeot', 'name': 'Rifter', 'v': '50 kWh Allure', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1355, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 41410, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-e-berlingo-33', 'brand': 'Citro&euml;n', 'name': 'Berlingo ', 'v': 'M 50 kWh Feel', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1355, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 40350, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-4-coupe-benz', 'brand': 'BMW', 'name': '4-Reeks Coup&eacute; (G22)', 'v': '430i', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 180, 'acc': 0, 'koffer': 440, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 54500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-ix', 'brand': 'BMW', 'name': 'iX (I20)', 'v': 'xDrive40', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 240, 'acc': 0, 'koffer': 1750, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 82800, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'bmw-ix-1', 'brand': 'BMW', 'name': 'iX (I20)', 'v': 'xDrive50', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 385, 'acc': 0, 'koffer': 1750, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 108050, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'vw-polo-benz-32', 'brand': 'Volkswagen', 'name': 'Polo', 'v': 'TSI OPF Life DSG7', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 81, 'acc': 0, 'koffer': 1125, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 27600, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x4-benzine', 'brand': 'BMW', 'name': 'X4 (G02)', 'v': 'xDrive30i AT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 193, 'power': 180, 'acc': 0, 'koffer': 1430, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 63450, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x4-diesel', 'brand': 'BMW', 'name': 'X4 (G02)', 'v': 'xDrive30d AT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 183, 'power': 210, 'acc': 0, 'koffer': 1430, 'cilinder': 2993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 66700, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-benzine', 'brand': 'BMW', 'name': 'X3 (G01)', 'v': 'xDrive30i AT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 194, 'power': 180, 'acc': 0, 'koffer': 1600, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 60900, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-phev', 'brand': 'BMW', 'name': 'X3 (G01)', 'v': 'xDrive30e AT', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 57, 'power': 120, 'acc': 0, 'koffer': 1500, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 66650, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':143 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-diesel', 'brand': 'BMW', 'name': 'X3 (G01)', 'v': 'sDrive18d AT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 169, 'power': 100, 'acc': 0, 'koffer': 1600, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 51300, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-x3-diesel-1', 'brand': 'BMW', 'name': 'X3 (G01)', 'v': 'sDrive18d AT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 169, 'power': 110, 'acc': 0, 'koffer': 1600, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 51300, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ds-dis4', 'brand': 'DS', 'name': 'DS 4', 'v': 'PureTech Bastille+ AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 96, 'acc': 0, 'koffer': 1240, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 32800, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'seat-arona-cng-32', 'brand': 'Seat', 'name': 'Arona', 'v': 'TSI Style DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 81, 'acc': 0, 'koffer': 1280, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 26050, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'bmw-ix3-32', 'brand': 'BMW', 'name': 'iX3 (G08)', 'v': 'iX3', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 210, 'acc': 0, 'koffer': 1560, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 72450, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-9', 'brand': 'Maxus', 'name': 'eDeliver 9', 'v': '52 kWh L2H2 N1', 'fuel': 'Elektrisch', 'verbrEl': 30.2, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 9700, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 64118, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-9-1', 'brand': 'Maxus', 'name': 'eDeliver 9', 'v': '72 kWh L3H2 N1', 'fuel': 'Elektrisch', 'verbrEl': 33, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 11000, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 78033, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-9-2', 'brand': 'Maxus', 'name': 'eDeliver 9', 'v': '89 kWh L3H2 N1', 'fuel': 'Elektrisch', 'verbrEl': 35, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 11000, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 87108, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'maxus-edeliver-9-3', 'brand': 'Maxus', 'name': 'eDeliver 9', 'v': '89 kWh L3H3 N2', 'fuel': 'Elektrisch', 'verbrEl': 35, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 12500, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 90133, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mazda-2-benz', 'brand': 'Mazda', 'name': '2', 'v': 'SKYACTIV-G SkyMove', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 109, 'power': 55, 'acc': 0, 'koffer': 950, 'cilinder': 1496000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 18490, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-soul-ev-69', 'brand': 'KIA', 'name': 'Soul ', 'v': 'EV 64KWH Pulse AUT', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1339, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 29, 'price': 51290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'kia-soul-ev', 'brand': 'KIA', 'name': 'Soul ', 'v': 'EV 39,2KWH Pulse AUT', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1339, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 29, 'price': 47390, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a4-avant-diesel', 'brand': 'Audi', 'name': 'A4 Avant', 'v': '30 TDI Business Edition Attraction S-Tro', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 100, 'acc': 0, 'koffer': 1510, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 44430, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-diesel', 'brand': 'Audi', 'name': 'A6 ', 'v': '35 TDI S tronic Business Edition Sport', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 137, 'power': 120, 'acc': 0, 'koffer': 676, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 53240, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'volkswagen-golf-wit', 'brand': 'Volkswagen', 'name': 'Golf ', 'v': 'TGI Life', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 5.8, 'verbrFCEV': 0, 'co2': 104, 'power': 96, 'acc': 0, 'koffer': 1237, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 34875, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '77 kWh Pro Performance', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1575, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 53830, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4-1', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '77 kWh GTX', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 70, 'acc': 0, 'koffer': 1575, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 62220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-touran-32', 'brand': 'Volkswagen', 'name': 'Touran', 'v': 'TSI ACT OPF Highline DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 110, 'acc': 0, 'koffer': 1980, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 40790, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-1', 'brand': 'Audi', 'name': 'Q4 e-tron', 'v': '40 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1490, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 58170, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-sportback-1', 'brand': 'Audi', 'name': 'Q4 Sportback e-tron', 'v': '40 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1460, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 60220, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-sportback-2', 'brand': 'Audi', 'name': 'Q4 Sportback e-tron', 'v': '50 e-tron 77 kWh S-Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 162, 'acc': 0, 'koffer': 1460, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 66830, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'ford-galaxy', 'brand': 'Ford', 'name': 'Galaxy', 'v': 'HEV Titanium AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 148, 'power': 140, 'acc': 0, 'koffer': 2339, 'cilinder': 2522000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 49920, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'audi-q3-sportback-phev-32', 'brand': 'Audi', 'name': 'Q3 Sportback', 'v': '35 TFSI Business Edition S-Line S-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 110, 'acc': 0, 'koffer': 0, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 45090, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32-2', 'brand': '&#x160;koda', 'name': 'Enyaq iV', 'v': '80x kWh', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 58250, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-enyak-80-32-3', 'brand': '&#x160;koda', 'name': 'Enyaq iV', 'v': '80x kWh Sportline', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 66420, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'peugeot-e-208-32', 'brand': 'Peugeot', 'name': '208', 'v': 'e-208 Active', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 311, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 37665, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'peugeot-208-benz', 'brand': 'Peugeot', 'name': '208', 'v': 'PureTech S&S GT EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 124, 'power': 74, 'acc': 0, 'koffer': 311, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 29165, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-diesel', 'brand': 'Mercedes-Benz', 'name': 'GLE', 'v': '300 d 4MATIC 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 160, 'power': 200, 'acc': 0, 'koffer': 0, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 74415, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-diesel-1', 'brand': 'Mercedes-Benz', 'name': 'GLE', 'v': '350 de 4MATIC 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 19, 'power': 143, 'acc': 0, 'koffer': 0, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 88209, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-phev', 'brand': 'Mercedes-Benz', 'name': 'GLE', 'v': '350 e 4MATIC 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 23.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 21, 'power': 155, 'acc': 0, 'koffer': 0, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 85063, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gle-benz', 'brand': 'Mercedes-Benz', 'name': 'GLE', 'v': '450 4MATIC 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 209, 'power': 270, 'acc': 0, 'koffer': 0, 'cilinder': 2999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 79860, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'bmw-2-coupe-benzine', 'brand': 'BMW', 'name': '2-Reeks Coup&eacute; (G42)', 'v': '220i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 135, 'acc': 0, 'koffer': 390, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 43750, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'audi-a1-sportback-benz-kopie', 'brand': 'Audi', 'name': 'A1 Sportback ', 'v': '30 TFSI Advanced', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 81, 'acc': 0, 'koffer': 1090, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 24730, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volkswagen-arteon-phev', 'brand': 'Volkswagen', 'name': 'Arteon', 'v': 'eHybrid OPF Elegance Business DSG6', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 115, 'acc': 0, 'koffer': 1557, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 63455, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'toyota-yaris-cross-benz', 'brand': 'Toyota', 'name': 'Yaris Cross', 'v': 'Hybrid Dynamic CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 68, 'acc': 0, 'koffer': 390, 'cilinder': 1490000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 30990, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508-benz', 'brand': 'Peugeot', 'name': '508', 'v': 'PureTech S&S Allure Pack EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 96, 'acc': 0, 'koffer': 1537, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 44665, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508-sw-phev-32', 'brand': 'Peugeot', 'name': '508 SW', 'v': 'Hybrid Allure Pack e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 30, 'power': 132, 'acc': 0, 'koffer': 1780, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 57715, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'peugeot-508-sw-benz', 'brand': 'Peugeot', 'name': '508 SW', 'v': 'PureTech S&S Allure Pack EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 96, 'acc': 0, 'koffer': 1780, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 46465, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mer-c-diesel', 'brand': 'Mercedes-Benz', 'name': 'C-Klasse', 'v': 'C200d 9G-Tronic Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 120, 'acc': 0, 'koffer': 455, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 49005, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev-33', 'brand': 'Mercedes-Benz', 'name': 'C-Klasse Break', 'v': 'C200d 9G-Tronic Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 120, 'acc': 0, 'koffer': 1510, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 50457, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'mercedes-c-break-phev-32', 'brand': 'Mercedes-Benz', 'name': 'C-Klasse Break', 'v': 'C180 9G-Tronic Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 125, 'acc': 0, 'koffer': 1510, 'cilinder': 1496000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 49005, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-benzine', 'brand': 'KIA', 'name': 'Ceed', 'v': 'T-GDi ISG Pulse DCT7', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 118, 'acc': 0, 'koffer': 1291, 'cilinder': 1482000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 28890, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-diesel', 'brand': 'KIA', 'name': 'Ceed', 'v': 'CRDi MHEV ISG Pulse DCT7', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 121, 'power': 100, 'acc': 0, 'koffer': 1253, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 30190, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-sw-benz', 'brand': 'KIA', 'name': 'Ceed SW', 'v': 'T-GDi ISG Pulse DCT7', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 118, 'acc': 0, 'koffer': 1694, 'cilinder': 1482000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 30390, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-sw-diesel', 'brand': 'KIA', 'name': 'Ceed SW', 'v': 'CRDi MHEV ISG GT Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 100, 'acc': 0, 'koffer': 1581, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 33490, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-ceed-sporswagon-phev-32', 'brand': 'KIA', 'name': 'Ceed SW', 'v': 'GDi PHEV Business Line DCT', 'fuel': 'Plug-in hybride', 'verbrEl': 9.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 77, 'acc': 0, 'koffer': 1506, 'cilinder': 1580000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 38290, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'kia-proceed-benz', 'brand': 'KIA', 'name': 'ProCeed', 'v': 'T-GDi ISG GT DCT7', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 163, 'power': 150, 'acc': 0, 'koffer': 1545, 'cilinder': 1591000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 39490, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-cls-benz', 'brand': 'Mercedes-Benz', 'name': 'CLS', 'v': '350 AMG Line 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 176, 'power': 220, 'acc': 0, 'koffer': 520, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 82280, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-eqs', 'brand': 'Mercedes-Benz', 'name': 'EQS', 'v': '450+ Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 245, 'acc': 0, 'koffer': 1770, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 121363, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-eqs-1', 'brand': 'Mercedes-Benz', 'name': 'EQS', 'v': '580 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 385, 'acc': 0, 'koffer': 1770, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 172788, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-golf-diesel', 'brand': 'Volkswagen', 'name': 'Golf ', 'v': 'TDI SCR Life Business', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 85, 'acc': 0, 'koffer': 1237, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 35510, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'volkswagen-golf-phev', 'brand': 'Volkswagen', 'name': 'Golf ', 'v': 'eHybrid OPF Style Business DSG', 'fuel': 'Plug-in hybride', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 21, 'power': 110, 'acc': 0, 'koffer': 1237, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 47210, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'peugeot-boxer-diesel-1', 'brand': 'Peugeot', 'name': 'Boxer', 'v': 'FT 435 L1H1 37 kWu Premium', 'fuel': 'Elektrisch', 'verbrEl': 35, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 88, 'acc': 0, 'koffer': 8000, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 70168, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'peugeot-boxer-diesel-2', 'brand': 'Peugeot', 'name': 'Boxer', 'v': 'FT 435 L4H2 70 kWu Premium', 'fuel': 'Elektrisch', 'verbrEl': 35, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 88, 'acc': 0, 'koffer': 15000, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 81530, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'ds9-e-tense-32', 'brand': 'DS', 'name': 'DS 9', 'v': 'E-TENSE PHEV Rivoli +', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 147, 'acc': 0, 'koffer': 510, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 66050, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'opel-astra-benz', 'brand': 'Opel', 'name': 'Astra', 'v': 'Turbo Start/Stop Business Edition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 81, 'acc': 0, 'koffer': 1182, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 28600, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ford-focus', 'brand': 'Ford', 'name': 'Focus', 'v': 'EcoBoost mHEV Titanium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 92, 'acc': 0, 'koffer': 0, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 32980, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ford-focus-clipper', 'brand': 'Ford', 'name': 'Focus Clipper', 'v': 'EcoBoost mHEV Titanium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 92, 'acc': 0, 'koffer': 0, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 33980, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-e-berlingo-34', 'brand': 'Citro&euml;n', 'name': 'Berlingo Van', 'v': 'M Heavy 50 kWh Club', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3800, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 37643, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a4', 'brand': 'Audi', 'name': 'A4', 'v': '35 TFSI Business Edition Attraction S-Tr', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 137, 'power': 110, 'acc': 0, 'koffer': 965, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 37770, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'vw-taigo', 'brand': 'Volkswagen', 'name': 'Taigo', 'v': 'TSI OPF Style DSG7', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 134, 'power': 81, 'acc': 0, 'koffer': 1222, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 31335, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mg-marvel-r', 'brand': 'MG', 'name': 'MARVEL R', 'v': '70 kWh Luxury', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 38, 'acc': 0, 'koffer': 1546, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 47485, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mg-marvel-r-1', 'brand': 'MG', 'name': 'MARVEL R', 'v': '70 kWh AWD Performance', 'fuel': 'Elektrisch', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 38, 'acc': 0, 'koffer': 1396, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 51485, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-2', 'brand': 'Audi', 'name': 'Q4 e-tron', 'v': '45 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 1490, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 60230, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-3', 'brand': 'Audi', 'name': 'Q4 e-tron', 'v': '45 e-tron 77 kWh S-Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 1490, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 61320, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mg-zs-ev-33', 'brand': 'MG', 'name': 'ZS EV', 'v': '51 kWh Comfort', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 130, 'acc': 0, 'koffer': 1166, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 33585, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'skoda-fabia-32', 'brand': '&#x160;koda', 'name': 'Fabia ', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 81, 'acc': 0, 'koffer': 1190, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 22675, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'toyota-rav4-phev', 'brand': 'Toyota', 'name': 'RAV4 ', 'v': 'Plug-in Hybrid Dynamic Plus e-CVT AWD-i', 'fuel': 'Plug-in hybride', 'verbrEl': 19.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 136, 'acc': 0, 'koffer': 580, 'cilinder': 2487000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 60150, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-eqb', 'brand': 'Mercedes-Benz', 'name': 'EQB', 'v': '300 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 66187, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-eqb-1', 'brand': 'Mercedes-Benz', 'name': 'EQB', 'v': '350 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 69091, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'volkswagen-multivan-phev-1', 'brand': 'Volkswagen', 'name': 'Multivan ', 'v': 'TSI PHEV DSG6 LWB', 'fuel': 'Plug-in hybride', 'verbrEl': 16.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 110, 'acc': 0, 'koffer': 3500, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 56500, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'volkswagen-multivan-phev', 'brand': 'Volkswagen', 'name': 'Multivan ', 'v': 'TSI DSG7 LWB', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 183, 'power': 150, 'acc': 0, 'koffer': 3500, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 51950, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'renault-kadjar-benz', 'brand': 'Renault', 'name': 'Kadjar', 'v': 'TCe Techno', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 141, 'power': 103, 'acc': 0, 'koffer': 1478, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 31350, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'opel-corsa-e-32', 'brand': 'Opel', 'name': 'Corsa ', 'v': 'Corsa-e Edition', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1118, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 33950, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-electric', 'brand': 'Volvo', 'name': 'XC40', 'v': 'Recharge Core', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 50750, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id5', 'brand': 'Volkswagen', 'name': 'ID.5', 'v': '77 kWh Pro', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 128, 'acc': 0, 'koffer': 1561, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 55375, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id5-3', 'brand': 'Volkswagen', 'name': 'ID.5', 'v': '77 kWh Pro Performance', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1561, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 57130, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id5-2', 'brand': 'Volkswagen', 'name': 'ID.5', 'v': '77 kWh GTX', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 220, 'acc': 0, 'koffer': 1561, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 64330, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q4-e-tron-sportback-3', 'brand': 'Audi', 'name': 'Q4 Sportback e-tron', 'v': '45 e-tron 77 kWh Advanced', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 1460, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 62370, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-e', 'brand': 'Renault', 'name': 'M&eacute;gane E-Tech', 'v': 'EV40 Standard Charge Equilibre', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 96, 'acc': 0, 'koffer': 1332, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 37350, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'renault-scenic-benz', 'brand': 'Renault', 'name': 'Sc&eacute;nic', 'v': 'TCe Techno EDC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 103, 'acc': 0, 'koffer': 1554, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 32475, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'renault-espace-diesel', 'brand': 'Renault', 'name': 'Espace', 'v': 'Blue dCi Equilibre EDC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 162, 'power': 137, 'acc': 0, 'koffer': 2101, 'cilinder': 1997000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 52225, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4-2', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '77 kWh Pro', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 128, 'acc': 0, 'koffer': 1575, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 52080, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-gls-benz', 'brand': 'Mercedes-Benz', 'name': 'GLS', 'v': '580 4MATIC 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 11.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 266, 'power': 360, 'acc': 0, 'koffer': 2400, 'cilinder': 3982000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 48, 'price': 116644, 'pk': 20, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-c40-e', 'brand': 'Volvo', 'name': 'C40', 'v': 'Recharge Plus', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 55800, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-coupe-diesel', 'brand': 'Mercedes-Benz', 'name': 'CLA Coup&eacute;', 'v': '180 d 8G-DCT Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 85, 'acc': 0, 'koffer': 450, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 43318, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-coupe-benz', 'brand': 'Mercedes-Benz', 'name': 'CLA Coup&eacute;', 'v': '180 7G-DCT Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 136, 'power': 100, 'acc': 0, 'koffer': 460, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 41987, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-cla-coupe-phev', 'brand': 'Mercedes-Benz', 'name': 'CLA Coup&eacute;', 'v': '250 e 7G-DCT Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 22, 'power': 118, 'acc': 0, 'koffer': 395, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 50820, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa', 'brand': 'Mercedes-Benz', 'name': 'EQA', 'v': '250 Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 1320, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 59653, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa-1', 'brand': 'Mercedes-Benz', 'name': 'EQA', 'v': '300 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 1320, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 63767, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa-2', 'brand': 'Mercedes-Benz', 'name': 'EQA', 'v': '350 Luxury Line 4MATIC', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 1320, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 66671, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'vw-t-roc-32', 'brand': 'Volkswagen', 'name': 'T-Roc', 'v': 'TSI OPF Life Business DSG7', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 138, 'power': 110, 'acc': 0, 'koffer': 1290, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 34360, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-sprinter-diesel', 'brand': 'Mercedes-Benz', 'name': 'Sprinter ', 'v': '315 CDI L1 RWD', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 229, 'power': 110, 'acc': 0, 'koffer': 4012, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 44, 'price': 45707, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'merc-sprinter-elek', 'brand': 'Mercedes-Benz', 'name': 'Sprinter ', 'v': '35 kWh L2 FWD', 'fuel': 'Elektrisch', 'verbrEl': 39, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 5539, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 66713, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'merc-sprinter-elek-1', 'brand': 'Mercedes-Benz', 'name': 'Sprinter ', 'v': '47 kWh L2 FWD', 'fuel': 'Elektrisch', 'verbrEl': 39, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 85, 'acc': 0, 'koffer': 5539, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 76251, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-recharge', 'brand': 'Volvo', 'name': 'XC60', 'v': 'T6 PHEV benzine Plus Bright AWD Geartron', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 23, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 72250, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60', 'brand': 'Volvo', 'name': 'XC60', 'v': 'B4 Mild hybrid benzine Plus Dark Geartro', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 60050, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60-plugin', 'brand': 'Volvo', 'name': 'V60', 'v': 'T6 PHEV benzine Core Bright AWD Geartron', 'fuel': 'Plug-in hybride', 'verbrEl': 17.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 17, 'power': 186, 'acc': 0, 'koffer': 1431, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 62130, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-v60', 'brand': 'Volvo', 'name': 'V60', 'v': 'B3 Mild hybrid benzine Core 7-DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 46650, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90', 'brand': 'Volvo', 'name': 'XC90', 'v': 'B5 Mild Hybrid Plus Bright AWD Geartroni', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 197, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 80390, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-gla-diesel', 'brand': 'Mercedes-Benz', 'name': 'GLA', 'v': '180d 8G-DCT Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 152, 'power': 85, 'acc': 0, 'koffer': 1420, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 45859, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-gla-benz', 'brand': 'Mercedes-Benz', 'name': 'GLA', 'v': '180 7G-DCT Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 100, 'acc': 0, 'koffer': 1430, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 44649, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-gla-phev', 'brand': 'Mercedes-Benz', 'name': 'GLA', 'v': '250e 8G-DCT Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 118, 'acc': 0, 'koffer': 1385, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 54571, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-glb-diesel', 'brand': 'Mercedes-Benz', 'name': 'GLB', 'v': '180d 8G-DCT Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 159, 'power': 85, 'acc': 0, 'koffer': 1805, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 47432, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-glb-benz', 'brand': 'Mercedes-Benz', 'name': 'GLB', 'v': '180 7G-DCT Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 100, 'acc': 0, 'koffer': 1805, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 46222, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'skoda-superb-32', 'brand': '&#x160;koda', 'name': 'Superb', 'v': 'TSI ACT Ambition DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 140, 'power': 110, 'acc': 0, 'koffer': 1760, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 42205, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-karoq-benz', 'brand': '&#x160;koda', 'name': 'Karoq', 'v': 'TSI Ambition', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 81, 'acc': 0, 'koffer': 1630, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 33010, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'skoda-karoq-benz-1', 'brand': '&#x160;koda', 'name': 'Karoq', 'v': 'CRTDI Ambition', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 124, 'power': 85, 'acc': 0, 'koffer': 1630, 'cilinder': 1968000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 37305, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-2phev-33', 'brand': 'BMW', 'name': '2-Reeks Active Tourer (U06)', 'v': '218i DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 100, 'acc': 0, 'koffer': 1455, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 35450, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'bmw-2phev-34', 'brand': 'BMW', 'name': '2-Reeks Active Tourer (U06)', 'v': '230e xDrive DCT', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 110, 'acc': 0, 'koffer': 1405, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 48900, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-i4-elek', 'brand': 'BMW', 'name': 'i4 (G26)', 'v': 'eDrive40', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 250, 'acc': 0, 'koffer': 1290, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 63900, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'renault-clio-benz-32', 'brand': 'Renault', 'name': 'Clio ', 'v': 'TCe Equilibre', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 67, 'acc': 0, 'koffer': 391, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 19100, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-s90', 'brand': 'Volvo', 'name': 'S90', 'v': 'T8 Plug-in Hybrid Ultimate Dark AWD Gear', 'fuel': 'Plug-in hybride', 'verbrEl': 25.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 228, 'acc': 0, 'koffer': 461, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 76990, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'volvo-s60', 'brand': 'Volvo', 'name': 'S60', 'v': 'T8 Plug-in hybrid benzine Plus Bright AW', 'fuel': 'Plug-in hybride', 'verbrEl': 20.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 16, 'power': 228, 'acc': 0, 'koffer': 442, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 63200, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'mercedes-eqc-400-32', 'brand': 'Mercedes-Benz', 'name': 'EQC', 'v': '400 4MATIC Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 22, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 0, 'koffer': 1460, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 77440, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ssangyong-korando-benz-1', 'brand': 'SsangYong', 'name': 'Korando', 'v': '62 kWh Platinum 2WD', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 1248, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 44990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'volvo-v90', 'brand': 'Volvo', 'name': 'V90', 'v': 'T6 PHEV AWD AUT Plus Dark', 'fuel': 'Plug-in hybride', 'verbrEl': 17.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 186, 'acc': 0, 'koffer': 1517, 'cilinder': 1969000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 76250, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mg-5-sedan', 'brand': 'MG', 'name': '5', 'v': 'Standard Range 51 kWh Luxury', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 130, 'acc': 0, 'koffer': 1367, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 36085, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'mg-5', 'brand': 'MG', 'name': '5', 'v': 'Long Range 72 kWh Luxury', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 115, 'acc': 0, 'koffer': 1367, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 39085, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'renault-twingo-32', 'brand': 'Renault', 'name': 'Twingo ', 'v': 'SCe Urban Night', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 48, 'acc': 0, 'koffer': 980, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 17200, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'renault-twingo-33', 'brand': 'Renault', 'name': 'Twingo ', 'v': 'EV22 Techno', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 59, 'acc': 0, 'koffer': 980, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 25050, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-32', 'brand': 'Renault', 'name': 'M&eacute;gane Hatchback', 'v': 'TCe Techno', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 103, 'acc': 0, 'koffer': 1258, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 29125, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-33', 'brand': 'Renault', 'name': 'M&eacute;gane Hatchback', 'v': 'E-TECH Plug-in Hybrid Techno Aut', 'fuel': 'Plug-in hybride', 'verbrEl': 14.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 28, 'power': 68, 'acc': 0, 'koffer': 1258, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 42875, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'renault-megane-diesel', 'brand': 'Renault', 'name': 'M&eacute;gane Hatchback', 'v': 'Blue dCi Techno EDC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 85, 'acc': 0, 'koffer': 1288, 'cilinder': 1461000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 32975, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'landrover-rangerover-phev', 'brand': 'Land', 'name': 'Rover Range Rover', 'v': 'P440e AWD AUTO SWB SE', 'fuel': 'Plug-in hybride', 'verbrEl': 28.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 18, 'power': 324, 'acc': 0, 'koffer': 1841, 'cilinder': 2996000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 140589, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'merc-eqb-2', 'brand': 'Mercedes-Benz', 'name': 'EQB', 'v': '250 Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 1710, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 62073, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-e-berline-phev-32', 'brand': 'Mercedes-Benz', 'name': 'E-Klasse', 'v': '200 Luxury Line 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 188, 'power': 145, 'acc': 0, 'koffer': 540, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 58080, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-e-phev', 'brand': 'Mercedes-Benz', 'name': 'E-Klasse', 'v': '300 e Luxury Line 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 155, 'acc': 0, 'koffer': 370, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 68970, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-e-break-phev-33', 'brand': 'Mercedes-Benz', 'name': 'E-Klasse Break', 'v': '200 Luxury Line 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 194, 'power': 145, 'acc': 0, 'koffer': 1820, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 60500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'merc-e-break-phev-32', 'brand': 'Mercedes-Benz', 'name': 'E-Klasse Break', 'v': '300 e Luxury Line 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 42, 'power': 155, 'acc': 0, 'koffer': 1660, 'cilinder': 1991000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 71390, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'alfa-romeo-stelvio', 'brand': 'Alfa', 'name': 'Romeo Stelvio', 'v': 'TB AWD AUT Sprint', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 204, 'power': 147, 'acc': 0, 'koffer': 1600, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 58200, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-benzine', 'brand': 'BMW', 'name': '3-Reeks (G20)', 'v': '320i xDrive AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 135, 'acc': 0, 'koffer': 480, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 48350, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-phev', 'brand': 'BMW', 'name': '3-Reeks (G20)', 'v': '320e AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 40, 'power': 120, 'acc': 0, 'koffer': 480, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 53600, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-diesel', 'brand': 'BMW', 'name': '3-Reeks (G20)', 'v': '318d AUT 48v', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 100, 'acc': 0, 'koffer': 480, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 44800, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-touring-phev-33', 'brand': 'BMW', 'name': '3-Reeks Touring (G21)', 'v': '320i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 169, 'power': 135, 'acc': 0, 'koffer': 1510, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 47350, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-touring-phev-32', 'brand': 'BMW', 'name': '3-Reeks Touring (G21)', 'v': '320e AUT', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 43, 'power': 120, 'acc': 0, 'koffer': 1510, 'cilinder': 1998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 55250, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-3-32', 'brand': 'BMW', 'name': '3-Reeks Touring (G21)', 'v': '318d AUT 48v', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 100, 'acc': 0, 'koffer': 1510, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 46500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro', 'brand': 'KIA', 'name': 'Niro ', 'v': 'GDi HEV 6DCT Pulse', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 104, 'acc': 0, 'koffer': 1445, 'cilinder': 1580000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 34490, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-phev', 'brand': 'KIA', 'name': 'Niro ', 'v': 'GDi PHEV 6DCT Pulse', 'fuel': 'Plug-in hybride', 'verbrEl': 10.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 23, 'power': 104, 'acc': 0, 'koffer': 1342, 'cilinder': 1580000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 42390, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-niro-ev', 'brand': 'KIA', 'name': 'Niro ', 'v': '64,8 kWh Pulse', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 1392, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 49990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'opel-corsa-e-33', 'brand': 'Opel', 'name': 'Corsa ', 'v': 'Turbo Start/Stop Edition AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 74, 'acc': 0, 'koffer': 1118, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 24300, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'audi-a4-avant-benzine', 'brand': 'Audi', 'name': 'A4 Avant', 'v': '35 TFSI Business Edition Competition S-T', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 159, 'power': 110, 'acc': 0, 'koffer': 1510, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 43220, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mazda-mx30-ev-32', 'brand': 'Mazda', 'name': 'MX-30', 'v': 'E-SKYACTIV AUT Exclusive-Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 107, 'acc': 0, 'koffer': 1155, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 36590, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'ford-transit-elek', 'brand': 'Ford', 'name': 'Transit', 'v': '350E L4 Electric 67kWh Trend AUT RWD', 'fuel': 'Elektrisch', 'verbrEl': 18.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 198, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 69000, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'ford-transit-elek-1', 'brand': 'Ford', 'name': 'Transit', 'v': '350E L4 Electric 67kWh Trend AUT RWD', 'fuel': 'Elektrisch', 'verbrEl': 18.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 135, 'acc': 0, 'koffer': 0, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 66429, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'toyota-bz4x-e', 'brand': 'Toyota', 'name': 'bZ4X', 'v': '71,4 kWh 2WD Dynamic Business', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 452, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 63680, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'bmw-x1-diesel', 'brand': 'BMW', 'name': 'X1 (U11)', 'v': 'sDrive18d AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 100, 'acc': 0, 'koffer': 0, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 40500, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'merc-eqa-3', 'brand': 'Mercedes-Benz', 'name': 'EQA', 'v': '250+ Luxury Line', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 140, 'acc': 0, 'koffer': 1320, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 61710, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'fiat-tipo-benzine', 'brand': 'Fiat', 'name': 'Tipo', 'v': 'FireFly Garmin', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 74, 'acc': 0, 'koffer': 440, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 24690, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-captur-phev', 'brand': 'Renault', 'name': 'Captur II', 'v': 'E-Tech plug-in hybrid Techno EDC', 'fuel': 'Plug-in hybride', 'verbrEl': 11, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 68, 'acc': 0, 'koffer': 1259, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 36250, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'kia-ev6', 'brand': 'KIA', 'name': 'EV6', 'v': '77,4kWh RWD GT-Line', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 168, 'acc': 0, 'koffer': 1300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 64090, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'renault-kangoo-e-1', 'brand': 'Renault', 'name': 'Kangoo Van New', 'v': 'EV45 22kW Advance', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 90, 'acc': 0, 'koffer': 3300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 37540, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'vw-caddy-cng-33', 'brand': 'Volkswagen', 'name': 'Caddy ', 'v': 'TGI Maxi Style', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 6.9, 'verbrFCEV': 0, 'co2': 124, 'power': 96, 'acc': 0, 'koffer': 0, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 36350, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-benz', 'brand': 'Peugeot', 'name': '308', 'v': 'PureTech S&S Allure EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 96, 'acc': 0, 'koffer': 1323, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 33300, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-benz-1', 'brand': 'Peugeot', 'name': '308', 'v': 'Hybrid S&S Allure e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 110, 'acc': 0, 'koffer': 361, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 41650, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-sw-benz', 'brand': 'Peugeot', 'name': '308 SW', 'v': 'PureTech S&S Allure EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 96, 'acc': 0, 'koffer': 1634, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 34300, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'peugeot-308-sw-benz-1', 'brand': 'Peugeot', 'name': '308 SW', 'v': 'Hybrid S&S Allure e-EAT8', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 110, 'acc': 0, 'koffer': 1574, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 42650, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40-recharge', 'brand': 'Volvo', 'name': 'XC40', 'v': 'PHEV T4 DCT Plus Dark Design', 'fuel': 'Plug-in hybride', 'verbrEl': 15.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 47, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 53850, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'volvo-xc40', 'brand': 'Volvo', 'name': 'XC40', 'v': 'T2 Core AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 95, 'acc': 0, 'koffer': 1281, 'cilinder': 1477000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 40700, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'vw-id-buzz-cargo', 'brand': 'Volkswagen', 'name': 'ID.Buzz Cargo', 'v': '150 kW (77kWh) RWD', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 3900, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 55418, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'dacia-duster-32', 'brand': 'Dacia', 'name': 'Duster ', 'v': 'TCe Journey EDC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 141, 'power': 110, 'acc': 0, 'koffer': 1478, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 23690, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'dacia-spring', 'brand': 'Dacia', 'name': 'Spring', 'v': 'Expression', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 32, 'acc': 0, 'koffer': 620, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 21790, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'dacia-sandero-32', 'brand': 'Dacia', 'name': 'Sandero', 'v': 'TCe Expression CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 67, 'acc': 0, 'koffer': 1108, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 15990, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'fiat-scudo', 'brand': 'Fiat', 'name': 'Doblo Cargo New', 'v': '50 kWh L1 Heavy', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3800, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 39688, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-s-phev', 'brand': 'Mercedes-Benz', 'name': 'S-Klasse ', 'v': '450e 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 20.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 20, 'power': 220, 'acc': 0, 'koffer': 550, 'cilinder': 2999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 123783, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'F', 'id': 'merc-s-benz', 'brand': 'Mercedes-Benz', 'name': 'S-Klasse ', 'v': '450 9G-TRONIC 4MATIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 9.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 215, 'power': 270, 'acc': 0, 'koffer': 550, 'cilinder': 2999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 121968, 'pk': 15, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'peugeot-partner-e', 'brand': 'Peugeot', 'name': 'Partner ', 'v': 'Standard L1 Heavy 50 kWh Aut', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3800, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 38297, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-e-berlingo-35', 'brand': 'Citro&euml;n', 'name': 'Berlingo Van', 'v': 'M Heavy 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3800, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 38297, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-arkana-benz', 'brand': 'Renault', 'name': 'Arkana', 'v': 'mild hybrid Evolution EDC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 103, 'acc': 0, 'koffer': 1296, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 31750, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'toyota-aygo-32', 'brand': 'Toyota', 'name': 'Aygo X', 'v': 'VVT-i Play CVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 107, 'power': 53, 'acc': 0, 'koffer': 1360, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 18750, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'ford-tourneo-custom-phev-32', 'brand': 'Ford', 'name': 'Tourneo Connect', 'v': 'Ecoboost Active AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 160, 'power': 84, 'acc': 0, 'koffer': 2556, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 31700, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'opel-combo-cargo', 'brand': 'Opel', 'name': 'Combo Cargo', 'v': '50 kWH L1H1 Light', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 3800, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 38297, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-id4-3', 'brand': 'Volkswagen', 'name': 'ID.4', 'v': '77 kWh Pro 4Motion', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 195, 'acc': 0, 'koffer': 1575, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 56635, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'merc-glc-diesel', 'brand': 'Mercedes-Benz', 'name': 'GLC', 'v': '220 d 4MATIC Luxury Line 9G-TRONIC', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 133, 'power': 145, 'acc': 0, 'koffer': 1640, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 61831, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'merc-glc-benz', 'brand': 'Mercedes-Benz', 'name': 'GLC', 'v': '200 4MATIC Luxury Line 9G-TRONIC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 167, 'power': 150, 'acc': 0, 'koffer': 1640, 'cilinder': 1999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 60621, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'peugeot-expert-e', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Standard L2 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 47977, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'peugeot-expert-e-1', 'brand': 'Peugeot', 'name': 'Expert', 'v': 'Standard L2 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 54027, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'merc-eqe', 'brand': 'Mercedes-Benz', 'name': 'EQE', 'v': '350+ Long Range', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 215, 'acc': 0, 'koffer': 430, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 78650, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'renault-zoe-1-32', 'brand': 'Renault', 'name': 'ZOE', 'v': 'EV50 Iconic', 'fuel': 'Elektrisch', 'verbrEl': 18, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1225, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 38125, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'ds-ds7-crossback-e-tense-phev-32', 'brand': 'DS', 'name': 'DS 7', 'v': 'E-TENSE AUT Performance Line', 'fuel': 'Plug-in hybride', 'verbrEl': 16.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 132, 'acc': 0, 'koffer': 1752, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 52800, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'renault-captur-benz-32', 'brand': 'Renault', 'name': 'Captur II', 'v': 'mild hybrid TCe Techno EDC', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 103, 'acc': 0, 'koffer': 1334, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 28350, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'opel-vivaro-e', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'L2H1 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 24, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 47977, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'opel-vivaro-e-1', 'brand': 'Opel', 'name': 'Vivaro ', 'v': 'L2H1 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 54027, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'opel-combo-life', 'brand': 'Opel', 'name': 'Combo Life', 'v': 'L1H1 50 kWh Elegance', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1414, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 41460, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'honda-civic-benz', 'brand': 'Honda', 'name': 'Civic New', 'v': 'HYBRID Sport eCVT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 113, 'power': 105, 'acc': 0, 'koffer': 1220, 'cilinder': 1993000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 32890, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'vw-t-cros', 'brand': 'Volkswagen', 'name': 'T-Cross', 'v': 'TSI OPF Style DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 81, 'acc': 0, 'koffer': 1281, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 30615, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'citroen-c4', 'brand': 'Citro&euml;n', 'name': 'C4', 'v': 'PureTech S&S Shine Pack EAT8', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 96, 'acc': 0, 'koffer': 537, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 34200, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'vw-golf-benzine', 'brand': 'Volkswagen', 'name': 'Golf ', 'v': 'TSI OPF Life Business Premium', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 81, 'acc': 0, 'koffer': 1237, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 32380, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': '0', 'id': 'subaru-forester', 'brand': 'Subaru', 'name': 'Forester', 'v': 'e-BOXER Luxury AWD Lineartronic', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 185, 'power': 110, 'acc': 0, 'koffer': 1779, 'cilinder': 1995000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 39995, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-jumpy', 'brand': 'Citro&euml;n', 'name': 'Jumpy', 'v': 'M BlueHDi S&S', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 168, 'power': 74, 'acc': 0, 'koffer': 5300, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 34788, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-jumpy-elektrisch-2', 'brand': 'Citro&euml;n', 'name': 'Jumpy', 'v': 'M 50 kWh', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 47977, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'citroen-jumpy-elektrisch-3', 'brand': 'Citro&euml;n', 'name': 'Jumpy', 'v': 'M 75 kWh', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 0, 'price': 54027, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': '0', 'id': 'subaru-outback', 'brand': 'Subaru', 'name': 'Outback', 'v': 'Comfort', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 193, 'power': 124, 'acc': 0, 'koffer': 1822, 'cilinder': 2498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 39995, 'pk': 13, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-benzine', 'brand': 'Volkswagen', 'name': 'Tiguan', 'v': 'TSI OPF Life Business DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 110, 'acc': 0, 'koffer': 1655, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 45270, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-phev', 'brand': 'Volkswagen', 'name': 'Tiguan', 'v': 'eHybrid OPF Life Business DSG', 'fuel': 'Plug-in hybride', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 110, 'acc': 0, 'koffer': 1655, 'cilinder': 1395000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 49805, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'B', 'id': 'mg-zs-ev-32', 'brand': 'MG', 'name': 'ZS', 'v': 'T-GDi Luxury', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 149, 'power': 82, 'acc': 0, 'koffer': 1375, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 21985, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-passat-gte-variant-32', 'brand': 'Volkswagen', 'name': 'Passat Variant', 'v': 'TSI ACT OPF DSG7 Elegance', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 146, 'power': 110, 'acc': 0, 'koffer': 1780, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 46590, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'vw-arteon-benzine', 'brand': 'Volkswagen', 'name': 'Arteon', 'v': 'TSI OPF Elegance Business', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 110, 'acc': 0, 'koffer': 1557, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 51755, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'citroen-ami', 'brand': 'Citro&euml;n', 'name': 'Ami', 'v': 'Ami Cargo', 'fuel': 'Elektrisch', 'verbrEl': 10.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 6, 'acc': 0, 'koffer': 260, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 8190, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-mustang-mach-e', 'brand': 'Ford', 'name': 'Mustang Mach-E', 'v': '76 kWh Premium AWD', 'fuel': 'Elektrisch', 'verbrEl': 20, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 198, 'acc': 0, 'koffer': 502, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 68750, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'ford-mustang-mach-e-1', 'brand': 'Ford', 'name': 'Mustang Mach-E', 'v': '99 kWh Premium AWD', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 258, 'acc': 0, 'koffer': 502, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 74800, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ford-focus-1', 'brand': 'Ford', 'name': 'Focus', 'v': 'EcoBlue Titanium AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 85, 'acc': 0, 'koffer': 0, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 35690, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'ford-focus-clipper-1', 'brand': 'Ford', 'name': 'Focus Clipper', 'v': 'EcoBlue Titanium AUT', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 133, 'power': 85, 'acc': 0, 'koffer': 0, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 36690, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'ssangyong-rexton-diesel', 'brand': 'SsangYong', 'name': 'Rexton', 'v': 'E-XDI 4WD AUT Sapphire', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 214, 'power': 149, 'acc': 0, 'koffer': 1977, 'cilinder': 2157000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 50, 'price': 52990, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-EF', 'id': 'ssangyong-rexton-diesel-1', 'brand': 'SsangYong', 'name': 'Rexton', 'v': 'E-XDI 4WD AUT Sapphire 7PL', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 8.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 214, 'power': 149, 'acc': 0, 'koffer': 1806, 'cilinder': 2157000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 50, 'price': 65106, 'pk': 12, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'merc-glc-phev', 'brand': 'Mercedes-Benz', 'name': 'GLC', 'v': '300e 4MATIC Luxury Line 9G-TRONIC', 'fuel': 'Plug-in hybride', 'verbrEl': 21, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 15, 'power': 150, 'acc': 0, 'koffer': 400, 'cilinder': 1999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 75504, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-berlina-42-32', 'brand': 'Fiat', 'name': '500', 'v': '42 kW Red', 'fuel': 'Elektrisch', 'verbrEl': 14, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 87, 'acc': 0, 'koffer': 550, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 34190, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500e-berlina-24-32', 'brand': 'Fiat', 'name': '500', 'v': '24 kW Red', 'fuel': 'Elektrisch', 'verbrEl': 13, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 70, 'acc': 0, 'koffer': 550, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 30190, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'A', 'id': 'fiat-500-benz-32', 'brand': 'Fiat', 'name': '500', 'v': 'Hybrid Dolcevita', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 51, 'acc': 0, 'koffer': 550, 'cilinder': 999000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 18950, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'fiat-scudo-1', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'GB 50kW L2', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 47977, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'fiat-scudo-2', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'GB 75kW L2', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5300, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 54027, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'fiat-scudo-3', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'GB 50kW L3', 'fuel': 'Elektrisch', 'verbrEl': 26, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 49792, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'KN1', 'id': 'fiat-scudo-4', 'brand': 'Fiat', 'name': 'Scudo', 'v': 'GB 75kW L3', 'fuel': 'Elektrisch', 'verbrEl': 27, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 6100, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 55842, 'pk': 0, 'image': true, 'testcyclus':'WLTP','model':'N1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ds-ds3-crossback-e-tense-32', 'brand': 'DS', 'name': 'DS 3', 'v': 'PureTech Bastille', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 74, 'acc': 0, 'koffer': 1050, 'cilinder': 1199000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 28650, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'ds-ds3-crossback-e-tense-33', 'brand': 'DS', 'name': 'DS 3', 'v': 'E-TENSE Bastille', 'fuel': 'Elektrisch', 'verbrEl': 15.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 114, 'acc': 0, 'koffer': 1050, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 41000, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'bmw-x1-benzine', 'brand': 'BMW', 'name': 'X1 (U11)', 'v': 'sDrive20i AUT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 100, 'acc': 0, 'koffer': 0, 'cilinder': 1499000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 39750, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'bmw-i4-elek-1', 'brand': 'BMW', 'name': 'i4 (G26)', 'v': 'eDrive35', 'fuel': 'Elektrisch', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 210, 'acc': 0, 'koffer': 1290, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 58700, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-benzine', 'brand': 'Audi', 'name': 'Q5', 'v': '40 TFSI Quattro S-tronic Business Editio', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 150, 'acc': 0, 'koffer': 1520, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 56310, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-sportback', 'brand': 'Audi', 'name': 'Q5 Sportback', 'v': '40 TFSI Quattro S-tronic Business Editio', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 150, 'acc': 0, 'koffer': 1480, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 57110, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-D', 'id': 'audi-q5-sportback-1', 'brand': 'Audi', 'name': 'Q5 Sportback', 'v': '50 TFSI eQuattro S-tronic Business Editi', 'fuel': 'Plug-in hybride', 'verbrEl': 20.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 36, 'power': 185, 'acc': 0, 'koffer': 1365, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 69240, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-berline', 'brand': 'Audi', 'name': 'A6 ', 'v': '50 TFSI e quattro S tronic Business Edit', 'fuel': 'Plug-in hybride', 'verbrEl': 17.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 24, 'power': 185, 'acc': 0, 'koffer': 676, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 65370, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'E', 'id': 'audi-a6-avant-phev-32', 'brand': 'Audi', 'name': 'A6 ', 'v': '50 TFSI e quattro S tronic Business Edit', 'fuel': 'Plug-in hybride', 'verbrEl': 17.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 24, 'power': 185, 'acc': 0, 'koffer': 676, 'cilinder': 1984000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 66970, 'pk': 11, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'merc-vklasse-diesel', 'brand': 'Mercedes-Benz', 'name': 'V-Klasse', 'v': '220d 9G-TRONIC L2', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 185, 'power': 120, 'acc': 0, 'koffer': 4630, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 53, 'price': 60385, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-eqv-32', 'brand': 'Mercedes-Benz', 'name': 'EQV', 'v': '300 L2', 'fuel': 'Elektrisch', 'verbrEl': 28, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 4630, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 82153, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'mercedes-eqv-32-1', 'brand': 'Mercedes-Benz', 'name': 'EQV', 'v': '300 L3', 'fuel': 'Elektrisch', 'verbrEl': 28, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 0, 'koffer': 5010, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 83006, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'citroen-c4x-elektrisch-1', 'brand': 'Citro&euml;n', 'name': 'C4 X', 'v': '50 kWh Shine', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 1360, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 97, 'price': 40410, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'citroen-c5x-phev', 'brand': 'Citro&euml;n', 'name': 'C5 X', 'v': 'Hybrid e-EAT8 Shine', 'fuel': 'Plug-in hybride', 'verbrEl': 15.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 132, 'acc': 0, 'koffer': 1580, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 49570, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'polestar-2-lr', 'brand': 'Polestar', 'name': '2', 'v': 'Standard Range Single Motor', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 200, 'acc': 0, 'koffer': 1095, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 49990, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'D', 'id': 'polestar-2', 'brand': 'Polestar', 'name': '2', 'v': 'Long Range Single Motor', 'fuel': 'Elektrisch', 'verbrEl': 15, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 221, 'acc': 0, 'koffer': 1095, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 55690, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jaguar-epace-phev', 'brand': 'Jaguar', 'name': 'E-PACE', 'v': 'P160 AUT R-Dynamic SE', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 185, 'power': 118, 'acc': 0, 'koffer': 494, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 54800, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'jaguar-epace', 'brand': 'Jaguar', 'name': 'E-PACE', 'v': 'P300e AWD AUT R-Dynamic SE', 'fuel': 'Plug-in hybride', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 35, 'power': 227, 'acc': 0, 'koffer': 494, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 66900, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-e-spacetourer-50-32', 'brand': 'Citro&euml;n', 'name': 'SpaceTourer', 'v': 'M 50 kWh BUSINESS LOUNGE', 'fuel': 'Elektrisch', 'verbrEl': 23, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5200, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 68490, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'KM1', 'id': 'citroen-e-spacetourer-75-32', 'brand': 'Citro&euml;n', 'name': 'SpaceTourer', 'v': 'M 75 kWh BUSINESS', 'fuel': 'Elektrisch', 'verbrEl': 25, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 0, 'koffer': 5200, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 96, 'price': 65290, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-B', 'id': 'kia-stonic', 'brand': 'KIA', 'name': 'Stonic', 'v': 'T Pulse 7DCT', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 135, 'power': 74, 'acc': 0, 'koffer': 1135, 'cilinder': 998000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 25990, 'pk': 6, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'landrover-rangerover-evoque-benzine', 'brand': 'Land', 'name': 'Rover Range Rover Evoque', 'v': 'P160 MHEV AUT R-Dynamic S', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 182, 'power': 118, 'acc': 0, 'koffer': 1156, 'cilinder': 1497000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 50850, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'nissan-leaf', 'brand': 'Nissan', 'name': 'Leaf ', 'v': '40 kWh Acenta', 'fuel': 'Elektrisch', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 110, 'acc': 0, 'koffer': 1176, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 39250, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'nissan-leaf-60', 'brand': 'Nissan', 'name': 'Leaf ', 'v': '62 kWh N-Connecta', 'fuel': 'Elektrisch', 'verbrEl': 19, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 160, 'acc': 0, 'koffer': 1176, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 45400, 'pk': 4, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'seat-ateca-benz', 'brand': 'Seat', 'name': 'Ateca', 'v': 'TSI Move! Navi DSG', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 134, 'power': 110, 'acc': 0, 'koffer': 1604, 'cilinder': 1498000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 37035, 'pk': 8, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'renault-koleos-benz', 'brand': 'Renault', 'name': 'Koleos', 'v': 'TCe Initiale Paris EDC GPF', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 116, 'acc': 0, 'koffer': 1706, 'cilinder': 1333000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 45850, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-a-benz-2', 'brand': 'Mercedes-Benz', 'name': 'A-Klasse', 'v': '250e 8G-DCT Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 25, 'power': 120, 'acc': 0, 'koffer': 1125, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 51425, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-a-benz-1', 'brand': 'Mercedes-Benz', 'name': 'A-Klasse', 'v': '200d 8G-DCT Luxury Line', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 110, 'acc': 0, 'koffer': 1185, 'cilinder': 1950000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 41745, 'pk': 10, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'C', 'id': 'merc-a-benz', 'brand': 'Mercedes-Benz', 'name': 'A-Klasse', 'v': '180 7G-DCT Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 145, 'power': 100, 'acc': 0, 'koffer': 1195, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 39325, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mercedes-b-sportstourer-phev-32', 'brand': 'Mercedes-Benz', 'name': 'B-Klasse ', 'v': '180 7G-DCT Luxury Line', 'fuel': 'Benzine', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 100, 'acc': 0, 'koffer': 1540, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 43681, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'mercedes-b-sportstourer-phev-33', 'brand': 'Mercedes-Benz', 'name': 'B-Klasse ', 'v': '250e 8G-DCT Luxury Line', 'fuel': 'Plug-in hybride', 'verbrEl': 16, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 27, 'power': 120, 'acc': 0, 'koffer': 1440, 'cilinder': 1332000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 77, 'price': 52514, 'pk': 7, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-xceed-diesel', 'brand': 'KIA', 'name': 'Xceed', 'v': 'CRDi ISG MHEV Pulse DCT7', 'fuel': 'Diesel', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 100, 'acc': 0, 'koffer': 1378, 'cilinder': 1598000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 32890, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 },
{ 'segment': 'SUV-C', 'id': 'kia-xceed-phev-32', 'brand': 'KIA', 'name': 'Xceed', 'v': 'GDi PHEV Business Line DCT6', 'fuel': 'Plug-in hybride', 'verbrEl': 15.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 32, 'power': 77, 'acc': 0, 'koffer': 1243, 'cilinder': 1580000, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 37990, 'pk': 9, 'image': true, 'testcyclus':'WLTP','model':'M1', 'fakehybrides':0 }



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
				cptCarBoxHtml.push('<div class="car col-md-3 col-xs-4" id="' + carsLeft[i].id + '"> <h4>Selecteren als eerste wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '.png" width="220" /> <h2>' + carsLeft[i].brand + ' ' + carsLeft[i].name + '</h2> <h3>' + carsLeft[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsLeft[i].fuel) + '">' + drivetrainToString(carsLeft[i].fuel,'') + '</span><br /><span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsLeft[i].price,0) + ',-</span></p> </div>');					 
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
				allCarBoxHtml.push('<div class="car col-md-3 col-xs-4" id="' + carsRight[i].id + '"> <h4>Selecteren als tweede wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '.png" width="220" /> <h2>' + carsRight[i].brand + ' ' + carsRight[i].name + '</h2> <h3>' + carsRight[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsRight[i].fuel) + '">' + drivetrainToString(carsRight[i].fuel,'') + '</span><br /><span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsRight[i].price,0) + ',-</span></p> </div>');					 
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	