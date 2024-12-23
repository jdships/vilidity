'use client';

import { useAuth } from '@repo/auth/client';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/design-system/components/ui/sheet';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';
import { cn } from '@repo/design-system/lib/utils';
import { Check, HelpCircle, PhoneCall, X } from 'lucide-react';
import type { ReactElement } from 'react';
import { useState } from 'react';

interface Feature {
  name: string;
  tooltip: string;
  explorer: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number | null;
  isOneTime?: boolean;
}

export function UpgradeContent(): ReactElement {
  const { isLoaded } = useAuth();

  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: 'Per Validation',
      description:
        'One-time validation with core Pro features for a single idea or project',
      monthlyPrice: 9,
      isOneTime: true,
    },
    {
      name: 'Explorer',
      description:
        'Perfect for solo founders and early-stage startups validating their first ideas',
      monthlyPrice: 29,
    },
    {
      name: 'Pro',
      description:
        'For teams actively validating multiple ideas and building products',
      monthlyPrice: 69,
    },
    {
      name: 'Enterprise',
      description:
        'Custom solutions for organizations with advanced validation needs',
      monthlyPrice: null,
    },
  ];

  const features = [
    {
      name: 'AI Market Analysis',
      tooltip: 'Analyze market trends and opportunities using our AI models',
      explorer: true,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Validation Reports',
      tooltip: 'Detailed reports with market insights and recommendations',
      explorer: '3/month',
      pro: 'Unlimited',
      enterprise: 'Unlimited',
    },
    {
      name: 'Team Members',
      tooltip: 'Number of team members who can access the platform',
      explorer: '1 member',
      pro: 'Up to 5',
      enterprise: 'Unlimited',
    },
    {
      name: 'Competitor Analysis',
      tooltip: 'Analyze similar products and market positioning',
      explorer: true,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Virality Scoring',
      tooltip: "Predict and optimize your idea's viral potential",
      explorer: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Custom AI Models',
      tooltip: 'Tailored AI models for your specific industry',
      explorer: false,
      pro: false,
      enterprise: true,
    },
    {
      name: 'Priority Support',
      tooltip: '24/7 priority support with dedicated account manager',
      explorer: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'API Access',
      tooltip: 'Programmatic access to our validation platform',
      explorer: false,
      pro: true,
      enterprise: true,
    },
  ];

  const contactFeatures = [
    { id: 'higher-limits', label: 'Higher validation limits' },
    { id: 'custom-models', label: 'Custom AI models' },
    { id: 'team-access', label: 'Extended team access' },
    { id: 'priority-support', label: 'Priority support & training' },
    { id: 'api-access', label: 'API access' },
    { id: 'custom-integrations', label: 'Custom integrations' },
    { id: 'white-label', label: 'White-label solutions' },
    { id: 'custom-reports', label: 'Custom validation reports' },
  ];

  function getPriceDisplay(price: number | null, isOneTime?: boolean) {
    if (!price) {
      return 'Custom';
    }
    if (isOneTime) {
      return `$${price}`;
    }
    return `$${isYearly ? price * 10 : price}`;
  }

  function getPeriodDisplay(price: number | null, isOneTime?: boolean) {
    if (!price) {
      return ' pricing';
    }
    if (isOneTime) {
      return ' one-time';
    }
    return ` / ${isYearly ? 'year' : 'month'}`;
  }

  function getFeatureValue(
    feature: Feature,
    planKey: keyof Feature
  ): React.ReactNode {
    const value = feature[planKey];

    if (typeof value === 'string') {
      return <span className="text-sm">{value}</span>;
    }

    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      );
    }
  }

  function getPerValidationFeature(feature: Feature): React.ReactNode {
    const specialCases: Record<string, React.ReactNode> = {
      'Validation Reports': <span className="text-sm">1 report</span>,
      'Team Members': <span className="text-sm">1 member</span>,
    };

    if (feature.name in specialCases) {
      return specialCases[feature.name];
    }

    if (feature.name === 'API Access' || feature.name === 'Priority Support') {
      return <X className="h-4 w-4 text-muted-foreground" />;
    }

    return <Check className="h-4 w-4 text-primary" />;
  }

  function getFeatureDisplay(feature: Feature, plan: string): React.ReactNode {
    if (plan === 'per-validation') {
      return getPerValidationFeature(feature);
    }

    const planMap: Record<string, keyof Feature> = {
      explorer: 'explorer',
      pro: 'pro',
      enterprise: 'enterprise',
    };

    const planKey = planMap[plan];
    if (planKey) {
      return getFeatureValue(feature, planKey);
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-semibold text-lg tracking-tight">Upgrade</h1>
          <p className="text-muted-foreground text-sm">
            Choose the plan that best fits your needs and unlock advanced
            features.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex items-center">
          <div className="inline-flex items-center gap-1 rounded-full border p-1">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-3 py-1 font-semibold text-xs transition-colors ${
                isYearly
                  ? 'text-muted-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-3 py-1 font-semibold text-xs transition-colors ${
                isYearly
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Annually
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans
            .filter((plan) => plan.name !== 'Enterprise')
            .map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'flex h-full flex-col gap-4 rounded-lg border bg-background p-4 sm:p-6',
                  plan.name === 'Explorer' && 'relative border-2 border-primary'
                )}
              >
                {plan.name === 'Explorer' && (
                  <div className="-top-3 absolute right-0 left-0 flex justify-center">
                    <Badge
                      variant="default"
                      className="rounded-full px-3 py-1 font-semibold"
                    >
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg tracking-tight">
                      {plan.name}
                    </h3>
                    {isYearly && plan.monthlyPrice && !plan.isOneTime && (
                      <Badge variant="secondary" className="w-fit">
                        2 months free
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-3xl">
                    {getPriceDisplay(plan.monthlyPrice, plan.isOneTime)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {getPeriodDisplay(plan.monthlyPrice, plan.isOneTime)}
                  </span>
                </div>

                <Button
                  variant={plan.name === 'Explorer' ? 'default' : 'outline'}
                  className="w-full"
                >
                  Get started
                </Button>

                <div className="mt-4">
                  <p className="font-medium text-sm">What's included:</p>
                  <ul className="mt-4 space-y-3">
                    {plan.name === 'Per Validation' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">One-time validation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Core Pro features</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Detailed report</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Basic support</span>
                        </li>
                      </>
                    )}
                    {plan.name === 'Explorer' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">AI Market Analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">
                            3 Validation Reports / month
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">1 Team Member</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Competitor Analysis</span>
                        </li>
                      </>
                    )}
                    {plan.name === 'Pro' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">
                            Everything in Explorer
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Unlimited Reports</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Up to 5 Team Members</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Virality Scoring</span>
                        </li>
                      </>
                    )}
                    {plan.name === 'Enterprise' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Everything in Pro</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">
                            Unlimited Team Members
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Custom AI Models</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Priority Support</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        {/* Compare Features */}
        <div>
          <div className="space-y-8 rounded-lg border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="px-6 py-4 text-left font-medium">
                      Features
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Per Validation
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Explorer
                    </th>
                    <th className="px-6 py-4 text-center font-medium">Pro</th>
                    <th className="px-6 py-4 text-center font-medium">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {features.map((feature, i) => (
                    <tr
                      key={feature.name}
                      className={i !== features.length - 1 ? 'border-b' : ''}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {feature.name}
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>{feature.tooltip}</TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          {getFeatureDisplay(feature, 'per-validation')}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          {getFeatureDisplay(feature, 'explorer')}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          {getFeatureDisplay(feature, 'pro')}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          {getFeatureDisplay(feature, 'enterprise')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Enterprise Section */}
        <div className="mt-12">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-semibold text-lg tracking-tight">
                  Enterprise
                </h3>
                <p className="mt-2 max-w-xl text-muted-foreground text-sm">
                  Enterprise is your best bet if you need unlimited access,
                  flat-file transfers, extended data points, private APIs,
                  customized legal agreements, and more.
                </p>
              </div>
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Contact sales <PhoneCall className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-[600px]">
                    <SheetHeader>
                      <SheetTitle>Contact Sales</SheetTitle>
                      <SheetDescription>
                        Tell us about your needs and our team will get back to
                        you shortly.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label>What features are you interested in?</Label>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {contactFeatures.map((feature) => (
                            <div
                              key={feature.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={feature.id} />
                              <Label
                                htmlFor={feature.id}
                                className="font-normal"
                              >
                                {feature.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Anything else we should know?
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your validation needs..."
                          className="min-h-[100px]"
                        />
                      </div>
                      <Button className="w-full">Send message</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
