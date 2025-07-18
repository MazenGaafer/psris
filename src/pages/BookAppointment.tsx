import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const BookAppointment = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <CardTitle>حجز موعد</CardTitle>
          <CardDescription>
            يمكنك من خلال هذه الصفحة حجز موعد مسبق في المركز لتسهيل حصولك على الخدمة دون انتظار.
            يرجى ملء البيانات بدقة وسيتم التواصل معك لتأكيد الموعد.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 font-bold py-8">تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.</div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">الاسم بالكامل</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone">رقم التليفون</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="date">تاريخ الموعد</Label>
                <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="time">وقت الموعد</Label>
                <Input id="time" name="time" type="time" value={form.time} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full">إرسال الطلب</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointment; 