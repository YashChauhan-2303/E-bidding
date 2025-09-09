import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bid-gray-50 p-6">
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-bid-gray-200 hover:bg-bid-gray-300 text-bid-gray-800 font-medium py-2 px-6 rounded-xl transition"
        >
          ← Return
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-8">
          {/* Left Side */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-bid-primary mb-4">Get in Touch</h2>
            <p className="text-bid-gray-600 mb-6">
              Have a question, project idea, or just want to say hi?  
              Fill out the form and I’ll get back to you soon!
            </p>

            <div className="space-y-4 text-bid-gray-700">
              <p>
                📍 <span className="font-medium">Location:</span> Manipal, India
              </p>
              <p>
                📧 <span className="font-medium">Email:</span> yourname@email.com
              </p>
              <p>
                💼 <span className="font-medium">LinkedIn:</span>{" "}
                <a
                  href="https://linkedin.com/in/yourprofile"
                  className="text-bid-primary hover:underline"
                >
                  linkedin.com/in/yourprofile
                </a>
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-bid-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-bid-gray-300 rounded-xl focus:ring-2 focus:ring-bid-primary"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bid-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-bid-gray-300 rounded-xl focus:ring-2 focus:ring-bid-primary"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bid-gray-700">Message</label>
              <textarea
                className="w-full mt-1 p-3 border border-bid-gray-300 rounded-xl focus:ring-2 focus:ring-bid-primary"
                placeholder="Write your message..."
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-bid-primary hover:bg-bid-secondary text-white font-medium py-3 rounded-xl transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
