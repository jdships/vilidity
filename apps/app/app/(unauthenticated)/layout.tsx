import type { ReactNode } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex min-h-[100dvh] items-center justify-center space-y-8 bg-muted/40 p-4">
    <div className="w-full max-w-[400px] space-y-4">{children}</div>
  </div>
);

export default AuthLayout;
