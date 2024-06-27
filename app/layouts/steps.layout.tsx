interface StepsLayoutProps {
  children: React.ReactNode;
}

export default function StepsLayout(props: StepsLayoutProps) {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-100">{children}</main>
    </div>
  );
}
