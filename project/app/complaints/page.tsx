'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageSquare, Send, Twitter, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

export default function ComplaintsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tweetText, setTweetText] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [taggedUsers, setTaggedUsers] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
      toast.success('Image uploaded successfully');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !selectedDepartment) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically handle the tweet creation and complaint submission
    const tweetContent = `${tweetText} ${taggedUsers}`;
    console.log('Tweet content:', tweetContent);
    console.log('Image:', image);

    toast.success('Complaint submitted and tweeted successfully');
    setTitle('');
    setDescription('');
    setTweetText('');
    setSelectedDepartment('');
    setTaggedUsers('');
    setImage(null);
  };

  const removeImage = () => {
    setImage(null);
    toast.success('Image removed');
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Submit a Complaint</h1>
        <p className="mt-2 text-muted-foreground">
          Share your concerns and tweet about environmental issues.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="environmental">Environmental Control</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                  <SelectItem value="energy">Energy Department</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="water">Water Resources</SelectItem>
                  <SelectItem value="wildlife">Wildlife</SelectItem>    
                  </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Brief summary of your complaint"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about your complaint"
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tweet">Tweet Content</Label>
              <Textarea
                id="tweet"
                placeholder="What would you like to tweet about this issue?"
                className="min-h-[80px]"
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tag Users (@mentions)</Label>
              <Input
                id="tags"
                placeholder="@username1 @username2"
                value={taggedUsers}
                onChange={(e) => setTaggedUsers(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Photo</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <input {...getInputProps()} />
                {image ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{image.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop an image here, or click to select
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit & Tweet
              <Twitter className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <MessageSquare className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">What happens next?</h3>
              <p className="text-sm text-muted-foreground">
                Our response process explained
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                1
              </div>
              <div>
                <h4 className="font-semibold">Social Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Your complaint is shared on Twitter for visibility
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                2
              </div>
              <div>
                <h4 className="font-semibold">Department Review</h4>
                <p className="text-sm text-muted-foreground">
                  Relevant department investigates the issue
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                3
              </div>
              <div>
                <h4 className="font-semibold">Resolution</h4>
                <p className="text-sm text-muted-foreground">
                  You receive a response and action plan
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}