export default function Footer() {
    return (
      <footer className="p-4 text-center text-gray-600 border-t bg-white">
        © {new Date().getFullYear()} Job Base Powered by <a href="https://codeews.site"  className="decoration-none">CodeEra Web Studio</a>. All rights reserved.
      </footer>
    );
  }
  