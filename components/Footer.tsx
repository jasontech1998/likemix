const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-2 text-center text-sm text-muted-foreground">
      <p>© {currentYear} MIT Licensed - Jason Yu</p>
    </footer>
  );
};

export default Footer;