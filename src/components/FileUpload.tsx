import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, Image, FileText, Brain, Sparkles, CheckCircle, X } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  preview?: string;
}

interface FileUploadProps {
  theme: string;
  onFilesProcessed: (files: UploadedFile[]) => void;
}

export default function FileUpload({ theme, onFilesProcessed }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = async (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/gif', 'text/plain'];
      return validTypes.includes(file.type) && file.size <= 20 * 1024 * 1024; // 20MB max
    });

    if (validFiles.length !== fileList.length) {
      toast({
        title: "Some files were skipped",
        description: "Only PDF, Word docs, images, and text files under 20MB are supported.",
        variant: "destructive"
      });
    }

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    for (const newFile of newFiles) {
      await simulateFileProcessing(newFile);
    }

    toast({
      title: "Files processed successfully!",
      description: `${validFiles.length} files are ready for AI analysis.`
    });

    onFilesProcessed([...files, ...newFiles]);
  };

  const simulateFileProcessing = async (file: UploadedFile) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, progress } : f
      ));
    }

    // Change to processing
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, status: 'processing', progress: 0 } : f
    ));

    // Simulate processing
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, progress } : f
      ));
    }

    // Complete
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, status: 'completed', progress: 100 } : f
    ));
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-6 h-6 text-blue-500" />;
    if (type.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />;
    return <File className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-fredoka font-bold mb-2">Upload Your Study Materials</h2>
        <p className="text-lg text-muted-foreground">
          Drop your PDFs, docs, or images and I'll create personalized quizzes and study guides!
        </p>
      </div>

      <Card
        className={`relative border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer hover:shadow-lg ${
          isDragOver 
            ? 'border-primary bg-primary/5 shadow-primary' 
            : 'border-muted-foreground/30 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-fredoka font-bold mb-2">
              {isDragOver ? 'Drop your files here!' : 'Drag & drop your study materials'}
            </h3>
            <p className="text-muted-foreground mb-4">
              or <span className="text-primary font-semibold">click to browse</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PDF, Word, Images, Text • Max 20MB per file
            </p>
          </div>

          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Brain className="w-4 h-4 text-primary" />
              <span>AI Analysis</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Smart Quizzes</span>
            </div>
          </div>
        </div>
      </Card>

      {files.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-fredoka font-bold mb-4">Processing Files</h3>
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                {getFileIcon(file.type)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      {file.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-success" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={file.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {file.status === 'uploading' && 'Uploading...'}
                      {file.status === 'processing' && 'AI is analyzing your content...'}
                      {file.status === 'completed' && 'Ready for learning!'}
                      {file.status === 'error' && 'Error processing file'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {files.some(f => f.status === 'completed') && (
            <div className="mt-6 text-center">
              <Button size="lg" className="btn-hover-lift">
                <Brain className="w-5 h-5 mr-2" />
                Generate Study Materials
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}