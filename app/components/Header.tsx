interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col gap-y-3 pt-5 items-center justify-center">
      <h1 className="text-6xl font-extrabold text-emerald-700">{title}</h1>
      <p className="text-gray-500 text-xl tracking-widest">{description}</p>
    </div>
  );
};

export default Header;
