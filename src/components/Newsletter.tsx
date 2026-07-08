import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail(''); } };

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#f7fafc] overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,140,90,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,140,90,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div ref={ref} className={`anim ${inView ? 'anim-visible' : ''}`}>
          <div className="text-center py-12 px-8 rounded-2xl relative overflow-hidden" style={{ background: '#5b8c5a' }}>
            {/* Shimmer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', animation: 'shimmerLine 4s ease-in-out infinite' }} />
            </div>

            <div className="relative z-10">
              <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Sparkles size={16} style={{ color: '#fff' }} />
              </div>
              <h3 className="text-xl md:text-2xl font-normal mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fff' }}>加入芳境会员</h3>
              <p className="text-xs mb-6 font-sans" style={{ color: 'rgba(255,255,255,0.65)' }}>订阅获取首单9折优惠与新品资讯</p>

              {submitted ? (
                <p className="text-sm font-sans" style={{ color: '#fff' }}>感谢订阅！优惠码已发送至您的邮箱</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex max-w-sm mx-auto">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="输入邮箱地址" required
                    className="flex-1 px-4 py-2.5 text-[13px] rounded-l-full outline-none font-sans transition-all focus:bg-[rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
                  <button type="submit" className="px-5 py-2.5 text-[12px] tracking-wide rounded-r-full font-sans transition-all hover:bg-[#e8f4f8]"
                    style={{ background: '#fff', color: '#5b8c5a' }}>订阅</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
