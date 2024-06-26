interface BuilderLayoutProps {
  children: React.ReactNode;
}

export default function BuilderLayout(props: BuilderLayoutProps) {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-100">{children}</main>
    </div>
  );
}
