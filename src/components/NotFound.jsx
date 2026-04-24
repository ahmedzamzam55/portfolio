export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <a href="/" className="btn btn-primary"><i className="fas fa-home"></i> Back to Home</a>
      </div>
    </div>
  );
}
