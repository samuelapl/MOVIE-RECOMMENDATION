const Footer = () => {
    return (
      <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MovieAdmin. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;