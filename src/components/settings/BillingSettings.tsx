
import { useState } from "react";
import { CreditCard, Download, Plus, Check, Info, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function BillingSettings() {
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setCouponCode("");
      // Show success message in a real implementation
    }, 1500);
  };
  
  const invoices = [
    { id: "INV-001", date: "May 1, 2023", amount: "$79.00", status: "paid" },
    { id: "INV-002", date: "Apr 1, 2023", amount: "$79.00", status: "paid" },
    { id: "INV-003", date: "Mar 1, 2023", amount: "$79.00", status: "paid" },
    { id: "INV-004", date: "Feb 1, 2023", amount: "$59.00", status: "paid" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Billing & Plans</h2>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the Pro plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
                <Badge className="bg-primary">Current</Badge>
              </div>
              <p className="text-muted-foreground">$79/month, billed monthly</p>
            </div>
            
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Plan</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Subscription Plan</DialogTitle>
                    <DialogDescription>
                      Select your new plan. Changes will be applied at the end of your billing cycle.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid gap-3">
                      <Card className="border-2 border-primary">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Pro</h4>
                              <p className="text-sm text-muted-foreground">$79/month</p>
                            </div>
                            <Badge className="bg-primary">Current</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Basic</h4>
                              <p className="text-sm text-muted-foreground">$39/month</p>
                            </div>
                            <Button size="sm">Downgrade</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Enterprise</h4>
                              <p className="text-sm text-muted-foreground">$299/month</p>
                            </div>
                            <Button size="sm">Upgrade</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-destructive">Cancel Plan</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Cancel Your Subscription</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel your subscription? Your access will continue until the end of your billing period.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      We're sorry to see you go. Please let us know why you're cancelling so we can improve our service:
                    </p>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="reason-price" name="cancel-reason" />
                        <label htmlFor="reason-price" className="text-sm">Too expensive</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="reason-features" name="cancel-reason" />
                        <label htmlFor="reason-features" className="text-sm">Missing features</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="reason-alternative" name="cancel-reason" />
                        <label htmlFor="reason-alternative" className="text-sm">Found an alternative</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="reason-other" name="cancel-reason" />
                        <label htmlFor="reason-other" className="text-sm">Other reason</label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                    <Button variant="outline">Keep My Subscription</Button>
                    <Button variant="destructive">Cancel Subscription</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Plan Usage</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Contacts</span>
                  <span className="font-medium">8,234 / 10,000</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Campaigns</span>
                  <span className="font-medium">4 / 15</span>
                </div>
                <Progress value={27} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Team Members</span>
                  <span className="font-medium">3 / 5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Messages</span>
                  <span className="font-medium">23,560 / 50,000</span>
                </div>
                <Progress value={47} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods and billing address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-muted flex items-center justify-center p-2 rounded-md">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <Badge variant="outline" className="ml-2 text-xs">Default</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            
            <Button variant="outline" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Payment Method</span>
            </Button>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Billing Address</h3>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-medium">Alex Johnson</p>
              <p className="text-muted-foreground">Acme Inc</p>
              <p className="text-muted-foreground">123 Main St, Suite 456</p>
              <p className="text-muted-foreground">San Francisco, CA 94103</p>
              <p className="text-muted-foreground">United States</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your previous invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border divide-y">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm bg-muted/50">
              <div className="col-span-1">Invoice</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Amount</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Download</div>
            </div>
            
            {invoices.map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-5 gap-4 p-4 items-center text-sm">
                <div className="col-span-1 font-medium">{invoice.id}</div>
                <div className="col-span-1 text-muted-foreground">{invoice.date}</div>
                <div className="col-span-1">{invoice.amount}</div>
                <div className="col-span-1">
                  <Badge 
                    variant="outline" 
                    className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 capitalize"
                  >
                    {invoice.status}
                  </Badge>
                </div>
                <div className="col-span-1 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Coupon Code</CardTitle>
            <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardDescription>Apply a promotional code to your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter coupon code" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button onClick={handleApplyCoupon} disabled={!couponCode || isApplying}>
              {isApplying ? "Applying..." : "Apply"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I change my plan?</AccordionTrigger>
              <AccordionContent>
                You can change your plan at any time by clicking the "Change Plan" button in the Current Plan section.
                Plan changes will be applied at the end of your current billing cycle.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>When will I be charged?</AccordionTrigger>
              <AccordionContent>
                Your subscription is charged automatically on the 1st of each month. If you upgrade mid-month,
                we'll prorate the charge for the remainder of the month.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I cancel at any time?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your
                current billing period. There are no refunds for partial months.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you offer annual billing?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer annual billing with a 15% discount compared to monthly billing.
                Contact our sales team for more information about annual plans.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
