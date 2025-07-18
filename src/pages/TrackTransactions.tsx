import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TrackTransactions = () => {
  const [transactionId, setTransactionId] = useState("");
  const [result, setResult] = useState<null | {status: string, lastUpdate: string}>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // مثال افتراضي
    setResult({ status: "قيد المراجعة", lastUpdate: "2024-07-20" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12">
      <Card className="max-w-md w-full card-shadow">
        <CardHeader>
          <CardTitle>متابعة المعاملات</CardTitle>
          <CardDescription>
            يمكنك من خلال هذه الصفحة متابعة حالة معاملتك الإدارية باستخدام رقم المعاملة.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input placeholder="أدخل رقم المعاملة" value={transactionId} onChange={e => setTransactionId(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">بحث</Button>
          </form>
          {result && (
            <div className="mt-6 text-center">
              <div className="text-lg font-bold">حالة المعاملة: {result.status}</div>
              <div className="text-sm text-muted-foreground">آخر تحديث: {result.lastUpdate}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackTransactions; 