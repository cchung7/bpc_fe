import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Terms & Conditions & Privacy Policy
        </h1>

        {/* Terms & Conditions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our website! By accessing or using our website, you agree
            to comply with and be bound by the following terms and conditions.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>You must be at least 18 years old to use this website.</li>
            <li>
              You agree not to use our website for any illegal or unauthorized
              purpose.
            </li>
            <li>
              We reserve the right to modify or terminate the service at any
              time without notice.
            </li>
            <li>
              All content provided on the website is for informational purposes
              only.
            </li>
            <li>
              We are not responsible for any damages arising from the use of
              this website.
            </li>
          </ul>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. This privacy policy explains how we
            collect, use, and protect your personal information.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We collect information you provide directly, such as your name and
              email.
            </li>
            <li>We may use cookies to enhance your browsing experience.</li>
            <li>
              Your data is stored securely and will not be shared with third
              parties without your consent.
            </li>
            <li>
              You can request to access or delete your personal data at any
              time.
            </li>
            <li>
              By using this website, you consent to our privacy practices as
              described in this policy.
            </li>
          </ul>
        </section>

        <p className="text-gray-500 mt-12 text-center text-sm">
          Last updated: December 27, 2025
        </p>
      </div>
      <div className="flex justify-center items-center mt-6">
        {" "}
        <Button className="px-8 py-6 rounded-full text-base">
          <Link href="/register">Register Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
