import { useState, useCallback } from 'react';
import { MessageSquarePlus, Star, Send } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { useToast } from '@/shared/lib/use-toast';
import { cn } from '@/shared/lib/utils';

type FeedbackType = 'bug' | 'feature' | 'general';

interface FeedbackFormState {
  type: FeedbackType;
  subject: string;
  description: string;
  email: string;
  rating: number;
}

const INITIAL_FORM_STATE: FeedbackFormState = {
  type: 'general',
  subject: '',
  description: '',
  email: '',
  rating: 0,
};

const FEEDBACK_TYPES: { value: FeedbackType; label: string }[] = [
  { value: 'bug', label: 'Bug Report' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'general', label: 'General Feedback' },
];

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FeedbackFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        resetForm();
        setShowSuccess(false);
      }
      setOpen(nextOpen);
    },
    [resetForm],
  );

  const handleSubmit = useCallback(() => {
    if (!form.subject.trim() || !form.description.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission -- store locally for now
    try {
      const key = 'platform-explorer-feedback';
      const stored = localStorage.getItem(key);
      const feedbacks: Array<FeedbackFormState & { timestamp: number; url: string }> = stored
        ? JSON.parse(stored)
        : [];

      feedbacks.push({
        ...form,
        subject: form.subject.trim(),
        description: form.description.trim(),
        email: form.email.trim(),
        timestamp: Date.now(),
        url: window.location.href,
      });

      // Keep only last 100 entries
      if (feedbacks.length > 100) {
        feedbacks.shift();
      }

      localStorage.setItem(key, JSON.stringify(feedbacks));
    } catch (error) {
      console.error('Failed to save feedback locally:', error);
    }

    setIsSubmitting(false);
    setShowSuccess(true);

    toast({
      title: 'Feedback submitted',
      description: 'Thank you for your feedback!',
    });

    // Close dialog after 1.5s delay
    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
      setOpen(false);
    }, 1500);
  }, [form, resetForm, toast]);

  const isFormValid = form.subject.trim().length > 0 && form.description.trim().length > 0;

  return (
    <>
      {/* Floating Action Button */}
      <Button
        data-testid="feedback-fab"
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        onClick={() => setOpen(true)}
        aria-label="Open feedback form"
      >
        <MessageSquarePlus className="h-6 w-6" />
      </Button>

      {/* Feedback Dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          data-testid="feedback-dialog"
          className="sm:max-w-[480px]"
        >
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              Help us improve by sharing your thoughts, reporting bugs, or requesting features.
            </DialogDescription>
          </DialogHeader>

          {showSuccess ? (
            <div
              data-testid="feedback-success"
              className="flex flex-col items-center justify-center py-8 gap-3"
            >
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-foreground">Thank you!</p>
              <p className="text-sm text-muted-foreground">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Feedback Type Selector */}
              <div className="space-y-2">
                <Label>Type</Label>
                <div
                  data-testid="feedback-type-selector"
                  className="flex gap-2"
                >
                  {FEEDBACK_TYPES.map(({ value, label }) => (
                    <Button
                      key={value}
                      data-testid={`feedback-type-${value}`}
                      type="button"
                      variant={form.type === value ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setForm((prev) => ({ ...prev, type: value }))}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="feedback-subject">
                  Subject <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="feedback-subject"
                  data-testid="feedback-subject"
                  placeholder="Brief summary of your feedback"
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  maxLength={120}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="feedback-description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="feedback-description"
                  data-testid="feedback-description"
                  placeholder="Please describe your feedback in detail..."
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  maxLength={1000}
                  className="resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground text-right">
                  {form.description.length}/1000
                </p>
              </div>

              {/* Email (optional) */}
              <div className="space-y-2">
                <Label htmlFor="feedback-email">Email (optional)</Label>
                <Input
                  id="feedback-email"
                  data-testid="feedback-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              {/* Star Rating */}
              <div className="space-y-2">
                <Label>Rating</Label>
                <div
                  data-testid="feedback-rating"
                  className="flex gap-1"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      data-testid={`feedback-star-${star}`}
                      type="button"
                      className="p-1 rounded transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          rating: prev.rating === star ? 0 : star,
                        }))
                      }
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={cn(
                          'h-6 w-6 transition-colors',
                          star <= form.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground',
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!showSuccess && (
            <DialogFooter>
              <Button
                data-testid="feedback-submit"
                type="button"
                disabled={!isFormValid || isSubmitting}
                onClick={handleSubmit}
                className="w-full sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
