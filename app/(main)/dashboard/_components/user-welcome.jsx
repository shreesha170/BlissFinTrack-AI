import { checkUser } from "@/lib/checkUser";

export default async function UserWelcome() {
  const user = await checkUser(); // Fetch user on the server side

  return (
    <div className="text-3xl font-bold mb-6 tracking-wide">
      {user ? `Welcome, ${user.name}!` : "Welcome!"}
      <p className="text-lg mt-2 text-gray-600">
        📊 <span className="font-medium">
          BlissFinTrack Insight:</span> "Simplify your finances—plan smart, save wisely, and enjoy peace of mind."
      </p>
    </div>
  );
}
