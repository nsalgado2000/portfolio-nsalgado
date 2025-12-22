export default function Contact() {
    return (
      <section id="contact" className="bg-[#3B4252] py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#ECEFF4]">Let's Connect</h2>
        <p className="text-[#D8DEE9]/80 mb-8 max-w-2xl mx-auto">
          I'm always interested in new projects and collaboration opportunities.
        </p>
        <div className="flex gap-8 justify-center">
          {['GitHub', 'LinkedIn', 'Email'].map((platform) => (
            <a 
              key={platform}
              href="#"
              className="px-6 py-3 rounded-lg bg-[#2E3440] text-[#D8DEE9] hover:text-[#88C0D0] transition-colors border border-[#4C566A] hover:border-[#88C0D0]"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </section>
    );
}