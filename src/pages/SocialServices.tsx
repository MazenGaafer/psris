import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaHeart, FaHandsHelping, FaChild, FaUserTie, FaUsers, FaUniversalAccess } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const socialServices = [
  {
    title: "برامج المساعدات الاجتماعية",
    icon: <FaHandsHelping className="inline-block text-green-600 mr-2" size={20} />,
    description: "تقديم مساعدات مالية وعينية للأسر الأكثر احتياجًا بالتعاون مع وزارة التضامن الاجتماعي.",
    documents: [
      "صورة بطاقة الرقم القومي",
      "بحث اجتماعي من الشؤون الاجتماعية",
      "إثبات دخل الأسرة (إن وجد)"
    ],
    steps: [
      "تقديم طلب المساعدة في المركز أو عبر الشؤون الاجتماعية",
      "تقديم المستندات المطلوبة",
      "إجراء بحث اجتماعي",
      "تحديد نوع وقيمة المساعدة وصرفها"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "رعاية الأيتام والمسنين",
    icon: <FaChild className="inline-block text-pink-600 mr-2" size={20} />,
    description: "خدمات رعاية وإيواء الأيتام والمسنين وتوفير الدعم النفسي والصحي لهم.",
    documents: [
      "صورة بطاقة الرقم القومي لمقدم الطلب",
      "شهادة ميلاد اليتيم أو بطاقة المسن",
      "إثبات عدم وجود عائل (للأيتام)"
    ],
    steps: [
      "تقديم طلب رعاية في المركز أو دار الرعاية",
      "تقديم المستندات المطلوبة",
      "دراسة الحالة وتوفير الرعاية اللازمة"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "برامج التأهيل المهني",
    icon: <FaUserTie className="inline-block text-blue-600 mr-2" size={20} />,
    description: "توفير دورات تدريبية وتأهيلية لذوي الاحتياجات الخاصة والعاطلين عن العمل.",
    documents: [
      "صورة بطاقة الرقم القومي",
      "شهادة المؤهل الدراسي (إن وجدت)"
    ],
    steps: [
      "تقديم طلب الالتحاق بالبرنامج",
      "تقديم المستندات المطلوبة",
      "تحديد البرنامج المناسب والبدء في التدريب"
    ],
    fees: "رسوم رمزية حسب نوع البرنامج"
  },
  {
    title: "دعم الأسر المحتاجة",
    icon: <FaUsers className="inline-block text-orange-600 mr-2" size={20} />,
    description: "تقديم دعم مالي أو عيني للأسر الفقيرة بعد دراسة الحالة الاجتماعية.",
    documents: [
      "صورة بطاقة الرقم القومي",
      "بحث اجتماعي",
      "إثبات دخل الأسرة (إن وجد)"
    ],
    steps: [
      "تقديم طلب الدعم في المركز",
      "تقديم المستندات المطلوبة",
      "إجراء بحث اجتماعي",
      "صرف الدعم بعد الموافقة"
    ],
    fees: "بدون رسوم"
  },
  {
    title: "خدمات ذوي الاحتياجات الخاصة",
    icon: <FaUniversalAccess className="inline-block text-purple-600 mr-2" size={20} />,
    description: "توفير أجهزة تعويضية، دعم تعليمي وصحي، وتسهيلات في الخدمات الحكومية.",
    documents: [
      "صورة بطاقة الرقم القومي",
      "شهادة الإعاقة أو تقرير طبي"
    ],
    steps: [
      "تقديم طلب الخدمة في المركز",
      "تقديم المستندات المطلوبة",
      "دراسة الحالة وتوفير الخدمة المناسبة"
    ],
    fees: "قد تفرض رسوم رمزية على بعض الأجهزة أو الخدمات"
  }
];

const SocialServices = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12">
      <Card className="max-w-3xl w-full card-shadow relative">
        <CardHeader className="flex flex-row items-center justify-between p-6 pb-2 mb-2">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-1 rounded-full bg-muted hover:bg-accent shadow-sm px-3 py-1 text-paris-blue hover:text-primary transition-colors text-sm font-medium"
            style={{ minWidth: 0 }}
          >
            <ArrowRight className="w-5 h-5" />
            <span className="hidden sm:inline">رجوع</span>
          </button>
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <FaHeart className="text-2xl text-red-600 ml-1" />
            <CardTitle>الخدمات الاجتماعية</CardTitle>
          </div>
          <CardDescription>
            جميع الخدمات الاجتماعية المتاحة في مركز باريس مع تفاصيل المستندات المطلوبة، الخطوات، والرسوم.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {socialServices.map((service, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-6 bg-white shadow-md transition-transform hover:scale-[1.025] hover:shadow-lg relative"
            >
              <div className="flex items-center mb-2">
                {service.icon}
                <h2 className="text-lg font-semibold">{service.title}</h2>
              </div>
              <p className="mb-3 text-gray-700">{service.description}</p>
              <div className="mb-2">
                <span className="font-semibold">المستندات المطلوبة:</span>
                <ul className="list-disc list-inside mr-4 mt-1">
                  {service.documents.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">الخطوات:</span>
                <ol className="list-decimal list-inside mr-4 mt-1">
                  {service.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <span className="font-semibold">الرسوم:</span> {service.fees}
              </div>
              {idx < socialServices.length - 1 && (
                <div className="border-t mt-6 pt-4 border-dashed border-gray-200" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialServices; 