import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRight, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ComplaintCategory = 'infrastructure' | 'public_services' | 'health' | 'education' | 'environment' | 'security' | 'other';
type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

interface ComplaintForm {
  title: string;
  description: string;
  category: ComplaintCategory | '';
  priority: ComplaintPriority;
}

const SubmitComplaint = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ComplaintForm>({
    title: '',
    description: '',
    category: '',
    priority: 'medium'
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "مطلوب تسجيل الدخول",
          description: "يجب تسجيل الدخول لتقديم شكوى",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ComplaintForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      const { error } = await supabase
        .from('complaints')
        .insert({
          user_id: user.id,
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category as ComplaintCategory,
          priority: formData.priority
        });

      if (error) {
        throw error;
      }

      toast({
        title: "تم تقديم الشكوى",
        description: "تم تقديم شكواك بنجاح. سيتم مراجعتها قريباً.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium'
      });

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast({
        title: "خطأ في التقديم",
        description: "حدث خطأ أثناء تقديم الشكوى. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      infrastructure: 'البنية التحتية',
      public_services: 'الخدمات العامة',
      health: 'الصحة',
      education: 'التعليم',
      environment: 'البيئة',
      security: 'الأمن',
      other: 'أخرى'
    };
    return labels[category] || category;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      urgent: 'عاجل',
      high: 'عالي',
      medium: 'متوسط',
      low: 'منخفض'
    };
    return labels[priority] || priority;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="ml-4"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للرئيسية
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="h-6 w-6 ml-2" />
                تقديم شكوى
              </h1>
              <p className="text-gray-600">
                قدم شكواك وسيتم مراجعتها من قبل المسؤولين
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الشكوى</CardTitle>
            <CardDescription>
              يرجى ملء جميع الحقول لتقديم شكواك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الشكوى *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="اكتب عنوان مختصر للشكوى"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">فئة الشكوى *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر فئة الشكوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">{getCategoryLabel('infrastructure')}</SelectItem>
                    <SelectItem value="public_services">{getCategoryLabel('public_services')}</SelectItem>
                    <SelectItem value="health">{getCategoryLabel('health')}</SelectItem>
                    <SelectItem value="education">{getCategoryLabel('education')}</SelectItem>
                    <SelectItem value="environment">{getCategoryLabel('environment')}</SelectItem>
                    <SelectItem value="security">{getCategoryLabel('security')}</SelectItem>
                    <SelectItem value="other">{getCategoryLabel('other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">أولوية الشكوى</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange('priority', value as ComplaintPriority)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{getPriorityLabel('low')}</SelectItem>
                    <SelectItem value="medium">{getPriorityLabel('medium')}</SelectItem>
                    <SelectItem value="high">{getPriorityLabel('high')}</SelectItem>
                    <SelectItem value="urgent">{getPriorityLabel('urgent')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف تفصيلي للشكوى *</Label>
                <Textarea
                  id="description"
                  placeholder="اكتب وصف تفصيلي للمشكلة..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-32"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? 'جاري التقديم...' : 'تقديم الشكوى'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SubmitComplaint;