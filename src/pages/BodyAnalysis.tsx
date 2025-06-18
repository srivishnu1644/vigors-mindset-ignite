
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, FileText } from "lucide-react";

export const BodyAnalysis = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [complaints, setComplaints] = useState("");
  const [history, setHistory] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Upload PDFs to Supabase Storage
  const handlePdfUpload = async () => {
    if (!user?.id) return;
    if (pdfFiles.length === 0) {
      toast({ title: "No PDF selected", description: "Please select at least one PDF to upload.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const results: string[] = [];
    for (const file of pdfFiles) {
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from("body-analysis-pdfs").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) {
        toast({ title: "Upload failed", description: error.message, variant: "destructive" });
        setUploading(false);
        return;
      }
      results.push(path);
    }
    setUploadedFiles(results);
    setUploading(false);
    toast({ title: "Upload successful", description: "Your files have been uploaded." });
  };

  // Reset form on submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data to Supabase if required; for demonstration we're only showing a toast.
    toast({
      title: "Form submitted",
      description: "Your complaints and medical history have been saved.",
    });
    setComplaints("");
    setHistory("");
    setPdfFiles([]);
    setUploadedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/health")}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Health
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">
                BODY <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">ANALYSIS</span>
              </h1>
            </div>
          </div>
          <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-black/60 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-6 h-6 text-green-400" />
              Upload Medical PDFs
            </CardTitle>
            <CardDescription className="text-gray-300">
              Blood Tests (CBC, liver/kidney/HbA1c, lipid), Urine Analysis (PDFs)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="pdf-upload" className="text-white">Select PDF files</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              multiple
              onChange={e => setPdfFiles(Array.from(e.target.files || []))}
              className="bg-gray-800 border-gray-600 text-white mb-2"
              disabled={uploading}
            />
            <Button onClick={handlePdfUpload} disabled={!pdfFiles.length || uploading} className="mb-4 mt-1 bg-gradient-to-r from-green-600 to-emerald-600">
              {uploading ? "Uploading..." : "Upload PDFs"}
            </Button>
            {uploadedFiles.length > 0 && (
              <div className="text-sm text-green-400 mb-4">
                <div className="font-semibold mb-2">Uploaded files:</div>
                <ul className="list-disc pl-4">
                  {uploadedFiles.map((f, idx) => (
                    <li key={idx}><a href={`https://idrizzffwnujhbmkwqys.supabase.co/storage/v1/object/public/body-analysis-pdfs/${f}`} target="_blank" rel="noopener noreferrer">{f.split('/').pop()}</a></li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <Label htmlFor="complaints" className="text-white">Presenting complaints & symptom timeline</Label>
                <Input
                  id="complaints"
                  placeholder="Describe complaints and timeline..."
                  value={complaints}
                  onChange={e => setComplaints(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="history" className="text-white">Past Medical History</Label>
                <Input
                  id="history"
                  placeholder="E.g. diabetes, hypertension, surgeries"
                  value={history}
                  onChange={e => setHistory(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 mt-2">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BodyAnalysis;
