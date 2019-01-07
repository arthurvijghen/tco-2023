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
var tankkaart = 'y';

var vennootschapsbelasting = 0.2958; // 29,58% vennnootschapsbelasting
var benzineprijs = 1.4487; // in €/L incl btw
var dieselprijs = 1.6038; // in €/L incl btw
var elektriciteitsprijs = 0.27; // in €/kWh incl btw
var aardgasprijs = 0.99; // in €/kg incl btw
var waterstofprijs = 12.5; // in €/kg incl. btw
var inflatie = 0.0278;
var inflatieFactor = 1;

var distancePY = 15000; // in km per year
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
{ 'segment': 'D', 'id': 'audi-a3-sportback-etron', 'brand': 'Audi', 'name': 'A3 Sportback', 'v': '1.4 TFSi e-tron S tronic Sport (5d) 204pk', 'fuel': 'phev', 'verbrEl': 12.4, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 38, 'power': 150, 'acc': 7.6, 'koffer': 280, 'cilinder': 1395, 'bat': 8.8, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 41110, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'audi-q7-etron', 'brand': 'Audi', 'name': 'Q7 e-tron', 'v': '3.0 TDI Tiptr. Quattro S Line (5d) 373pk', 'fuel': 'phev', 'verbrEl': 25, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 48, 'power': 275, 'acc': 6.2, 'koffer': 650, 'cilinder': 2967, 'bat': 17.3, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 91630, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'D', 'id': 'audi-a4-cng', 'brand': 'Audi', 'name': 'A4 Avant (CNG)', 'v': 'g-tron 2.0 TFSi CNG 125kW S tronic (5d) 170pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 4.2, 'verbrFCEV': 0, 'co2': 102, 'power': 125, 'acc': 8.4, 'koffer': 505, 'cilinder': 1984, 'bat': 0, 'tank': 25, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 78, 'price': 40879, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'audi-a5-sportback-gtron', 'brand': 'Audi', 'name': 'A5 Sportback (CNG)', 'v': 'g-tron 2.0 TFSI CNG S tronic (5d) 170pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 3.8, 'verbrFCEV': 0, 'co2': 102, 'power': 125, 'acc': 8.4, 'koffer': 390, 'cilinder': 1984, 'bat': 0, 'tank': 25, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 78, 'price': 42800, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'bmw-2phev', 'brand': 'BMW', 'name': '225xe Active Tourer', 'v': 'iPerformance (5d) 224pk', 'fuel': 'phev', 'verbrEl': 11.9, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 46, 'power': 165, 'acc': 6.7, 'koffer': 400, 'cilinder': 1499, 'bat': 7.7, 'tank': 36, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 40050, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'D', 'id': 'bmw-330e-iperformance', 'brand': 'BMW', 'name': '330e Berline', 'v': 'iPerformance (4d) 252pk', 'fuel': 'phev', 'verbrEl': 19, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 44, 'power': 185, 'acc': 6.1, 'koffer': 480, 'cilinder': 1998, 'bat': 7.6, 'tank': 41, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 45350, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'bmw-530e-iperformance', 'brand': 'BMW', 'name': '530e Berline', 'v': 'iPerformance (4d) 252pk', 'fuel': 'phev', 'verbrEl': 13.4, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 47, 'power': 185, 'acc': 6.2, 'koffer': 530, 'cilinder': 1998, 'bat': 9.2, 'tank': 46, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 59950, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'F', 'id': 'bmw-740e-iperformance', 'brand': 'BMW', 'name': '740 Berline', 'v': 'iPerformance (4d) 326pk', 'fuel': 'phev', 'verbrEl': 12.5, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 45, 'power': 240, 'acc': 5.5, 'koffer': 420, 'cilinder': 1998, 'bat': 9.2, 'tank': 46, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 106750, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'bmw-i3', 'brand': 'BMW', 'name': 'i3', 'v': 'Advanced (5d) 170pk', 'fuel': 'ev', 'verbrEl': 11, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 125, 'acc': 7.3, 'koffer': 260, 'cilinder': 0, 'bat': 33.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 42050, 'bonus': 2500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'bmw-i3-s', 'brand': 'BMW', 'name': 'i3s REx', 'v': '(5d) 184pk', 'fuel': 'phev', 'verbrEl': 14, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 14, 'power': 135, 'acc': 7.7, 'koffer': 260, 'cilinder': 647, 'bat': 33.2, 'tank': 9, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 47450, 'bonus': 0, 'pk': 4, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5-xdrive40e', 'brand': 'BMW', 'name': 'X5 xDrive 40e', 'v': 'iPerformance (230 kW) (5d) 313pk', 'fuel': 'phev', 'verbrEl': 29, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 77, 'power': 230, 'acc': 6.8, 'koffer': 500, 'cilinder': 1997, 'bat': 9, 'tank': 85, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 75250, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'K', 'id': 'citroen-e-berlingo', 'brand': 'Citro&euml;n', 'name': 'e-Berlingo ', 'v': 'Shine (5d) 67pk', 'fuel': 'ev', 'verbrEl': 17.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 49, 'acc': 19.5, 'koffer': 675, 'cilinder': 0, 'bat': 22.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 33100, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'B', 'id': 'citroen-c-zero', 'brand': 'Citro&euml;n', 'name': 'C-Z&eacute;ro Electric', 'v': 'Seduction (5d) 67pk', 'fuel': 'ev', 'verbrEl': 12.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 49, 'acc': 15.9, 'koffer': 166, 'cilinder': 0, 'bat': 16, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 30235, 'bonus': 4000, 'pk': 4, 'image': true },
{ 'segment': 'A', 'id': 'citroen-e-mehari', 'brand': 'Citro&euml;n', 'name': 'E-M&eacute;hari', 'v': 'Hard Top (3d) 68pk', 'fuel': 'ev', 'verbrEl': 41.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 50, 'acc': 19, 'koffer': 200, 'cilinder': 0, 'bat': 30, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 27830, 'bonus': 4000, 'pk': 4, 'image': true },
{ 'segment': 'A', 'id': 'fiat-panda-cng', 'brand': 'Fiat', 'name': 'Panda (CNG)', 'v': '0.9 Twinair 59kW CNG Lounge (5d) 80pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 3.1, 'verbrFCEV': 0, 'co2': 85, 'power': 59, 'acc': 12.8, 'koffer': 200, 'cilinder': 875, 'bat': 0, 'tank': 35, 'tankcng': 12, 'tankfcev': 0, 'ecoscore': 81, 'price': 15040, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'B', 'id': 'fiat-punto-cng', 'brand': 'Fiat', 'name': 'Punto', 'v': '1.4 51kW CNG Easy (5d) 70pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6.3, 'verbrCNG': 4.2, 'verbrFCEV': 0, 'co2': 115, 'power': 51, 'acc': 16.9, 'koffer': 275, 'cilinder': 1368, 'bat': 0, 'tank': 45, 'tankcng': 13, 'tankfcev': 0, 'ecoscore': 77, 'price': 16440, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'fiat-doblo-cng', 'brand': 'Fiat', 'name': 'Dobl&ograve; (CNG)', 'v': '1.4 T-Jet CNG Lounge Natural Power (5d) 120pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 4.9, 'verbrFCEV': 0, 'co2': 134, 'power': 88, 'acc': 12.3, 'koffer': 790, 'cilinder': 1368, 'bat': 0, 'tank': 22, 'tankcng': 16, 'tankfcev': 0, 'ecoscore': 75, 'price': 22290, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'fiat-qubo', 'brand': 'Fiat', 'name': 'Qubo', 'v': '1.4 Lounge CNG Natural Power (5d) 70pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 4.2, 'verbrFCEV': 0, 'co2': 119, 'power': 51, 'acc': 17.5, 'koffer': 250, 'cilinder': 1368, 'bat': 0, 'tank': 45, 'tankcng': 13, 'tankfcev': 0, 'ecoscore': 76, 'price': 16840, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'fiat-500l-cng', 'brand': 'Fiat', 'name': '500L (CNG)', 'v': 'Lounge (5d) 80pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 3.9, 'verbrFCEV': 0, 'co2': 105, 'power': 59, 'acc': 15.7, 'koffer': 396, 'cilinder': 875, 'bat': 0, 'tank': 50, 'tankcng': 14, 'tankfcev': 0, 'ecoscore': 78, 'price': 22900, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'D', 'id': 'hyundai-ioniq-phev', 'brand': 'Hyundai', 'name': 'IONIQ PHEV', 'v': '1.6 Plug-in Hybride Executive (5d) 141pk', 'fuel': 'phev', 'verbrEl': 9.4, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 26, 'power': 104, 'acc': 10.6, 'koffer': 350, 'cilinder': 1580, 'bat': 8.9, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 36999, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'D', 'id': 'hyundai-ioniq-ev', 'brand': 'Hyundai', 'name': 'IONIQ Electric', 'v': 'Executive (5d) 120pk', 'fuel': 'ev', 'verbrEl': 11.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 88, 'acc': 9.9, 'koffer': 455, 'cilinder': 0, 'bat': 30.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 37699, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'E', 'id': 'jaguar-i-pace', 'brand': 'Jaguar', 'name': 'I-Pace', 'v': 'SE (5d) 400pk', 'fuel': 'ev', 'verbrEl': 21.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 294, 'acc': 4.8, 'koffer': 577, 'cilinder': 0, 'bat': 90, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 87080, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'D', 'id': 'kia-optima-phev', 'brand': 'Kia', 'name': 'Optima PHEV', 'v': '2.0 GDi Auto (4d) 205pk', 'fuel': 'phev', 'verbrEl': 12.2, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 37, 'power': 151, 'acc': 9.4, 'koffer': 307, 'cilinder': 1999, 'bat': 9.8, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 46240, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'kia-optima-sw-phev', 'brand': 'Kia', 'name': 'Optima Sportwagon PHEV', 'v': 'PHEV 2.0 GDi Sense Auto (5d) 205pk', 'fuel': 'phev', 'verbrEl': 12.2, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 33, 'power': 151, 'acc': 9.7, 'koffer': 440, 'cilinder': 1999, 'bat': 11.3, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 47540, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-C', 'id': 'kia-niro-phev', 'brand': 'Kia', 'name': 'Niro PHEV', 'v': 'Sense 1.6 GDi PHEV 6DCT (5d) 141pk', 'fuel': 'phev', 'verbrEl': 14.3, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 29, 'power': 104, 'acc': 10.8, 'koffer': 427, 'cilinder': 1580, 'bat': 8.9, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 81, 'price': 40840, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'B', 'id': 'kia-soul-ev', 'brand': 'Kia', 'name': 'Soul EV', 'v': '(5d) 110pk', 'fuel': 'ev', 'verbrEl': 14.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 81, 'acc': 11.3, 'koffer': 281, 'cilinder': 0, 'bat': 33, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 35890, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'D', 'id': 'mercedes-c-phev', 'brand': 'Mercedes-Benz', 'name': 'C-klasse Break (PHEV)', 'v': 'C350e (5d) 279pk', 'fuel': 'phev', 'verbrEl': 11.7, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 205, 'acc': 6.2, 'koffer': 345, 'cilinder': 1991, 'bat': 6.2, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 54329, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'mercedes-e-phev', 'brand': 'Mercedes-Benz', 'name': 'E-klasse Berline (PHEV)', 'v': 'E350e Avantgarde (4d) 286pk', 'fuel': 'phev', 'verbrEl': 11.5, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 210, 'acc': 6.2, 'koffer': 450, 'cilinder': 1991, 'bat': 6.2, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 65824, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'mercedes-gle-phev', 'brand': 'Mercedes-Benz', 'name': 'GLE500e', 'v': '4MATIC (5d) 449pk', 'fuel': 'phev', 'verbrEl': 16.7, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 78, 'power': 330, 'acc': 5.3, 'koffer': 480, 'cilinder': 2996, 'bat': 8.8, 'tank': 80, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 77682, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-phev', 'brand': 'Mini', 'name': 'Plug-in Countryman (PHEV)', 'v': 'SE ALL4 (5d) 224pk', 'fuel': 'phev', 'verbrEl': 14.1, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 55, 'power': 165, 'acc': 6.8, 'koffer': 405, 'cilinder': 1499, 'bat': 7.6, 'tank': 36, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 39000, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-D', 'id': 'mitsubishi-outlander-phev', 'brand': 'Mitsubishi', 'name': 'Outlander PHEV', 'v': '2.0L PHEV Business Edition 4WD (5d) 203pk', 'fuel': 'phev', 'verbrEl': 13.4, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 41, 'power': 149, 'acc': 11, 'koffer': 463, 'cilinder': 1998, 'bat': 12, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 79, 'price': 48340, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'K', 'id': 'nissan-e-nv200-evalia', 'brand': 'Nissan', 'name': 'e-NV200 Evalia', 'v': 'Connect Edition (5d) 109pk', 'fuel': 'ev', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 80, 'acc': 14, 'koffer': 2300, 'cilinder': 0, 'bat': 40, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 43584, 'bonus': 2500, 'pk': 4, 'image': true },
{ 'segment': 'K', 'id': 'nissan-e-nv200-evalia-7', 'brand': 'Nissan', 'name': ' e-NV200 Evalia 7 seats', 'v': 'Connect Edition 7 Seats (5d) 109pk', 'fuel': 'ev', 'verbrEl': 16.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 80, 'acc': 14, 'koffer': 870, 'cilinder': 0, 'bat': 40, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 44189, 'bonus': 2500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'nissan-leaf', 'brand': 'Nissan', 'name': 'LEAF', 'v': 'Acenta 40kWh (5d) 150pk', 'fuel': 'ev', 'verbrEl': 15.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 110, 'acc': 7.9, 'koffer': 435, 'cilinder': 0, 'bat': 40, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 36540, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'opel-astra-cng', 'brand': 'Opel', 'name': 'Astra (CNG)', 'v': '1.4 Turbo 81kW ECOTEC CNG Innovation (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 6.3, 'verbrFCEV': 0, 'co2': 113, 'power': 81, 'acc': 10.9, 'koffer': 241, 'cilinder': 1399, 'bat': 0, 'tank': 14, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 78, 'price': 26250, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'opel-astra-sw', 'brand': 'Opel', 'name': 'Astra Sports Tourer', 'v': '1.4 Turbo 81kW ECOTEC CNG Innovation (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 6.5, 'verbrFCEV': 0, 'co2': 116, 'power': 81, 'acc': 12.3, 'koffer': 397, 'cilinder': 1399, 'bat': 0, 'tank': 14, 'tankcng': 19, 'tankfcev': 0, 'ecoscore': 78, 'price': 27125, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'peugeot-ion', 'brand': 'Peugeot', 'name': 'iOn', 'v': '330 V Active (5d) 67pk', 'fuel': 'ev', 'verbrEl': 13.5, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 49, 'acc': 15.9, 'koffer': 166, 'cilinder': 0, 'bat': 16, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 30370, 'bonus': 4000, 'pk': 4, 'image': true },
{ 'segment': 'K', 'id': 'peugeot-partner-tepee-electric', 'brand': 'Peugeot', 'name': 'Partner tepee Electric', 'v': 'Allure (5d) 67pk', 'fuel': 'ev', 'verbrEl': 17.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 49, 'acc': 19.5, 'koffer': 675, 'cilinder': 0, 'bat': 22.5, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 84, 'price': 33100, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne-phev', 'brand': 'Porsche', 'name': 'Cayenne E-Hybrid', 'v': '3.0 (5d) 462pk', 'fuel': 'phev', 'verbrEl': 20.8, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 69, 'power': 340, 'acc': 5, 'koffer': 645, 'cilinder': 2995, 'bat': 14.1, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 93025, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'F', 'id': 'porsche-panamera-phev', 'brand': 'Porsche', 'name': 'Panamera E-Hybrid', 'v': '2.9 (5d) 462pk', 'fuel': 'phev', 'verbrEl': 15.9, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 56, 'power': 340, 'acc': 4.6, 'koffer': 405, 'cilinder': 2894, 'bat': 14.1, 'tank': 80, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 112748, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'K', 'id': 'renault-kangoo-ze-maxi', 'brand': 'Renault', 'name': 'Kangoo Z.E. Maxi (batterijkoop)', 'v': '5 pl. ZE 33 B-buy', 'fuel': 'ev', 'verbrEl': 18.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 44, 'acc': 22.4, 'koffer': 1300, 'cilinder': 0, 'bat': 33, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 30600, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'B', 'id': 'renault-zoe', 'brand': 'Renault', 'name': 'ZOE (batterijkoop)', 'v': 'Limited#2 Quick Charge B-buy (5d) 109pk', 'fuel': 'ev', 'verbrEl': 14.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 65, 'acc': 12.2, 'koffer': 338, 'cilinder': 0, 'bat': 41, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 36150, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'A', 'id': 'seat-mii', 'brand': 'Seat', 'name': 'Mii', 'v': '1.0 50kW CNG EcoFuel Style (5d) 68pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 2.9, 'verbrFCEV': 0, 'co2': 83, 'power': 50, 'acc': 16.3, 'koffer': 213, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 11, 'tankfcev': 0, 'ecoscore': 82, 'price': 14320, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'seat-ibiza-cng', 'brand': 'Seat', 'name': 'Ibiza (CNG)', 'v': '1.0 TGI 90pk Style (5d) 90pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 3.3, 'verbrFCEV': 0, 'co2': 88, 'power': 66, 'acc': 12.1, 'koffer': 262, 'cilinder': 999, 'bat': 0, 'tank': 40, 'tankcng': 13, 'tankfcev': 0, 'ecoscore': 82, 'price': 18520, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'C', 'id': 'seat-leon-cng', 'brand': 'Seat', 'name': 'Leon (CNG)', 'v': '1.4 TGI 81kW Style (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 4.3, 'verbrFCEV': 0, 'co2': 96, 'power': 81, 'acc': 10.9, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 15, 'tankfcev': 0, 'ecoscore': 80, 'price': 24090, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'seat-leon-st', 'brand': 'Seat', 'name': 'Leon ST (CNG)', 'v': '1.4L TGI 81kW Style (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 4.3, 'verbrFCEV': 0, 'co2': 96, 'power': 81, 'acc': 11, 'koffer': 587, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 15, 'tankfcev': 0, 'ecoscore': 80, 'price': 24990, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'A', 'id': 'skoda-citigo-cng', 'brand': '&Scaron;koda', 'name': 'Citigo G-TEC', 'v': '1.0 CNG 50kW Ambition (5d) 68pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 2.9, 'verbrFCEV': 0, 'co2': 82, 'power': 50, 'acc': 16.3, 'koffer': 213, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 12, 'tankfcev': 0, 'ecoscore': 82, 'price': 13845, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'C', 'id': 'skoda-octavia-cng', 'brand': '&Scaron;koda', 'name': 'Octavia Combi G-TEC (CNG)', 'v': 'Combi 1.4 TGI 81kW G-Tec Style (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 3.8, 'verbrFCEV': 0, 'co2': 102, 'power': 81, 'acc': 11, 'koffer': 480, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 15, 'tankfcev': 0, 'ecoscore': 79, 'price': 30175, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'A', 'id': 'smart-forfour-eq', 'brand': 'smart', 'name': 'EQ forfour', 'v': '60kW (5d) 82pk', 'fuel': 'ev', 'verbrEl': 18.6, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 12.7, 'koffer': 185, 'cilinder': 0, 'bat': 17.6, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 23571, 'bonus': 4000, 'pk': 4, 'image': true },
{ 'segment': 'A', 'id': 'smart-fortwo-ed', 'brand': 'smart', 'name': 'EQ fortwo', 'v': '60kW Business Solution (3d) 82pk', 'fuel': 'ev', 'verbrEl': 15.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 11.5, 'koffer': 260, 'cilinder': 0, 'bat': 17.6, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 22995, 'bonus': 4000, 'pk': 4, 'image': true },
{ 'segment': 'E', 'id': 'tesla-models-75d', 'brand': 'Tesla', 'name': 'Model S 75D', 'v': '75kWh (Dual Motor) (5d) 525pk', 'fuel': 'ev', 'verbrEl': 18.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 386, 'acc': 4.4, 'koffer': 894, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 90700, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'E', 'id': 'tesla-models-100d', 'brand': 'Tesla', 'name': 'Model S 100D', 'v': '100kWh (Dual Motor) (5d) 525pk', 'fuel': 'ev', 'verbrEl': 18.9, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 386, 'acc': 4.3, 'koffer': 894, 'cilinder': 0, 'bat': 100, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 83, 'price': 112300, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'tesla-modelx-75d', 'brand': 'Tesla', 'name': 'Model X 75D', 'v': '75kWh (Dual Motor) (5d) 525pk', 'fuel': 'ev', 'verbrEl': 20.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 386, 'acc': 5.2, 'koffer': 2487, 'cilinder': 0, 'bat': 75, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 98650, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'tesla-modelx-100d', 'brand': 'Tesla', 'name': 'Model X 100D', 'v': '100kWh (Dual Motor) (5d) 525pk', 'fuel': 'ev', 'verbrEl': 20.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 386, 'acc': 4.9, 'koffer': 2487, 'cilinder': 0, 'bat': 100, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 82, 'price': 116800, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'rangerover-landrover-phev', 'brand': 'Land', 'name': 'Rover Range Rover PHEV', 'v': 'P400e Vogue (5d) 404pk', 'fuel': 'phev', 'verbrEl': 21, 'verbrBr': 8.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 64, 'power': 297, 'acc': 6.8, 'koffer': 550, 'cilinder': 1997, 'bat': 13.1, 'tank': 90, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 120700, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'rangerover-landrover-sport-phev', 'brand': 'Land', 'name': 'Rover Range Rover Sport PHEV', 'v': 'P400e SE (5d) 404pk', 'fuel': 'phev', 'verbrEl': 21, 'verbrBr': 8.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 64, 'power': 297, 'acc': 6.7, 'koffer': 446, 'cilinder': 1997, 'bat': 13.1, 'tank': 90, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 88500, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'toyota-prius-phev', 'brand': 'Toyota', 'name': 'Prius PHEV', 'v': '1.8 VVT-i PHEV Hybrid Business (5d) 122pk', 'fuel': 'phev', 'verbrEl': 7.2, 'verbrBr': 3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 28, 'power': 90, 'acc': 11.1, 'koffer': 360, 'cilinder': 1798, 'bat': 8.8, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 42970, 'bonus': 0, 'pk': 10, 'image': true },
{ 'segment': 'D', 'id': 'toyota-mirai', 'brand': 'Toyota', 'name': 'Miral Berline', 'v': '113kW Aut. Premium (4d) 154pk', 'fuel': 'fcev', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 1, 'co2': 0, 'power': 114, 'acc': 9.6, 'koffer': 361, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 5, 'ecoscore': 79, 'price': 79900, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'C', 'id': 'vw-e-golf', 'brand': 'Volkswagen', 'name': 'e-Golf', 'v': '(5d) 136pk', 'fuel': 'ev', 'verbrEl': 14.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.6, 'koffer': 341, 'cilinder': 0, 'bat': 35.8, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 39010, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'A', 'id': 'vw-e-up', 'brand': 'Volkswagen', 'name': 'e-up!', 'v': '(5d) 82pk', 'fuel': 'ev', 'verbrEl': 11.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 60, 'acc': 12.4, 'koffer': 250, 'cilinder': 0, 'bat': 20, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 24800, 'bonus': 4000, 'pk': 4, 'image': true },
{ 'segment': 'A', 'id': 'vw-up-cng', 'brand': 'Volkswagen', 'name': 'up!', 'v': '1.0 MPi CNG 44kW BMT Move up! (5d) 68pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 2.9, 'verbrFCEV': 0, 'co2': 82, 'power': 50, 'acc': 16.3, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 10, 'tankcng': 11, 'tankfcev': 0, 'ecoscore': 82, 'price': 15460, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'vw-polo-cng', 'brand': 'Volkswagen', 'name': 'Polo (CNG)', 'v': '1.0 TGI Comfortline (5d) 90pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 3.1, 'verbrFCEV': 0, 'co2': 85, 'power': 66, 'acc': 11.9, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 40, 'tankcng': 12, 'tankfcev': 0, 'ecoscore': 82, 'price': 18150, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'C', 'id': 'vw-golf-tgi', 'brand': 'Volkswagen', 'name': 'Golf TGI (CNG)', 'v': '1.4 TGi 81kW Comfortline (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 3.6, 'verbrFCEV': 0, 'co2': 98, 'power': 81, 'acc': 10.6, 'koffer': 380, 'cilinder': 1395, 'bat': 0, 'tank': 50, 'tankcng': 15, 'tankfcev': 0, 'ecoscore': 80, 'price': 23925, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'vw-golf-sportwagon', 'brand': 'Volkswagen', 'name': 'Golf Variant TGI (CNG)', 'v': '1.4 TGi BlueMotion 96kW Comfortline DSG (5d) 131pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 3.5, 'verbrFCEV': 0, 'co2': 98, 'power': 96, 'acc': 10.9, 'koffer': 424, 'cilinder': 1498, 'bat': 0, 'tank': 51, 'tankcng': 16, 'tankfcev': 0, 'ecoscore': 80, 'price': 27810, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'vw-caddy-cng', 'brand': 'Volkswagen', 'name': 'Caddy (CNG)', 'v': '1.4 TGi BMT 81kW Comfortline (5d) 110pk', 'fuel': 'cng', 'verbrEl': 0, 'verbrBr': 6, 'verbrCNG': 4.1, 'verbrFCEV': 0, 'co2': 118, 'power': 81, 'acc': 12.9, 'koffer': 190, 'cilinder': 1395, 'bat': 0, 'tank': 13, 'tankcng': 26, 'tankfcev': 0, 'ecoscore': 77, 'price': 26530, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'E', 'id': 'volvo-v90-phev', 'brand': 'Volvo', 'name': 'V90 T8 Plug-in', 'v': 'e4x4 Geartronic R-Design (5d) 392pk', 'fuel': 'phev', 'verbrEl': 17, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 288, 'acc': 5.3, 'koffer': 560, 'cilinder': 1969, 'bat': 10.4, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 76200, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'volvo-s90-phev', 'brand': 'Volvo', 'name': 'S90 T8 Plug-in', 'v': 'e4x4 Geartronic R-Design (4d) 392pk', 'fuel': 'phev', 'verbrEl': 17, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 288, 'acc': 5.1, 'koffer': 537, 'cilinder': 1969, 'bat': 10.4, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 73850, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'volvo-v60-phev', 'brand': 'Volvo', 'name': 'V60 Plug-in', 'v': '4x4 Geartronic R-Design (5d) 341pk', 'fuel': 'phev', 'verbrEl': 16, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 49, 'power': 251, 'acc': 5.7, 'koffer': 529, 'cilinder': 1969, 'bat': 10.4, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 55900, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-phev', 'brand': 'Volvo', 'name': 'XC60 T8 Plug-in', 'v': 'e4x4 Geartronic R-Design (5d) 392pk', 'fuel': 'phev', 'verbrEl': 18.6, 'verbrBr': 5.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 52, 'power': 288, 'acc': 5.5, 'koffer': 468, 'cilinder': 1969, 'bat': 10.4, 'tank': 71, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 72150, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-phev', 'brand': 'Volvo', 'name': 'XC90 T8 Plug-In', 'v': '4WD Geartronic R-Design 7PL. (5d) 392pk', 'fuel': 'phev', 'verbrEl': 20, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 59, 'power': 288, 'acc': 5.8, 'koffer': 316, 'cilinder': 1969, 'bat': 10.4, 'tank': 70, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 86750, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'A', 'id': 'fiat-500-dies', 'brand': 'Fiat', 'name': '500', 'v': '1.3 Mjet 95hp Lounge (3d) 95pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 89, 'power': 70, 'acc': 10.7, 'koffer': 185, 'cilinder': 1248, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 18490, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'A', 'id': 'fiat-500-benz', 'brand': 'Fiat', 'name': '500', 'v': '1.2 Lounge 8v 69hp Lounge (3d) 69pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 115, 'power': 51, 'acc': 12.9, 'koffer': 185, 'cilinder': 1242, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 15490, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'A', 'id': 'fiat-panda-benz', 'brand': 'Fiat', 'name': 'Panda', 'v': 'Easy 1.2 8v 51kW Easy (5d) 69pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 51, 'acc': 14.2, 'koffer': 225, 'cilinder': 1242, 'bat': 0, 'tank': 37, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 10590, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'A', 'id': 'kia-picanto', 'brand': 'Kia', 'name': 'Picanto', 'v': 'Fusion 1.2 AT (5d) 84pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 124, 'power': 61, 'acc': 13.7, 'koffer': 255, 'cilinder': 1248, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 14140, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'A', 'id': 'opel-adam', 'brand': 'Opel', 'name': 'Adam', 'v': 'Glam 1.2 51kW (3d) 70pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 51, 'acc': 14.9, 'koffer': 170, 'cilinder': 1229, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 15550, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'A', 'id': 'renault-twingo', 'brand': 'Renault', 'name': 'Twingo', 'v': 'Intens 0.9 TCe 90 EDC (5d) 90pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 66, 'acc': 10.8, 'koffer': 219, 'cilinder': 898, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 15400, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'A', 'id': 'skoda-citigo', 'brand': '&Scaron;koda', 'name': 'Citigo', 'v': 'Ambition 1.0 55kW ASG (5d) 75pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 103, 'power': 51, 'acc': 14.9, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 12090, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'A', 'id': 'smart-fortwo-benz', 'brand': 'smart', 'name': 'fortwo Coup&eacute;', 'v': 'Brabus 0.9 80kW 109pk (3d)', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 80, 'acc': 9.5, 'koffer': 260, 'cilinder': 898, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 21659, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'A', 'id': 'toyota-aygo', 'brand': 'Toyota', 'name': 'Aygo', 'v': '1.0 VVT-i x-cite M/M (5d) 69pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 97, 'power': 51, 'acc': 15.5, 'koffer': 168, 'cilinder': 935, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 15780, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'A', 'id': 'vw-up-benz', 'brand': 'Volkswagen', 'name': 'up!', 'v': 'High-up! 1.0 MPi 55kW BMT ASG (5d) 75pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 97, 'power': 55, 'acc': 14.9, 'koffer': 251, 'cilinder': 999, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 76, 'price': 15410, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'citroen-c3', 'brand': 'Citro&euml;n', 'name': 'C3', 'v': 'Feel 1.2 PureTech 110 S&S EAT6 (5d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 81, 'acc': 10, 'koffer': 300, 'cilinder': 1199, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 18245, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'B', 'id': 'dacia-sandero', 'brand': 'Dacia', 'name': 'Sandero', 'v': 'Easy-R Stepway Plus  1.5 dCi 90 (5d) 90pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 98, 'power': 66, 'acc': 12, 'koffer': 320, 'cilinder': 1461, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 14300, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'ford-fiesta-benz', 'brand': 'Ford', 'name': 'Fiesta', 'v': 'EcoBoost businessclass 1.0i 74kW aut. (5d) 100pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 74, 'acc': 12.2, 'koffer': 292, 'cilinder': 998, 'bat': 0, 'tank': 42, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 20100, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'hyundai-i20', 'brand': 'Hyundai', 'name': 'i20', 'v': 'Twist1.4 74kW Aut. (5d) 100pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 74, 'acc': 13.2, 'koffer': 326, 'cilinder': 1368, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 17549, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'nissan-micra', 'brand': 'Nissan', 'name': 'Micra', 'v': 'Acenta 1.5 dCi  (5d) 90pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 92, 'power': 66, 'acc': 11.9, 'koffer': 300, 'cilinder': 1461, 'bat': 0, 'tank': 41, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 18440, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'opel-corsa', 'brand': 'Opel', 'name': 'Corsa', 'v': 'Black Edition 1.4 66kW Aut.  (5d) 90pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 142, 'power': 66, 'acc': 13.9, 'koffer': 285, 'cilinder': 1398, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 17375, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'peugeot-208', 'brand': 'Peugeot', 'name': '208', 'v': 'Allure 1.2 PureTech 81kW S/S Auto (5d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 106, 'power': 81, 'acc': 11, 'koffer': 285, 'cilinder': 1199, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 22175, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'B', 'id': 'renault-clio-dies', 'brand': 'Renault', 'name': 'Clio', 'v': 'dCi 75 Cool & Sound #1', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 66, 'acc': 12, 'koffer': 300, 'cilinder': 1461, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 17325, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'renault-clio-benz', 'brand': 'Renault', 'name': 'Clio', 'v': 'TCe 75 Cool & Sound #1 (5d) 75pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 113, 'power': 66, 'acc': 12.3, 'koffer': 300, 'cilinder': 898, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 15325, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'B', 'id': 'seat-ibiza-benz', 'brand': 'Seat', 'name': 'Ibiza', 'v': 'Style 1.0 TSI 115pk S&S DSG (5d) 115pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 85, 'acc': 9.5, 'koffer': 355, 'cilinder': 999, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 19530, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'skoda-fabia', 'brand': '&Scaron;koda', 'name': 'Fabia', 'v': 'Ambition 1.0 TSI 81kW DSG7 (5d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 106, 'power': 81, 'acc': 9.8, 'koffer': 330, 'cilinder': 999, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 18485, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'smart-forfour-benz', 'brand': 'smart', 'name': 'forfour', 'v': 'Brabus 0.9 80kW (5d) 109pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 80, 'acc': 10.5, 'koffer': 185, 'cilinder': 898, 'bat': 0, 'tank': 35, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 22627, 'bonus': 0, 'pk': 5, 'image': true },
{ 'segment': 'B', 'id': 'toyota-yaris', 'brand': 'Toyota', 'name': 'Yaris', 'v': 'Comfort 1.5 VVT-i Hybrid e-CVT (5d) 100pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 75, 'power': 54, 'acc': 11.8, 'koffer': 286, 'cilinder': 1497, 'bat': 0, 'tank': 36, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 20920, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'B', 'id': 'vw-polo-dies', 'brand': 'Volkswagen', 'name': 'Polo', 'v': 'Comfortline 1.6 TDI 70kW DSG 7 (5d) 95pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 103, 'power': 70, 'acc': 11.2, 'koffer': 351, 'cilinder': 1598, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 21100, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'B', 'id': 'vw-polo-benz', 'brand': 'Volkswagen', 'name': 'Polo', 'v': 'Comfortline 1.0 TSI  DSG (5d) 95pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 105, 'power': 70, 'acc': 10.8, 'koffer': 351, 'cilinder': 999, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 19300, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'B', 'id': 'kia-soul', 'brand': 'Kia', 'name': 'Soul Max', 'v': '1.6 CRDi DCT (5d) 136pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 130, 'power': 100, 'acc': 11.1, 'koffer': 354, 'cilinder': 1582, 'bat': 0, 'tank': 54, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 27390, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'C', 'id': 'audi-a3-dies', 'brand': 'Audi', 'name': 'A3 Berline', 'v': 'Tronic Design 1.6 TDi 85kW S (4d) 116pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 105, 'power': 85, 'acc': 10.4, 'koffer': 425, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 31180, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'C', 'id': 'audi-a3-benz', 'brand': 'Audi', 'name': 'A3 Berline', 'v': 'Tronic Design 1.0 TFSi 85kW S (4d) 116pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 106, 'power': 85, 'acc': 9.9, 'koffer': 425, 'cilinder': 999, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 74, 'price': 29930, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'C', 'id': 'bmw-1', 'brand': 'BMW', 'name': '120i', 'v': '(165 kW) (5d) 224pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 134, 'power': 135, 'acc': 7.1, 'koffer': 360, 'cilinder': 1998, 'bat': 0, 'tank': 52, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 30850, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'citroen-c4-grand-picasso', 'brand': 'Citro&euml;n', 'name': 'Grand C4 Picasso', 'v': '2.0 BlueHDi 150 S&S MAN6 Business Lounge (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 106, 'power': 110, 'acc': 9.8, 'koffer': 645, 'cilinder': 1997, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 26257, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'mercedes-a', 'brand': 'Mercedes-Benz', 'name': 'A-klasse ', 'v': '180 DCT (5d) 136pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 100, 'acc': 8.8, 'koffer': 370, 'cilinder': 1325, 'bat': 0, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 29282, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'C', 'id': 'mercedes-cla', 'brand': 'Mercedes-Benz', 'name': 'CLA-klasse', 'v': '200 d DCT (4d) 136pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 100, 'acc': 9, 'koffer': 470, 'cilinder': 2143, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 32791, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'opel-astra', 'brand': 'Opel', 'name': 'Astra', 'v': 'Dynamic 1.4 Turbo 110kW S/S (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 124, 'power': 110, 'acc': 8.9, 'koffer': 370, 'cilinder': 1399, 'bat': 0, 'tank': 48, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 26850, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'peugeot-308', 'brand': 'Peugeot', 'name': '308', 'v': 'Allure 1.5 BlueHDi 130 DPF S&S EAT8  (5d) 130pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 94, 'power': 96, 'acc': 9.4, 'koffer': 470, 'cilinder': 1499, 'bat': 0, 'tank': 53, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 29210, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'renault-megane', 'brand': 'Renault', 'name': 'M&eacute;gane Berline', 'v': 'Energy 1.2TCe 130 EDC Bose Edition (5d) 132pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 97, 'acc': 10.8, 'koffer': 384, 'cilinder': 1197, 'bat': 0, 'tank': 47, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 27375, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'C', 'id': 'seat-leon-benz', 'brand': 'Seat', 'name': 'Leon', 'v': 'Style 1.6 CRTDI 85kW DSG  (5d) 115pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 85, 'acc': 10.7, 'koffer': 380, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 26890, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'C', 'id': 'volvo-v40', 'brand': 'Volvo', 'name': 'V40', 'v': 'Black Edition T2 Geartronic (5d) 122pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 90, 'acc': 9.8, 'koffer': 324, 'cilinder': 1498, 'bat': 0, 'tank': 62, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 23895, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'vw-golf-dies', 'brand': 'Volkswagen', 'name': 'Golf VII', 'v': 'Comfortline 1.6 TDi 85kW  DSG (3d) 115pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 102, 'power': 85, 'acc': 10.5, 'koffer': 380, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 27690, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'C', 'id': 'vw-golf-benz', 'brand': 'Volkswagen', 'name': 'Golf VII', 'v': 'Comfortline 1.0 TSi 81kW DSG (3d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 81, 'acc': 9.9, 'koffer': 380, 'cilinder': 999, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 24870, 'bonus': 0, 'pk': 6, 'image': true },
{ 'segment': 'D', 'id': 'audi-a4-dies', 'brand': 'Audi', 'name': 'A4 Avant', 'v': 'S Tronic Business ED 2.0 35 TDi 110kW  (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 99, 'power': 110, 'acc': 8.7, 'koffer': 505, 'cilinder': 1968, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 37465, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'audi-a4-benz', 'brand': 'Audi', 'name': 'A4 Avant', 'v': 'S Tronic 2.0 35 TFSi 110kW  (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 110, 'acc': 8.5, 'koffer': 505, 'cilinder': 1984, 'bat': 0, 'tank': 54, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 36450, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'audi-a5', 'brand': 'Audi', 'name': 'A5 Sportback', 'v': 'S Tronic  2.0 TDI 100kW Business Edition (5d) 136pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 110, 'power': 100, 'acc': 8.9, 'koffer': 480, 'cilinder': 1968, 'bat': 0, 'tank': 40, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 39335, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'bmw-3', 'brand': 'BMW', 'name': '320i Touring ', 'v': 'xDrive (135 kW) (5d) 184pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 151, 'power': 135, 'acc': 7.9, 'koffer': 495, 'cilinder': 1998, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 42600, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'mercedes-c', 'brand': 'Mercedes-Benz', 'name': 'C-klasse Break', 'v': 'C200 (5d) 184pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 147, 'power': 135, 'acc': 7.9, 'koffer': 590, 'cilinder': 1497, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 42471, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'C', 'id': 'skoda-octavia-benz', 'brand': '&Scaron;koda', 'name': 'Octavia Combi', 'v': 'Ambition 2.0 CRTDI GreenTec 110kW DSG7  (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 128, 'power': 110, 'acc': 8.6, 'koffer': 610, 'cilinder': 1968, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 31625, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'C', 'id': 'skoda-octavia-dies', 'brand': '&Scaron;koda', 'name': 'Octavia Combi', 'v': 'Ambition 1.5 TSI ACT 110kW DSG 7 GreenT (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 114, 'power': 110, 'acc': 8.4, 'koffer': 610, 'cilinder': 1498, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 73, 'price': 28150, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'D', 'id': 'toyota-prius', 'brand': 'Toyota', 'name': 'Prius', 'v': 'Business 1.8 VVT-i (5d) 122pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 78, 'power': 72, 'acc': 10.6, 'koffer': 343, 'cilinder': 1798, 'bat': 0, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 31580, 'bonus': 0, 'pk': 10, 'image': true },
{ 'segment': 'D', 'id': 'vw-passat', 'brand': 'Volkswagen', 'name': 'Passat Variant', 'v': 'Comfortline 2.0 TDI SCR 110kW DSG7 (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 113, 'power': 110, 'acc': 8.9, 'koffer': 650, 'cilinder': 1968, 'bat': 0, 'tank': 59, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 37550, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'volvo-s60', 'brand': 'Volvo', 'name': 'S60', 'v': 'Momentum D3 Geartronic eco (4d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 111, 'power': 110, 'acc': 9, 'koffer': 380, 'cilinder': 1969, 'bat': 0, 'tank': 68, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 37620, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'volvo-v60-2018', 'brand': 'Volvo', 'name': 'V60', 'v': 'Momentum T6 4x4 Geartronic (5d) 310pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 171, 'power': 228, 'acc': 5.8, 'koffer': 529, 'cilinder': 1969, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 47450, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'D', 'id': 'hyundai-ioniq-hybrid', 'brand': 'Hyundai', 'name': 'IONIQ Hybrid', 'v': 'Premium 1.6 GDi ISG DCT (5d) 141pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 79, 'power': 77, 'acc': 10.8, 'koffer': 550, 'cilinder': 1580, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 80, 'price': 27499, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'E', 'id': 'audi-a6', 'brand': 'Audi', 'name': 'A6', 'v': 'Design S tronic 40 TDI (4d)', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 100, 'acc': 8.1, 'koffer': 530, 'cilinder': 1968, 'bat': 0, 'tank': 63, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 53250, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'bmw-5-benz', 'brand': 'BMW', 'name': '520i Berline', 'v': '135kW Aut. (4d) 184pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 135, 'acc': 7.8, 'koffer': 530, 'cilinder': 1998, 'bat': 0, 'tank': 68, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 51100, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'bmw-5-dies', 'brand': 'BMW', 'name': '520d Berline', 'v': '140kW aut. (4d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 140, 'acc': 7.5, 'koffer': 530, 'cilinder': 1995, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 51900, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'mercedes-e', 'brand': 'Mercedes-Benz', 'name': 'E-klasse Berline', 'v': 'E250 (4d) 184pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 132, 'power': 135, 'acc': 6.9, 'koffer': 540, 'cilinder': 1991, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 69, 'price': 49973, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'skoda-superb', 'brand': '&Scaron;koda', 'name': 'Superb', 'v': 'Ambition 2.0 CRTDI 140kW  (5d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 140, 'acc': 8.4, 'koffer': 625, 'cilinder': 1968, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 35175, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'volvo-s90-t6-momentum', 'brand': 'Volvo', 'name': 'S90', 'v': 'Momentum T4 Geartronic  (4d) 190pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 155, 'power': 140, 'acc': 8.7, 'koffer': 537, 'cilinder': 1969, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 48550, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'E', 'id': 'volvo-v90-t6-awd-r-design', 'brand': 'Volvo', 'name': 'V90', 'v': 'Momentum D4 Geartronic  (5d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 140, 'acc': 8.5, 'koffer': 560, 'cilinder': 1969, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 52150, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'F', 'id': 'bmw-7-benz', 'brand': 'BMW', 'name': '740i Berline', 'v': '(240 kW) (4d) 326pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 240, 'acc': 5.5, 'koffer': 515, 'cilinder': 2998, 'bat': 0, 'tank': 78, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 96300, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'F', 'id': 'bmw-7-dies', 'brand': 'BMW', 'name': '740d Berline', 'v': 'xDrive (4d) 320pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 156, 'power': 235, 'acc': 5.2, 'koffer': 515, 'cilinder': 2993, 'bat': 0, 'tank': 78, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 100400, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'F', 'id': 'porsche-panamera-benz', 'brand': 'Porsche', 'name': 'Panamera', 'v': '3.0 V6 4 330pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 243, 'acc': 5.5, 'koffer': 495, 'cilinder': 2995, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 97986, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'F', 'id': 'porsche-panamera-dies', 'brand': 'Porsche', 'name': 'Panamera', 'v': '4.0 4s 422pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 176, 'power': 310, 'acc': 4.5, 'koffer': 495, 'cilinder': 3956, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 122670, 'bonus': 0, 'pk': 20, 'image': true },
{ 'segment': 'K', 'id': 'citroen-berlingo-multispace', 'brand': 'Citro&euml;n', 'name': 'Berlingo Multispace', 'v': 'Shine 1.5 BlueHDi 130 EAT8 S&S XTR M (5d) 130pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 113, 'power': 96, 'acc': 12.3, 'koffer': 597, 'cilinder': 1499, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 29460, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'fiat-doblo-benz', 'brand': 'Fiat', 'name': 'Dobl&ograve;', 'v': 'Easy 1.4 T-Jet (5d) 120pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 169, 'power': 88, 'acc': 12.3, 'koffer': 790, 'cilinder': 1368, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 18690, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'nissan-nv-200', 'brand': 'Nissan', 'name': 'NV200 Combi', 'v': 'DSD 1.5 dCi 66kW PRO 7S (5d) 90pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 133, 'power': 66, 'acc': 0, 'koffer': 0, 'cilinder': 1468, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 21120, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'peugeot-partner-tepee', 'brand': 'Peugeot', 'name': 'Partner tepee', 'v': 'Active 1.2 PureTech 81kW S/S (5d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 119, 'power': 81, 'acc': 12.2, 'koffer': 675, 'cilinder': 1199, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 19925, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'K', 'id': 'renault-kangoo', 'brand': 'Renault', 'name': 'Kangoo Energy', 'v': 'dCi 90 Limited (5d) 90pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 66, 'acc': 13.3, 'koffer': 660, 'cilinder': 1461, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 16400, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'K', 'id': 'vw-caddy-diesel', 'brand': 'Volkswagen', 'name': 'Caddy', 'v': 'Trendline 2.0 CRTDi 75kW SCR BMT DSG (5d) 102pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 131, 'power': 75, 'acc': 13, 'koffer': 190, 'cilinder': 1968, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 23730, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'bmw-2', 'brand': 'BMW', 'name': '220d Active Tourer ', 'v': '(140kW) (5d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 117, 'power': 140, 'acc': 7.6, 'koffer': 468, 'cilinder': 1995, 'bat': 0, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 35700, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'fiat-500l-benz', 'brand': 'Fiat', 'name': '500L', 'v': 'Business 1.3 Mjet 95CH/PK MTA (5d) 95pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 104, 'power': 70, 'acc': 14.8, 'koffer': 412, 'cilinder': 1248, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 22000, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'mercedes-b', 'brand': 'Mercedes-Benz', 'name': 'B-klasse', 'v': 'B2020 d 120kW (5d) 163pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 107, 'power': 120, 'acc': 8.3, 'koffer': 488, 'cilinder': 2143, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 37389, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'renault-grand-scenic', 'brand': 'Renault', 'name': 'Grand Sc&eacute;nic', 'v': 'Intens TCe 140 EDC GPF 7P (5d) 140pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 103, 'acc': 10.5, 'koffer': 189, 'cilinder': 1332, 'bat': 0, 'tank': 53, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 30225, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'MPV-Comp', 'id': 'vw-touran', 'brand': 'Volkswagen', 'name': 'Touran', 'v': 'Trendline 1.4 TSi 110kW DSG  (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 110, 'acc': 8.9, 'koffer': 834, 'cilinder': 1395, 'bat': 0, 'tank': 58, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 28880, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-B', 'id': 'citroen-c3-aircross', 'brand': 'Citro&euml;n', 'name': 'C3 Aircross', 'v': 'Shine 1.2 PureTech 110 S&S EAT6 (5d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 126, 'power': 81, 'acc': 10.6, 'koffer': 410, 'cilinder': 1199, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 22205, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'SUV-B', 'id': 'dacia-duster', 'brand': 'Dacia', 'name': 'Duster', 'v': 'Comfort 1.5 dCi 110 EDC (5d) 109pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 116, 'power': 80, 'acc': 11.9, 'koffer': 445, 'cilinder': 1461, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 18700, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-C', 'id': 'kia-niro', 'brand': 'Kia', 'name': 'Niro', 'v': 'Fusion 1.6 GDi HEV 6DCT (5d) 141pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 101, 'power': 104, 'acc': 11.5, 'koffer': 427, 'cilinder': 1580, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 75, 'price': 30040, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'SUV-B', 'id': 'opel-crossland-x', 'brand': 'Opel', 'name': 'Crossland X', 'v': 'Innovation 1.2 81kW Turbo S/S Auto (5d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 81, 'acc': 11.8, 'koffer': 410, 'cilinder': 1199, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 22600, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'SUV-B', 'id': 'opel-mokka-x', 'brand': 'Opel', 'name': 'Mokka X', 'v': '1.6 CDTI Aut. Innovation (5d) 136pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 143, 'power': 100, 'acc': 10.9, 'koffer': 356, 'cilinder': 1598, 'bat': 0, 'tank': 52, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 29150, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-benz', 'brand': 'Peugeot', 'name': '2008', 'v': 'Line 1.2 Puretech 81kW S&S EAT6 GT (5d) 110pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 81, 'acc': 11.6, 'koffer': 410, 'cilinder': 1199, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 24795, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'SUV-B', 'id': 'peugeot-2008-dies', 'brand': 'Peugeot', 'name': '2008', 'v': 'Line 1.5 BlueHDi 88kW EAT6 GT(5d) 120pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 105, 'power': 88, 'acc': 10.4, 'koffer': 410, 'cilinder': 1499, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 26540, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-B', 'id': 'renault-captur-benz', 'brand': 'Renault', 'name': 'Captur', 'v': 'Energy TCi 150 EDC S-Edition (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 118, 'power': 110, 'acc': 9.2, 'koffer': 455, 'cilinder': 1332, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 72, 'price': 25600, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'SUV-B', 'id': 'renault-captur-dies', 'brand': 'Renault', 'name': 'Captur', 'v': 'Intens dCi 90 EDC (5d) 90pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 112, 'power': 66, 'acc': 13.8, 'koffer': 455, 'cilinder': 1461, 'bat': 0, 'tank': 45, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 24800, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-B', 'id': 'toyota-c-hr', 'brand': 'Toyota', 'name': 'C-HR', 'v': 'C-Business Plus 1.8 VVT i-Hybrid Aut. (5d) 122pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 86, 'power': 90, 'acc': 11, 'koffer': 377, 'cilinder': 1798, 'bat': 0, 'tank': 43, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 78, 'price': 30290, 'bonus': 0, 'pk': 10, 'image': true },
{ 'segment': 'SUV-B', 'id': 'vw-t-roc', 'brand': 'Volkswagen', 'name': 'T-Roc', 'v': 'Style 1.5 TSI ACT DSG  (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 123, 'power': 110, 'acc': 8.4, 'koffer': 445, 'cilinder': 1498, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 27410, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona', 'brand': 'Hyundai', 'name': 'Kona', 'v': '1.6 T-GDI 4WD Urban (5d) 177pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 130, 'acc': 7.9, 'koffer': 361, 'cilinder': 1591, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 67, 'price': 26349, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'SUV-C', 'id': 'audi-q2', 'brand': 'Audi', 'name': 'Q2', 'v': 'S Tronic Design 1.6 30 TDI 85kW (5d) 116pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 109, 'power': 85, 'acc': 10.5, 'koffer': 405, 'cilinder': 1598, 'bat': 0, 'tank': 50, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 30620, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'SUV-C', 'id': 'bmw-x1', 'brand': 'BMW', 'name': 'X1 sDrive', 'v': '18iA (103 kW) (5d) 140pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 133, 'power': 103, 'acc': 9.6, 'koffer': 505, 'cilinder': 1499, 'bat': 0, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 66, 'price': 33300, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-C', 'id': 'ford-kuga', 'brand': 'Ford', 'name': 'Kuga', 'v': '2.0 TDCi 4x2 88kW PS Business Class (5d) 120pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 164, 'power': 88, 'acc': 13.4, 'koffer': 406, 'cilinder': 1997, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 31875, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-C', 'id': 'kia-sportage', 'brand': 'Kia', 'name': 'Sportage', 'v': 'Sense 1.6 T AWD DCT7 (5d) 177pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 175, 'power': 130, 'acc': 9.1, 'koffer': 491, 'cilinder': 1591, 'bat': 0, 'tank': 62, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 36940, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'SUV-C', 'id': 'mini-countryman-s', 'brand': 'Mini', 'name': 'Countryman', 'v': 'SD ALL4 (140 kW) (5d) 190pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 127, 'power': 140, 'acc': 7.6, 'koffer': 450, 'cilinder': 1995, 'bat': 0, 'tank': 51, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 37900, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-C', 'id': 'nissan-qashqai-benz', 'brand': 'Nissan', 'name': 'Qashqai', 'v': 'Business Edition Xtronic 1.2 DIG-T (5d) 115pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 85, 'acc': 12.9, 'koffer': 430, 'cilinder': 1197, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 70, 'price': 28910, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'SUV-C', 'id': 'nissan-qashqai-dies', 'brand': 'Nissan', 'name': 'Qashqai', 'v': 'Business Edition Xtronic 1.6 dCi (5d) 130pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.7, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 96, 'acc': 11.1, 'koffer': 430, 'cilinder': 1598, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 32810, 'bonus': 0, 'pk': 9, 'image': true },
{ 'segment': 'SUV-C', 'id': 'opel-grandland-x', 'brand': 'Opel', 'name': 'Grandland X', 'v': 'Innovation 1.5 Turbo D S/S AT8 (5d) 131pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 96, 'acc': 12.3, 'koffer': 514, 'cilinder': 1499, 'bat': 0, 'tank': 53, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 32300, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-C', 'id': 'peugeot-3008', 'brand': 'Peugeot', 'name': '3008', 'v': 'Line 1.2 PureTech 96kW S&S Auto GT (5d) 130pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 120, 'power': 96, 'acc': 9.7, 'koffer': 520, 'cilinder': 1199, 'bat': 0, 'tank': 53, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 71, 'price': 35650, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'SUV-C', 'id': 'renault-kadjar', 'brand': 'Renault', 'name': 'Kadjar', 'v': 'Intens 1.5 Energy dCi 110 EDC (5d) 110pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 3.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 99, 'power': 81, 'acc': 11.7, 'koffer': 472, 'cilinder': 1461, 'bat': 0, 'tank': 55, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 30350, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-benz', 'brand': 'Volkswagen', 'name': 'Tiguan', 'v': 'Comfortline 1.4 TSI 110kW DSG 4Motion (5d) 150pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 6.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 153, 'power': 110, 'acc': 9.2, 'koffer': 615, 'cilinder': 1395, 'bat': 0, 'tank': 58, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 65, 'price': 34200, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-C', 'id': 'vw-tiguan-dies', 'brand': 'Volkswagen', 'name': 'Tiguan', 'v': 'Comfortline 2.0 TDI SCR 110kW DSG (5d) 150pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 125, 'power': 110, 'acc': 9.3, 'koffer': 615, 'cilinder': 1968, 'bat': 0, 'tank': 58, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 37930, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-D', 'id': 'audi-q5', 'brand': 'Audi', 'name': 'Q5', 'v': 'S Tronic Quattro 2.0 TDi 120kW (5d) 163pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 129, 'power': 120, 'acc': 8.9, 'koffer': 550, 'cilinder': 1968, 'bat': 0, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 48190, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-D', 'id': 'bmw-x3', 'brand': 'BMW', 'name': 'X3 xDrive20i', 'v': '(135 kW) (5d) 184pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 163, 'power': 135, 'acc': 8.3, 'koffer': 550, 'cilinder': 1998, 'bat': 0, 'tank': 65, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 46600, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-benz', 'brand': 'Mercedes-Benz', 'name': 'GLC 250', 'v': 'MATIC (5d) 211pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 155, 'acc': 7.3, 'koffer': 550, 'cilinder': 1991, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 60, 'price': 47432, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-D', 'id': 'mercedes-glc-dies', 'brand': 'Mercedes-Benz', 'name': 'GLC 250', 'v': 'd 4MATIC (5d) 204pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 161, 'power': 150, 'acc': 7.6, 'koffer': 550, 'cilinder': 2143, 'bat': 0, 'tank': 66, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 56, 'price': 49731, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-D', 'id': 'peugeot-5008-benz', 'brand': 'Peugeot', 'name': '5008', 'v': 'Allure 1.2 PureTech 96kW S&S EAT8 (5d) 130pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 5.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 122, 'power': 96, 'acc': 10.2, 'koffer': 780, 'cilinder': 1199, 'bat': 0, 'tank': 56, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 68, 'price': 34550, 'bonus': 0, 'pk': 7, 'image': true },
{ 'segment': 'SUV-D', 'id': 'peugeot-5008-dies', 'brand': 'Peugeot', 'name': '5008', 'v': 'Allure 1.5 BlueHDi 96kW S&S EAT8 (5d) 130pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 4.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 108, 'power': 96, 'acc': 11.8, 'koffer': 780, 'cilinder': 1499, 'bat': 0, 'tank': 56, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 62, 'price': 36200, 'bonus': 0, 'pk': 8, 'image': true },
{ 'segment': 'SUV-D', 'id': 'volvo-xc60-t5-momentum', 'brand': 'Volvo', 'name': 'xC60', 'v': 'Momentum T5 Geartronic(5d) 250pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.1, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 166, 'power': 184, 'acc': 6.8, 'koffer': 505, 'cilinder': 1969, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 50650, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'jaguar-f-pace-benz', 'brand': 'Jaguar', 'name': 'F-Pace', 'v': 'Prestige 2.0 184kW 4x4 Aut. (5d) 250pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.4, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 170, 'power': 184, 'acc': 6.8, 'koffer': 650, 'cilinder': 1997, 'bat': 0, 'tank': 63, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 64, 'price': 55560, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'jaguar-f-pace-dies', 'brand': 'Jaguar', 'name': 'F-Pace', 'v': 'Prestige 2.0D 132kW 4x4 Aut. (5d) 180pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 139, 'power': 132, 'acc': 8.7, 'koffer': 650, 'cilinder': 1999, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 53060, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-velar-benz', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'P250 2.0 (5d) 250pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 7.6, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 173, 'power': 184, 'acc': 6.7, 'koffer': 558, 'cilinder': 1997, 'bat': 0, 'tank': 63, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 63, 'price': 57300, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-velar-dies', 'brand': 'Land', 'name': 'Rover Range Rover Velar', 'v': 'D240 2.0 (5d) 240pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.8, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 154, 'power': 177, 'acc': 7.3, 'koffer': 558, 'cilinder': 1999, 'bat': 0, 'tank': 60, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 61600, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'audi-q7', 'brand': 'Audi', 'name': 'Q7', 'v': 'Quattro triptronic 3.0 45 TDI 170kW (5d) 231pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 5.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 144, 'power': 170, 'acc': 7.1, 'koffer': 890, 'cilinder': 2967, 'bat': 0, 'tank': 85, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 61, 'price': 61080, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'bmw-x5', 'brand': 'BMW', 'name': 'X5 xDrive 40i', 'v': '(250 kW) (5d) 340pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 8.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 193, 'power': 250, 'acc': 5.5, 'koffer': 645, 'cilinder': 2998, 'bat': 0, 'tank': 83, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 70700, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'porsche-cayenne', 'brand': 'Porsche', 'name': 'Cayenne', 'v': '3.0 (5d) 340pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 9, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 205, 'power': 250, 'acc': 6.2, 'koffer': 770, 'cilinder': 2995, 'bat': 0, 'tank': 75, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 59, 'price': 77779, 'bonus': 0, 'pk': 15, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-t6-momentum-benz', 'brand': 'Volvo', 'name': 'XC90', 'v': 'Momentum 2.0 T6 4WD Geartronic 5PL. (5d) 310pk', 'fuel': 'benz', 'verbrEl': 0, 'verbrBr': 8.3, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 192, 'power': 228, 'acc': 6.5, 'koffer': 721, 'cilinder': 1969, 'bat': 0, 'tank': 71, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 58, 'price': 68100, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'volvo-xc90-t6-momentum-dies', 'brand': 'Volvo', 'name': 'XC90', 'v': 'Momentum 2.0 D5 4WD Geartronic 5PL. (5d) 235pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.2, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 162, 'power': 173, 'acc': 7.8, 'koffer': 721, 'cilinder': 1969, 'bat': 0, 'tank': 71, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 64800, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'SUV-EF', 'id': 'land-rover-range-rover-sport', 'brand': 'Land', 'name': 'Rover Range Rover Sport', 'v': '2.0 SD4 SE (5d) 240pk', 'fuel': 'dies', 'verbrEl': 0, 'verbrBr': 6.5, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 172, 'power': 177, 'acc': 8.3, 'koffer': 489, 'cilinder': 1999, 'bat': 0, 'tank': 72, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 57, 'price': 69200, 'bonus': 0, 'pk': 11, 'image': true },
{ 'segment': 'B', 'id': 'renault-zoe-1', 'brand': 'Renault', 'name': 'ZOE (batterijhuur)', 'v': 'Limited#2 Quick Charge B-rent (5d) 109pk', 'fuel': 'ev', 'verbrEl': 14.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 65, 'acc': 12.2, 'koffer': 338, 'cilinder': 0, 'bat': 41, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 27650, 'bonus': 3500, 'pk': 4, 'image': true,'blc':zoeZELease },
{ 'segment': 'K', 'id': 'renault-kangoo-ze-maxi-2', 'brand': 'Renault', 'name': 'Kangoo Z.E. Maxi (batterijhuur)', 'v': '5 pl. ZE 33 B-rent', 'fuel': 'ev', 'verbrEl': 18.8, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 44, 'acc': 22.4, 'koffer': 1300, 'cilinder': 0, 'bat': 33, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 86, 'price': 24100, 'bonus': 3500, 'pk': 4, 'image': true,'blc':kangooZELease },
{ 'segment': 'SUV-EF', 'id': 'audi-etron', 'brand': 'Audi', 'name': 'e-tron', 'v': '0', 'fuel': 'ev', 'verbrEl': 17, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 300, 'acc': 5.7, 'koffer': 660, 'cilinder': 0, 'bat': 95, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 85, 'price': 82400, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'D', 'id': 'tesla-model3-longrange', 'brand': 'Tesla', 'name': 'Model 3', 'v': 'Long Range AWD', 'fuel': 'ev', 'verbrEl': 12.1, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 258, 'acc': 4.8, 'koffer': 425, 'cilinder': 0, 'bat': 79, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 88, 'price': 58800, 'bonus': 2500, 'pk': 4, 'image': true },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-ev-39', 'brand': 'Hyundai', 'name': 'KONA Electric 39 kWh', 'v': '136pk (39kWh) EV Urban ', 'fuel': 'ev', 'verbrEl': 11.4, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.7, 'koffer': 544, 'cilinder': 0, 'bat': 39.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 40499, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'SUV-B', 'id': 'hyundai-kona-ev-64', 'brand': 'Hyundai', 'name': 'KONA Electric 64 kWh', 'v': '204pk (64kWh) EV Urban ', 'fuel': 'ev', 'verbrEl': 11.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.6, 'koffer': 544, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 44999, 'bonus': 2500, 'pk': 4, 'image': true },
{ 'segment': 'SUV-D', 'id': 'hyundai-nexo-fcev', 'brand': 'Hyundai', 'name': 'Nexo FCEV', 'v': '0', 'fuel': 'fcev', 'verbrEl': 0, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 1, 'co2': 0, 'power': 119, 'acc': 9.2, 'koffer': 461, 'cilinder': 0, 'bat': 0, 'tank': 0, 'tankcng': 0, 'tankfcev': 6, 'ecoscore': 79, 'price': 74999, 'bonus': 2000, 'pk': 4, 'image': true },
{ 'segment': 'SUV-C', 'id': 'kia-niro-ev-39', 'brand': 'KIA', 'name': 'e-Niro 39 kWh', 'v': '0', 'fuel': 'ev', 'verbrEl': 11.3, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 100, 'acc': 9.8, 'koffer': 451, 'cilinder': 0, 'bat': 39.2, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 36444, 'bonus': 3500, 'pk': 4, 'image': true },
{ 'segment': 'SUV-C', 'id': 'kia-niro-ev-64', 'brand': 'KIA', 'name': 'e-Niro 64 kWh', 'v': '0', 'fuel': 'ev', 'verbrEl': 11.7, 'verbrBr': 0, 'verbrCNG': 0, 'verbrFCEV': 0, 'co2': 0, 'power': 150, 'acc': 7.8, 'koffer': 451, 'cilinder': 0, 'bat': 64, 'tank': 0, 'tankcng': 0, 'tankfcev': 0, 'ecoscore': 87, 'price': 40215, 'bonus': 3500, 'pk': 4, 'image': true }
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
				cptCarBoxHtml.push('<div class="car col-md-4 col-xs-6" id="' + carsLeft[i].id + '"> <h4>Selecteren als eerste wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '-32.png" width="250" /> <h2>' + carsLeft[i].brand + ' ' + carsLeft[i].name + '</h2> <h3>' + carsLeft[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsLeft[i].fuel) + '">' + drivetrainToString(carsLeft[i].fuel,'') + '</span> <span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsLeft[i].price,0) + ',-</span></p> </div>');					 
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
				allCarBoxHtml.push('<div class="car col-md-4 col-xs-6" id="' + carsRight[i].id + '"> <h4>Selecteren als tweede wagen</h4> <img src="assets/img/cars/' + tempCarSrc + '-32.png" width="250" /> <h2>' + carsRight[i].brand + ' ' + carsRight[i].name + '</h2> <h3>' + carsRight[i].v + '</h3> <p><span class="car-drivetrain-' + fuelToFuelType(carsRight[i].fuel) + '">' + drivetrainToString(carsRight[i].fuel,'') + '</span> <span class="car-price"><span class="glyphicon glyphicon-tag"></span> Prijs &euro; ' + addCommas(carsRight[i].price,0) + ',-</span></p> </div>');					 
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
 	  case 'fcev':
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

function fuelToFuelType(str) {
	var terms = '';
	switch(str) {
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
	this.drivetrain = that.fuel; // ev | benz | dies | phev | cng | fcev
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
	this.model = that.model; // Personenwagen | Bestelwagen
	if (typeof this.model == 'undefined') this.model = 'Personenwagen';
	this.batterylease = that.blc; // PY inclusief BTW
	if (typeof this.batterylease == 'undefined') this.batterylease = new blc(); 
	this.fiscalePK = that.pk; // fiscale PK
	if (typeof this.fiscalePK == 'undefined') this.fiscalePK = 0;
	if(this.fuel == 'ev' || this.fuel == 'fcev') {
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
			rob *= 0.75; // Elektrische voertuigen hebben 75% minder kosten
		}
		return rob;
	}
	
	this.vaaCoef = function() {
		var co2Coef = 0;
		var diesRef = 86; // Diesel-CO2-referentie: 86 g/km per 1/1/2018
		var benzRef = 105; // Benzine-CO2-referentie: 105 g/km per 1/1/2018
		if (this.drivetrain == 'ev' || this.drivetrain == 'fcev') {
			co2Coef = 0.04;
		} else if (this.drivetrain == 'dies') {
			co2Coef = 0.055 + (this.co2 - diesRef) * 0.001;
		} else { // Benzine, cng, lpg
			co2Coef = 0.055 + (this.co2 - benzRef) * 0.001;
		}
		co2Coef = Math.min(Math.max(co2Coef,0.04),0.18);
		return co2Coef;
	}
	
	this.solidariteitsbijdragePY = function() { // Solidariteitsbijdrage per 1/1/2018
		var sol = 0;
		var solMinimum = 26.47; // Minimum bijdrage per maand
		var solIndex = 1.2708; // Gezondheidsindex per 1/1/2018
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
		if (this.drivetrain == 'ev' || this.drivetrain == 'fcev') {
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
	
	this.fiscaleAftrek2020 = function() {
		var fa = 1; // Voor EV
		if (this.drivetrain != 'ev' && this.drivetrain != 'fcev') {
			var bc = 1;
			if (this.drivetrain == 'benz') {
				bc = 0.95; 
			} else if (this.drivetrain == 'cng') {
				if (this.fiscalePK <= 11 ) {
					bc = 0.9;
				} else {
					bc = 0.95; 
				}
			}  else if (this.drivetrain == 'phev') {
				bc = 1; 
			}
			fa = Math.round(100*(1.2 - 0.005 * bc * this.co2)) / 100;
		}
		fa = Math.max(fa,0.5); // Minimum is 50%
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
	
	this.biv = function() { // BIV vanaf 1/7/2018
		var b = 0;
		if (this.drivetrain == 'ev' || this.drivetrain == 'fcev' || this.drivetrain == 'cng' || this.co2 <= 50) { 
			b = 0; // BIV is 0 euro voor ev, cng- en PHEV<50gCO2
		}
		else { // VÓÓR 2016: {(CO2 * f + x) / 250}^6 * (4.500 + c) * LC ; NA 2016: (BIV = [({CO2 * f + x}/ 246)6 * 4.500 + c] * LC )
			var LC = 1; // Leeftijdscorrectie: 1 bij nieuwe voertuigen
			var x = 27; // 0 in 2012, 4.5 in 2013, 9 in 2014, 13.5 in 2015, 18 in 2016, 22.5 in 2017 en 27 in 2018
			var bMinimum = 44.51; // minimum BIV-tarief vanaf 1 juli 2018 ; 40 in 2012
			var bMaximum = 11126.51; // maximum BIV-tarief vanaf 1 juli 2018 ; 10.000 in 2012

			var f = 1;
			if (this.drivetrain == 'lpg') f = 0.88;
			if (this.drivetrain == 'cng') f = 0.93; // Voor 100% aardgasvoertuigen 0.93; voor bi-fuel 0.744
			var c = 0;
			if (this.drivetrain == 'dies') { // bedragen per 1/7/2018
				if (this.euro == 0) { c = 3034.65; }
				else if (this.euro == 1) { c = 890.65; }
				else if (this.euro == 2) { c = 659.86; }
				else if (this.euro == 3) { c = 522.91; }
				else if (this.euro == 4) { c = 495.04; }
				else if (this.euro == 5) { c = 486.87; }
				else if (this.euro == 6) { c = 481.27; }
			}
			else { // Benzine, PHEV > 50g en LPG (Geen diesel)
				if (this.euro == 0) { c = 1206.99; }
				else if (this.euro == 1) { c = 539.79; }
				else if (this.euro == 2) { c = 161.41; }
				else if (this.euro == 3) { c = 101.25; }
				else if (this.euro == 4) { c = 24.3; }
				else if (this.euro == 5 || this.euro == 6) { c = 21.84; }
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
	
	this.vkbPY = function() { // Verkeersbelasting vanaf 1/7/2018
		var v = 0; 
		if (this.drivetrain == 'ev' || this.drivetrain == 'fcev' || this.drivetrain == 'cng' || this.co2 <= 50) { 
			v = 0; // Verkeersbelasting is 0 euro voor EV (en voor CNG- en PHEV-voertuigen (met 50 gram of minder) 0 gedurende 4 jaar)
		} else { // Andere brandstoffen en PHEV met > 50 g/km
			// Verkeersbelasting criterium 1: fiscale PK
			switch(this.fiscalePK) {  // vanaf 1/7/2018 INCLUSIEF OPDECIEM
				case 1 : case 2 : case 3 : 
				case 4 : v =   81.97; break;
				case 5 : v =  102.56; break;
				case 6 : v =  148.37; break;
				case 7 : v =  193.78; break;
				case 8 : v =  239.71; break;
				case 9 : v =  285.38; break;
				case 10: v =  330.79; break;
				case 11: v =  429.26; break;
				case 12: v =  527.74; break;
				case 13: v =  626.08; break;
				case 14: v =  724.55; break;
				case 15: v =  823.02; break; 
				case 16: v = 1078.04; break; 
				case 17: v = 1333.33; break; 
				case 18: v = 1588.49; break; 
				case 19: v = 1842.98; break; 
				default: v = 2098.14; 
			}
			if (this.fiscalePK > 20) { // Fiscale PK boven 21
				v = v + (this.fiscalePK - 20) * 114.31; // vanaf 1/7/2018
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
		entiteit = $('#input-entiteit').val();
		btwplicht = $('#input-btwplicht').val();
		gebruiksdoel = $('#input-gebruiksdoel').val();
		tankkaart = $('#input-tankkaart').val();
		
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
		if ( leftCar.drivetrain == 'ev' ) { $('#tco-popover-left-elektriciteit').show(); $('#tco-popover-left-waterstof').hide(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').hide(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'ev' ) { $('#tco-popover-right-elektriciteit').show(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( leftCar.drivetrain == 'fcev' ) { $('#tco-popover-left-elektriciteit').hide(); $('#tco-popover-left-waterstof').show(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').hide(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'fcev' ) { $('#tco-popover-right-elektriciteit').hide(); $('#tco-popover-right-waterstof').show(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( leftCar.drivetrain == 'cng' ) { $('#tco-popover-left-elektriciteit').hide(); $('#tco-popover-left-waterstof').hide(); $('#tco-popover-left-aardgas').show(); $('#tco-popover-left-benzine').show(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').hide(); $('#tco-popover-left-aardgasratio').show(); }
		if ( rightCar.drivetrain == 'cng' ) { $('#tco-popover-right-elektriciteit').hide(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').show(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').show(); }
		if ( leftCar.drivetrain == 'phev' ) { $('#tco-popover-left-elektriciteit').show(); $('#tco-popover-left-waterstof').hide(); $('#tco-popover-left-aardgas').hide(); $('#tco-popover-left-benzine').show(); $('#tco-popover-left-diesel').hide(); $('#tco-popover-left-phevratio').show(); $('#tco-popover-left-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'phev' ) { $('#tco-popover-right-elektriciteit').show(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').show(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'benz' ) { $('#tco-popover-right-elektriciteit').hide(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').show(); $('#tco-popover-right-diesel').hide(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
		if ( rightCar.drivetrain == 'dies' ) { $('#tco-popover-right-elektriciteit').hide(); $('#tco-popover-right-waterstof').hide(); $('#tco-popover-right-aardgas').hide(); $('#tco-popover-right-benzine').hide(); $('#tco-popover-right-diesel').show(); $('#tco-popover-right-phevratio').hide(); $('#tco-popover-right-aardgasratio').hide(); }
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
	term += verbruik[3] * waterstofprijs; // Bereken de waterstofkosten in € per 100km
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
	if (entiteit == 'np' || entiteit == 'vzw') { // Zero-emissiebonus voor nulemissievoertuigen
		term += car.zeroEmissieBonus;
	}
	if (car.drivetrain == 'cng') { // Aardgaspremie van KVBG (tot 29/1/2016)
		term -= 0;
	}
	if ( entiteit != 'np' && gebruiksdoel == 'bw') { // solidariteitsbijdrage 2016
		term += car.solidariteitsbijdragePY() * inflatieFactor;
		if (entiteit == 'vns') { // patronale bijdrage of werkgeversbijdrage
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
		var vaaMinimum = 1310; // Minimumbedrag per 1/1/2018
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
		
		var inputElektriciteitLeft = document.querySelector('.input-elektriciteit-left');
		var initElektriciteitLeft = new Powerange(inputElektriciteitLeft, { decimal: true, callback: changeOutputElektriciteitLeft, min: 0, max: 0.5, start: elektriciteitsprijs });
		function changeOutputElektriciteitLeft() { elektriciteitsprijs = parseFloat(inputElektriciteitLeft.value); $('#input-elektriciteit-left').val(addCommas(elektriciteitsprijs,2)); }
		
		var inputElektriciteitRight = document.querySelector('.input-elektriciteit-right');
		var initElektriciteitRight = new Powerange(inputElektriciteitRight, { decimal: true, callback: changeOutputElektriciteitRight, min: 0, max: 0.5, start: elektriciteitsprijs });
		function changeOutputElektriciteitRight() { elektriciteitsprijs = parseFloat(inputElektriciteitRight.value); $('#input-elektriciteit-right').val(addCommas(elektriciteitsprijs,2)); }
		
		var inputWaterstofLeft = document.querySelector('.input-waterstof-left');
		var initWaterstofLeft = new Powerange(inputWaterstofLeft, { decimal: true, callback: changeOutputWaterstofLeft, min: 5, max: 15, start: waterstofprijs, step: 0.1 });
		function changeOutputWaterstofLeft() { waterstofprijs = parseFloat(inputWaterstofLeft.value); $('#input-waterstof-left').val(addCommas(waterstofprijs,2)); }
		
		var inputWaterstofRight = document.querySelector('.input-waterstof-right');
		var initWaterstofRight = new Powerange(inputWaterstofRight, { decimal: true, callback: changeOutputWaterstofRight, min: 5, max: 15, start: waterstofprijs, step: 0.1 });
		function changeOutputWaterstofRight() { waterstofprijs = parseFloat(inputWaterstofRight.value); $('#input-waterstof-right').val(addCommas(waterstofprijs,2)); }
		
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
			initWaterstofLeft.setPosition(waterstofprijs*10.5); $('#input-waterstof-left').val(addCommas(waterstofprijs,2));
			initWaterstofRight.setPosition(waterstofprijs*10.5); $('#input-waterstof-right').val(addCommas(waterstofprijs,2));
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
		$('#tco-control-tankkaart').hide();

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
					$('#tco-control-tankkaart').slideDown();
				}
			}
			else { 
				$('#tco-control-verhoudingprive').hide();
				$('#tco-control-tankkaart').hide();
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