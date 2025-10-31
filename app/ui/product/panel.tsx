export default function TabPanel({
  value,
  index,
  children,
}: {
  value: number;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: value === index ? "block" : "none", width: "100%" }}>
      {children}
    </div>
  );
}
