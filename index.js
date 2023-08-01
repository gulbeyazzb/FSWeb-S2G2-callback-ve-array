const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const final2014 = fifaData.find((i) => {
  return i.Year === 2014 && i.Stage === "Final";
});
//console.log(final2014["Home Team Name"]);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

// console.log(final2014["Away Team Name"]);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

// console.log(final2014["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
// console.log(final2014["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/
let winner = "";
if (final2014["Home Team Goals"] > final2014["Away Team Goals"]) {
  winner = final2014["Home Team Name"];
} else {
  winner = final2014["Away Team Name"];
}
//console.log(winner);
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arrFifa) {
  const finals = arrFifa.filter((data) => {
    return data.Stage == "Final";
  });
  return finals;
}
//console.log(Finaller(fifaData));
/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arrFifa, callback) {
  const years = callback(arrFifa).map((year) => {
    return year.Year;
  });
  return years;
}
//console.log(Yillar(fifaData, Finaller));
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(arrFifa, callback) {
  const winners = callback(arrFifa).map((winner) => {
    return winner["Home Team Goals"] > winner["Away Team Goals"]
      ? winner["Home Team Name"]
      : winner["Away Team Name"];
  });
  return winners;
}
//console.log(Kazananlar(fifaData, Finaller));
/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  arrFifa,
  cbk_finaller,
  cbk_yillar,
  cbk_kazananlar
) {
  const yillar = cbk_yillar(arrFifa, cbk_finaller);
  const ulkeler = cbk_kazananlar(arrFifa, cbk_finaller);
  let i = 0;
  const yillaraGoreKazananlar = yillar.reduce((total, yil) => {
    total.push(`${yil} yılında, ${ulkeler[i++]} dünya kupasını kazandı!`);
    return total;
  }, []);
  return yillaraGoreKazananlar;
}
// console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));
/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
  const gameCount = Finaller.length; // "Final" olarak oynanan tüm maç sayısı bir değişkene atanır.
  const totalGoals = Finaller.reduce((total, game) => {
    //reduce ile Final maçlarındaki gol sayıları bir değişkende toplanır.
    return total + game["Home Team Goals"] + game["Away Team Goals"];
  }, 0);
  const avarage = totalGoals / gameCount; //Toplam gol sayısı toplam maç sayısına bölünerek ortalaması bulunur.
  return avarage.toFixed(2); //Parantez içine belirtilen {2} değeri ile toFixed metodu küsüratlı sayıların virgülden sonra kaç hane gösterileceğini belirtmiş olur.
}
// console.log(OrtalamaGolSayisi(Finaller(fifaData)));
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function KazananKisaltmalari(arrFifa, callback) {
  const winners = callback(arrFifa).map((winner) => {
    return winner["Home Team Goals"] > winner["Away Team Goals"]
      ? winner["Home Team Initials"]
      : winner["Away Team Initials"];
  });
  return winners;
}
function UlkelerinKazanmaSayilari(data) {
  let result = {};
  for (let i = 0; i < data.length; i++) {
    if (result[data[i]] == undefined) {
      result[data[i]] = 1;
    } else {
      result[data[i]] += 1;
    }
  }
  return result;
}
console.log(UlkelerinKazanmaSayilari(KazananKisaltmalari(fifaData, Finaller)));
/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
