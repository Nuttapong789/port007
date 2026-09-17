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

const translations = {
  th: {
    nav: { about: 'เกี่ยวกับผม', projects: 'ผลงาน', skills: 'ทักษะ', activity: 'กิจกรรม' },
    hero: {
      hello: 'Hello, World!',
      namePrefix: 'ผมชื่อ',
      name: 'ณัฐพงษ์ จำจด',
      job: 'Software Quality Assurance (QA) Engineer',
      intro: 'ผมเป็น QA Engineer ที่มีความชื่นชอบ Frontend Development มุ่งมั่นในการตรวจสอบและควบคุมคุณภาพของซอฟต์แวร์ เพื่อให้ผู้ใช้งานได้รับประสบการณ์ที่ดีที่สุด ปลอดจากข้อผิดพลาด และใช้งานได้ง่ายอย่างมีประสิทธิภาพ',
      projectsButton: 'ผลงานของผม',
      aboutButton: 'เกี่ยวกับผม',
    },
    projects: {
      title: 'ผลงาน',
      firstTitle: 'ฐานข้อมูลระบบบัญชีและธุรกรรมธนาคาร',
      firstDescription: 'เป็นการออกแบบและพัฒนาโครงสร้างฐานข้อมูลเชิงสัมพันธ์สำหรับระบบจัดการธนาคาร เน้นระบบสินเชื่อและการกู้ยืมเงินของ ธกส. โดยครอบคลุมตั้งแต่การจัดการข้อมูลหลัก การให้บริการหน้าเคาน์เตอร์ การบริหารสินเชื่อ ไปจนถึงระบบตรวจสอบประวัติการทำธุรกรรม',
      firstModal: 'โปรเจกต์แรก: ตัวอย่างการพัฒนาเว็บแอปที่เน้นประสบการณ์ผู้ใช้และการโต้ตอบแบบเรียลไทม์',
      secondTitle: 'LLM&RAG-Powered Knowledge Assistant Platform',
      secondDescription: 'เป็นระบบขององค์กรสำหรับโรงแรมแห่งหนึ่งเพื่อค้นหาข้อมูลมาตรฐานสำหรับปฏิบัติงาน SOP ได้ตลอด 24 ชั่วโมง โดยประยุกต์ใช้ RAG ร่วมกับ n8n เพื่อลดภาระงานในการตอบคำถามซ้ำของหัวหน้างานและเพื่อนร่วมงาน และเพิ่มประสิทธิภาพให้กับพนักงานใหม่',
      secondModal: 'โปรเจกต์ที่สอง: ระบบตัวอย่างที่แสดงการเชื่อมต่อ backend และฐานข้อมูล พร้อม UI ที่สวยงาม',
    },
    about: {
      title: 'เกี่ยวกับผม',
      first: 'ผมเป็นนักศึกษาวิทยาการคอมพิวเตอร์ที่มีความสนใจในการพัฒนาและตรวจสอบคุณภาพของเว็บแอปพลิเคชัน',
      second: 'การเขียนโปรแกรมมักมาพร้อมกับบั๊กและพฤติกรรมที่ไม่คาดคิดเสมอ แทนที่เราจะมองว่าการแก้ไขมันยาก เราควรลงมือทดสอบและวิเคราะห์หาสาเหตุอย่างเต็มที่ เพราะทุกปัญหามีทางออกเสมอ',
      quote: '“สำหรับผม ไม่มีอะไรยากเกินเรียนรู้ เพียงแค่รู้จักใช้เทคโนโลยีและ AI เป็นเครื่องมือช่วยคิดและแก้ปัญหา”',
    },
    education: {
      title: 'การศึกษา',
      highSchool: 'โรงเรียนมัธยมวัดใหม่กรงทอง',
      highSchoolPlan: 'แผนการเรียน ศิลป์คำนวณ',
      university: 'มหาวิทยาลัยกรุงเทพ',
      faculty: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
      major: 'สาขาวิทยาการคอมพิวเตอร์',
      current: 'ปัจจุบัน',
      gpaCurrent: '2.84 (ปัจจุบัน)',
    },
    skills: { title: 'ทักษะ', programming: 'การเขียนโปรแกรม', frontend: 'Frontend', backend: 'Backend', database: 'ฐานข้อมูล', tools: 'เครื่องมือ' },
    softSkills: {
      title: 'ทักษะด้านการทำงาน',
      items: [
        ['อัธยาศัยดีและมีมารยาท', 'เป็นคนมีมารยาทและให้เกียรติผู้อื่นเสมอ'],
        ['ชอบช่วยเหลือผู้อื่น', 'ยินดีช่วยเหลือเพื่อนร่วมทีมและคนรอบข้างอยู่เสมอ'],
        ['ชอบแก้ปัญหา', 'ชอบแก้ปัญหามากกว่ารอให้ปัญหาหายไปเอง'],
        ['เข้ากับคนง่าย', 'ปรับตัวเข้ากับคนและสภาพแวดล้อมได้ดี'],
        ['ซื่อสัตย์', 'ทำงานด้วยความซื่อสัตย์และรับผิดชอบต่อสิ่งที่รับมา'],
        ['ตรงต่อเวลา', 'ให้ความสำคัญกับเวลาและส่งงานตรงตามกำหนดเสมอ'],
      ],
    },
    certificates: 'ใบรับรอง',
    activity: {
      title: 'กิจกรรม',
      imageAlt: 'เข้าร่วมงาน',
      description: 'หนึ่งในบรรยากาศสุดประทับใจจากงาน IT Empowering Day 2026 การได้ออกมานำเสนอสิ่งที่ตั้งใจพัฒนาขึ้นมาให้คนอื่นฟัง ได้ตอบคำถามเชิงลึก และรับฟังมุมมองใหม่ ๆ จากคนในวงการ ถือเป็นประสบการณ์ที่ช่วยเปิดโลกและผลักดันให้พัฒนาทักษะต่อไปอย่างมากครับ',
    },
    modal: { close: 'ปิด', openPdf: 'เปิดในแท็บใหม่ / ดาวน์โหลด PDF', downloadCv: 'ดาวน์โหลดรูป CV', loading: 'กำลังโหลดตัวอย่าง...', previous: 'ก่อนหน้า', next: 'ถัดไป' },
    contact: 'ติดต่อฉัน',
    contactAlert: 'รบกวนรับผมไปพิจารณาพิเศษด้วยครับ ติดต่อ: pongzazaza0@gmail.com',
  },
  en: {
    nav: { about: 'About', projects: 'Projects', skills: 'Skills', activity: 'Activity' },
    hero: {
      hello: 'Hello, World!',
      namePrefix: "I'm",
      name: 'Nuttapong Chamchod',
      job: 'Software Quality Assurance (QA) Engineer',
      intro: 'I am a QA Engineer with a passion for Frontend Development. I am committed to testing and maintaining software quality so users receive the best possible experience with reliable and easy-to-use products.',
      projectsButton: 'My Projects',
      aboutButton: 'About Me',
    },
    projects: {
      title: 'Projects',
      firstTitle: 'Banking Accounts and Transactions Database',
      firstDescription: 'A relational database design for a banking management system, focusing on BAAC lending and loan services. It covers master data, counter services, loan management, and transaction history auditing.',
      firstModal: 'Project one: A web application example focused on user experience and real-time interaction.',
      secondTitle: 'LLM&RAG-Powered Knowledge Assistant Platform',
      secondDescription: 'An organizational system for a hotel to search operational SOP standards 24 hours a day. It combines RAG with n8n to reduce repeated questions for supervisors and colleagues and improve onboarding for new employees.',
      secondModal: 'Project two: An example system showing backend and database integration with a polished UI.',
    },
    about: {
      title: 'About Me',
      first: 'I am a Computer Science student interested in developing and assuring the quality of web applications.',
      second: 'Programming often comes with bugs and unexpected behavior. Instead of seeing fixes as difficult, we should test thoroughly and analyze the root cause, because every problem has a solution.',
      quote: '“Nothing is too difficult to learn when you know how to use technology and AI as tools for thinking and problem-solving.”',
    },
    education: { title: 'Education', highSchool: 'Wat Mai Krong Thong Secondary School', highSchoolPlan: 'Mathematics and Arts Program', university: 'Bangkok University', faculty: 'School of Information Technology and Innovation', major: 'Computer Science', current: 'Present', gpaCurrent: '2.84 (Current)' },
    skills: { title: 'Skills', programming: 'Programming', frontend: 'Frontend', backend: 'Backend', database: 'Database', tools: 'Tools' },
    softSkills: {
      title: 'Soft Skills',
      items: [
        ['Friendly and Polite', 'Always polite and respectful toward others'],
        ['Helpful', 'Always willing to help teammates and people around me'],
        ['Problem Solver', 'Prefer solving problems rather than waiting for them to disappear'],
        ['Easy to Work With', 'Adapt well to people and different environments'],
        ['Honest', 'Work honestly and take responsibility for commitments'],
        ['Punctual', 'Value time and consistently meet deadlines'],
      ],
    },
    certificates: 'Certificates',
    activity: { title: 'Activity', imageAlt: 'Attending an event', description: 'One of my most memorable experiences was IT Empowering Day 2026. Presenting something I had worked hard to build, answering in-depth questions, and hearing new perspectives from people in the field broadened my world and strongly encouraged me to keep developing my skills.' },
    modal: { close: 'Close', openPdf: 'Open in new tab / Download PDF', downloadCv: 'Download CV image', loading: 'Loading preview...', previous: 'Previous', next: 'Next' },
    contact: 'Contact Me',
    contactAlert: 'Please consider me for an opportunity. Contact: pongzazaza0@gmail.com',
  },
}

function App() {
  const [language, setLanguage] = useState('th')
  const t = translations[language]
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
    document.documentElement.lang = language
  }, [language])

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
        <div className="flex items-center gap-6">
          <ul className="flex space-x-6 text-sm font-medium text-slate-600">
          <li>
            <a href="#about" className="hover:text-slate-950 transition-colors duration-200">{t.nav.about}</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-slate-950 transition-colors duration-200">{t.nav.projects}</a>
          </li>
          <li>
            <a href="#skills" className="hover:text-slate-950 transition-colors duration-200">{t.nav.skills}</a>
          </li>
          <li>
            <a href="#activity" className="hover:text-slate-950 transition-colors duration-200">{t.nav.activity}</a>
          </li>
          </ul>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <span className="sr-only">Language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-slate-700 outline-none transition focus:border-slate-500"
              aria-label="Language"
            >
              <option value="th">ไทย</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
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
            {t.hero.hello}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {t.hero.namePrefix} <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">{t.hero.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light">
            {t.hero.job}
          </p>
          <p className="text-slate-600 leading-relaxed max-w-lg">
            {t.hero.intro}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="accent-btn">{t.hero.projectsButton}</a>
            <a href="#about" className="btn text-slate-700 border border-slate-300 px-4 py-2 rounded-lg">{t.hero.aboutButton}</a>
            <button onClick={openCvModal} className="btn-ghost">CV</button>
          </div>
        </div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            <span className="text-slate-900">{t.projects.title}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="project-card shadow-2xl">
            <button onClick={() => openProjectModal(t.projects.firstTitle, pro1Images, 0, t.projects.firstModal)} className="w-full text-left">
              <div className="w-full h-48 overflow-hidden bg-slate-800">
                <img src={pro1Images[0]} alt="pro1 top" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-6">
                <div className="font-semibold text-lg mb-2 text-slate-900">{t.projects.firstTitle}</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.projects.firstDescription}
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
            <button onClick={() => openProjectModal(t.projects.secondTitle, pro2Images, 0, t.projects.secondModal)} className="w-full text-left">
              <div className="w-full h-48 overflow-hidden bg-slate-800">
                <img src={pro2Images[0]} alt="Sunset in the mountains" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 py-6">
                <div className="font-semibold text-lg mb-2 text-slate-900">{t.projects.secondTitle}</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.projects.secondDescription}
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
          <h2 className="mb-6 text-3xl font-bold text-slate-900">{t.about.title}</h2>
          <p className="mb-4 text-lg leading-8 text-slate-600">
            {t.about.first}
          </p>
          <p className="mb-4 text-lg leading-8 text-slate-600">
            {t.about.second}
          </p>
          <blockquote className="border-slate-900 border-l-4 pl-4 text-xl italic text-slate-700">
            {t.about.quote}
          </blockquote>
        </div>
      </section>

      <section id="education" className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">{t.education.title}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="mb-2 text-sm font-semibold text-slate-900">2019 - 2022</p>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{t.education.highSchool}</h3>
              <p className="text-slate-700">{t.education.highSchoolPlan}</p>
              <p className="mt-3 font-semibold text-slate-900">GPA <span className="ml-2 text-slate-900">3.3</span></p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="mb-2 text-sm font-semibold text-slate-900">2022 - {t.education.current}</p>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{t.education.university}</h3>
              <p className="text-slate-700">{t.education.faculty}</p>
              <p className="mt-1 text-slate-700">{t.education.major}</p>
              <p className="mt-3 font-semibold text-slate-900">GPA <span className="ml-2 text-slate-900">{t.education.gpaCurrent}</span></p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" ref={skillsRef} className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">{t.skills.title}</h2>
          <div className={`grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4 transition-opacity duration-700 ${skillsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">{t.skills.programming}</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">HTML</span><span className="skill-tag">CSS</span><span className="skill-tag">JavaScript</span><span className="skill-tag">Python</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">{t.skills.frontend}</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">Tailwind CSS</span><span className="skill-tag">Figma</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">{t.skills.backend}</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">JavaScript</span><span className="skill-tag">Python</span><span className="skill-tag">HTML / CSS</span><span className="skill-tag">Java</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">{t.skills.database}</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">SQLite</span></div></div>
            <div><h3 className="mb-4 font-bold uppercase tracking-wide text-slate-900">{t.skills.tools}</h3><div className="flex flex-wrap gap-2"><span className="skill-tag">n8n</span><span className="skill-tag">Git</span><span className="skill-tag">GitHub</span></div></div>
          </div>
        </div>
      </section>

      <section id="soft-skills" className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">{t.softSkills.title}</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {t.softSkills.items.map(([title, description]) => (
              <div className="soft-skill-card" key={title}><h3 className="soft-skill-title">{title}</h3><p className="soft-skill-description">{description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-y border-slate-800 py-8">
          <h2 className="border-slate-900 mb-8 border-l-4 pl-3 text-3xl font-bold text-slate-900">{t.certificates}</h2>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg"><img src={certificateImg} alt="Certificate" className="block h-auto w-full" /></div>
        </div>
      </section>

      <section id="activity" className="max-w-6xl mx-auto px-8 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg flex flex-col md:flex-row gap-6 items-center">
          <img src={activityImg} alt={t.activity.imageAlt} className="w-48 h-48 object-cover rounded-lg shadow-md" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.activity.title}</h2>
            <p className="text-slate-700 leading-7">
              {t.activity.description}
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
                aria-label={t.modal.close}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {modalData.pdf ? (
                <div>
                  <div className="mb-3 flex justify-end gap-2">
                    <a href={modalData.pdf} target="_blank" rel="noreferrer" className="btn-ghost">{t.modal.openPdf}</a>
                    {cvImage && <a href={cvImage} download="cv.png" className="btn-ghost">{t.modal.downloadCv}</a>}
                  </div>
                  <div className="flex justify-center">
                    {cvImage ? (
                      <img src={cvImage} alt="CV preview" className="max-w-full rounded border" />
                    ) : (
                      <div className="w-[320px] h-[450px] border rounded flex items-center justify-center text-slate-400">{t.modal.loading}</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img src={modalData.images[modalData.index]} alt={modalData.title} className="w-auto h-auto max-w-full max-h-[70vh] mx-auto rounded mb-4" />
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    aria-label={t.modal.previous}
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    aria-label={t.modal.next}
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
        <button onClick={() => alert(t.contactAlert)} className="btn glitch">
          <span>{t.contact}</span>
        </button>
      </div>

    </div>
  )
}

export default App

// Modal markup is rendered inside App via state; keep file self-contained.
