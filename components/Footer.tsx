const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4">
      <div className="container mx-auto text-center">
        <p>© {currentYear} MIT Licensed - Jason Yu</p>
      </div>
    </footer>
  );
};

export default Footer;
