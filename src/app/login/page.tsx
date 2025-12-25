import { Login } from "../../components/Login";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Login />
      </div>
    </div>
  );
}