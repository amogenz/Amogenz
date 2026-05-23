 ///////============================////
 //  DATABASE NAHWU AMOGENZ AL-FIYAH ////
 ///////============================////
 
export const AMOGENZ_DB_ALFIYAH = [
// ISIM //
  {
"id_kalimat": "amogenz_kalimat_001",
"teks_kalimat": "ما زال زيد طالبا",
"analysis": [
{
"id_lafadz": "amogenz_lafadz_001",
"word": "ما",
"steps": {
"1": { "question": "Apa jenis Lafadz ما?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Ma di sini adalah Ma Nafyi yang tidak memiliki tanda-tanda khusus Isim maupun Fi'il." },
"2": { "question": "Apa tanda/alasan lafadz ما disebut Huruf?", "options": ["Kemasukan Tanwin", "Tidak menerima tanda Isim dan Fi'il", "Menunjukkan waktu"], "correct": "Tidak menerima tanda Isim dan Fi'il", "explanation": "Huruf didefinisikan sebagai kata yang tidak layak disandingkan dengan tanda isim maupun fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz ما disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين والندا وأل", "فعل مضارع يلي لم كيشم"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Bait ini menjelaskan bahwa huruf adalah kata yang selain isim dan fi'il." },
"4": { "question": "Status lafadz ما itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Seluruh huruf dalam kaidah Nahwu berstatus Mabni." },
"5": { "question": "Mengapa lafadz ما berstatus Mabni?", "options": ["Karena termasuk Isim Isyarah", "Karena asalnya huruf adalah mabni", "Karena serupa dengan fi'il"], "correct": "Karena asalnya huruf adalah mabni", "explanation": "Kaidah fundamental menyatakan 'Wa kullu harfin mustahiqqun lil bina'." },
"6": { "question": "Apa nadhom/syahidnya lafadz ما berstatus Mabni?", "options": ["والاسم منه معرب ومبني", "وكل حرف مستحق للبنا", "ومنه معرب ومبني كأين"], "correct": "وكل حرف مستحق للبنا", "explanation": "Bait ini menegaskan bahwa setiap huruf berhak atas kemabnian." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz ما?", "options": ["Mabni 'ala Sukun", "Mabni 'ala Fathah", "Mabni 'ala Kasrah"], "correct": "Mabni 'ala Sukun", "explanation": "Huruf mad (Alif) di akhir kata 'Ma' dihukumi sukun." },
"8": { "question": "Apa alasan lafadz ما dihukumi Mabni 'ala Sukun?", "options": ["Karena merupakan huruf illat di akhir", "Karena amil jawazim", "Karena merupakan tanda asli mabni"], "correct": "Karena merupakan huruf illat di akhir", "explanation": "Kata yang diakhiri alif layyinah/mad secara default mabni di atas sukun." },
"9": { "question": "Apa nadhom/syahidnya lafadz ما dihukumi Mabni 'ala Sukun?", "options": ["والرفع والنصب اجعلن إعرابا", "والفصل بين الجملتين مستحسن", "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ كَأَيْنَ أَمْسِ حَيْثُ وَالسُّكُونُ أَصْلُ"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ كَأَيْنَ أَمْسِ حَيْثُ وَالسُّكُونُ أَصْلُ", "explanation": "Bait ini menyebutkan jenis-jenis bina' dan menegaskan sukun adalah asalnya (dasar) bina'." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz ما?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli raf'in", "Fi mahalli nashbin"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf nafyi tidak menempati posisi I'rob dalam struktur kalimat (tidak menjadi subjek/objek)." },
"11": { "question": "Mengapa lafadz ما tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena ia adalah Huruf", "Karena Isim Mufrad", "Karena Fi'il Madhi"], "correct": "Karena ia adalah Huruf", "explanation": "Karakteristik huruf adalah tidak memiliki kedudukan I'rob." },
"12": { "question": "Apa nadzom/syahidnya lafadz ما itu?", "options": ["وكل حرف مستحق للبنا", "فارفع بضم وانصبن فتحا", "والاسم قد خصص بالجر"], "correct": "وكل حرف مستحق للبنا", "explanation": "Bait ini mencakup prinsip bahwa huruf itu mabni dan secara implisit tidak memiliki mahal i'rob kecuali dalam kasus langka." }
}
},
{
"id_lafadz": "amogenz_lafadz_002",
"word": "زال",
"steps": {
"1": { "question": "Apa jenis Lafadz زال?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Fi'il", "explanation": "Zala menunjukkan perbuatan/kondisi dan terikat waktu (Madhi)." },
"2": { "question": "Apa tanda/alasan lafadz زال disebut Fi'il?", "options": ["Menerima Ta' Ta'nits Sakinah", "Bisa ditanwin", "Kemasukan Alif Lam"], "correct": "Menerima Ta' Ta'nits Sakinah", "explanation": "Bisa diucapkan 'Zaalat' (زالت), yang merupakan tanda khusus fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz زال disebut Fi'il?", "options": ["بتا فعلت وأتت ويا افعلي", "بالجر والتنوين", "سواهما الحرف"], "correct": "بتا فعلت وأتت ويا افعلي", "explanation": "Bait ini menjelaskan tanda fi'il melalui Ta' fail (Fa'alta) dan Ta' ta'nits (Atat)." },
"4": { "question": "Status lafadz زال itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Fi'il Madhi secara keseluruhan hukumnya adalah Mabni." },
"5": { "question": "Mengapa lafadz زال berstatus Mabni?", "options": ["Karena serupa dengan Isim", "Karena merupakan Fi'il Madhi", "Karena diawali huruf mudhoro'ah"], "correct": "Karena merupakan Fi'il Madhi", "explanation": "Asal dari fi'il madhi adalah mabni fathah selama tidak bertemu wau jama' atau dhomir rofa' mutaharrik." },
"6": { "question": "Apa nadhom/syahidnya lafadz زال berstatus Mabni?", "options": ["وفعل أمر ومضي بنيا", "وأعربوا مضارعا إن عري", "وكل حرف مستحق للبنا"], "correct": "وفعل أمر ومضي بنيا", "explanation": "Bait ini menegaskan bahwa Fi'il Amar dan Fi'il Madhi (Mudhi) adalah mabni." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz زال?", "options": ["Mabni 'ala Fathah", "Mabni 'ala Sukun", "Mabni 'ala Dhommah"], "correct": "Mabni 'ala Fathah", "explanation": "Zala adalah fi'il madhi yang tidak bersambung dengan dhomir apapun." },
"8": { "question": "Apa alasan lafadz زال dihukumi Mabni 'ala Fathah?", "options": ["Karena tidak bertemu dhomir mutaharrik", "Karena amil nashab", "Karena Isim Mufrad"], "correct": "Karena tidak bertemu dhomir mutaharrik", "explanation": "Fi'il madhi mabni fathah jika tidak bertemu dhomir rofa' mutaharrik atau wau jama'ah." },
"9": { "question": "Apa nadhom/syahidnya lafadz زال dihukumi Mabni 'ala Fathah?", "options": ["وماضي الأفعال بالتا مز", "وفعل أمر ومضي بنيا", "وانصب بفتحه مالم ينصرف"], "correct": "وفعل أمر ومضي بنيا", "explanation": "Syahid umum untuk kemabnian madhi, yang secara default adalah fathah." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz زال?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli rof'in", "Fi mahalli jazmin"], "correct": "La mahalla lahu minal I'rob", "explanation": "Fi'il madhi tidak memiliki kedudukan I'rob kecuali jika jatuh setelah amil jazm (syarat)." },
"11": { "question": "Mengapa lafadz زال tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena Fi'il Madhi", "Karena Isim Ghoiru Munshorif", "Karena Amil Nawasikh"], "correct": "Karena Fi'il Madhi", "explanation": "Pada dasarnya fi'il madhi adalah mabni yang tidak punya kedudukan i'rob." },
"12": { "question": "Apa nadzom/syahidnya lafadz زال itu?", "options": ["وفعل أمر ومضي بنيا", "ككان سيدا ذو اعتزال", "والرفع والنصب اجعلن إعرابا"], "correct": "ككان سيدا ذو اعتزال", "explanation": "Zala termasuk 'saudaranya' Kaana (Nawasikh) sebagaimana diisyaratkan dalam bab Kaana." }
}
},
{
"id_lafadz": "amogenz_lafadz_003",
"word": "زيد",
"steps": {
"1": { "question": "Apa jenis Lafadz زيد?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Zaidun adalah nama orang (Alam)." },
"2": { "question": "Apa tanda/alasan lafadz زيد disebut Isim?", "options": ["Tanwin", "Ta' Ta'nits", "Sukun"], "correct": "Tanwin", "explanation": "Lafadz Zaidun dapat menerima tanwin (Zaidun, Zaidan, Zaidin)." },
"3": { "question": "Apa nadhom/syahidnya lafadz زيد disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Tanwin adalah salah satu ciri utama isim menurut Alfiyah." },
"4": { "question": "Status lafadz زيد itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang bukan isim dhomir/isyarah umumnya mu'rob." },
"5": { "question": "Mengapa lafadz زيد berstatus Mu'rob?", "options": ["Karena tidak menyerupai huruf", "Karena menyerupai fi'il", "Karena diawali Ma"], "correct": "Karena tidak menyerupai huruf", "explanation": "Isim menjadi mu'rob jika ia selamat dari keserupaan dengan huruf (Ssyabah)." },
"6": { "question": "Apa nadhom/syahidnya lafadz زيد berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما من شبه الحرف كأرض وسما", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما من شبه الحرف كأرض وسما", "explanation": "Bait ini menjelaskan syarat isim mu'rob." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz زيد?", "options": ["Rafa'", "Nashab", "Jarr"], "correct": "Rafa'", "explanation": "Berposisi sebagai Isim Ma Zaala (saudara Kaana)." },
"8": { "question": "Apa alasan lafadz زيد dihukumi Rafa'?", "options": ["Sebagai Isim Ma Zaala", "Sebagai Fa'il", "Sebagai Mubtada"], "correct": "Sebagai Isim Ma Zaala", "explanation": "Zala adalah amil nawasikh yang merofa'kan isim." },
"9": { "question": "Apa nadhom/syahidnya lafadz زيد dihukumi Rafa'?", "options": ["ترفع كان المبتدا اسما لها", "وانصب بفتحه مالم ينصرف", "والرفع والنصب اجعلن إعرابا"], "correct": "ترفع كان المبتدا اسما لها", "explanation": "Kaana (dan saudaranya termasuk Ma Zaala) merofakan mubtada sebagai isimnya." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz زيد?", "options": ["Dhammah", "Fathah", "Wawu"], "correct": "Dhammah", "explanation": "Zaid adalah isim mufrad, maka tanda rofanya dengan dhommah." },
"11": { "question": "Mengapa lafadz زيد tandanya menggunakan Dhammah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Jamak Mudzakkar Salim"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad tanda i'rob rofa' aslinya adalah dhommah." },
"12": { "question": "Apa nadzom/syahidnya lafadz زيد itu?", "options": ["فارفع بضم وانصبن فتحا", "بالألف ارفع المثنى", "وارفع بواو وانصبن بالألف"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Menjelaskan tanda i'rob asli (Rofa' dengan dhommah)." }
}
},
{
"id_lafadz": "amogenz_lafadz_004",
"word": "طالبا",
"steps": {
"1": { "question": "Apa jenis Lafadz طالبا?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Thaliban adalah Isim Fa'il (nama pelaku/profesi)." },
"2": { "question": "Apa tanda/alasan lafadz طالبا disebut Isim?", "options": ["Tanwin", "Kemasukan Qad", "Jazm"], "correct": "Tanwin", "explanation": "Terdapat tanwin fathah di akhirnya." },
"3": { "question": "Apa nadhom/syahidnya lafadz طالبا disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت", "فعل مضارع يلي لم"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Tanwin adalah tanda isim." },
"4": { "question": "Status lafadz طالبا itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad mutasharrif." },
"5": { "question": "Mengapa lafadz طالبا berstatus Mu'rob?", "options": ["Tidak menyerupai huruf", "Karena isim nakirah", "Karena jatuh setelah isim"], "correct": "Tidak menyerupai huruf", "explanation": "Karena ia bukan dhomir, isyarah, atau isim mabni lainnya." },
"6": { "question": "Apa nadhom/syahidnya lafadz طالبا berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Bait yang menjelaskan definisi isim mu'rob." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz طالبا?", "options": ["Nashab", "Rafa'", "Jazm"], "correct": "Nashab", "explanation": "Berposisi sebagai Khabar Ma Zaala." },
"8": { "question": "Apa alasan lafadz طالبا dihukumi Nashab?", "options": ["Sebagai Khabar Ma Zaala", "Sebagai Maf'ul Bih", "Sebagai Hal"], "correct": "Sebagai Khabar Ma Zaala", "explanation": "Ma Zaala (saudara Kaana) menashobkan khobarnya." },
"9": { "question": "Apa nadhom/syahidnya lafadz طالبا dihukumi Nashab?", "options": ["وتنصب الخبر", "ترفع كان المبتدا اسما لها وتنصب الخبرا", "فارفع بضم وانصبن فتحا"], "correct": "ترفع كان المبتدا اسما لها وتنصب الخبرا", "explanation": "Kaana menashobkan khobar." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz طالبا?", "options": ["Fathah", "Ya", "Alif"], "correct": "Fathah", "explanation": "Isim mufrad tanda nashobnya dengan fathah." },
"11": { "question": "Mengapa lafadz طالبا tandanya menggunakan Fathah?", "options": ["Karena Isim Mufrad", "Karena Jamak Muannats Salim", "Karena Asmaul Khomsah"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad yang munshorif tanda nashobnya fathah." },
"12": { "question": "Apa nadzom/syahidnya lafadz طالبا itu?", "options": ["وانصبن فتحا", "فارفع بضم وانصبن فتحا", "اجعل لنحو يفعلان نونا"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Menjelaskan tanda nashob asli yaitu fathah." }
}
}
]
},
  {
"id_kalimat": "amogenz_kalimat_002",
"teks_kalimat": "الحمد لله",
"analysis": [
{
"id_lafadz": "amogenz_lafadz_005",
"word": "الحمد",
"steps": {
"1": { "question": "Apa jenis Lafadz الحمد?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz Al-Hamdu menunjukkan makna benda abstrak (pujian) dan tidak terikat waktu." },
"2": { "question": "Apa tanda/alasan lafadz الحمد disebut Isim?", "options": ["Kemasukan Al (Alif Lam)", "Kemasukan Tanwin", "Kemasukan Huruf Nida"], "correct": "Kemasukan Al (Alif Lam)", "explanation": "Lafadz tersebut diawali dengan Al-Ta'rif (Alif Lam)." },
"3": { "question": "Apa nadhom/syahidnya lafadz الحمد disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي", "سواهما الحرف كهل وفي ولم"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Bait ini menjelaskan tanda-tanda isim termasuk 'Al'." },
"4": { "question": "Status lafadz الحمد itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang tidak menyerupai huruf hukumnya mu'rob." },
"5": { "question": "Mengapa lafadz الحمد berstatus Mu'rob?", "options": ["Karena tidak serupa dengan huruf", "Karena kemasukan Al", "Karena berada di awal kalimat"], "correct": "Karena tidak serupa dengan huruf", "explanation": "Isim menjadi mu'rob jika selamat dari Syabah (keserupaan) dengan huruf." },
"6": { "question": "Apa nadhom/syahidnya lafadz الحمد berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Isim mu'rob adalah yang selamat dari keserupaan huruf seperti lafadz 'Ardh' dan 'Suma'." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz الحمد?", "options": ["Rafa'", "Nashab", "Jarr"], "correct": "Rafa'", "explanation": "Berposisi sebagai Mubtada (subjek di awal kalimat)." },
"8": { "question": "Apa alasan lafadz الحمد dihukumi Rafa'?", "options": ["Sebagai Mubtada", "Sebagai Fa'il", "Sebagai Khabar"], "correct": "Sebagai Mubtada", "explanation": "Mubtada adalah isim yang disepi dari amil lafdzi dan hukumnya rafa'." },
"9": { "question": "Apa nadhom/syahidnya lafadz الحمد dihukumi Rafa'?", "options": ["مبتدأ زيد وعاذر خبر", "ورفعوا مبتدأ بالابتدا", "ورفعك الاسم من بعد ما"], "correct": "ورفعوا مبتدأ بالابتدا", "explanation": "Ulama Nahwu merofa'kan mubtada karena amil ibtida'." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz الحمد?", "options": ["Dhammah", "Fathah", "Alif"], "correct": "Dhammah", "explanation": "Tanda rafa' asli untuk isim mufrad adalah dhammah." },
"11": { "question": "Mengapa lafadz الحمد tandanya menggunakan Dhammah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Asmaul Khomsah"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad yang munshorif menggunakan dhammah saat rafa'." },
"12": { "question": "apa nadzom/syahidnya lafadz الحمد itu tandanya menggunakan Dhammah?", "options": ["فارفع بضم وانصبن فتحا", "بالألف ارفع المثنى", "وارفع بواو وانصبن بالألف"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Rofa'lah dengan dhammah dan nashablah dengan fathah." }
}
},
{
"id_lafadz": "amogenz_lafadz_006",
"word": "لـ (في لله)",
"steps": {
"1": { "question": "Apa jenis Lafadz لـ?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Lam di sini adalah Lam Jarr (milik/peruntukan)." },
"2": { "question": "Apa tanda/alasan lafadz لـ disebut Huruf?", "options": ["Tidak menerima tanda isim/fi'il", "Bisa ditanwin", "Menunjukkan waktu"], "correct": "Tidak menerima tanda isim/fi'il", "explanation": "Huruf tidak memiliki tanda khusus selain ketidaklayakannya menerima tanda isim/fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz لـ disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين", "بتا فعلت"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Menjelaskan bahwa huruf adalah selain isim dan fi'il." },
"4": { "question": "Status lafadz لـ itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Semua huruf hukumnya mabni secara mutlak." },
"5": { "question": "Mengapa lafadz لـ berstatus Mabni?", "options": ["Karena merupakan huruf", "Karena serupa dengan isim", "Karena amil jarr"], "correct": "Karena merupakan huruf", "explanation": "Huruf memiliki hak untuk mabni (Mustahiqqun lil bina)." },
"6": { "question": "Apa nadhom/syahidnya lafadz لـ berstatus Mabni?", "options": ["وكل حرف مستحق للبنا", "والاسم منه معرب ومبني", "ومنه معرب ومبني كأين"], "correct": "وكل حرف مستحق للبنا", "explanation": "Setiap huruf berhak atas kemabnian." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz لـ?", "options": ["Mabni 'ala Kasrah", "Mabni 'ala Fathah", "Mabni 'ala Sukun"], "correct": "Mabni 'ala Kasrah", "explanation": "Lam jarr di sini dibaca 'Li'." },
"8": { "question": "Apa alasan lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["Karena harakat aslinya kasrah", "Karena mengikuti harakat Allah", "Karena amil"], "correct": "Karena harakat aslinya kasrah", "explanation": "Harakat bina' pada lam jarr tersebut adalah kasrah." },
"9": { "question": "Apa nadhom/syahidnya lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "والرفع والنصب اجعلن إعرابا", "فارفع بضم"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "explanation": "Menjelaskan macam-macam harakat mabni (Fathah, Kasrah, Dhammah)." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz لـ?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli jarrin", "Fi mahalli raf'in"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf tidak memiliki kedudukan dalam i'rob (mahal)." },
"11": { "question": "Mengapa lafadz لـ tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena merupakan huruf", "Karena isim mufrad", "Karena mabni"], "correct": "Karena merupakan huruf", "explanation": "Huruf tidak menduduki posisi struktur i'rob." },
"12": { "question": "apa nadzom/syahidnya lafadz لـ itu tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["وكل حرف مستحق للبنا", "والاسم قد خصص بالجر", "وانصب بفتحه"], "correct": "وكل حرف مستحق للبنا", "explanation": "Kaidah dasar kemabnian huruf berimplikasi pada ketiadaan mahal i'rob." }
}
},
{
"id_lafadz": "amogenz_lafadz_007",
"word": "الله",
"steps": {
"1": { "question": "Apa jenis Lafadz الله?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz Jalalah (Allah) adalah Isim Alam (nama)." },
"2": { "question": "Apa tanda/alasan lafadz الله disebut Isim?", "options": ["Kemasukan Huruf Jarr", "Kemasukan Qad", "Kemasukan Sin"], "correct": "Kemasukan Huruf Jarr", "explanation": "Lafadz Allah didahului oleh huruf jarr 'Lam'." },
"3": { "question": "Apa nadhom/syahidnya lafadz الله disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Jarr (Al-Jarru) adalah salah satu ciri isim." },
"4": { "question": "Status lafadz الله itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Lafadz Jalalah adalah isim yang berubah akhirnya karena amil." },
"5": { "question": "Mengapa lafadz الله berstatus Mu'rob?", "options": ["Karena tidak serupa huruf", "Karena merupakan nama", "Karena diawali Al"], "correct": "Karena tidak serupa huruf", "explanation": "Menjadi mu'rob karena tidak memiliki alasan kemabnian (syabah)." },
"6": { "question": "Apa nadhom/syahidnya lafadz الله berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Syarat isim mu'rob adalah selamat dari kemiripan huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz الله?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Karena didahului oleh huruf jarr Lam." },
"8": { "question": "Apa alasan lafadz الله dihukumi Jarr?", "options": ["Kemasukan Huruf Jarr", "Sebagai Mudhaf Ilaih", "Sebagai Na'at"], "correct": "Kemasukan Huruf Jarr", "explanation": "Huruf 'Lam' berfungsi men-jarr-kan isim setelahnya." },
"9": { "question": "Apa nadhom/syahidnya lafadz الله dihukumi Jarr?", "options": ["هاك حروف الجر وهي من إلى", "والاسم قد خصص بالجر", "ترفع كان المبتدا"], "correct": "هاك حروف الجر وهي من إلى", "explanation": "Bait ini menyebutkan daftar huruf jarr termasuk Lam (di bait selanjutnya)." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz الله?", "options": ["Kasrah", "Fathah", "Ya"], "correct": "Kasrah", "explanation": "Tanda jarr asli untuk isim mufrad adalah kasrah." },
"11": { "question": "Mengapa lafadz الله tandanya menggunakan Kasrah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Isim Ghoiru Munshorif"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad munshorif tanda jarr-nya adalah kasrah." },
"12": { "question": "apa nadzom/syahidnya lafadz الله itu tandanya menggunakan Kasrah?", "options": ["وَرُمْ بِكَسْرٍ نَحْوِ مَرَّ بِعَلِي", "وانصب بفتحه مالم ينصرف", "والرفع والنصب اجعلن إعرابا"], "correct": "وَرُمْ بِكَسْرٍ نَحْوِ مَرَّ بِعَلِي", "explanation": "Memberikan contoh jarr dengan kasrah pada isim." }
}
}
]
},
  {
"id_kalimat": "amogenz_kalimat_003",
"teks_kalimat": "العلم حرب للفتى المتعالي",
"analysis": [
{
"id_lafadz": "amogenz_lafadz_008",
"word": "العلم",
"steps": {
"1": { "question": "Apa jenis Lafadz العلم?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz tersebut menunjukkan kata benda abstrak (ilmu) dan tidak terikat waktu." },
"2": { "question": "Apa tanda/alasan lafadz العلم disebut Isim?", "options": ["Kemasukan Al (Alif Lam)", "Kemasukan Tanwin", "Kemasukan Sin"], "correct": "Kemasukan Al (Alif Lam)", "explanation": "Lafadz العلم diawali dengan Alif Lam Ta'rif." },
"3": { "question": "Apa nadhom/syahidnya lafadz العلم disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي", "سواهما الحرف كهل وفي ولم"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Bait ini menyebutkan tanda-tanda isim, salah satunya adalah Al (أل)." },
"4": { "question": "Status lafadz العلم itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang tidak menyerupai huruf maka hukumnya mu'rob." },
"5": { "question": "Mengapa lafadz العلم berstatus Mu'rob?", "options": ["Karena tidak serupa dengan huruf", "Karena kemasukan amil", "Karena berawalan Al"], "correct": "Karena tidak serupa dengan huruf", "explanation": "Isim menjadi mu'rob apabila selamat dari keserupaan dengan huruf (syabah)." },
"6": { "question": "Apa nadhom/syahidnya lafadz العلم berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما من شبه الحرف كأرض وسما", "والاسم منه معرب ومبني", "وكل حرف مستحق للبنا"], "correct": "ومعرب الأسماء ما قد سلما من شبه الحرف كأرض وسما", "explanation": "Isim mu'rob adalah yang selamat dari keserupaan huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz العلم?", "options": ["Rafa'", "Nashab", "Jarr"], "correct": "Rafa'", "explanation": "Berposisi sebagai Mubtada' karena berada di awal kalimat." },
"8": { "question": "Apa alasan lafadz العلم dihukumi Rafa'?", "options": ["Sebagai Mubtada'", "Sebagai Fa'il", "Sebagai Isim Kaana"], "correct": "Sebagai Mubtada'", "explanation": "Mubtada' adalah isim yang dirafa'kan oleh amil ibtida'." },
"9": { "question": "Apa nadhom/syahidnya lafadz العلم dihukumi Rafa'?", "options": ["ورفعوا مبتدأ بالابتدا", "مبتدأ زيد وعاذر خبر", "فارفع بضم وانصبن فتحا"], "correct": "ورفعوا مبتدأ بالابتدا", "explanation": "Ulama Nahwu merafa'kan mubtada' karena faktor ibtida' (permulaan)." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz العلم?", "options": ["Dhammah", "Fathah", "Alif"], "correct": "Dhammah", "explanation": "Isim mufrad yang mu'rob secara asli menggunakan dhammah untuk rafa'." },
"11": { "question": "Mengapa lafadz العلم tandanya menggunakan Dhammah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Isim Ghoiru Munshorif"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad sahih akhir tanda rafa'nya adalah dhammah." },
"12": { "question": "apa nadzom/syahidnya lafadz العلم itu tandanya menggunakan Dhammah?", "options": ["فارفع بضم وانصبن فتحا", "بالألف ارفع المثنى", "وارفع بواو وانصبن بالألف"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Kaidah tanda i'rob asli adalah rafa' dengan dhammah." }
}
},
{
"id_lafadz": "amogenz_lafadz_009",
"word": "حرب",
"steps": {
"1": { "question": "Apa jenis Lafadz حرب?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Harbun menunjukkan makna benda/sifat abstrak dan tidak terikat waktu." },
"2": { "question": "Apa tanda/alasan lafadz حرب disebut Isim?", "options": ["Kemasukan Tanwin", "Kemasukan Al", "Kemasukan Huruf Nida"], "correct": "Kemasukan Tanwin", "explanation": "Terdapat tanwin (dhammahtain) pada akhir kata tersebut." },
"3": { "question": "Apa nadhom/syahidnya lafadz حرب disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "فعل مضارع يلي لم"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Tanwin adalah salah satu ciri khas isim." },
"4": { "question": "Status lafadz حرب itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang dapat menerima tanwin dan berubah harakat akhirnya." },
"5": { "question": "Mengapa lafadz حرب berstatus Mu'rob?", "options": ["Karena tidak menyerupai huruf", "Karena merupakan khabar", "Karena isim nakirah"], "correct": "Karena tidak menyerupai huruf", "explanation": "Hukum asal isim adalah mu'rob selama tidak ada sebab yang membuatnya mabni (serupa huruf)." },
"6": { "question": "Apa nadhom/syahidnya lafadz حرب berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "لشبه من الحروف مدني", "وكل حرف مستحق للبنا"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Syarat mu'rob adalah selamat dari syabah huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz حرب?", "options": ["Rafa'", "Nashab", "Jarr"], "correct": "Rafa'", "explanation": "Berposisi sebagai Khabar dari mubtada' (العلم)." },
"8": { "question": "Apa alasan lafadz حرب dihukumi Rafa'?", "options": ["Sebagai Khabar", "Sebagai Na'at", "Sebagai Fa'il"], "correct": "Sebagai Khabar", "explanation": "Khabar adalah bagian kalimat yang menyempurnakan faedah mubtada' dan hukumnya rafa'." },
"9": { "question": "Apa nadhom/syahidnya lafadz حرب dihukumi Rafa'?", "options": ["كذاك خبر بالمبتدا", "ورفعوا مبتدأ بالابتدا", "ترفع كان المبتدا"], "correct": "كذاك خبر بالمبتدا", "explanation": "Demikian pula khabar dirafa'kan oleh mubtada'." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz حرب?", "options": ["Dhammah", "Kasrah", "Wawu"], "correct": "Dhammah", "explanation": "Tanda rafa' asli bagi isim mufrad adalah dhammah." },
"11": { "question": "Mengapa lafadz حرب tandanya menggunakan Dhammah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Isim Maqsur"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad tanda rafa'nya adalah dhammah lahiriyah." },
"12": { "question": "apa nadzom/syahidnya lafadz حرب itu tandanya menggunakan Dhammah?", "options": ["فارفع بضم وانصبن فتحا", "واجعل لنحو يفعلان نونا", "والرفع والنصب اجعلن إعرابا"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Bait tentang tanda i'rob asli." }
}
},
{
"id_lafadz": "amogenz_lafadz_010",
"word": "لـ",
"steps": {
"1": { "question": "Apa jenis Lafadz لـ?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Lam di sini adalah Lam Jarr." },
"2": { "question": "Apa tanda/alasan lafadz لـ disebut Huruf?", "options": ["Tidak menerima tanda isim/fi'il", "Kemasukan tanwin", "Bisa ditasrif"], "correct": "Tidak menerima tanda isim/fi'il", "explanation": "Karakteristik huruf adalah ketidakmampuannya menerima ciri isim maupun fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz لـ disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين", "بتا فعلت"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Definisi huruf dalam Alfiyah." },
"4": { "question": "Status lafadz لـ itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Seluruh huruf hukumnya mabni." },
"5": { "question": "Mengapa lafadz لـ berstatus Mabni?", "options": ["Karena merupakan huruf", "Karena amil", "Karena isim mufrad"], "correct": "Karena merupakan huruf", "explanation": "Huruf tidak mengalami perubahan akhir akibat perbedaan amil secara i'rob." },
"6": { "question": "Apa nadhom/syahidnya lafadz لـ berstatus Mabni?", "options": ["وكل حرف مستحق للبنا", "والاسم منه معرب ومبني", "ومنه معرب ومبني كأين"], "correct": "وكل حرف مستحق للبنا", "explanation": "Setiap huruf berhak menyandang status mabni." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz لـ?", "options": ["Mabni 'ala Kasrah", "Mabni 'ala Fathah", "Mabni 'ala Sukun"], "correct": "Mabni 'ala Kasrah", "explanation": "Lafadz ini diucapkan 'li'." },
"8": { "question": "Apa alasan lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["Harakat asli bina'-nya", "Karena setelahnya isim", "Karena amil jarr"], "correct": "Harakat asli bina'-nya", "explanation": "Lam jarr ini mabni di atas kasrah." },
"9": { "question": "Apa nadhom/syahidnya lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "والسكون أصل", "فارفع بضم"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "explanation": "Menyebutkan variasi harakat mabni." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz لـ?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli jarrin", "Fi mahalli nashbin"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf tidak memiliki kedudukan i'rob dalam susunan kalimat." },
"11": { "question": "Mengapa lafadz لـ tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena ia adalah huruf", "Karena isim mabni", "Karena amil nawasikh"], "correct": "Karena ia adalah huruf", "explanation": "Huruf berfungsi sebagai penghubung dan tidak menempati posisi subjek/objek dsb." },
"12": { "question": "apa nadzom/syahidnya lafadz لـ itu?", "options": ["وكل حرف مستحق للبنا", "والاسم قد خصص بالجر", "وانصب بفتحه"], "correct": "وكل حرف مستحق للبنا", "explanation": "Syahid umum kemabnian huruf." }
}
},
{
"id_lafadz": "amogenz_lafadz_011",
"word": "الفتى",
"steps": {
"1": { "question": "Apa jenis Lafadz الفتى?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Menunjukkan benda (pemuda/pemuda)." },
"2": { "question": "Apa tanda/alasan lafadz الفتى disebut Isim?", "options": ["Al (Alif Lam)", "Kemasukan Qad", "Huruf Jazm"], "correct": "Al (Alif Lam)", "explanation": "Terdapat Alif Lam di awalnya." },
"3": { "question": "Apa nadhom/syahidnya lafadz الفتى disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Al adalah ciri isim." },
"4": { "question": "Status lafadz الفتى itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim maqsur tetap dihukumi mu'rob secara taqdiri (perkiraan)." },
"5": { "question": "Mengapa lafadz الفتى berstatus Mu'rob?", "options": ["Karena tidak menyerupai huruf", "Karena kemasukan huruf jarr", "Karena isim mufrad"], "correct": "Karena tidak menyerupai huruf", "explanation": "Ia isim yang dapat menerima perubahan i'rob meskipun tanda-tandanya tidak nampak." },
"6": { "question": "Apa nadhom/syahidnya lafadz الفتى berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Definisi isim mu'rob." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz الفتى?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Karena didahului huruf jarr 'Lam'." },
"8": { "question": "Apa alasan lafadz الفتى dihukumi Jarr?", "options": ["Majrur bi al-harfi", "Sebagai Mudhaf Ilaih", "Sebagai Na'at"], "correct": "Majrur bi al-harfi", "explanation": "Lafadz tersebut dimasuki huruf jarr Lam (li)." },
"9": { "question": "Apa nadhom/syahidnya lafadz الفتى dihukumi Jarr?", "options": ["والاسم قد خصص بالجر كما", "هاك حروف الجر وهي من إلى", "بالجر والتنوين"], "correct": "والاسم قد خصص بالجر كما", "explanation": "Isim memiliki kekhususan i'rob jarr." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz الفتى?", "options": ["Kasrah Muqaddarah", "Kasrah Zhahirah", "Fathah"], "correct": "Kasrah Muqaddarah", "explanation": "Tandanya kasrah yang disembunyikan di atas Alif karena alasan udzur (sulit diucapkan)." },
"11": { "question": "Mengapa lafadz الفتى tandanya menggunakan Kasrah Muqaddarah?", "options": ["Karena Isim Maqsur", "Karena Isim Manqush", "Karena Isim Ghoiru Munshorif"], "correct": "Karena Isim Maqsur", "explanation": "Isim yang diakhiri alif lazimah (Maqsur) semua tanda i'robnya ditakdirkan/disembunyikan." },
"12": { "question": "apa nadzom/syahidnya lafadz الفتى itu?", "options": ["والأول الإعراب فيه قدرا جميعه وهو الذي قد قصرا", "والثان منقوص ونصبه ظهر", "فارفع بضم"], "correct": "والأول الإعراب فيه قدرا جميعه وهو الذي قد قصرا", "explanation": "Bait yang menjelaskan i'rob taqdiri pada isim maqsur." }
}
},
{
"id_lafadz": "amogenz_lafadz_012",
"word": "المتعالي",
"steps": {
"1": { "question": "Apa jenis Lafadz المتعالي?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Menunjukkan sifat/pelaku (yang menyombongkan diri)." },
"2": { "question": "Apa tanda/alasan lafadz المتعالي disebut Isim?", "options": ["Al (Alif Lam)", "Tanwin", "Jazm"], "correct": "Al (Alif Lam)", "explanation": "Diawali dengan Al-Ta'rif." },
"3": { "question": "Apa nadhom/syahidnya lafadz المتعالي disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Ciri isim menurut Alfiyah." },
"4": { "question": "Status lafadz المتعالي itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim manqush hukumnya mu'rob." },
"5": { "question": "Mengapa lafadz المتعالي berstatus Mu'rob?", "options": ["Tidak serupa huruf", "Karena kemasukan Al", "Karena sebagai na'at"], "correct": "Tidak serupa huruf", "explanation": "Isim mu'rob adalah yang tidak menyerupai huruf." },
"6": { "question": "Apa nadhom/syahidnya lafadz المتعالي berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "لشبه من الحروف مدني", "والاسم منه معرب ومبني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Syarat isim mu'rob." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz المتعالي?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Sebagai Na'at (Sifat) bagi Al-Fata yang majrur." },
"8": { "question": "Apa alasan lafadz المتعالي dihukumi Jarr?", "options": ["Mengikuti yang disifati (Man'ut)", "Karena huruf jarr", "Karena mudhaf ilaih"], "correct": "Mengikuti yang disifati (Man'ut)", "explanation": "Na'at harus mengikuti i'rob man'ut-nya (Al-Fata) yang berkedudukan jarr." },
"9": { "question": "Apa nadhom/syahidnya lafadz المتعالي dihukumi Jarr?", "options": ["يتبع في الإعراب الأسماء الأول نعت", "والاسم قد خصص بالجر", "فارفع بضم"], "correct": "يتبع في الإعراب الأسماء الأول نعت", "explanation": "Bait tentang tawabi' (pengikut i'rob) termasuk Na'at." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz المتعالي?", "options": ["Kasrah Muqaddarah", "Kasrah Zhahirah", "Ya"], "correct": "Kasrah Muqaddarah", "explanation": "Tandanya kasrah yang disembunyikan di atas Ya karena alasan tsiqal (berat diucapkan)." },
"11": { "question": "Mengapa lafadz المتعالي tandanya menggunakan Kasrah Muqaddarah?", "options": ["Karena Isim Manqush", "Karena Isim Maqsur", "Karena Jamak Taksir"], "correct": "Karena Isim Manqush", "explanation": "Isim yang diakhiri Ya lazimah (Manqush) tanda jarr dan rafa'-nya disembunyikan." },
"12": { "question": "apa nadzom/syahidnya lafadz المتعالي itu?", "options": ["والثان منقوص ونصبه ظهر ورفعه ينوى كذا أيضا يجر", "والأول الإعراب فيه قدرا", "بالألف ارفع المثنى"], "correct": "والثان منقوص ونصبه ظهر ورفعه ينوى كذا أيضا يجر", "explanation": "Bait yang menjelaskan i'rob isim manqush (jarr ditakdirkan)." }
}
}
]
},
  {
"id_kalimat": "amogenz_kalimat_004",
"teks_kalimat": "كالسيل حرب",
"analysis": [
{
"id_lafadz": "amogenz_lafadz_013",
"word": "كـ",
"steps": {
"1": { "question": "Apa jenis Lafadz كـ?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Kaf di sini adalah Kaf Tashbih yang termasuk dalam kategori Huruf Jarr." },
"2": { "question": "Apa tanda/alasan lafadz كـ disebut Huruf?", "options": ["Tidak menerima tanda isim maupun fi'il", "Kemasukan Al", "Menunjukkan makna benda"], "correct": "Tidak menerima tanda isim maupun fi'il", "explanation": "Huruf adalah kata yang tidak bisa menerima tanda-tanda khusus milik isim atau fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz كـ disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Bait ini menjelaskan bahwa selain isim dan fi'il adalah huruf, seperti hal, fi, dan lam." },
"4": { "question": "Status lafadz كـ itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Setiap huruf dalam bahasa Arab hukumnya adalah mabni (konstan)." },
"5": { "question": "Mengapa lafadz كـ berstatus Mabni?", "options": ["Karena merupakan huruf", "Karena menyerupai isim", "Karena amil jarr"], "correct": "Karena merupakan huruf", "explanation": "Kaidah asal menyatakan bahwa seluruh huruf itu berhak atas kemabnian." },
"6": { "question": "Apa nadhom/syahidnya lafadz كـ berstatus Mabni?", "options": ["وكل حرف مستحق للبنا", "والاسم منه معرب ومبني", "ومعرب الأسماء ما قد سلما"], "correct": "وكل حرف مستحق للبنا", "explanation": "Bait ini menegaskan bahwa setiap huruf harus mabni." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz كـ?", "options": ["Mabni 'ala Fathah", "Mabni 'ala Sukun", "Mabni 'ala Kasrah"], "correct": "Mabni 'ala Fathah", "explanation": "Kaf Tashbih selalu dibaca dengan harakat fathah (Ka-)." },
"8": { "question": "Apa alasan lafadz كـ dihukumi Mabni 'ala Fathah?", "options": ["Harakat asli bina'-nya", "Karena setelahnya isim", "Karena amil jarr"], "correct": "Harakat asli bina'-nya", "explanation": "Lafadz tersebut tidak berubah harakatnya dan secara asli berharakat fathah." },
"9": { "question": "Apa nadhom/syahidnya lafadz كـ dihukumi Mabni 'ala Fathah?", "options": ["وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "والسكون أصل", "فارفع بضم"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "explanation": "Menjelaskan bahwa di antara jenis mabni ada yang fathah, kasrah, dan dhommah." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz كـ?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli jarrin", "Fi mahalli raf'in"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf tidak menduduki posisi I'rob dalam kalimat (tidak menjadi subjek/objek)." },
"11": { "question": "Mengapa lafadz كـ tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena ia adalah huruf", "Karena isim mufrad", "Karena amil nawasikh"], "correct": "Karena ia adalah huruf", "explanation": "Huruf berfungsi sebagai penghubung (amil) dan tidak memiliki kedudukan mahal i'rob." },
"12": { "question": "apa nadzom/syahidnya lafadz كـ itu?", "options": ["وكل حرف مستحق للبنا", "والاسم قد خصص بالجر", "وانصب بفتحه"], "correct": "وكل حرف مستحق للبنا", "explanation": "Prinsip kemabnian huruf sekaligus menunjukkan ketiadaan mahal i'rob secara struktural." }
}
},
{
"id_lafadz": "amogenz_lafadz_014",
"word": "السيل",
"steps": {
"1": { "question": "Apa jenis Lafadz السيل?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz As-Saili menunjukkan makna benda (aliran air/banjir) dan tidak terikat waktu." },
"2": { "question": "Apa tanda/alasan lafadz السيل disebut Isim?", "options": ["Kemasukan Al (Alif Lam)", "Kemasukan Tanwin", "Menerima Jazm"], "correct": "Kemasukan Al (Alif Lam)", "explanation": "Lafadz tersebut diawali oleh Al-Ta'rif." },
"3": { "question": "Apa nadhom/syahidnya lafadz السيل disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Al (Alif Lam) adalah salah satu tanda isim dalam Alfiyah." },
"4": { "question": "Status lafadz السيل itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang tidak serupa dengan huruf hukumnya adalah mu'rob." },
"5": { "question": "Mengapa lafadz السيل berstatus Mu'rob?", "options": ["Karena tidak serupa dengan huruf", "Karena kemasukan Al", "Karena merupakan isim jenis"], "correct": "Karena tidak serupa dengan huruf", "explanation": "Isim mu'rob adalah isim yang selamat dari sebab-sebab mabni (syabah huruf)." },
"6": { "question": "Apa nadhom/syahidnya lafadz السيل berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "لشبه من الحروف مدني", "والاسم منه معرب ومبني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Bait ini menjelaskan kriteria isim mu'rob." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz السيل?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Karena didahului oleh huruf jarr Kaf." },
"8": { "question": "Apa alasan lafadz السيل dihukumi Jarr?", "options": ["Majrur bi al-harfi", "Sebagai Mudhaf Ilaih", "Sebagai Na'at"], "correct": "Majrur bi al-harfi", "explanation": "Lafadz tersebut dipengaruhi oleh amil jarr yaitu huruf Kaf." },
"9": { "question": "Apa nadhom/syahidnya lafadz السيل dihukumi Jarr?", "options": ["هاك حروف الجر وهي من إلى ... والكاف", "والاسم قد خصص بالجر", "بالجر والتنوين"], "correct": "هاك حروف الجر وهي من إلى ... والكاف", "explanation": "Kaf disebut sebagai salah satu huruf jarr." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz السيل?", "options": ["Kasrah", "Fathah", "Ya"], "correct": "Kasrah", "explanation": "Isim mufrad tanda jarr-nya adalah kasrah." },
"11": { "question": "Mengapa lafadz السيل tandanya menggunakan Kasrah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Isim Maqsur"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad yang munshorif (menerima tanwin/al) menggunakan kasrah sebagai tanda jarr asli." },
"12": { "question": "apa nadzom/syahidnya lafadz السيل itu?", "options": ["وجر كسرا كذكر الله عبده", "فارفع بضم وانصبن فتحا", "وانصب بفتحه مالم ينصرف"], "correct": "وجر كسرا كذكر الله عبده", "explanation": "Menjelaskan bahwa tanda jarr adalah kasrah." }
}
},
{
"id_lafadz": "amogenz_lafadz_015",
"word": "حرب",
"steps": {
"1": { "question": "Apa jenis Lafadz حرب?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Harbun menunjukkan makna benda/sifat abstrak (perang/musuh)." },
"2": { "question": "Apa tanda/alasan lafadz حرب disebut Isim?", "options": ["Tanwin", "Al (Alif Lam)", "Kemasukan Qad"], "correct": "Tanwin", "explanation": "Lafadz tersebut memiliki tanwin di akhirnya." },
"3": { "question": "Apa nadhom/syahidnya lafadz حرب disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Tanwin adalah ciri khas isim." },
"4": { "question": "Status lafadz حرب itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Dapat berubah harakat akhirnya sesuai amil yang masuk." },
"5": { "question": "Mengapa lafadz حرب berstatus Mu'rob?", "options": ["Tidak menyerupai huruf", "Karena isim nakirah", "Karena dhomir"], "correct": "Tidak menyerupai huruf", "explanation": "Bukan termasuk isim yang memiliki keserupaan dengan huruf." },
"6": { "question": "Apa nadhom/syahidnya lafadz حرب berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "لشبه من الحروف مدني", "والاسم منه معرب ومبني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Definisi mu'rob dalam Alfiyah." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz حرب?", "options": ["Rafa'", "Nashab", "Jarr"], "correct": "Rafa'", "explanation": "Berposisi sebagai Khabar (dari Mubtada' yang dibuang atau dalam struktur khabariah)." },
"8": { "question": "Apa alasan lafadz حرب dihukumi Rafa'?", "options": ["Sebagai Khabar", "Sebagai Fa'il", "Sebagai Na'at"], "correct": "Sebagai Khabar", "explanation": "Khabar adalah isim yang dirafa'kan oleh mubtada' (atau amil ma'nawi)." },
"9": { "question": "Apa nadhom/syahidnya lafadz حرب dihukumi Rafa'?", "options": ["كذاك خبر بالمبتدا", "ورفعوا مبتدأ بالابتدا", "ترفع كان المبتدا"], "correct": "كذاك خبر بالمبتدا", "explanation": "Bait ini menjelaskan bahwa khabar dirafa'kan oleh mubtada'." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz حرب?", "options": ["Dhammah", "Fathah", "Wawu"], "correct": "Dhammah", "explanation": "Tanda rafa' asli untuk isim mufrad adalah dhammah." },
"11": { "question": "Mengapa lafadz حرب tandanya menggunakan Dhammah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Asmaul Khomsah"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad tanda i'rob-nya mengikuti kaidah dasar tanda asli." },
"12": { "question": "apa nadzom/syahidnya lafadz حرب itu?", "options": ["فارفع بضم وانصبن فتحا", "بالألف ارفع المثنى", "وارفع بواو وانصبن بالألف"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Kaidah tanda rafa' dengan dhammah." }
}
}
]
},
  {
"id_kalimat": "amogenz_kalimat_005",
"teks_kalimat": "للمكان العالي",
"analysis": [
{
"id_lafadz": "amogenz_lafadz_016",
"word": "لـ",
"steps": {
"1": { "question": "Apa jenis Lafadz لـ?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Lafadz ini adalah Lam Jarr yang berfungsi mengaitkan makna antar kata." },
"2": { "question": "Apa tanda/alasan lafadz لـ disebut Huruf?", "options": ["Tidak menerima tanda isim maupun fi'il", "Kemasukan Al", "Bisa ditasrif"], "correct": "Tidak menerima tanda isim maupun fi'il", "explanation": "Huruf didefinisikan sebagai kalimat yang tidak cocok disandingkan dengan ciri khas Isim maupun Fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz لـ disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Mushannif menyebutkan bahwa selain Isim dan Fi'il adalah Huruf." },
"4": { "question": "Status lafadz لـ itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Seluruh huruf dalam bahasa Arab tidak mengalami perubahan akhir akibat amil (Mabni)." },
"5": { "question": "Mengapa lafadz لـ berstatus Mabni?", "options": ["Karena merupakan huruf", "Karena menyerupai fi'il", "Karena isim mufrad"], "correct": "Karena merupakan huruf", "explanation": "Kaidah fundamental Nahwu menyatakan 'Wa kullu harfin mustahiqqun lil bina'." },
"6": { "question": "Apa nadhom/syahidnya lafadz لـ berstatus Mabni?", "options": ["وكل حرف مستحق للبنا", "والاسم منه معرب ومبني", "ومعرب الأسماء ما قد سلما"], "correct": "وكل حرف مستحق للبنا", "explanation": "Bait ini menegaskan hak kemabnian bagi setiap huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz لـ?", "options": ["Mabni 'ala Kasrah", "Mabni 'ala Fathah", "Mabni 'ala Sukun"], "correct": "Mabni 'ala Kasrah", "explanation": "Lam Jarr di sini dibaca 'Li' secara konstan." },
"8": { "question": "Apa alasan lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["Harakat asli bina-nya", "Karena setelahnya isim maqsur", "Karena amil jarr"], "correct": "Harakat asli bina-nya", "explanation": "Secara sima'i, Lam Jarr yang masuk pada isim dhohir dibaca kasrah." },
"9": { "question": "Apa nadhom/syahidnya lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "والسكون أصل", "فارفع بضم"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "explanation": "Menjelaskan variasi harakat bina (Fathah, Kasrah, Dhammah)." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz لـ?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli jarrin", "Fi mahalli nashbin"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf hanya berfungsi sebagai amil, ia tidak menempati posisi subjek, objek, atau pelengkap yang memiliki mahal." },
"11": { "question": "Mengapa lafadz لـ tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena ia adalah huruf", "Karena isim mufrad", "Karena amil nawasikh"], "correct": "Karena ia adalah huruf", "explanation": "Konsekuensi dari kemabnian huruf adalah tidak memiliki mahal i'rob dalam struktur jumlah." },
"12": { "question": "apa nadzom/syahidnya lafadz لـ itu?", "options": ["وكل حرف مستحق للبنا", "والاسم قد خصص بالجر", "وانصب بفتحه"], "correct": "وكل huruf مستحق للبنا", "explanation": "Bait dasar yang mencakup seluruh status huruf." }
}
},
{
"id_lafadz": "amogenz_lafadz_017",
"word": "المكان",
"steps": {
"1": { "question": "Apa jenis Lafadz المكان?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Menunjukkan makna tempat dan tidak terikat dengan waktu." },
"2": { "question": "Apa tanda/alasan lafadz المكان disebut Isim?", "options": ["Al (Alif Lam) dan Jarr", "Tanwin", "Sin dan Saufa"], "correct": "Al (Alif Lam) dan Jarr", "explanation": "Terdapat Al-Ta'rif di awal dan kemasukan huruf jarr Lam." },
"3": { "question": "Apa nadhom/syahidnya lafadz المكان disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Jarr dan Al adalah ciri utama isim menurut Ibnu Malik." },
"4": { "question": "Status lafadz المكان itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang tidak menyerupai huruf." },
"5": { "question": "Mengapa lafadz المكان berstatus Mu'rob?", "options": ["Karena tidak serupa dengan huruf", "Karena kemasukan Al", "Karena isim makan"], "correct": "Karena tidak serupa dengan huruf", "explanation": "Penyebab i'rob adalah ketiadaan Syabah (keserupaan) dengan huruf." },
"6": { "question": "Apa nadhom/syahidnya lafadz المكان berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما من شبه الحرف", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما من شبه الحرف", "explanation": "Isim mu'rob adalah yang selamat dari keserupaan huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz المكان?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Karena didahului oleh huruf jarr Lam (li)." },
"8": { "question": "Apa alasan lafadz المكان dihukumi Jarr?", "options": ["Majrur bi al-harfi", "Sebagai Mudhaf Ilaih", "Sebagai Na'at"], "correct": "Majrur bi al-harfi", "explanation": "Lafadz ini ditarik i'robnya ke bawah oleh amil jarr 'Lam'." },
"9": { "question": "Apa nadhom/syahidnya lafadz المكان dihukumi Jarr?", "options": ["هاك حروف الجر وهي من إلى... واللام", "والاسم قد خصص بالجر كما", "بالجر والتنوين"], "correct": "هاك حروف الجر وهي من إلى... واللام", "explanation": "Menyebutkan Lam sebagai salah satu amil jarr." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz المكان?", "options": ["Kasrah Zhahirah", "Fathah", "Kasrah Muqaddarah"], "correct": "Kasrah Zhahirah", "explanation": "Tanda jarr nampak jelas di akhir kata." },
"11": { "question": "Mengapa lafadz المكان tandanya menggunakan Kasrah Zhahirah?", "options": ["Karena Isim Mufrad Shahih Akhir", "Karena Isim Maqsur", "Karena Jamak Taksir"], "correct": "Karena Isim Mufrad Shahih Akhir", "explanation": "Isim mufrad munshorif yang tidak diakhiri huruf illat menggunakan kasrah nyata." },
"12": { "question": "apa nadzom/syahidnya lafadz المكان itu?", "options": ["وجر كسرا كذكر الله عبده", "فارفع بضم وانصبن فتحا", "وانصب بفتحه مالم ينصرف"], "correct": "وجر كسرا كذكر الله عبده", "explanation": "Kaidah tanda jarr asli dengan kasrah." }
}
},
{
"id_lafadz": "amogenz_lafadz_018",
"word": "العالي",
"steps": {
"1": { "question": "Apa jenis Lafadz العالي?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz ini menunjukkan sifat (tinggi) dan berstatus Isim Fa'il." },
"2": { "question": "Apa tanda/alasan lafadz العالي disebut Isim?", "options": ["Al (Alif Lam)", "Tanwin", "Jazm"], "correct": "Al (Alif Lam)", "explanation": "Terdapat Al-Ta'rif di awal kata." },
"3": { "question": "Apa nadhom/syahidnya lafadz العالي disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Bait tanda-tanda isim." },
"4": { "question": "Status lafadz العالي itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim manqush tetap termasuk kategori isim mu'rob." },
"5": { "question": "Mengapa lafadz العالي berstatus Mu'rob?", "options": ["Karena tidak menyerupai huruf", "Karena kemasukan Al", "Karena sebagai na'at"], "correct": "Karena tidak menyerupai huruf", "explanation": "Isim menjadi mu'rob selama tidak memiliki alasan untuk mabni." },
"6": { "question": "Apa nadhom/syahidnya lafadz العالي berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "لشبه من الحروف مدني", "والاسم منه معرب ومبني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Syarat mu'rob adalah selamat dari syabah huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz العالي?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Berposisi sebagai Na'at (sifat) bagi lafadz 'Al-Makaani'." },
"8": { "question": "Apa alasan lafadz العالي dihukumi Jarr?", "options": ["Mengikuti Man'ut yang majrur", "Karena amil jarr", "Sebagai Mudhaf Ilaih"], "correct": "Mengikuti Man'ut yang majrur", "explanation": "Na'at harus mengikuti i'rob yang disifati (Al-Makaani) yang sedang majrur." },
"9": { "question": "Apa nadhom/syahidnya lafadz العالي dihukumi Jarr?", "options": ["يتبع في الإعراب الأسماء الأول # نعت", "والاسم قد خصص بالجر", "فارفع بضم"], "correct": "يتبع في الإعراب الأسماء الأول # نعت", "explanation": "Bait tentang Tawabi' (pengikut i'rob) termasuk na'at." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz العالي?", "options": ["Kasrah Muqaddarah", "Kasrah Zhahirah", "Fathah"], "correct": "Kasrah Muqaddarah", "explanation": "Tandanya kasrah yang disembunyikan di akhir karena berat diucapkan (Tsiqal)." },
"11": { "question": "Mengapa lafadz العالي tandanya menggunakan Kasrah Muqaddarah?", "options": ["Karena Isim Manqush", "Karena Isim Maqsur", "Karena Isim Mu'tal Akhir bi al-Alif"], "correct": "Karena Isim Manqush", "explanation": "Isim yang diakhiri Ya' lazimah berkasrah sebelumnya (Manqush) tanda Jarr-nya disembunyikan." },
"12": { "question": "apa nadzom/syahidnya lafadz العالي itu?", "options": ["والثان منقوص ونصبه ظهر # ورفعه ينوى كذا أيضا يجر", "والأول الإعراب فيه قدرا", "بالألف ارفع المثنى"], "correct": "والثان منقوص ونصبه ظهر # ورفعه ينوى كذا أيضا يجر", "explanation": "Bait yang menjelaskan i'rob isim manqush (jarr dan rafa' ditakdirkan)." }
}
}
]
},
  {
"id_kalimat": "amogenz_kalimat_006",
"teks_kalimat": "الكسوف للشمس",
"analysis": [
{
"id_lafadz": "amogenz_lafadz_019",
"word": "الكسوف",
"steps": {
"1": { "question": "Apa jenis Lafadz الكسوف?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz tersebut menunjukkan makna benda/peristiwa (gerhana) dan tidak berkaitan dengan waktu." },
"2": { "question": "Apa tanda/alasan lafadz الكسوف disebut Isim?", "options": ["Kemasukan Al (Alif Lam)", "Kemasukan Tanwin", "Kemasukan Huruf Nida"], "correct": "Kemasukan Al (Alif Lam)", "explanation": "Lafadz الكسوف diawali dengan Al-Ta'rif (Alif Lam)." },
"3": { "question": "Apa nadhom/syahidnya lafadz الكسوف disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي", "سواهما الحرف كهل وفي ولم"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Bait ini menjelaskan tanda-tanda isim yang di antaranya adalah Al (أل)." },
"4": { "question": "Status lafadz الكسوف itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang tidak memiliki keserupaan dengan huruf hukumnya mu'rob." },
"5": { "question": "Mengapa lafadz الكسوف berstatus Mu'rob?", "options": ["Karena tidak serupa dengan huruf", "Karena kemasukan amil", "Karena berstatus Mubtada"], "correct": "Karena tidak serupa dengan huruf", "explanation": "Isim menjadi mu'rob apabila selamat dari keserupaan (syabah) dengan huruf." },
"6": { "question": "Apa nadhom/syahidnya lafadz الكسوف berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Isim mu'rob adalah isim yang selamat dari syabah huruf seperti lafadz 'Ardh' dan 'Suma'." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz الكسوف?", "options": ["Rafa'", "Nashab", "Jarr"], "correct": "Rafa'", "explanation": "Berposisi sebagai Mubtada' (subjek di awal kalimat)." },
"8": { "question": "Apa alasan lafadz الكسوف dihukumi Rafa'?", "options": ["Sebagai Mubtada'", "Sebagai Fa'il", "Sebagai Khabar"], "correct": "Sebagai Mubtada'", "explanation": "Mubtada' adalah isim yang disepi dari amil lafdzi (amilnya maknawi ibtida')." },
"9": { "question": "Apa nadhom/syahidnya lafadz الكسوف dihukumi Rafa'?", "options": ["ورفعوا مبتدأ بالابتدا", "مبتدأ زيد وعاذر خبر", "ورفعك الاسم من بعد ما"], "correct": "ورفعوا مبتدأ بالابتدا", "explanation": "Ulama Nahwu merafa'kan mubtada' karena amil ibtida'." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz الكسوف?", "options": ["Dhammah", "Fathah", "Kasrah"], "correct": "Dhammah", "explanation": "Tanda rafa' asli untuk isim mufrad adalah dhammah." },
"11": { "question": "Mengapa lafadz الكسوف tandanya menggunakan Dhammah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Asmaul Khomsah"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad yang munshorif (menerima i'rob) tanda rafa'nya adalah dhammah." },
"12": { "question": "apa nadzom/syahidnya lafadz الكسوف itu tandanya menggunakan Dhammah?", "options": ["فارفع بضم وانصبن فتحا", "بالألف ارفع المثنى", "وارفع بواو وانصبن بالألف"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Bait ini menjelaskan tanda i'rob asli: rafa' dengan dhammah." }
}
},
{
"id_lafadz": "amogenz_lafadz_020",
"word": "لـ",
"steps": {
"1": { "question": "Apa jenis Lafadz لـ?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Lam di sini adalah Lam Jarr (huruf yang men-jarr-kan isim)." },
"2": { "question": "Apa tanda/alasan lafadz لـ disebut Huruf?", "options": ["Tidak menerima tanda isim/fi'il", "Bisa ditanwin", "Menunjukkan waktu"], "correct": "Tidak menerima tanda isim/fi'il", "explanation": "Ciri huruf adalah ketidaklayakannya menerima tanda-tanda khusus milik isim atau fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz لـ disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Huruf adalah kata selain isim dan fi'il." },
"4": { "question": "Status lafadz لـ itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Semua huruf dalam bahasa Arab hukumnya mabni." },
"5": { "question": "Mengapa lafadz لـ berstatus Mabni?", "options": ["Karena merupakan huruf", "Karena amil", "Karena tidak bisa berubah"], "correct": "Karena merupakan huruf", "explanation": "Setiap huruf berhak mendapatkan status mabni (Mustahiqqun lil bina)." },
"6": { "question": "Apa nadhom/syahidnya lafadz لـ berstatus Mabni?", "options": ["وكل حرف مستحق للبنا", "والاسم منه معرب ومبني", "ومعرب الأسماء ما قد سلما"], "correct": "وكل حرف مستحق للبنا", "explanation": "Bait ini menyatakan bahwa setiap huruf berstatus mabni." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz لـ?", "options": ["Mabni 'ala Kasrah", "Mabni 'ala Fathah", "Mabni 'ala Sukun"], "correct": "Mabni 'ala Kasrah", "explanation": "Lam Jarr pada kalimat ini dibaca 'Li'." },
"8": { "question": "Apa alasan lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["Karena harakat aslinya kasrah", "Karena mengikuti kata setelahnya", "Karena amil jarr"], "correct": "Karena harakat aslinya kasrah", "explanation": "Harakat bina' (tetap) pada lam jarr tersebut adalah kasrah." },
"9": { "question": "Apa nadhom/syahidnya lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "والسكون أصل", "فارفع بضم"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "explanation": "Menjelaskan jenis-jenis harakat pada kata yang mabni." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz لـ?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli jarrin", "Fi mahalli raf'in"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf tidak memiliki kedudukan (mahal) i'rob dalam struktur kalimat." },
"11": { "question": "Mengapa lafadz لـ tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena merupakan huruf", "Karena isim mabni", "Karena amil nawasikh"], "correct": "Karena merupakan huruf", "explanation": "Seluruh huruf tidak menempati posisi i'rob (seperti subjek/objek)." },
"12": { "question": "apa nadzom/syahidnya lafadz لـ itu?", "options": ["وكل حرف مستحق للبنا", "والاسم قد خصص بالجر", "وانصب بفتحه"], "correct": "وكل حرف مستحق للبنا", "explanation": "Kaidah umum kemabnian huruf berimplikasi pada ketiadaan mahal i'rob." }
}
},
{
"id_lafadz": "amogenz_lafadz_021",
"word": "الشمس",
"steps": {
"1": { "question": "Apa jenis Lafadz الشمس?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz tersebut menunjukkan benda langit (matahari)." },
"2": { "question": "Apa tanda/alasan lafadz الشمس disebut Isim?", "options": ["Al (Alif Lam) dan Jarr", "Tanwin", "Jazm"], "correct": "Al (Alif Lam) dan Jarr", "explanation": "Lafadz ini diawali Al-Ta'rif dan didahului huruf jarr Lam." },
"3": { "question": "Apa nadhom/syahidnya lafadz الشمس disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Jarr dan Al adalah ciri khas isim." },
"4": { "question": "Status lafadz الشمس itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang dapat berubah akhirnya karena amil." },
"5": { "question": "Mengapa lafadz الشمس berstatus Mu'rob?", "options": ["Karena tidak menyerupai huruf", "Karena merupakan mudhaf", "Karena isim alam"], "correct": "Karena tidak menyerupai huruf", "explanation": "Isim mu'rob adalah yang selamat dari sebab kemabnian (syabah huruf)." },
"6": { "question": "Apa nadhom/syahidnya lafadz الشمس berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "لشبه من الحروف مدني", "والاسم منه معرب ومبني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Kriteria isim mu'rob dalam Alfiyah." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz الشمس?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Karena didahului oleh amil jarr yaitu huruf Lam (li)." },
"8": { "question": "Apa alasan lafadz الشمس dihukumi Jarr?", "options": ["Majrur bi al-harfi", "Sebagai Mudhaf Ilaih", "Sebagai Na'at"], "correct": "Majrur bi al-harfi", "explanation": "Lafadz ini ditarik oleh huruf jarr Lam." },
"9": { "question": "Apa nadhom/syahidnya lafadz الشمس dihukumi Jarr?", "options": ["هاك حروف الجر وهي من إلى ... واللام", "والاسم قد خصص بالجر", "ترفع كان المبتدا"], "correct": "هاك حروف الجر وهي من إلى ... واللام", "explanation": "Bait yang menyebutkan daftar huruf-huruf jarr." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz الشمس?", "options": ["Kasrah", "Fathah", "Ya"], "correct": "Kasrah", "explanation": "Tanda jarr asli bagi isim mufrad adalah kasrah." },
"11": { "question": "Mengapa lafadz الشمس tandanya menggunakan Kasrah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Asmaul Khomsah"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad munshorif tanda jarr-nya menggunakan kasrah lahiriyah." },
"12": { "question": "apa nadzom/syahidnya lafadz الشمس itu?", "options": ["وجر كسرا كذكر الله عبده", "فارفع بضم وانصبن فتحا", "وانصب بفتحه مالم ينصرف"], "correct": "وجر كسرا كذكر الله عبده", "explanation": "Menyatakan bahwa tanda jarr adalah kasrah." }
}
}
]
},
  {
"id_kalimat": "amogenz_kalimat_007",
"teks_kalimat": "والخسوف للقمر",
"analysis": [
{
"id_lafadz": "amogenz_lafadz_022",
"word": "و",
"steps": {
"1": { "question": "Apa jenis Lafadz و?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Wawu di sini adalah Huruf Isti'naf atau Athaf (tergantung konteks kalimat sebelumnya), yang merupakan kategori kata tugas." },
"2": { "question": "Apa tanda/alasan lafadz و disebut Huruf?", "options": ["Tidak menerima tanda isim maupun fi'il", "Kemasukan Al", "Menunjukkan makna benda"], "correct": "Tidak menerima tanda isim maupun fi'il", "explanation": "Huruf adalah kata yang tidak bisa menerima tanda khusus isim (seperti tanwin) maupun tanda fi'il (seperti qad)." },
"3": { "question": "Apa nadhom/syahidnya lafadz و disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Bait ini menjelaskan bahwa selain isim dan fi'il adalah huruf." },
"4": { "question": "Status lafadz و itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Seluruh huruf dalam kalam Arab dihukumi Mabni (tetap)." },
"5": { "question": "Mengapa lafadz و berstatus Mabni?", "options": ["Karena merupakan huruf", "Karena menyerupai isim", "Karena amil rafa'"], "correct": "Karena merupakan huruf", "explanation": "Kaidah Alfiyah menyatakan bahwa setiap huruf berhak atas kemabnian." },
"6": { "question": "Apa nadhom/syahidnya lafadz و disebut Mabni?", "options": ["وكل حرف مستحق للبنا", "والاسم منه معرب ومبني", "ومعرب الأسماء ما قد سلما"], "correct": "وكل حرف مستحق للبنا", "explanation": "Bait ini menegaskan bahwa setiap huruf wajib mabni." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz و?", "options": ["Mabni 'ala Fathah", "Mabni 'ala Sukun", "Mabni 'ala Kasrah"], "correct": "Mabni 'ala Fathah", "explanation": "Lafadz Wawu tersebut dibaca dengan harakat fathah (Wa)." },
"8": { "question": "Apa alasan lafadz و dihukumi Mabni 'ala Fathah?", "options": ["Harakat asli bina'-nya", "Karena setelahnya isim", "Karena posisi mubtada"], "correct": "Harakat asli bina'-nya", "explanation": "Huruf Wawu secara asal ditetapkan (mabni) di atas fathah." },
"9": { "question": "Apa nadhom/syahidnya lafadz و disebut Mabni 'ala Fathah?", "options": ["وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "والسكون أصل", "فارفع بضم"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "explanation": "Bait ini menyebutkan jenis-jenis harakat mabni (fathah, kasrah, dhammah)." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz و?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli jarrin", "Fi mahalli raf'in"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf tidak memiliki kedudukan i'rob (tidak bisa jadi subjek/objek)." },
"11": { "question": "Mengapa lafadz و tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena merupakan huruf", "Karena isim mabni", "Karena amil nawasikh"], "correct": "Karena merupakan huruf", "explanation": "Setiap huruf berfungsi sebagai penghubung dan tidak menempati posisi struktural i'rob." },
"12": { "question": "apa nadzom/syahidnya lafadz و itu?", "options": ["وكل حرف مستحق للبنا", "والاسم قد خصص بالجر", "وانصب بفتحه"], "correct": "وكل حرف مستحق للبنا", "explanation": "Syahid untuk kemabnian huruf yang berimplikasi tidak adanya mahal i'rob." }
}
},
{
"id_lafadz": "amogenz_lafadz_023",
"word": "الخسوف",
"steps": {
"1": { "question": "Apa jenis Lafadz الخسوف?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz Al-Khusuufu menunjukkan nama peristiwa (gerhana bulan)." },
"2": { "question": "Apa tanda/alasan lafadz الخسوف disebut Isim?", "options": ["Kemasukan Al (Alif Lam)", "Kemasukan Tanwin", "Kemasukan Qad"], "correct": "Kemasukan Al (Alif Lam)", "explanation": "Lafadz tersebut diawali dengan Alif Lam Ta'rif." },
"3": { "question": "Apa nadhom/syahidnya lafadz الخسوف disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت ويا افعلي", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Bait ini menyebutkan tanda-tanda isim, salah satunya adalah Al (أل)." },
"4": { "question": "Status lafadz الخسوف itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang tidak serupa dengan huruf hukumnya mu'rob." },
"5": { "question": "Mengapa lafadz الخسوف berstatus Mu'rob?", "options": ["Karena tidak serupa dengan huruf", "Karena kemasukan amil", "Karena berawalan Al"], "correct": "Karena tidak serupa dengan huruf", "explanation": "Sebab utama i'rob adalah karena isim tersebut selamat dari penyerupaan dengan huruf." },
"6": { "question": "Apa nadhom/syahidnya lafadz الخسوف berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "والاسم منه معرب ومبني", "لشبه من الحروف مدني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Isim mu'rob adalah isim yang selamat dari syabah huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz الخسوف?", "options": ["Rafa'", "Nashab", "Jarr"], "correct": "Rafa'", "explanation": "Berposisi sebagai Mubtada' (subjek di awal kalimat)." },
"8": { "question": "Apa alasan lafadz الخسوف dihukumi Rafa'?", "options": ["Sebagai Mubtada'", "Sebagai Fa'il", "Sebagai Khabar"], "correct": "Sebagai Mubtada'", "explanation": "Mubtada' adalah isim yang dirafa'kan oleh amil ibtida'." },
"9": { "question": "Apa nadhom/syahidnya lafadz الخسوف dihukumi Rafa'?", "options": ["ورفعوا مبتدأ بالابتدا", "مبتدأ زيد وعاذر خبر", "فارفع بضم وانصبن فتحا"], "correct": "ورفعوا مبتدأ بالابتدا", "explanation": "Ulama Nahwu merafa'kan mubtada' karena faktor permulaan (ibtida')." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz الخسوف?", "options": ["Dhammah", "Fathah", "Kasrah"], "correct": "Dhammah", "explanation": "Tanda rafa' asli bagi isim mufrad adalah dhammah." },
"11": { "question": "Mengapa lafadz الخسوف tandanya menggunakan Dhammah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Isim Ghoiru Munshorif"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad yang munshorif tanda rafa'nya adalah dhammah lahiriyah." },
"12": { "question": "apa nadzom/syahidnya lafadz الخسوف itu tandanya menggunakan Dhammah?", "options": ["فارفع بضم وانصبن فتحا", "بالألف ارفع المثنى", "وارفع بواو وانصبن بالألف"], "correct": "فارفع بضم وانصبن فتحا", "explanation": "Kaidah umum tanda rafa' menggunakan dhammah." }
}
},
{
"id_lafadz": "amogenz_lafadz_024",
"word": "لـ",
"steps": {
"1": { "question": "Apa jenis Lafadz لـ?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Huruf", "explanation": "Lam di sini adalah Lam Jarr." },
"2": { "question": "Apa tanda/alasan lafadz لـ disebut Huruf?", "options": ["Tidak menerima tanda isim/fi'il", "Menerima tanwin", "Bisa ditasrif"], "correct": "Tidak menerima tanda isim/fi'il", "explanation": "Ciri huruf adalah tidak bisa diberi tanda isim atau fi'il." },
"3": { "question": "Apa nadhom/syahidnya lafadz لـ disebut Huruf?", "options": ["سواهما الحرف كهل وفي ولم", "بالجر والتنوين", "بتا فعلت"], "correct": "سواهما الحرف كهل وفي ولم", "explanation": "Bait yang membedakan huruf dari isim dan fi'il." },
"4": { "question": "Status lafadz لـ itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mabni", "explanation": "Seluruh huruf statusnya mabni." },
"5": { "question": "Mengapa lafadz لـ berstatus Mabni?", "options": ["Karena merupakan huruf", "Karena sebagai amil", "Karena pendek"], "correct": "Karena merupakan huruf", "explanation": "Kaidah 'setiap huruf berhak untuk mabni'." },
"6": { "question": "Apa nadhom/syahidnya lafadz لـ berstatus Mabni?", "options": ["وكل حرف مستحق للبنا", "والاسم منه معرب ومبني", "ومعرب الأسماء ما قد سلما"], "correct": "وكل حرف مستحق للبنا", "explanation": "Menjelaskan kemabnian huruf." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz لـ?", "options": ["Mabni 'ala Kasrah", "Mabni 'ala Fathah", "Mabni 'ala Sukun"], "correct": "Mabni 'ala Kasrah", "explanation": "Lam Jarr di sini dibaca 'Li'." },
"8": { "question": "Apa alasan lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["Harakat asli bina'-nya", "Mengikuti kata sebelumnya", "Karena amil jarr"], "correct": "Harakat asli bina'-nya", "explanation": "Lam jarr memiliki harakat tetap (bina') kasrah." },
"9": { "question": "Apa nadhom/syahidnya lafadz لـ dihukumi Mabni 'ala Kasrah?", "options": ["وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "والسكون أصل", "فارفع بضم"], "correct": "وَمِنْهُ ذُو فَتْحٍ وَذُو كَسْرٍ وَضَمْ", "explanation": "Bait tentang variasi harakat mabni." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz لـ?", "options": ["La mahalla lahu minal I'rob", "Fi mahalli jarrin", "Fi mahalli nashbin"], "correct": "La mahalla lahu minal I'rob", "explanation": "Huruf tidak menempati kedudukan i'rob." },
"11": { "question": "Mengapa lafadz لـ tandanya menggunakan La mahalla lahu minal I'rob?", "options": ["Karena merupakan huruf", "Karena isim mabni", "Karena amil nawasikh"], "correct": "Karena merupakan huruf", "explanation": "Karakteristik huruf adalah tidak memiliki kedudukan (mahal)." },
"12": { "question": "apa nadzom/syahidnya lafadz لـ itu?", "options": ["وكل حرف مستحق للبنا", "والاسم قد خصص بالجر", "وانصب بفتحه"], "correct": "وكل huruf مستحق للبنا", "explanation": "Syahid umum bagi huruf." }
}
},
{
"id_lafadz": "amogenz_lafadz_025",
"word": "القمر",
"steps": {
"1": { "question": "Apa jenis Lafadz القمر?", "options": ["Isim", "Fi'il", "Huruf"], "correct": "Isim", "explanation": "Lafadz Al-Qamari menunjukkan benda langit (bulan)." },
"2": { "question": "Apa tanda/alasan lafadz القمر disebut Isim?", "options": ["Al (Alif Lam) dan Jarr", "Tanwin", "Jazm"], "correct": "Al (Alif Lam) dan Jarr", "explanation": "Lafadz ini diawali Al-Ta'rif dan didahului huruf jarr Lam." },
"3": { "question": "Apa nadhom/syahidnya lafadz القمر disebut Isim?", "options": ["بالجر والتنوين والندا وأل", "بتا فعلت وأتت", "سواهما الحرف"], "correct": "بالجر والتنوين والندا وأل", "explanation": "Jarr dan Al adalah ciri khas isim." },
"4": { "question": "Status lafadz القمر itu Mu'rob atau Mabni?", "options": ["Mu'rob", "Mabni"], "correct": "Mu'rob", "explanation": "Isim mufrad yang dapat berubah akhirnya karena amil." },
"5": { "question": "Mengapa lafadz القمر berstatus Mu'rob?", "options": ["Karena tidak menyerupai huruf", "Karena kemasukan Al", "Karena isim alam"], "correct": "Karena tidak menyerupai huruf", "explanation": "Isim mu'rob adalah yang selamat dari sebab kemabnian (syabah huruf)." },
"6": { "question": "Apa nadhom/syahidnya lafadz القمر berstatus Mu'rob?", "options": ["ومعرب الأسماء ما قد سلما", "لشبه من الحروف مدني", "والاسم منه معرب ومبني"], "correct": "ومعرب الأسماء ما قد سلما", "explanation": "Kriteria isim mu'rob dalam Alfiyah." },
"7": { "question": "Apa kedudukan I'rob/Mabni lafadz القمر?", "options": ["Jarr", "Rafa'", "Nashab"], "correct": "Jarr", "explanation": "Karena didahului oleh amil jarr yaitu huruf Lam (li)." },
"8": { "question": "Apa alasan lafadz القمر dihukumi Jarr?", "options": ["Majrur bi al-harfi", "Sebagai Mudhaf Ilaih", "Sebagai Na'at"], "correct": "Majrur bi al-harfi", "explanation": "Lafadz ini dipengaruhi oleh huruf jarr Lam." },
"9": { "question": "Apa nadhom/syahidnya lafadz القمر dihukumi Jarr?", "options": ["هاك حروف الجر وهي من إلى ... واللام", "والاسم قد خصص بالجر", "بالجر والتنوين"], "correct": "هاك حروف الجر وهي من إلى ... واللام", "explanation": "Bait yang menyebutkan Lam sebagai huruf jarr." },
"10": { "question": "Apa tanda I'rob/Mahal I'rob pada lafadz القمر?", "options": ["Kasrah", "Fathah", "Ya"], "correct": "Kasrah", "explanation": "Tanda jarr asli bagi isim mufrad adalah kasrah." },
"11": { "question": "Mengapa lafadz القمر tandanya menggunakan Kasrah?", "options": ["Karena Isim Mufrad", "Karena Jamak Taksir", "Karena Asmaul Khomsah"], "correct": "Karena Isim Mufrad", "explanation": "Isim mufrad munshorif tanda jarr-nya menggunakan kasrah lahiriyah." },
"12": { "question": "apa nadzom/syahidnya lafadz القمر itu?", "options": ["وجر كسرا كذكر الله عبده", "فارفع بضم وانصبن فتحا", "وانصب بفتحه مالم ينصرف"], "correct": "وجر كسرا كذكر الله عبده", "explanation": "Menyatakan bahwa tanda jarr asli adalah kasrah." }
}
}
]
}
/// 007 ///
  
  // Akhir DB
  ];