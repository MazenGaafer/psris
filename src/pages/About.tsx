import React from "react";
import { FaMapMarkerAlt, FaUsers, FaPagelines, FaRegCalendarAlt, FaPhoneAlt, FaFax, FaEnvelope, FaCogs, FaIndustry, FaLandmark, FaSeedling, FaGlobeAfrica } from "react-icons/fa";
import { motion } from "framer-motion";
import NavBar from "@/components/ui/navbar";

const info = [
  {
    icon: <FaMapMarkerAlt className="text-blue-600 text-3xl mb-2" />,
    title: "الموقع والمساحة",
    content: (
      <>
        <b>مركز ومدينة باريس</b> يقع على مسافة 90 كم جنوب الخارجة، وتبلغ مساحته حوالي <b>59664 كم²</b> (13.5% من مساحة محافظة الوادي الجديد).
      </>
    )
  },
  {
    icon: <FaUsers className="text-pink-600 text-3xl mb-2" />,
    title: "رئيس المركز ووسائل التواصل",
    content: (
      <>
        <div>رئيس المركز: <b>الأستاذ/ عبدالناصر محمد صالح</b></div>
        <div>العنوان: مركز ومدينة باريس – الوادي الجديد</div>
        <div><FaPhoneAlt className="inline text-green-600 mr-1" /> 2975008 - 092</div>
        <div><FaFax className="inline text-yellow-600 mr-1" /> 2976121 - 092</div>
        <div><FaEnvelope className="inline text-blue-600 mr-1" /> <a href="mailto:Paris.markz@yahoo.com" className="underline text-blue-700">Paris.markz@yahoo.com</a></div>
      </>
    )
  },
  {
    icon: <FaPagelines className="text-green-600 text-3xl mb-2" />,
    title: "الوحدات القروية التابعة",
    content: (
      <>
        يتكون المركز من مدينة باريس و8 وحدات محلية قروية:
        <ul className="list-disc list-inside mt-2">
          <li>بغداد</li>
          <li>جدة</li>
          <li>جورمشين 7</li>
          <li>عدن</li>
          <li>المكس القبلي</li>
          <li>القصر القبلي</li>
          <li>درب الأربعين الأولى</li>
          <li>درب الأربعين الثانية</li>
        </ul>
      </>
    )
  },
  {
    icon: <FaCogs className="text-indigo-600 text-3xl mb-2" />,
    title: "الخدمات المقدمة",
    content: (
      <>
        <ul className="list-disc list-inside mt-2">
          <li>تراخيص مباني وتوصيل مياه وصرف صحي</li>
          <li>تطبيق منظومة الخبز وتوصيله للمنازل</li>
          <li>توزيع أراضي للشباب والمشروعات الحرفية</li>
          <li>تيسير إجراءات التراخيص والقروض</li>
          <li>حل مشاكل المواطنين وتوصيل المرافق</li>
          <li>دعم مراكز الشباب والأندية</li>
          <li>إسكان اجتماعي، بعثات طبية، دعم اجتماعي</li>
          <li>خدمات الطرق، الكهرباء، البيئة، وغيرها</li>
        </ul>
      </>
    )
  },
  {
    icon: <FaLandmark className="text-purple-600 text-3xl mb-2" />,
    title: "المعالم السياحية",
    content: (
      <>
        <ul className="list-disc list-inside mt-2">
          <li>معبد دوش الأثري</li>
          <li>منطقة المناور</li>
          <li>كنيسة شمس الدين</li>
          <li>عين الدار</li>
          <li>الطوابي الإسلامية</li>
          <li>مدينة باريس القديمة</li>
          <li>الهضبة (قرية المهندس حسن فتحي)</li>
          <li>منتجعات باريس السياحية</li>
          <li>المبروكة بالقصر القبلي</li>
          <li>عين خليل وجنوب المعبد</li>
        </ul>
      </>
    )
  },
  {
    icon: <FaSeedling className="text-green-700 text-3xl mb-2" />,
    title: "أهم المنتجات",
    content: (
      <>
        <ul className="list-disc list-inside mt-2">
          <li>البلح (التمور)</li>
          <li>القمح والشعير والذرة والبصل والطماطم والزيتون</li>
          <li>الخضروات والفواكه</li>
          <li>الإنتاج الحيواني وتربية الدواجن</li>
          <li>صناعات السجاد</li>
        </ul>
      </>
    )
  },
  {
    icon: <FaIndustry className="text-gray-700 text-3xl mb-2" />,
    title: "أهم المشروعات",
    content: (
      <>
        <ul className="list-disc list-inside mt-2">
          <li>كهربة 39 بئر بعزب باريس</li>
          <li>توصيل صرف صحي ومياه لقرى جديدة</li>
          <li>وحدات إسكان اجتماعي</li>
          <li>مشروعات استثمار زراعي بقرى عدن وبغداد</li>
          <li>محطات طاقة شمسية بقرى درب الأربعين</li>
          <li>مناطق حرفية متعددة</li>
        </ul>
      </>
    )
  }
];

const villages = [
  "بغداد",
  "جدة",
  "جورمشين 7",
  "عدن",
  "المكس القبلي",
  "القصر القبلي",
  "درب الأربعين الأولى",
  "درب الأربعين الثانية"
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* هيدر بتدرج لوني بدون صورة */}
      <div className="relative h-64 md:h-80 w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-paris-blue via-green-300 to-green-100">
        <div className="relative z-10 text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2"
          >
            مركز باريس – الوادي الجديد
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto"
          >
            واحة تاريخية وزراعية وسياحية في قلب الصحراء الغربية المصرية
          </motion.p>
        </div>
        {/* Overlay gradient فقط */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* بطاقات المعلومات */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {info.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-[1.025] hover:shadow-2xl transition"
              >
                {item.icon}
                <h2 className="text-xl font-bold mb-2 text-paris-blue text-center">{item.title}</h2>
                <div className="text-gray-700 text-center leading-relaxed text-md">{item.content}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* القرى */}
      <section className="py-10 bg-gradient-to-br from-paris-blue/10 to-green-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-bold text-center mb-6 text-paris-blue flex items-center justify-center gap-2"
          >
            <FaPagelines className="text-green-600 text-2xl ml-2" />
            القرى والوحدات المحلية التابعة
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {villages.map((village, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow hover:shadow-lg border border-paris-blue/10 hover:bg-paris-blue/5 transition"
              >
                <FaMapMarkerAlt className="text-green-500 text-xl" />
                <span className="font-medium text-gray-800 text-center">{village}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* الرؤية والرسالة */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-xl shadow-md p-8 text-center flex flex-col items-center"
            >
              <FaPagelines className="text-4xl text-green-600 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2 text-paris-blue">رؤيتنا</h3>
              <p className="text-gray-700 leading-relaxed">
                أن نكون مركزًا نموذجيًا في تقديم الخدمات الحكومية الرقمية المتطورة، ونساهم في بناء مجتمع محلي مزدهر ومستدام يحافظ على تراثه ويواكب التطور.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gradient-to-br from-accent/10 to-yellow-100 rounded-xl shadow-md p-8 text-center flex flex-col items-center"
            >
              <FaRegCalendarAlt className="text-4xl text-yellow-600 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2 text-paris-blue">رسالتنا</h3>
              <p className="text-gray-700 leading-relaxed">
                نلتزم بتقديم خدمات عالية الجودة للمواطنين من خلال الاستفادة من التكنولوجيا الحديثة، وتطوير البنية التحتية، ودعم التنمية الاقتصادية والاجتماعية المستدامة.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* روابط مهمة */}
      <section className="py-8 bg-paris-blue/10">
        <div className="container mx-auto px-4 max-w-2xl text-center flex flex-col gap-4 items-center">
          <a href="http://newvalley.gov.eg/Governorate-entities/Pages/GovernorateDetails.aspx?entitieCode=32" target="_blank" rel="noopener noreferrer">
            <button className="bg-paris-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow transition text-lg flex items-center gap-2">
              <FaGlobeAfrica className="text-xl" />
              زيارة صفحة المركز الرسمية
            </button>
          </a>
          <a href="https://maps.app.goo.gl/WGbGXuhQAypw4BZt8" target="_blank" rel="noopener noreferrer">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow transition text-lg flex items-center gap-2">
              <FaMapMarkerAlt className="text-xl" />
              عرض الموقع على الخريطة
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;