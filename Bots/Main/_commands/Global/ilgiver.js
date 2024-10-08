
const { PermissionsBitField } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class İlgiver extends Command {
    constructor(client) {
        super(client, {
            name: "İlgiver",
            description: "Bot'a eklenmiş olan komutları gösterir",
            usage: ".ilgiver",
            category: "Global",
            aliases: ["İlgiver","ilgi","ilgiver"],
            enabled: true,

            cooldown: 3500,

        });
    }
    
 async   onRequest (client, message, args,embed) {
        let iltifatlar = [
            "Sevmenin gücünün sınırı yoktur.",
            "Geldiğin yerde aşkı aramak zorunda değilsin. Ben senin için buradayım.",
            "Aşkın en büyük hediyesi, dokunduğu her şeyi kutsal kılma yeteneğidir.",
            "Kısa süre önce aşık olduğumuz insanlarla birlikte olmaktan duyduğumuz derin sevinç gizlenemez.",
            "Bir manzara olduğundan habersiz duruşun.",
            "Öpüyorum gökyüzü gibi bakan gözlerinden.",
            "Güneşi olmayan kalbe gökkuşağı açtırdın güzel insan.",
            "Sonra mucize diye bir şeyden bahsettiler. Gözlerin geldi aklıma.",
            "Biraz güler misin? İlaç alacak param yok da.",
            "Sen yeter ki çocukluk yap. Gönlümde salıncağın hazır.",
            "Dokunmadan sevmenin mümkün olduğunu senden öğrendim.",
            "Senin gülüşün benim en sevdiğim mevsim.",
            "Hayal ettiğim ne varsa seninle yaşamak istiyorum.",
            "Bazen öyle güzel gülüyorsun ki, bütün dünya kör olsun istiyorum.",
            "Mutluluk nedir dediler, yanında geçirdiğim anların anlamını anlatamadım.",
            "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
            "Etrafımda olduğunda başka bir şeye ihtiyacım olmuyor.",
            "Seni hak edecek ne yaptım bilmiyorum. Nasıl bu kadar şanslı olabilirim?",
            "Kahverengi gözlerinle gökyüzü gibi bakıyorsun.",
            "Sen olmadan nasıl var olacağımı bilmiyorum.",
            "Narinliğini gören kelebekler seni kıskanır.",
            "Geceyi aydınlatan ay misali senin parlayan gözlerin ışık saçıyor gönlüme.",
            "Güneşe gerek yok, gözlerindeki sıcaklık içimi ısıtıyor.",
            "Bir insanın gülüşünden cennet mi görünür? Bir gülüyorsun cennetten bir fragman yayınlanıyor sanki.",
            "Güneş mi doğdu yoksa sen mi uyandın?",
            "Sabahları görmek istediğim ilk şey sensin.",
            "Seni senden daha çok seviyorum anlasana.",
            "Hayatım tamamen senin üzerine kurulu.",
            "Gel de, kapında yatayım, git de, kölen olayım.",
            "Memoyla tanıştın mı? tanısan çok seversin ehehe",
            "Memo senle tanışmak için can atıyoorr",
            "Memo Seni Seviyoooo <31",
            "Gözlerinin renginde boğulmuşum ben.",
            "Burası huzur kokmuş buradan geçmişsin belli.",
            "Manzara seyretmek için gidilen bir yerde bile senden güzel bir görsel olamaz.",
            "Ne kadar fedakar olursanız olsun, adı gün gelir “yapmasaydın” olur.",
            "O kadar iyi bir arkadaşsın ki, tanıştığın herkes için mükemmel bir hediye gibisin.",
            "Su gibi duru güzelliğin karşısında dili tutulur tüm şairlerin.",
            "Sen daha önce hiç yazılamamış bir şiirin en güzel mısrası gibisin. Öyle gizlenmiş, kendine saklanmış, eşsiz.",
            "Kusursuz tavırların var. Korkunç kararlar verdiğimde beni yargılamadığın için sana minnettarım.",
            "Tek bir göz hareketiyle aklımı başımdan alan tek kadınsın.",
            "Ben senin kirpiklerinin rastgele dizildiğine inanmıyorum.",
            "Sen muhteşemin kelime anlamının tam karşılığısın.",
            "Bana şair diyorlar da senin şiir olduğunu göremiyorlar.",
            "Bir gülüşün etrafa ışıklar saçtığını sen de gördüm.",
            "Güzelliğini anlatacak kadar zengin bir lisan yok dünyada.",
            "Yaşanılacak en güzel mevsim sensin.",
            "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
            "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
            "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
            "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
            "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
            "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
            "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
            "Bir gamzen var sanki cennette bir çukur.",
            "Gecemi aydınlatan yıldızımsın.",
            "Ponçik burnundan ısırırım seni",
            "Bu dünyanın 8. harikası olma ihtimalin?",
            "fıstık naber?",
            "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
            "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
            "Müsaitsen aklım bu gece sende kalacak.",
            "Gemim olsa ne yazar liman sen olmadıktan sonra...",
            "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
            "Sabahları görmek istediğim ilk şey sensin.",
            "Mutluluk ne diye sorsalar, cevabı gülüşünde ve o sıcak bakışında arardım.",
            "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
            "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
            "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
            "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
            "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
            "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
            "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
            "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
            "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
            "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
            "Gülüşün ne güzel öyle, cumhuriyetin bir gelişi gibi sanki"
          ];
        const member = await message.mentions.members.first() ||await message.guild.members.cache.get(args[0]) || await message.member
        if(member){
           await message.delete()
message.channel.send({content:`${member}, ${iltifatlar[Math.floor(Math.random() * iltifatlar.length)]}`})
        }
    }
}

module.exports = İlgiver
