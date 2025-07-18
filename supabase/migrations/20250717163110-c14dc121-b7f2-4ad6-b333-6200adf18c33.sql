-- Create complaints table
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create enum for complaint categories
CREATE TYPE complaint_category AS ENUM (
  'infrastructure',
  'public_services', 
  'health',
  'education',
  'environment',
  'security',
  'other'
);

-- Create enum for complaint priority
CREATE TYPE complaint_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create enum for complaint status  
CREATE TYPE complaint_status AS ENUM ('pending', 'in_progress', 'resolved', 'rejected');

-- Alter complaints table to use enums
ALTER TABLE public.complaints 
  ALTER COLUMN category TYPE complaint_category USING category::complaint_category,
  ALTER COLUMN priority TYPE complaint_priority USING priority::complaint_priority,
  ALTER COLUMN status TYPE complaint_status USING status::complaint_status;

-- Enable Row Level Security
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- RLS Policies for complaints
-- Citizens can view their own complaints
CREATE POLICY "Citizens can view their own complaints" 
ON public.complaints 
FOR SELECT 
USING (auth.uid() = user_id);

-- Citizens can create their own complaints
CREATE POLICY "Citizens can create complaints" 
ON public.complaints 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Citizens can update their own pending complaints
CREATE POLICY "Citizens can update their own pending complaints" 
ON public.complaints 
FOR UPDATE 
USING (auth.uid() = user_id AND status = 'pending');

-- Employees can view all complaints
CREATE POLICY "Employees can view all complaints" 
ON public.complaints 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'employee'
  )
);

-- Employees can update all complaints
CREATE POLICY "Employees can update complaints" 
ON public.complaints 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'employee'
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_complaints_updated_at
BEFORE UPDATE ON public.complaints
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();