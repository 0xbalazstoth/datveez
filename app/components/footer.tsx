export function Footer() {
  return (
    <footer className="footer bg-white border border-t-2 text-neutral-content p-10 text-center flex flex-wrap justify-center">
      <nav className="mx-8 my-4">
        <h6 className="footer-title">Links</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav className="mx-8 my-4">
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
    </footer>
  );
}
