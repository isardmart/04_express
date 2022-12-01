const express =require('express')

const app =express()

const langlist= ['cat','af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'my', 'ca', 'ny', 'zh', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'fi', 'fr', 'fy', 'gd', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'he', 'hi', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'ky', 'ko', 'ku', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'ne', 'no', 'nb', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'sr', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'st', 'es', 'su', 'sw', 'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'ug', 'uk', 'ur', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu']

const langtext=['Hola Món','Hello Wêreld!', 'Përshendetje Botë!', 'ሰላም ልዑል!', 'مرحبا بالعالم!', 'Բարեւ աշխարհ!', 'Salam Dünya!', 'Kaixo Mundua!', 'Прывітанне Сусвет!', 'ওহে বিশ্ব!', 'Zdravo svijete!', 'Здравей свят!', 'မင်္ဂလာပါကမ္ဘာလောက!', 'Hola món!', 'Moni Dziko Lapansi!', '你好世界！', 'Hello World', 'Pozdrav svijete!', 'Ahoj světe!', 'Hej Verden!', 'Hallo Wereld!', 'Hello World!', 'Saluton mondo!', 'Tere, Maailm!', 'Hei maailma!', 'Bonjour le monde!', 'Hallo wrâld!', 'Hàlo a Shaoghail!', 'Ola mundo!', 'გამარჯობა მსოფლიო!', 'Hallo Welt!', 'Γειά σου Κόσμε!', 'હેલો વર્લ્ડ!', 'Bonjou mond!', 'Sannu Duniya!', 'שלום עולם!', 'हैलो वर्ल्ड!', 'Helló Világ!', 'Halló heimur!', 'Ndewo Ụwa!', 'Halo Dunia!', 'Dia duit Domhan!', 'Ciao mondo', '「こんにちは世界」', 'Halo jagad!', 'ಹಲೋ ವರ್ಲ್ಡ್!', 'Сәлем Әлем!', 'សួស្តី​ពិភពលោក!', 'Mwaramutse Isi!', 'Салам дүйнө!', '안녕하세요 세계!', 'Hello World!', 'ສະ​ບາຍ​ດີ​ຊາວ​ໂລກ!', 'Salve orbis terrarum!', 'Sveika pasaule!', 'Labas pasauli!', 'Moien Welt!', 'Здраво свету!', 'Hello World!', 'Hai dunia!', 'ഹലോ വേൾഡ്!', 'Hello dinja!', 'Kia ora Te Ao!', 'हॅलो वर्ल्ड!', 'Сайн уу ертөнц!', 'नमस्कार संसार!', 'Hei Verden!', 'Hei Verden!', 'ନମସ୍କାର ବିଶ୍ୱବାସି!', 'سلام نړی!', 'سلام دنیا!', 'Witaj świecie!', 'Olá Mundo!', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਦੁਨਿਆ!', 'Salut Lume!', 'Привет, мир!', 'Talofa lalolagi!', 'Здраво Свете!', 'Mhoro Nyika!', 'هيلو دنيا!', 'හෙලෝ වර්ල්ඩ්!', 'Ahoj svet!', 'Pozdravljen, svet!', 'Salaan World!', 'Lefatše Lumela!', 'Hola Mundo!', 'Halo Dunya!', 'Salamu, Dunia!', 'Hej världen!', 'Hello World!', 'Салом Ҷаҳон!', 'வணக்கம் உலகம்!', 'Сәлам, Дөнья!', 'హలో వరల్డ్!', 'สวัสดีชาวโลก!', 'Selam Dünya!', 'Salam dünýä!', 'ياخشىمۇسىز دۇنيا!', 'Привіт Світ!', 'ہیلو دنیا!', 'Salom Dunyo!', 'Chào thế giới!', 'Helo Byd!', 'Molo Lizwe!', 'העלא וועלט!', 'Mo ki O Ile Aiye!', 'Sawubona Mhlaba!']


app.listen(4040,()=>{
    console.log('serving my master port 4040')
})
app.get('/',(req,res)=>{
    res.send({ok:true,data:'Hello World!'})
})
app.get('/:lang',(req,res)=>{
    console.log(langlist.includes(req.params.lang.toLowerCase()))
    if (langlist.includes(req.params.lang.toLowerCase())){
        let idx=langlist.indexOf(req.params.lang.toLowerCase());
        res.send({ok:true,data:langtext[idx]})
    }
    res.send({ok:true,data:'Hello World!'})
})