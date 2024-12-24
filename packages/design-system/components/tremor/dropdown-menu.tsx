// Tremor Dropdown Menu [v0.0.2]

'use client';

import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import {
  RiArrowRightSLine,
  RiCheckLine,
  RiCheckboxBlankCircleLine,
  RiRadioButtonFill,
} from '@remixicon/react';
import * as React from 'react';

import { cn } from '@repo/design-system/lib/utils';

const DropdownMenu = DropdownMenuPrimitives.Root;
DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = DropdownMenuPrimitives.Trigger;
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuGroup = DropdownMenuPrimitives.Group;
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

const DropdownMenuSubMenu = DropdownMenuPrimitives.Sub;
DropdownMenuSubMenu.displayName = 'DropdownMenuSubMenu';

const DropdownMenuRadioGroup = DropdownMenuPrimitives.RadioGroup;
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

const DropdownMenuSubMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.SubTrigger>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubTrigger>,
    'asChild'
  >
>(({ className, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.SubTrigger
    ref={forwardedRef}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      className
    )}
    {...props}
  >
    {children}
    <RiArrowRightSLine className="ml-auto size-4 shrink-0" aria-hidden="true" />
  </DropdownMenuPrimitives.SubTrigger>
));
DropdownMenuSubMenuTrigger.displayName = 'DropdownMenuSubMenuTrigger';

const DropdownMenuSubMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubContent>
>(({ className, collisionPadding = 8, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Portal>
    <DropdownMenuPrimitives.SubContent
      ref={forwardedRef}
      collisionPadding={collisionPadding}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitives.Portal>
));
DropdownMenuSubMenuContent.displayName = 'DropdownMenuSubMenuContent';

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Content>
>(
  (
    {
      className,
      sideOffset = 8,
      collisionPadding = 8,
      align = 'center',
      loop = true,
      ...props
    },
    forwardedRef
  ) => (
    <DropdownMenuPrimitives.Portal>
      <DropdownMenuPrimitives.Content
        ref={forwardedRef}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in',
          className
        )}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        loop={loop}
        {...props}
      />
    </DropdownMenuPrimitives.Portal>
  )
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Item>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Item>,
    'asChild'
  > & {
    shortcut?: string;
    hint?: string;
  }
>(({ className, shortcut, hint, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Item
    ref={forwardedRef}
    suppressHydrationWarning
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    tremor-id="tremor-raw"
    {...props}
  >
    {children}
    {hint && (
      <span
        suppressHydrationWarning
        className={cn(
          'ml-auto text-muted-foreground text-xs tracking-widest',
          className
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        suppressHydrationWarning
        className={cn(
          'ml-auto text-muted-foreground text-xs tracking-widest',
          className
        )}
      >
        {shortcut}
      </span>
    )}
  </DropdownMenuPrimitives.Item>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.CheckboxItem>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.CheckboxItem>,
    'asChild'
  > & {
    shortcut?: string;
    hint?: string;
  }
>(
  (
    { className, hint, shortcut, children, checked, ...props },
    forwardedRef
  ) => (
    <DropdownMenuPrimitives.CheckboxItem
      ref={forwardedRef}
      className={cn(
        // base
        'relative flex cursor-pointer select-none items-center gap-x-2 rounded py-1.5 pr-1 pl-8 outline-none transition-colors data-[state=checked]:font-semibold sm:text-sm',
        // text color
        'text-gray-900 dark:text-gray-50',
        // disabled
        'data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[disabled]:hover:bg-none dark:data-[disabled]:text-gray-600',
        // focus
        'focus-visible:bg-gray-100 focus-visible:dark:bg-gray-900',
        // hover
        'hover:bg-gray-100 hover:dark:bg-gray-900',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitives.ItemIndicator>
          <RiCheckLine
            aria-hidden="true"
            className="size-full shrink-0 text-gray-800 dark:text-gray-200"
          />
        </DropdownMenuPrimitives.ItemIndicator>
      </span>
      {children}
      {hint && (
        <span
          className={cn(
            'ml-auto font-normal text-gray-400 text-sm dark:text-gray-600'
          )}
        >
          {hint}
        </span>
      )}
      {shortcut && (
        <span
          className={cn(
            'ml-auto font-normal text-gray-400 text-sm tracking-widest dark:border-gray-800 dark:text-gray-600'
          )}
        >
          {shortcut}
        </span>
      )}
    </DropdownMenuPrimitives.CheckboxItem>
  )
);
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.RadioItem>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.RadioItem>,
    'asChild'
  > & {
    shortcut?: string;
    hint?: string;
  }
>(({ className, hint, shortcut, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.RadioItem
    ref={forwardedRef}
    className={cn(
      // base
      'group/DropdownMenuRadioItem relative flex cursor-pointer select-none items-center gap-x-2 rounded py-1.5 pr-1 pl-8 outline-none transition-colors data-[state=checked]:font-semibold sm:text-sm',
      // text color
      'text-gray-900 dark:text-gray-50',
      // disabled
      'data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[disabled]:hover:bg-none dark:data-[disabled]:text-gray-600',
      // focus
      'focus-visible:bg-gray-100 focus-visible:dark:bg-gray-900',
      // hover
      'hover:bg-gray-100 hover:dark:bg-gray-900',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <RiRadioButtonFill
        aria-hidden="true"
        className="size-full shrink-0 text-blue-500 group-data-[state=checked]/DropdownMenuRadioItem:flex group-data-[state=unchecked]/DropdownMenuRadioItem:hidden dark:text-blue-500"
      />
      <RiCheckboxBlankCircleLine
        aria-hidden="true"
        className="size-full shrink-0 text-gray-300 group-data-[state=unchecked]/DropdownMenuRadioItem:flex group-data-[state=checked]/DropdownMenuRadioItem:hidden dark:text-gray-700"
      />
    </span>
    {children}
    {hint && (
      <span
        className={cn(
          'ml-auto font-normal text-gray-400 text-sm dark:text-gray-600'
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cn(
          'ml-auto font-normal text-gray-400 text-sm tracking-widest dark:border-gray-800 dark:text-gray-600'
        )}
      >
        {shortcut}
      </span>
    )}
  </DropdownMenuPrimitives.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Label>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Label
    ref={forwardedRef}
    className={cn(
      'px-2 py-1.5 font-semibold text-foreground text-sm',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Separator>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Separator
    ref={forwardedRef}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuIconWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <div className={cn('text-muted-foreground', className)} {...props} />;
};
DropdownMenuIconWrapper.displayName = 'DropdownMenuIconWrapper';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSubMenuTrigger,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuIconWrapper,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
