import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const RequestCertificate = () => {
  const [form, setForm] = useState({
    name: "",
    certificateType: "",
    nationalId: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12">
      <Card className="max-w-md w-full card-shadow">
        <CardHeader>
          <CardTitle>طلب شهادة أو إفادة رسمية</CardTitle>
          <CardDescription>
            يمكنك من خلال هذه الصفحة طلب شهادات الميلاد، الوفاة، أو أي إفادة رسمية من المركز.
            يرجى ملء البيانات بدقة وسيتم التواصل معك بعد مراجعة الطلب.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 font-bold py-8">تم إرسال الطلب بنجاح! سيتم التواصل معك قريبًا.</div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">الاسم بالكامل</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="certificateType">نوع الشهادة</Label>
                <select id="certificateType" name="certificateType" className="w-full border rounded px-3 py-2" value={form.certificateType} onChange={handleChange} required>
                  <option value="">اختر نوع الشهادة</option>
                  <option value="birth">شهادة ميلاد</option>
                  <option value="death">شهادة وفاة</option>
                  <option value="residence">إفادة سكن</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              <div>
                <Label htmlFor="nationalId">الرقم القومي</Label>
                <Input id="nationalId" name="nationalId" value={form.nationalId} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full">إرسال الطلب</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestCertificate; 