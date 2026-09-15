import React, { useState, useRef, useEffect } from 'react'
// pdfjs will be loaded dynamically when needed (lazy-load)
// import heroImg from './assets/hero.png'
import profileImg from './assets/ปิงปอง.jpg'
import activityImg from './assets/เข้าร่วมงาน1.png'
// CV (PDF)
import cvPdf from './assets/cv/Black and White Clean Professional A4 Resume.pdf'
import certificateImg from './assets/00.1.png'
// pro1 images
import pro1_img1 from './assets/pro1/cccc.png'
import pro1_img2 from './assets/pro1/cccccc.png'
import pro1_img3 from './assets/pro1/cccccccc.png'
import pro1_img4 from './assets/pro1/cccccccccccccc.png'
import pro1_img5 from './assets/pro1/ccccccccccccccccccc.png'
import pro1_img6 from './assets/pro1/cccccccccccccccccccccc.png'
import pro1_img7 from './assets/pro1/cccccccccccccccccccccccc.png'
// pro2 images
import pro2_img1 from './assets/pro2/1cc.png'
import pro2_img2 from './assets/pro2/2cccc.png'
import pro2_img3 from './assets/pro2/3cccc.png'
import pro2_img4 from './assets/pro2/4cccc.png'

// gallery removed
const pro1Images = [pro1_img1, pro1_img2, pro1_img3, pro1_img4, pro1_img5, pro1_img6, pro1_img7]
// ordered as requested: 4cccc first, then 1cc, 2cccc, 3cccc
const pro2Images = [pro2_img4, pro2_img1, pro2_img2, pro2_img3]

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  function openProjectModal(title, images, startIndex = 0, description) {
    setModalData({ title, images, index: startIndex, description })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setModalData(null)
  }

  React.useEffect(() => {
    if (!modalOpen) return
    function onKey(e) {
      if (e.key === 'Escape') return closeModal()
      if (e.key === 'ArrowLeft') return setModalData(d => ({ ...d, index: (d.index - 1 + d.images.length) % d.images.length }))
      if (e.key === 'ArrowRight') return setModalData(d => ({ ...d, index: (d.index + 1) % d.images.length }))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  function prevImage() {
    setModalData(d => ({ ...d, index: (d.index - 1 + d.images.length) % d.images.length }))
  }

  function nextImage() {
    setModalData(d => ({ ...d, index: (d.index + 1) % d.images.length }))
  }

  function openCvModal() {
    setModalData({ title: 'Curriculum Vitae', pdf: cvPdf })
    setModalOpen(true)
  }
  // skills animation
  const skillsRef = useRef(null)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const [cvImage, setCvImage] = useState(null)

  useEffect(() => {
    if (!skillsRef.current) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setSkillsVisible(true)
          obs.disconnect()
        }
      })
    }, { threshold: 0.25 })
    obs.observe(skillsRef.current)
    return () => obs.disconnect()
  }, [])

  // render CV PDF first page to an image (data URL) when modal opens with pdf
  useEffect(() => {
    if (!modalOpen || !modalData || !modalData.pdf) return
    let cancelled = false
    import('pdfjs-dist/legacy/build/pdf').then(pdfjs => {
      if (cancelled) return
      pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js'
      const loadingTask = pdfjs.getDocument(modalData.pdf)
      loadingTask.promise.then(pdf => {
        if (cancelled) return
        pdf.getPage(1).then(page => {
          const containerWidth = Math.min(window.innerWidth * 0.8, 1000)
          const viewport = page.getViewport({ scale: 1 })
          const scale = containerWidth / viewport.width
          const scaled = page.getViewport({ scale })
          const canvas = document.createElement('canvas')
          canvas.width = scaled.width
          canvas.height = scaled.height
          const ctx = canvas.getContext('2d')
          const renderTask = page.render({ canvasContext: ctx, viewport: scaled })
          renderTask.promise.then(() => {
            if (cancelled) return
            try {
              const dataUrl = canvas.toDataURL('image/png')
              setCvImage(dataUrl)
            } catch (e) {
              console.error('toDataURL error', e)
            }
          })
        })
      }).catch(err => console.error('PDF render error', err))
    }).catch(err => console.error('Failed to load pdfjs', err))
    return () => { cancelled = true; setCvImage(null) }
  }, [modalOpen, modalData])
  return (
    <div className="site-bg text-slate-800 font-sans">
      <nav className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-wider">
          <span className="rainbow-text">Nuttapong</span>
        </div>
        <ul className="flex space-x-6 text-sm font-medium text-slate-600">
          <li>
            <a href="#about" className="hover:text-slate-950 transition-colors duration-200">About</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-slate-950 transition-colors duration-200">Projects</a>
          </li>
          <li>
            <a href="#skills" className="hover:text-slate-950 transition-colors duration-200">Skills</a>
          </li>
          <li>
            <a href="#activity" className="hover:text-slate-950 transition-colors duration-200">Activity</a>
          </li>
        </ul>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 md:w-80 overflow-hidden rounded-lg border-4 border-slate-700 shadow-xl shadow-black/40">
            <img
              src={profileImg}
              alt="Ping Pong"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <span className="text-slate-700 font-semibold text-lg tracking-wide uppercase">
            Hello, World!
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            ผมชื่อ <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">ณัฐพงษ์ จำจด</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light">
            Frontend Developer & UI/UX Designer
          </p>
          <p className="text-slate-600 leading-relaxed max-w-lg">
            ขอบคุณที่เข้ามาเยี่ยมชมผลงานของผม! ผมเป็นนักพัฒนาซอฟต์แวร์ที่หลงใหลในการสร้างเว็บแอปพลิเคชันที่สวยงามและใช้งานง่าย ผมเชื่อว่าการออกแบบที่ดีสามารถเปลี่ยนประสบการณ์ของผู้ใช้ให้ดียิ่งขึ้น และผมมุ่งมั่นที่จะสร้างสรรค์สิ่งใหม่ ๆ อยู่เสมอ
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="accent-btn">ผลงานของผม</a>
            <a href="#about" className="btn text-slate-700 border border-slate-300 px-4 py-2 rounded-lg">เกี่ยวกับผม</a>
            <button onClick={openCvModal} className="btn-ghost">CV</button>
          </div>
        </div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            <span className="text-slate-900">Projects</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="project-card shadow-2xl">
            <button onClick={() => openProjectModal('ฐานข้อมูลระบบบัญชีและธุรกรรมธนาคาร', pro1Images, 0, 'โปรเจกต์แรก: ตัวอย่างการพัฒนาเว็บแอปที่เน้นประสบการณ์ผู้ใช้และการโต้ตอบแบบเรียลไทม์')} className="w-full text-left">
              <div className="w-full h-48 overflow-hidden bg-slate-800">
                <img src={pro1Images[0]} alt="pro1 top" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-6">
                <div className="font-semibold text-lg mb-2 text-slate-900">ฐานข้อมูลระบบบัญชีและธุรกรรมธนาคาร </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  เป็นการออกแบบและพัฒนาโครงสร้างฐานข้อมูลเชิงสัมพันธ์สำหรับระบบจัดการธนาคาร เน้นระบบสินเชื่อและการกู้ยืมเงินของ ธกส.โดยครอบคลุมตั้งแต่การจัดการข้อมูลหลักการให้บริการหน้าเคาน์เตอร์การบริหารสินเชื่อไปจนถึงระบบตรวจสอบประวัติการทำธุรกรรม.
                </p>
              </div>
            </button>
            <div className="px-6 pb-6">
              <span className="tag mr-2">#photography</span>
              <span className="tag mr-2">#travel</span>
              <span className="tag mr-2">#winter</span>
            </div>
          </div>

          <div className="project-card shadow-2xl">
            <button onClick={() => openProjectModal('LLM&RAG-Powered Knowledge Assistant Platform', pro2Images, 0, 'โปรเจกต์ที่สอง: ระบบตัวอย่างที่แสดงการเชื่อมต่อ backend และฐานข้อมูล พร้อม UI ที่สวยงาม')} className="w-full text-left">
              <div className="w-full h-48 overflow-hidden bg-slate-800">
                <img src={pro2Images[0]} alt="Sunset in the mountains" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-6">
                <div className="font-semibold text-lg mb-2 text-slate-900">LLM&RAG-Powered Knowledge Assistant Platform</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  เป็นระบบพัฒนาระบบขององค์กรสำหรับโรงเเรมเเห่งหนึงเพื่อค้นหาข้อมูลมาตรฐานเพื่อปฏิบัติงาน SOP ได้ตลอด 24 ชั่วโมงเพื่อประยุกต์ใช้ RAG ร่วมกับ n8n เพื่อลดภาระงานในการตอบคำถามซ้ำของหัวหน้างานเเล้วเพื่อนร่วมงานเเละเพื่อเพิ่มประสิทธิภาพให้กับพนักงานใหม่
                </p>
              </div>
            </button>
            <div className="px-6 pb-6">
              <span className="tag mr-2">#chatbot</span>
              <span className="tag mr-2">#automation</span>
              <span className="tag mr-2">#integration</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/60">
          <h2 className="mb-6 text-3xl font-bold text-slate-900">About Me</h2>
          <p className="mb-4 text-lg leading-8 text-slate-600">
            ฉันเป็นนักศึกษาวิทยาการคอมพิวเตอร์ที่หลงใหลในการสร้างเว็บแอปพลิเคชันสมัยใหม่และแก้ปัญหาในโลกจริงผ่านโค้ด
          </p>
          <p className="mb-4 text-lg leading-8 text-slate-600">
            การเขียนโปรแกรมมักมาพร้อมกับข้อผิดพลาดและความเหลวไหลที่ไม่สามารถคาดเดาได้เสมอ แต่แทนที่เราจะมองว่ามันยาก เราควรลองทำมันก่อน แล้วพยายามให้ถึงที่สุดก่อนที่เราจะตัดสินว่ามันยากเกินไปสำหรับเรา ทุกอย่างมีทางออกเสมอ
          </p>
          <blockquote className="border-slate-900 border-l-4 pl-4 text-xl italic text-slate-700">
            “สำหรับตัวผม ไม่มีอะไรยาก เพียงแค่คุณใช้ AI เป็นเครื่องมือช่วยคิดทางออกให้คุณ”
          </blockquote>
        </div>
      </section>

      <section id="education" className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">การศึกษา</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="mb-2 text-sm font-semibold text-slate-900">2019 - 2022</p>
              <h3 className="mb-3 text-xl font-bold text-slate-900">โรงเรียนมัธยมวัดใหม่กรงทอง</h3>
              <p className="text-slate-700">แผนการเรียน ศิลป์คำนวณ</p>
              <p className="mt-3 font-semibold text-slate-900">GPA <span className="ml-2 text-slate-900">3.3</span></p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="mb-2 text-sm font-semibold text-slate-900">2022 - ปัจจุบัน</p>
              <h3 className="mb-3 text-xl font-bold text-slate-900">มหาวิทยาลัยกรุงเทพ</h3>
              <p className="text-slate-700">คณะเทคโนโลยีสารสนเทศและนวัตกรรม</p>
              <p className="mt-1 text-slate-700">สาขาวิทยาการคอมพิวเตอร์</p>
              <p className="mt-3 font-semibold text-slate-900">GPA <span className="ml-2 text-slate-900">2.84 (ปัจจุบัน)</span></p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" ref={skillsRef} className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">Skills</h2>
          <div className={`grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4 transition-opacity duration-700 ${skillsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">Programming</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">HTML</span><span className="skill-tag">CSS</span><span className="skill-tag">JavaScript</span><span className="skill-tag">Python</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">Frontend</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">Tailwind CSS</span><span className="skill-tag">Figma</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">Backend</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">JavaScript</span><span className="skill-tag">Python</span><span className="skill-tag">HTML / CSS</span><span className="skill-tag">Java</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">Database</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">SQLite</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">Tools</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">n8n</span><span className="skill-tag">Git</span><span className="skill-tag">GitHub</span></div></div>
          </div>
        </div>
      </section>

      <section id="soft-skills" className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">Soft Skills</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="soft-skill-card"><h3 className="soft-skill-title">อัธยาศัยดี & มีมารยาท</h3><p className="soft-skill-description">เป็นคนมีมารยาทและให้เกียรติผู้อื่นเสมอ</p></div>
            <div className="soft-skill-card"><h3 className="soft-skill-title">ชอบช่วยเหลือผู้อื่น</h3><p className="soft-skill-description">ยินดีช่วยเหลือเพื่อนร่วมทีมและคนรอบข้างอยู่เสมอ</p></div>
            <div className="soft-skill-card"><h3 className="soft-skill-title">ชอบแก้ปัญหา</h3><p className="soft-skill-description">ชอบแก้ปัญหามากกว่ารอให้ปัญหาหายไปเอง</p></div>
            <div className="soft-skill-card"><h3 className="soft-skill-title">เข้ากับคนง่าย</h3><p className="soft-skill-description">ปรับตัวเข้ากับคนและสภาพแวดล้อมได้ดี</p></div>
            <div className="soft-skill-card"><h3 className="soft-skill-title">ซื่อสัตย์</h3><p className="soft-skill-description">ทำงานด้วยความซื่อสัตย์และรับผิดชอบต่อสิ่งที่รับมา</p></div>
            <div className="soft-skill-card"><h3 className="soft-skill-title">ตรงต่อเวลา</h3><p className="soft-skill-description">ให้ความสำคัญกับเวลาและส่งงานตรงตามกำหนดเสมอ</p></div>
          </div>
        </div>
      </section>

      <section id="certificates" className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">Certificates</h2>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg"><img src={certificateImg} alt="Certificate" className="block h-auto w-full" /></div>
        </div>
      </section>

      <section id="activity" className="max-w-6xl mx-auto px-8 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg flex flex-col md:flex-row gap-6 items-center">
          <img src={activityImg} alt="เข้าร่วมงาน" className="w-48 h-48 object-cover rounded-lg shadow-md" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Activity</h2>
            <p className="text-slate-700 leading-7">
              หนึ่งในบรรยากาศสุดประทับใจจากงาน IT Empowering Day 2026 การได้ออกมานำเสนอสิ่งที่ตั้งใจพัฒนาขึ้นมาให้คนอื่นฟัง ได้ตอบคำถามเชิงลึก และรับฟังมุมมองใหม่ๆ จากคนในวงการ ถือเป็นประสบการณ์ที่ช่วยเปิดโลกและผลักดันให้พัฒนาทักษะต่อไปอย่างมากครับ
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && modalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 rounded-lg max-w-3xl w-full mx-4 overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-slate-100">{modalData.title}</h3>
              <button
                onClick={closeModal}
                className="text-slate-300 hover:text-white px-2 py-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {modalData.pdf ? (
                <div>
                  <div className="mb-3 flex justify-end gap-2">
                    <a href={modalData.pdf} target="_blank" rel="noreferrer" className="btn-ghost">เปิดในแท็บใหม่ / ดาวน์โหลด PDF</a>
                    {cvImage && <a href={cvImage} download="cv.png" className="btn-ghost">ดาวน์โหลดรูป CV</a>}
                  </div>
                  <div className="flex justify-center">
                    {cvImage ? (
                      <img src={cvImage} alt="CV preview" className="max-w-full rounded border" />
                    ) : (
                      <div className="w-[320px] h-[450px] border rounded flex items-center justify-center text-slate-400">Loading preview...</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img src={modalData.images[modalData.index]} alt={modalData.title} className="w-auto h-auto max-w-full max-h-[70vh] mx-auto rounded mb-4" />
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>
              )}
              <p className="text-slate-300">{modalData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating CTA */}
      <div className="floating-cta">
        <button onClick={() => alert('รบกวนรับผมไปพิจารณาพิเศษด้วยครับ ติดต่อ:pongzazaza0@gmail.com')} className="btn glitch">
          <span>ติดต่อฉัน</span>
        </button>
      </div>

    </div>
  )
}

export default App

// Modal markup is rendered inside App via state; keep file self-contained.
