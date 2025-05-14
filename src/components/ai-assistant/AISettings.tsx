
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  behavior: z.enum(["friendly", "professional", "concise"]),
  autoActions: z.object({
    crm: z.boolean(),
    campaigns: z.boolean(),
    reviews: z.boolean(),
    workflows: z.boolean(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  name: "AIDA",
  behavior: "professional",
  autoActions: {
    crm: false,
    campaigns: false,
    reviews: true,
    workflows: false,
  },
};

export function AISettings() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "AI settings updated",
      description: "Your AI assistant settings have been saved.",
    });
    console.log(data);
  }

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assistant Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a name" {...field} />
                </FormControl>
                <FormDescription>
                  This is how you'll refer to your AI assistant.
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="behavior"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Behavior Style</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a personality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly & Casual</SelectItem>
                    <SelectItem value="professional">Professional & Formal</SelectItem>
                    <SelectItem value="concise">Concise & Direct</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select how your AI assistant should communicate with you.
                </FormDescription>
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <h3 className="text-base font-medium">Auto-Actions</h3>
            <FormDescription>
              Allow the AI to automatically perform actions in these areas:
            </FormDescription>
            
            <FormField
              control={form.control}
              name="autoActions.crm"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel className="text-base">CRM</FormLabel>
                    <FormDescription>
                      Lead scoring, follow-ups, notes
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="autoActions.campaigns"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel className="text-base">Campaigns</FormLabel>
                    <FormDescription>
                      Ad optimization, A/B testing
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="autoActions.reviews"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel className="text-base">Reviews</FormLabel>
                    <FormDescription>
                      Review response drafts
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="autoActions.workflows"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel className="text-base">Workflows</FormLabel>
                    <FormDescription>
                      Automation suggestions
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
}
